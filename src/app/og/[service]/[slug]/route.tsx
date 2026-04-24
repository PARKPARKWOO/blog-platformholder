import { ImageResponse } from "next/og";
import { locales } from "@/lib/i18n";
import { isValidService, SERVICES, VISIBLE_SERVICES } from "@/lib/services";
import { getAllPosts, getPost } from "@/lib/posts";

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function generateStaticParams() {
  const params: { service: string; slug: string }[] = [];
  for (const locale of locales) {
    const posts = await getAllPosts(locale);
    for (const p of posts) {
      params.push({ service: p.service, slug: p.slug });
    }
  }
  // 중복 제거 (같은 service/slug 조합)
  const seen = new Set<string>();
  return params.filter((p) => {
    const k = `${p.service}/${p.slug}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ service: string; slug: string }> }
) {
  const { service, slug } = await params;
  if (!isValidService(service)) return new Response("Not Found", { status: 404 });

  // 로케일 우선 ko, 없으면 en
  const post =
    (await getPost("ko", service, slug)) || (await getPost("en", service, slug));
  if (!post) return new Response("Not Found", { status: 404 });

  const svc = SERVICES[service];
  const title = post.meta.title;
  const description = post.meta.description ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: `linear-gradient(135deg, ${svc.bgSoft} 0%, #ffffff 100%)`,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              fontSize: "40px",
              lineHeight: 1,
              padding: "12px 20px",
              borderRadius: "999px",
              background: "#ffffff",
              border: `2px solid ${svc.color}33`,
              color: svc.color,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span>{svc.emoji}</span>
            <span style={{ fontSize: "28px", fontWeight: 700 }}>{svc.name}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "60px",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#111827",
              letterSpacing: "-0.02em",
            }}
          >
            {title.length > 90 ? title.slice(0, 88) + "…" : title}
          </div>
          {description && (
            <div
              style={{
                fontSize: "26px",
                lineHeight: 1.4,
                color: "#4b5563",
              }}
            >
              {description.length > 140
                ? description.slice(0, 138) + "…"
                : description}
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #e5e7eb",
            paddingTop: "24px",
            fontSize: "24px",
            color: "#6b7280",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontWeight: 700, color: "#111827" }}>platformholder</span>
            <span>·</span>
            <span>blog.platformholder.site</span>
          </div>
          <div style={{ color: svc.color, fontWeight: 600 }}>
            {post.meta.type === "howto" ? "HOW-TO" : "ARTICLE"}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

// satisfies unused checks
void VISIBLE_SERVICES;
