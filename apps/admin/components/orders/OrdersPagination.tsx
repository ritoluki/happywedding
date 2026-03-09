import Link from "next/link";
import { Button } from "@wedding-invitation/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface OrdersPaginationProps {
  page: number;
  pageSize: number;
  total: number;
  searchParams: URLSearchParams;
}

export function OrdersPagination({
  page,
  pageSize,
  total,
  searchParams,
}: OrdersPaginationProps) {
  const totalPages = Math.ceil(total / pageSize) || 1;
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  function buildUrl(newPage: number) {
    const p = new URLSearchParams(searchParams);
    p.set("page", String(newPage));
    return `/don-hang?${p.toString()}`;
  }

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        {total === 0 ? "Không có đơn" : `${from}-${to} / ${total} đơn`}
      </p>
      <div className="flex gap-2">
        {hasPrev ? (
          <Button variant="outline" size="sm" asChild>
            <Link href={buildUrl(page - 1)}>
              <ChevronLeft className="h-4 w-4" />
              Trước
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
            Trước
          </Button>
        )}
        <span className="flex items-center px-2 text-sm">
          Trang {page} / {totalPages}
        </span>
        {hasNext ? (
          <Button variant="outline" size="sm" asChild>
            <Link href={buildUrl(page + 1)}>
              Sau
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled>
            Sau
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
