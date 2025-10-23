// 🔹 Get elements
const clearButtonEl = document.getElementById("clear-inputs");
const amountInput = document.getElementById("mortgage-amount");
const yearsInput = document.getElementById("mortgage-years");
const rateInput = document.getElementById("mortgage-rate");
const typeInputs = document.querySelectorAll('input[name="mortgageType"]');
const submitButtonEl = document.getElementById("calculate-mortgage");
const errorMsg = document.querySelectorAll(".err-msg");
const resultEl = document.getElementById("mortgage-result");

amountInput.addEventListener("input", (e) => {
  let value = amountInput.value.replace(/,/g, ""); // remove commas
  if (value === "" || isNaN(value)) {
    amountInput.value = "";
    return;
  }

  // Get cursor position
  const selectionStart = amountInput.selectionStart;
  const oldLength = amountInput.value.length;

  // Format number with commas
  const formatted = parseInt(value, 10).toLocaleString();

  // Set the formatted value
  amountInput.value = formatted;

  // Adjust cursor position
  const newLength = formatted.length;
  const diff = newLength - oldLength;
  amountInput.setSelectionRange(selectionStart + diff, selectionStart + diff);
});
// rateInput.addEventListener("input", (e) => {
//   let val = rateInput.value.replace(/[^0-9.]/g, ""); // only numbers & decimal
//   const parts = val.split(".");
//   if (parts.length > 2) val = parts[0] + "." + parts[1]; // prevent multiple dots
//   rateInput.value = val;
// });

// Validate input fields
function inputCheck() {
  const errBorder = document.querySelectorAll(".error-border");
  const errBg = document.querySelectorAll(".error-bg");
  const amount = parseFloat(amountInput.value.replace(/,/g, "")) || 0;
  const years = parseFloat(yearsInput.value) || 0;
  const rate = parseFloat(rateInput.value) || 0;
  const selected = document.querySelector('input[name="mortgageType"]:checked');

  let valid = true;

  // Amount check
  if (!amount) {
    errorMsg[0].innerHTML = "This field is required";
    errBorder[0].classList.remove("focus-within:border-secondary");
    errBorder[0].classList.add("focus-within:border-error");
    errBg[0].classList.remove("group-focus-within:bg-secondary");
    errBg[0].classList.add("group-focus-within:bg-error");
    valid = false;
  } else {
    errorMsg[0].innerHTML = "";
    errBorder[0].classList.remove("focus-within:border-error");
    errBorder[0].classList.add("focus-within:border-secondary");
    errBg[0].classList.remove("group-focus-within:bg-error");
    errBg[0].classList.add("group-focus-within:bg-secondary");
  }

  // Years check
  if (!years) {
    errorMsg[1].innerHTML = "This field is required";
    errBorder[1].classList.remove("focus-within:border-secondary");
    errBorder[1].classList.add("focus-within:border-error");
    errBg[1].classList.remove("group-focus-within:bg-secondary");
    errBg[1].classList.add("group-focus-within:bg-error");
    valid = false;
  } else {
    errorMsg[1].innerHTML = "";
    errBorder[1].classList.remove("focus-within:border-error");
    errBorder[1].classList.add("focus-within:border-secondary");
    errBg[1].classList.remove("group-focus-within:bg-error");
    errBg[1].classList.add("group-focus-within:bg-secondary");
  }

  // Rate check
  if (!rate) {
    errorMsg[2].innerHTML = "This field is required";
    errBorder[2].classList.remove("focus-within:border-secondary");
    errBorder[2].classList.add("focus-within:border-error");
    errBg[2].classList.remove("group-focus-within:bg-secondary");
    errBg[2].classList.add("group-focus-within:bg-error");
    valid = false;
  } else {
    errorMsg[2].innerHTML = "";
    errBorder[2].classList.remove("focus-within:border-error");
    errBorder[2].classList.add("focus-within:border-secondary");
    errBg[2].classList.remove("group-focus-within:bg-error");
    errBg[2].classList.add("group-focus-within:bg-secondary");
  }

  // Radio button check
  if (!selected) {
    errorMsg[3].innerHTML = "This field is required";
    errBorder[3].classList.remove("focus-within:border-secondary");
    errBorder[3].classList.add("focus-within:border-error");
    valid = false;
  } else {
    errorMsg[3].innerHTML = "";
    errBorder[3].classList.remove("focus-within:border-error");
    errBorder[3].classList.add("focus-within:border-secondary");
  }

  return valid;
}

// Hide error messages dynamically as user types or selects
amountInput.addEventListener("input", () => {
  if (amountInput.value) errorMsg[0].innerHTML = "";
});

yearsInput.addEventListener("input", () => {
  if (yearsInput.value) errorMsg[1].innerHTML = "";
});

rateInput.addEventListener("input", () => {
  if (rateInput.value) errorMsg[2].innerHTML = "";
});

typeInputs.forEach((radio) => {
  radio.addEventListener("change", () => {
    const selected = document.querySelector(
      'input[name="mortgageType"]:checked'
    );
    if (selected) errorMsg[3].innerHTML = "";
  });
});

// 🔹 Clear button
clearButtonEl.addEventListener("click", () => {
  const errBorder = document.querySelectorAll(".error-border");
  const errBg = document.querySelectorAll(".error-bg");
  const defaultPage = document.getElementById("default-page");
  const resultPage = document.getElementById("result-page");

  const amount = parseFloat(amountInput.value) || 0;
  const years = parseFloat(yearsInput.value) || 0;
  const rate = parseFloat(rateInput.value) || 0;
  const selected = document.querySelector('input[name="mortgageType"]:checked');

  if (amount || years || rate || selected) {
    // 🔹 Clear inputs
    amountInput.value = "";
    yearsInput.value = "";
    rateInput.value = "";
    typeInputs.forEach((radio) => (radio.checked = false));

    // 🔹 Reset error messages
    errorMsg[0].innerHTML = "Enter values to calculate mortgage.";
    errorMsg[1].innerHTML = "Enter values to calculate mortgage.";
    errorMsg[2].innerHTML = "Enter values to calculate mortgage.";
    errorMsg[3].innerHTML = "Select mortgage type";

    // 🔹 Reset page display
    resultPage.classList.remove("flex");
    resultPage.classList.add("hidden");
    defaultPage.classList.remove("hidden");
    defaultPage.classList.add("flex");

    // 🔹 Reset border styles
    errBorder.forEach((el) => {
      el.classList.remove("focus-within:border-secondary");
      el.classList.add("focus-within:border-error");
    });

    // 🔹 Reset background styles
    errBg.forEach((el) => {
      el.classList.remove("group-focus-within:bg-secondary");
      el.classList.add("group-focus-within:bg-error");
    });
  }
});

// 🔹 Main calculation function
function calculateMortgage() {
  // 🔹 Get input values
  const amount = parseFloat(amountInput.value.replace(/,/g, "")) || 0;
  const years = parseFloat(yearsInput.value) || 0;
  const rate = parseFloat(rateInput.value.replace(/,/g, "")) || 0;
  const selected = document.querySelector('input[name="mortgageType"]:checked');

  // if (isNaN(rate) || rate <= 0) {
  //   errorMsg[2].innerHTML = "Please enter a valid interest rate";
  //   return null;
  // }
  // Stop if any required field is missing
  if (!amount || !years || !rate || !selected) return null;

  const type = selected.value;
  const monthlyRate = (rate + 0.05) / 100 / 12;
  const months = years * 12;

  let monthlyPayment = 0;
  let totalPayment = 0;
  let totalInterest = 0;

  if (type === "repayment") {
    // 🔹 Standard amortization formula
    const factor = Math.pow(1 + monthlyRate, months);
    monthlyPayment = (amount * monthlyRate * factor) / (factor - 1);
    totalPayment = monthlyPayment * months;
    totalInterest = totalPayment - amount;
  } else if (type === "interest-only") {
    // 🔹 Interest-only calculation
    monthlyPayment = amount * monthlyRate; // monthly interest only
    totalInterest = monthlyPayment * months; // total interest over loan term
    totalPayment = totalInterest; // principal is not repaid in interest-only
  }

  return {
    type,
    monthlyPayment,
    totalPayment,
    totalInterest,
  };
}

// 🔹 Submit button
submitButtonEl.addEventListener("click", () => {
  const defaultPage = document.getElementById("default-page");
  const resultPage = document.getElementById("result-page");
  if (!inputCheck()) return; // Stop if validation fails

  const result = calculateMortgage();
  if (result) {
    displayResult(result);
    defaultPage.classList.add("hidden");
    resultPage.classList.remove("hidden");
    resultPage.classList.add("flex");
  } else {
    resultPage.classList.remove("flex");
    resultPage.classList.add("hidden");
    defaultPage.classList.remove("hidden");
    defaultPage.classList.add("flex");
  }
});

// 🔹 Display function
function displayResult({ type, monthlyPayment, totalPayment, totalInterest }) {
  let mortType = document.getElementById("mort-type");
  let monthlyRepay = document.getElementById("monthly-repay");
  let totalRepay = document.getElementById("total-repay");
  let repaymentNote = document.getElementById("repayment");
  mortType.innerHTML = `${
    type === "repayment"
      ? "Your monthly repayments"
      : "Your monthly interest repayments"
  }`;
  repaymentNote.innerHTML = `${
    type === "repayment"
      ? "Total you'll repay over the term"
      : "Total interest you'll repay over the term"
  }`;
  monthlyRepay.innerHTML = `£${monthlyPayment.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
  if (type === "repayment") {
    totalRepay.innerHTML = `£${totalPayment.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
  if (type === "interest-only") {
    totalRepay.innerHTML = `£${totalInterest.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
}

// // 🔹 Dynamic calculation on input change
// [amountInput, yearsInput, rateInput].forEach((input) => {
//   input.addEventListener("input", () => {
//     const result = calculateMortgage();
//     if (result) displayResult(result);
//   });
// });

// typeInputs.forEach((radio) => {
//   radio.addEventListener("change", () => {
//     const result = calculateMortgage();
//     if (result) displayResult(result);
//   });
// });
