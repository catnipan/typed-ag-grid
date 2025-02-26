import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

import { ColDef, ICellRendererParams } from "ag-grid-community";
import { themeBalham } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

type GetNestedFieldType<
  T,
  K extends string
> = K extends `${infer First}.${infer Rest}`
  ? First extends keyof T
    ? GetNestedFieldType<T[First], Rest>
    : never
  : K extends keyof T
  ? T[K]
  : never;

type GetFieldPath<TData> = ColDef<TData>["field"] & string;
export type TypedColumnDef<TData, TContext> = {
  [FieldPath in GetFieldPath<TData>]: {
    field: FieldPath;
    cellRenderer?: (
      params: ICellRendererParams<
        TData,
        GetNestedFieldType<TData, FieldPath>,
        TContext
      >
    ) => React.ReactNode;
  } & Omit<ColDef<TData, GetNestedFieldType<TData, FieldPath>>, "cellRenderer">;
}[GetFieldPath<TData>];

type TypedAgGridProps<TData, TContext = void> = Omit<
  React.ComponentProps<typeof AgGridReact<TData>>,
  "columnDefs"
> & {
  columnDefs?: TypedColumnDef<TData, TContext>[];
  context: TContext;
};

export function TypedAgGrid<TData, TContext = void>(
  props: TypedAgGridProps<TData, TContext>
) {
  return <AgGridReact theme={themeBalham} {...props} />;
}
