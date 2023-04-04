/**
 * Copyright 2023 Bazc
 *
 * network_server.js
 * Defines tests for Network Server Group Policies
 *
 * Author: Abhishek Prasad (dev@bazc.io)
 */

/**
 * @description Amount of idle time required before suspending session (always)
 * @severity Normal
 * @group NetworkServer
 */
function testAutoDisconnect(registry, nsPolicy) {
  let key = 'machine\\system\\currentcontrolset\\services\\lanmanserver\\parameters\\autodisconnect';
  verify(registry[key],
    "AutoDisconnect not in accordance with policy").
    to.be.at.most(nsPolicy[key].Control);
}

/**
 * @description Digitally sign communications (always)
 * @severity Normal
 * @group NetworkServer
 */
function testNSRequireSecuritySignature(registry, nsPolicy) {
  // Added NS to the name due to a test name
  // collision with network client tests.
  let key = 'machine\\system\\currentcontrolset\\services\\lanmanserver\\parameters\\requiresecuritysignature';
  verify(registry[key],
    "RequireSecuritySignature(NS) not in accordance with policy").
    to.be.eql(nsPolicy[key].Control);
}

/**
 * @description Digitally sign communications (if client agrees)
 * @severity Normal
 * @group NetworkServer
 */
function testNSEnableSecuritySignature(registry, nsPolicy) {
  let key = 'machine\\system\\currentcontrolset\\services\\lanmanserver\\parameters\\enablesecuritysignature';
  verify(registry[key],
    "EnableSecuritySignature(NS) not in accordance with policy").
    to.be.eql(nsPolicy[key].Control);
}

/**
 * @description Disconnect clients when logon hours expire
 * @severity Normal
 * @group NetworkServer
 */
function testNSEnableForcedLogoff(registry, nsPolicy) {
  let key = 'machine\\system\\currentcontrolset\\services\\lanmanserver\\parameters\\enableforcedlogoff';
  verify(registry[key],
    "EnableForcedLogoff(NS) not in accordance with policy").
    to.be.eql(nsPolicy[key].Control);
}

/**
 * @description Server SPN target name validation level
 * @severity Normal
 * @group NetworkServer
 */
function testSMBServerNameHardeningLevel(registry, nsPolicy) {
  // MS only
  let key = 'machine\\system\\currentcontrolset\\services\\lanmanserver\\parameters\\smbservernamehardeninglevel';
  verify(registry[key],
    "SMBServerNameHardeningLevel not in accordance with policy").
    to.have.any.keys(nsPolicy[key].Control);
}
