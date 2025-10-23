/*
// 🔹 Get elements
const clearButtonEl = document.getElementById("clear-inputs");
const amountInput = document.getElementById("mortgage-amount");
const yearsInput = document.getElementById("mortgage-years");
const rateInput = document.getElementById("mortgage-rate");
const typeInputs = document.querySelectorAll('input[name="mortgageType"]');
const submitButtonEl = document.getElementById("calculate-mortgage");
const errorMsg = document.querySelectorAll(".err-msg");
const errBorder = document.querySelectorAll(".error-border");
const errBg = document.querySelectorAll(".error-bg");
const defaultPage = document.getElementById("default-page");
const resultPage = document.getElementById("result-page");

// 🔹 Format mortgage amount input with commas and smooth cursor
amountInput.addEventListener("input", (e) => {
  let value = amountInput.value.replace(/,/g, "").replace(/\D/g, "");
  if (!value) {
    amountInput.value = "";
    return;
  }

  const selectionStart = amountInput.selectionStart;
  const oldLength = amountInput.value.length;

  const formatted = parseInt(value, 10).toLocaleString();
  amountInput.value = formatted;

  const newLength = formatted.length;
  const diff = newLength - oldLength;
  try {
    amountInput.setSelectionRange(selectionStart + diff, selectionStart + diff);
  } catch {}

  // Remove error when typing
  if (formatted) {
    errorMsg[0].textContent = "";
    errBorder[0].classList.remove("focus-within:border-error");
    errBorder[0].classList.add("focus-within:border-secondary");
    errBg[0].classList.remove("group-focus-within:bg-error");
    errBg[0].classList.add("group-focus-within:bg-secondary");
  }
});

// 🔹 Remove errors dynamically for other inputs
yearsInput.addEventListener("input", () => {
  if (yearsInput.value) {
    errorMsg[1].textContent = "";
    errBorder[1].classList.remove("focus-within:border-error");
    errBorder[1].classList.add("focus-within:border-secondary");
    errBg[1].classList.remove("group-focus-within:bg-error");
    errBg[1].classList.add("group-focus-within:bg-secondary");
  }
});
rateInput.addEventListener("input", () => {
  if (rateInput.value) {
    errorMsg[2].textContent = "";
    errBorder[2].classList.remove("focus-within:border-error");
    errBorder[2].classList.add("focus-within:border-secondary");
    errBg[2].classList.remove("group-focus-within:bg-error");
    errBg[2].classList.add("group-focus-within:bg-secondary");
  }
});
typeInputs.forEach((radio, idx) => {
  radio.addEventListener("change", () => {
    if (document.querySelector('input[name="mortgageType"]:checked')) {
      errorMsg[3].textContent = "";
      errBorder[3].classList.remove("focus-within:border-error");
    }
  });
});

// 🔹 Validate inputs
function inputCheck() {
  const amount = parseFloat(amountInput.value.replace(/,/g, "")) || 0;
  const years = parseFloat(yearsInput.value) || 0;
  const rate = parseFloat(rateInput.value) || 0;
  const selected = document.querySelector('input[name="mortgageType"]:checked');

  let valid = true;

  // Amount
  if (!amount) {
    errorMsg[0].textContent = "This field is required";
    errBorder[0].classList.remove("focus-within:border-secondary");
    errBorder[0].classList.add("focus-within:border-error");
    errBg[0].classList.remove("group-focus-within:bg-secondary");
    errBg[0].classList.add("group-focus-within:bg-error");
    valid = false;
  }

  // Years
  if (!years) {
    errorMsg[1].textContent = "This field is required";
    errBorder[1].classList.remove("focus-within:border-secondary");
    errBorder[1].classList.add("focus-within:border-error");
    errBg[1].classList.remove("group-focus-within:bg-secondary");
    errBg[1].classList.add("group-focus-within:bg-error");
    valid = false;
  }

  // Rate
  if (!rate) {
    errorMsg[2].textContent = "This field is required";
    errBorder[2].classList.remove("focus-within:border-secondary");
    errBorder[2].classList.add("focus-within:border-error");
    errBg[2].classList.remove("group-focus-within:bg-secondary");
    errBg[2].classList.add("group-focus-within:bg-error");
    valid = false;
  }

  // Mortgage type
  if (!selected) {
    errorMsg[3].textContent = "This field is required";
    errBorder[3].classList.remove("focus-within:border-secondary");
    errBorder[3].classList.add("focus-within:border-error");
    valid = false;
  }

  return valid;
}

// 🔹 Clear button
clearButtonEl.addEventListener("click", () => {
  amountInput.value = "";
  yearsInput.value = "";
  rateInput.value = "";
  typeInputs.forEach((radio) => (radio.checked = false));

  errorMsg[0].textContent = "Enter values to calculate mortgage.";
  errorMsg[1].textContent = "Enter values to calculate mortgage.";
  errorMsg[2].textContent = "Enter values to calculate mortgage.";
  errorMsg[3].textContent = "Select mortgage type";

  errBorder.forEach((el) => {
    el.classList.remove("focus-within:border-secondary");
    el.classList.add("focus-within:border-error");
  });
  errBg.forEach((el) => {
    el.classList.remove("group-focus-within:bg-secondary");
    el.classList.add("group-focus-within:bg-error");
  });

  resultPage.classList.add("hidden");
  resultPage.classList.remove("flex");
  defaultPage.classList.remove("hidden");
  defaultPage.classList.add("flex");
});

// 🔹 Calculate mortgage
function calculateMortgage() {
  const amount = parseFloat(amountInput.value.replace(/,/g, "")) || 0;
  const years = parseFloat(yearsInput.value) || 0;
  const rate = parseFloat(rateInput.value) || 0;
  const selected = document.querySelector('input[name="mortgageType"]:checked');

  if (!amount || !years || !rate || !selected) return null;

  const type = selected.value;
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;

  let monthlyPayment = 0;
  let totalPayment = 0;
  let totalInterest = 0;

  if (type === "repayment") {
    const factor = Math.pow(1 + monthlyRate, months);
    monthlyPayment = (amount * monthlyRate * factor) / (factor - 1);
    totalPayment = monthlyPayment * months;
    totalInterest = totalPayment - amount;
  } else {
    monthlyPayment = amount * monthlyRate;
    totalInterest = monthlyPayment * months;
    totalPayment = totalInterest;
  }

  return { type, monthlyPayment, totalPayment, totalInterest };
}

// 🔹 Display results
function displayResult({ type, monthlyPayment, totalPayment, totalInterest }) {
  const mortType = document.getElementById("mort-type");
  const monthlyRepay = document.getElementById("monthly-repay");
  const totalRepay = document.getElementById("total-repay");
  const repaymentNote = document.getElementById("repayment");

  mortType.textContent =
    type === "repayment"
      ? "Your monthly repayments"
      : "Your monthly interest repayments";

  repaymentNote.textContent =
    type === "repayment"
      ? "Total you'll repay over the term"
      : "Total interest you'll repay over the term";

  monthlyRepay.textContent = `£${monthlyPayment.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
  totalRepay.textContent = `£${(type === "repayment"
    ? totalPayment
    : totalInterest
  ).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// 🔹 Submit button
submitButtonEl.addEventListener("click", () => {
  if (!inputCheck()) return;

  const result = calculateMortgage();
  if (result) {
    displayResult(result);
    defaultPage.classList.add("hidden");
    resultPage.classList.remove("hidden");
    resultPage.classList.add("flex");
  } else {
    defaultPage.classList.remove("hidden");
    resultPage.classList.add("hidden");
  }
});
*/
