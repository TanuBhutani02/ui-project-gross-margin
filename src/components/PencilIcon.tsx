import { css } from "@emotion/react";
import { cx } from "@emotion/css";

const pencilStyle = css`
  color: #007bff; /* Blue color */
  cursor: pointer;
  font-size: 16px;
  transition: color 0.2s;
  &:hover {
    color: #0056b3; /* Darker blue on hover */
  }
`;

export const PencilIcon = () => (
  <svg
    className={pencilStyle.toString()}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="currentColor"
  >
    <path d="M14.69 3.51L20.49 9.31L8.49 21.31L3.69 21.51L3.89 16.71L14.69 3.51M14.69 2L2.89 15.71L2 22L8.29 21.11L22 7.31L14.69 2Z" />
  </svg>
);
