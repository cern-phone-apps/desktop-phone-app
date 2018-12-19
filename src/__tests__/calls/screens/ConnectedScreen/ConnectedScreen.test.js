import React from "react";
import { ConnectedScreen } from "calls/screens/CallsScreen/ConnectedScreen/ConnectedScreen";

describe("ConnectedScreen Screen tests", () => {
  it("renders ConnectedScreen without crashing", () => {
    const wrapper = shallow(<ConnectedScreen
      calling={false}
      userSelected={true} />);
    expect(wrapper.text()).toEqual("<GridColumn />");
  });
});
