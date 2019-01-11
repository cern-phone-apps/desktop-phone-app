export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";
export const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";

export function show(opts, level = "success") {
  return {
    type: SHOW_NOTIFICATION,
    ...opts,
    level,
    position: "tr"
  };
}

export function success(opts) {
  return show(opts, "success");
}

export function error(opts) {
  return show(opts, "error");
}

export function warning(opts) {
  return show(opts, "warning");
}

export function info(opts) {
  return show(opts, "info");
}

export function hide(uid) {
  return {
    type: HIDE_NOTIFICATION,
    uid
  };
}
