<p align="left">
  <img src="https://i.postimg.cc/xdCn1ZVX/wheel.png" width="100" />
</p>
<p align="left">
    <h1 align="left">WHEEL</h1>
</p>
<p align="left">
    <em>The objective is to develop a practical and accessible web app that integrates basic mutual fund investment recommendation features with straightforward expense tracking functionalities, allowing users to manage their investments and expenses more effectively and achieve their financial objectives with greater confidence.
</em>
</p>
<p align="left">
	<img src="https://img.shields.io/github/last-commit/KanielPinto/wheel?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/KanielPinto/wheel?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/KanielPinto/wheel?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="left">
		<em>Developed with the software and tools below.</em>
</p>
<p align="left">
	<img src="https://img.shields.io/badge/Chart.js-FF6384.svg?style=flat&logo=chartdotjs&logoColor=white" alt="Chart.js">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=flat&logo=PostCSS&logoColor=white" alt="PostCSS">
	<img src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style=flat&logo=Autoprefixer&logoColor=white" alt="Autoprefixer">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
  
	<br>
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
	<img src="https://img.shields.io/badge/MongoDB-47A248.svg?style=flat&logo=MongoDB&logoColor=white" alt="MongoDB">
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/Prisma-2D3748.svg?style=flat&logo=Prisma&logoColor=white" alt="Prisma">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>
<hr>

## 🔗 Quick Links

> - [📍 Overview](#-overview)
> - [📦 Features](#-features)
> - [📂 Repository Structure](#-repository-structure)
> - [🧩 Modules](#-modules)
> - [🚀 Getting Started](#-getting-started)
>   - [⚙️ Installation](#️-installation)
>   - [🤖 Running wheel](#-running-wheel)
>   - [🧪 Tests](#-tests)
> - [🛠 Project Roadmap](#-project-roadmap)
> - [👏 Acknowledgments](#-acknowledgments)

---

## 📍 Overview

The system architecture of our Mutual Fund Investment and Expense Tracking Web App consists of four main components:

> - [Frontend (Next.js)]
> - [Backend API (Flask and Celery)]
> - [Message Brokers and Workers (Redis and Celery)]
> - [Database (MongoDB)]


---

## 📦 Features


---

## 📂 Repository Structure

```sh
└── wheel/
    ├── README.md
    ├── next.config.mjs
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── prisma
    │   └── schema.prisma
    ├── public
    │   ├── dashboard_ss.png
    │   ├── next.svg
    │   ├── ship-wheel.svg
    │   ├── vercel.svg
    │   └── wheel.svg
    ├── src
    │   ├── app
    │   │   ├── api
    │   │   │   └── webhooks
    │   │   │       └── user
    │   │   ├── dashboards
    │   │   │   ├── expenses
    │   │   │   │   └── page.jsx
    │   │   │   ├── layout.tsx
    │   │   │   ├── my-wheel
    │   │   │   │   ├── page.jsx
    │   │   │   │   └── portfolio.js
    │   │   │   ├── news
    │   │   │   │   └── page.tsx
    │   │   │   ├── risk-assessment
    │   │   │   │   └── page.tsx
    │   │   │   └── stocks
    │   │   │       └── page.tsx
    │   │   ├── favicon.ico
    │   │   ├── forgot-password
    │   │   │   └── page.tsx
    │   │   ├── globals.css
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── providers.tsx
    │   │   ├── sign-in
    │   │   │   └── [[...sign-in]]
    │   │   │       └── page.tsx
    │   │   ├── sign-up
    │   │   │   └── [[...sign-up]]
    │   │   │       └── page.tsx
    │   │   └── utils
    │   │       └── cn.ts
    │   ├── components
    │   │   ├── CustomTableToolbar.jsx
    │   │   ├── DataGridWrapper.jsx
    │   │   ├── FeatureGrid.tsx
    │   │   ├── Footer.tsx
    │   │   ├── LineChart.jsx
    │   │   ├── Logo.tsx
    │   │   ├── MySunburstChart.jsx
    │   │   ├── Navbar.tsx
    │   │   ├── NewsCards.tsx
    │   │   ├── PriceSlider.tsx
    │   │   ├── RiskForm.tsx
    │   │   ├── Sidebar.tsx
    │   │   ├── Stat.jsx
    │   │   ├── UploadForm.js
    │   │   ├── background-gradient-animation.tsx
    │   │   ├── container-scroll-animation.tsx
    │   │   ├── expense-table
    │   │   │   ├── AddExpense.jsx
    │   │   │   ├── ChevronDownIcon.tsx
    │   │   │   ├── ExpenseTable.tsx
    │   │   │   ├── PlusIcon.tsx
    │   │   │   ├── SearchIcon.tsx
    │   │   │   ├── VerticalDotsIcon.tsx
    │   │   │   ├── data.ts
    │   │   │   ├── types.ts
    │   │   │   └── utils.ts
    │   │   ├── hero-highliight.tsx
    │   │   └── ui
    │   │       └── card-hover-effect.tsx
    │   ├── lib
    │   │   ├── db.ts
    │   │   ├── expense-form-schema.tsx
    │   │   └── risk-form-schema.tsx
    │   └── middleware.ts
    ├── tailwind.config.ts
    └── tsconfig.json
```

---

## 🚀 Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:

* **TypeScript**: `version x.y.z`

### ⚙️ Installation

1. Clone the wheel repository:

```sh
git clone https://github.com/KanielPinto/wheel
```

2. Change to the project directory:

```sh
cd wheel
```

3. Install the dependencies:

```sh
npm install
```
4. Create and populate the .env file

```sh
```
5. Generate prisma schema

```sh
npx prisma generate
```

### 🤖 Running wheel

Use the following command to run wheel:

```sh
npm run build && node dist/main.js
```



---

## 👏 Acknowledgments


[**Return**](#-quick-links)

---
