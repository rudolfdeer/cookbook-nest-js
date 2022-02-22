import React from 'react';

export default function DotsIcon(): JSX.Element {
  return (
    <svg
      className="card__statistics-item__icon--dots"
      width="20"
      height="4"
      viewBox="0 0 20 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="2" cy="2" r="2" fill="#dadada" />
      <circle cx="10" cy="2" r="2" fill="#dadada" />
      <circle cx="18" cy="2" r="2" fill="#dadada" />
    </svg>
  );
}
