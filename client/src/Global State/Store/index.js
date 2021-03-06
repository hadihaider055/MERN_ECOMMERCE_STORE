import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Reducers from '../Reducers'

const store = createStore(
  Reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;
