# Okta Collection

The Okta test collection for the Baz system lets you test Okta Identity system properties. The collection consists of the following directories -

- *config* - The configuration directory contains configuration files needed to execute tests.
- *src* - The src directory contains the test cases.

## Execution

```bash
git clone https://github.com/bazc-io/baz-test-collection.git
cd baz-test-collection
/opt/bazc/bazcli/bin/bazcli test --actors okta/config/okta.toml --name="Okta Stage tests" --output=report.csv okta/
```
