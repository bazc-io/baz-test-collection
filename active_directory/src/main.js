/**
 * Copyright 2023 Bazc
 *
 * main.js
 * Defines the entry point to the collection - setup()
 *
 * Author: Abhishek Prasad (dev@bazc.io)
 */

/*
 * This is the main entry function for the test collection.
 * The Baz framework invokes the setup function as the entry point.
 *
 * As part of the setup we
 * 1. Find the list of all domains
 * 2. For each domain, find list of all domain controllers and member servers.
 * 2. For each server, run the appropriate set of tests.
 */
function setup() {
  // Make sure the actor is intialized, else bail out.
  if (typeof win === 'undefined') {
    logger.Error()?.Msg('Error, actor \'win\' not intialized, hence skipping all tests in the collection.');
    baz.runTests([]);
    throw 'Error - win actor not loaded';
  }

  // Instantiate TestFilters, TestList, PolicyProcessor &
  // RSoPDefaultSettingsProcessor. The same instance is used
  // across all test across all servers of all domains.
  let testFilter = getFilter(win);
  let polProcessor = new PolicyProcessor(readDataFile('policy.toml'));
  let testObj = new TestList(readDataFile('tests.toml'), testFilter);
  let defSettingsProcessor = new RSoPDefaultSettingsProcessor();

  // Get the list of all domains from the actor
  let domainList = win.GetDomainList();

  // Check if Exchange is installed on the root domain
  // This info is used by tests to add additional
  // authorization on specific properties.
  let exchangeConfigured = isExchangeConfigured(win);

  // For each domain, get a list of domain controllers and member servers.
  domainList.forEach(domain => {
    let serverList = win.GetDCList(domain.dnsRoot[0]);
    // TODO: GetDCList/MSList should accept a list of dns names
    serverList = serverList.concat(...win.GetMSList(domain.dnsRoot[0]));

    let netBiosName = domain.netBIOSName;
    setFunctionParam([{
      'key': 'exchangeConfigured',
      'value': exchangeConfigured
    },
    {
      'key': 'netBiosName',
      'value': netBiosName
    }]);

    // For each server, get server properties  and set it as variable for tests.
    serverList.forEach(server => {
      let serverProperties = win.GetServerProperties(server);
      if (serverProperties === null) {
        logger.Error()?.Msg('Error reading server properties for server - '
          + server + '.');
        logger.Info()?.Msg('Skipping all tests on server - ' + server + '.');
        return
      }

      // Make server properties available to tests
      setFunctionParam([{
        'key': 'serverProperties',
        'value': serverProperties
      }]);

      if (isWorkstation(serverProperties)) {
        logger.Info()?.Msg('Skipping Workstation computer - ' + server + '.');
        return
      }

      // Set policy parameters for tests
      setPolicyParams(polProcessor, serverProperties.Attributes.type);

      // Get default RSoP Values from local data
      let defaultRSoP = defSettingsProcessor.getDefaulSettings(
        serverProperties.Attributes.type);

      // Get server RSoP by querying the server
      let serverRSoP = win.GetServerRSoP(server);

      // Create the efective RSoP values by merging the default
      // and actual values. Values that are not returned by the server
      // are filled from default values through merging json objects.
      let effectiveRSoP = butils.mergeJSON(serverRSoP, defaultRSoP);
      setRSoPParams(effectiveRSoP.RSoP);

      // Set the run name for reporting and console messages.
      if (isDomainController(serverProperties)) {
        baz.setParam("bazRunName", 'DomainController - ' + server);
      } else if (isMemberServer(serverProperties)) {
        baz.setParam("bazRunName", 'MemberServer - ' + server);
      }

      // Set the report fields
      // target - The target server on which the test was executed.
      // The domain of this server
      baz.setReport('target', server);
      baz.setReport('domain', domain.dnsRoot[0]);

      // Run the applicable test test for this server
      baz.runTests(testObj.getTestList(server,
        serverProperties.Attributes.type));
    });
  });
}

/*
 * Get an instance of filter object based on configuration in confparams of the * actor configuration file. The filter defintion is optional.
 * keyword filter_list - A list of user defined filter name.
 * For each filter, and the info to the instance of TestFilter class.
 */
function getFilter(actor) {
  let testFilter = new TestFilter();
  let filterList = actor.getConfParam('filter_list');

  if (typeof filterList != 'undefined') {
    filterList.forEach(filter => {
      let filterData = actor.getConfParam(filter);
      if (typeof filterData == 'undefined') {
        let msg = 'Error processing filter ' + filter + '. Filter data empty.';
        logger.Error()?.Msg(msg);
        throw msg;
      }
      testFilter.addServerGroupFilter(filterData['servers'],
        filterData['include'], filterData['exclude']);
    })
  }
  return testFilter;
}

/*
 * The function sets variables that are passed to tests by the framwork.
 * Each test group uses a fixed set of variables for policy e.g., Password
 * tests use the pwdPolicy variable as function param for getting the Password
 * specific policies. Each time a new setting group is added to the collection,
 * the new set of variables should be appended to the switch case structure.
 */
function setPolicyParams(polProcessor, serverType) {
  let policy = polProcessor.getAllPolicies(serverType);
  let paramsList = [];
  let paramGroups = Object.keys(policy);
  paramGroups.forEach(params => {
    let key;
    let value = policy[params];
    switch (params) {
      case 'Password':
        key = 'pwdPolicy';
        break;
      case 'AccountLockout':
        key = 'lockPolicy';
        break;
      case 'UserRightsAssignment':
        key = 'uraPolicy';
        break;
      case 'LocalAccount':
        key = 'accountsPolicy';
        break;
      case 'Audit':
        key = 'auditPolicy';
        break;
      case 'Devices':
        key = 'devicePolicy';
        break;
      case 'DomainController':
        key = 'dcPolicy';
        break;
      case 'DomainMember':
        key = 'dmPolicy';
        break;
      case 'InteractiveLogon':
        key = 'intPolicy';
        break;
      case 'NetworkClient':
        key = 'ncPolicy';
        break;
      case 'NetworkServer':
        key = 'nsPolicy';
        break;
      case 'NetworkAccess':
        key = 'naPolicy';
        break;
      default:
        logger.Debug()?.Msg('Unsupported policy settings group - ' + params);
        break;
    }
    if ((typeof key != 'undefined') && (typeof value != 'undefined')) {
      paramsList = paramsList.concat({ 'key': key, 'value': value });
    }
  });
  setFunctionParam(paramsList);
}

/*
 * The function sets variables that are passed to tests by the framwork.
 * Each test group uses a fixed set of variables for setting values e.g.,
 * Password tests use the password variable as function param for getting the
 * specific property values. Each time a new setting group is added to the
 * collection, the new set of variables should be appended to the switch
 * case structure.
 */
function setRSoPParams(effectiveRSoP) {
  let paramsList = [];
  let paramGroups = Object.keys(effectiveRSoP);
  paramGroups.forEach(params => {
    let key;
    let value = effectiveRSoP[params];
    switch (params) {
      case 'Password':
        key = 'password';
        break;
      case 'AccountLockout':
        key = 'accountLock';
        break;
      case 'UserRightsAssignment':
        key = 'userRightsAssignment';
        break;
      case 'LocalAccount':
        key = 'accounts';
        break;
      case 'Registry':
        key = 'registry';
        break;
      default:
        logger.Debug()?.Msg('Unsupported settings group value - ' + params);
        break;
    }
    if ((typeof key != 'undefined') && (typeof value != 'undefined')) {
      paramsList = paramsList.concat({ 'key': key, 'value': value });
    }
  });
  setFunctionParam(paramsList);
}
