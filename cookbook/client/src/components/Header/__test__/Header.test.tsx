import React from 'react';
import { shallow } from 'enzyme';
import Header from '../index';
import { ICookbook, IRecipe } from '../../../interfaces';

describe('header component', () => {
  const props = {
    user: {
      id: 1,
      name: 'Tet Test',
      image: 'images/user1.png',
      email: 'johndoe@test.com',
      password: 'user1',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      savedRecipes: [] as IRecipe[],
      savedCookbooks: [] as ICookbook[],
    },
    getLoggedInUser: jest.fn(),
  };

  const component = shallow(<Header {...props} />);

  it('renders the <Header /> component', () => {
    expect(component.exists('header')).toBe(true);
  });

  it('renders user name when props passed', () => {
    const link = component.find('.header__login');
    expect(link.text()).toBe(props.user.name);
  });
});
