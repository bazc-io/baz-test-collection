/**
 * Copyright 2023 Bazc
 *
 * password.js
 * Defines tests for Password Group Policies
 *
 * Author: Abhishek Prasad (dev@bazc.io)
 */

/**
 * @description Enforce password history
 * @severity Normal
 * @group Password
 */
function testPasswordHistorySize(password, pwdPolicy) {
  verify(password.PasswordHistorySize,
    "PasswordHistorySize not in accordance with policy").
    to.be.at.least(pwdPolicy.PasswordHistorySize.Control);
}

/**
 * @description Maximum password age
 * @severity Normal
 * @group Password
 */
function testMaximumPasswordAge(password, pwdPolicy) {
  const PWD_NEVER_EXPIRE = 0;
  verify(password.MaximumPasswordAge,
    "MaximumPasswordAge not in accordance with policy").
    to.not.equal(PWD_NEVER_EXPIRE);
  verify(password.MaximumPasswordAge,
    "MaximumPasswordAge not in accordance with policy").
    to.be.at.most(pwdPolicy.MaximumPasswordAge.Control);
}

/**
 * @description Minimum password age
 * @severity Normal
 * @group Password
 */
function testMinimumPasswordAge(password, pwdPolicy) {
  verify(password.MinimumPasswordAge,
    'MinimumPasswordAge not in accordance with policy').
    to.be.at.least(pwdPolicy.MinimumPasswordAge.Control);
}

/**
 * @description Minimum password length
 * @severity Normal
 * @group Password
 */
function testMinimumPasswordLength(password, pwdPolicy) {
  verify(password.MinimumPasswordLength,
    "MinimumPasswordLength not in accordance with policy").
    to.be.at.least(pwdPolicy.MinimumPasswordLength.Control);
}

/**
 * @description Password must meet complexity requirements
 * @severity Normal
 * @group Password
 */
function testPasswordComplexity(password, pwdPolicy) {
  verify(password.PasswordComplexity,
    "PasswordComplexity not in accordance with policy").
    to.be.eql(pwdPolicy.PasswordComplexity.Control);
}

/**
 * @description Relax minimum password length limits
 * @severity Normal
 * @group Password
 */
function testRelaxMinimumPasswordLengthLimits(password, pwdPolicy) {
  // MS only
  verify(password.RelaxMinimumPasswordLengthLimits,
    "RelaxMinimumPasswordLengthLimits not in accordance with policy").
    to.be.eql(pwdPolicy.RelaxMinimumPasswordLengthLimits.Control);
}

/**
 * @description Store passwords using reversible encryption
 * @severity Normal
 * @group Password
 */
function testClearTextPassword(password, pwdPolicy) {
  verify(password.ClearTextPassword,
    "ClearTextPassword not in accordance with policy").
    to.be.eql(pwdPolicy.ClearTextPassword.Control);
}
