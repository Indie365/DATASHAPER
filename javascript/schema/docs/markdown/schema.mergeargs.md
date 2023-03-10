<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@datashaper/schema](./schema.md) &gt; [MergeArgs](./schema.mergeargs.md)

## MergeArgs interface

<b>Signature:</b>

```typescript
export interface MergeArgs extends InputColumnListArgs, OutputColumnArgs 
```
<b>Extends:</b> [InputColumnListArgs](./schema.inputcolumnlistargs.md)<!-- -->, [OutputColumnArgs](./schema.outputcolumnargs.md)

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [delimiter?](./schema.mergeargs.delimiter.md) |  | string | <i>(Optional)</i> This is only necessary if mergeStrategy.Concat is used. If it is not supplied, the values are just mashed together. |
|  [prefix?](./schema.mergeargs.prefix.md) |  | string | <i>(Optional)</i> |
|  [preserveSource?](./schema.mergeargs.preservesource.md) |  | boolean | <i>(Optional)</i> |
|  [strategy](./schema.mergeargs.strategy.md) |  | [MergeStrategy](./schema.mergestrategy.md) |  |
|  [unhot?](./schema.mergeargs.unhot.md) |  | boolean | <i>(Optional)</i> |

