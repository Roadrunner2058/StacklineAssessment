// Standard Redux store


import { createStore } from 'redux';
import counterReducer from './reducers/reducers';

const store = createStore(counterReducer);

export default store;