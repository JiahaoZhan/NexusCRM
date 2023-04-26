import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { userSlice } from './slices/user'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
  autoMergeLevel2
}

const rootReducer = combineReducers({
  user: userSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false}).concat(logger).concat(thunk),
  devTools: true
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch