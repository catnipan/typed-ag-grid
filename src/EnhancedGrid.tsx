import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { ColDef, ICellRendererParams } from "ag-grid-community";

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
export type EnhancedColumnsDef<TData, TContext> = {
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

type EnhancedGridProps<TData, TContext = void> = Omit<
  React.ComponentProps<typeof AgGridReact<TData>>,
  "columnDefs"
> & {
  columnDefs?: EnhancedColumnsDef<TData, TContext>[];
  context: TContext
};

export function EnhancedGrid<TData, TContext = void>(
  props: EnhancedGridProps<TData, TContext>
) {
  return <AgGridReact {...props} />;
}

