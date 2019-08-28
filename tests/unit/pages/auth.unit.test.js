import React from 'react';
import { mount } from 'enzyme';
import { AuthPage } from 'pages';
import { TestApp } from '../test-app';

describe('AuthPage Test', () => {
  const authProps = {
    authToken: '',
    history: {
      push: jest.fn(),
    },
    match: {},
  };

  describe('Login route', () => {
    authProps.match.path = '/login';

    const wrapper = mount(
      <TestApp>
        <AuthPage  {...authProps} />
      </TestApp>
    ).find(AuthPage);

    it('renders without crashing', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render the correct form elements', () => {
      expect(wrapper.find('LabeledCheckbox')).toHaveLength(0);
      expect(wrapper.find('Button')).toHaveLength(2);
      expect(wrapper.find('TextInput')).toHaveLength(2);
    });
  });

  describe('Signup route', () => {
    authProps.match.path = '/signup';

    const wrapper = mount(
      <TestApp>
        <AuthPage  {...authProps} />
      </TestApp>
    ).find(AuthPage);

    it('renders without crashing', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render the correct form elements', () => {
      expect(wrapper.find('LabeledCheckbox')).toHaveLength(1);
      expect(wrapper.find('Button')).toHaveLength(2);
      expect(wrapper.find('TextInput')).toHaveLength(3);
    });
  });
});
