import _ from 'lodash';

const getLowercaseKeys = function(object) {
  if (typeof object !== 'object') {
    return null;
  }

  if (Array.isArray(object)) {
    return object.map((item) => {
      return _.transform(item, (result, val, key) => {
        result[_.lowerFirst(key)] = val;
      });
    });
  }

  return _.transform(object, (result, val, key) => {
    result[_.lowerFirst(key)] = val;
  });
};

export { getLowercaseKeys };
