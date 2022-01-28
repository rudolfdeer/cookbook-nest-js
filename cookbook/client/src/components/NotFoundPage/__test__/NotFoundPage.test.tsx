import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '../index';

describe('not found page component', () => {
  const component = shallow(<NotFoundPage />);
  it('renders the <NotFoundPage /> component', () => {
    expect(component).toMatchSnapshot();
  });
});
