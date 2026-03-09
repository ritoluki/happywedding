import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Load .env từ monorepo root
import { config } from "dotenv";
config({ path: path.resolve(__dirname, "../../.env.local") });

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@wedding-invitation/db",
    "@wedding-invitation/ui",
    "@wedding-invitation/utils",
  ],
};

export default nextConfig;
