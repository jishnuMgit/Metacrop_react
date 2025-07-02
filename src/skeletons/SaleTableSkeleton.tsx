import { useLocation } from "react-router-dom";

const SaleTableSkeleton = ({
    filterData
}) => {
  const skeletonRows = Array(10).fill(0); // 10 skeleton rows for loading state

  const location = useLocation();

  return (
    <>
      {skeletonRows.map((_, index) => (
             
         (location.pathname=='/sales/return'? <tr key={index} className="animate-pulse">
          {/* Sales ID */}
          <td className="p-4">
            <div className="h-4 w-10 bg-gray-300 rounded dark:bg-gray-600"></div>
          </td>

          {/* Customer Name */}
          <td className="p-4">
            <div className="h-4 w-24 bg-gray-300 rounded dark:bg-gray-600"></div>
          </td>

          {/* Status */}
          <td className="p-4">
            <div className="h-4 w-12 bg-gray-300 rounded dark:bg-gray-600"></div>
          </td>

          {/* Date */}
          <td className="p-4">
            <div className="h-4 w-20 bg-gray-300 rounded dark:bg-gray-600"></div>
          </td>

        
        </tr>: <tr key={index} className="animate-pulse">
          {/* Sales ID */}
          <td className="p-4">
            <div className="h-4 w-10 bg-gray-300 rounded dark:bg-gray-600"></div>
          </td>

          {/* Customer Name */}
          <td className="p-4">
            <div className="h-4 w-24 bg-gray-300 rounded dark:bg-gray-600"></div>
          </td>

          {/* Status */}
          <td className="p-4">
            <div className="h-4 w-12 bg-gray-300 rounded dark:bg-gray-600"></div>
          </td>

          {/* Date */}
          <td className="p-4">
            <div className="h-4 w-20 bg-gray-300 rounded dark:bg-gray-600"></div>
          </td>

          {/* Payment Method */}
          <td className="p-4">
            <div className="h-4 w-16 bg-gray-300 rounded dark:bg-gray-600"></div>
          </td>

          {/* Total Items / Total Amount */}
          <td className="p-4">
            <div className="h-4 w-16 bg-gray-300 rounded dark:bg-gray-600"></div>
          </td>
           <td className="p-4">
            <div className="h-4 w-16 bg-gray-300 rounded dark:bg-gray-600"></div>
          </td>
          {
filterData?.range == null ?<></>: <td className="p-4">
            <div className="h-4 w-16 bg-gray-300 rounded dark:bg-gray-600"></div>
          </td>
      }
        </tr>)  


       
      ))}
    </>
  );
};

export default SaleTableSkeleton;
