import { notFound } from "next/navigation";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase";
import { InvitationViewer } from "../../thiep/[slug]/InvitationViewer";

export const dynamic = "force-dynamic";

const BANNER_HEIGHT = "52px";

const FAKE_ORDER = {
  groom_name: "Minh Anh",
  bride_name: "Thùy Linh",
  wedding_date: "2026-09-15",
  wedding_time: "18:00",
  venue_name: "White Palace Convention",
  venue_address: "194 Hoàng Văn Thụ, Phú Nhuận, TP.HCM",
  venue_maps_url: "https://maps.google.com",
  story:
    "Chúng tôi gặp nhau trong một buổi chiều mùa thu năm 2023. Từ người lạ, chúng tôi trở thành những người bạn tốt nhất, rồi yêu nhau từ lúc nào không hay. Hành trình ấy dẫn đến ngày hạnh phúc này.",
  hashtag: "MinhAnh_ThuyLinh_2026",
  music_url: null,
  couple_photos: [],
};

const FAKE_INVITATION = {
  guest_name: "Quý Khách",
};

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = getSupabase();

  const { data: template } = await supabase
    .from("templates")
    .select("html_content, css_content, js_content, name, slug")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!template) notFound();

  return (
    <div className="relative">
      {/* ── Top Banner ── */}
      <div
        style={{ height: BANNER_HEIGHT }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-3 px-4 bg-black/90 backdrop-blur-md border-b border-white/10"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="hidden sm:inline text-xs tracking-widest text-yellow-400/70 uppercase whitespace-nowrap">
            Xem Demo
          </span>
          <span className="text-white font-medium text-sm truncate">
            {template.name}
          </span>
          <span className="hidden sm:inline text-xs text-white/30 italic whitespace-nowrap">
            — dữ liệu minh họa
          </span>
        </div>
        <Link
          href={`/dat-hang?template=${slug}`}
          className="flex-shrink-0 flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs sm:text-sm px-4 py-2 rounded transition-colors"
        >
          Đặt mẫu này
        </Link>
      </div>

      {/* ── Template iframe ── */}
      <div style={{ paddingTop: BANNER_HEIGHT }}>
        <InvitationViewer
          invitation={FAKE_INVITATION}
          order={FAKE_ORDER}
          template={template}
          frameHeight={`calc(100vh - ${BANNER_HEIGHT})`}
        />
      </div>

    </div>
  );
}
