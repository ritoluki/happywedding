import {
  ShoppingBag,
  DollarSign,
  Clock,
  Eye,
} from "lucide-react";

const icons = {
  orders: ShoppingBag,
  revenue: DollarSign,
  processing: Clock,
  views: Eye,
};

interface StatsCardsProps {
  stats: {
    ordersToday: number;
    revenueThisMonth: number;
    ordersProcessing: number;
    totalViews: number;
  };
}

const cards = [
  {
    key: "ordersToday" as const,
    label: "Đơn hôm nay",
    icon: icons.orders,
  },
  {
    key: "revenueThisMonth" as const,
    label: "Doanh thu tháng",
    icon: icons.revenue,
  },
  {
    key: "ordersProcessing" as const,
    label: "Đơn đang xử lý",
    icon: icons.processing,
  },
  {
    key: "totalViews" as const,
    label: "Tổng lượt xem",
    icon: icons.views,
  },
];

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ key, label, icon: Icon }) => (
        <div
          key={key}
          className="rounded-lg border bg-card p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="mt-2 text-2xl font-bold">
            {key === "revenueThisMonth"
              ? new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(stats[key])
              : stats[key].toLocaleString("vi-VN")}
          </p>
        </div>
      ))}
    </div>
  );
}
