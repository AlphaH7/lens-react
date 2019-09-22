import moment from 'moment';

function emptyFn() {
  return true;
}

function isLocallyServed() {
  return window.location.hostname.includes('localhost');
}

const AppHelper = {
  emptyFn,
  isLocallyServed,
};

export default AppHelper;
