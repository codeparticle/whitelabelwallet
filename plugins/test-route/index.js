import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './index.scss';

const TestRouteTrigger = withRouter(({ history }) => (
  <button className='test-route-trigger' onClick={() => history.push('/test-route')}>Go to Test Route</button>
));

const TestRoute = () => (
  <div>
    <p>This is the Test Route!</p>
    <Link to='/test-route-the-second'>Navigate To Test Route The Second!!</Link>
    <br />
    <Link to='/'>Go Home</Link>
  </div>
);

const TestRouteTheSecond = () => (
  <div>
    <p>This is the Test Route The Second!!</p>
    <Link to='/test-route'>Navigate To Test Route!</Link>
    <br />
    <Link to='/'>Go Home</Link>
  </div>
);

const TestRoutePlugin = () => {
  return [
    {
      role: 'button',
      components: TestRouteTrigger,
    },
    {
      role: 'main-route',
      components: [
        {
          path: '/test-route',
          component: TestRoute,
          exact: true,
        },
        {
          path: '/test-route-the-second',
          component: TestRouteTheSecond,
          exact: true,
        },
      ],
    },
  ];
};

export { TestRoutePlugin };
