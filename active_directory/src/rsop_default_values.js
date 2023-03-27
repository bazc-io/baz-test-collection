/**
 * Copyright 2023 Bazc
 *
 * rsop_default_values.js
 * Defines the default values for group policy settings.
 *
 * Author: Abhishek Prasad (dev@bazc.io)
 */

/*
 * See rsop_default_processor.js for details.
 */
let rsopDefaultValues =
{
  "Password": {
    "PasswordHistorySize": {
      "Common": 24
    },
    "MaximumPasswordAge": {
      "Common": 42
    },
    "MinimumPasswordAge": {
      "Common": 1
    },
    "MinimumPasswordLength": {
      "Common": 7
    },
    "PasswordComplexity": {
      "Common": 1
    },
    "RelaxMinimumPasswordLengthLimits": {
      "MemberServer": false
    },
    "ClearTextPassword": {
      "Common": 0
    }
  },
  "AccountLockout": {
    "LockoutBadCount": {
      "Common": 0
    }
  },
  "UserRightsAssignment": {
    "SeTrustedCredManAccessPrivilege": {
      "Common": []
    },
    "SeNetworkLogonRight": {
      "DomainController": [
        "Administrators",
        "NT AUTHORITY\\Authenticated Users",
        "NT AUTHORITY\\Enterprise Domain Controllers",
        "Everyone",
        "PreWindows 2000 Compatible Access"
      ],
      "MemberServer": [
        "Administrators",
        "Backup Operators",
        "Users",
        "Everyone"
      ]
    },
    "SeTcbPrivilege": {
      "Common": []
    },
    "SeMachineAccountPrivilege": {
      "DomainController": {
        "Common": [
          "Authenticated Users"
        ]
      }
    },
    "SeIncreaseQuotaPrivilege": {
      "Common": [
        "Administrators",
        "NT AUTHORITY\\LOCAL SERVICE",
        "NT AUTHORITY\\NETWORK SERVICE"
      ]
    },
    "SeInteractiveLogonRight": {
      "DomainController": [
        "Account Operators",
        "Administrators",
        "Backup Operators",
        "Print Operators"
      ],
      "MemberServer": [
        "Administrators",
        "Backup Operators",
        "Users"
      ]
    },
    "SeRemoteInteractiveLogonRight": {
      "DomainController": [
        "Administrators"
      ],
      "MemberServer": [
        "Administrator",
        "Remote Desktop Users"
      ]
    },
    "SeBackupPrivilege": {
      "DomainController": [
        "Administrators",
        "Backup Operators",
        "Server Operators"
      ],
      "MemberServer": [
        "Administrators",
        "Backup Operators"
      ]
    },
    "SeSystemtimePrivilege": {
      "DomainController": [
        "Administrators",
        "NT AUTHORITY\\LOCAL SERVICE",
        "Server Operators"
      ],
      "MemberServer": [
        "Administrators",
        "NT AUTHORITY\\LOCAL SERVICE"
      ]
    },
    "SeTimeZonePrivilege": {
      "Common": [
        "Administrators",
        "NT AUTHORITY\\LOCAL SERVICE"
      ]
    },
    "SeCreatePagefilePrivilege": {
      "Common": [
        "Administrators"
      ]
    },
    "SeCreateTokenPrivilege": {
      "Common": []
    },
    "SeCreateGlobalPrivilege": {
      "Common": [
        "Administrators",
        "NT AUTHORITY\\LOCAL SERVICE",
        "NT AUTHORITY\\NETWORK SERVICE",
        "NT AUTHORITY\\SERVICE"
      ]
    },
    "SeCreatePermanentPrivilege": {
      "Common": []
    },
    "SeCreateSymbolicLinkPrivilege": {
      "Common": [
        "Administrators"
      ]
    },
    "SeDebugPrivilege": {
      "Common": [
        "Administrators"
      ]
    },
    "SeDenyNetworkLogonRight": {
      "DomainController": [
        "Guests"
      ],
      "MemberServer": []
    },
    "SeDenyBatchLogonRight": {
      "Common": []
    },
    "SeDenyServiceLogonRight": {
      "Common": []
    },
    "SeDenyInteractiveLogonRight": {
      "Common": []
    },
    "SeDenyRemoteInteractiveLogonRight": {
      "Common": []
    },
    "SeEnableDelegationPrivilege": {
      "DomainController": [
        "Administrators"
      ],
      "MemberServer": []
    },
    "SeRemoteShutdownPrivilege": {
      "DomainController": [
        "Administrators",
        "Server Operators"
      ],
      "MemberServer": [
        "Administrators"
      ]
    },
    "SeAuditPrivilege": {
      "Common": [
        "NT AUTHORITY\\LOCAL SERVICE",
        "NT AUTHORITY\\NETWORK SERVICE"
      ]
    },
    "SeImpersonatePrivilege": {
      "Common": [
        "Administrators",
        "NT AUTHORITY\\LOCAL SERVICE",
        "NT AUTHORITY\\NETWORK SERVICE",
        "NT AUTHORITY\\SERVICE"
      ]
    },
    "SeIncreaseBasePriorityPrivilege": {
      "Common": [
        "Administrators"
      ]
    },
    "SeLoadDriverPrivilege": {
      "DomainController": [
        "Administrators",
        "Print Operators"
      ],
      "MemberServer": [
        "Administrators"
      ]
    },
    "SeLockMemoryPrivilege": {
      "Common": []
    },
    "SeBatchLogonRight": {
      "DomainController": [
        "Administrators",
        "Backup Operators"
      ]
    },
    "SeSystemEnvironmentPrivilege": {
      "Common": [
        "Administrators"
      ]
    },
    "SeManageVolumePrivilege": {
      "Common": [
        "Administrators"
      ]
    },
    "SeProfileSingleProcessPrivilege": {
      "Common": [
        "Administrators"
      ]
    },
    "SeSystemProfilePrivilege": {
      "Common": [
        "Administrators",
        "NT SERVICE\\WdiServiceHost"
      ]
    },
    "SeAssignPrimaryTokenPrivilege": {
      "Common": [
        "NT AUTHORITY\\LOCAL SERVICE",
        "NT AUTHORITY\\NETWORK SERVICE"
      ]
    },
    "SeRestorePrivilege": {
      "DomainController": [
        "Administrators",
        "Backup Operators",
        "Server Operators"
      ],
      "MemberServer": [
        "Administrators",
        "Backup Operators"
      ]
    },
    "SeSecurityPrivilege": {
      "Common": [
        "Administrators"
      ]
    },
    "SeRelabelPrivilege": {
      "Common": []
    },
    "SeShutdownPrivilege": {
      "DomainController": [
        "Administrators",
        "Backup Operators",
        "Server Operators",
        "Print Operators"
      ],
      "MemberServer": [
        "Administrators",
        "Backup Operators"
      ]
    },
    "SeSyncAgentPrivilege": {
      "DomainController": []
    },
    "SeTakeOwnershipPrivilege": {
      "Common": [
        "Administrators"
      ]
    }
  },
  "LocalAccount": {
    "EnableAdminAccount": {
      "MemberServer": false
    },
    "EnableGuestAccount": {
      "MemberServer": false
    },
    "NewAdministratorName": {
      "Common": "Administrator"
    },
    "NewGuestName": {
      "Common": "Guest"
    }
  },
  "Registry": {
    "machine\\software\\microsoft\\windows\\currentversion\\policies\\system\\noconnecteduser": {
      "Common": 1
    },
    "machine\\system\\currentcontrolset\\control\\lsa\\limitblankpassworduse": {
      "Common": 1
    },
    "machine\\system\\currentcontrolset\\control\\lsa\\auditbaseobjects": {
      "Common": 1
    },
    "machine\\system\\currentcontrolset\\control\\lsa\\crashonauditfail": {
      "Common": 0
    },
    "machine\\software\\microsoft\\windows nt\\currentversion\\winlogon\\allocatedasd": {
      "Common": "0"
    },
    "machine\\system\\currentcontrolset\\control\\print\\providers\\lanman print services\\servers\\addprinterdrivers": {
      "Common": 1
    },
    "machine\\system\\currentcontrolset\\control\\lsa\\submitcontrol": {
      "DomainController": 0
    },
    "machine\\system\\currentcontrolset\\services\\netlogon\\parameters\\vulnerablechannelallowlist": {
      "DomainController": []
    },
    "machine\\system\\currentcontrolset\\services\\ntds\\parameters\\ldapenforcechannelbinding": {
      "DomainController": 0
    },
    "machine\\system\\currentcontrolset\\services\\ntds\\parameters\\ldapserverintegrity": {
      "DomainController": 1
    },
    "machine\\system\\currentcontrolset\\services\\netlogon\\parameters\\refusepasswordchange": {
      "DomainController": 0
    },
    "machine\\system\\currentcontrolset\\services\\netlogon\\parameters\\requiresignorseal": {
      "Common": 1
    },
    "machine\\system\\currentcontrolset\\services\\netlogon\\parameters\\sealsecurechannel": {
      "Common": 1
    },
    "machine\\system\\currentcontrolset\\services\\netlogon\\parameters\\signsecurechannel": {
      "Common": 1
    },
    "machine\\system\\currentcontrolset\\services\\netlogon\\parameters\\disablepasswordchange": {
      "Common": 0
    },
    "machine\\system\\currentcontrolset\\services\\netlogon\\parameters\\maximumpasswordage": {
      "Common": 30
    },
    "machine\\system\\currentcontrolset\\services\\netlogon\\parameters\\requirestrongkey": {
      "Common": 1
    }
  }
}
