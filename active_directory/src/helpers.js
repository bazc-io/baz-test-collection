/**
 * Copyright 2023 Bazc
 *
 * helpers.js
 * Defines helper functions used by this collection
 *
 * Author: Abhishek Prasad (dev@bazc.io)
 */

/*
 * type is set to Domain Controller got DCs
 */
function isDomainController(serverProperties) {
  if (serverProperties.Attributes.type === 'Domain Controller') {
    return true;
  }
  return false;
}

/*
 * Member servers and Worstations have type set as Domain Computer.
 * The installed OS defines if the machine is a client(Windows 10, 11)
 * or a server - Windows 2019, 2022
 */
function isMemberServer(serverProperties) {
  if ((serverProperties.Attributes.type === 'Domain Computer') &&
    (typeof serverProperties.Attributes.OS != 'undefined') &&
    (serverProperties.Attributes.OS.Type != 'Client')) {
    return true;
  }
  return false;
}

/*
 * The installed OS defines if the machine is a client(Windows 10, 11)
 */
function isWorkstation(serverProperties) {
  if ((typeof serverProperties.Attributes.OS != 'undefined') &&
    (serverProperties.Attributes.OS.Type === 'Client')) {
    return true;
  }
  return false;
}

/*
 * The server role property is a list of installed roles and
 * software on the server.
 */
function isRoleInstalled(serverProperties, role) {
  if (serverProperties.Attributes.roles.includes(role)) {
    return true;
  }
  return false;
}

/*
 * The test collection's data folder contains data files
*  like policy and tests. These are in TOML format.
 * TODO: Make the path configurable through a parameter
 */
function readDataFile(fileName) {
  return butils.readTOML(baz.getTestPath() + '/data/' + fileName);
}

/*
 * Check if Exchange server is installed in the domain
 * If Exchange is installed, msExchExchangeServer objects
 * get added to the domain.
 * Get root domain, then read the rootDSE to get the schema naming context.
 * Read schema to see if the class is supported and then test if a object of * * the class is present.
 */
function isExchangeConfigured(actor) {
  let rootDomain = actor.GetRootDomain();
  if (Object.keys(rootDomain).length == 0) {
    throw 'Error fetching root domain';
  }
  let rootDSE = actor.GetObjList(rootDomain[0].attributes.dnsRoot[0]);
  let schema = actor.GetObjList(rootDomain[0].attributes.dnsRoot[0],
    rootDSE[0].attributes.schemaNamingContext[0], '(objectClass=classSchema)',
    'sub', ['lDAPDisplayName']);
  schema.filter(entry => entry.attributes.lDAPDisplayName === 'msExchExchangeServer').forEach(_ => {
    let exchangeObj = actor.GetObjList(rootDomain[0].attributes.dnsRoot[0],
      rootDomain[0].attributes.nCName,
      '(&(objectClass=msExchExchangeServer)(!(objectClass=msExchClientAccessArray)))',
      'sub');
    if (Object.keys(exchangeObj).length > 0) {
      return true;
    }
  })
  return false;
}

/*
 * Iteratively remove items present in the optional list from the property lis. * Ignore if the item is not present.
 *
 */
function stripOptionals(propertyList, optionalList) {
  let pList = propertyList;
  if (typeof optionalList === 'undefined') {
    return pList;
  }
  optionalList.forEach(optional => {
    let index = pList.findIndex(element =>
      element.toLowerCase() === optional.toLowerCase()
      , optional);
    if (index != -1) {
      pList.splice(index, 1);
    }
  });
  return pList;
}

/*
 * Set variables through the framwork. These variables are set appropriately
 * as funtion parameters of tests.The paramList contains a list of dictionaries
 * with key set to the name of the variable and value set to the actual value.
 */
function setFunctionParam(paramList) {
  paramList.forEach(param => {
    baz.setParam(param.key, param.value);
  })
}