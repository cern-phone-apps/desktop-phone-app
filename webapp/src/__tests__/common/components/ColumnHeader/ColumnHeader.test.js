import { shallow } from "enzyme/build";
import React from "react";
import {ColumnHeader} from "common/components/ColumnHeader/ColumnHeader";

describe("ColumnHeader Tests", () => {
  it("renders ColumnHeader without crashing", () => {

    const wrapper = shallow(
      <ColumnHeader />
    );

    expect(wrapper.text()).toEqual("<Grid />");
  });
});