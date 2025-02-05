/** @param {NS} ns */
import { fileList } from 'get-all-files.js';

import { allSolvers, solverList } from 'contracts/solvers.js'

export async function main(ns) {
  const FileList = Object.entries(fileList(ns, ".cct"));
  //{
  //  parentServer:
  //  contractType:
  //  data:
  //}

  let contractObject = {};

  FileList.forEach((file) => {
    if(file[1].length > 0){
      file[1].forEach((contract) => {
        const parentServer = file[0];

        if(ns.args[0] == undefined || ns.codingcontract.getContractType(contract, parentServer) == ns.args[0]){
          contractObject[contract] = {
            contractType: ns.codingcontract.getContractType(contract, parentServer),
            contractData: ns.codingcontract.getData(contract, parentServer),
            parent: parentServer
          }
          ns.tprint(contract, " | ", ns.codingcontract.getContractType(contract, parentServer), " | ", parentServer);

          //ns.tprint(solverList, " | ", Object.entries(solverList))
          
          const solver = solverList[contractObject[contract].contractType];

          //ns.tprint(solver);

          const solverString = toString(solver);

          if(solver !== undefined){
            ns.tprint("SOLVER EXISTS? Yes! :D");
            ns.tprint("Running Solver with Data: ", contractObject[contract].contractData);

            const result = allSolvers[solver](ns, contractObject[contract].contractData)

            ns.tprint("Result: ", result);
            ns.tprint("Attempting Contract with result...")

            let attemptResult = "";

            if(ns.args[0] == "attempt"){
              attemptResult = ns.codingcontract.attempt(result, contract, parentServer);
            }

            if(attemptResult !== ""){
              ns.tprint("SUCCESS! ", attemptResult)
            } else {
              ns.tprint("FAILURE! Tries Remaining: ", ns.codingcontract.getNumTriesRemaining(contract, parentServer))
            }
          } else {
            ns.tprint("SOLVER EXISTS? No :(")
          }

          ns.tprint("/////////////////////////////////////////////////////")
        }
      })
    }
  })

  //ns.tprint(contractObject)
}
