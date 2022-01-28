import React from 'react';
import getDefaultColor from '../../helpers/getIconColor';

type CommentsIconProps = {
  loggedInUserId?: number;
  commentedUsersIds?: number[];
};

export default function CommentsIcon(props: CommentsIconProps): JSX.Element {
  const {
    loggedInUserId, commentedUsersIds,
  } = props;

  const defaultColor = getDefaultColor(loggedInUserId, commentedUsersIds);

  return (
    <svg
      className="card__statistics-item__icon"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 15V1.66667C0 0.746192 0.746192 0 1.66667 0H13.3333C14.2538 0 15 0.746192 15 1.66667V10C15 10.9205 14.2538 11.6667 13.3333 11.6667H5C4.63928 11.666 4.28818 11.783 4 12L0 15Z"
        fill={`${defaultColor}`}
      />
    </svg>
  );
}
