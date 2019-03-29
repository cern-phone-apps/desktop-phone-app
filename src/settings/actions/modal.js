//import { logMessage } from "common/utils/logs";

export const OPEN_SETTINGS_MODAL = "@@settings/OPEN_SETTINGS_MODAL";
export const CLOSE_SETTINGS_MODAL = "@@settings/CLOSE_SETTINGS_MODAL";


export function openSettingsModal() {
  return {
    type: OPEN_SETTINGS_MODAL
  };
}

export function closeSettingsModal() {
  return {
    type: CLOSE_SETTINGS_MODAL
  };
}