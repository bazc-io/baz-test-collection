/**
 * Copyright 2023 Bazc
 *
 * accounts.js
 * Defines tests for Local Account Group Policies
 *
 * Author: Abhishek Prasad (dev@bazc.io)
 */

/**
 * @description Administrator account status
 * @severity Normal
 * @group LocalAccount
 */
function testEnableAdminAccount(accounts, accountsPolicy) {
  // MS only
  verify(accounts.EnableAdminAccount,
    'EnableAdminAccount not in accordance with policy').to.eql(accountsPolicy.EnableAdminAccount.Control);
}

/**
 * @description Block Microsoft accounts
 * @severity Normal
 * @group LocalAccount
 */
function testNoConnectedUser(registry, accountsPolicy) {
  let key = 'machine\\software\\microsoft\\windows\\currentversion\\policies\\system\\noconnecteduser';
  verify(registry[key], 'NoConnectedUser not in accordance with policy').
    to.eql(accountsPolicy[key].Control);
}

/**
 * @description Guest account status
 * @severity Normal
 * @group LocalAccount
 */
function testEnableGuestAccount(accounts, accountsPolicy) {
  // MS only
  verify(accounts.EnableGuestAccount,
    'EnableGuestAccount not in accordance with policy').
    to.eql(accountsPolicy.EnableGuestAccount.Control);
}

/**
 * @description Limit local account use of blank
passwords to console logon only
 * @severity Normal
 * @group LocalAccount
 */
function testLimitblankpassworduse(registry, accountsPolicy) {
  let key = 'machine\\system\\currentcontrolset\\control\\lsa\\limitblankpassworduse';
  verify(registry[key],
    'Limitblankpassworduse not in accordance with policy').
    to.eql(accountsPolicy[key].Control);
}

/**
 * @description  Rename administrator account
 * @severity Normal
 * @group LocalAccount
 */
function testNewAdministratorName(accounts, accountsPolicy) {
  verify(accounts.NewAdministratorName,
    'NewAdministratorName not in accordance with policy').
    to.not.eql(accountsPolicy.NewAdministratorName.Control);
}

/**
 * @description  Rename guest account
 * @severity Normal
 * @group LocalAccount
 */
function testNewGuestName(accounts, accountsPolicy) {
  verify(accounts.NewGuestName,
    'NewGuestName not in accordance with policy').
    to.not.eql(accountsPolicy.NewGuestName.Control);
}
