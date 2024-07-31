const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
    return (
        <div
            className={`relative overflow-hidden rounded-xl bg-black bg-opacity-70 p-2 shadow-sm`}
        >
            <div className="flex p-4">
                <div className="h-5 w-5 rounded-md bg-black bg-opacity-60" />
                <p>Demo Bookings</p>
                <div className="ml-2 h-6 w-16 rounded-md bg-black bg-opacity-60 text-sm font-medium" />
            </div>
            <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8 bg-opacity-30">
                Bottom Div
                <div className="h-7 w-20 rounded-md bg-black bg-opacity-60" />
            </div>
        </div>
    );
}

export function CardsSkeleton() {
    return (
        <>
            <div
                className={`relative overflow-hidden rounded-xl bg-black bg-opacity-70 p-2 shadow-sm`}
            >
                <div className="flex p-4">
                    <div className="h-5 w-5 rounded-md bg-black bg-opacity-60" />
                    <p>Demo Bookings</p>
                    <div className="ml-2 h-6 w-16 rounded-md bg-black bg-opacity-60 text-sm font-medium" />
                </div>
                <div className="flex flex-col justify-center truncate rounded-xl bg-white px-4 py-8 bg-opacity-30">
                    <p>Number of Bookings so far</p>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-lg text-yellow-400 font-light ">22</span>
                        <a href="/admin/customers" className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none text-white bg-zinc-700 hover:bg-zinc-800 hover:outline-goldenrod focus:ring-4 focus:outline-none focus:ring-goldenrod font-medium rounded-lg text-sm px-5 py-2.5 text-center ">go to Clients -&gt;</a>
                    </div>
                </div>
            </div>
            <div
                className={`relative overflow-hidden rounded-xl bg-black bg-opacity-70 p-2 shadow-sm`}
            >
                <div className="flex p-4">
                    <div className="h-5 w-5 rounded-md bg-black bg-opacity-60" />
                    <p>Contact Us</p>
                    <div className="ml-2 h-6 w-16 rounded-md bg-black bg-opacity-60 text-sm font-medium" />
                </div>
                <div className="flex flex-col justify-center truncate rounded-xl bg-white px-4 py-8 bg-opacity-30">
                    <p>Number of Contact Messages</p>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-lg text-yellow-400 font-light ">59</span>
                        <a href="/admin/customers" className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none text-white bg-zinc-700 hover:bg-zinc-800 hover:outline-goldenrod focus:ring-4 focus:outline-none focus:ring-goldenrod font-medium rounded-lg text-sm px-5 py-2.5 text-center ">go to Clients -&gt;</a>
                    </div>
                </div>
            </div>
            <div
                className={`relative overflow-hidden rounded-xl bg-black bg-opacity-70 p-2 shadow-sm`}
            >
                <div className="flex p-4">
                    <div className="h-5 w-5 rounded-md bg-black bg-opacity-60" />
                    <p>Projects</p>
                    <div className="ml-2 h-6 w-16 rounded-md bg-black bg-opacity-60 text-sm font-medium" />
                </div>
                <div className="flex flex-col justify-center truncate rounded-xl bg-white px-4 py-8 bg-opacity-30">
                    <p>Number of Projects shown</p>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-lg text-yellow-400 font-light ">5</span>
                        <a href="/admin/projects" className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none text-white bg-zinc-700 hover:bg-zinc-800 hover:outline-goldenrod focus:ring-4 focus:outline-none focus:ring-goldenrod font-medium rounded-lg text-sm px-5 py-2.5 text-center ">go to Projects -&gt;</a>
                    </div>
                </div>
            </div>
            <div
                className={`relative overflow-hidden rounded-xl bg-black bg-opacity-70 p-2 shadow-sm`}
            >
                <div className="flex p-4">
                    <div className="h-5 w-5 rounded-md bg-black bg-opacity-60" />
                    <p>Other Metric</p>
                    <div className="ml-2 h-6 w-16 rounded-md bg-black bg-opacity-60 text-sm font-medium" />
                </div>
                <div className="flex flex-col justify-center truncate rounded-xl bg-white px-4 py-8 bg-opacity-30">
                    <p>Number of Other metric</p>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-lg text-yellow-400 font-light ">599</span>
                        <a href="/admin/customers" className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none text-white bg-zinc-700 hover:bg-zinc-800 hover:outline-goldenrod focus:ring-4 focus:outline-none focus:ring-goldenrod font-medium rounded-lg text-sm px-5 py-2.5 text-center ">go to Clients -&gt;</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export function InvoiceSkeleton() {
    return (
        <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
            <div className="flex items-center">
                <div className="mr-2 h-8 w-8 rounded-full bg-gray-200" />
                <div className="min-w-0">
                    <div className="h-5 w-40 rounded-md bg-gray-200" />
                    <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
                </div>
            </div>
            <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
        </div>
    );
}

export function RevenueChartSkeleton() {
    return (
        <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
            <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
            <div className="rounded-xl bg-gray-100 p-4">
                <div className="mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4" />
                <div className="flex items-center pb-2 pt-6">
                    <div className="h-5 w-5 rounded-full bg-gray-200" />
                    <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
                </div>
            </div>
        </div>
    );
}

export function LatestInvoicesSkeleton() {
    return (
        <div
            className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4`}
        >
            <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
            <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
                <div className="bg-white px-6">
                    <InvoiceSkeleton />
                    <InvoiceSkeleton />
                    <InvoiceSkeleton />
                    <InvoiceSkeleton />
                    <InvoiceSkeleton />
                    <div className="flex items-center pb-2 pt-6">
                        <div className="h-5 w-5 rounded-full bg-gray-200" />
                        <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
                    </div>
                </div>
            </div>
        </div>
    );
}