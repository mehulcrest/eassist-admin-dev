export const TableWrapper = ({ children, className = "" }) => (
  <div
    className={`overflow-x-auto rounded-xl border border-[#EAECF0] bg-white ${className}`}
  >
    {children}
  </div>
);

/**
 * The <table> element. Defaults to full width + border-collapse.
 * Pass `minWidth` as a Tailwind class like "min-w-[980px]".
 */
export const Table = ({ children, minWidth = "min-w-[800px]", className = "" }) => (
  <table className={`w-full border-collapse ${minWidth} ${className}`}>
    {children}
  </table>
);

/**
 * <thead> with the light pinkish-grey header background used across the app.
 */
export const TableHead = ({ children }) => (
  <thead>
    <tr className="border-b border-[#EAECF0] bg-tableHeader">
      {children}
    </tr>
  </thead>
);

/**
 * <th> cell.
 * Props:
 *   center   – text-center alignment
 *   className – extra Tailwind overrides
 */
export const Th = ({ children, center = false, className = "" }) => (
  <th
    className={`px-4 py-3 text-sm font-semibold text-[#344054] whitespace-nowrap first:pl-6 last:pr-6 ${
      center ? "text-center" : "text-left"
    } ${className}`}
  >
    {children}
  </th>
);

/**
 * <tbody> with consistent row-divider styling.
 */
export const TableBody = ({ children }) => (
  <tbody className="divide-y divide-[#EAECF0] bg-white">{children}</tbody>
);

/**
 * <tr> with hover effect.
 * Pass `className` for any row-specific overrides.
 */
export const TableRow = ({ children, className = "", ...rest }) => (
  <tr
    className={`transition-colors hover:bg-[#F9FAFB]/80 ${className}`}
    {...rest}
  >
    {children}
  </tr>
);

/**
 * <td> cell.
 * Props:
 *   center   – text-center alignment
 *   className – extra Tailwind overrides
 */
export const Td = ({ children, center = false, className = "" }) => (
  <td
    className={`px-4 py-3 align-middle text-sm text-secondaryTextColor first:pl-6 last:pr-6 ${
      center ? "text-center" : ""
    } ${className}`}
  >
    {children}
  </td>
);

/**
 * Empty-state row shown when a table has no data.
 */
export const TableEmpty = ({ colSpan = 1, message = "No data found." }) => (
  <tr>
    <td
      colSpan={colSpan}
      className="py-12 text-center text-sm text-[#667085]"
    >
      {message}
    </td>
  </tr>
);
