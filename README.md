# Baz System
Baz system provides a toolset to help you ascertain the current state of your IT infrastructure and measure it against a desired state. This is achieved through a series of fine-grained tests that can be run on your infrastructure. The Baz system introduces a software engineering-style test-driven approach to system security by treating applications and hosts as programmable entities.

The basic idea of the solution is to run tests and ascertain if the aspects being tested match the desired state. In cases where the expectation doesn't match reality, tests fail. The difference between the states is recorded in a report. This exercise helps you see what's wrong today and how the environment evolves.

The primary programming language for test code in Baz is ECMAScript Version 6. Using full-fledged Turing complete language to describe the desired state of a complex environment means that all vagaries and complexities can be captured without resorting to glue scripts and other ad-hoc measures. Also, since ES6, i.e., JavaScript, is widely used, there is no need to learn a new language or new tools/IDEs.

## Flow Diagram
![Flow](https://docs.bazc.io/img/baz-flow-white.svg)

# baz-test-collection
Collections are a grouping of tests that you can run in your environment. They enable you to test an aspect of your infrastructure. For example, the active directory collection allows you to test Active Directory group policies.

## Get Started - Verify CIS Windows 2022 Benhmark
Use this QuickStart guide to test Active Directory Group Policies against CIS benchmark through the Active Directory test collection. For detailed information, please see the **[introduction](https://docs.bazc.io/#introduction)** and the **[collection](https://docs.bazc.io/collections/adcollection)** pages.

1. Download the BazCLI build.

   **Debian**, **Ubuntu**, **WSL2**

   ```bash
   wget https://bazc.io/downloads/bazcli-0_0.1.4_amd64.deb
   ```

   **RHEL**

   ```bash
   wget https://bazc.io/downloads/bazcli-0.1.4-1.x86_64.rpm
   ```



2. Set up BazCLI package.

   **Debian**, **Ubuntu**, **WSL2**

   ```bash
   sudo apt install ./bazcli-0_0.1.4_amd64.deb
   ```

   **RHEL**

   ```bash
   sudo yum install ./bazcli-0.1.4-1.x86_64.rpm
   ```

3. Configure baz-plugins.

   ```bash
   sudo systemctl enable baz-plugins
   ```
   ```bash
   sudo systemctl start baz-plugins
   ```

4. Clone the Baz test collection repository.

   ```bash
   git clone https://github.com/bazc-io/baz-test-collection.git
   ```

   ```bash
   cd baz-test-collection
   ```

5. Configure Windows plugin [prerequisites](https://docs.bazc.io/plugins/windows#prerequisite). This enables the plugin to communicate with your Active Directory servers.

6. Configure the actor for the Windows plugin. You can use the template file `win.toml` present under the config directory. The configuration fields support tokens that are explained in the [tokens section](https://docs.bazc.io/bazcli/tokens).

   - Change the domain field to your AD root domain.

   - Change the username field to a username from your AD environment with the right authorizations. You can specify the user through the env token or directly, e.g., `corp\freddy`

   - Change the password field to specify the password of the user specified in step above. Although the password can be specified directly or through environment tokens, we highly recommend using the secret token to specify the password.

   - Change the ca_certs field to the location of the AD CA certificate PEM file using the file token. You can export the certificate directly from the CA server in PEM(Base-64) format with the following command `certutil -ca.cert ca_name.cer`

   ```toml
    [win]
    plugin = 'win_plugin'
    url = 'localhost:60986'

    [win.params]
    domain = 'corp.bazc.com'
    username = 'corp\freddy'
    password = 'secret://secret.ad.password'
    ca_certs = 'file:///home/freddy/shared/CA.pem'
   ```

7. Run the test on your AD environment with the below command -

   ```bash
   /opt/bazc/bazcli/bin/bazcli test --actors active_directory/config/win.toml --name="CIS Windows Server 2022" --output=report.csv active_directory/
   ```

   The *actors* *configuration - win.toml* (--actors) file was configured in step 6 above.

8. Verify the result in the generated **report.csv** file.

Reach out to dev@bazc.io for any assistance or open a PR!
