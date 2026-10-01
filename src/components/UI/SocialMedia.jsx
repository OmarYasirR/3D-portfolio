const SocialMedia = ({ socialLinks }) => {
  return (
    <div className="flex my-2 justify-center items-center">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.link}
          target="_blank"
          className="flex justify-center items-center w-10 h-10 bg-transparent main-border rounded-full text-primary text-xl mx-2 transition-all duration-500 hover:bg-primary hover:text-white"
        >
          <i className={social.icon}></i>
        </a>
      ))}
    </div>
  );
};

export default SocialMedia;