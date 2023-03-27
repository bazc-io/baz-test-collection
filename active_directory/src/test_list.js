/**
 * Copyright 2023 Bazc
 *
 * test_list.js
 * Defines the TestList class
 *
 * Author: Abhishek Prasad (dev@bazc.io)
 */

/*
 * TestList manages applicable tests for servers.
 *
 * The class manages the list of applicable tests for individual servers.
 * It takes a full list of test groups and tests along with a
 * test filter object as input. When queried for list of applicable test for a * server, it applies the relevant filter, and returns the list of effective
 * test. Get the effecttive test list through getTestList method.
 */
class TestList {
  constructor(tests, filter) {
    this.filter = filter;
    this.tests = tests;
  }

  /*
   * Get list of effective tests for a server of type serverType
   * server DNS name identifies the server
   * serverType can be Domain Controller or Domain Computer
   * returns a list of effective tests
   */
  getTestList(server, serverType) {
    let testList = [];
    let control;
    if (serverType === 'Domain Controller') {
      control = 'DomainController';
    } else if (serverType === 'Domain Computer') {
      control = 'MemberServer';
    } else {
      let msg = 'Error processing policy group - ' +
        group + ' for server type ' + serverType;
      logger.Error()?.Msg(msg);
      throw msg;
    }

    let testGroup = Object.keys(this.tests);
    testGroup.forEach(testBlock => {
      let testBlockList = [];
      if (typeof this.tests[testBlock]['Common'] != 'undefined') {
        testBlockList = testBlockList.concat(...this.tests[testBlock]['Common']);
      }
      if (typeof this.tests[testBlock][control] != 'undefined') {
        testBlockList = testBlockList.concat(...this.tests[testBlock][control]);
      }
      testBlockList = this.#applyFilter(server, testBlock, testBlockList);
      if (testBlockList.length > 0) {
        testList = testList.concat(...testBlockList);
      }
    });
    return testList;
  }

  /*
   * Private Method
   * Given a server and a test group, apply both filters
   * Return a list of effective tests for this server and test group.
   */
  #applyFilter(server, testBlock, testBlockList) {
    let testList = testBlockList;
    let serverFilter = this.filter.getServerFilter(server);

    if (typeof serverFilter === 'undefined') {
      return testList;
    }
    let includeFilter = serverFilter['filter']['include'];
    if (typeof includeFilter != 'undefined') {
      includeFilter = includeFilter[testBlock];
    }
    let excludeFilter = serverFilter['filter']['exclude'];
    if (typeof excludeFilter != 'undefined') {
      excludeFilter = excludeFilter[testBlock];
    }

    if ((typeof includeFilter != 'undefined') &&
      (typeof excludeFilter != 'undefined')) {
      let msg = 'Error processing filter for server ' + server +
        '. Only one of include/exclude filter can be applied.'
      logger.Error()?.Msg(msg);
      throw msg;
    }

    if (typeof includeFilter != 'undefined') {
      testList = includeFilter;
    }
    if (typeof excludeFilter != 'undefined') {
      excludeFilter.forEach(test => {
        let index = testList.findIndex(item =>
          item.toLowerCase() === test.toLowerCase(), test);
        if (index != -1) {
          testList.splice(index, 1);
          return;
        }
      });
    }
    logger.Info()?.Msg('Successfully processed filter for server - ' + server);
    return testList;
  }
}
