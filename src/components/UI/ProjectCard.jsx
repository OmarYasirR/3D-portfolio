const CATEGORY_META = {
  fullstack: { icon: 'bx-layer', name: 'Full Stack', gradient: 'from-purple-500/20 to-blue-500/20', iconColor: 'text-purple-600/80' },
  mobile: { icon: 'bx-mobile-alt', name: 'Mobile App', gradient: 'from-green-500/20 to-emerald-500/20', iconColor: 'text-green-600/80' },
  frontend: { icon: 'bx-desktop', name: 'Frontend', gradient: 'from-blue-500/20 to-cyan-500/20', iconColor: 'text-blue-600/80' },
  backend: { icon: 'bx-server', name: 'Backend', gradient: 'from-orange-500/20 to-red-500/20', iconColor: 'text-orange-600/80' },
  default: { icon: 'bx-code-block', name: 'Project', gradient: 'from-primary/20 to-secondary/20', iconColor: 'text-primary/80' },
};

export const getCategoryMeta = (category) => CATEGORY_META[category] || CATEGORY_META.default;

const ProjectCard = ({ project, onOpen }) => {
  const meta = getCategoryMeta(project.category);
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      {project.imgURL ? (
        <img src={project.imgURL} alt={project.title} className="h-28 w-full object-cover" />
      ) : (
        <div className={`h-28 bg-gradient-to-br ${meta.gradient} flex flex-col items-center justify-center`}>
          <i className={`bx ${meta.icon} text-4xl ${meta.iconColor} mb-1`}></i>
          <span className={`text-sm font-medium ${meta.iconColor}`}>{meta.name}</span>
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">{project.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{project.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{tech}</span>
          ))}
        </div>
        <button
          onClick={() => onOpen?.(project)}
          className="w-full bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
        >
          <i className="bx bx-info-circle mr-1"></i> Details
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
