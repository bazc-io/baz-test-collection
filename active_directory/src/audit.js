/**
 * Copyright 2023 Bazc
 *
 * audit.js
 * Defines tests for Audit Group Policies
 *
 * Author: Abhishek Prasad (dev@bazc.io)
 */

/**
 * @description Force audit policy subcategory settings
(Windows Vista or later) to override audit policy category settings
 * @severity Normal
 * @group Audit
 */
function testAuditBaseObjects(registry, auditPolicy) {
  let key = 'machine\\system\\currentcontrolset\\control\\lsa\\auditbaseobjects';
  verify(registry[key],
    "AuditBaseObjects not in accordance with policy").
    to.be.eql(auditPolicy[key].Control);
}

/**
 * @description Shut down system immediately if unable to
log security audits
 * @severity Normal
 * @group Audit
 */
function testCrashOnAuditFail(registry, auditPolicy) {
  let key = 'machine\\system\\currentcontrolset\\control\\lsa\\crashonauditfail';
  verify(registry[key],
    "CrashOnAuditFail not in accordance with policy").
    to.be.eql(auditPolicy[key].Control);
}
