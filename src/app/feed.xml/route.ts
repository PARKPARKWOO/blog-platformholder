import { NextResponse } from "next/server";

export const dynamic = "force-static";

// 루트 /feed.xml 은 기본 로케일(ko) 피드로 리다이렉트
export function GET() {
  return NextResponse.redirect("https://blog.platformholder.site/ko/feed.xml", 308);
}
