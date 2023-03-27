/**
 * Copyright 2023 Bazc
 *
 * rsop_default_processor.js
 * Defines the RSoPDefaultSettingsProcessor class
 *
 * Author: Abhishek Prasad (dev@bazc.io)
 */

/*
 * RSoPDefaultSettingsProcessor manages the default value for group policy
 * settings. These default values are enforced by Windows when the setting
 * is not explicitly configured. These values are availalble
 * @ https://learn.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/security-policy-settings-reference
 *
 * The class reads a list of default group policy setting values
 * (rsopDefaultValues) and returns the subseet of values depending on the server type.
 * Get the default setting values through the method getDefaulSettings.
 */

class RSoPDefaultSettingsProcessor {
  constructor() {
    if (typeof rsopDefaultValues === 'undefined') {
      throw 'Error reading default settings';
    }

    this.DomainController = this.#processRawSettings(
      rsopDefaultValues, 'DomainController');
    this.MemberServer = this.#processRawSettings(
      rsopDefaultValues, 'MemberServer');
  }

  /*
   * Get group policy setting default values given a server type.
   * serverType can be a Domain Controller or Domain Computer.
   * Returns an object with default setting values
   * grouped by the settings group.
   */
  getDefaulSettings(serverType) {
    let control;
    if (serverType === 'Domain Controller') {
      control = this.DomainController;
    } else if (serverType === 'Domain Computer') {
      control = this.MemberServer;
    } else {
      throw 'Error processing policy group for server type ' +
      serverType;
    }
    return control;
  }

  /*
   * Private Method
   * Given a settings group and the serverType, return the unified
   * set of default values for this settings group.
   */
  #processRawSettings(defSettingsGroup, serverType) {
    let defRSoPSettings = {};
    let propGroups = Object.keys(defSettingsGroup);
    propGroups.forEach(propertyBlock => {
      let groupDefSetting = {};
      let blockDefSettings = defSettingsGroup[propertyBlock];
      let defSettings = Object.keys(blockDefSettings);
      defSettings.forEach(setting => {
        if (typeof blockDefSettings[setting][serverType] === 'undefined') {
          groupDefSetting[setting] = blockDefSettings[setting]['Common'];
        } else {
          groupDefSetting[setting] = blockDefSettings[setting][serverType];
        }
      });
      defRSoPSettings[propertyBlock] = groupDefSetting;
    });
    return { 'RSoP': defRSoPSettings };
  }
}
