import ACTION_TYPES from '../../constants/actionTypes';
import { IUser } from '../../interfaces';

class userActions {
  signIn(user: IUser) {
    return {
      type: ACTION_TYPES.user_SIGN_IN,
      payload: {
        user,
      },
    };
  }

  signUp(user: IUser) {
    return {
      type: ACTION_TYPES.user_SIGN_UP,
      payload: {
        user,
      },
    };
  }

  signOut() {
    return {
      type: ACTION_TYPES.user_SIGN_OUT,
    };
  }

  delete() {
    return {
      type: ACTION_TYPES.user_DELETE,
    };
  }

  update(user: IUser) {
    return {
      type: ACTION_TYPES.user_UPDATE,
      payload: {
        user,
      },
    };
  }

  updatePhoto(user: IUser) {
    return {
      type: ACTION_TYPES.user_UPDATE_PHOTO,
      payload: {
        user,
      },
    };
  }
}

export default new userActions();
