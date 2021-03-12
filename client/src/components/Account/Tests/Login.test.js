import React from "react";
import { shallow, mount } from "enzyme";
import Login from "../Login";

import { AccountContext } from "../AccountContext";
import { Provider } from "react-redux"; //keeps track of the store which is the global state which allows us to access the store from anywhere within the app.
import configureStore from "redux-mock-store";

const middleware = [];
const mockStore = configureStore(middleware);

describe("<Login />", () => {
  let initialState;
  let switchToSignup;
  let wrapper;

  beforeEach(() => {
    initialState = {
      account: {
        loginError: "",
      },
    };
    switchToSignup = jest.fn();
    wrapper = mount(
      <Provider store={mockStore(initialState)}>
        <AccountContext.Provider value={{ switchToSignup }}>
          <Login />
        </AccountContext.Provider>
      </Provider>
    );
  });

  it("should render without crashing", () => {
    shallow(
      <Provider store={mockStore(initialState)}>
        <Login />
      </Provider>
    );
  });

  it("should call context once when clicked", () => {
    wrapper.find("p").simulate("click");
    expect(switchToSignup).toHaveBeenCalledTimes(1);
  });
});
