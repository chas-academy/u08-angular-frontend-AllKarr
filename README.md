# U08 Finance Frontend — Angular

This is the frontend for the U08 Finance Manager project built in **Angular**. It connects to a custom-built **Finance API** and supports full **CRUD operations** for transactions and budgets.

## 🌐 Live Demo

👉 [Live Site](https://finance-manager-angular.netlify.app/)

## 📦 Backend API

👉 [API GitHub Repo](https://github.com/AllKarr/Finance-API)

This API handles:
- Users (Register/Login)
- Transactions (Create, Read, Update, Delete)
- Budgets (Create, Read, Update, Delete)

## 🧰 Technologies Used

- Angular (v17)
- TypeScript
- RxJS
- HTML5/CSS3
- Deployed via Netlify

## 📌 Features

- Full **CRUD functionality**:
  - Get all / Get one / Create / Update / Delete for Transactions and Budgets
- API integration using Angular **services** and **HttpClient**
- **Responsive layout** working on both desktop and mobile (iPhone 13 tested)
- **Routing** between different pages (e.g., Transactions, Budgets)
- **RxJS observables** for handling asynchronous API calls
- Basic **form validation**
- Minimalistic and clean **UX/UI design**
- Fully **deployed and live**

## 🧪 Tests

This app includes basic unit tests using Angular’s testing framework:

- At least **3 tests** implemented
- Covers at least one Angular component

To run the tests:

```bash
ng test
```

## 📂 Installation

To get started with the project locally:

1. Clone the repository:

```bash
git clone https://github.com/chas-academy/u08-angular-frontend-AllKarr.git
cd u08-angular-frontend-AllKarr
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
ng serve
```
