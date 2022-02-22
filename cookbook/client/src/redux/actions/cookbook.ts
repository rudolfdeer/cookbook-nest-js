import ACTION_TYPES from '../../constants/actionTypes';
import { IUser, ICookbook } from '../../interfaces';

class CookbookActions {
  getAll(cookbooks: ICookbook[]) {
    return {
      type: ACTION_TYPES.COOKBOOKS_GET_ALL,
      payload: {
        cookbooks,
      },
    };
  }

  sort(cookbooks: ICookbook[], order: string) {
    return {
      type: ACTION_TYPES.COOKBOOKS_SORT,
      payload: {
        cookbooks,
        order,
      },
    };
  }

  filter(cookbooks: ICookbook[], tags: string[], userId: number) {
    return {
      type: ACTION_TYPES.COOKBOOKS_FILTER,
      payload: {
        cookbooks,
        tags,
        userId,
      },
    };
  }

  getCreatedCookbooks(cookbooks: ICookbook[]) {
    return {
      type: ACTION_TYPES.COOKBOOKS_GET_USERS_CREATED,
      payload: {
        cookbooks,
      },
    };
  }

  getUsersSaved(user: IUser) {
    return {
      type: ACTION_TYPES.COOKBOOKS_GET_USERS_SAVED,
      payload: {
        user,
      },
    };
  }

  createComment(cookbooks: ICookbook[]) {
    return {
      type: ACTION_TYPES.COOKBOOKS_CREATE_COMMENT,
      payload: {
        cookbooks,
      },
    };
  }

  create(cookbooks: ICookbook[], userId: number) {
    return {
      type: ACTION_TYPES.COOKBOOKS_CREATE,
      payload: {
        cookbooks,
        userId,
      },
    };
  }

  update(cookbooks: ICookbook[], userId: number) {
    return {
      type: ACTION_TYPES.COOKBOOKS_MODIFY,
      payload: {
        cookbooks,
        userId,
      },
    };
  }

  like(cookbooks: ICookbook[]) {
    return {
      type: ACTION_TYPES.COOKBOOKS_LIKE,
      payload: {
        cookbooks,
      },
    };
  }

  delete(cookbooks: ICookbook[], userId: number) {
    return {
      type: ACTION_TYPES.COOKBOOKS_DELETE,
      payload: {
        cookbooks,
        userId,
      },
    };
  }

  hideUsers(cookbooks: ICookbook[], userId: number) {
    return {
      type: ACTION_TYPES.COOKBOOKS_HIDE_USERS_CREATED,
      payload: {
        cookbooks,
        userId,
      },
    };
  }
}

export default new CookbookActions();
