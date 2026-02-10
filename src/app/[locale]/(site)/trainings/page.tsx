import { redirect } from "next/navigation";

export default async function TrainingsRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/discipleship`);
}
