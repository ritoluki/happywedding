"use client";

import { useState, useEffect } from "react";
import { Button, Input } from "@wedding-invitation/ui";
import { updateCmsContent } from "@/actions/cms";

type CmsItem = { key: string; value: string | null; type: string; label: string | null };

export function CmsForm({ items }: { items: CmsItem[] }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const v: Record<string, string> = {};
    items.forEach((i) => {
      v[i.key] = i.value ?? "";
    });
    setValues(v);
  }, [items]);

  async function handleSave(key: string) {
    setSaving(key);
    setMsg("");
    const { error } = await updateCmsContent(key, values[key] ?? "");
    if (error) {
      setMsg("Lỗi: " + error);
    } else {
      setMsg("Đã lưu.");
    }
    setSaving(null);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-6">
        <h2 className="mb-4 font-semibold">Nội dung trang chủ (Web)</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.key}>
              <label className="block text-sm font-medium mb-1">
                {item.label ?? item.key}
              </label>
              {item.type === "boolean" ? (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={values[item.key] === "true"}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [item.key]: e.target.checked ? "true" : "false" }))
                    }
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSave(item.key)}
                    disabled={saving === item.key}
                  >
                    {saving === item.key ? "Đang lưu..." : "Lưu"}
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    value={values[item.key] ?? ""}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [item.key]: e.target.value }))
                    }
                    placeholder={item.label ?? ""}
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSave(item.key)}
                    disabled={saving === item.key}
                  >
                    {saving === item.key ? "Đang lưu..." : "Lưu"}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
        {msg && <p className="mt-4 text-sm text-muted-foreground">{msg}</p>}
      </div>
    </div>
  );
}
