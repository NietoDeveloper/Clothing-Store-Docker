# E-commerce Clothing Store

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
