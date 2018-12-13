import React from "react";
import { shallow } from "enzyme";
import "i18n";
import { DownloadDebugLogsButton } from "debug/components/DownloadDebugLogsButton/DownloadDebugLogsButton";

it("renders without crashing", () => {
  const wrapper = shallow(<DownloadDebugLogsButton />);
});

it("renders expected texts", () => {
  const wrapper = shallow(<DownloadDebugLogsButton />);

  expect(wrapper.text()).toEqual("<Modal />");
  expect(wrapper.html()).toContain("bug");
  expect(wrapper.html()).toContain("icon");
  expect(wrapper.html()).toContain("button");
});

it("triggers handleOpen", () => {
  const wrapper = shallow(<DownloadDebugLogsButton />);

  expect(wrapper.state("modalOpen")).toBe(false);
  wrapper.instance().handleOpen();
  expect(wrapper.state("modalOpen")).toBe(true);
});

it("triggers handleClose", () => {
  const wrapper = shallow(<DownloadDebugLogsButton />);

  wrapper.instance().handleOpen();
  expect(wrapper.state("modalOpen")).toBe(true);
  wrapper.instance().handleClose();
  expect(wrapper.state("modalOpen")).toBe(false);
});

it("triggers loadLogs", () => {
  const wrapper = shallow(<DownloadDebugLogsButton />);

  wrapper.instance().handleOpen();
  expect(wrapper.state("logsLoaded")).toBe(false);
  wrapper.instance().loadLogs();
  expect(wrapper.state("logsLoaded")).toBe(true);
});

it("triggers getIpAddress", () => {
  const wrapper = shallow(<DownloadDebugLogsButton />);

  const result = wrapper.instance().getIpAddress("1", "2", "3");
  expect(result).toEqual({ ip: { address: "1", ipv4: "3", public: "2" } });
});

it("triggers generateLogs", () => {
  const wrapper = shallow(<DownloadDebugLogsButton />);

  wrapper.instance().loadLogs();
  expect(wrapper.state("logsLoaded")).toBe(true);
  wrapper.instance().generateLogs();
  expect(wrapper.state("logs")).toContain("Nodejs");
  expect(wrapper.state("logs")).toContain("speakers");
  expect(wrapper.state("logs")).toContain("microphones");
  expect(wrapper.state("logs")).toContain("browser");
  // expect(result).toEqual({ ip: { address: "1", ipv4: "3", public: "2" } });
});

it("triggers getOSInformation", () => {
  const wrapper = shallow(<DownloadDebugLogsButton />);

  const result = wrapper.instance().getOSInformation();

  expect(result).toHaveProperty("os");
  expect(result.os).toHaveProperty("name", "Nodejs");
  expect(result.os).toHaveProperty("isMobileDevice", false);
  expect(result.os).toHaveProperty("resolution", "");
  expect(result.os).toHaveProperty("version");
});

it("triggers getBrowserInformation", () => {
  const wrapper = shallow(<DownloadDebugLogsButton />);

  const result = wrapper.instance().getBrowserInformation();

  expect(result).toHaveProperty("browser");
  expect(result.browser).toHaveProperty("name", "jsdom");
  expect(result.browser).toHaveProperty("isPromisesSupported", true);
  expect(result.browser).toHaveProperty("version");
});

it("triggers getWebrtcInformation", () => {
  const wrapper = shallow(<DownloadDebugLogsButton />);

  const result = wrapper.instance().getWebrtcInformation();

  expect(result).toHaveProperty("webrtc");
  expect(result.webrtc).toHaveProperty("enabled", false);
  expect(result.webrtc).toHaveProperty("isAudioContextSupported", false);
  expect(result.webrtc).toHaveProperty("isRtpDataChannelsSupported");
  expect(result.webrtc).toHaveProperty("isSctpDataChannelsSupported");
  expect(result.webrtc).toHaveProperty("ortc");
  expect(result.webrtc).toHaveProperty("webSocketsSupported");
});


it("triggers getDevicesInformation", () => {
  const wrapper = shallow(<DownloadDebugLogsButton />);

  const result = wrapper.instance().getDevicesInformation();

  expect(result).toHaveProperty("devices");
  expect(result.devices).toHaveProperty("canChangeOutputDevice");
  expect(result.devices).toHaveProperty("getUserMediaAvailable");
  expect(result.devices).toHaveProperty("hasMicrophonePermissions");
  expect(result.devices).toHaveProperty("microphones");
  expect(result.devices).toHaveProperty("speakers");

});

it("triggers getSystemInformation", () => {
  const wrapper = shallow(<DownloadDebugLogsButton />);

  const result = wrapper.instance().getSystemInformation({ip: '1234'});

  expect(result).toHaveProperty("system");
  expect(result.system).toHaveProperty("devices");
  expect(result.system).toHaveProperty("browser");
  expect(result.system).toHaveProperty("os");
  expect(result.system).toHaveProperty("webrtc");
  expect(result.system).toHaveProperty("ip");
});
