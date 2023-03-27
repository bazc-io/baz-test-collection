/**
 * Copyright 2023 Bazc
 *
 * member.js
 * Defines tests for Domain Member Group Policies
 *
 * Author: Abhishek Prasad (dev@bazc.io)
 */

/**
 * @description Digitally encrypt or sign secure channel data (always)
 * @severity Normal
 * @group DomainMember
 */
function testRequireSignorSeal(registry, dmPolicy) {
  let key = 'machine\\system\\currentcontrolset\\services\\netlogon\\parameters\\requiresignorseal';
  verify(registry[key],
    "testRequireSignorSeal not in accordance with policy").
    to.be.eql(dmPolicy[key].Control);
}

/**
 * @description Digitally encrypt secure channel data (when possible)
 * @severity Normal
 * @group DomainMember
 */
function testSealSecureChannel(registry, dmPolicy) {
  let key = 'machine\\system\\currentcontrolset\\services\\netlogon\\parameters\\sealsecurechannel';
  verify(registry[key],
    "SealSecureChannel not in accordance with policy").
    to.be.eql(dmPolicy[key].Control);
}

/**
 * @description Digitally sign secure channel data (when possible)
 * @severity Normal
 * @group DomainMember
 */
function testSignSecureChannel(registry, dmPolicy) {
  let key = 'machine\\system\\currentcontrolset\\services\\netlogon\\parameters\\signsecurechannel';
  verify(registry[key],
    "SignSecureChannel not in accordance with policy").
    to.be.eql(dmPolicy[key].Control);
}

/**
 * @description Disable machine account password changes
 * @severity Normal
 * @group DomainMember
 */
function testDisablePasswordChange(registry, dmPolicy) {
  let key = 'machine\\system\\currentcontrolset\\services\\netlogon\\parameters\\disablepasswordchange';
  verify(registry[key],
    "DisablePasswordChange not in accordance with policy").
    to.be.eql(dmPolicy[key].Control);
}

/**
 * @description Maximum machine account password age
 * @severity Normal
 * @group DomainMember
 */
function testMachineMaximumPasswordAge(registry, dmPolicy) {
  // Added Machine to function name due to name collision
  //  with Password Policy test case. The actual setting is
  // maximumpasswordage.
  let key = 'machine\\system\\currentcontrolset\\services\\netlogon\\parameters\\maximumpasswordage';
  const PWD_NEVER_EXPIRE = 0;

  verify(registry[key],
    "MachineMaximumPasswordAge not in accordance with policy").
    to.not.equal(PWD_NEVER_EXPIRE);

  verify(registry[key],
    "MachineMaximumPasswordAge not in accordance with policy").
    to.be.at.most(dmPolicy[key].Control);
}

/**
 * @description Require strong (Windows 2000 or later) session key
 * @severity Normal
 * @group DomainMember
 */
function testRequireStrongKey(registry, dmPolicy) {
  let key = 'machine\\system\\currentcontrolset\\services\\netlogon\\parameters\\requirestrongkey';
  verify(registry[key],
    "RequireStrongKey not in accordance with policy").
    to.be.eql(dmPolicy[key].Control);
}
