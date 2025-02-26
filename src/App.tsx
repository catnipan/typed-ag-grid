import { useState } from "react";
import { TypedColumnDef, TypedAgGrid } from "./TypedAgGrid";

type MyDataType = {
  id: string;
  symbol: string;
  date: Date;
  price: number;
  role: 'ROLE_A' | 'ROLE_B';
  user: {
    name: string;
    email: string;
  };
};
type MyContext = {
  theme: "light" | "dark";
  precision: "rounded" | "precise";
};

const columnDefs: TypedColumnDef<MyDataType, MyContext>[] = [
  { field: "id" },
  { field: "symbol" },
  {
    field: "date",
    cellRenderer: ({ value }) => value?.toString(),
  },
  {
    field: "price",
    cellRenderer: ({ context: { precision }, value }) => {
      if (precision === "precise") {
        return value?.toPrecision(10);
      } else {
        return value ? Math.round(value) : undefined;
      }
    },
  },
  {
    field: "user",
    cellRenderer: ({ value }) => {
      return (
        <>
          {value?.email} - {value?.name}
        </>
      );
    },
  },
  {
    field: 'user.email',
    cellRenderer: ({ value }) => value // value typed as string
  },
  {
    field: 'role',
    cellRenderer: ({ value }) => value // value typed as enum string
  }
];

export default function App() {
  const [precision, setPrecision] = useState<MyContext["precision"]>("precise");
  return (
    <div>
      <select
        value={precision}
        onChange={(e) => setPrecision(e.target.value as MyContext["precision"])}
      >
        <option>rounded</option>
        <option>precise</option>
      </select>
      {precision}
      <div
        style={{ height: "100vh", width: "100%" }}
        className="ag-theme-quartz"
      >
        <TypedAgGrid<MyDataType, MyContext>
          rowData={[
            {
              id: "123",
              symbol: "CLST",
              date: new Date(),
              price: 123.034,
              user: {
                email: "ypan@clearstreet.io",
                name: "yifan",
              },
              role: 'ROLE_A',
            },
            {
              id: "456",
              symbol: "STREET",
              date: new Date(),
              price: 445.056,
              user: {
                email: "ypan@clearstreet.io",
                name: "yifan",
              },
              role: 'ROLE_B'
            },
          ]}
          columnDefs={columnDefs}
          context={{
            precision,
            theme: "dark" as const,
          }}
        />
      </div>
    </div>
  );
}
