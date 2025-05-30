import { ResumePage } from "@/components/pages/dashboard/resume";
import { getResumeById } from "@/db/queries";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

type DashboardResumePageProps = {
  params: { id: string };
};

export default async function DashboardResumePage({
  params,
}: DashboardResumePageProps) {
  const { id } = await params;
  const resumeId = id;

  const resume = await getResumeById(resumeId);

  if (!resume) return notFound();

  const initialData = resume?.data as ResumeData;

  const session = await auth();

  return (
    <ResumePage
      initialData={initialData}
      title={resume.title}
      user={session?.user}
    />
  );
}
