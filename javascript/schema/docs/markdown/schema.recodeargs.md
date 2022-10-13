<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@datashaper/schema](./schema.md) &gt; [RecodeArgs](./schema.recodeargs.md)

## RecodeArgs interface

<b>Signature:</b>

```typescript
export interface RecodeArgs extends InputColumnArgs, OutputColumnArgs 
```
<b>Extends:</b> [InputColumnArgs](./schema.inputcolumnargs.md)<!-- -->, [OutputColumnArgs](./schema.outputcolumnargs.md)

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [mapping](./schema.recodeargs.mapping.md) |  | Record&lt;[Value](./schema.value.md)<!-- -->, [Value](./schema.value.md)<!-- -->&gt; | Mapping of old value to new for the recoding. Note that the key must be coercable to a string for map lookup. |
