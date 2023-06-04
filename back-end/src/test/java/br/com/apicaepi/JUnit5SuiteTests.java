package br.com.apicaepi;

import org.junit.platform.suite.api.SelectPackages;
import org.junit.platform.suite.api.Suite;

@Suite
@SelectPackages({
        "br.com.validatecaepi.controller",
        "br.com.validatecaepi.service"
})
public class JUnit5SuiteTests {
}
