const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'flex justify-center items-center w-38 h-12 rounded font-medium transition-all duration-500';
  
  const variants = {
    primary: ' px-3 bg-primary text-white main-border hover:bg-transparent hover:text-primary',
    secondary: ' px-3 bg-transparent text-primary main-border hover:bg-primary hover:text-white'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;