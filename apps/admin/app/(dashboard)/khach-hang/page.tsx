import { Suspense } from "react";
import { getGuests } from "@/lib/guests";
import { GuestsFilters } from "@/components/guests/GuestsFilters";
import { GuestsListTable } from "@/components/guests/GuestsListTable";
import { GuestsPagination } from "@/components/guests/GuestsPagination";

const PAGE_SIZE = 20;

export default async function KhachHangPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(String(params.page || "1"), 10));
  const search = String(params.search || "");
  const rsvp = String(params.rsvp_status || "");
  const orderId = String(params.order_id || "");

  const { guests, total } = await getGuests(page, PAGE_SIZE, {
    search: search || undefined,
    rsvp_status: rsvp || undefined,
    order_id: orderId || undefined,
  });

  const paginationParams = new URLSearchParams();
  if (search) paginationParams.set("search", search);
  if (rsvp) paginationParams.set("rsvp_status", rsvp);
  if (orderId) paginationParams.set("order_id", orderId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Khách hàng</h1>
        <p className="mt-1 text-muted-foreground">Danh sách khách mời & RSVP</p>
      </div>

      <Suspense fallback={<div className="h-24 animate-pulse rounded-lg bg-muted" />}>
        <GuestsFilters orderId={orderId || undefined} />
      </Suspense>

      <GuestsListTable
        guests={guests}
        baseUrl={process.env.NEXT_PUBLIC_WEB_URL ?? "http://localhost:3000"}
      />

      <GuestsPagination
        page={page}
        pageSize={PAGE_SIZE}
        total={total}
        searchParams={paginationParams}
      />
    </div>
  );
}
