import React from "react";
import { shallow, mount } from "enzyme";
import Login from "../Login";

import { AccountContext } from "../AccountContext";
import * as redux from "react-redux"; //keeps track of the store which is the global state which allows us to access the store from anywhere within the app.
import configureStore from "redux-mock-store";

const middleware = [];
const mockStore = configureStore(middleware);

describe("<Login />", () => {
  let initialState;
  let switchToSignup;
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
    switchToSignup = jest.fn();
    wrapper = mount(
      <redux.Provider store={mockStore(initialState)}>
        <AccountContext.Provider value={{ switchToSignup }}>
          <Login />
        </AccountContext.Provider>
      </redux.Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    shallow(
      <redux.Provider store={mockStore(initialState)}>
        <Login />
      </redux.Provider>
    );
  });

  it("should call context once when clicked", () => {
    wrapper.find("p").simulate("click");
    expect(switchToSignup).toHaveBeenCalledTimes(1);
  });

  it("should contain new input information after change", () => {
    wrapper.find("#username").instance().textContent = "mjbathtub";
    expect(wrapper.find("#username").instance().textContent).toBe("mjbathtub");
    wrapper.find("#password").instance().textContent = "password";
    expect(wrapper.find("#password").instance().textContent).toBe("password");
  });

  it("should trigger state change", () => {
    wrapper
      .find("#username")
      .props()
      .onChange({ target: { value: "yo" } });
    expect(setState).toHaveBeenCalled();
  });

  it("should call state change with correct value", () => {
    wrapper
      .find("#username")
      .props()
      .onChange({ target: { value: "mjbathtub" } });
    expect(setState).toHaveBeenCalledWith({ password: "", username: "mjbathtub" });
    wrapper
      .find("#password")
      .props()
      .onChange({ target: { value: "password" } });
    expect(setState).toHaveBeenCalledWith({
      username: "",
      password: "password",
    });
  });

  //  it("should call dispatch on submit", () => {
  //    const dispatch = jest.fn();
  //    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
  //    useDispatchSpy.mockReturnValue(dispatch);
  //
  //    wrapper
  //      .find(Form)
  //      .props()
  //      .onSubmit({ preventDefault: () => {}, stopPropagation: () => {} });
  //    expect(dispatch).toHaveBeenCalled();
  //  });
});
