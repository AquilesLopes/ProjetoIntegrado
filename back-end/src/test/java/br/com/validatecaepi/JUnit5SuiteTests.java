package br.com.validatecaepi;

import org.junit.platform.suite.api.SelectPackages;
import org.junit.platform.suite.api.Suite;

@Suite
@SelectPackages({
        "br.com.validatecaepi.controller",
        "br.com.validatecaepi.service"
})
public class JUnit5SuiteTests {
}
