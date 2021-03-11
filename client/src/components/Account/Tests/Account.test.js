import React from "react";
import { shallow } from "enzyme";
import Account from "../Account";
import Login from "../Login";
import Register from "../Register";

test("should pass test", () => {
  expect(true).toBeTruthy();
});

describe("<Account>", () => {
  let state;
  beforeEach(() => {
    state = {
      activeWindow: "signin",
    };
  });

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

  // it("should render <Register /> after state change", () => {
  //   const wrapper = shallow(<Account />);
  //   test.find("p").simulate("click");
  //   expect(wrapper.containsMatchingElement(<Register />)).toEqual(true);
  // });
});
