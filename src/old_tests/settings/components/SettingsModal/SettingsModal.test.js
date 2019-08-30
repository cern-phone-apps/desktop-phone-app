import React from "react";
import { SettingsModal } from "settings/components/SettingsModal/SettingsModal";

it("renders without crashing", () => {
  const hideSidebarIfVisible = jest.fn();
  const openSettingsModal = jest.fn();
  const closeSettingsModal = jest.fn();
  const logout = jest.fn();
  const wrapper = shallow(
    <SettingsModal
      t={key => key}
      hideSidebarIfVisible={hideSidebarIfVisible}
      logout={logout}
      modalOpen={false}
      closeSettingsModal={closeSettingsModal}
      openSettingsModal={openSettingsModal}
    />
  );

  expect(wrapper.text()).toContain("<Modal />");
});
