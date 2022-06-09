#
# Copyright (c) Microsoft. All rights reserved.
# Licensed under the MIT license. See LICENSE file in the project.
#

from data_wrangling_components.engine.verbs.verb_input import VerbInput
from data_wrangling_components.table_store import TableContainer


def ungroup(input: VerbInput):
    input_table = input.get_input()
    output = input_table.obj
    return TableContainer(table=output)
