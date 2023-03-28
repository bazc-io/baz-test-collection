

# Active Directory Collection

The active directory test collection for the Baz system enables you to test AD group policy settings. The collection consists of the following directories.

- *config* - The configuration directory contains configuration files needed to execute AD tests.
- *data* - The data directory contains a list of tests and corresponding policy files.
- *src* - The src directory consists of tests and additional code to run tests for AD group policies.

## Execution

```bash
git clone https://github.com/bazc-io/baz-test-collection.git
```
```bash
cd baz-test-collection
```

```bash
/opt/bazc/bazcli/bin/bazcli test --actors active_directory/config/win.toml --name="Active Directory Lab" --output=report.csv active_directory/
```

For further details, please see AD Collection [documentation](https://docs.bazc.io/collections/adcollection).
