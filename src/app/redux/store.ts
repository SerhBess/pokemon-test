import { combineReducers, configureStore } from '@reduxjs/toolkit';
import newCommunitiesSlice from 'store/reducers/new-communities/newCommunitiesSlice';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({

});

// if we have to hydrate use this instead of  "rootReducer"
// const masterReducer = (state, action) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state,
//       ...action.payload,
//     };
//     return nextState;
//   }
//   return rootReducer(state, action);
// };

const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }),
});
export const wrapper = createWrapper(setupStore);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
