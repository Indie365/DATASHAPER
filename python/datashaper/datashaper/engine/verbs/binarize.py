#
# Copyright (c) Microsoft. All rights reserved.
# Licensed under the MIT license. See LICENSE file in the project.
#

from typing import List

from datashaper.engine.pandas.filter_df import filter_df
from datashaper.engine.verbs.filter import _get_operator
from datashaper.engine.verbs.verb_input import VerbInput
from datashaper.table_store import TableContainer
from datashaper.types import (
    BooleanLogicalOperator,
    Criterion,
    FilterArgs,
    FilterCompareType,
)


def binarize(
    input: VerbInput, to: str, column: str, criteria: List, logical: str = "or"
):
    filter_criteria = [
        Criterion(
            value=arg.get("value", None),
            type=FilterCompareType(arg["type"]),
            operator=_get_operator(arg["operator"]),
        )
        for arg in criteria
    ]
    logical_operator = BooleanLogicalOperator(logical)

    input_table = input.get_input()

    filter_result = filter_df(
        input_table, FilterArgs(column, filter_criteria, logical_operator)
    )
    output = input_table.copy()
    output[to] = filter_result.map({True: 1, False: 0}, na_action="ignore")

    return TableContainer(table=output)
