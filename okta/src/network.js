/**
 * Copyright 2023 Bazc
 *
 * network.js
 * Defines network config tests for Okta Identity Service
 *
 * Author: Abhishek Prasad (dev@bazc.io)
 */

/**
 * @description ThreatInsight Action is set to desired state
 * @severity Normal
 */
function testThreatInsight() {
  // Check if user has configured the threatInsight action policy
  // Default to 'block'
  let threatInsight = okta_stage.getConfParam('threat_insight');
  let action = 'block';

  if ((typeof threatInsight != 'undefined') &&
    (typeof threatInsight.action != 'undefined')) {
    action = threatInsight.action;
  }

  verify((okta_stage.ThreatInsightConfiguration()).action,
    'ThreatInsight not set to ' + action).to.be.eql(action);
}

/**
 * @description IP-address block list zones is up-to-date
 * @severity High
 */
function testBlockListStatus() {
  // Get zone data config from actor(okta.toml)
  let zoneData = okta_stage.getConfParam('zone_data');
  if (typeof zoneData === 'undefined') {
    let msg = 'Error, Network block zone not configured';
    logger.Error()?.Msg(msg);
    throw msg;
  }

  // Get a list of Network block list configured in Okta
  let configuredZones = okta_stage.ListZones('usage eq "BLOCKLIST"');
  if (typeof configuredZones === 'undefined') {
    let msg = 'Error, no block list configured';
    logger.Error()?.Msg(msg);
    throw msg;
  }

  // For each configured zone,
  // verify the ip-address list from Okta matches user defined data
  for (const [key, value] of Object.entries(zoneData)) {
    let zone = configuredZones.filter(zone => zone.name === key);
    verify(zone[0].status, "IP block list not active").to.eql('ACTIVE');
    verify(zone[0].gateways, "IP block list does not match for zone " + key).
      to.deep.eql(butils.readJSON(value));
  }
}
