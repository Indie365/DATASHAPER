<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@datashaper/schema](./schema.md) &gt; [TableBundleSchema](./schema.tablebundleschema.md) &gt; [sources](./schema.tablebundleschema.sources.md)

## TableBundleSchema.sources property

The sources that compose a table bundle.

<b>Signature:</b>

```typescript
sources?: Array<{
        rel: TableBundleRel.Input;
        source: string | DataTableSchema;
    } | {
        rel: TableBundleRel.Codebook;
        source: string | CodebookSchema;
    } | {
        rel: TableBundleRel.Workflow;
        source: string | WorkflowSchema;
    }>;
```