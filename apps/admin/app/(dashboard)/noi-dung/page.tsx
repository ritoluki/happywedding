import { getCmsContent } from "@/lib/cms";
import { CmsForm } from "@/components/cms/CmsForm";

export default async function NoiDungPage() {
  const items = await getCmsContent();

  return (
    <div>
      <h1 className="text-2xl font-bold">Nội dung</h1>
      <p className="mt-2 text-muted-foreground">
        Chỉnh sửa nội dung hiển thị trên trang chủ Web
      </p>
      {items.length === 0 ? (
        <p className="mt-6 text-muted-foreground">Chưa có mục cấu hình.</p>
      ) : (
        <div className="mt-6">
          <CmsForm items={items} />
        </div>
      )}
    </div>
  );
}
