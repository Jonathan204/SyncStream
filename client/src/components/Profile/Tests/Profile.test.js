import React from "react";
import { shallow } from "enzyme";
import { Profile } from "../Profile";
import { createMemoryHistory } from "history";

describe("<Profile>", () => {
  let state;
  let props;
  const history = createMemoryHistory();
  beforeEach(() => {
    props = {
      history: history,
      getUser: jest.fn(),
      getUsers: jest.fn(),
      updateUser: jest.fn(),
      logoutUser: jest.fn(),
      preventDefault: jest.fn(),
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

  it("renders properly", () => {
    shallow(<Profile {...props} />);
  });

  it("has the right profile values", () => {
    const wrapper = shallow(<Profile {...props} />);
    wrapper.setState(state);

    expect(wrapper.state().username).toBe("Joe Testman");
    expect(wrapper.state().email).toBe("Joe@testmail.com");
    expect(wrapper.state().spotifyUserId).toBe("JoeMusic");
    expect(wrapper.state().editing).toBe(false);
  });

  it("should dispatch getUser", () => {
    const wrapper = shallow(<Profile {...props} />);
    const id = "fakeId";

    wrapper.instance().props.getUser(id);
    expect(props.getUser).toHaveBeenCalled();
  });
  it("should dispatch getUsers", () => {
    const wrapper = shallow(<Profile {...props} />);

    wrapper.instance().props.getUsers();
    expect(props.getUsers).toHaveBeenCalled();
  });
  it("should dispatch updateUser", () => {
    const wrapper = shallow(<Profile {...props} />);
    const id = "fakeId";
    const user = "fakeUser";

    wrapper.instance().props.updateUser(id, user);
    expect(props.updateUser).toHaveBeenCalled();
  });
  it("should dispatch logout", () => {
    const wrapper = shallow(<Profile {...props} />);

    wrapper.instance().props.logoutUser();
    expect(props.logoutUser).toHaveBeenCalled();
  });

  it("should try to logout the user", () => {
    const wrapper = shallow(<Profile {...props} />);

    wrapper.instance().handleLogout();
    expect(props.logoutUser).toHaveBeenCalled();
  });

  it("should change the state accordingly", () => {
    const wrapper = shallow(<Profile {...props} />);
    const stateChange = {
      target: { name: "username", value: "mjbathtub" },
    };
    wrapper.setState(state);

    expect(wrapper.state().username).toBe("Joe Testman");
    wrapper.instance().handleChange(stateChange);
    expect(wrapper.state().username).toBe("mjbathtub");
  });

  it("should enable editting", () => {
    const wrapper = shallow(<Profile {...props} />);
    const event = {
      preventDefault: props.preventDefault,
    };
    wrapper.setState(state);

    wrapper.instance().handleEditProfile(event);
    expect(wrapper.state().editing).toBe(true);
  });

  it("should properly submit profile changes", () => {
    const wrapper = shallow(<Profile {...props} />);
    const event = {
      preventDefault: props.preventDefault,
    };
    let newState = {
      username: "newTestName",
      email: "newTestName@testmail.com",
      editing: true,
    };
    wrapper.setState(newState);

    wrapper.instance().handleSubmitProfile(event);
    expect(wrapper.state().editing).toBe(false);
    expect(props.updateUser).toHaveBeenCalledWith(null, {
      username: "newTestName",
      email: "newTestName@testmail.com",
    });
  });
});
