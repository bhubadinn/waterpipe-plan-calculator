import pipeLineData from "./pipeLineData.json" assert {type: "json"};

function checkHowManyDataNode(data) {
  if (Object.keys(data).length === 0) {
    return console.log("No data");
  }

  let node = 1;
  let nodeName = "";

  for (let i = 0; i < node; i++) {
    nodeName = Object.keys(data)[i];
    console.log(nodeName);
    if (pipeLineData[`${nodeName}`].length > 1) {
      node = pipeLineData[`${nodeName}`].length - 1;
      for (let i = 1; i < pipeLineData[`${nodeName}`].length; i++) {
        console.log(pipeLineData[`${nodeName}`][i]);
      }
    }
  }
  console.log("-------------------");
}

checkHowManyDataNode(pipeLineData);

// console.log(Object.keys(pipeLineData)[0]);
const nodeName = "a";
console.log(pipeLineData[`${nodeName}`]);
