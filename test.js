import pipeLineData from "./pipeLineData2.json" assert {type: "json"};

function calLossOfHead(q) {
  let resultQ = 0;
  let resultC = 0;
  let resultD = 0;
  let resultDown = 0;
  let resultFinal = 0;
  let result = [];

  resultQ = q * 0.0283168466;
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
  return console.log(result);
}

function main() {
  for (let i = 0; i < pipeLineData.nodeInfo.length; i++) {
    console.log(pipeLineData.nodeInfo[i].name);
    calLossOfHead(pipeLineData.nodeInfo[i].flowrate);
  }
}

main();
