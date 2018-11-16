import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import { ApiMiddleware } from 'middlewares';

const logger = createLogger({ predicate: (getState, store) => __DEV__ });


const middlewares = [
  thunk,
  __DEV__ ? logger: null,
  ApiMiddleware,
];

function configureStore(initState) {
  const enhancer = compose(
    applyMiddleware(...middlewares)
  );
  return createStore(reducers, initState, enhancer);
}

export default configureStore({});
