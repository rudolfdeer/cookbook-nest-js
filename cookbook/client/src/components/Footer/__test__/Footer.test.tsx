import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../index';

describe('footer component', () => {
  const component = shallow(<Footer />);

  it('renders the <Footer /> component', () => {
    expect(component).toMatchSnapshot();
  });
});
