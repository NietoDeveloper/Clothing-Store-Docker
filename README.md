# DazzleD - Distributed Fashion E-commerce System
## Project description
Here's the url to the website user interface: [dazzledd.netlify.app](https://dazzledd.netlify.app)

DazzleD is a distributed fashion e-commerce system that specializes in dropping limited edition clothing. There will be a lot of traffic when the limited edition items are released, so a distributed system is used to divide the workload and make the system highly scalable. The project is inspired by websites such as yeezysupply.com and supreme.com.
## High-level architecture
![image](https://user-images.githubusercontent.com/60798675/235328631-5561e350-6274-4e1f-8046-0e4f3d033205.png)

## Project snapshots
<table>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/60798675/235094114-abc6b019-e273-42a2-87f0-fc8b0ddf18ac.png" width="100%">
    </td>
  </tr>
  <tr>
    <td>
       <img src="https://user-images.githubusercontent.com/60798675/235096515-7fd9037e-f0a8-4c1d-954b-24b350d646e1.png" width="100%">
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://user-images.githubusercontent.com/60798675/235093430-522ee206-dbd7-4118-9981-10c1eae9e920.png" width="49%" height=auto>
      <img src="https://user-images.githubusercontent.com/60798675/235093944-58e4c71f-2fd8-492c-8793-dd008be07062.png" width="49%" height=870>
    </td>
  </tr>
  <tr>
    <td>
       <img src="https://user-images.githubusercontent.com/60798675/235096886-2cbda11d-ca3b-4d65-9320-299675e0f606.png" width="100%">
    </td>
  </tr>
  <tr>
    <td>
       <img src="https://user-images.githubusercontent.com/60798675/235097018-e81815cc-fac2-4a1d-b9fe-251f9de0cc06.png" width="100%">
    </td>
  </tr>
</table>

## How to run the system
### Local set up
1. Open three terminals (minimum) and navigate to the project folder in each one.
2. In the first terminal, cd into the client folder and run `npm run dev` to start the client side.
3. In the second terminal, cd into the server folder and run `node loadbalancer 4000` to start the load balancer on port 4000.
4. In the third terminal, run `node server 5000` to start the server on port 5000.
5. Run `node reset` to initialize the server databases with the default data.
6. Go to your web browser and navigate to `localhost:5173` to view the client side.

### Run with docker-compose
1. In server/loadbalancer.js, uncomment
```
const servers = [
{ url: "http://backend1:5000", isHealthy: true },
{ url: "http://backend2:5001", isHealthy: true },
{ url: "http://backend3:5002", isHealthy: true },
];
```
and comment out
```
const servers = [
  { url: "http://localhost:5000", isHealthy: true },
  { url: "http://localhost:5001", isHealthy: true },
  { url: "http://localhost:5002", isHealthy: true },
];
```
2. docker-compose build
3. docker-compose up

## FYI

- You can run any combination of up to 2 load balancers and 3 servers on your local machine.
- Current load balancer ports are 4000 and 4001.
- Current server ports are 5000, 5001, and 5002.
- You can also open another terminal, cd to the client folder, and run `npm run dev` to run a secondary instance of the client side on your local machine. In this case, navigate to `localhost:5174` to view the secondary client.
