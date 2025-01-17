import { ResumesList } from "@/components/pages/dashboard/resumes/resumes-list";
import { ResumeListSkeleton } from "@/components/pages/dashboard/resumes/resumes-list/skeleton";
import { Suspense } from "react";

export default function DashboardResumesPage() {
  return (
    <>
      <h1 className="text-4xl font-title font-bold mb-6">Curriculum</h1>
      <Suspense fallback={<ResumeListSkeleton />}>
        <ResumesList />
      </Suspense>
    </>
  );
}
