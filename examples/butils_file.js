// butils_file.js
// Sample baz test script
// Demonstrates usage of butils File APIs


function setup() {
  console.log('File API tests');
  let wfileName = "/tmp/a.txt";
  let values = ["krypton", 42, Math.PI, false];
}

function testfileAPI() {
  console.log('Testing file API  - writing to a file ' +
    'and then verifying contents of each line.');
  let wfile = butils.createFile(wfileName);
  for (var value of values) {
    wfile.append(value);
    wfile.append('\n');
  }
  wfile.close();
  let rfile = butils.openFile(wfileName);
  let i = 0;
  for (var line of rfile) {
    verify(line).to.be.equal(values[i++]);
  }
  rfile.close();
}

function testfileBulkReadTest() {
  console.log('Testing bulk read - reading the full file ' +
    'and then verifying contents.');
  let rfile = butils.openFile(wfileName);
  let data = rfile.readAll();
  // readAll returns binary data
  // Ref for string conversion:
  //https://developer.chrome.com/blog/how-to-convert-arraybuffer-to-and-from-string/
  function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }
  verify(values.join('\n') + '\n').to.be.equal(ab2str(data));
}

function tear_down() {
  butils.removeAll("/tmp/a.txt");
}
