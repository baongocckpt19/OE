import {
  InjectionToken
} from "./chunk-46PG27ZX.js";

// node_modules/@angular/common/fesm2022/dom_tokens-rA0ACyx7.mjs
var DOCUMENT = new InjectionToken(ngDevMode ? "DocumentToken" : "");

// node_modules/@angular/common/fesm2022/dom_tokens-rA0ACyx7.mjs
var DOCUMENT = new InjectionToken(ngDevMode ? "DocumentToken" : "");

// node_modules/@angular/common/fesm2022/xhr-BfNfxNDv.mjs
function parseCookieValue(cookieStr, name) {
  name = encodeURIComponent(name);
  for (const cookie of cookieStr.split(";")) {
    const eqIndex = cookie.indexOf("=");
    const [cookieName, cookieValue] = eqIndex == -1 ? [cookie, ""] : [cookie.slice(0, eqIndex), cookie.slice(eqIndex + 1)];
    if (cookieName.trim() === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}
var PLATFORM_BROWSER_ID = "browser";
var PLATFORM_SERVER_ID = "server";
function isPlatformBrowser(platformId) {
  return platformId === PLATFORM_BROWSER_ID;
}
function isPlatformServer(platformId) {
  return platformId === PLATFORM_SERVER_ID;
}
var XhrFactory = class {
};

export {
  DOCUMENT,
  parseCookieValue,
  PLATFORM_BROWSER_ID,
  PLATFORM_SERVER_ID,
  isPlatformBrowser,
  isPlatformServer,
  XhrFactory
};
/*! Bundled license information:

@angular/common/fesm2022/dom_tokens-rA0ACyx7.mjs:
@angular/common/fesm2022/xhr-BfNfxNDv.mjs:
  (**
   * @license Angular v19.2.13
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
<<<<<<< HEAD:fontend/.angular/cache/19.2.13/DoAn/vite/deps/chunk-JJGPFT3O.js
//# sourceMappingURL=chunk-JJGPFT3O.js.map
=======
//# sourceMappingURL=chunk-7WXCYLWH.js.map
>>>>>>> 41c3ce445f484a2f8b45c83fb6e0705cc1ea2c9a:fontend/.angular/cache/19.2.13/DoAn/vite/deps/chunk-7WXCYLWH.js
