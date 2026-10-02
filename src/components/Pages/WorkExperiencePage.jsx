const WorkExperiencePage = ({ exp, showHeader }) => {
  return (
    <div className="flex flex-col p-4 h-full w-full">
      {showHeader && (
        <h1 className="title text-3xl font-bold text-center mb-4">
          Work Experience
        </h1>
      )}

      <div className="">
        <div className="bg-white p-4 rounded-lg border-l-4 border-primary shadow-lg transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
            <div className="flex items-center gap-4 mb-3 md:mb-0">
              <div className="bg-primary/10 p-2 rounded-lg">
                <i className={`${exp.icon} text-xl text-primary`}></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {exp.title}
                </h3>
                <p className="text-gray-600 text-sm">{exp.company}</p>
              </div>
            </div>
            <span className="text-primary text-xs font-medium bg-primary/10 px-2 py-3 rounded-full">
              {exp.period}
            </span>
          </div>

          <p className="text-gray-700 mb-3">{exp.description}</p>

          {/* Achievements & Technologies Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">
                Achievements:
              </h4>
              <ul className="space-y-1">
                {exp.achievements.slice(0, 3).map((achievement, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <i className="bx bx-check text-primary mt-0.5 flex-shrink-0"></i>
                    <span className="text-gray-600">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">
                Technologies:
              </h4>
              <div className="flex flex-wrap gap-1">
                {exp.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkExperiencePage;
