"use server";

import { updateCmsContent as updateCms } from "@/lib/cms";

export async function updateCmsContent(key: string, value: string) {
  return updateCms(key, value);
}
