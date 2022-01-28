import SERVER_URL from '../../constants/serverUrl';
import {
  ICookbook, ICookbookRequestBody,
} from '../../interfaces';

const base = `${SERVER_URL}/api`;
const cookbooksUrl = `${base}/cookbooks/`;

class CookbookApi {
  async getUsersCreatedCookbooks(userId: number) {
    const cookbooks = await this.getAllCookbooks();
    const filteredCookbooks = cookbooks.filter((el: ICookbook) => el.UserId === userId);
    return filteredCookbooks;
  }

  async getAllCookbooks() {
    const response = await fetch(`${cookbooksUrl}`, {
      credentials: 'include',
    });
    const result = await response.json();
    return result;
  }

  async createCookbook(data: FormData) {
    const response = await fetch(`${cookbooksUrl}`, {
      method: 'POST',
      body: data,
      credentials: 'include',
    });

    const result = await response.json();
    return result;
  }

  async commentCookbook(cookbookId: number, text: string) {
    const body = {
      text,
      date: new Date().toString(),
    };
    const response = await fetch(`${cookbooksUrl}${cookbookId}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const result = await response.json();
    return result;
  }

  async likeCookbook(cookbookId: number) {
    const response = await fetch(`${cookbooksUrl}${cookbookId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const result = await response.json();
    return result;
  }

  async updateCookbook(cookbookId: number, data: ICookbookRequestBody) {
    const {
      title,
      description,
      views,
      likeUserIds,
      recipesIds,
    } = data;

    const body = {
      title,
      description,
      views,
      likeUserIds,
      recipesIds,
    };

    const response = await fetch(`${cookbooksUrl}${cookbookId}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const result = await response.json();
    return result;
  }

  async deleteCookbook(id: number) {
    await fetch(`${cookbooksUrl}${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
  }

  async updateCookbooksImage(id: number, data: FormData) {
    const response = await fetch(`${cookbooksUrl}${id}/image`, {
      method: 'POST',
      body: data,
      credentials: 'include',
    });

    const result = await response.json();
    return result;
  }
}

export default new CookbookApi();
