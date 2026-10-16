import { redirect } from "next/navigation";

export default async function AboutSubpage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolved = await params;
  const rawSlug = (resolved?.slug || "").toLowerCase();

  if (rawSlug.includes("chuong-trinh") || rawSlug.includes("program")) {
    redirect("/#programs");
  }

  if (
    rawSlug.includes("doi-ngu") ||
    rawSlug.includes("team") ||
    rawSlug.includes("cau-chuyen") ||
    rawSlug.includes("stories") ||
    rawSlug.includes("lanh-dao") ||
    rawSlug.includes("leader")
  ) {
    redirect("/#stories");
  }

  redirect("/#about");
}
