/* 
// 🔹 Get elements
const clearButtonEl = document.getElementById("clear-inputs");
const amountInput = document.getElementById("mortgage-amount");
const yearsInput = document.getElementById("mortgage-years");
const rateInput = document.getElementById("mortgage-rate");
const typeInputs = document.querySelectorAll('input[name="mortgageType"]');
const submitButtonEl = document.getElementById("calculate-mortgage");
const errorMsg = document.querySelectorAll(".err-msg");
const resultEl = document.getElementById("mortgage-result");

// 🔹 Format mortgage amount as user types
amountInput.addEventListener("input", (e) => {
  let value = amountInput.value.replace(/,/g, "");
  if (value === "" || isNaN(value)) {
    amountInput.value = "";
    return;
  }

  const selectionStart = amountInput.selectionStart;
  const oldLength = amountInput.value.length;

  const formatted = parseInt(value, 10).toLocaleString();
  amountInput.value = formatted;

  const newLength = formatted.length;
  const diff = newLength - oldLength;
  amountInput.setSelectionRange(selectionStart + diff, selectionStart + diff);
});

// 🔹 Validation
function inputCheck() {
  const errBorder = document.querySelectorAll(".error-border");
  const errBg = document.querySelectorAll(".error-bg");

  const amount = parseFloat(amountInput.value.replace(/,/g, "")) || 0;
  const years = parseFloat(yearsInput.value) || 0;
  const rate = parseFloat(rateInput.value) || 0;
  const selected = document.querySelector('input[name="mortgageType"]:checked');

  let valid = true;

  // Amount
  if (!amount) {
    errorMsg[0].innerHTML = "This field is required";
    errBorder[0].classList.add("focus-within:border-error");
    errBg[0].classList.add("group-focus-within:bg-error");
    valid = false;
  } else {
    errorMsg[0].innerHTML = "";
    errBorder[0].classList.remove("focus-within:border-error");
    errBg[0].classList.remove("group-focus-within:bg-error");
  }

  // Years
  if (!years) {
    errorMsg[1].innerHTML = "This field is required";
    valid = false;
  } else {
    errorMsg[1].innerHTML = "";
  }

  // Rate
  if (!rate) {
    errorMsg[2].innerHTML = "This field is required";
    valid = false;
  } else {
    errorMsg[2].innerHTML = "";
  }

  // Type
  if (!selected) {
    errorMsg[3].innerHTML = "This field is required";
    valid = false;
  } else {
    errorMsg[3].innerHTML = "";
  }

  return valid;
}

// 🔹 Improved Mortgage Calculation Function
function calculateMortgage(amount, rate, years, type) {
  if (isNaN(amount) || isNaN(rate) || isNaN(years)) {
    throw new Error("Invalid input: All fields must be numbers.");
  }
  if (amount <= 0 || years <= 0 || rate < 0) {
    throw new Error(
      "Invalid values: Amount/Years must be positive, rate non-negative."
    );
  }

  // Convert rate to decimal if given as a whole number (e.g., 5 → 0.05)
  if (rate >= 1) {
    rate = rate / 100;
  }

  // Handle zero or near-zero interest rate safely
  if (rate < 0.0001) {
    const monthlyPayment = amount / (years * 12);
    const totalPayment = monthlyPayment * years * 12;
    return {
      type,
      monthlyPayment,
      totalPayment,
      totalInterest: 0,
    };
  }

  const monthlyRate = rate / 12;
  const months = years * 12;

  let monthlyPayment, totalPayment, totalInterest;

  if (type === "repayment") {
    const factor = Math.pow(1 + monthlyRate, months);
    monthlyPayment = (amount * monthlyRate * factor) / (factor - 1);
    totalPayment = monthlyPayment * months;
    totalInterest = totalPayment - amount;
  } else if (type === "interest-only") {
    monthlyPayment = amount * monthlyRate;
    totalInterest = monthlyPayment * months;
    totalPayment = totalInterest;
  }

  return {
    type,
    monthlyPayment,
    totalPayment,
    totalInterest,
  };
}

// 🔹 Display Results
function displayResult({ type, monthlyPayment, totalPayment, totalInterest }) {
  let mortType = document.getElementById("mort-type");
  let monthlyRepay = document.getElementById("monthly-repay");
  let totalRepay = document.getElementById("total-repay");
  let repaymentNote = document.getElementById("repayment");

  mortType.innerHTML =
    type === "repayment"
      ? "Your monthly repayments"
      : "Your monthly interest repayments";

  repaymentNote.innerHTML =
    type === "repayment"
      ? "Total you'll repay over the term"
      : "Total interest you'll repay over the term";

  monthlyRepay.innerHTML = `£${monthlyPayment.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  totalRepay.innerHTML = `£${(type === "repayment"
    ? totalPayment
    : totalInterest
  ).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// 🔹 Submit Button
submitButtonEl.addEventListener("click", () => {
  const defaultPage = document.getElementById("default-page");
  const resultPage = document.getElementById("result-page");
  if (!inputCheck()) return;

  const amount = parseFloat(amountInput.value.replace(/,/g, ""));
  const years = parseFloat(yearsInput.value);
  const rate = parseFloat(rateInput.value);
  const selected = document.querySelector('input[name="mortgageType"]:checked');
  const type = selected?.value;

  try {
    const result = calculateMortgage(amount, rate, years, type);
    displayResult(result);

    defaultPage.classList.add("hidden");
    resultPage.classList.remove("hidden");
    resultPage.classList.add("flex");
  } catch (error) {
    console.error(error.message);
  }
});
*/
