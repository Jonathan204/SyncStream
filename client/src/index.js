import React from "react";
import ReactDOM from "react-dom";
import { composeWithDevTools } from "redux-devtools-extension";

//redux dependencies
import { Provider } from "react-redux"; //keeps track of the store which is the global state which allows us to access the store from anywhere within the app.
import { persistStore, persistReducer } from "redux-persist";
import { createStore, applyMiddleware } from "redux";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import thunk from "redux-thunk";
import reducers from "./reducers";
import App from "./App";
import { PersistGate } from "redux-persist/lib/integration/react";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const pReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  pReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
