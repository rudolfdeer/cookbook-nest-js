import SERVER_URL from '../../constants/serverUrl';
import { IAuthRequestBody, IUser, IUserRequestBody } from '../../interfaces';

const base = `${SERVER_URL}/api`;
const userUrl = `${base}/user/`;

class userApi {
  async getuserById(userId: number): Promise<IUser> {
    const response = await fetch(`${userUrl}${userId}`);
    const result = await response.json();
    return result;
  }

  async getLoggedInuser(): Promise<IUser> {
    const response = await fetch(`${userUrl}`, {
      credentials: 'include',
    });
    const result = await response.json();
    return result;
  }

  async signIn(data: IAuthRequestBody) {
    const response = await fetch(`${userUrl}sign-in`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const result = await response.json();
    return result;
  }

  async signUp(data: IAuthRequestBody) {
    const response = await fetch(`${userUrl}sign-up`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const result = await response.json();
    return result;
  }

  async signOut() {
    await fetch(`${userUrl}sign-out`, {
      method: 'DELETE',
      credentials: 'include',
    });
  }

  async deleteuser() {
    await fetch(`${userUrl}`, {
      method: 'DELETE',
      credentials: 'include',
    });
  }

  async updateuser(body: IUserRequestBody) {
    const response = await fetch(`${userUrl}`, {
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

  async changePassword(password: string) {
    const body = {
      password,
    };

    const response = await fetch(`${userUrl}change-password`, {
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

  async changeEmail(email: string) {
    const body = {
      email,
    };

    const response = await fetch(`${userUrl}change-email`, {
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

  async getAllusers() {
    const response = await fetch(`${userUrl}users/all`);

    const result = await response.json();
    return result;
  }

  async updateusersPhoto(data: FormData) {
    const response = await fetch(`${userUrl}update-photo`, {
      method: 'POST',
      body: data,
      credentials: 'include',
    });

    const result = await response.json();
    return result;
  }
}

export default new userApi();
