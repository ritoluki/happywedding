"use client";

import { useState } from "react";
import { Button } from "@wedding-invitation/ui";
import { createGeneralInvitation, importGuestsFromExcel } from "@/actions/guests";

type Invitation = {
  id: string;
  type: string;
  url_slug: string;
  guest_name: string | null;
};

export function InvitationSection({
  orderId,
  templateId,
  invitations,
  baseUrl,
}: {
  orderId: string;
  templateId: string | null;
  invitations: Invitation[];
  baseUrl?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [msg, setMsg] = useState("");
  const [invList, setInvList] = useState(invitations);

  const hasGeneral = invList.some((i) => i.type === "general");

  async function handleCreateGeneral() {
    if (!templateId) {
      setMsg("Đơn hàng chưa chọn template.");
      return;
    }
    setLoading(true);
    setMsg("");
    const slug = "thiep-chung-" + Date.now();
    const { error } = await createGeneralInvitation(orderId, templateId, slug);
    if (error) {
      setMsg("Lỗi: " + error);
    } else {
      setInvList((prev) => [...prev, { id: "", type: "general", url_slug: slug, guest_name: null }]);
      setMsg("Đã tạo thiệp chung.");
    }
    setLoading(false);
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !templateId) return;
    setImporting(true);
    setMsg("");
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(",")[1];
      if (!base64) {
        setMsg("Không đọc được file.");
        setImporting(false);
        return;
      }
      const r = await importGuestsFromExcel(orderId, templateId, base64);
      if (r.success) {
        setMsg(`Đã tạo ${r.created} thiệp riêng.`);
        window.location.reload();
      } else {
        setMsg(r.error ?? "Có lỗi.");
      }
      setImporting(false);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="mb-4 font-semibold">Thiệp cưới</h2>
      {invList.length > 0 && (
        <div className="mb-4 space-y-2">
          {invList.map((i) => (
            <div key={i.id || i.url_slug} className="flex items-center gap-2 text-sm">
              <span className={i.type === "personal" ? "text-muted-foreground" : ""}>
                {i.type === "general" ? "Thiệp chung" : `Thiệp riêng: ${i.guest_name}`}
              </span>
              <a
                href={`${baseUrl ?? ""}/thiep/${i.url_slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Xem
              </a>
            </div>
          ))}
        </div>
      )}
      {!hasGeneral && templateId && (
        <div className="mb-4">
          <Button
            variant="outline"
            size="sm"
            disabled={loading}
            onClick={handleCreateGeneral}
          >
            {loading ? "Đang tạo..." : "Tạo thiệp chung"}
          </Button>
        </div>
      )}
      {templateId && (
        <div>
          <label className="block text-sm font-medium mb-2">Import danh sách khách (Excel)</label>
          <p className="text-xs text-muted-foreground mb-2">
            Cột: Họ tên (hoặc Tên, name), SĐT (hoặc Phone), Email
          </p>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleImport}
            disabled={importing}
            className="text-sm"
          />
        </div>
      )}
      {msg && <p className="mt-2 text-sm text-muted-foreground">{msg}</p>}
    </div>
  );
}
