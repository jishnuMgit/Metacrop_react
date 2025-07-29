import { useLocation } from "react-router-dom";

const SaleTableSkeleton = ({ filterData }: any): JSX.Element => {
  const skeletonRows = Array(10).fill(0); // 10 skeleton rows
  const location = useLocation();
  const isReturnPage = location.pathname === "/sales/return";

  return (
    <>
      {skeletonRows.map((_, index) => (
        <tr key={index} className="animate-pulse">
          {/* Sales ID */}
          <td className="p-4">
            <div className="h-4 w-10 bg-gray-300 rounded dark:bg-gray-600" />
          </td>

          {/* Customer Name */}
          <td className="p-4">
            <div className="h-4 w-24 bg-gray-300 rounded dark:bg-gray-600" />
          </td>

          {/* Status */}
          <td className="p-4">
            <div className="h-4 w-12 bg-gray-300 rounded dark:bg-gray-600" />
          </td>

          {/* Date */}
          <td className="p-4">
            <div className="h-4 w-20 bg-gray-300 rounded dark:bg-gray-600" />
          </td>

          {/* Additional columns only if not in return page */}
          {!isReturnPage && (
            <>
              {/* Payment Method */}
              <td className="p-4">
                <div className="h-4 w-16 bg-gray-300 rounded dark:bg-gray-600" />
              </td>

              {/* Total Items */}
              <td className="p-4">
                <div className="h-4 w-16 bg-gray-300 rounded dark:bg-gray-600" />
              </td>

              {/* Total Amount */}
              <td className="p-4">
                <div className="h-4 w-16 bg-gray-300 rounded dark:bg-gray-600" />
              </td>

              {/* Optional Range Filter Column */}
              {filterData?.range !== null && (
                <td className="p-4">
                  <div className="h-4 w-16 bg-gray-300 rounded dark:bg-gray-600" />
                </td>
              )}
            </>
          )}
        </tr>
      ))}
    </>
  );
};

export default SaleTableSkeleton;
