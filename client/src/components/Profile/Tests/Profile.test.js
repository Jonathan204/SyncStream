import React from "react";
import { shallow } from "enzyme";
import { Profile } from "../Profile";

describe("<Profile>", () => {
  let state;
  let props;
  beforeEach(() => {
    props = {
      getUser: jest.fn(),
      account: {
        username: "Joe Testman",
        email: "Joe@testmail.com",
        spotifyUserId: "JoeMusic",
      },
    };
    state = {
      username: "Joe Testman",
      email: "Joe@testmail.com",
      spotifyUserId: "JoeMusic",
      editing: false,
    };
  });

  test("get user information", () => {
    const wrapper = shallow(<Profile {...props} />);
    expect(props.getUser).toHaveBeenCalled();
  });
});
