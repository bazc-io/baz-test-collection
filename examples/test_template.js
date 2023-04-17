// test_template.js
// Sample baz test script

function setup() {
  let life = 42;
  console.log('Hello, BazLang World!');
  console.log('The answer to life, the universe, and everything');
}

function testAssertion() {
  let b = life;
  console.log('Meaning of life is ' + b);
  verify(b).to.eql(life);
}

function testMeaning() {
  console.log('Meaning of life is ' + life);
  console.log('This test will fail as b is not in scope.');
  verify(b).to.eql(life);
}

function tear_down() {
  console.log('Bye!')
}
