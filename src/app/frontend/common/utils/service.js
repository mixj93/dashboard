// Copyright 2017 The Kubernetes Dashboard Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const KE_PORTAL_ADDR_PRD = 'https://c.qiniu.com/';
const KE_PORTAL_ADDR_CS = 'https://c-cs.kirkcloud.com/';
const KE_PORTAL_ADDR_DEV = 'https://c-dev.kirkcloud.com/';

const DASHBOARD_HOST_DEV = 'c-dev-dashboard.kirkcloud.com';
const DASHBOARD_HOST_CXQ = 'c-cxq-dashboard.kirkcloud.com';
const DASHBOARD_HOST_CXS = 'c-cxs-dashboard.kirkcloud.com';
const DASHBOARD_HOST_CBQ = 'c-cbq-dashboard.kirkcloud.com';

/**
 * @final
 */
export class UtilsService {
  // /**
  //  * 
  //  * @ngInject
  //  */
  // constructor() {
  // }

  /**
   * @export
   * @param {string} name
   * @param {string} url
   * @return {string}
   */
  getQueryByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[[\]]/g, "\\$&");
    let regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    let results = regex.exec(url);
    if (!results) return '';
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  /**
   * @export
   * @param {string} url
   * @return {string}
   */
  removeTokenFromUrl(url) { // * not used yet
    let parts = url.split('?');
    let query = parts[parts.length - 1];
    let queries = query.split('&');
    let index = -1;
    queries.forEach((q, i) => {
      if (q.indexOf('token=') > -1) {
        index = i;
      }
    });
    if (index > -1) {
      queries.splice(index, 1);
      let newQuery = queries.join('&');
      parts[parts.length - 1] = newQuery;
    }
    return parts.join('?');
  }

  /**
   * @export
   * @return {string}
   */
  getCurrentKePortalAddr() {
    switch (window.location.host) {
      case DASHBOARD_HOST_DEV:
        return KE_PORTAL_ADDR_DEV;
      case DASHBOARD_HOST_CXQ:
      case DASHBOARD_HOST_CXS:
      case DASHBOARD_HOST_CBQ:
        return KE_PORTAL_ADDR_CS;
      default:
        return KE_PORTAL_ADDR_PRD;
    }
  }
}
