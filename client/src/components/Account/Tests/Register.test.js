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
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init) => [init, setState]);

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

  it("should contain new input information after change", () => {
    wrapper.find("#username").instance().textContent = "mjbathtub";
    expect(wrapper.find("#username").instance().textContent).toBe("mjbathtub");
    wrapper.find("#password").instance().textContent = "password";
    expect(wrapper.find("#password").instance().textContent).toBe("password");
    wrapper.find("#email").instance().textContent = "myemail@email.com";
    expect(wrapper.find("#email").instance().textContent).toBe("myemail@email.com");
    wrapper.find("#confirmPassword").instance().textContent = "confirmpassword";
    expect(wrapper.find("#confirmPassword").instance().textContent).toBe(
      "confirmpassword"
    );
  });

  it("should trigger state change", () => {
    wrapper
      .find("#email")
      .props()
      .onChange({ target: { value: "yo" } });
    expect(setState).toHaveBeenCalled();
  });

  it("should call state change with correct value", () => {
    wrapper
      .find("#email")
      .props()
      .onChange({ target: { value: "email@email.com" } });
    expect(setState).toHaveBeenCalledWith({
      email: "email@email.com",
      username: "",
      password: "",
      confirmPassword: "",
    });
    wrapper
      .find("#username")
      .props()
      .onChange({ target: { value: "mjbathtub" } });
    expect(setState).toHaveBeenCalledWith({
      email: "",
      username: "mjbathtub",
      password: "",
      confirmPassword: "",
    });
    wrapper
      .find("#password")
      .props()
      .onChange({ target: { value: "password" } });
    expect(setState).toHaveBeenCalledWith({
      email: "",
      username: "",
      password: "password",
      confirmPassword: "",
    });
    wrapper
      .find("#confirmPassword")
      .props()
      .onChange({ target: { value: "confirmpassword" } });
    expect(setState).toHaveBeenCalledWith({
      email: "",
      username: "",
      password: "",
      confirmPassword: "confirmpassword",
    });
  });
});
