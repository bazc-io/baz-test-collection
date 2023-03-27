/**
 * Copyright 2023 Bazc
 *
 * devices.js
 * Defines tests for Devices Group Policies
 *
 * Author: Abhishek Prasad (dev@bazc.io)
 */

/**
 * @description Allowed to format and eject removable media
 * @severity Normal
 * @group Devices
 */
function testAllocateDASD(registry, devicePolicy) {
  let key = 'machine\\software\\microsoft\\windows nt\\currentversion\\winlogon\\allocatedasd';
  verify(registry[key],
    "AllocateDASD not in accordance with policy").
    to.be.eql(devicePolicy[key].Control);
}

/**
 * @description Prevent users from installing printer drivers
 * @severity Normal
 * @group Devices
 */
function testAddPrinterDrivers(registry, devicePolicy) {
  let key = 'machine\\system\\currentcontrolset\\control\\print\\providers\\lanman print services\\servers\\addprinterdrivers';
  verify(registry[key],
    "AddPrinterDrivers not in accordance with policy").
    to.be.eql(devicePolicy[key].Control);
}
