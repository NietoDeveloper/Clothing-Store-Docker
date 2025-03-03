import { createContext, useContext, useState } from "react";

const LBContext = createContext();
export const useLB = () => useContext(LBContext);

export const LBProvider = ({ children }) => {
  const lbServers = ["http://localhost:4000", "http://localhost:4001"];
  const [curLB, setCurLB] = useState(lbServers[0]);

  /* This function attempts to check the health of the current load balancer server.
  If it fails, the function tries the next server in the list.
  If all servers in the list fail, the function throws an error.
  The function updates the URL of the current load balancer, in case one fails.*/
  const lbHealthCheck = async () => {
    let count = 0;
    let tempCurLB = lbServers.indexOf(curLB);
    while (count < lbServers.length) {
      try {
        const res = await fetch(`${lbServers[tempCurLB]}/lb-health-check`);
        console.log(`Connected to ${lbServers[tempCurLB]}`);
        // update current load balancer state
        setCurLB(lbServers[tempCurLB]);
        return lbServers[tempCurLB];
      } catch {
        console.log(`Can't connect to ${lbServers[tempCurLB]}, redirecting`);
        tempCurLB = (tempCurLB + 1) % 2;
        count++;
      }
    }

    if (count == lbServers.length)
      throw new Error("All load balancers are down");
  };

  return (
    <LBContext.Provider value={{ lbHealthCheck }}>
      {children}
    </LBContext.Provider>
  );
};
