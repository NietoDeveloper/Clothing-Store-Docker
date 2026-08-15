<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=220&section=header&text=E-COMMERCE%20CLOTHING%20STORE&fontSize=44&fontColor=FFD700&fontAlignY=42&desc=👕%20MERN%20Storefront%20%C2%B7%20Dockerized%20Load-Balanced%20Architecture&descAlignY=62&descColor=DCDCDC&animation=fadeIn" width="100%"/>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Share+Tech+Mono&weight=700&size=20&duration=2800&pause=900&color=FFD700&center=true&vCenter=true&width=760&lines=%F0%9F%9B%92+Full-Stack+MERN+E-Commerce+Storefront;%F0%9F%90%B3+Dockerized+%C2%B7+Multi-Server+Architecture;%E2%9A%96%EF%B8%8F+Custom+Load+Balancer+%C2%B7+Health+Checks;%F0%9F%94%84+Scalable+Backend+%C2%B7+Up+to+3+Servers;%F0%9F%8F%86+%231+GitHub+Committer+in+Colombia)](https://git.io/typing-svg)

<br/>

<p align="center">
  <a href="https://github.com/NietoDeveloper">
    <img src="https://img.shields.io/badge/Engineer-Manuel%20Nieto-blue?style=for-the-badge&logo=github"/>
  </a>
  <a href="https://committers.top/colombia#NietoDeveloper">
    <img src="https://img.shields.io/badge/Committers.top-%231%20Colombia-gold?style=for-the-badge"/>
  </a>
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=000"/>
  </a>
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
  </a>
  <a href="https://www.docker.com/">
    <img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge"/>
  </a>
</p>

<p align="center">
  <a href="https://github.com/NietoDeveloper/Clothing-Store-Docker">
    <img src="https://img.shields.io/badge/📂_Source-NietoDeveloper%2FClothing--Store--Docker-000000?style=for-the-badge&logo=github&logoColor=FFD700"/>
  </a>
</p>

</div>

---

## 📋 Project Description

An **E-commerce Clothing Store** built as a full-stack application with a separated client and server, engineered for horizontal scalability through a custom Node.js load balancer and Docker Compose orchestration. Multiple backend instances can be run concurrently behind the load balancer, with built-in health checks routing traffic to available servers.

---

## 🗂️ Project Structure

```text
ClothingStore/
├── client/                # React frontend
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       └── utils/
└── server/                # Node.js backend + load balancer
    ├── data/
    ├── db/
    └── routes/
```

---

## 🏗️ System Architecture

```mermaid
flowchart LR
    A([👤 Client :5173]) -->|Requests| B[Load Balancer :4000]
    B -->|Health Check| C{Healthy Servers?}
    C -->|backend1 :5000| D[(Server 1)]
    C -->|backend2 :5001| E[(Server 2)]
    C -->|backend3 :5002| F[(Server 3)]
    D --> G[(Database)]
    E --> G
    F --> G

    style A fill:#FFD700,color:#000,stroke:#FFD700
    style B fill:#0a0a0a,color:#FFD700,stroke:#FFD700
    style C fill:#06B6D4,color:#000,stroke:#06B6D4
    style G fill:#47A248,color:#fff,stroke:#47A248
```

---

## 🛠️ Technology Stack

<div align="center">

| Layer | Technologies |
|:------|:-------------|
| 🎨 **Frontend** | React, Vite |
| ⚙️ **Backend** | Node.js |
| ⚖️ **Load Balancing** | Custom Node.js Load Balancer with Health Checks |
| 🐳 **DevOps** | Docker, Docker Compose |

</div>

---

## 🚀 How to Run the System

### 🖥️ Local Setup

**Step 1 — Open three terminals (minimum)** and navigate to the project folder in each one.

**Step 2 — Start the client**

```bash
cd client
npm run dev
```

**Step 3 — Start the load balancer**

```bash
cd server
node loadbalancer 4000
```

**Step 4 — Start the server**

```bash
node server 5000
```

**Step 5 — Initialize the databases**

```bash
node reset
```

**Step 6 — View the app**

Navigate to `localhost:5173` in your browser.

---

### 🐳 Run with Docker Compose

**Step 1 — Configure `server/loadbalancer.js`**

Uncomment:

```javascript
const servers = [
  { url: "http://backend1:5000", isHealthy: true },
  { url: "http://backend2:5001", isHealthy: true },
  { url: "http://backend3:5002", isHealthy: true },
];
```

And comment out:

```javascript
const servers = [
  { url: "http://localhost:5000", isHealthy: true },
  { url: "http://localhost:5001", isHealthy: true },
  { url: "http://localhost:5002", isHealthy: true },
];
```

**Step 2 — Build the containers**

```bash
docker-compose build
```

**Step 3 — Launch the ecosystem**

```bash
docker-compose up
```

---

## ℹ️ FYI

- You can run any combination of up to 2 load balancers and 3 servers on your local machine.
- Current load balancer ports are `4000` and `4001`.
- Current server ports are `5000`, `5001`, and `5002`.
- You can also open another terminal, `cd` into the `client` folder, and run `npm run dev` to run a secondary instance of the client side on your local machine. In this case, navigate to `localhost:5174` to view the secondary client.

---

## 👨‍💻 Author

**Manuel Nieto (NietoDeveloper)**

---

## 📄 License

This project is licensed under the **MIT License**.

<div align="center">

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=120&section=footer&animation=fadeIn" width="100%"/>

</div>
