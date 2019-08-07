import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button } from '@codeparticle/whitelabelwallet.styleguide';
import './index.scss';

const TestRouteTrigger = withRouter(({ history }) => (
  <Button className='test-route-trigger' onClick={() => history.push('/test-route')}>Go to Test Route</Button>
));

const TestRoute = ({ manager }) => {
  const username = 'jeffs';
  const password = '123';

  useEffect(() => {
    async function managerDemo() {
      const exists = await manager.checkDatabaseExists(username, password);
      // TODO Write db logging
      console.log(`DB Exists: ${exists}`);

      if (!exists) {
        await manager.generateDatabase();
        const saved = await manager.saveDatabase(username, password);

        console.log(`Saved DB: ${saved}`);
      }

      const db = await manager.loadDatabase(username, password);
      console.log(db ? 'dbLoaded' : 'dbNotLoaded');

      const initialSettings = await manager.databaseManager.getUserSettings();
      const version = await manager.databaseManager.getCurrentVersion();
      console.log('initialSettings: ', initialSettings[0]);
      console.log('version: ', version);
    }

    managerDemo();
  }, [username, password]);

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
