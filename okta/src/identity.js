/**
 * Copyright 2023 Bazc
 *
 * identity.js
 * Defines identity tests for Okta Identity Service
 *
 * Author: Abhishek Prasad (dev@bazc.io)
 */

/**
 * @description No active dormant accounts where last
 * login is older than policy
 * @severity High
 */
function testDormantAccounts() {
  // The number of days before an account is considered dormant
  // Defaults to 45 days if not defined by policy
  const dormant = 45;

  // Get the policy from actor cofig
  let dormantPolicy = getPropertyWithDefault('identity',
    'dormant_days', dormant);

  // Get the list of all active users from Okta
  let activeUsers = actor.ListUsers('status eq "ACTIVE"');

  let now = new Date();

  // For each active user, check if the last login is greater than the policy
  // Use activation date for users that have never logged into Okta.
  activeUsers.forEach(user => {
    let lastLogin = user.lastLogin;
    if (user.lastLogin === null) {
      logger.Warn()?.Msg('Last login null for user - ' +
        user.profile.email);

      logger.Debug()?.Msg('Using account activation date/time for ' +
        user.profile.email + ' as the last login time');
      lastLogin = user.activated;
    }

    let daysSinceLastLogin = Math.round(
      (now - new Date(lastLogin)) /
      (1000 * 60 * 60 * 24)
    );

    let errMsg = "Last login for user (" +
      user.profile.email + ') - ' + daysSinceLastLogin +
      ' days, older than allowed by policy';

    verify(daysSinceLastLogin, errMsg).to.be.at.most(dormantPolicy);
  });
}
