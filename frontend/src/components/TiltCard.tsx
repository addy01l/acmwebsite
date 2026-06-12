import React from 'react';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const TiltCard = ({ children, className = '', ...props }: TiltCardProps) => {
  return (
    <div
      className={`glass-panel ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default TiltCard;
