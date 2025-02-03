export function uniqueId() {
  const getChar = () => Math.random().toString(16).slice(-4);
  return `${getChar()}-${getChar()}-${getChar()}-${getChar()}`;
}

export function uid() {
  let a = new Uint32Array(3);
  window.crypto.getRandomValues(a);
  return (
    performance.now().toString(36) +
    Array.from(a)
      .map((A) => A.toString(36))
      .join("")
  ).replace(/\./g, "");
}

export function generateRandomId(length: number) {
  let tempId = Math.random().toString();
  let uid = tempId.substr(2, length);
  return uid;
}

export function isMobile() {
  if (window) {
    return window.matchMedia(`(max-width: 767px)`).matches;
  }
  return false;
}

export function isMdScreen() {
  if (window) {
    return window.matchMedia(`(max-width: 1199px)`).matches;
  }
  return false;
}

/**
 * Checks if `value` is empty. Arrays, strings, or `arguments` objects with a
 * length of `0` and objects with no own enumerable properties are considered
 * "empty".
 *
 * @param {Array|Object|string} value The value to inspect.
 * @returns {boolean} Returns `true` if the `value` is empty, else `false`.
 *
 *
 */

export const isEmpty = (value: any) => {
  return (
    // null or undefined
    value == null ||
    // has length and it's zero
    (value.hasOwnProperty("length") && value.length === 0) ||
    // is an Object and has no keys
    (value.constructor === Object && Object.keys(value).length === 0)
  );
};

export function getQueryParam(prop: string) {
  var params: Record<string, string> = {};
  var search = decodeURIComponent(
    window.location.href.slice(window.location.href.indexOf("?") + 1)
  );
  var definitions = search.split("&");
  definitions.forEach(function (val, key) {
    var parts = val.split("=", 2);
    params[parts[0]] = parts[1];
  });
  return prop && prop in params ? params[prop] : undefined;
}

export function getPathArray() {
  const pathArray = window.location.pathname.split("/");
  const pathname = pathArray[pathArray.length - 1];
  return pathname;
}

export const formatDate = (date: string) => {
  const currentDate = new Date(date);
  return currentDate.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export function formatPreOrderDate() {
  let date = new Date();
  var day = ("0" + date.getDate()).slice(-2);
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var year = date.getFullYear();
  return [year, month, day].join("-");
}

export const isFutureDate = function (date: any) {
  const endDate = new Date(date);
  const today = new Date();

  if (endDate.setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0)) {
    return true;
  }

  return false;
};
