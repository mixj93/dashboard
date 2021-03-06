// Copyright 2015 Google Inc. All Rights Reserved.
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

import {stateName as chromeStateName} from 'chrome/state';
import {breadcrumbsConfig} from 'common/components/breadcrumbs/breadcrumbs_service';
import {DiscoveryController} from './controller';
import {stateName} from './state';
import {stateUrl} from './state';

/**
 * @param {!ui.router.$stateProvider} $stateProvider
 * @ngInject
 */
export default function stateConfig($stateProvider) {
  $stateProvider.state(stateName, {
    url: stateUrl,
    parent: chromeStateName,
    resolve: {
      'discovery': resolveResource,
    },
    data: {
      [breadcrumbsConfig]: {
        'label': i18n.MSG_BREADCRUMBS_DISCOVERY_AND_LOAD_BALANCING_LABEL,
      },
    },
    views: {
      '': {
        controller: DiscoveryController,
        controllerAs: '$ctrl',
        templateUrl: 'discovery/discovery.html',
      },
    },
  });
}

/**
 * @param {!angular.$resource} kdDiscoveryResource
 * @param {!./../chrome/state.StateParams} $stateParams
 * @param {!./../common/pagination/pagination_service.PaginationService} kdPaginationService
 * @return {!angular.$q.Promise}
 * @ngInject
 */
export function resolveResource(kdDiscoveryResource, $stateParams, kdPaginationService) {
  let paginationQuery = kdPaginationService.getDefaultResourceQuery($stateParams.namespace);
  return kdDiscoveryResource.get(paginationQuery).$promise;
}

const i18n = {
  /** @type {string} @desc Label 'Discovery and load balancing' that appears as a breadcrumbs on the
     action bar. */
  MSG_BREADCRUMBS_DISCOVERY_AND_LOAD_BALANCING_LABEL: goog.getMsg('Discovery and load balancing'),
};
