import { notFound } from "next/navigation";
import { MentorProfilePage } from "@/features/mentors/mentor-profile-page";
import { getMentorBySlug } from "@/lib/mock-data";

export default async function MentorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mentor = getMentorBySlug(slug);

  if (!mentor) {
    notFound();
  }

  return <MentorProfilePage mentor={mentor} />;
}
