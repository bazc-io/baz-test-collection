/**
 * Copyright 2023 Bazc
 *
 * network_access.js
 * Defines tests for Network Access Group Policies
 *
 * Author: Abhishek Prasad (dev@bazc.io)
 */

/**
 * @description Allow anonymous SID/Name translation
 * @severity Normal
 * @group NetworkAccess
 */
function testLSAAnonymousNameLookup(accounts, accountsPolicy) {
  verify(accounts.LSAAnonymousNameLookup,
    "LSAAnonymousNameLookup not in accordance with policy").
    to.be.eql(accountsPolicy.LSAAnonymousNameLookup.Control);
}

/**
 * @description Do not allow anonymous enumeration of SAM accounts
 * @severity Normal
 * @group NetworAccess
 */
function testRestrictAnonymousSAM(registry, naPolicy) {
  // MS only
  let key = 'machine\\system\\currentcontrolset\\control\\lsa\\restrictanonymoussam';
  verify(registry[key],
    "RestrictAnonymousSAM not in accordance with policy").
    to.be.eql(naPolicy[key].Control);
}

/**
 * @description Do not allow anonymous enumeration of SAM accounts and shares
 * @severity Normal
 * @group NetworAccess
 */
function testRestrictAnonymous(registry, naPolicy) {
  // MS only
  let key = 'machine\\system\\currentcontrolset\\control\\lsa\\restrictanonymous';
  verify(registry[key],
    "RestrictAnonymous not in accordance with policy").
    to.be.eql(naPolicy[key].Control);
}

/**
 * @description Do not allow storage of passwords and credentials for network authentication
 * @severity Normal
 * @group NetworAccess
 */
function testDisableDomainCreds(registry, naPolicy) {
  let key = 'machine\\system\\currentcontrolset\\control\\lsa\\disabledomaincreds';
  verify(registry[key],
    "DisableDomainCreds not in accordance with policy").
    to.be.eql(naPolicy[key].Control);
}

/**
 * @description Do not allow storage of passwords and credentials for network authentication
 * @severity Normal
 * @group NetworAccess
 */
function testEveryoneIncludesAnonymous(registry, naPolicy) {
  let key = 'machine\\system\\currentcontrolset\\control\\lsa\\everyoneincludesanonymous';
  verify(registry[key],
    "EveryoneIncludesAnonymous not in accordance with policy").
    to.be.eql(naPolicy[key].Control);
}

/**
 * @description Named Pipes that can be accessed anonymously
 * @severity Normal
 * @group NetworAccess
 */
function testNullSessionPipes(registry, naPolicy,
  serverProperties, polProcessor) {
  let key = 'machine\\system\\currentcontrolset\\services\\lanmanserver\\parameters\\nullsessionpipes';
  let naPolicyEx = naPolicy[key].Control;

  if (isMemberServer(serverProperties)) {
    if (isRoleInstalled(serverProperties, 'Remote-Desktop-Services') &&
      isRoleInstalled(serverProperties, 'RDS-Licensing')) {
      let roleKey = 'NetworkAccess.' + key + '.MemberServer.Roles';
      naPolicyEx = naPolicyEx.concat(...polProcessor.
        getPropertyWithDefault(roleKey, 'RDS-RDS-Licensing'));
    }
  }
  verify(naPolicyEx,
    "NullSessionPipes not in accordance with policy").
    to.have.deep.include.members(registry[key]);
}

/**
 * @description Remotely accessible registry paths
 * @severity Normal
 * @group NetworAccess
 */
function testAllowedExactPaths(registry, naPolicy) {
  let key = 'machine\\system\\currentcontrolset\\control\\securepipeservers\\winreg\\allowedexactpaths\\machine';
  verify(registry[key],
    "AllowedExactPaths not in accordance with policy").
    to.have.deep.include.members(naPolicy[key].Control);
}

/**
 * @description Remotely accessible registry paths and sub-paths
 * @severity Normal
 * @group NetworAccess
 */
function testAllowedPaths(registry, naPolicy,
  serverProperties, polProcessor) {
  let key = 'machine\\system\\currentcontrolset\\control\\securepipeservers\\winreg\\allowedpaths\\machine';
  let naPolicyEx = naPolicy[key].Control;

  if (isRoleInstalled(serverProperties, 'AD-Certificate') &&
    (isRoleInstalled(serverProperties, 'ADCS-Cert-Authority'))) {
    let roleKey = 'NetworkAccess.' + key + '.Common.Roles';
    naPolicyEx = naPolicyEx.concat(...polProcessor.
      getPropertyWithDefault(roleKey, 'AD-ADCS-Cert-Authority'));
  }

  verify(naPolicyEx,
    "AllowedPaths not in accordance with policy").
    to.have.deep.include.members(registry[key]);
}

/**
 * @description Restrict anonymous access to Named Pipes and Shares
 * @severity Normal
 * @group NetworAccess
 */
function testRestrictNullSessAccess(registry, naPolicy) {
  let key = 'machine\\system\\currentcontrolset\\services\\lanmanserver\\parameters\\restrictnullsessaccess';
  verify(registry[key],
    "RestrictNullSessAccess not in accordance with policy").
    to.be.eql(naPolicy[key].Control);
}

/**
 * @description Restrict clients allowed to make remote calls to SAM
 * @severity Normal
 * @group NetworAccess
 */
function testRestrictRemoteSAM(registry, naPolicy) {
  // MS Only
  let key = 'machine\\system\\currentcontrolset\\control\\lsa\\restrictremotesam';
  verify(registry[key],
    "RestrictRemoteSAM not in accordance with policy").
    to.be.eql(naPolicy[key].Control);
}

/**
 * @description Shares that can be accessed anonymously
 * @severity Normal
 * @group NetworAccess
 */
function testNullSessionShares(registry, naPolicy) {
  let key = 'machine\\system\\currentcontrolset\\services\\lanmanserver\\parameters\\nullsessionshares';
  verify(registry[key],
    "NullSessionShares not in accordance with policy").
    to.be.eql(naPolicy[key].Control);
}

/**
 * @description Sharing and security model for local accounts
 * @severity Normal
 * @group NetworAccess
 */
function testForceGuest(registry, naPolicy) {
  let key = 'machine\\system\\currentcontrolset\\control\\lsa\\forceguest';
  verify(registry[key],
    "ForceGuest not in accordance with policy").
    to.be.eql(naPolicy[key].Control);
}
