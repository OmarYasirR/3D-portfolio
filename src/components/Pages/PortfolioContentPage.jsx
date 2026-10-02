import { useState } from "react";
import ProjectCard, { getCategoryMeta } from "../UI/ProjectCard";


const PortfolioContentPage = ({
  projects,
  showHeader = false,
  activeFilter = "all",
  onFilterChange,
  onOpenProject
}) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const openProjectModal = (project) =>
    onOpenProject ? onOpenProject(project) : setSelectedProject(project);
  const closeProjectModal = () => setSelectedProject(null);

  return (
    <div className="portfolio-page w-full h-full overflow-hidden p-4">
      {showHeader && (
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-3">
            My Projects
          </h1>
          <div className="flex flex-wrap justify-center gap-2">
            {["all", "fullstack", "mobile", "frontend", "vanilajs"].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => onFilterChange?.(cat)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === cat
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat === "all" ? "All" : getCategoryMeta(cat).name}
                </button>
              ),
            )}
          </div>
        </div>
      )}

      {projects.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No projects match this filter.
        </div>
      ) : (
        <div className={`grid grid-cols-2 gap-2 justify-center ${showHeader ? 'items-start':'items-center'}`}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={openProjectModal}
            />
          ))}
        </div>
      )}

      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeProjectModal}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedProject.title}
                </h2>
                <button
                  onClick={closeProjectModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  <i className="bx bx-x"></i>
                </button>
              </div>
              <p className="text-gray-600 mb-4">
                {selectedProject.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-primary text-white py-2 rounded-lg text-center text-sm font-medium"
                  >
                    Live Demo
                  </a>
                )}
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-center text-sm font-medium"
                >
                  Source
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioContentPage;
