import { notFound } from "next/navigation";
import Link from "next/link";
import { getOrderById } from "@/lib/orders";
import { Button } from "@wedding-invitation/ui";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { ArrowLeft } from "lucide-react";
import { OrderDetailForm } from "@/components/orders/OrderDetailForm";
import { InvitationSection } from "@/components/orders/InvitationSection";
import { getInvitationsByOrderId } from "@/lib/invitations";
import { getGuestsByOrderId } from "@/lib/guests";
import { GuestsTable } from "@/components/orders/GuestsTable";
import type { OrderStatus, PaymentStatus } from "@wedding-invitation/db";

interface PageProps {
  params: { id: string };
}

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = params;
  const order = await getOrderById(id);
  if (!order) notFound();

  const o = order as Record<string, unknown>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/don-hang">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Chi tiết đơn {String(o.order_code ?? "")}</h1>
          <p className="text-muted-foreground">
            {String(o.groom_name ?? "")} & {String(o.bride_name ?? "")}
          </p>
        </div>
      </div>

      <OrderDetailForm
        orderId={id}
        currentStatus={(o.status ?? "pending") as OrderStatus}
        currentPaymentStatus={(o.payment_status ?? "unpaid") as PaymentStatus}
        adminNotes={String(o.admin_notes ?? "")}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 font-semibold">Thông tin đám cưới</h2>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-muted-foreground">Chú rể</dt>
              <dd>{String(o.groom_name ?? "")}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Cô dâu</dt>
              <dd>{String(o.bride_name ?? "")}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Ngày cưới</dt>
              <dd>
                {o.wedding_date
                  ? format(new Date(String(o.wedding_date)), "dd/MM/yyyy", {
                      locale: vi,
                    })
                  : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Giờ cưới</dt>
              <dd>{String(o.wedding_time ?? "—")}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Địa điểm</dt>
              <dd>{String(o.venue_name || o.venue_address || "—")}</dd>
            </div>
            {o.venue_maps_url ? (
              <div>
                <dt className="text-muted-foreground">Google Maps</dt>
                <dd>
                  <a
                    href={String(o.venue_maps_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    Xem bản đồ
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 font-semibold">Thông tin khách hàng</h2>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-muted-foreground">Người đặt</dt>
              <dd>{String(o.customer_name ?? "")}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Số điện thoại</dt>
              <dd>{String(o.customer_phone ?? "")}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Email</dt>
              <dd>{String(o.customer_email || "—")}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Zalo</dt>
              <dd>{String(o.customer_zalo || "—")}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Gói dịch vụ</dt>
              <dd>{(o.packages as { name?: string })?.name ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Tổng tiền</dt>
              <dd>
                {o.total_amount
                  ? new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(Number(o.total_amount))
                  : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Ngày tạo</dt>
              <dd>
                {o.created_at
                  ? format(new Date(String(o.created_at)), "dd/MM/yyyy HH:mm", {
                      locale: vi,
                    })
                  : "—"}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <InvitationSection
        orderId={id}
        templateId={(o.template_id ?? (o.templates as { id?: string } | null)?.id) as string | null}
        invitations={await getInvitationsByOrderId(id)}
        baseUrl={process.env.NEXT_PUBLIC_WEB_URL ?? "http://localhost:3000"}
      />

      <div className="rounded-lg border bg-card p-6">
        <h2 className="mb-4 font-semibold">Khách & RSVP</h2>
        <GuestsTable
          guests={await getGuestsByOrderId(id)}
          baseUrl={process.env.NEXT_PUBLIC_WEB_URL ?? "http://localhost:3000"}
        />
      </div>
    </div>
  );
}
