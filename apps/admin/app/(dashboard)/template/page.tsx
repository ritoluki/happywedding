import Link from "next/link";
import Image from "next/image";
import { getTemplates } from "@/lib/templates";
import { Button, Badge } from "@wedding-invitation/ui";
import { Plus, Pencil, ImageIcon } from "lucide-react";
import { TemplateToggleActive } from "@/components/templates/TemplateToggleActive";

export default async function TemplatePage() {
  const templates = await getTemplates();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mẫu thiệp</h1>
          <p className="mt-1 text-muted-foreground">
            Quản lý mẫu thiệp cưới
          </p>
        </div>
        <Link href="/template/moi">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Thêm mẫu
          </Button>
        </Link>
      </div>

      {templates.length === 0 ? (
        <div className="rounded-lg border border-dashed bg-muted/30 p-12 text-center">
          <p className="text-muted-foreground">Chưa có mẫu thiệp nào</p>
          <Link href="/template/moi" className="mt-4 inline-block">
            <Button>Tạo mẫu đầu tiên</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {templates.map((t) => (
            <div
              key={t.id}
              className="group overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[3/4] bg-muted">
                {t.thumbnail_url ? (
                  <Image
                    src={t.thumbnail_url}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute right-2 top-2 flex gap-1">
                  {t.is_active && (
                    <Badge variant="default" className="text-xs">
                      Active
                    </Badge>
                  )}
                  {t.is_featured && (
                    <Badge variant="secondary" className="text-xs">
                      Nổi bật
                    </Badge>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{t.name}</h3>
                {t.category && (
                  <Badge variant="outline" className="mt-1 text-xs">
                    {t.category}
                  </Badge>
                )}
                <div className="mt-3 flex items-center justify-between gap-2">
                  <TemplateToggleActive
                    templateId={t.id}
                    isActive={t.is_active}
                  />
                  <Link href={`/template/${t.id}`}>
                    <Button variant="ghost" size="sm">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
