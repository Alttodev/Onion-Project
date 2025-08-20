import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="w-full">
      {/* Header Skeleton */}
      <div className="bg-white mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <Skeleton className="h-16 w-16 rounded-full" />

            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          <Skeleton className="h-6 w-28 rounded-md" />
        </div>
      </div>

      {/* Filters Skeleton */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-stretch md:items-center py-4 mt-10 gap-3">
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Skeleton className="h-10 w-full sm:w-64" />
          <Skeleton className="h-10 w-full sm:w-64" />
        </div>
        <Skeleton className="h-10 w-24" />
      </div>

      {/* Table Skeleton */}
      <div className="rounded-md border-1 border-solid border-gray-200 bg-white shadow-sm w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {Array.from({ length: 7 }).map((_, i) => (
                <th key={i} className="border-b border-gray-300 p-4">
                  <Skeleton className="h-4 w-20 mx-auto" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <tr key={rowIndex} className=" h-12">
                {Array.from({ length: 7 }).map((_, cellIndex) => (
                  <td key={cellIndex} className="p-2">
                    <Skeleton className="h-4 w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Skeleton className="h-4 w-32" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-[70px]" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </div>
  );
}
