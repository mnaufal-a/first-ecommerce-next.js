
export default function ProductSkeleton() {
    return (
        <div className="animate-pulse flex items-center justify-between border max-w-lg p-3 rounded">
            <div className="space-y-2 w-full">
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>

            <div className="flex gap-2">
                <div className="h-8 w-16 bg-gray-300 rounded"></div>
                <div className="h-8 w-16 bg-gray-300 rounded"></div>
            </div>
        </div>
    )
}