# 🧩 DigitalH - CRUD Dashboard Challenge

A modern, full-featured **CRUD Operations Dashboard** built with **Next.js**, **Shadcn UI**, **NextAuth.js**, and **Zustand**. This project was developed as a solution for a frontend challenge focusing on advanced state management, authentication, and Reusable components.

---

## 🚀 Overview

This dashboard allows users to manage a list of products with full CRUD functionality:

- ✅ Create new products  
- 🔍 Read product details  
- ✏️ Update existing products  
- 🗑️ Delete products  

It also includes features like filtering, sorting, search, and pagination to improve usability and performance.

---

## 📌 Tech Stack

| Category            | Tools & Libraries                                                                 |
|---------------------|------------------------------------------------------------------------------------|
| **Framework**        | [Next.js](https://nextjs.org)                                                     |
| **Design System**    | [Shadcn UI](https://ui.shadcn.com/) using [Radix UI](https://www.radix-ui.com/)  |
| **Authentication**   | [NextAuth.js](https://next-auth.js.org/) with Prisma Adapter                     |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand)                                      |
| **API & HTTP**       | [Axios](https://axios-http.com/) with interceptors                               |
| **Forms & Validation**| [React Hook Form](https://react-hook-form.com/) + [Zod](https://github.com/colinhacks/zod) |
| **Internationalization** | [i18next](https://www.i18next.com/) + `react-i18next`                           |
| **Styling**          | Tailwind CSS + `tailwind-variants`, `tw-animate-css`, `clsx`                     |
| **Date Handling**    | [Day.js](https://day.js.org/)                                                     |
| **Utilities**        | `react-select`, `react-toastify`, `react-medium-image-zoom`, `xlsx`              |
| **Types**            | TypeScript                                                                        |
| **Dev Tools**        | Storybook, Biome, TypeScript, ESLint                                              |

---

## ✨ Features

### 🔐 Authentication

- Users can log in using Google or GitHub accounts
- Session management with JWT tokens
- Uses NextAuth.js with Prisma adapter for scalability
- Redirect to dashboard after successful login
- Graceful handling of login errors
- Logout functionality
- protected routes for dashboard access

### 📊 Dashboard

- View products in a table with:
  - Actions: Edit | Delete | View Details
  - Hover & interactive animations
  - Search by Title
  - Pagination
  - Sorting
  - Filter by Category and Exact Price

### ➕ Add Product

- Modal to add new products
- Form validation using Zod
- Uses `react-hook-form`

### ✏️ Edit Product

- Edit existing product using same modal as Add Product
- Form pre-filled with product data
- Validated before submission

### 🗑️ Delete Product

- Confirmation modal before delete
- Deletes from mock API

### 🔍 View Details

- Opens modal with full product info

---

## 🔗 API Mock

Mock API used:  
👉 [https://fakeapi.platzi.com/](https://fakeapi.platzi.com/)


---
