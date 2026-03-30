import { notFound } from "next/navigation";
import { BookingPage } from "@/features/mentors/booking-page";
import { getMentorBySlug } from "@/lib/mock-data";

export default async function MentorBookingRoute({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ session?: string }>;
}) {
  const [{ slug }, resolvedSearchParams] = await Promise.all([params, searchParams]);
  const mentor = getMentorBySlug(slug);

  if (!mentor) {
    notFound();
  }

  return <BookingPage mentor={mentor} initialSessionId={resolvedSearchParams.session} />;
}
