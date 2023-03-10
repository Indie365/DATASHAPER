#
# Copyright (c) Microsoft. All rights reserved.
# Licensed under the MIT license. See LICENSE file in the project.
#

from typing import Union

import numpy as np
import pandas as pd

from pandas.core.groupby import DataFrameGroupBy

from datashaper.engine.verbs.verb_input import VerbInput
from datashaper.table_store import TableContainer
from datashaper.types import WindowFunction


def _get_window_indexer(
    column: pd.Series, fixed_size=False
) -> Union[int, pd.api.indexers.BaseIndexer]:
    if fixed_size:
        return pd.api.indexers.FixedForwardWindowIndexer(window_size=len(column))
    else:
        return len(column)


__window_function_map = {
    WindowFunction.RowNumber: lambda column: column.rolling(
        window=_get_window_indexer(column), min_periods=1
    ).count(),
    WindowFunction.Rank: lambda column: column.rolling(
        window=_get_window_indexer(column), min_periods=1
    ).count(),
    WindowFunction.PercentRank: lambda column: (
        column.rolling(window=_get_window_indexer(column), min_periods=1).count() - 1
    )
    / (len(column) - 1),
    WindowFunction.CumulativeDistribution: lambda column: column.rolling(
        window=_get_window_indexer(column), min_periods=1
    ).count()
    / len(column),
    WindowFunction.FirstValue: lambda column: column.rolling(
        window=_get_window_indexer(column), min_periods=1
    ).apply(lambda x: x.iloc[0]),
    WindowFunction.LastValue: lambda column: column.rolling(
        window=_get_window_indexer(column, True),
        min_periods=1,
    ).apply(lambda x: x.iloc[-1]),
    WindowFunction.FillDown: lambda column: column.rolling(
        window=len(column), min_periods=1
    ).apply(lambda x: x.dropna().iloc[-1]),
    WindowFunction.FillUp: lambda column: column.rolling(
        window=_get_window_indexer(column, True),
        min_periods=1,
    ).apply(lambda x: x.dropna().iloc[0] if np.isnan(x.iloc[0]) else x.iloc[0]),
}


def window(input: VerbInput, column: str, to: str, operation: str):
    window_operation = WindowFunction(operation)

    input_table = input.get_input()
    window = __window_function_map[window_operation](input_table[column])

    if isinstance(input_table, DataFrameGroupBy):
        # ungroup table to add new column
        output = input_table.obj.copy()
        output[to] = window.reset_index()[column]
        # group again by original group by
        output = output.groupby(input_table.keys)
    else:
        output = input_table.copy()
        output[to] = window

    return TableContainer(table=output)
