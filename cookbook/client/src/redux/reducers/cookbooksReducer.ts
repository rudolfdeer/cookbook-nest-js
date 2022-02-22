import { AnyAction } from 'redux';
import ACTION_TYPES from '../../constants/actionTypes';
import SortOrder from '../../constants/sortOrder';
import { ICookbook, ICookbookSaved } from '../../interfaces';

const initialState = [] as ICookbook[];

type CookbooksReducer = typeof initialState;

export default function cookbooksReducer(
  state = initialState,
  action: AnyAction,
): CookbooksReducer {
  switch (action.type) {
    case ACTION_TYPES.COOKBOOKS_GET_ALL: {
      const { cookbooks } = action.payload;
      return [...cookbooks];
    }

    case ACTION_TYPES.COOKBOOKS_LIKE: {
      const { cookbooks } = action.payload;
      return [...cookbooks];
    }

    case ACTION_TYPES.COOKBOOKS_FILTER: {
      const { tags, userId, cookbooks } = action.payload;
      const appliedTags = tags.sort();

      const hideUsersIndex = appliedTags.indexOf('hide');

      if (hideUsersIndex > -1) {
        appliedTags.splice(hideUsersIndex, 1);
      }

      let filtered;

      if (appliedTags.length === 0) {
        filtered = cookbooks;
      }
      if (appliedTags.length === 1) {
        filtered = cookbooks.filter(
          (cookbook: ICookbook) => cookbook.tags.indexOf(appliedTags[0]) > -1,
        );
      }
      if (appliedTags.length > 1) {
        filtered = cookbooks.filter((cookbook: ICookbook) => {
          const cookbookTags = cookbook.tags.sort();
          return cookbookTags.every(
            (value, index) => value === appliedTags[index],
          );
        });
      }

      let result;

      if (hideUsersIndex > -1) {
        result = filtered.filter((el: ICookbook) => el.UserId !== userId);
        appliedTags.push('hide');
      } else {
        result = filtered;
      }

      return [...result];
    }

    case ACTION_TYPES.COOKBOOKS_SORT: {
      const { order, cookbooks } = action.payload;

      let resData;

      switch (order) {
        case SortOrder.Likes: {
          resData = cookbooks.sort((a: ICookbook, b: ICookbook) => b.Cookbook_Likes.length - a.Cookbook_Likes.length);
          break;
        }
        case SortOrder.Views: {
          resData = cookbooks.sort((a: ICookbook, b: ICookbook) => b.views - a.views);
          break;
        }
        case SortOrder.Default: {
          resData = cookbooks.sort((a: ICookbook, b: ICookbook) => a.id - b.id);
          break;
        }

        default:
          resData = cookbooks;
      }

      return [...resData];
    }

    case ACTION_TYPES.COOKBOOKS_GET_USERS_CREATED: {
      const { cookbooks } = action.payload;

      return [...cookbooks];
    }

    case ACTION_TYPES.COOKBOOKS_GET_USERS_SAVED: {
      const { user } = action.payload;
      const savedCookbooks = user.Cookbook_Saveds;
      const resData = savedCookbooks.map((el: ICookbookSaved) => el.Cookbook);

      return [...resData];
    }

    case ACTION_TYPES.COOKBOOKS_CREATE_COMMENT: {
      const { cookbooks } = action.payload;
      return [...cookbooks];
    }

    case ACTION_TYPES.COOKBOOKS_CREATE: {
      const { cookbooks, userId } = action.payload;
      const usersCookbooks = cookbooks.filter(
        (cookbook: ICookbook) => cookbook.UserId === userId,
      );

      return [...usersCookbooks];
    }
    case ACTION_TYPES.COOKBOOKS_MODIFY: {
      const {
        cookbooks, userId,
      } = action.payload;

      const usersCookbooks = cookbooks.filter(
        (cookbook: ICookbook) => cookbook.UserId === userId,
      );

      return [...usersCookbooks];
    }

    case ACTION_TYPES.COOKBOOKS_HIDE_USERS_CREATED: {
      const { cookbooks, userId } = action.payload;

      const filteredCookbooks = cookbooks.filter((el: ICookbook) => el.UserId !== userId);

      return [...filteredCookbooks];
    }

    case ACTION_TYPES.COOKBOOKS_DELETE: {
      const { cookbooks, userId } = action.payload;
      const usersCookbooks = cookbooks.filter(
        (cookbook: ICookbook) => cookbook.UserId === userId,
      );

      return [...usersCookbooks];
    }

    default:
      return state;
  }
}
