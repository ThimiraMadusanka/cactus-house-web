# 🌵 Cactus House – Frontend

This is the **frontend** of the "Cactus House" full-stack web application, built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Axios**. It allows users to explore and purchase cactus plants, interact with a chatbot, and manage their accounts through a full-featured user and admin dashboard.

## 🚀 Features

### 🔓 Public Pages
- **Home** – Introductory landing page
- **Our Plants** – Product listing of cactus plants
- **Contact Us** – Contact form to send user messages

> 💬 **Chatbot** powered by OpenAI is available on public pages

### 👤 Authentication
- **Sign In / Sign Up**
- **Forget Password / Reset Password**

### 👥 User Dashboard
- **Dashboard** – Summary cards (order status), daily purchasing count (Chart.js)
- **Profile** – View and update profile info (details & password)
- **Cart** – View cart items, remove items, place orders
- **Orders** – View order history, update order details, remove orders

### 🛠️ Admin Dashboard
- **Dashboard** – Summary cards (orders, users, products, contacts), bar chart for daily purchases (Chart.js)
- **Orders** – Table of orders, change status, view details
- **Products** – Manage product listings (view, update, change status, remove)
- **Contacts** – View user messages, change contact status
- **Users** – Manage users (add, activate/deactivate, reset password, remove)
- **Profile** – Admin profile management and OpenAI content editor

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Charts:** Chart.js
- **Chatbot:** Integrated with OpenAI

## 🧪 Getting Started

```bash
git clone https://github.com/ThimiraMadusanka/cactus-house-web.git
cd cactus-house-web
npm install
npm run dev
