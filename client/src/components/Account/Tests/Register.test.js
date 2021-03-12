import React from "react";
import { shallow, mount } from "enzyme";
import Register from "../Register";

import { AccountContext } from "../AccountContext";
import { Provider } from "react-redux"; //keeps track of the store which is the global state which allows us to access the store from anywhere within the app.
import configureStore from "redux-mock-store";

const middleware = [];
const mockStore = configureStore(middleware);

describe("<Register />", () => {
  let initialState;
  let switchToSignin;
  let wrapper;

  beforeEach(() => {
    initialState = {
      account: {
        loginError: "",
      },
    };
    switchToSignin = jest.fn();
    wrapper = mount(
      <Provider store={mockStore(initialState)}>
        <AccountContext.Provider value={{ switchToSignin }}>
          <Register />
        </AccountContext.Provider>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    shallow(
      <Provider store={mockStore(initialState)}>
        <Register />
      </Provider>
    );
  });

  it("should call context once when clicked", () => {
    wrapper.find("p").simulate("click");
    expect(switchToSignin).toHaveBeenCalledTimes(1);
  });
});
