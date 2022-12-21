<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@datashaper/schema](./schema.md) &gt; [BasicInput](./schema.basicinput.md)

## BasicInput interface

Single-input, single-output step I/O

<b>Signature:</b>

```typescript
export interface BasicInput 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [input?](./schema.basicinput.input.md) |  | string \| { source: [PortBinding](./schema.portbinding.md)<!-- -->; } | <p><i>(Optional)</i> Standard step input; single source with default name "source".</p><p>If undefined, the default output of the previous step will be used (if available). If no previous step is available, this will remain undefined</p> |
