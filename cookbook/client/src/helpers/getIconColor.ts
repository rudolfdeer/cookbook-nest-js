import Colors from '../constants/colors';

const getDefaultColor = (loggedInUserId: number, userIds: number[]): string => {
  if (!loggedInUserId || !userIds) {
    return Colors.Grey;
  }
  const index = userIds.indexOf(loggedInUserId);
  if (index > -1) {
    return Colors.Yellow;
  }
  return Colors.Grey;
};

export default getDefaultColor;
