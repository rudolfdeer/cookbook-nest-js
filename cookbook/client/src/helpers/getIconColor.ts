import Colors from '../constants/colors';

const getDefaultColor = (loggedInuserId: number, userIds: number[]): string => {
  if (!loggedInuserId || !userIds) {
    return Colors.Grey;
  }
  const index = userIds.indexOf(loggedInuserId);
  if (index > -1) {
    return Colors.Yellow;
  }
  return Colors.Grey;
};

export default getDefaultColor;
