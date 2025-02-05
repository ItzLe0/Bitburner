/** @param {NS} ns */
import { getServerPath, fullServerList } from '/library/server-list.js';

export async function main(ns) {
  if(ns.args[0] == undefined){
    ns.tprint("ERROR! Must provide a SERVER DIRECTORY or string \"DISPLAY\".")
  } else {
    let path = getServerPath(ns);

    let command = "";

    if(ns.args[0] !== "display" && ns.args[1] == "link"){
      ns.tprint("///////////////////////////////////////////");

      path.splice(0, 1);

      path.forEach((server) => {
        command += "connect " + server[1] + "; "
      })

      command += "connect " + ns.args[0];

      navigator.clipboard.writeText(command);

      ns.tprint("Copied to Clipboard!")
    } else {
      if(ns.args[0] == "display"){
        ns.tprint("///////////////////////////////////////////");

        const servers = fullServerList(ns);

        let serverInfo = {};

        let combinedInfo = {
          totalServers: 0,
          accessedServers: 0,
          totalRAM: 0,
          availableRAM: 0,
          accessedTotalRAM: 0,
          accessedAvailableRAM: 0
        };

        servers.forEach((server) => {
          serverInfo[server] = {};

          serverInfo[server].accessed = ns.hasRootAccess(server);
          serverInfo[server].ports = ns.getServerNumPortsRequired(server);
          serverInfo[server].hackingLevel = ns.getServerRequiredHackingLevel(server);
          serverInfo[server].availableRAM = ns.getServerMaxRam(server) - ns.getServerUsedRam(server);
          serverInfo[server].RAM = ns.getServerMaxRam(server);
          serverInfo[server].currentMoney = ns.getServerMoneyAvailable(server);
          serverInfo[server].maxMoney = ns.getServerMaxMoney(server);

          combinedInfo.totalServers += 1;

          if(serverInfo[server].accessed){
            combinedInfo.accessedServers += 1;
            combinedInfo.accessedTotalRAM += serverInfo[server].RAM
            combinedInfo.accessedAvailableRAM += serverInfo[server].availableRAM
          }


          combinedInfo.totalRAM += serverInfo[server].RAM
          combinedInfo.availableRAM += serverInfo[server].availableRAM
        })

        ns.tprint("Servers Accessed: ", combinedInfo.accessedServers, " / ", combinedInfo.totalServers)
        ns.tprint("All RAM: ", Math.floor(combinedInfo.availableRAM), " / ", combinedInfo.totalRAM)
        ns.tprint("Accessed RAM: ", Math.floor(combinedInfo.accessedAvailableRAM), " / ", combinedInfo.accessedTotalRAM)
      }
    }
  }
}
