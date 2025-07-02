import SaleTableSkeleton from "@/skeletons/SaleTableSkeleton";

function TableBody({ children, fetching ,filterData}: { children: React.ReactNode; fetching?: boolean;filterData:any }) {
  return (
    <tbody>
      {fetching ? (
        <SaleTableSkeleton filterData={filterData} />  // ✅ Render skeleton as multiple <tr> rows
      ) : (
        <>
          {children}
        </>
      )}
    </tbody>
  );
}

export default TableBody;
