import React from "react";
import { SettingsModal } from "settings/components/SettingsModal/SettingsModal";

it("renders without crashing", () => {
  const hideSidebarIfVisible = jest.fn();
  const logout = jest.fn();
  const wrapper = shallow(
    <SettingsModal
      t={key => key}
      hideSidebarIfVisible={hideSidebarIfVisible}
      logout={logout}
    />
  );

  expect(wrapper.text()).toContain("<Modal />");
  expect(wrapper.html()).toContain('<a class="item SidebarSettingsButton">');
  expect(wrapper.html()).toContain("Settings");
});
