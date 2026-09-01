import React from "react";

const Logo = ({ className, size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="C:\\Users\\dushy\\Downloads\\file.svg"
      className={className}
    >
      <circle cx="50" cy="50" r="48" fill="#111827" />
      <path d="M30 35H70L75 45L50 85L25 45L30 35Z" fill="#DC2626" />
      <path d="M45 45V65L50 75L55 65V45H45Z" fill="white" />
      <rect x="35" y="30" width="30" height="5" fill="#DC2626" rx="1" />
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="#DC2626"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
    </svg>
  );
};

export default Logo;
