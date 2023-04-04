/**
 * Copyright 2023 Bazc
 *
 * interactive.js
 * Defines tests for Interactive Group Policies
 *
 * Author: Abhishek Prasad (dev@bazc.io)
 */

/**
 * @description Do not require CTRL+ALT+DEL
 * @severity Normal
 * @group InteractiveLogon
 */
function testDisableCAD(registry, intPolicy) {
  let key = 'machine\\software\\microsoft\\windows\\currentversion\\policies\\system\\disablecad';
  verify(registry[key],
    "DisableCAD not in accordance with policy").
    to.be.eql(intPolicy[key].Control);
}

/**
 * @description Don't display last signed-in
 * @severity Normal
 * @group InteractiveLogon
 */
function testDontDisplayLastUsername(registry, intPolicy) {
  let key = 'machine\\software\\microsoft\\windows\\currentversion\\policies\\system\\dontdisplaylastusername';
  verify(registry[key],
    "DontDisplayLastUsername not in accordance with policy").
    to.be.eql(intPolicy[key].Control);
}

/**
 * @description Machine inactivity limit
 * @severity Normal
 * @group InteractiveLogon
 */
function testInactivityTimeoutSecs(registry, intPolicy) {
  const inactiveCheckDisabled = 0;
  let key = 'machine\\software\\microsoft\\windows\\currentversion\\policies\\system\\inactivitytimeoutsecs';
  verify(registry[key],
    "InactivityTimeoutSecs not in accordance with policy").
    to.not.equal(inactiveCheckDisabled);
  verify(registry[key],
    "InactivityTimeoutSecs not in accordance with policy").
    to.be.at.most(intPolicy[key].Control);
}

/**
 * @description Message text for users attempting to log on
 * @severity Normal
 * @group InteractiveLogon
 */
function testLegalNoticeText(registry, intPolicy) {
  let key = 'machine\\software\\microsoft\\windows\\currentversion\\policies\\system\\legalnoticetext';
  verify(registry[key],
    "LegalNoticeText not in accordance with policy").
    to.have.deep.include.members(intPolicy[key].Control);
}

/**
 * @description Message title for users attempting to log on
 * @severity Normal
 * @group InteractiveLogon
 */
function testLegalNoticeCaption(registry, intPolicy) {
  let key = 'machine\\software\\microsoft\\windows\\currentversion\\policies\\system\\legalnoticecaption';
  verify(registry[key],
    "LegalNoticeCaption not in accordance with policy").
    to.be.eql(intPolicy[key].Control);
}

/**
 * @description Number of previous logons to cache (in case domain controller is not available)
 * @severity Normal
 * @group InteractiveLogon
 */
function testCachedLogonsCount(registry, intPolicy) {
  // Level 2 profile
  // MS only
  let key = 'machine\\software\\microsoft\\windows nt\\currentversion\\winlogon\\cachedlogonscount';
  verify(registry[key],
    "CachedLogonsCount not in accordance with policy").
    to.be.at.most(intPolicy[key].Control);
}

/**
 * @description Prompt user to change password before expiration
 * @severity Normal
 * @group InteractiveLogon
 */
function testPasswordExpiryWarning(registry, intPolicy) {
  let key = 'machine\\software\\microsoft\\windows nt\\currentversion\\winlogon\\passwordexpirywarning';
  verify(registry[key],
    "PasswordExpiryWarning not in accordance with policy").
    to.be.within(intPolicy[key].Control.LowLimit, intPolicy[key].Control.HighLimit);
}

/**
 * @description Require Domain Controller Authentication to unlock workstation
 * @severity Normal
 * @group InteractiveLogon
 */
function testForceUnlockLogon(registry, intPolicy) {
  // MS only
  let key = 'machine\\software\\microsoft\\windows nt\\currentversion\\winlogon\\forceunlocklogon';
  verify(registry[key],
    "ForceUnlockLogon not in accordance with policy").
    to.be.eql(intPolicy[key].Control);
}

/**
 * @description Smart card removal behavior
 * @severity Normal
 * @group InteractiveLogon
 */
function testSCRemoveOption(registry, intPolicy) {
  let key = 'machine\\software\\microsoft\\windows nt\\currentversion\\winlogon\\scremoveoption';
  verify(intPolicy[key].Control,
    "SCRemoveOption not in accordance with policy").
    to.have.any.keys(registry[key]);
}
