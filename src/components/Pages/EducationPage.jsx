import { portfolioData } from '../../data/portfolioData';

const EducationPage = ({icon, title, period, institution, description, achievements, showHeader}) => {

  return (
    <div className="w-full h-full flex flex-col p-2">
      {showHeader && (
        <h1 className="title text-2xl font-bold text-center mb-2">Education Journey</h1>
      )}
      
      <div className="relative max-w-4xl">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20"></div>
        
        <div className="space-y-2">
          <div className="relative flex items-start">
            {/* Timeline dot */}
            <div className="absolute left-4 w-4 h-4 bg-primary rounded-full border-4 border-white z-10"></div>
            
            {/* Content */}
            <div className="ml-10 bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex-1">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <i className={`bx ${icon} text-xl text-primary`}></i>
                </div>
                
                <div className="flex-1">
                  <span className="year flex items-center text-primary mb-2 font-medium">
                    <i className="bx bxs-calendar mr-2"></i>
                    {period}
                  </span>
                  
                  <h3 className="text-xl font-semibold mb-1 text-gray-800">{title}</h3>
                  <p className="text-gray-600 mb-2 font-medium">{institution}</p>
                  <p className="text-gray-700 leading-relaxed mb-1">{description}</p>
                  
                  {/* Achievements */}
                  {achievements && achievements.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <i className="bx bx-star mr-2 text-primary"></i>
                        Key Learning Outcomes
                      </h4>
                      <div className="space-y-2">
                        {achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <i className="bx bx-check text-primary flex-shrink-0"></i>
                            <span className="text-gray-700">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;