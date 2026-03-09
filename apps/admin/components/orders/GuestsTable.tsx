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

type Guest = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  rsvp_status: string;
  rsvp_note: string | null;
  guest_count: number;
  responded_at: string | null;
  invitations?: { url_slug: string; guest_name: string | null } | null;
};

export function GuestsTable({
  guests,
  baseUrl,
}: {
  guests: Guest[];
  baseUrl: string;
}) {
  if (guests.length === 0) {
    return <p className="text-sm text-muted-foreground">Chưa có khách nào.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 font-medium">Khách</th>
            <th className="text-left py-2 font-medium">SĐT</th>
            <th className="text-left py-2 font-medium">RSVP</th>
            <th className="text-left py-2 font-medium">Số người</th>
            <th className="text-left py-2 font-medium">Phản hồi lúc</th>
            <th className="text-left py-2 font-medium">Link thiệp</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((g) => (
            <tr key={g.id} className="border-b">
              <td className="py-2">{g.name}</td>
              <td className="py-2">{g.phone || "—"}</td>
              <td className="py-2">
                <Badge className={RSVP_COLORS[g.rsvp_status] ?? ""}>
                  {RSVP_LABELS[g.rsvp_status] ?? g.rsvp_status}
                </Badge>
              </td>
              <td className="py-2">{g.guest_count}</td>
              <td className="py-2">
                {g.responded_at
                  ? format(new Date(g.responded_at), "dd/MM/yyyy HH:mm", { locale: vi })
                  : "—"}
              </td>
              <td className="py-2">
                {g.invitations?.url_slug ? (
                  <a
                    href={`${baseUrl}/thiep/${g.invitations.url_slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline text-xs"
                  >
                    Xem
                  </a>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {guests.some((g) => g.rsvp_note) && (
        <div className="mt-4 space-y-2">
          <p className="font-medium text-sm">Ghi chú:</p>
          {guests
            .filter((g) => g.rsvp_note)
            .map((g) => (
              <div key={g.id} className="text-sm text-muted-foreground">
                <span className="font-medium">{g.name}:</span> {g.rsvp_note}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
