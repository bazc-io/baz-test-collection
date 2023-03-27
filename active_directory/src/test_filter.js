/**
 * Copyright 2023 Bazc
 *
 * test_filter.js
 * Defines the TestFilter class
 *
 * Author: Abhishek Prasad (dev@bazc.io)
 */

/*
 * TestFilter manages a list of test filters.
 *
 * The class stores a list of filters(include/exclue) per server in a map
 * Add server filters with addServerGroupFilter
 * Get server filter with getServerFilter
 */
class TestFilter {
  constructor() {
    this.filterMap = {};
  }

  /*
   * Add filters associated with a server
   * A filter comprises of 'include' and 'exclude' filter
   * A server filter could include one or both filters
   */
  addServerGroupFilter(serverList, includeFilter, excludeFilter) {
    let filterMap = {};

    if (typeof includeFilter != 'undefined') {
      filterMap['include'] = includeFilter;
    }
    if (typeof excludeFilter != 'undefined') {
      filterMap['exclude'] = excludeFilter;
    }

    if (Object.keys(filterMap).length != 0) {
      serverList.forEach(server => {
        this.filterMap[server.toLowerCase()] = { 'filter': filterMap };
      });
    }
  }

  /*
   * Get the filter associated with the server
   * The server is represented with its DNS name
   */
  getServerFilter(server) {
    return this.filterMap[server.toLowerCase()];
  }
}
