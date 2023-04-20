/**
 * Copyright 2023 Bazc
 *
 * helper.js
 * Defines helper function for Okta Identity Service tests
 *
 * Author: Abhishek Prasad (dev@bazc.io)
 */

/*
 * Get a specific policy value by walking nodes.
 * E.g. Get value of policy A.B.C.D. Here A.B.C is the parent node
 * and D is the key. If the polciy is present, the function returns
 * the value specified for D else returns undefined.
 */
function getProperty(parentNode, key) {
  let pathList = parentNode.split('.');
  if (typeof pathList === 'undefined') {
    return undefined;
  }

  let obj = actor.getConfParam(pathList[0]);
  pathList.shift();

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
function getPropertyWithDefault(parentNode, key, defValue = []) {
  let ret = getProperty(parentNode, key);
  if (typeof ret === 'undefined') {
    return defValue;
  }
  return ret;
}
