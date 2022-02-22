import { AnyAction } from 'redux';
import ACTION_TYPES from '../../constants/actionTypes';
import { IUser } from '../../interfaces';

const initialState: null | IUser = null;

type UserReducer = typeof initialState;

export default function userReducer(
  state = initialState,
  action: AnyAction,
): UserReducer {
  switch (action.type) {
    case ACTION_TYPES.USER_UPDATE: {
      const { user } = action.payload;
      return {
        ...state,
        ...user,
      };
    }

    case ACTION_TYPES.USER_UPDATE_PHOTO: {
      const { user } = action.payload;
      return {
        ...state,
        ...user,
      };
    }

    case ACTION_TYPES.USER_SIGN_IN: {
      const { user } = action.payload;
      return {
        ...state,
        ...user,
      };
    }

    case ACTION_TYPES.USER_SIGN_OUT: {
      return null;
    }

    case ACTION_TYPES.USER_SIGN_UP: {
      const { user } = action.payload;

      return {
        ...state,
        ...user,
      };
    }

    case ACTION_TYPES.USER_DELETE: {
      return null;
    }

    default:
      return state;
  }
}
