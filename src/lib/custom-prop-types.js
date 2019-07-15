import PropTypes from 'prop-types';

export default {
  apiData: PropTypes.shape({
    dataLoaded: PropTypes.bool,
    error: PropTypes.object,
    fetching: PropTypes.bool,
    payload: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
  message: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    text: PropTypes.string,
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  activeRequests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    payload: PropTypes.object,
  })),
  location: PropTypes.shape({
    pathname: PropTypes.string,
    key: PropTypes.string,
    hash: PropTypes.string,
    search: PropTypes.string,
  }),
  currentQuery: PropTypes.object,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    // component: PropTypes.node,
  })),
};
