import Link from "next/link";
import { Button } from "@wedding-invitation/ui";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { RecentOrdersTable } from "@/components/dashboard/RecentOrdersTable";
import {
  getDashboardStats,
  getRevenueByMonth,
  getOrdersByPackage,
  getOrdersByStatus,
  getRecentOrders,
} from "@/lib/dashboard";
import { FileText, Plus } from "lucide-react";

export default async function DashboardPage() {
  const [stats, revenueData, packageData, statusData, recentOrders] =
    await Promise.all([
      getDashboardStats(),
      getRevenueByMonth(),
      getOrdersByPackage(),
      getOrdersByStatus(),
      getRecentOrders(10),
    ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tổng quan</h1>
          <p className="mt-1 text-muted-foreground">
            Chào mừng đến Admin Panel
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/don-hang">
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Xem đơn mới
            </Button>
          </Link>
          <Link href="/don-hang?action=create">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Tạo thiệp nhanh
            </Button>
          </Link>
        </div>
      </div>

      <StatsCards stats={stats} />
      <DashboardCharts
        revenueData={revenueData}
        packageData={packageData}
        statusData={statusData}
      />
      <RecentOrdersTable orders={recentOrders} />
    </div>
  );
}
