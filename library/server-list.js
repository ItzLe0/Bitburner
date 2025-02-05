/** @param {NS} ns */
import { serverScan } from '/library/low-depth-search.js';

export function fullServerList(ns) {
  let serverList = [];
  let newServers = [];

  function storeSearch(ns, list) {
    newServers = [];

    for(let serverIndex = 0; serverIndex < list.length; serverIndex++){
      newServers = newServers.concat(serverScan(ns, list[serverIndex], serverList));
      serverList = serverList.concat(serverScan(ns, list[serverIndex], serverList));
    }
  }

  newServers = ["home"];

  ns.print(serverList, " ++++ ", newServers)

  function depthSearch(ns, depth){
    for(let depthCounter = 1; depthCounter <= depth; depthCounter++){
      storeSearch(ns, newServers)
      ns.print("DEPTH-", depthCounter, ": ", serverList, " ++++ ", newServers)
    }
  }

  depthSearch(ns, 15);

  return serverList
}

export function getServerPath(ns, target) {
  let serverList = [];
  let newServers = [];
  let servers = {};
  let serverPathing = {};

  function storeSearch(ns, list) {
    newServers = [];

    for(let serverIndex = 0; serverIndex < list.length; serverIndex++){
      const parent = list[serverIndex];
      const results = serverScan(ns, parent, serverList);

      serverPathing[parent] = results

      newServers = newServers.concat(serverScan(ns, list[serverIndex], serverList));
      serverList = serverList.concat(serverScan(ns, list[serverIndex], serverList));

      results.forEach((server) => {
        if(parent == "home"){
          servers[server] = ["home"]
          ns.print(server, ": ", servers[server])
        } else {
          servers[server] = [parent]

          ns.print(parent, " >> ", server)

          let serverParent = parent
          let parents = [serverParent];

          ns.print(servers[serverParent], " >> ", parents)

          parents.unshift(...servers[serverParent])

          ns.print(parents)

          serverParent = parents[0]

          if(serverParent !== "home"){
            while(serverParent !== "home"){
              ns.print(servers[serverParent], " >> ", parents)

              parents.unshift(servers[serverParent])

              ns.print(parents)

              serverParent = parents[0]
            }
          }


          servers[server] = parents

          ns.print(servers[server], " => ", parents)

          ns.print("/////////////////////////////////")
        }
      })
    }
  }

  newServers = ["home"];

  ns.print(serverList, " ++++ ", newServers)

  function depthSearch(ns, depth){
    for(let depthCounter = 1; depthCounter <= depth; depthCounter++){
      storeSearch(ns, newServers)
      ns.print("DEPTH-", depthCounter, ": ", serverList, " ++++ ", newServers)
    }
  }

  depthSearch(ns, 20);

  if(ns.args[0] == undefined){
    // return servers
  } else {
    if(ns.args[0] == "display"){
      const spacing = "  "

      function findFamily(ns, generation, descendant, branch, branchPoints){
        let output = spacing.repeat(generation) + branch + " " + descendant;
        let outputSpacing

        if(serverPathing[descendant].length > 0){
          outputSpacing = spacing.repeat(generation) + " " + " ┃ ";
        } else {
          outputSpacing = spacing.repeat(generation) + "  ";
        }


        branchPoints.forEach((branchIndex) => {
          const startIndex = branchIndex[1] * 2 + 2

          if(output.charAt(startIndex) == " "){
            output = output.substring(0, startIndex) + "┃" + output.substring(startIndex + 1)
          }

          outputSpacing = outputSpacing.substring(0, startIndex) + "┃" + outputSpacing.substring(startIndex + 1);
          
          if(serverPathing[descendant].length !== 0){
            outputSpacing = outputSpacing.substring(0, startIndex) + "┃" + outputSpacing.substring(startIndex + 1)
          }
        })

        ns.tprint(output);

        if(descendant !== "home"){
          const growTime = ns.getGrowTime(descendant);
          const maxMoney = ns.getServerMaxMoney(descendant);
          const currentMoney = ns.getServerMoneyAvailable(descendant);
          const hackTime = ns.getHackTime(descendant);

          const growthScore = ns.getServerGrowth(descendant) / growTime;
          const cashScore = (maxMoney - currentMoney) / growthScore;

          ns.tprint(outputSpacing, "| ROOT ACCESS? ", ns.hasRootAccess(descendant), ", PORTS REQUIRED: ", ns.getServerNumPortsRequired(descendant));
          ns.tprint(outputSpacing, "| HACKING LEVEL: ", ns.getServerRequiredHackingLevel(descendant));
          ns.tprint(outputSpacing, "| MAX MONEY: ", maxMoney, ", CURRENT MONEY: ", currentMoney, " SCORE: ", cashScore);
          ns.tprint(outputSpacing, "| SCORE: ", Math.round((growTime * (maxMoney / hackTime)) - cashScore));
          ns.tprint(outputSpacing, "+ DESCENDANTS: ", serverPathing[descendant].length, ", DEPTH: ", generation)
        }


        const tree = serverPathing[descendant]

        if(tree.length > 0){
          tree.forEach((nextChild, branchIndex) => {
            if(tree[branchIndex + 1] == undefined){
              findFamily(ns, generation + 1, nextChild, "┗", branchPoints)
            } else {
              
              findFamily(ns, generation + 1, nextChild, "┣", branchPoints.concat([[tree[branchIndex + 1], generation]]))
            }
          })
        }
      }

      //┃┣

      findFamily(ns, 0, "home", "┗", []);
    } else {
      const spacing = "  "
      const pathing = Object.entries(servers[ns.args[0]])

      pathing.forEach((server) => {
        ns.tprint(spacing.repeat(server[0]), "┗ ", server[1])
      })

      ns.tprint(spacing.repeat(pathing.length), "┗ ", ns.args[0]);
      return(Object.entries(servers[ns.args[0]]));
    }
  }
}
