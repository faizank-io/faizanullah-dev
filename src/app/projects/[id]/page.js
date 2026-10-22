import { notFound } from "next/navigation";
import { getProjectDetail, getAllProjectIds } from "@/data/projectDetails";
import ProjectDetailPage from "@/components/ProjectDetailPage";

export async function generateStaticParams() {
  return getAllProjectIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = getProjectDetail(id);
  if (!project) return {};

  const description = project.overview.slice(0, 160);

  return {
    title: project.title,
    description,
    alternates: {
      canonical: `/projects/${id}`,
    },
    openGraph: {
      title: `${project.title} | Faizan Ullah`,
      description,
      url: `/projects/${id}`,
      type: "article",
    },
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const project = getProjectDetail(id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage project={project} projectId={id} />;
}
