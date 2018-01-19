import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers/index';

const logger = createLogger({ predicate: (getState, store) => __DEV__ });

function configureStore(initState) {
  const enhancer = compose(
    applyMiddleware(thunk, logger)
  );
  return createStore(reducers, initState, enhancer);
}

export default configureStore({});
