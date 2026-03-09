import Link from "next/link";
import { Button, Badge } from "@wedding-invitation/ui";

export const dynamic = "force-dynamic";
import { getSupabase } from "@/lib/supabase";
import { getActiveTemplates, getPackages, getCmsByKey } from "@wedding-invitation/db";
import type { PackageType } from "@wedding-invitation/db";

const PACKAGE_LABELS: Record<PackageType, string> = {
  basic: "Cơ Bản",
  standard: "Tiêu Chuẩn",
  premium: "Cao Cấp",
};

function formatPrice(v: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(v);
}

export default async function Home() {
  const supabase = getSupabase();
  const [templates, packages, heroTitle, heroSubtitle, contactZalo, contactPhone] =
    await Promise.all([
      getActiveTemplates(supabase),
      getPackages(supabase),
      getCmsByKey(supabase, "hero_title"),
      getCmsByKey(supabase, "hero_subtitle"),
      getCmsByKey(supabase, "contact_zalo"),
      getCmsByKey(supabase, "contact_phone"),
    ]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-rose-100/80 via-white to-amber-50/60"
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            {heroTitle || "Thiệp Cưới Điện Tử Đẹp & Sang Trọng"}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            {heroSubtitle || "Gửi lời mời đặc biệt đến từng người thân yêu"}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="text-base">
              <Link href="#mau-thiep">Xem Mẫu Thiệp</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base">
              <Link href="#dat-dich-vu">Đặt Dịch Vụ</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="mau-thiep" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Mẫu Thiệp Nổi Bật</h2>
          <p className="mt-2 text-gray-600 text-center max-w-xl mx-auto">
            Chọn mẫu phù hợp với phong cách đám cưới của bạn
          </p>
          {templates.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {templates.map((t) => (
                <Link
                  key={t.id}
                  href={`/dat-hang?template=${t.slug}`}
                  className="group block rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm transition hover:shadow-md hover:border-rose-200"
                >
                  <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                    {t.thumbnail_url ? (
                      <img
                        src={t.thumbnail_url}
                        alt={t.name}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm">
                        Chưa có ảnh
                      </div>
                    )}
                    {t.is_featured && (
                      <Badge className="absolute top-3 right-3 bg-rose-500">Nổi bật</Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-rose-600">
                      {t.name}
                    </h3>
                    {t.description && (
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{t.description}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-10 text-center text-gray-500">
              Đang cập nhật mẫu thiệp. Vui lòng quay lại sau.
            </p>
          )}
        </div>
      </section>

      {/* Pricing */}
      <section id="bang-gia" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Bảng Giá</h2>
          <p className="mt-2 text-gray-600 text-center max-w-xl mx-auto">
            Chọn gói phù hợp với quy mô đám cưới
          </p>
          {packages.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {packages.map((pkg) => {
                const features =
                  (pkg.features as { features?: string[] } | null)?.features ?? [];
                const isStandard = pkg.type === "standard";
                return (
                  <div
                    key={pkg.id}
                    className={`rounded-xl border-2 p-6 bg-white ${
                      isStandard
                        ? "border-rose-400 shadow-lg ring-2 ring-rose-100"
                        : "border-gray-200"
                    }`}
                  >
                    {isStandard && (
                      <Badge className="mb-4 bg-rose-500">Phổ biến</Badge>
                    )}
                    <h3 className="text-xl font-bold text-gray-900">
                      {PACKAGE_LABELS[pkg.type] || pkg.name}
                    </h3>
                    {pkg.description && (
                      <p className="mt-1 text-sm text-gray-600">{pkg.description}</p>
                    )}
                    <p className="mt-4 text-2xl font-bold text-rose-600">
                      {formatPrice(Number(pkg.price))}
                    </p>
                    {pkg.personal_invitation_limit !== null && (
                      <p className="mt-1 text-sm text-gray-500">
                        {pkg.personal_invitation_limit === -1
                          ? "Thiệp riêng không giới hạn"
                          : pkg.personal_invitation_limit === 0
                            ? "Thiệp chung"
                            : `Thiệp riêng đến ${pkg.personal_invitation_limit} người`}
                      </p>
                    )}
                    <ul className="mt-4 space-y-2">
                      {Array.isArray(features) &&
                        features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-rose-500 mt-0.5">✓</span>
                            <span>{typeof f === "string" ? f : String(f)}</span>
                          </li>
                        ))}
                    </ul>
                    <Button
                      asChild
                      className="mt-6 w-full"
                      variant={isStandard ? "default" : "outline"}
                    >
                      <Link href="#dat-dich-vu">Chọn gói</Link>
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="mt-10 text-center text-gray-500">Đang cập nhật bảng giá.</p>
          )}
        </div>
      </section>

      {/* Booking CTA */}
      <section id="dat-dich-vu" className="py-20 px-4 sm:px-6 lg:px-8 bg-rose-600">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h2 className="text-3xl font-bold">Sẵn sàng tạo thiệp cưới của bạn?</h2>
          <p className="mt-4 text-rose-100">
            Điền form đặt dịch vụ, chúng tôi sẽ liên hệ tư vấn miễn phí.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-6 bg-white text-rose-600 hover:bg-rose-50">
            <Link href="/dat-hang">Đặt Dịch Vụ Ngay</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-white">
        <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Thiệp Cưới Điện Tử</p>
          <p>
            Liên hệ:{" "}
            {(contactZalo || contactPhone) ? (
              <>
                {contactZalo && (
                  <a
                    href={`https://zalo.me/${contactZalo.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-600 hover:underline"
                  >
                    Zalo {contactZalo}
                  </a>
                )}
                {contactZalo && contactPhone && " | "}
                {contactPhone && (
                  <a href={`tel:${contactPhone}`} className="text-rose-600 hover:underline">
                    {contactPhone}
                  </a>
                )}
              </>
            ) : (
              "Zalo / Hotline (cập nhật trong Admin → Nội dung)"
            )}
          </p>
        </div>
      </footer>
    </div>
  );
}
