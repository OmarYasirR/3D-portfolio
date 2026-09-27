import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import WorkExperiencePage from "../components/Pages/WorkExperiencePage";
import EducationPage from "../components/Pages/EducationPage";
import ServicesPage from "../components/Pages/ServicesPage";
import SkillsPage from "../components/Pages/SkillsPage";
import ProfilePage from "../components/Pages/ProfilePage";
import ContactPage from "../components/Pages/ContactPage";
import IndexPage from "../components/Pages/IndexPage";
import CoverPage from "../components/Pages/CoverPage";
import PortfolioContentPage from "../components/Pages/PortfolioContentPage";
import { portfolioData } from "../data/portfolioData";

const INDEX_ENTRIES_PER_PAGE = 4;

// All the GitHub/Vercel fetching + merging + README-image lookup happens
// server-side in /api/projects.js — the client never sees
// GITHUB_TOKEN/VERCEL_TOKEN, it just calls your own API route.
async function fetchProjects() {
  const res = await axios.get("/api/projects");
  return res.data.projects;
}

// Splits an array into fixed-size chunks.
function chunk(array, size) {
  if (array.length === 0) return [[]];
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function usePages(onNavigate, isMobile = false, currentIndex) {
  const { skills, workExperience, education, services } = portfolioData;

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setProjectsError(null);
    fetchProjects()
      .then((data) => {
        if (!cancelled) setProjects(data);
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("Failed to load projects:", err);
          setProjectsError(err.message);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProjects = useMemo(
    () => (activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter)),
    [projects, activeFilter]
  );

  const contentSections = useMemo(() => {
    // profile page
    const sections = [
      { id: "cover", title: 'cover', pageNum: 0, component: <CoverPage /> },
      { id: "Profile", title: "Profile", pageNum: 1, component: <ProfilePage /> },
    ];

    // portfolio pages
    const portfolioChunks = chunk(filteredProjects, 2);
    portfolioChunks.forEach((projectsForPage, i) => {
      sections.push({
        id: `portfolio-${i}`,
        title: "Portfolio",
        component: (
          <PortfolioContentPage
            projects={projectsForPage}
            showHeader={i === 0}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            isMobile={isMobile}
          />
        ),
      });
    });
    

    // education pages
    education.forEach((edu, i) => {
      sections.push({
        id: `education-${i}`,
        title: "Education",
        component: <EducationPage icon={edu.icon} title={edu.title} period={edu.period} institution={edu.institution} description={edu.description} achievements={edu.achievements} showHeader={i === 0} />
      });
    });

    // services pages
    sections.push({ id: "services", title: "My Services", component: <ServicesPage services={services.slice(0, 2)} showHeader={true} /> });

    sections.push({ id: "services-1", title: "My Services", component: <ServicesPage services={services.slice(2)} /> });

    // skills pages
    Object.entries(skills).forEach(([category, list], i) => {
      sections.push({
        id: `skills-${category}`,
        title:"My Skills",
        component: <SkillsPage skills={list} showHeader={i === 0} />,
      });
    });


    // work experience pages
    workExperience.forEach((exp, i) => {
      sections.push({
        id: `work-${i}`,
        title:"Work Experience",
        component: <WorkExperiencePage exp={exp} showHeader={i === 0} />,
      });
    });

    // contact page
    sections.push({ id: "contact", title: "Contact Me", component: <ContactPage /> });


    const contentStartNum = 2; // 1 cover, 2 index pages (1..2), then content pages start at 2 
    const contentSections = sections.map((s, i) => ({
      ...s,
      pageNum: contentStartNum + i,
    }));

    const seen = new Set()
    const pagesContentIndexes = contentSections
      .map((s, i) => {
        if (seen.has(s.title)) return null;
        seen.add(s.title);
        return { ...s, indexNum: i == 1 || i == 2? 1 : i%2 === 0 ? i/2 : (i+1)/2 };
      })
      .filter(Boolean);

    // index pages
      const indexPages = []
      for (let i = 1; i < pagesContentIndexes.length; i += INDEX_ENTRIES_PER_PAGE) {

        indexPages.push({
        id: `index-${i}`,
        title: 'Index',
        pageNum: 1 + i,
        component: 
          <IndexPage 
            pages={pagesContentIndexes.slice(i, i + INDEX_ENTRIES_PER_PAGE)}
            onPageNavigate={onNavigate} 
            showHeader={i === 1}
            isMobile = {isMobile}
          />,
      });
      }

      sections.splice(1, 0, ...indexPages)


      // the final numbered content is the cover, index pages, and then the rest of the content sections
      const numberedContentWithIndexes = sections.map((s, i) => ({
        ...s,
        pageNum: i,
      }));
    return numberedContentWithIndexes;
  }, [loading, filteredProjects, activeFilter, isMobile, currentIndex]);

  
  const  pagePairs = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < contentSections.length; i += 2) {
      const front = contentSections[i];
      const back = contentSections[i + 1] || contentSections[contentSections.length - 1];
      pairs.push({
        id: `pair-${front.id}-${back.id}`,
        front: { component: front.component, number: front.pageNum, title: front.title },
        back: { component: back.component, number: back.pageNum, title: back.title },
      });
    }

    return pairs;
  }, [contentSections, activeFilter, isMobile]);

  return {
    Pages: contentSections,
    pagePairs,
    loading,
    filteredProjects,
    projectsError,
    activeFilter,
    setActiveFilter,
  };
}