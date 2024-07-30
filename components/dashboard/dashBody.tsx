import { Suspense } from "react";
import { CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from "./skeletons";
import { Card } from "@material-tailwind/react";

export default function DashOverviewBody() {
    return (
        <main>
            <h1 className={`mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <CardsSkeleton />
                {/* <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper />
                </Suspense> */}

            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <RevenueChartSkeleton />
                {/* <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                </Suspense> */}
                <LatestInvoicesSkeleton />
                {/* <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoices />
                </Suspense> */}
            </div>
        </main>
    )
}