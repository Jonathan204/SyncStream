import React from "react";
import { mount, shallow } from "enzyme";
import Account from "../Account";
import Login from "../Login";
import Register from "../Register";

import { Provider } from "react-redux"; //keeps track of the store which is the global state which allows us to access the store from anywhere within the app.
import configureStore from "redux-mock-store";

const middleware = [];
const mockStore = configureStore(middleware);
const initialState = {
  account: {
    loginError: "",
  },
};

describe("<Account />", () => {
  it("should render without crashing", () => {
    shallow(<Account />);
  });

  it("should render <Login /> by default", () => {
    const wrapper = shallow(<Account />);
    expect(wrapper.containsMatchingElement(<Login />)).toEqual(true);
  });

  it("should not render <Register /> by default", () => {
    const wrapper = shallow(<Account />);
    expect(wrapper.containsMatchingElement(<Register />)).toEqual(false);
  });

  it("should render <Register /> after state change", () => {
    const wrapper = mount(
      <Provider store={mockStore(initialState)}>
        <Account />
      </Provider>
    );
    wrapper.find("p").simulate("click");
    expect(wrapper.containsMatchingElement(<Register />)).toEqual(true);
  });

  it("should render <Register /> then render <Login />", () => {
    const wrapper = mount(
      <Provider store={mockStore(initialState)}>
        <Account />
      </Provider>
    );
    wrapper.find("p").simulate("click");
    expect(wrapper.containsMatchingElement(<Register />)).toEqual(true);
    wrapper.find("p").simulate("click");
    expect(wrapper.containsMatchingElement(<Login />)).toEqual(true);
  });
});
