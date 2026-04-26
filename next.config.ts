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
    const rules: { source: string; destination: string; permanent: boolean }[] = [
      // 루트 → 기본 로케일 (네이버·구글 봇 404 방지)
      { source: "/", destination: "/ko", permanent: false },
      { source: "/blog", destination: "/ko/blog", permanent: false },
      { source: "/blog/:path*", destination: "/ko/blog/:path*", permanent: false },
      { source: "/tags", destination: "/ko/tags", permanent: false },
      { source: "/tags/:path*", destination: "/ko/tags/:path*", permanent: false },
      { source: "/search", destination: "/ko/search", permanent: false },
    ];
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
