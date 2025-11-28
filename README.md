## E-commerce Clothing Store

## Project description

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

## Manuel Nieto

## NietoDeveloper

### 2024
