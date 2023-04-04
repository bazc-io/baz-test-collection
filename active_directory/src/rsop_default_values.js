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
      "MemberServer": 0
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
      "MemberServer": 0
    },
    "EnableGuestAccount": {
      "MemberServer": 0
    },
    "NewAdministratorName": {
      "Common": "Administrator"
    },
    "NewGuestName": {
      "Common": "Guest"
    },
    "LSAAnonymousNameLookup": {
      "Common": 0
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
    },
    "machine\\software\\microsoft\\windows\\currentversion\\policies\\system\\disablecad": {
      "Common": 1
    },
    "machine\\software\\microsoft\\windows\\currentversion\\policies\\system\\dontdisplaylastusername": {
      "Common": 0
    },
    "machine\\software\\microsoft\\windows\\currentversion\\policies\\system\\inactivitytimeoutsecs": {
      "Common": 0
    },
    "machine\\software\\microsoft\\windows\\currentversion\\policies\\system\\legalnoticetext": {
      "Common": [""]
    },
    "machine\\software\\microsoft\\windows\\currentversion\\policies\\system\\legalnoticecaption": {
      "Common": ""
    },
    "machine\\software\\microsoft\\windows nt\\currentversion\\winlogon\\cachedlogonscount": {
      "Common": 10
    },
    "machine\\software\\microsoft\\windows nt\\currentversion\\winlogon\\passwordexpirywarning": {
      "Common": 5
    },
    "machine\\software\\microsoft\\windows nt\\currentversion\\winlogon\\forceunlocklogon": {
      "Common": 0
    },
    "machine\\software\\microsoft\\windows nt\\currentversion\\winlogon\\scremoveoption": {
      "Common": "0"
    },
    "machine\\system\\currentcontrolset\\services\\lanmanworkstation\\parameters\\requiresecuritysignature": {
      "Common": 0
    },
    "machine\\system\\currentcontrolset\\services\\lanmanworkstation\\parameters\\enablesecuritysignature": {
      "Common": 1
    },
    "machine\\system\\currentcontrolset\\services\\lanmanworkstation\\parameters\\enableplaintextpassword": {
      "Common": 0
    },
    "machine\\system\\currentcontrolset\\services\\lanmanserver\\parameters\\autodisconnect": {
      "Common": 15
    },
    "machine\\system\\currentcontrolset\\services\\lanmanserver\\parameters\\requiresecuritysignature": {
      "MemberServer": 0,
      "DomainController": 1
    },
    "machine\\system\\currentcontrolset\\services\\lanmanserver\\parameters\\enablesecuritysignature": {
      "MemberServer": 0,
      "DomainController": 1
    },
    "machine\\system\\currentcontrolset\\services\\lanmanserver\\parameters\\enableforcedlogoff": {
      "Common": 1
    },
    "machine\\system\\currentcontrolset\\services\\lanmanserver\\parameters\\smbservernamehardeninglevel": {
      "MemberServer": 0
    },
    "machine\\system\\currentcontrolset\\control\\lsa\\restrictanonymoussam": {
      "MemberServer": 1
    },
    "machine\\system\\currentcontrolset\\control\\lsa\\restrictanonymous": {
      "MemberServer": 0
    },
    "machine\\system\\currentcontrolset\\control\\lsa\\disabledomaincreds": {
      "Common": 0
    },
    "machine\\system\\currentcontrolset\\control\\lsa\\everyoneincludesanonymous": {
      "Common": 0
    },
    "machine\\system\\currentcontrolset\\services\\lanmanserver\\parameters\\nullsessionpipes": {
      "Common": []
    },
    "machine\\system\\currentcontrolset\\control\\securepipeservers\\winreg\\allowedexactpaths\\machine": {
      "Common": ["System\\CurrentControlSet\\Control\\ProductOptions",
        "System\\CurrentControlSet\\Control\\Server Applications",
        "Software\\Microsoft\\Windows NT\\CurrentVersion"
      ]
    },
    "machine\\system\\currentcontrolset\\control\\securepipeservers\\winreg\\allowedpaths\\machine": {
      "Common": ["System\\CurrentControlSet\\Control\\Print\\Printers",
        "System\\CurrentControlSet\\Services\\Eventlog",
        "Software\\Microsoft\\OLAP Server",
        "Software\\Microsoft\\Windows NT\\CurrentVersion\\Print",
        "Software\\Microsoft\\Windows NT\\CurrentVersion\\Windows",
        "System\\CurrentControlSet\\Control\\ContentIndex",
        "System\\CurrentControlSet\\Control\\Terminal Server",
        "System\\CurrentControlSet\\Control\\Terminal Server\\UserConfig",
        "System\\CurrentControlSet\\Control\\Terminal Server\\DefaultUserConfiguration",
        "Software\\Microsoft\\Windows NT\\CurrentVersion\\Perflib",
        "System\\CurrentControlSet\\Services\\SysmonLog"]
    },
    "machine\\system\\currentcontrolset\\services\\lanmanserver\\parameters\\restrictnullsessaccess": {
      "Common": 1
    },
    "machine\\system\\currentcontrolset\\control\\lsa\\restrictremotesam": {
      "MemberServer": "O:BAG:BAD:(A;;RC;;;BA)"
    },
    "machine\\system\\currentcontrolset\\services\\lanmanserver\\parameters\\nullsessionshares": {
      "Common": []
    },
    "machine\\system\\currentcontrolset\\control\\lsa\\forceguest": {
      "Common": 0
    }
  }
}
