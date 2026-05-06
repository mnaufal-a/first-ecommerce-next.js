import { Skeleton } from "@/components/ui/skeleton"

export default function ProductSkeleton() {
    return (
        <div className="space-y">
            <Skeleton className="w-full h-40 rounded-md"/>
            <Skeleton className="w-3/4 h-4"/>
            <Skeleton className="w-1/2 h-4"/>
        </div>
    )
}