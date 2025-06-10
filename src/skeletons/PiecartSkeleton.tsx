const SkeletonCard = () => {
  return (
    <div
      role="status"
      className="relative h-96 w-full max-w-[480px] bg-[#232733] rounded-lg animate-pulse dark:bg-[#191c24] p-4"
    >
      {/* Header */}
      <div className="h-4 w-36 mt-5 -ml-1 mx-auto bg-gray-400 rounded-full dark:bg-gray-500"></div>

      {/* Main Chart Area */}
      <div className="flex gap-6 justify-center items-center mt-12">
        {/* Pie Circle */}
        <div className="h-56 w-56 bg-gray-400 rounded-full dark:bg-gray-500"></div>

        {/* Legend Items */}
        <div className="flex flex-col gap-3">
          <div className="h-3 w-16 bg-gray-400 rounded-full dark:bg-gray-500"></div>
          <div className="h-3 w-16 bg-gray-400 rounded-full dark:bg-gray-500"></div>
          <div className="h-3 w-16 bg-gray-400 rounded-full dark:bg-gray-500"></div>
        </div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

const PiecartSkeleton = () => {
  return (
    <>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </>
  );
};

export default PiecartSkeleton;
