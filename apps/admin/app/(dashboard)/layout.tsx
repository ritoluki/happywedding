import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@wedding-invitation/ui";
import {
  LayoutDashboard,
  ShoppingBag,
  FileText,
  Palette,
  FileEdit,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Tổng quan", icon: LayoutDashboard },
  { href: "/don-hang", label: "Đơn hàng", icon: ShoppingBag },
  { href: "/template", label: "Mẫu thiệp", icon: FileText },
  { href: "/thiet-ke", label: "Thiết kế", icon: Palette },
  { href: "/noi-dung", label: "Nội dung", icon: FileEdit },
  { href: "/khach-hang", label: "Khách hàng", icon: Users },
  { href: "/cai-dat", label: "Cài đặt", icon: Settings },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/" className="font-semibold">
              Thiệp Cưới
            </Link>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="border-t p-4">
            <form action="/api/auth/logout" method="POST">
              <Button
                type="submit"
                variant="ghost"
                className="w-full justify-start gap-3"
              >
                <LogOut className="h-5 w-5" />
                Đăng xuất
              </Button>
            </form>
          </div>
        </div>
      </aside>

      <div className="ml-64 flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/95 px-8 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex flex-1 items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {user.email}
            </span>
          </div>
        </header>

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
