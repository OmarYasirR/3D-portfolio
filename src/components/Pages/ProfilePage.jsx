import Button from '../UI/Button';
import SocialMedia from '../UI/SocialMedia';
import { portfolioData } from '../../data/portfolioData';

const ProfilePage = () => {
  const { profile } = portfolioData;

const handleDownloadCV = () => {
  const link = document.createElement('a');
  link.href = '/cv.pdf';
  link.download = 'cv.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <div className="flex flex-col p-2 justify-center items-center">
      <img
        src={profile.image}
        alt="Profile"
        className="max-w-40 rounded-full border-4 border-primary m-auto mb-2"
      />
      <h1 className="text-4xl font-bold mb-1 text-center capitalize">{profile.name}</h1>
      <h3 className="text-primary text-xl mb-1 text-center">{profile.title}</h3>
      
      <SocialMedia socialLinks={profile.socialMedia} />
      
      <p className="text-justify mb-2 px-4 text-xs font-bold">{profile.description}</p>
      
      <div className="btn-box flex">
        <Button variant="primary" className="mx-2" onClick={handleDownloadCV}>
          Download CV
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;