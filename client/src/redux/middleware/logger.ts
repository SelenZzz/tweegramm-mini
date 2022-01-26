import { Middleware } from 'redux';

const infoStyle = 'background: green; color: white;';

const loggerMiddleware: Middleware = (store) => {
  return (next) => {
    return (action) => {
      console.log('%cINFO:', infoStyle, ' Dispatching: ', action);
      const result = next(action);
      console.log('%cINFO:', infoStyle, ' Next state: ', store.getState());
      return result;
    };
  };
};

export default loggerMiddleware;
