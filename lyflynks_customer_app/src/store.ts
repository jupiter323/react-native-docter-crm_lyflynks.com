import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import { ApiMiddleware } from 'middlewares';

const logger = createLogger({ predicate: () => __DEV__ });

const middlewares = [
  thunk,
  logger,
  ApiMiddleware,
];

function configureStore(initState = {}) {
  const enhancer = compose(
    applyMiddleware(...middlewares)
  );

  let store = createStore(reducers, initState, enhancer);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export default configureStore;
