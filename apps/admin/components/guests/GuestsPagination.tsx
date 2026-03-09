import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@wedding-invitation/ui";

export function GuestsPagination({
  page,
  pageSize,
  total,
  searchParams,
}: {
  page: number;
  pageSize: number;
  total: number;
  searchParams: URLSearchParams;
}) {
  const totalPages = Math.ceil(total / pageSize) || 1;
  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;

  const makeUrl = (p: number) => {
    const p2 = new URLSearchParams(searchParams);
    p2.set("page", String(p));
    return `/khach-hang?${p2.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Trang {page} / {totalPages} ({total} khách)
      </p>
      <div className="flex gap-2">
        {prevPage && (
          <Button variant="outline" size="sm" asChild>
            <Link href={makeUrl(prevPage)}>
              <ChevronLeft className="h-4 w-4" />
              Trước
            </Link>
          </Button>
        )}
        {nextPage && (
          <Button variant="outline" size="sm" asChild>
            <Link href={makeUrl(nextPage)}>
              Sau
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
