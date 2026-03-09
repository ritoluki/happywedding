import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@wedding-invitation/ui";
import { ArrowLeft } from "lucide-react";
import { TEMPLATE_CATEGORIES } from "@/lib/templates";
import { TemplateForm } from "@/components/templates/TemplateForm";

export default function NewTemplatePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/template">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Thêm mẫu thiệp</h1>
      </div>

      <TemplateForm categories={TEMPLATE_CATEGORIES} />
    </div>
  );
}
