import Button from '../UI/Button';

const ServicesPage = ({ services, showHeader }) => {

  return (
    <div className="w-full h-full flex flex-col p-4">
      {showHeader&& (
        <h1 className="title text-3xl font-bold text-center mb-6 mt-3">My Services</h1>
      )}
      
      <div className="grid grid-cols-2 gap-3 sm:gap-6">
        {services.map((service, index) => (
          <div key={index} className="text-center p-4 bg-white rounded-lg shadow-md">
            <i className={`${service.icon} text-4xl text-primary mb-3`}></i>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-700 mb-4">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;