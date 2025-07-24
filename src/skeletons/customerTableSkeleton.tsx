const CustomerTableSkeleton = () => {
  const skeletonArray = [1, 2, 3, 4, 5, 6]; // Number of skeleton cards

  return (
    <div className="w-full px-4">
      <div className="animate-pulse w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skeletonArray.map((_, index) => (
          <div
            key={index}
            className="w-full shadow-md border border-blue-gray-100 dark:bg-dark-primary-bg dark:border-gray-800 p-4 rounded-md"
          >
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3 mb-4"></div>

            <div className="flex justify-end">
              <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerTableSkeleton;
