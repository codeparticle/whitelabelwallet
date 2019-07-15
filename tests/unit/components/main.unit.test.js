import React from 'react';
import { mount } from 'enzyme';
import { Main } from 'components';
import { TestApp } from '../test-app';

test('main test', () => {
  const wrapper = mount(
    <TestApp>
      <Main />
    </TestApp>
  );

  expect(wrapper.length).toBe(1);
  expect(wrapper.text()).toContain('Welcome to your React App');
});
