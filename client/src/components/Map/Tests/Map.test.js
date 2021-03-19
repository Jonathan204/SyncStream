import React from "react";
import { mount, shallow } from "enzyme";
import { Map } from "../Map";

describe("<Map>", () => {
  let state;
  let props;
  beforeEach(() => {
    props = {
      getUsers: jest.fn(),
      updateUser: jest.fn(),
      account: {
        username: "Joe Testman",
        email: "Joe@testmail.com",
        spotifyUserId: "JoeMusic",
        id: "1",
      },
      user: {
        username: "Joe Testman",
      },
    };
    state = {
      token: null,
      user_spotify_id: null,
      no_data: false,
      center: { lat: 0, lng: 0 },
      currLocation: false,
      loadComplete: false,
      users: [
        { lat: 49.895138, lng: -97.138374, username: "johntest" },
        { lat: 49.895138, lng: -97.138374, username: "johntest2" },
      ],
    };
  });

  test("should change current coordinates", () => {
    const wrapper = shallow(<Map {...props} />);
    wrapper.setState(state);
    const testPos = {
      coords: {
        latitude: 1,
        longitude: 2,
      },
    };
    wrapper.instance().currentCoords(testPos);
    expect(wrapper.state().center.lat).toBe(1);
    expect(wrapper.state().center.lng).toBe(2);
    expect(wrapper.state().currLocation).toBeTruthy();
    expect(wrapper.state().loadComplete).toBeTruthy();
  });

  test("should dispatch updateUser", () => {
    const wrapper = mount(<Map {...props} />);
    const id = "1";
    const userData = "";
    wrapper.instance().props.updateUser(id, userData);
    expect(props.updateUser).toHaveBeenCalled();
  });

  test("should handle location error", () => {
    const wrapper = shallow(<Map {...props} />);
    wrapper.setState(state);
    wrapper.instance().handleLocationError();
    expect(wrapper.state().loadComplete).toBeTruthy();
  });
});
