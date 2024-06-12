import ACTION_TYPES from '../../constants/actionTypes';
import { IUser } from '../../interfaces';

class UserActions {
  signIn(user: IUser) {
    return {
      type: ACTION_TYPES.USER_SIGN_IN,
      payload: {
        user,
      },
    };
  }

  signUp(user: IUser) {
    return {
      type: ACTION_TYPES.USER_SIGN_UP,
      payload: {
        user,
      },
    };
  }

  signOut() {
    return {
      type: ACTION_TYPES.USER_SIGN_OUT,
    };
  }

  delete() {
    return {
      type: ACTION_TYPES.USER_DELETE,
    };
  }

  update(user: IUser) {
    return {
      type: ACTION_TYPES.USER_UPDATE,
      payload: {
        user,
      },
    };
  }

  updatePhoto(user: IUser) {
    return {
      type: ACTION_TYPES.USER_UPDATE_PHOTO,
      payload: {
        user,
      },
    };
  }
}

export default new UserActions();
