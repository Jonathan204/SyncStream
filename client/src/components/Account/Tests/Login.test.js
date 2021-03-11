import React from "react";
import { shallow } from "enzyme";
import Login from "../Login";

import { Provider } from "react-redux"; //keeps track of the store which is the global state which allows us to access the store from anywhere within the app.
import configureStore from "redux-mock-store";

const middleware = [];
const mockStore = configureStore(middleware);
const initialState = {
  account: {
    loginError: "placeholder state",
  },
};

describe("<Login />", () => {
  it("should render without crashing", () => {
    shallow(
      <Provider store={mockStore(initialState)}>
        <Login />
      </Provider>
    );
  });
});
