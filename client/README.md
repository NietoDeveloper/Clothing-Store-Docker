<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=200&section=header&text=CLOTHING%20STORE%20%E2%80%94%20FRONTEND&fontSize=40&fontColor=FFD700&fontAlignY=42&desc=👕%20React%20%2B%20Vite%20%2B%20Tailwind%20CSS%20%C2%B7%20Load-Balanced%20Client&descAlignY=62&descColor=DCDCDC&animation=fadeIn" width="100%"/>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Share+Tech+Mono&weight=700&size=18&duration=2800&pause=900&color=FFD700&center=true&vCenter=true&width=740&lines=%E2%9A%9B%EF%B8%8F+React+%2B+Vite+%C2%B7+Fast+Dev+%26+Build;%F0%9F%8E%A8+Tailwind+CSS+Utility-First+Styling;%F0%9F%94%8C+Connects+to+Load-Balanced+Backend;%F0%9F%93%B1+Responsive+Storefront+UI)](https://git.io/typing-svg)

<br/>

<p align="center">
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=000"/>
  </a>
  <a href="https://vitejs.dev/">
    <img src="https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  </a>
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/Runtime-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-Styling-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge"/>
  </a>
</p>

<p align="center">
  <a href="https://github.com/NietoDeveloper/Clothing-Store-Docker/tree/main/client">
    <img src="https://img.shields.io/badge/📂_Source-NietoDeveloper%2FClothing--Store--Docker%2Fclient-000000?style=for-the-badge&logo=github&logoColor=FFD700"/>
  </a>
</p>

</div>

---

## 📋 Overview

The **frontend** for the E-commerce Clothing Store. Built with **React**, **Vite**, **Node.js**, and **Tailwind CSS**, providing a fast, responsive storefront UI that connects to the project's load-balanced backend.

---

## 🗂️ Project Structure

```text
client/
├── public/          # Static files served directly
└── src/
    ├── assets/        # Images and static resources
    ├── components/     # Reusable React components
    ├── pages/           # Page-level components
    └── utils/            # Helper functions
```

---

## 🔄 Client-Server Connection

```mermaid
flowchart LR
    A([👤 Shopper]) -->|Browses| B[React Client :5173]
    B -->|API Request| C[⚖️ Load Balancer :4000]
    C -->|Route to Healthy Server| D([🛰️ Backend])

    style A fill:#FFD700,color:#000,stroke:#FFD700
    style B fill:#06B6D4,color:#000,stroke:#06B6D4
    style C fill:#0a0a0a,color:#FFD700,stroke:#FFD700
    style D fill:#000,color:#FFD700,stroke:#FFD700
```

---

## 🛠️ Stack

<div align="center">

| Technology | Role |
|:-----------|:-----|
| **React** | JavaScript library for building user interfaces |
| **Vite** | Fast frontend build tool |
| **Node.js** | JavaScript runtime for the development environment |
| **Tailwind CSS** | Utility-first CSS framework for styling |

</div>

---

## 🚀 Setup Instructions

**Step 1 — Clone the repository**

```bash
git clone https://github.com/NietoDeveloper/Clothing-Store-Docker
```

**Step 2 — Navigate to the frontend directory**

```bash
cd frontend
```

**Step 3 — Install dependencies**

```bash
npm install
```

**Step 4 — Start the development server**

```bash
npm run dev
```

---

## 📦 Build

To create a production build:

```bash
npm run build
```

---

## 🗂️ Project Structure Notes

- **`src/`:** Contains React components, styles, and assets.
- **`public/`:** Static files served directly.
- **`vite.config.js`:** Vite configuration file.

---

## ℹ️ Notes

- Ensure the backend API is running and configured correctly.

---

## 👨‍💻 Author

**Manuel Nieto (NietoSoftwareDeveloper)**

<div align="center">

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=120&section=footer&animation=fadeIn" width="100%"/>

</div>
