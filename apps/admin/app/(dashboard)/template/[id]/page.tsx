import { notFound } from "next/navigation";
import Link from "next/link";
import { getTemplateById } from "@/lib/templates";
import { Button } from "@wedding-invitation/ui";
import { ArrowLeft } from "lucide-react";
import { TEMPLATE_CATEGORIES } from "@/lib/templates";
import { TemplateForm } from "@/components/templates/TemplateForm";

interface PageProps {
  params: { id: string };
}

export default async function EditTemplatePage({ params }: PageProps) {
  const { id } = params;
  const template = await getTemplateById(id);
  if (!template) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/template">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">
          Chỉnh sửa: {String(template.name ?? "")}
        </h1>
      </div>

      <TemplateForm
        templateId={id}
        initialData={{
          name: String(template.name ?? ""),
          slug: String(template.slug ?? ""),
          description: String(template.description ?? ""),
          category: String(template.category ?? ""),
          html_content: String(template.html_content ?? ""),
          css_content: String(template.css_content ?? ""),
          js_content: String(template.js_content ?? ""),
          thumbnail_url: String(template.thumbnail_url ?? ""),
          price_adjustment: Number(template.price_adjustment ?? 0),
          is_active: Boolean(template.is_active),
          is_featured: Boolean(template.is_featured),
          sort_order: Number(template.sort_order ?? 0),
        }}
        categories={TEMPLATE_CATEGORIES}
      />
    </div>
  );
}
