# README For the RDX folder

## Info
For extra information, check the file rdx/utils/create-api-action.js
That has the main code responsible for how to use the actions

## Modules
Under the modules folder you will find all the different reducers/actions/selectors/actionTypes on the app.
Each folder under modules represents a single reducer on the root reducer.

To add an action, reducer, selector, or actionType, you can simply add to the existing files following the existing pattern. Or, if you want a new reducer, you can create a new folder and new files following the existing pattern.
Keep in mind when you add a new reducer, you have to import it in ./actions.js, ./reducers.js, ./selectors.js, and ./types.js.

### Important
Since redux actions/selectors are global, please be aware of which name to use so there are no conflicts.

### API Module
There is no need to edit the modules/api folder as its content is dynamic based on `API_ENDPOINTS` in api.js.
To add a new api call action, just add it to `API_ENDPOINTS` under the respective http method and you will be able to use it.
Ex:
```
[rdx/api.js]

export const API_ENDPOINTS = {
  GET: {
    LOCATION: 'location/:id/sub',
    LOCATION_NAME: 'location-name',
  },
  POST: {
    LOCATION: 'location/:id/sub',
  },
};

...

[containers/main/main.jsx]

const MainView = ({
  locationData,
  locationPostData,
  getLocation,
  getLocationName,
  postLocation,
}) => {
  useEffect(() => {
    getLocation({
      pathParams: {
        id: 123,
      },
    });

    getLocationName({
      queryParams: {
        isMyLocation: true,
      },
    });

    postLocation({
      body: {
        zipcode: '123123',
      },
    });
  }, []);

  return (
    <div>Placeholder</div>
  );
};

const selectionMapper = getRdxSelectionMapper({
  locationData: 'getLocation',
  locationPostData: 'getPostLocation',
});

const actionMapper = getRdxActionMapper([
  'getLocation',
  'getLocationName',
  'postLocation',
]);

const Main = connect(selectionMapper, actionMapper)(MainView);

export { Main };
```

### Usage
As you can see below, `getRdxSelectionMapper` and `getRdxActionMapper` are the most important functions to use this functionality.
`getRdxSelectionMapper` takes an object in which the property key will turn into the variable passed to the component's props, and the property value will be used to look up that selector from the list of selectors under the modules folder.
`getRdxActionMapper` takes an array of strings. Those strings are used to look up the actions under the modules folder. Those actions are then mapped to dispatch and passed as props to the component with the same name they have.
```
import React from 'react';
import customPropTypes from 'lib/custom-prop-types';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/props-mapping';

const MainView = () => {
  return ...;
};

const selectionMapper = getRdxSelectionMapper({
  authToken: 'getAuthToken',
  testData: 'getTestData',
});

const actionMapper = getRdxActionMapper([
  'getTest',
  'setAuthToken',
]);

const Main = connect(selectionMapper, actionMapper)(MainView);
```
