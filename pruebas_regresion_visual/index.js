const compareImages = require("resemblejs/compareImages");
const config = require("./config.json");
const fs = require("fs");

const { viewportHeight, viewportWidth, browsers, options } = config;
const threshold = 30; //30%

const scenarios = [
  "ES002",
  "ES003",
  "ES005",
  "ES006",
  "ES007",
  "ES009",
  "ES012",
  "ES014",
  "ES018",
  "ES019",
];

function render_scenario(scenario, steps) {
  const f_steps = steps.filter((x) => x.misMatchPercentage > threshold).length;
  let content = `
        <div class="scenario">
            <h2>Scenario: ${scenario}</h2>
            <p># failed steps:${f_steps} </p>
            `;
  const ghost3Files = getFiles("./screenshots/ghost3/" + scenario);
  const ghost4Files = getFiles("./screenshots/ghost4/" + scenario);

  for (let index = 0; index < steps.length; index++) {
    const step = steps[index];
    content += `
        <div>
            <div class="step ${
              step.misMatchPercentage > threshold ? "failed" : "Passed"
            }">
                <h3>Step: ${
                  ghost3Files[index].split("/").slice(-1).pop().split(".")[0]
                }</h3>
                <p>misMatchPercentage: ${step.misMatchPercentage}% </p>
                <p>Result: ${
                  step.misMatchPercentage > threshold ? "failed" : "Passed"
                } </p>
            </div>
            <div class="imgline">
            <div class="imgcontainer">
                <span class="imgname">Reference</span>
                <img class="img2" src="../.${
                  ghost3Files[index]
                }" id="refImage" label="Reference">
            </div>
            <div class="imgcontainer">
                <span class="imgname">Test</span>
                <img class="img2" src="../.${
                  ghost4Files[index]
                }" id="testImage" label="Test">
            </div>
            </div>
            <div class="imgline">
            <div class="imgcontainer">
                <span class="imgname">Diff</span>
                <img class="imgfull" src="./compare-${scenario}-${index}.png" id="diffImage" label="Diff">
            </div>
            </div>
        </div>
        <hr>`;
  }
  content += `
    </div>`;
  return content;
}

function createReport(datetime, resInfo) {
  return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>
                Report for Ghost v3.41.1 vs Ghost v4.44.0
            </h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
                ${scenarios.map((scenario) =>
                  render_scenario(scenario, resInfo[scenario])
                )}
            </div>
        </body>
    </html>`;
}

function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = `${dir}/${file}`;
    if (!fs.statSync(name).isDirectory()) {
      files.push(name);
    }
  }
  return files;
}

async function executeTest() {
  if (browsers.length === 0) {
    return;
  }
  let resultInfo = {};
  let datetime = new Date().toISOString().replace(/:/g, ".");

  if (!fs.existsSync(`./results/${datetime}`)) {
    fs.mkdirSync(`./results/${datetime}`, { recursive: true });
  }

  for (const scenario of scenarios) {
    resultInfo[scenario] = [];

    const ghost3Files = getFiles("./screenshots/ghost3/" + scenario);
    const ghost4Files = getFiles("./screenshots/ghost4/" + scenario);

    if (ghost3Files.length === ghost4Files.length) {
      for (let index = 0; index < ghost3Files.length; index++) {
        const data = await compareImages(
          fs.readFileSync(ghost3Files[index]),
          fs.readFileSync(ghost4Files[index]),
          options
        );
        resultInfo[scenario].push({
          isSameDimensions: data.isSameDimensions,
          dimensionDifference: data.dimensionDifference,
          rawMisMatchPercentage: data.rawMisMatchPercentage,
          misMatchPercentage: data.misMatchPercentage,
          diffBounds: data.diffBounds,
          analysisTime: data.analysisTime,
        });
        fs.writeFileSync(
          `./results/${datetime}/compare-${scenario}-${index}.png`,
          data.getBuffer()
        );
      }
    }
  }

  fs.writeFileSync(
    `./results/${datetime}/report.html`,
    createReport(datetime, resultInfo)
  );
  fs.copyFileSync("./index.css", `./results/${datetime}/index.css`);

  console.log(
    "------------------------------------------------------------------------------------"
  );
  console.log("Execution finished. Check the report under the results folder");
  return resultInfo;
}
(async () => console.log(await executeTest()))();
