
const SkillsPage = ({ skills, showHeader }) => {
  return (
    <div className="p-4 w-full h-full flex flex-col">
      {showHeader && (
        <h1 className="title text-3xl font-bold text-center mb-8 p-3">My Skills</h1>
      )}

      <div className="skills-box space-y-8 flex-1">
        <div className="skills-content">
          <h3 className="text-xl font-semibold mb-4">Front-End</h3>
          <div className="content grid grid-cols-2 gap-3">
            {skills?.map((skill, index) => (
              <span key={index} className="flex items-center text-gray-700">
                <i className={`${skill.icon} text-primary mr-2 text-3xl`}></i>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;