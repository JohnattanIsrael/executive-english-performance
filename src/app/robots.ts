import type { MetadataRoute } from "next";
import { basePath } from "@/lib/utils";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/company/", "/admin/", "/sign-in/"].map((p) => `${basePath}${p}`),
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
