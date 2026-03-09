"use client";

import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { Button } from "@wedding-invitation/ui";

interface TemplateCodeEditorProps {
  htmlContent: string;
  cssContent: string;
  jsContent: string;
  onHtmlChange: (v: string) => void;
  onCssChange: (v: string) => void;
  onJsChange: (v: string) => void;
}

const SAMPLE_DATA = `{{groom_name}} & {{bride_name}}
Ngày {{wedding_date}}
{{venue_name}}
{{venue_address}}
{{couple_photo_1}}
`;

export function TemplateCodeEditor({
  htmlContent,
  cssContent,
  jsContent,
  onHtmlChange,
  onCssChange,
  onJsChange,
}: TemplateCodeEditorProps) {
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
  const [showPreview, setShowPreview] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");

  function handlePreview() {
    const html = `
<!DOCTYPE html>
<html>
<head><style>${cssContent}</style></head>
<body>
${htmlContent
  .replace(/\{\{groom_name\}\}/g, "Nguyễn Văn A")
  .replace(/\{\{bride_name\}\}/g, "Trần Thị B")
  .replace(/\{\{wedding_date\}\}/g, "15/06/2025")
  .replace(/\{\{venue_name\}\}/g, "Trung tâm tiệc cưới ABC")
  .replace(/\{\{venue_address\}\}/g, "123 Đường XYZ, Quận 1")
  .replace(/\{\{couple_photo_1\}\}/g, "")
  .replace(/\{\{[^}]+\}\}/g, "-")}
<script>${jsContent}</script>
</body>
</html>`;
    setPreviewHtml(html);
    setShowPreview(true);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {(["html", "css", "js"] as const).map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </Button>
          ))}
        </div>
        <Button variant="secondary" size="sm" onClick={handlePreview}>
          Xem trước
        </Button>
      </div>

      <div className="rounded-lg border bg-muted/30">
        {activeTab === "html" && (
          <CodeMirror
            value={htmlContent}
            height="300px"
            extensions={[html()]}
            onChange={onHtmlChange}
            basicSetup={{ lineNumbers: true }}
            className="text-sm"
          />
        )}
        {activeTab === "css" && (
          <CodeMirror
            value={cssContent}
            height="300px"
            extensions={[css()]}
            onChange={onCssChange}
            basicSetup={{ lineNumbers: true }}
            className="text-sm"
          />
        )}
        {activeTab === "js" && (
          <CodeMirror
            value={jsContent}
            height="300px"
            extensions={[javascript()]}
            onChange={onJsChange}
            basicSetup={{ lineNumbers: true }}
            className="text-sm"
          />
        )}
      </div>

      <div className="rounded border bg-muted/20 p-2 text-xs text-muted-foreground">
        <p className="font-medium">Biến có thể dùng:</p>
        <code className="mt-1 block">
          {`{{groom_name}}, {{bride_name}}, {{wedding_date}}, {{wedding_time}}, {{venue_name}}, {{venue_address}}, {{venue_maps_url}}, {{couple_photo_1}}, {{guest_name}}, {{story}}, {{hashtag}}`}
        </code>
      </div>

      {showPreview && (
        <div className="space-y-2">
          <Button variant="outline" size="sm" onClick={() => setShowPreview(false)}>
            Đóng preview
          </Button>
          <iframe
            srcDoc={previewHtml}
            className="h-[500px] w-full rounded-lg border"
            title="Preview"
            sandbox="allow-scripts"
          />
        </div>
      )}
    </div>
  );
}
