/**
* MIT License
*
* Copyright (c) 2020 Code Particle Inc.
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
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
