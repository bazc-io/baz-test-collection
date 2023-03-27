/**
 * Copyright 2023 Bazc
 *
 * account_lock.js
 * Defines tests for Account Lockout Group Policies
 *
 * Author: Abhishek Prasad (dev@bazc.io)
 */

/**
 * @description Account lockout duration
 * @severity Normal
 * @group AccountLockout
 */
function testLockoutDuration(accountLock, lockPolicy) {
  verify(accountLock.LockoutDuration,
    "LockoutDuration not in accordance with policy").
    to.be.at.least(lockPolicy.LockoutDuration.Control);
}

/**
 * @description Account lockout threshold
 * @severity Normal
 * @group AccountLockout
 */
function testLockoutBadCount(accountLock, lockPolicy) {
  const ACCOUNT_THRESHOLD_DISABLED = 0;
  verify(accountLock.LockoutBadCount,
    "LockoutBadCount not in accordance with policy").
    to.not.equal(ACCOUNT_THRESHOLD_DISABLED);
  verify(accountLock.LockoutBadCount,
    "LockoutBadCount not in accordance with policy").
    to.be.at.most(lockPolicy.LockoutBadCount.Control);
}

/**
 * @description Reset account lockout counter after
 * @severity Normal
 * @group AccountLockout
 */
function testResetLockoutCount(accountLock, lockPolicy) {
  verify(accountLock.ResetLockoutCount,
    "ResetLockoutCount not in accordance with policy").
    to.be.at.least(lockPolicy.ResetLockoutCount.Control);
}
