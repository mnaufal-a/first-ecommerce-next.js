export default function Loading() {
    return (
        <div className="p-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse space-y-3">

                    <div className="h-40 bg-slate-200 rounded-md"/>

                    <div className="h-40 bg-slate-200 rounded-3/4"/>
                    <div className="h-40 bg-slate-200 rounded-1/2"/>
                    
                    <div className="h-10 bg-slate-200 rounded mt-2"/>
                </div>
            ))}
        </div>
    )
}