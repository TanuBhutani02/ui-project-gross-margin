/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const buttonStyle = css`
  background: linear-gradient(145deg, #f3f4f6, #e5e7eb);
  padding: 14px;
  border-radius: 50%;
  box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.1), -6px -6px 12px rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  position: relative;
  width: 50px;
  height: 50px;

  &:hover {
    background: #e0e0e0;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.15), -4px -4px 8px rgba(255, 255, 255, 0.6);
  }

  &:active {
    transform: scale(0.95);
    box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -4px -4px 8px rgba(255, 255, 255, 0.6);
  }
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

// SVG Icon with Colored Arrow
const RefreshIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.5 10H1l4-4 4 4H5a7 7 0 1 1-2.02 4.98"
      stroke="url(#gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3b82f6" /> 
        <stop offset="1" stopColor="#2563eb" />
      </linearGradient>
    </defs>
  </svg>
);

const RefreshButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <StyledButton onClick={onClick} title="Refresh Dashboard">
      <RefreshIcon />
    </StyledButton>
  );
};

export default RefreshButton;
