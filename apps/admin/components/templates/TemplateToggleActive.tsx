"use client";

import { useState } from "react";
import { Button } from "@wedding-invitation/ui";
import { toggleTemplateActive } from "@/actions/templates";

interface TemplateToggleActiveProps {
  templateId: string;
  isActive: boolean;
}

export function TemplateToggleActive({
  templateId,
  isActive,
}: TemplateToggleActiveProps) {
  const [active, setActive] = useState(isActive);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    const result = await toggleTemplateActive(templateId, !active);
    setLoading(false);
    if (!result.error) setActive(!active);
  }

  return (
    <Button
      variant={active ? "default" : "outline"}
      size="sm"
      onClick={handleToggle}
      disabled={loading}
    >
      {active ? "Ẩn" : "Hiện"}
    </Button>
  );
}
