import React from "react";

interface SVGButtonProps {
  size?: number;
  svg?: JSX.Element;
  onClick?: () => void;
}

export default function SVGButton({
  size = 4,
  svg = DefaultSVG,
  onClick = () => null,
}: SVGButtonProps) {
  const buttonStyle = {
    width: `${size * 0.25}rem`,
    height: `${size * 0.25}rem`,
  };

  return (
    <button onClick={onClick} style={buttonStyle}>
      {React.cloneElement(svg, { className: "h-full w-full" })}{" "}
      {/* SVG에 클래스를 적용하여 크기 조절 */}
    </button>
  );
}

const DefaultSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
    />
  </svg>
);
