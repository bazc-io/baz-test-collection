/**
 * Copyright 2023 Bazc
 *
 * user_rights.js
 * Defines tests for User Rights Assignment Group Policies
 *
 * Author: Abhishek Prasad (dev@bazc.io)
 */

/**
 * @description Access Credential Manager as a trusted caller
 * @severity Normal
 * @group UserRightsAssignment
 */
function testTrustedCredManAccessPrivilege(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeTrustedCredManAccessPrivilege.Control,
    "SeTrustedCredManAccessPrivilege not in accordance with policy").
    to.have.deep.include.members(userRightsAssignment.SeTrustedCredManAccessPrivilege);
}

/**
 * @description Access this computer from the network
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeNetworkLogonRight(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeNetworkLogonRight.Control,
    "SeNetworkLogonRight not in accordance with policy").
    to.have.deep.include.members(userRightsAssignment.SeNetworkLogonRight);
}

/**
 * @description Act as part of the operating system
 * @severity Sensitive
 * @group UserRightsAssignment
 */
function testSeTcbPrivilege(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeTcbPrivilege.Control,
    "SeTcbPrivilege not in accordance with policy").
    to.have.deep.include.members(userRightsAssignment.SeTcbPrivilege);
}

/**
 * @description Add workstations to domain
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeMachineAccountPrivilege(userRightsAssignment, uraPolicy) {
  // DC only
  verify(uraPolicy.SeMachineAccountPrivilege.Control,
    "SeMachineAccountPrivilege not in accordance with policy").
    to.have.deep.include.members(userRightsAssignment.SeMachineAccountPrivilege);
}

/**
 * @description Adjust memory quotas for a process
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeIncreaseQuotaPrivilege(userRightsAssignment,
  uraPolicy, serverProperties, polProcessor) {
  let uraPolicyEx = uraPolicy.SeIncreaseQuotaPrivilege.Control;
  if (isMemberServer(serverProperties)) {
    let roleKey = 'UserRightsAssignment.SeIncreaseQuotaPrivilege.MemberServer.Roles';

    if (isRoleInstalled(serverProperties, 'Web-Server') &&
      isRoleInstalled(serverProperties, 'Web-WebServer')) {
      uraPolicyEx = uraPolicyEx.concat(...polProcessor.
        getPropertyWithDefault(roleKey, 'Web-Server-WSRole'));
    }
    if (isRoleInstalled(serverProperties, 'MS-SQL')) {
      uraPolicyEx = uraPolicyEx.concat(...polProcessor.
        getPropertyWithDefault(roleKey, 'MS-SQL'));
    }
  }
  verify(uraPolicyEx, "SeIncreaseQuotaPrivilege not in accordance with policy").
    to.have.deep.include.members(userRightsAssignment.SeIncreaseQuotaPrivilege);
}

/**
 * @description Allow log on locally
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeInteractiveLogonRight(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeInteractiveLogonRight.Control,
    "SeInteractiveLogonRight not in accordance with policy").
    to.have.deep.include.members(userRightsAssignment.SeInteractiveLogonRight);
}

/**
 * @description Allow log on through Remote Desktop Services
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeRemoteInteractiveLogonRight(userRightsAssignment,
  uraPolicy, serverProperties, polProcessor) {
  let uraPolicyEx = uraPolicy.SeRemoteInteractiveLogonRight.Control;
  if (isMemberServer(serverProperties)) {
    let roleKey = 'UserRightsAssignment.SeRemoteInteractiveLogonRight.MemberServer.Roles';

    if (isRoleInstalled(serverProperties, 'Remote-Desktop-Services') &&
      isRoleInstalled(serverProperties, 'RDS-Connection-Broker')) {
      uraPolicyEx = uraPolicyEx.concat(...polProcessor.
        getPropertyWithDefault(roleKey, 'RDS-RDSCB'));
    }
  }
  verify(uraPolicy.SeRemoteInteractiveLogonRight.Control,
    "SeRemoteInteractiveLogonRight not in accordance with policy").
    to.have.deep.include.members(userRightsAssignment.SeRemoteInteractiveLogonRight);
}

/**
 * @description Back up files and directories
 * @severity Sensitive
 * @group UserRightsAssignment
 */
function testSeBackupPrivilege(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeBackupPrivilege.Control,
    "SeBackupPrivilege not in accordance with policy").
    to.have.deep.include.members(userRightsAssignment.SeBackupPrivilege);
}

/**
 * @description Change the system time
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeSystemtimePrivilege(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeSystemtimePrivilege.Control,
    "SeSystemtimePrivilege not in accordance with policy").
    to.have.deep.include.members(userRightsAssignment.SeSystemtimePrivilege);
}

/**
 * @description Change the time zone
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeTimeZonePrivilege(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeTimeZonePrivilege.Control,
    "SeTimeZonePrivilege not in accordance with policy").
    to.have.deep.include.members(userRightsAssignment.SeTimeZonePrivilege);
}

/**
 * @description Create a pagefile
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeCreatePagefilePrivilege(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeCreatePagefilePrivilege.Control,
    "SeCreatePagefilePrivilege not in accordance with policy").
    to.have.deep.include.members(userRightsAssignment.SeCreatePagefilePrivilege);
}

/**
 * @description Create a token object
 * @severity Sensitive
 * @group UserRightsAssignment
 */
function testSeCreateTokenPrivilege(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeCreateTokenPrivilege.Control,
    "SeCreateTokenPrivilege not in accordance with policy").
    to.have.deep.include.members(userRightsAssignment.SeCreateTokenPrivilege);
}

/**
 * @description Create global objects
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeCreateGlobalPrivilege(userRightsAssignment,
  uraPolicy, serverProperties, polProcessor) {
  let uraPolicyEx = uraPolicy.SeCreateGlobalPrivilege.Control;
  if (isMemberServer(serverProperties)) {
    let roleKey = 'UserRightsAssignment.SeCreateGlobalPrivilege.MemberServer.Roles';

    if (isRoleInstalled(serverProperties, 'MS-SQL')) {
      uraPolicyEx = uraPolicyEx.concat(...polProcessor.
        getPropertyWithDefault(roleKey, 'MS-SQL'));
    }
  }
  verify(uraPolicyEx, "SeCreateGlobalPrivilege not in accordance with policy").
    to.have.deep.include.members(userRightsAssignment.SeCreateGlobalPrivilege);
}

/**
 * @description Create permanent shared objects
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeCreatePermanentPrivilege(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeCreatePermanentPrivilege.Control,
    "SeCreatePermanentPrivilege not in accordance with policy").to.have.
    deep.include.members(userRightsAssignment.SeCreatePermanentPrivilege);
}

/**
 * @description Create symbolic links
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeCreateSymbolicLinkPrivilege(userRightsAssignment,
  uraPolicy, serverProperties, polProcessor) {
  let uraPolicyEx = uraPolicy.SeCreateSymbolicLinkPrivilege.Control;
  if (isMemberServer(serverProperties)) {
    let roleKey = 'UserRightsAssignment.SeCreateSymbolicLinkPrivilege.DomainController.Roles';
    if (isRoleInstalled(serverProperties, 'Hyper-V')) {
      uraPolicyEx = uraPolicyEx.concat(...polProcessor.
        getPropertyWithDefault(roleKey, 'Hyper-V'));
    }
  }
  verify(uraPolicyEx, "SeCreateSymbolicLinkPrivilege not in accordance with policy").
    to.have.deep.
    include.members(userRightsAssignment.SeCreateSymbolicLinkPrivilege);
}

/**
 * @description Debug programs
 * @severity Sensitive
 * @group UserRightsAssignment
 */
function testSeDebugPrivilege(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeDebugPrivilege.Control,
    "SeDebugPrivilege not in accordance with policy").to.have.deep.
    include.members(userRightsAssignment.SeDebugPrivilege);
}

/**
 * @description Deny access to this computer from the network
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeDenyNetworkLogonRight(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeDenyNetworkLogonRight.Control,
    "SeDenyNetworkLogonRight not in accordance with policy").to.
    have.deep.include.members(userRightsAssignment.SeDenyNetworkLogonRight);
}

/**
 * @description Deny log on as a batch job
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeDenyBatchLogonRight(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeDenyBatchLogonRight.Control,
    "SeDenyBatchLogonRight not in accordance with policy").to.
    have.deep.include.members(userRightsAssignment.SeDenyBatchLogonRight);
}

/**
 * @description Deny log on as a service
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeDenyServiceLogonRight(userRightsAssignment, uraPolicy) {
  // This security setting does not apply to the System, Local Service, or Network Service accounts
  verify(uraPolicy.SeDenyServiceLogonRight.Control,
    "SeDenyServiceLogonRight not in accordance with policy").to.
    have.deep.include.members(userRightsAssignment.SeDenyServiceLogonRight);
}

/**
 * @description Deny log on locally
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeDenyInteractiveLogonRight(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeDenyInteractiveLogonRight.Control,
    "SeDenyInteractiveLogonRight not in accordance with policy").to.
    have.deep.include.members(userRightsAssignment.SeDenyInteractiveLogonRight);
}

/**
 * @description Deny log on through Remote Desktop Services
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeDenyRemoteInteractiveLogonRight(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeDenyRemoteInteractiveLogonRight.Control,
    "SeDenyRemoteInteractiveLogonRight not in accordance with policy").to.
    have.deep.include.members(userRightsAssignment.SeDenyRemoteInteractiveLogonRight);
}

/**
 * @description Enable computer and user accounts to be trusted for delegation
 * @severity Sensitive
 * @group UserRightsAssignment
 */
function testSeEnableDelegationPrivilege(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeEnableDelegationPrivilege.Control,
    "SeEnableDelegationPrivilege not in accordance with policy").to.
    have.deep.include.members(userRightsAssignment.SeEnableDelegationPrivilege);
}

/**
 * @description Force shutdown from a remote system
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeRemoteShutdownPrivilege(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeRemoteShutdownPrivilege.Control,
    "SeRemoteShutdownPrivilege not in accordance with policy").to.
    have.deep.include.members(userRightsAssignment.SeRemoteShutdownPrivilege);
}

/**
 * @description Generate security audits
 * @severity Sensitive
 * @group UserRightsAssignment
 */
function testSeAuditPrivilege(userRightsAssignment,
  uraPolicy, serverProperties, polProcessor) {
  let uraPolicyEx = uraPolicy.SeAuditPrivilege.Control;
  if (isMemberServer(serverProperties)) {

    let roleKey = 'UserRightsAssignment.SeAuditPrivilege.MemberServer.Roles';
    if (isRoleInstalled(serverProperties, 'Web-Server') &&
      isRoleInstalled(serverProperties, 'Web-WebServer')) {
      uraPolicyEx = uraPolicyEx.concat(...polProcessor.
        getPropertyWithDefault(roleKey, 'Web-Server-WSRole'));
    }

    if (isRoleInstalled(serverProperties, 'ADFS-Federation')) {
      uraPolicyEx = uraPolicyEx.concat(...polProcessor.
        getPropertyWithDefault(roleKey, 'ADFS-Federation'));
    }
  }
  verify(uraPolicyEx, "SeAuditPrivilege not in accordance with policy").
    to.have.deep.include.members(userRightsAssignment.SeAuditPrivilege);
}

/**
 * @description Impersonate a client after authentication
 * @severity Sensitive
 * @group UserRightsAssignment
 */
function testSeImpersonatePrivilege(userRightsAssignment,
  uraPolicy, serverProperties, polProcessor) {
  let uraPolicyEx = uraPolicy.SeImpersonatePrivilege.Control;
  if (isMemberServer(serverProperties)) {
    let roleKey = 'UserRightsAssignment.SeImpersonatePrivilege.MemberServer.Roles';
    if (isRoleInstalled(serverProperties, 'Web-Server') &&
      isRoleInstalled(serverProperties, 'Web-WebServer')) {
      uraPolicyEx = uraPolicyEx.concat(...polProcessor.
        getPropertyWithDefault(roleKey, 'Web-Server-WSRole'));
    }

    if (isRoleInstalled(serverProperties, 'MS-SQL')) {
      uraPolicyEx = uraPolicyEx.concat(...polProcessor.
        getPropertyWithDefault(roleKey, 'MS-SQL'));
    }
  }
  verify(uraPolicyEx, "SeImpersonatePrivilege not in accordance with policy").to.
    have.deep.include.members(userRightsAssignment.SeImpersonatePrivilege);
}

/**
 * @description Increase scheduling priority
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeIncreaseBasePriorityPrivilege(userRightsAssignment,
  uraPolicy) {
  verify(uraPolicy.SeIncreaseBasePriorityPrivilege.Control,
    "SeIncreaseBasePriorityPrivilege not in accordance with policy").to.
    have.deep.include.members(userRightsAssignment.SeIncreaseBasePriorityPrivilege);
}

/**
 * @description Load and unload device drivers
 * @severity Sensitive
 * @group UserRightsAssignment
 */
function testSeLoadDriverPrivilege(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeLoadDriverPrivilege.Control,
    "SeLoadDriverPrivilege not in accordance with policy").to.
    have.deep.include.members(userRightsAssignment.SeLoadDriverPrivilege);
}

/**
 * @description Lock pages in memory
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeLockMemoryPrivilege(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeLockMemoryPrivilege.Control,
    "SeLockMemoryPrivilege not in accordance with policy").to.
    have.deep.include.members(userRightsAssignment.SeLockMemoryPrivilege);
}

/**
 * @description Log on as a batch job
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeBatchLogonRight(userRightsAssignment, uraPolicy) {
  //Level 2 Profile
  // DC only
  verify(uraPolicy.SeBatchLogonRight.Control,
    "SeBatchLogonRight not in accordance with policy").
    to.have.deep.include.members(userRightsAssignment.SeBatchLogonRight);
}

/**
 * @description Manage auditing and security log
 * @severity Sensitive
 * @group UserRightsAssignment
 */
function testSeSecurityPrivilege(userRightsAssignment,
  uraPolicy, serverProperties, polProcessor, exchangeConfigured, netBiosName) {
  let uraPolicyEx = uraPolicy.SeSecurityPrivilege.Control;
  if (isDomainController(serverProperties) && (exchangeConfigured)) {
    let roleKey = 'UserRightsAssignment.SeSecurityPrivilege.Common.Roles';
    let exchngRole = polProcessor.getPropertyWithDefault(roleKey, 'Exchange');
    if (exchngRole.length > 0) {
      let exchngRoleQualified = netBiosName + '\\' + exchngRole;
      uraPolicyEx = uraPolicyEx.concat(exchngRoleQualified);
    }
  }
  verify(uraPolicyEx, "SeSecurityPrivilege not in accordance with policy").to.
    have.deep.include.members(userRightsAssignment.SeSecurityPrivilege);
}

/**
 * @description Modify an object label
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeRelabelPrivilege(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeRelabelPrivilege.Control,
    "SeRelabelPrivilege not in accordance with policy").to.
    have.deep.include.members(userRightsAssignment.SeRelabelPrivilege);
}

/**
 * @description Modify firmware environment values
 * @severity Sensitive
 * @group UserRightsAssignment
 */
function testSeSystemEnvironmentPrivilege(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeSystemEnvironmentPrivilege.Control,
    "SeSystemEnvironmentPrivilege not in accordance with policy").to.
    have.deep.include.members(userRightsAssignment.SeSystemEnvironmentPrivilege);
}

/**
 * @description Perform volume maintenance tasks
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeManageVolumePrivilege(userRightsAssignment,
  uraPolicy, serverProperties, polProcessor) {
  let uraPolicyEx = uraPolicy.SeManageVolumePrivilege.Control;
  if (isMemberServer(serverProperties)) {
    let roleKey = 'UserRightsAssignment.SeManageVolumePrivilege.MemberServer.Roles';
    if (isRoleInstalled(serverProperties, 'MS-SQL')) {
      uraPolicyEx = uraPolicyEx.concat(...polProcessor.
        getPropertyWithDefault(roleKey, 'MS-SQL'));
    }
  }
  verify(uraPolicy.SeManageVolumePrivilege.Control,
    "SeManageVolumePrivilege not in accordance with policy").to.
    have.deep.include.members(userRightsAssignment.SeManageVolumePrivilege);
}

/**
 * @description Profile single process
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeProfileSingleProcessPrivilege(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeProfileSingleProcessPrivilege.Control,
    "SeProfileSingleProcessPrivilege not in accordance with policy").to.
    have.deep.include.members(userRightsAssignment.SeProfileSingleProcessPrivilege);
}

/**
 * @description Profile system performance
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeSystemProfilePrivilege(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeSystemProfilePrivilege.Control,
    "SeSystemProfilePrivilege not in accordance with policy").to.
    have.deep.include.members(userRightsAssignment.SeSystemProfilePrivilege);
}

/**
 * @description Replace a process level token
 * @severity Sensitive
 * @group UserRightsAssignment
 */
function testSeAssignPrimaryTokenPrivilege(userRightsAssignment,
  uraPolicy, serverProperties, polProcessor) {
  let uraPolicyEx = uraPolicy.SeAssignPrimaryTokenPrivilege.Control;
  if (isMemberServer(serverProperties)) {
    let roleKey = 'UserRightsAssignment.SeAssignPrimaryTokenPrivilege.MemberServer.Roles';
    if (isRoleInstalled(serverProperties, 'Web-Server') &&
      isRoleInstalled(serverProperties, 'Web-WebServer')) {
      uraPolicyEx = uraPolicyEx.concat(...polProcessor.
        getPropertyWithDefault(roleKey, 'Web-Server-WSRole'));
    }
    if (isRoleInstalled(serverProperties, 'MS-SQL')) {
      uraPolicyEx = uraPolicyEx.concat(...polProcessor.
        getPropertyWithDefault(roleKey, 'MS-SQL'));
    }
  }
  verify(uraPolicyEx, "SeAssignPrimaryTokenPrivilege not in accordance with policy").
    to.have.deep.include.members(userRightsAssignment.SeAssignPrimaryTokenPrivilege);
}

/**
 * @description Restore files and directories
 * @severity Sensitive
 * @group UserRightsAssignment
 */
function testSeRestorePrivilege(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeRestorePrivilege.Control,
    "SeRestorePrivilege not in accordance with policy").to.
    have.deep.include.members(userRightsAssignment.SeRestorePrivilege);
}

/**
 * @description Shut down the system
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeShutdownPrivilege(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeShutdownPrivilege.Control,
    "SeShutdownPrivilege not in accordance with policy").to.
    have.deep.include.members(userRightsAssignment.SeShutdownPrivilege);
}

/**
 * @description Synchronize directory service data
 * @severity Normal
 * @group UserRightsAssignment
 */
function testSeSyncAgentPrivilege(userRightsAssignment, uraPolicy) {
  // DC only
  verify(uraPolicy.SeSyncAgentPrivilege.Control,
    "SeSyncAgentPrivilege not in accordance with policy").to.
    have.deep.include.members(userRightsAssignment.SeSyncAgentPrivilege);
}

/**
 * @description Take ownership of files or other objects
 * @severity Sensitive
 * @group UserRightsAssignment
 */
function testSeTakeOwnershipPrivilege(userRightsAssignment, uraPolicy) {
  verify(uraPolicy.SeTakeOwnershipPrivilege.Control,
    "SeTakeOwnershipPrivilege not in accordance with policy").to.
    have.deep.include.members(userRightsAssignment.SeTakeOwnershipPrivilege);
}
