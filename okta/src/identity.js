/**
 * Copyright 2023 Bazc
 *
 * identity.js
 * Defines identity tests for Okta Identity Service
 *
 * Author: Abhishek Prasad (dev@bazc.io)
 */

/**
 * @description Verify that there are no active dormant accounts
 * @severity High
 */
function testDormantAccount() {
  // The number of days before an account is considered dormant
  // Defaults to 45 days if not defined by policy in actor config
  let dormantPolicy = 45;

  // Get the policy from actor cofig
  let userDormantPolciy = okta_stage.getConfParam('identity');
  if ((typeof userDormantPolciy != 'undefined') &&
    (userDormantPolciy.dormant_days)) {
    dormantPolicy = userDormantPolciy.dormant_days;
  }

  // Get the list of all active users from Okta
  let activeUsers = okta_stage.ListUsers('status eq "ACTIVE"');

  let nowSeconds = new Date().getTime() / 1000;

  // For each active user check if the last login is greater than the policy
  // Warn for users that have never logged into Okta.
  activeUsers.forEach(user => {
    if (user.lastLogin === null) {
      logger.Warn()?.Msg('Last login null for user - ' + user.profile.email);
      return;
    }
    let daysSinceLastLogin = ((nowSeconds -
      new Date(user.lastLogin).getTime() / 1000) /
      (60 * 60 * 24));

    verify(daysSinceLastLogin, "Last login for user - " +
      user.profile.email + ' older than allowed by policy.').
      to.be.at.most(dormantPolicy);
  });
}