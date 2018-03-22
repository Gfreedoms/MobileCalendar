const debug = process.env.DEBUG;

exports.config = {
    host: "127.0.0.1",
    port: 4444,
    specs: [ "./dist/e2e/**/*.spec.js" ],
    maxInstances: debug ? 1 : 5,
    capabilities: [ {
        maxInstances: debug ? 1 : 5,
        browserName: "chrome",
        chromeOptions: {
            args: ["auto-select-desktop-capture-source='Entire screen'",
            "use-fake-device-for-media-stream",
            "use-fake-ui-for-media-stream"],
            binary: process.env.BROWSERBIN
          }
    } ],
    sync: true,
    logLevel: "silent",
    coloredLogs: true,
    bail: 0,
    screenshotPath: "dist/wdio/",
    baseUrl: debug ? "http://localhost:8080/" : "https://date-picker.mxapps.io/",
    waitforTimeout: 60000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 2,
    services: [ "selenium-standalone" ],
    framework: "jasmine",
    reporters: [ "dot", "spec" ],
    execArgv: debug ? [ "--inspect" ] : undefined,
    jasmineNodeOpts: {
        defaultTimeoutInterval: debug ? (60 * 60 * 3000) : (100 * 3000),
        expectationResultHandler: function(passed, assertion) {
            if (passed) {
                return;
            }
            browser.saveScreenshot(
                "dist/wdio/assertionError_" + assertion.error.message + ".png"
            );
        }
    }
};
