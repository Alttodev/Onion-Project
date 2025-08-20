import { Skeleton } from "../ui/skeleton";

const FormSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="flex flex-col gap-1">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="flex flex-col gap-1">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="flex flex-col gap-1">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <div className="flex flex-col gap-1">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>
    </div>
  );
};

export default FormSkeleton;
