import { AnyAction } from 'redux';
import ACTION_TYPES from '../../constants/actionTypes';
import { IUser } from '../../interfaces';

const initialState: null | IUser = null;

type userReducer = typeof initialState;

export default function userReducer(
  state = initialState,
  action: AnyAction
): userReducer {
  switch (action.type) {
    case ACTION_TYPES.user_UPDATE: {
      const { user } = action.payload;
      return {
        ...state,
        ...user,
      };
    }

    case ACTION_TYPES.user_UPDATE_PHOTO: {
      const { user } = action.payload;
      return {
        ...state,
        ...user,
      };
    }

    case ACTION_TYPES.user_SIGN_IN: {
      const { user } = action.payload;
      return {
        ...state,
        ...user,
      };
    }

    case ACTION_TYPES.user_SIGN_OUT: {
      return null;
    }

    case ACTION_TYPES.user_SIGN_UP: {
      const { user } = action.payload;

      return {
        ...state,
        ...user,
      };
    }

    case ACTION_TYPES.user_DELETE: {
      return null;
    }

    default:
      return state;
  }
}
