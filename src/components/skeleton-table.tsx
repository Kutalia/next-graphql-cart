import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonTable() {
  return (
    <div className="flex flex-col space-y-3 w-full">
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
      {
        Array(5).fill(null).map((_, index) =>
          <div key={index} className="flex gap-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-8 w-1/2" />
          </div>)
      }
      <Skeleton className="h-[155px] rounded-xl" />
    </div>
  )
}
