import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import ProjectsGrid from "@/components/ProjectsGrid";
import Process from "@/components/Process";
import ArchitectureCaseStudies from "@/components/ArchitectureCaseStudies";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import EducationList from "@/components/EducationList";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <Services />
      <TechStack />
      <ProjectsGrid />
      <Process />
      <ArchitectureCaseStudies />
      <ExperienceTimeline />
      <EducationList />
      <ContactFooter />
    </main>
  );
}
