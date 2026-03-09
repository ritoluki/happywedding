import { notFound } from "next/navigation";
import { getSupabase, getSupabaseServer } from "@/lib/supabase";
import {
  getInvitationBySlug,
  getCmsByKey,
  incrementInvitationView,
} from "@wedding-invitation/db";
import { InvitationViewer } from "./InvitationViewer";
import { RsvpSection } from "./RsvpSection";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = getSupabase();
  const data = await getInvitationBySlug(supabase, slug);
  if (!data) return { title: "Thiệp Cưới" };
  const { order } = data;
  const title = `Thiệp cưới ${order.groom_name} & ${order.bride_name}`;
  const description = `Lời mời đám cưới của ${order.groom_name} và ${order.bride_name} - ${order.wedding_date}${order.venue_name ? ` tại ${order.venue_name}` : ""}`;
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL ?? "http://localhost:3000";
  const url = `${baseUrl}/thiep/${slug}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Thiệp Cưới Điện Tử",
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = getSupabase();
  const data = await getInvitationBySlug(supabase, slug);
  if (!data) notFound();

  const { invitation, order, template } = data;

  // Increment view (cần service role)
  try {
    const serverSupabase = getSupabaseServer();
    await incrementInvitationView(serverSupabase, invitation.id);
  } catch {
    // Bỏ qua nếu không có service role
  }

  const showRsvp = (await getCmsByKey(supabase, "show_rsvp")) !== "false";

  // Nếu template đã có RSVP tích hợp bên trong (tag 'has-rsvp') thì không render thêm RsvpSection ngoài
  const templateTags = (template as { tags?: string[] | null } | null)?.tags ?? [];
  const templateHasRsvp = templateTags.includes("has-rsvp");

  return (
    <div className="min-h-screen flex flex-col">
      <InvitationViewer
        invitation={invitation}
        order={order}
        template={template}
      />
      {showRsvp && !templateHasRsvp && (
        <RsvpSection
          invitationId={invitation.id}
          orderId={order.id}
          guestName={invitation.guest_name}
        />
      )}
    </div>
  );
}
