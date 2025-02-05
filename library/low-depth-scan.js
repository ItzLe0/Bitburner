/** @param {NS} ns */

export function serverScan(ns, server, exclusions) {
  let newServers = [];
  const lowDepthServers = ns.scan(server);

  if(lowDepthServers.length > 0){
    for(let serverIndex = 0; serverIndex < lowDepthServers.length; serverIndex++){
      if(exclusions.includes(lowDepthServers[serverIndex]) == false && lowDepthServers[serverIndex] !== "home"){
        newServers.push(lowDepthServers[serverIndex]);
      }
    }
    return newServers
  } else {
    return false
  }
}
