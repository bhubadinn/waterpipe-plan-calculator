import pipeLineData from "./pipeLineDataCUSA.json" assert {type: "json"};
import pipeLineData from "./pipeLineDataCUSB.json" assert {type: "json"};
import pipeLineData from "./pipeLineDataCUSC.json" assert {type: "json"};
import pipeLineData from "./pipeLineDataCUSD.json" assert {type: "json"};
import pipeLineData from "./pipeLineDataCUSE.json" assert {type: "json"};
import pipeLineData from "./pipeLineDataCUSF.json" assert {type: "json"};
import pipeLineData from "./pipeLineDataCUSG.json" assert {type: "json"};
import pipeLineData from "./pipeLineDataCUSH.json" assert {type: "json"};
import pipeLineData from "./pipeLineDataCUSI.json" assert {type: "json"};
import pipeLineData from "./pipeLineDataCUSJ.json" assert {type: "json"};
import pipeLineData from "./pipeLineDataCUSK.json" assert {type: "json"};

const waterHead = pipeLineData.waterHead;
const lowerVel = 5;
const upperVel = 9;
let remainWaterHead = waterHead;
let netPipeDiameter = [];
let optimumVelocity = [];

function calLossOfHead(param) {
  let resultQ = 0;
  let resultC = 0;
  let resultD = 0;
  let resultDown = 0;
  let resultFinal = 0;
  let result = [];

  resultQ = param * 0.0283168466;
  resultQ = Math.pow(resultQ, 1.852);
  resultQ = resultQ * 10.67;
  resultC = Math.pow(1.27, 1.852);

  for (let i = 0, lengthMeter = 0; i < pipeLineData.pipeDiameter.length; i++) {
    lengthMeter = pipeLineData.pipeDiameter[i] * 0.0254;
    resultD = Math.pow(lengthMeter, 4.8704);
    resultDown = resultC * resultD;
    resultFinal = resultQ / resultDown;
    result.push(resultFinal * 0.304);
  }
  return result;
}

function calOptimalResult(param, nodeIndex) {
  let result = [];
  let cal = 0;
  let prevCal = 0;
  let prevFlowVelocity = 0;
  let flowVelocity = 0;

  for (let i = 0; i < param.length; i++) {
    cal = (param[i] / 1000) * pipeLineData.nodeInfo[nodeIndex].pipeLength;
    if (cal < waterHead) {
      flowVelocity =
        1.318 *
        0.75 *
        Math.pow(pipeLineData.pipeDiameter[i], 0.63) *
        Math.pow(cal, 0.54);
      if (i === 0) {
        prevFlowVelocity = flowVelocity;
        prevCal = cal;
      }
      if (
        Math.abs(7 - flowVelocity) < Math.abs(7 - prevFlowVelocity) &&
        flowVelocity >= lowerVel &&
        flowVelocity <= upperVel
      ) {
        remainWaterHead = remainWaterHead + prevCal - cal;
        result.pop();
        netPipeDiameter.pop();
        optimumVelocity.pop();
        result.push(cal);
        netPipeDiameter.push(pipeLineData.pipeDiameter[i]);
        optimumVelocity.push(flowVelocity);
        prevCal = cal;
      }
    }
  }
  return result;
}

function main() {
  let lossOfHead = [];
  let optimalResult = [];

  for (let i = 0; i < pipeLineData.nodeInfo.length; i++) {
    console.log("");
    console.log(">>> node name: ", pipeLineData.nodeInfo[i].name);

    lossOfHead.push(calLossOfHead(pipeLineData.nodeInfo[i].flowrate));
    // console.log(lossOfHead[i]);

    optimalResult.push(calOptimalResult(lossOfHead[i], i));
    // console.log(optimalResult[i]);

    if (remainWaterHead > 1) {
      console.log(
        "----- optimum pipe diameter:   ",
        netPipeDiameter.toString(),
        "″"
      );
      console.log(
        "----- optimum velocity:       ~",
        optimumVelocity.toString(),
        "ft/s"
      );
      console.log(
        "----- remaining water head:   ~",
        remainWaterHead.toString(),
        "ft"
      );
      console.log("");
    } else {
      console.log("!!! Not enough water head pressure at this node :(");
      console.log("");
    }
  }
}

main();











