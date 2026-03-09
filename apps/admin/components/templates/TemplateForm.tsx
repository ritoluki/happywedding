"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Button, Input } from "@wedding-invitation/ui";
import { TemplateCodeEditor } from "./TemplateCodeEditor";
import { createTemplate, updateTemplate } from "@/actions/templates";
import { slugify } from "@/lib/slugify";

interface TemplateFormProps {
  templateId?: string;
  initialData?: {
    name: string;
    slug: string;
    description: string;
    category: string;
    html_content: string;
    css_content: string;
    js_content: string;
    thumbnail_url: string;
    price_adjustment: number;
    is_active: boolean;
    is_featured: boolean;
    sort_order: number;
  };
  categories: readonly string[];
}

export function TemplateForm({
  templateId,
  initialData,
  categories,
}: TemplateFormProps) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "");
  const [htmlContent, setHtmlContent] = useState(initialData?.html_content ?? "");
  const [cssContent, setCssContent] = useState(initialData?.css_content ?? "");
  const [jsContent, setJsContent] = useState(initialData?.js_content ?? "");
  const [thumbnailUrl, setThumbnailUrl] = useState(initialData?.thumbnail_url ?? "");
  const [priceAdjustment, setPriceAdjustment] = useState(
    initialData?.price_adjustment ?? 0
  );
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true);
  const [isFeatured, setIsFeatured] = useState(initialData?.is_featured ?? false);
  const [sortOrder, setSortOrder] = useState(initialData?.sort_order ?? 0);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleNameChange(v: string) {
    setName(v);
    if (!initialData?.slug || slug === slugify(initialData.name)) {
      setSlug(slugify(v));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData();
    formData.set("name", name);
    formData.set("slug", slug);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("html_content", htmlContent);
    formData.set("css_content", cssContent);
    formData.set("js_content", jsContent);
    formData.set("thumbnail_url", thumbnailUrl);
    formData.set("price_adjustment", String(priceAdjustment));
    formData.set("sort_order", String(sortOrder));
    formData.set("is_active", isActive ? "on" : "");
    formData.set("is_featured", isFeatured ? "on" : "");

    startTransition(async () => {
      const result = templateId
        ? await updateTemplate(templateId, formData)
        : await createTemplate(formData);
      if (result.error) setError(result.error);
      else if (!templateId) window.location.href = "/template";
      else window.location.href = `/template/${templateId}`;
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Tên template</label>
            <Input
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="VD: Classic Rose"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Slug</label>
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="classic-rose"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Mô tả</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Mô tả ngắn..."
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Thể loại</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">-- Chọn --</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">URL ảnh thumbnail</label>
            <Input
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Giá điều chỉnh (VNĐ)</label>
            <Input
              type="number"
              value={priceAdjustment}
              onChange={(e) => setPriceAdjustment(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Thứ tự</label>
            <Input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
            />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                name="is_active"
              />
              <span className="text-sm">Đang hiển thị</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                name="is_featured"
              />
              <span className="text-sm">Nổi bật</span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 font-semibold">HTML / CSS / JS</h2>
        <TemplateCodeEditor
          htmlContent={htmlContent}
          cssContent={cssContent}
          jsContent={jsContent}
          onHtmlChange={setHtmlContent}
          onCssChange={setCssContent}
          onJsChange={setJsContent}
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Đang lưu..." : templateId ? "Cập nhật" : "Tạo mẫu"}
        </Button>
        <Link href="/template">
          <Button type="button" variant="outline">
            Hủy
          </Button>
        </Link>
      </div>
    </form>
  );
}
