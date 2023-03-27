/**
 * Copyright 2023 Bazc
 *
 * dc.js
 * Defines tests for Domian Cotroller Group Policies
 *
 * Author: Abhishek Prasad (dev@bazc.io)
 */

// All tests here are specifically for domain controlles.

/**
 * @description Allow server operators to schedule tasks
 * @severity Normal
 * @group DomainCotroller
 */
function testSubmitControl(registry, dcPolicy) {
  let key = 'machine\\system\\currentcontrolset\\control\\lsa\\submitcontrol';
  verify(registry[key],
    "SubmitControl not in accordance with policy").
    to.be.eql(dcPolicy[key].Control);
}

/**
 * @description Allow vulnerable Netlogon secure channel connections
 * @severity Normal
 * @group DomainCotroller
 */
function testVulnerableChannelAllowList(registry, dcPolicy) {
  let key = 'machine\\system\\currentcontrolset\\services\\netlogon\\parameters\\vulnerablechannelallowlist';
  verify(registry[key],
    "VulnerableChannelAllowList not in accordance with policy").
    to.be.eql(dcPolicy[key].Control);
}

/**
 * @description  LDAP server channel binding token requirements
 * @severity Normal
 * @group DomainCotroller
 */
function testLdapEnforceChannelBinding(registry, dcPolicy) {
  let key = 'machine\\system\\currentcontrolset\\services\\ntds\\parameters\\ldapenforcechannelbinding';
  verify(registry[key],
    "LdapEnforceChannelBinding not in accordance with policy").
    to.be.eql(dcPolicy[key].Control);
}

/**
 * @description  LDAP server signing requirements
 * @severity Normal
 * @group DomainCotroller
 */
function testLDAPServerIntegrity(registry, dcPolicy) {
  let key = 'machine\\system\\currentcontrolset\\services\\ntds\\parameters\\ldapserverintegrity';
  verify(registry[key],
    "LDAPServerIntegrity not in accordance with policy").
    to.be.eql(dcPolicy[key].Control);
}

/**
 * @description  Refuse machine account password changes
 * @severity Normal
 * @group DomainCotroller
 */
function testRefusePasswordChange(registry, dcPolicy) {
  let key = 'machine\\system\\currentcontrolset\\services\\netlogon\\parameters\\refusepasswordchange';
  verify(registry[key],
    "RefusePasswordChange not in accordance with policy").
    to.be.eql(dcPolicy[key].Control);
}


