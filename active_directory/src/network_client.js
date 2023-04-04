/**
 * Copyright 2023 Bazc
 *
 * network_client.js
 * Defines tests for Network Client Group Policies
 *
 * Author: Abhishek Prasad (dev@bazc.io)
 */

/**
 * @description Digitally sign communications (always)
 * @severity Normal
 * @group NetworkCLient
 */
function testRequireSecuritySignature(registry, ncPolicy) {
  let key = 'machine\\system\\currentcontrolset\\services\\lanmanworkstation\\parameters\\requiresecuritysignature';
  verify(registry[key],
    "RequireSecuritySignature not in accordance with policy").
    to.be.eql(ncPolicy[key].Control);
}

/**
 * @description Digitally sign communications (if server agrees)
 * @severity Normal
 * @group NetworkCLient
 */
function testEnableSecuritySignature(registry, ncPolicy) {
  let key = 'machine\\system\\currentcontrolset\\services\\lanmanworkstation\\parameters\\enablesecuritysignature';
  verify(registry[key],
    "EnableSecuritySignature not in accordance with policy").
    to.be.eql(ncPolicy[key].Control);
}

/**
 * @description Send unencrypted password to third-party SMB servers
 * @severity Normal
 * @group NetworkCLient
 */
function testEnablePlainTextPassword(registry, ncPolicy) {
  let key = 'machine\\system\\currentcontrolset\\services\\lanmanworkstation\\parameters\\enableplaintextpassword';
  verify(registry[key],
    "EnablePlainTextPassword not in accordance with policy").
    to.be.eql(ncPolicy[key].Control);
}
