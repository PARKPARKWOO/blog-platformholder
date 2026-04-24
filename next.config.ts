import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const LEGACY_SLUG_MAP: Record<string, string> = {
  "bbr-create-weekly-pt-plan": "bbr/create-weekly-pt-plan",
  "find-my-pet-lost-pet-5-step-guide":
    "find-my-pet/lost-pet-5-step-guide",
  "mirror-view-create-interview-questions":
    "mirror-view/create-interview-questions",
  "hello-platformholder": "platformholder/hello",
};

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  async redirects() {
    const rules = [];
    for (const locale of ["ko", "en"]) {
      for (const [oldSlug, newPath] of Object.entries(LEGACY_SLUG_MAP)) {
        rules.push({
          source: `/${locale}/blog/${oldSlug}`,
          destination: `/${locale}/blog/${newPath}`,
          permanent: true,
        });
      }
    }
    return rules;
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

export default withMDX(nextConfig);
