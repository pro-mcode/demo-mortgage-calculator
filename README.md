## 🌐 Adedamola Maxwell – 🏠 Mortgage Calculator Project

A responsive Mortgage Calculator built with HTML, Tailwind CSS, and JavaScript.
It allows users to calculate their monthly repayments and total repayment over a loan term, with clear visual feedback and form validation.

## 🚀 Live Demo

## 🔗 Live Site: https://demo-mortgage-calculatorr.netlify.app

## 💻 GitHub Repo: [https://github.com/pro-mcode/demo-mortgage-calculator] (https://github.com/pro-mcode/demo-mortgage-calculator)

## 🚀 Features

## ✅ Dynamic Form Validation

Highlights empty or invalid fields in red (bg-error, border-error).

Clears errors automatically as users type or correct input.

## ✅ Real-Time Input Formatting

Automatically formats the mortgage amount with commas as the user types (e.g. 120000 → 120,000).

## ✅ Supports Two Mortgage Types

Repayment — calculates standard amortized monthly payments.

Interest-Only — calculates only monthly interest repayments.

## ✅ Interactive UI

Clear button resets all fields, messages, and visual states.

Results and default views toggle dynamically (default-page ↔ result-page).

## ✅ Responsive Design

Optimized for mobile, tablet, and desktop via Tailwind breakpoints (xs → xl).

## 🧩 Tech Stack

HTML5 — Structure

Tailwind CSS — Styling and responsive layout

JavaScript (Vanilla) — Form logic and calculations

## 🛠️ Tailwind Configuration

Custom color palette and safelisted classes:

// tailwind.config.js
module.exports = {
content: ["./*.html", "./js/**/*.js"],
theme: {
extend: {
colors: {
primary: "#E3F4FC",
secondary: "#D6E21F",
custom: "#102D3D",
error: "#FF0000",
},
},
},
safelist: [
"bg-error",
"border-error",
"focus-within:border-error",
"group-focus-within:bg-error",
],
plugins: [],
};

## 📂 Project Structure

mortgage-calculator/
│
├── index.html # Main HTML structure
├── css/
│ ├── output.css # Tailwind compiled stylesheet
│
├── js/
│ ├── index.js # All calculation and validation logic
│
├── assets/
│ ├── images/ # Icons and illustration
│ └── favicon-32x32.png
│
├── tailwind.config.js # Tailwind CSS configuration
└── package.json # Dependencies and build scripts

## ⚙️ Setup & Build Instructions

## 1️⃣ Install Dependencies

Make sure Node.js and npm are installed. Then:

npm install -D tailwindcss
npx tailwindcss init

## 2️⃣ Configure Tailwind

Update your tailwind.config.js with your content paths and safelist.

## 3️⃣ Generate CSS

Run Tailwind CLI to watch or build styles:

npx tailwindcss -i ./css/input.css -o ./css/output.css --watch

## 4️⃣ Open in Browser

Simply open index.html in your browser, or use a local server like Live Server in VS Code.

## 🧮 Core Logic Overview

## 🧠 calculateMortgage()

Handles both repayment and interest-only calculations:

const monthlyRate = rate / 100 / 12;
const months = years \* 12;

if (type === "repayment") {
const factor = Math.pow(1 + monthlyRate, months);
monthlyPayment = (amount _ monthlyRate _ factor) / (factor - 1);
totalPayment = monthlyPayment _ months;
totalInterest = totalPayment - amount;
} else {
monthlyPayment = amount _ monthlyRate;
totalInterest = monthlyPayment \* months;
totalPayment = totalInterest;
}

## 💡 Validation Logic

Each field is validated through inputCheck():

Empty fields trigger a red border and error message.

As user types, clearBorderBgErr() restores normal state.

if (!amount) {
errorMsg[0].innerHTML = "This field is required";
errBorder[0].classList.add("border-error");
errBg[0].classList.add("bg-error", "text-white");
}

## 🔄 Reset Functionality

The “Clear All” button resets:

All input values and selected radio buttons

Error messages

Background and border states

Displays default view again

## 🖥️ Screenshots (optional section for GitHub)

Default empty state
![Default empty state!](https://file%2B.vscode-resource.vscode-cdn.net/var/folders/1f/qcd_m2yj7vx8q4f62vbn88pr0000gn/T/TemporaryItems/NSIRD_screencaptureui_IQwTKc/Screenshot%202025-10-24%20at%2001.12.43.png?version%3D1761264785195)

Validation state
![Validation state](https://file%2B.vscode-resource.vscode-cdn.net/var/folders/1f/qcd_m2yj7vx8q4f62vbn88pr0000gn/T/TemporaryItems/NSIRD_screencaptureui_kuTpt4/Screenshot%202025-10-24%20at%2001.14.18.png?version%3D1761264865111)

Calculation results
![Calculation results](https://file%2B.vscode-resource.vscode-cdn.net/var/folders/1f/qcd_m2yj7vx8q4f62vbn88pr0000gn/T/TemporaryItems/NSIRD_screencaptureui_XXvDvb/Screenshot%202025-10-24%20at%2001.15.57.png?version%3D1761264964001)

## 📜 License

This project is open-source under the MIT License — feel free to use and modify it.

## 🧑‍💻 Author

Adedamola Maxwell
Frontend Engineer & Blockchain Enthusiast

## 💼 GitHub: [https://github.com/pro-mcode]

## 📧 Email: [promcode01@gmail.com]

### 💡 “Building fast, responsive, and accessible web experiences — one project at a time.”
