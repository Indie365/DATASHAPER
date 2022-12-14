<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@datashaper/workflow](./workflow.md) &gt; [Emitter](./workflow.emitter.md)

## Emitter interface

A data emitter for a type of output

<b>Signature:</b>

```typescript
export interface Emitter<T> extends Resource 
```
<b>Extends:</b> [Resource](./workflow.resource.md)

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [output](./workflow.emitter.output.md) | <code>readonly</code> | [Maybe](./workflow.maybe.md)<!-- -->&lt;T&gt; | The current output value |
|  [output$](./workflow.emitter.output_.md) | <code>readonly</code> | Observable&lt;[Maybe](./workflow.maybe.md)<!-- -->&lt;T&gt;&gt; | The output value stream |
