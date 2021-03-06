/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = function(config) {
  const configuration = {
    basePath: "",
    frameworks: ["mocha", "chai"],
    files: [
      {
        pattern: "tests/fixtures/*",
        included: false
      },
      {
        pattern: "dist/**/*.js",
        included: false
      },
      {
        pattern: "tests/*.test.js",
        type: "module"
      }
    ],
    reporters: ["progress"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: true,
    concurrency: Infinity,
    browsers: [
      "Chrome",
      "ChromeCanaryHarmony",
      "Firefox",
      "FirefoxNightly",
      "Safari"
      // "SafariTechPreview"
    ],
    customLaunchers: {
      ChromeCanaryHarmony: {
        base: "ChromeCanary",
        flags: ["--js-flags=--harmony"]
      },
      ChromeCanaryHeadlessHarmony: {
        base: "ChromeCanary",
        flags: ["--js-flags=--harmony", /* '--headless', */ "--disable-gpu"]
      },
      DockerChrome: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"]
      }
    },
    // Remove these 2 lines once this PR lands
    // https://github.com/karma-runner/karma/pull/2834
    customContextFile: "tests/context.html",
    customDebugFile: "tests/debug.html"
  };

  if (process.env.INSIDE_DOCKER) configuration.browsers = ["DockerChrome"];

  config.set(configuration);
};
