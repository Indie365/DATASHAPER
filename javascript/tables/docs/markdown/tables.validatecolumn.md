<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@datashaper/tables](./tables.md) &gt; [validateColumn](./tables.validatecolumn.md)

## validateColumn() function

Validates a column against a Field definition's constraints.

<b>Signature:</b>

```typescript
export declare function validateColumn(table: ColumnTable, field: Field, includeIndexes: boolean): ValidationResult;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  table | ColumnTable |  |
|  field | Field |  |
|  includeIndexes | boolean | indicate whether to include the indexes of the row instances that failed validation |

<b>Returns:</b>

ValidationResult

