import { ImageResponse } from "next/og";
import { getSupabase } from "@/lib/supabase";
import { getInvitationBySlug } from "@wedding-invitation/db";

export const alt = "Thiệp cưới điện tử";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = getSupabase();
  const data = await getInvitationBySlug(supabase, slug);

  const groom = data?.order.groom_name ?? "Chú rể";
  const bride = data?.order.bride_name ?? "Cô dâu";
  const date = data?.order.wedding_date
    ? new Date(data.order.wedding_date).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";
  const venue = data?.order.venue_name ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fce7f3 0%, #fdf2f8 50%, #fff7ed 100%)",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#9f1239",
            marginBottom: 16,
          }}
        >
          {groom} &amp; {bride}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#831843",
            marginBottom: 8,
          }}
        >
          Trân trọng kính mời
        </div>
        {date && (
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: "#4a5568",
            }}
          >
            {date}
          </div>
        )}
        {venue && (
          <div
            style={{
              fontSize: 24,
              color: "#718096",
              marginTop: 8,
            }}
          >
            {venue}
          </div>
        )}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            fontSize: 18,
            color: "#a0aec0",
          }}
        >
          Thiệp Cưới Điện Tử
        </div>
      </div>
    ),
    { ...size }
  );
}
