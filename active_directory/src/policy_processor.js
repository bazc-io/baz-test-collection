/**
 * Copyright 2023 Bazc
 *
 * policy_processor.js
 * Defines the PolicyProcesser class
 *
 * Author: Abhishek Prasad (dev@bazc.io)
 */

/*
 * PolicyProcessor manages the policy settings for group policies.
 * Currently it supports the CIS recommendation for Windows servers.
 *
 * The class takes the policy object as input, processes it and makes
 * the policy availble to consumer. The processor natively understands
 * policy applicability to Domain Controllers and Member Servers.
 * For other polciies, it directly returns the policy values.
 */
class PolicyProcessor {
  constructor(policy) {
    this.policy = policy;
  }

  /*
   * Get policy values for a settings group and server type
   * group is the settings groups - matches Windows
   * grouping e.g. AccountLockout, Password etc.
   * serverType can be a Domain Controller or Domain Member computer.
   */
  getPolicyGroup(group, serverType) {
    let serverTypePol = this.#processRawPolicy(this.#getServerTypeKey(serverType));
    return serverTypePol[group];
  }

  /*
   * Get all policy values for a given server type.
   * serverType can be a Domain Controller or Domain Member computer.
   */
  getAllPolicies(serverType) {
    return this.#processRawPolicy(this.#getServerTypeKey(serverType));
  }

  /*
   * Get a specific policy value by walking nodes.
   * E.g. Get value of policy A.B.C.D. Here A.B.C is the parent node
   * and D is the key. If the polciy is present, the function returns
   * the value specified for D else returns undefined.
   */
  getProperty(parentNode, key) {
    let obj = this.policy;
    let pathList = parentNode.split('.');
    pathList.forEach(path => {
      obj = obj[path];
      if (typeof obj === 'undefined') {
        return undefined;
      }
    })
    return obj[key];
  }

  /*
   * Get a specific policy value by walking nodes.
   * E.g. Get value of policy A.B.C.D. Here A.B.C is the parent node
   * and D is the key. If the polciy is present, the function returns
   * the value specified for D else returns the default value.
   * The default value is set to a empty list but can be overriden by the
   * caller to any data value.
   */
  getPropertyWithDefault(parentNode, key, defValue = []) {
    let ret = this.getProperty(parentNode, key);
    if (typeof ret === 'undefined') {
      return defValue;
    }
    return ret;
  }

  /*
   * Protected Method
   * Given a server type, process the polciy for this sertver type.
   * The method returns the effective policy for all setting groups
   * for the given server type.
   */
  #processRawPolicy(serverType) {
    let policy = {};
    let propGroups = Object.keys(this.policy);
    propGroups.forEach(propertyBlock => {
      let groupPolicy = {};
      let blockPolicy = this.policy[propertyBlock];
      let settings = Object.keys(blockPolicy);
      settings.forEach(setting => {
        if ((typeof blockPolicy[setting][serverType] === 'undefined') ||
          (typeof blockPolicy[setting][serverType]['Control'] === 'undefined')) {
          groupPolicy[setting] = blockPolicy[setting]['Common'];
        } else {
          groupPolicy[setting] = blockPolicy[setting][serverType];
        }
      });
      policy[propertyBlock] = groupPolicy;
    });
    return policy;
  }

  /*
   * Protected Method
   * Helper to filter the computer type.
   * Domain Controller is mapped to DomainController keyword
   * Domain Computer is mapped to MemberServer
   */
  #getServerTypeKey(serverType) {
    let control;
    if (serverType === 'Domain Controller') {
      control = 'DomainController';
    } else if (serverType === 'Domain Computer') {
      control = 'MemberServer';
    } else {
      throw 'Error processing policy group - ' + group + ' for server type ' + serverType;
    }
    return control;
  }
}
