import { useState } from 'react';
import Button from '../UI/Button';

const PortfolioPage = ({ isMobile = false }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // Helper function to get icon and color by category
  const getProjectIcon = (category) => {
    const icons = {
      fullstack: { 
        icon: 'bx-layer', 
        name: 'Full Stack',
        gradient: 'from-purple-500/20 to-blue-500/20',
        iconColor: 'text-purple-600/80'
      },
      mobile: { 
        icon: 'bx-mobile-alt', 
        name: 'Mobile App',
        gradient: 'from-green-500/20 to-emerald-500/20',
        iconColor: 'text-green-600/80'
      },
      frontend: { 
        icon: 'bx-desktop', 
        name: 'Frontend',
        gradient: 'from-blue-500/20 to-cyan-500/20',
        iconColor: 'text-blue-600/80'
      },
      backend: { 
        icon: 'bx-server', 
        name: 'Backend',
        gradient: 'from-orange-500/20 to-red-500/20',
        iconColor: 'text-orange-600/80'
      },
      default: { 
        icon: 'bx-code-block', 
        name: 'Project',
        gradient: 'from-primary/20 to-secondary/20',
        iconColor: 'text-primary/80'
      }
    };
    return icons[category] || icons.default;
  };

  // Sample projects data
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, admin dashboard, and real-time inventory management.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe", "JWT"],
      liveUrl: "https://your-ecommerce-demo.com",
      githubUrl: "https://github.com/yourusername/ecommerce-platform",
      category: "fullstack",
      features: [
        "User authentication & authorization",
        "Product catalog with search & filters",
        "Shopping cart & checkout",
        "Payment integration with Stripe",
        "Admin dashboard",
        "Order management system"
      ]
    },
    {
      id: 2,
      title: "Task Management Mobile App",
      description: "A collaborative task management application with real-time updates, team collaboration features, and advanced project tracking capabilities.",
      technologies: ["React Native", "Socket.io", "PostgreSQL", "Node.js", "Redis"],
      liveUrl: "https://your-taskapp-demo.com",
      githubUrl: "https://github.com/yourusername/task-management-app",
      category: "mobile",
      features: [
        "Real-time collaboration",
        "Drag & drop interface",
        "Team management",
        "Progress tracking",
        "File attachments",
        "Notifications system"
      ]
    },
    {
      id: 3,
      title: "Social Media Dashboard",
      description: "A comprehensive social media analytics dashboard that aggregates data from multiple platforms and provides insights through interactive visualizations.",
      technologies: ["Vue.js", "Python", "Django", "Chart.js", "D3.js", "REST API"],
      liveUrl: "https://your-dashboard-demo.com",
      githubUrl: "https://github.com/yourusername/social-dashboard",
      category: "frontend",
      features: [
        "Multi-platform integration",
        "Real-time analytics",
        "Interactive charts",
        "Custom reporting",
        "Data export",
        "User role management"
      ]
    },
    {
      id: 4,
      title: "API Gateway & Microservices",
      description: "A scalable API gateway with microservices architecture handling authentication, rate limiting, and request routing for enterprise applications.",
      technologies: ["Node.js", "Docker", "Kubernetes", "Redis", "PostgreSQL", "JWT"],
      liveUrl: "https://your-api-demo.com",
      githubUrl: "https://github.com/yourusername/api-gateway",
      category: "backend",
      features: [
        "Microservices architecture",
        "API rate limiting",
        "JWT authentication",
        "Request logging",
        "Load balancing",
        "Docker containerization"
      ]
    },
    {
      id: 5,
      title: "Real Estate Platform",
      description: "A modern real estate marketplace with property listings, virtual tours, agent management, and advanced search capabilities.",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Mapbox"],
      liveUrl: "https://your-realestate-demo.com",
      githubUrl: "https://github.com/yourusername/real-estate-platform",
      category: "fullstack",
      features: [
        "Property search with filters",
        "Virtual tour integration",
        "Agent profiles",
        "Favorite properties",
        "Map-based browsing",
        "Contact management"
      ]
    },
    {
      id: 6,
      title: "Healthcare Management System",
      description: "A secure healthcare platform for patient management, appointment scheduling, and medical record keeping with HIPAA compliance.",
      technologies: ["Angular", "Java", "Spring Boot", "MySQL", "Docker"],
      liveUrl: "https://your-healthcare-demo.com",
      githubUrl: "https://github.com/yourusername/healthcare-system",
      category: "fullstack",
      features: [
        "Patient portal",
        "Appointment scheduling",
        "Electronic health records",
        "Secure messaging",
        "Billing integration",
        "Reporting dashboard"
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  // Project Image Placeholder Component
  const ProjectImagePlaceholder = ({ project, size = 'medium' }) => {
    const { icon, name, gradient, iconColor } = getProjectIcon(project.category);
    const iconSize = size === 'large' ? 'text-6xl' : 'text-4xl';
    const textSize = size === 'large' ? 'text-lg' : 'text-sm';

    return (
      <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-4`}>
        <i className={`bx ${icon} ${iconSize} ${iconColor} mb-2`}></i>
        <span className={`text-center font-medium ${textSize} ${iconColor.replace('text-', 'text-').replace('/80', '/90')}`}>
          {name}
        </span>
        {size === 'large' && (
          <span className="text-gray-500 text-sm mt-1">Project Preview</span>
        )}
      </div>
    );
  };

  return (
    <div className="portfolio-page w-full h-full overflow-y-auto p-4 scrollbar-hide pb-[120px] sm:pb-0">
      {/* Header */}
      <div className="sticky top-[-16px] bg-white p-3 mb-4 rounded-lg z-40 shadow-lg">
        <div className="text-center mb-5">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">My Projects</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A collection of my recent development projects across different technologies and platforms.
          </p>
        </div>
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 shadow-lg rounded-full text-sm font-medium transition-all ${
                activeFilter === category.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2'} mb-8`}>
        {filteredProjects.map(project => {
          const categoryInfo = getProjectIcon(project.category);
          
          return (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 group"
            >
              {/* Project Image with Category-based Icon */}
              <div className="relative h-48 overflow-hidden">
                <ProjectImagePlaceholder project={project} />
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className={`bg-white/90 backdrop-blur-sm ${categoryInfo.iconColor} text-xs px-2 py-1 rounded-full font-medium`}>
                    {categoryInfo.name}
                  </span>
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => openProjectModal(project)}
                    className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg font-medium shadow-lg"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map(tech => (
                    <span
                      key={tech}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => openProjectModal(project)}
                    className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors text-sm font-medium"
                  >
                    <i className="bx bx-info-circle text-lg"></i>
                  </button>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                    title="View Source Code"
                  >
                    <i className="bx bxl-github text-lg"></i>
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-green-100 text-green-700 py-2 px-4 rounded-lg hover:bg-green-200 transition-colors"
                    title="Live Demo"
                  >
                    <i className="bx bx-link-external text-lg"></i>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 max-w-md mx-auto">
            <i className="bx bx-folder-open text-6xl text-gray-400 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No projects found</h3>
            <p className="text-gray-500">No projects match the selected filter.</p>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-primary">{projects.length}</div>
            <div className="text-gray-600 text-sm">Projects Completed</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-primary">
              {[...new Set(projects.flatMap(p => p.technologies))].length}+
            </div>
            <div className="text-gray-600 text-sm">Technologies</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-primary">4</div>
            <div className="text-gray-600 text-sm">Project Categories</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-primary">100%</div>
            <div className="text-gray-600 text-sm">Code Available</div>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeProjectModal}
        > 
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedProject.title}</h2>
                    <p className="text-gray-600 mt-1">{selectedProject.description}</p>
                  </div>
                  <button
                    onClick={closeProjectModal}
                    className="text-gray-400 hover:text-gray-600 text-2xl transition-colors"
                  >
                    <i className="bx bx-x"></i>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Project Image with Large Icon */}
                <div className="mb-6 rounded-lg overflow-hidden border border-gray-200">
                  <ProjectImagePlaceholder project={selectedProject} size="large" />
                </div>

                {/* Project Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
                    <div className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <i className="bx bx-check text-primary flex-shrink-0"></i>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map(tech => (
                        <span
                          key={tech}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors text-center font-medium flex items-center justify-center"
                  >
                    <i className="bx bx-link-external mr-2"></i>
                    Live Demo
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors text-center font-medium flex items-center justify-center"
                  >
                    <i className="bx bxl-github mr-2"></i>
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center bg-white rounded-2xl p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Ready to Start a Project?</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          I'm available for freelance work and exciting new opportunities.
        </p>
        <Button variant="primary" className="mx-auto">
          <i className="bx bx-envelope mr-2"></i>
          Get In Touch
        </Button>
      </div>
    </div>
  );
};

export default PortfolioPage;