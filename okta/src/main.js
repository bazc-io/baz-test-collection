/**
 * Copyright 2023 Bazc
 *
 * main.js
 * Defines the entry point for Okta Identity Service tests
 *
 * Author: Abhishek Prasad (dev@bazc.io)
 */

/*
 * This is the main entry function for the test collection.
 * The Baz framework invokes the setup function as the entry point.
 */
function setup() {
  // Make sure the actor is intialized, else bail out.
  if (typeof okta_stage === 'undefined') {
    logger.Error()?.Msg(
      'Error, actor \'okta_stage\' not intialized, skipping all tests in the collection.');
    baz.runTests([]);
    throw 'Error, okta_stage actor not loaded, skipping all tests';
  }
  let actor = okta_stage;
}

/*
 * This is the cleanup function after all tests are run.
 * The Baz framework invokes the tear_down function as the *post* function.
 */
function tear_down() {
}
