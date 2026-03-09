"use client";

import { useEffect, useRef } from "react";

type Order = {
  groom_name: string;
  bride_name: string;
  wedding_date: string;
  wedding_time: string | null;
  venue_name: string | null;
  venue_address: string | null;
  venue_maps_url: string | null;
  story: string | null;
  hashtag: string | null;
  music_url: string | null;
  couple_photos: string[] | null;
};

type Template = {
  html_content: string | null;
  css_content: string | null;
  js_content: string | null;
} | null;

type Invitation = {
  guest_name: string | null;
};

function replacePlaceholders(
  html: string,
  order: Order,
  invitation: Invitation
): string {
  const vars: Record<string, string> = {
    groom_name: order.groom_name,
    bride_name: order.bride_name,
    wedding_date: order.wedding_date,
    wedding_time: order.wedding_time ?? "",
    venue_name: order.venue_name ?? "",
    venue_address: order.venue_address ?? "",
    venue_maps_url: order.venue_maps_url ?? "",
    story: order.story ?? "",
    hashtag: order.hashtag ?? "",
    guest_name: invitation.guest_name ?? "",
  };
  let out = html;
  for (const [k, v] of Object.entries(vars)) {
    out = out.replace(new RegExp(`{{${k}}}`, "gi"), v);
  }
  return out;
}

export function InvitationViewer({
  invitation,
  order,
  template,
}: {
  invitation: Invitation;
  order: Order;
  template: Template;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current || !template) return;

    const html = template.html_content ?? "<p>Chưa có nội dung thiệp.</p>";
    const css = template.css_content ?? "";
    const js = template.js_content ?? "";

    const finalHtml = replacePlaceholders(html, order, invitation);
    const weddingData = {
      groom_name: order.groom_name,
      bride_name: order.bride_name,
      wedding_date: order.wedding_date,
      wedding_time: order.wedding_time,
      venue_name: order.venue_name,
      venue_address: order.venue_address,
      venue_maps_url: order.venue_maps_url,
      story: order.story,
      hashtag: order.hashtag,
      guest_name: invitation.guest_name,
      music_url: order.music_url,
      couple_photos: order.couple_photos,
    };

    const doc = iframeRef.current.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>${css}</style>
</head>
<body>
  <script>window.WEDDING_DATA = ${JSON.stringify(weddingData)};</script>
  <div id="invitation-root">${finalHtml}</div>
  <script>${js}</script>
</body>
</html>
    `);
    doc.close();
  }, [invitation, order, template]);

  if (!template) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-gray-100 p-8">
        <div className="text-center text-gray-600">
          <h2 className="text-xl font-semibold">{order.groom_name} &amp; {order.bride_name}</h2>
          <p className="mt-2">Ngày cưới: {order.wedding_date}</p>
          {order.venue_name && <p>Địa điểm: {order.venue_name}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full" style={{ height: "100vh" }}>
      <iframe
        ref={iframeRef}
        title="Thiệp cưới"
        className="w-full border-0"
        style={{ height: "100vh" }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
