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
 * @severity High
 */
function testThreatInsight() {
  // Check if user has configured the threatInsight action policy
  // Default to 'block'
  const action = 'block';
  let threatInsightAction = getPropertyWithDefault('threat_insight',
    'action', action);

  verify((actor.ThreatInsightConfiguration()).action,
    'ThreatInsight not set to ' + action).to.be.eql(threatInsightAction);
}

/**
 * @description IP-address block list zones is up-to-date
 * @severity High
 */
function testBlockListStatus() {
  // Get zone data config from actor(okta.toml)
  let zoneData = actor.getConfParam('zone_data');
  if (typeof zoneData === 'undefined') {
    let msg = 'Error, Network block zone not configured';
    logger.Error()?.Msg(msg);
    pushError('AssertionError: ' + msg);
    return;
  }

  // Get a list of Network block list configured in Okta
  let configuredZones = actor.ListZones('usage eq "BLOCKLIST"');
  if (configuredZones.length == 0) {
    let msg = 'Error, no block list configured';
    logger.Error()?.Msg(msg);
    pushError('AssertionError: ' + msg);
    return;
  }

  // For each configured zone,
  // verify the ip-address list from Okta matches user defined data
  for (const [key, value] of Object.entries(zoneData)) {
    let zone = configuredZones.filter(zone => zone.name === key);
    if (zone.length == 0) {
      let msg = 'Zone ' + key + ' not configured in Okta';
      logger.Warn()?.Msg(msg);
      pushError('AssertionError: ' + msg);
      continue;
    }
    verify(zone[0].status, "IP block list not active").to.eql('ACTIVE');
    verify(zone[0].gateways, "IP block list does not match for zone " + key).
      to.deep.eql(butils.readJSON(value));
  }
}
