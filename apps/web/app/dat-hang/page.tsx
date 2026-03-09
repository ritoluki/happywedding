import Link from "next/link";
import { getSupabase } from "@/lib/supabase";
import { getActiveTemplates, getPackages } from "@wedding-invitation/db";
import { Button } from "@wedding-invitation/ui";
import { BookingForm } from "@/components/BookingForm";

export const metadata = {
  title: "Đặt Dịch Vụ | Thiệp Cưới Điện Tử",
  description: "Điền form để đặt thiệp cưới điện tử",
};

export const dynamic = "force-dynamic";

export default async function DatHangPage() {
  const supabase = getSupabase();
  const [templates, packages] = await Promise.all([
    getActiveTemplates(supabase),
    getPackages(supabase),
  ]);

  const pkgList = packages.map((p) => ({
    id: p.id,
    type: p.type,
    name: p.name,
    price: Number(p.price),
    description: p.description,
  }));
  const tplList = templates.map((t) => ({
    id: t.id,
    name: t.name,
    slug: t.slug,
    description: t.description,
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <Link href="/" className="text-rose-600 hover:underline text-sm">
            ← Về trang chủ
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Đặt Dịch Vụ Thiệp Cưới</h1>
        <p className="mt-2 text-gray-600">
          Điền form bên dưới, chúng tôi sẽ liên hệ xác nhận và hỗ trợ bạn.
        </p>

        {pkgList.length === 0 || tplList.length === 0 ? (
          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6">
            <p className="text-amber-800">
              Chưa có gói dịch vụ hoặc mẫu thiệp. Vui lòng quay lại sau hoặc liên hệ admin.
            </p>
            <Button asChild className="mt-4">
              <Link href="/">Về Trang Chủ</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <BookingForm packages={pkgList} templates={tplList} />
          </div>
        )}
      </div>
    </div>
  );
}
