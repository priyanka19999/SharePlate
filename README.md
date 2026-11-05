# 🍲 SharePlate — Surplus Food Rescue Platform

SharePlate is a simple, intuitive food-rescue coordination web application built with **React (JavaScript)** and **Tailwind CSS**. It connects restaurants, caterers, hotels, and bakeries with extra edible food to verified NGOs, shelters, and community kitchens across Bengaluru.

---

## 🚀 Key Features

1. **Clean Navigation with Prominent Log In & Sign Up**:
   - Immediate **Log In** and **Sign Up** options at the top right of the navigation bar.
   - 1-Click Fast Demo Login buttons for **Food Donor (Restaurant)**, **NGO Shelter (Asha Care)**, and **Admin Ops**.
   - Clear tabs to easily switch between Sign In and Register.

2. **Zero-Confusion User Interface**:
   - **Hero Section**: Clear buttons for *"Donate Surplus Food"* and *"Find Food to Rescue"*.
   - **Live Food Feed**: Search by food item, category, or area (Indiranagar, Koramangala, HSR Layout, etc.). Veg and Non-Veg indicators.
   - **One-Click Claiming**: Verified shelters can claim surplus food and immediately receive a **4-digit collection PIN**.
   - **PIN-Verified Handover**: Secure handover protocol prevents theft or misallocation. The restaurant verifies the 4-digit PIN provided by the collection driver.
   - **My Dashboard**: Contextual dashboard for Donors, NGOs, and Admins showing live metrics, active pickups, and history.
   - **FSSAI Compliance**: Clean guidelines on temperature holding (>60°C hot, <5°C cold) and safe distribution.

---

## 🛠️ Tech Stack

- **Frontend**: React 19 (Pure JavaScript `.jsx`)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Storage**: LocalStorage persistence (instant updates without backend setup required)

---

## 💻 Running Locally

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.
