import Link from "next/link";
import { Badge } from "@wedding-invitation/ui";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const RSVP_LABELS: Record<string, string> = {
  pending: "Chờ phản hồi",
  attending: "Sẽ tham dự",
  not_attending: "Không tham dự",
  maybe: "Chưa chắc chắn",
};

const RSVP_COLORS: Record<string, string> = {
  pending: "bg-gray-100 text-gray-700",
  attending: "bg-green-100 text-green-800",
  not_attending: "bg-red-100 text-red-800",
  maybe: "bg-amber-100 text-amber-800",
};

type GuestRow = {
  id: string;
  order_id: string;
  name: string;
  phone: string | null;
  email: string | null;
  rsvp_status: string;
  guest_count: number;
  responded_at: string | null;
  orders?: { order_code: string; groom_name: string; bride_name: string } | null;
  invitations?: { url_slug: string } | null;
};

export function GuestsListTable({
  guests,
  baseUrl,
}: {
  guests: GuestRow[];
  baseUrl: string;
}) {
  if (guests.length === 0) {
    return <p className="text-sm text-muted-foreground py-8 text-center">Không có khách nào.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-left py-3 px-4 font-medium">Khách</th>
            <th className="text-left py-3 px-4 font-medium">SĐT</th>
            <th className="text-left py-3 px-4 font-medium">Đơn hàng</th>
            <th className="text-left py-3 px-4 font-medium">RSVP</th>
            <th className="text-left py-3 px-4 font-medium">Số người</th>
            <th className="text-left py-3 px-4 font-medium">Phản hồi</th>
            <th className="text-left py-3 px-4 font-medium">Thiệp</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((g) => (
            <tr key={g.id} className="border-t">
              <td className="py-2 px-4">{g.name}</td>
              <td className="py-2 px-4">{g.phone || "—"}</td>
              <td className="py-2 px-4">
                {g.orders ? (
                  <Link href={`/don-hang/${g.order_id}`} className="text-primary hover:underline">
                    {g.orders.order_code} — {g.orders.groom_name} & {g.orders.bride_name}
                  </Link>
                ) : "—"}
              </td>
              <td className="py-2 px-4">
                <Badge className={RSVP_COLORS[g.rsvp_status] ?? ""}>
                  {RSVP_LABELS[g.rsvp_status] ?? g.rsvp_status}
                </Badge>
              </td>
              <td className="py-2 px-4">{g.guest_count}</td>
              <td className="py-2 px-4">
                {g.responded_at
                  ? format(new Date(g.responded_at), "dd/MM/yyyy HH:mm", { locale: vi })
                  : "—"}
              </td>
              <td className="py-2 px-4">
                {g.invitations?.url_slug ? (
                  <a
                    href={`${baseUrl}/thiep/${g.invitations.url_slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    Xem
                  </a>
                ) : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
