// bcsv.js
// Sample baz test script
// Demonstrates usage of bcsv CSV APIs

function setup() {
  console.log('CSV test');
  let fileName = "/tmp/a.csv";
  let data = [
    ["name", "location"],
    //value with comma
    ["clark", "krypton, earth"],
    ["kalel", "krypton"]
  ];
}

function tear_down() {
  butils.removeAll(fileName);
}

function testCSV() {
  console.log('Testing csv read and write - write to a file ' +
    'and then read and verify contents.');
  let csv = bcsv.createFile(fileName);
  for (record of data) {
    csv.append(record);
  }
  csv.close();

  csv = bcsv.openFile(fileName);
  let i = 0;
  for (record of csv) {
    verify(record).to.have.ordered.members(data[i++]);
  }
  csv.close();

  csv = bcsv.openFile(fileName);
  verify(csv.readAll()).to.eql(data);
  csv.close();
}
