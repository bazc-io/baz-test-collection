// butils_json.js
// Sample baz test script
// Demonstrates the butils JSON APIs

function setup() {
  console.log('JSON read/write test');
  let numFile = 'num.json';
  let objFile = 'obj.json';
  let strFile = 'str.json';
  let boolFile = 'bool.json';
  let testNum = Math.PI;
  let testObj = {
    name: "Kal-el",
    location: "Krypton",
    location_parameters: {
      number_of_moons: 3,
      distance_in_au: 27.1,
      alive: false
    }
  };
  // Here location from defaultObj would be overwritten
  // by location in testObj.
  let defaultObj = {
    better_known_as: "Superman",
    location: "Earth"
  };
  let mergedObj = {
    name: "Kal-el",
    location: "Krypton",
    location_parameters: {
      number_of_moons: 3,
      distance_in_au: 27.1,
      alive: false
    },
    better_known_as: "Superman"
  };
  let testStr = "Daily Planet";
  let testBool = true;
}

function testNumberWrite() {
  console.log('Write number to a JSON file ' +
    'and then read and verify contents.');
  butils.writeJSON(numFile, testNum);
  verify(butils.readJSON(numFile)).to.equal(testNum);
}

function testObjWrite() {
  console.log('Write an object to a JSON file ' +
    'and then read and verify contents.');
  butils.writeJSON(objFile, testObj);
  verify(butils.readJSON(objFile)).to.deep.equal(testObj);
}

function testStrWrite() {
  console.log('Write a string to a JSON file ' +
    'and then read and verify contents.');
  butils.writeJSON(strFile, testStr);
  verify(butils.readJSON(strFile)).to.equal(testStr);
}

function testboolWrite() {
  console.log('Write a bool to a JSON file ' +
    'and then read and verify contents.');
  butils.writeJSON(boolFile, testBool);
  verify(butils.readJSON(boolFile)).to.equal(testBool);
}

function testObjMerge() {
  console.log('Merge two JSON objects ' +
    'and then verify contents.');
  verify(butils.mergeJSON(testObj, defaultObj)).to.
    eql(mergedObj);
}

function tear_down() {
  butils.removeAll(numFile);
  butils.removeAll(objFile);
  butils.removeAll(strFile);
  butils.removeAll(boolFile);
}
