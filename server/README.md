<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=200&section=header&text=CLOTHING%20STORE%20%E2%80%94%20SERVER&fontSize=44&fontColor=FFD700&fontAlignY=42&desc=⚡%20Node.js%20%2B%20Express%20REST%20API%20%C2%B7%20Load-Balanced%20Backend&descAlignY=62&descColor=DCDCDC&animation=fadeIn" width="100%"/>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Share+Tech+Mono&weight=700&size=18&duration=2800&pause=900&color=FFD700&center=true&vCenter=true&width=740&lines=%E2%9A%A1+RESTful+API+for+Products+%26+Orders;%F0%9F%9B%92+CRUD+for+Products%2C+Users%2C+Orders;%F0%9F%94%8C+Connects+to+React+Client;%F0%9F%90%B3+Runs+Behind+a+Load+Balancer)](https://git.io/typing-svg)

<br/>

<p align="center">
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
  </a>
  <a href="https://expressjs.com/">
    <img src="https://img.shields.io/badge/Framework-Express.js-lightgrey?style=for-the-badge&logo=express"/>
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge"/>
  </a>
</p>

<p align="center">
  <a href="https://github.com/NietoDeveloper/Clothing-Store-Docker/tree/main/server">
    <img src="https://img.shields.io/badge/📂_Source-NietoDeveloper%2FClothing--Store--Docker%2Fserver-000000?style=for-the-badge&logo=github&logoColor=FFD700"/>
  </a>
</p>

</div>

---

## 📋 Overview

The **Clothing Store Server** is the backend component of the Clothing Store e-commerce project, built with **Node.js**. This server resides in the `server` directory within the main project folder, which is divided into `client` and `server` subdirectories.

---

## 🗂️ Project Structure

```text
server/
├── data/          # Seed and static data
├── db/             # Database connection and data access
└── routes/          # RESTful API endpoint definitions
```

---

## 🔄 API Request Flow

```mermaid
flowchart LR
    A([⚖️ Load Balancer]) -->|Routes Request| B[Routes]
    B --> C[Business Logic]
    C -->|CRUD| D[(db\nProducts / Users / Orders)]
    D -->|Response| E([📦 JSON Payload])
    E --> F[React Client]

    style A fill:#FFD700,color:#000,stroke:#FFD700
    style C fill:#0a0a0a,color:#FFD700,stroke:#FFD700
    style D fill:#47A248,color:#fff,stroke:#47A248
    style F fill:#000,color:#FFD700,stroke:#FFD700
```

---

## ✨ Features

- **RESTful API:** For product and order management.
- **Client Integration:** Handles client requests for the e-commerce platform.
- **CRUD Operations:** Full support for products, users, and orders.

---

## 🛠️ Technologies

<div align="center">

| Technology | Role |
|:-----------|:-----|
| **Node.js** | Runtime environment for server-side logic |
| **Express** | Web framework for handling API routes |

</div>

---

## 🚀 Installation

**Step 1 — Clone the repository**

```bash
git clone https://github.com/NietoDeveloper/Clothing-Store-Docker
```

**Step 2 — Navigate to the server directory**

```bash
cd server
```

**Step 3 — Install dependencies**

```bash
npm install
```

**Step 4 — Start the server**

```bash
npm start
```

---

## 📖 Usage

- The server runs on `http://localhost:3000` by default.
- Connects with the client app in the `client` directory.
- Provides endpoints for product listings, cart management, and order processing.

---

## 🗂️ Project Structure Notes

- **`client/`:** Frontend application.
- **`server/`:** Backend server (this repository).

---

## 🤝 Contributing

Contributions are welcome! Fork the repository and submit a pull request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Manuel Nieto (NietoDeveloper)**

<div align="center">

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=120&section=footer&animation=fadeIn" width="100%"/>

</div>
