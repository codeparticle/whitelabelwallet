import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button } from '@codeparticle/whitelabelwallet.styleguide';
import './index.scss';

const TestRouteTrigger = withRouter(({ history }) => (
  <Button className='test-route-trigger' onClick={() => history.push('/test-route')}>Go to Test Route</Button>
));

const TestRoute = ({ manager }) => {
  useEffect(() => {
    manager.checkDatabaseExists('test', '123').then((exists) => {
      console.log(`DB Exists: ${exists}`);
    });

    manager.saveDatabase('test', '123', new Buffer('Test DB Data', 'utf-8')).then((saved) => {
      console.log(`Saved DB: ${saved}`);

      manager.loadDatabase('test', '123').then((buffer) => {
        console.log(`DB Data: ${new TextDecoder('utf-8').decode(buffer)}`);
      });
    });
  }, []);

  return (
    <div>
      <p>This is the Test Route!</p>
      <Link to='/test-route-the-second'>Navigate To Test Route The Second!!</Link>
      <br />
      <Link to='/'>Go Home</Link>
    </div>
  );
};

const TestRouteTheSecond = () => (
  <div>
    <p>This is the Test Route The Second!!</p>
    <Link to='/test-route'>Navigate To Test Route!</Link>
    <br />
    <Link to='/'>Go Home</Link>
  </div>
);

const TestRoutePlugin = (store, manager) => {
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
          render: (props) => <TestRoute {...props} manager={manager} />,
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
