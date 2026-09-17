import { EmptyState } from "./States";

/**
 * columns: [{ key, header, className, render(row) }]
 */
export default function DataTable({ columns, rows, empty, onRowClick }) {
  if (!rows.length) {
    return <div className="card-surface">{empty || <EmptyState title="No records found" />}</div>;
  }

  return (
    <div className="card-surface overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[42rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/60 text-left">
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.id || i}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={`border-b border-border last:border-0 ${onRowClick ? "cursor-pointer hover:bg-secondary/60" : ""}`}
              >
                {columns.map((c) => (
                  <td key={c.key} className={`px-4 py-3 align-middle text-foreground ${c.className || ""}`}>
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
