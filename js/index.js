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
// Validate input fields
function inputCheck() {
  const errBorder = document.querySelectorAll(".error-border");
  const errBg = document.querySelectorAll(".error-bg");
  const amount = parseFloat(amountInput.value.replace(/,/g, "")) || 0;
  const years = parseFloat(yearsInput.value) || 0;
  const rate = parseFloat(rateInput.value) || 0;
  const selected = document.querySelector('input[name="mortgageType"]:checked');

  let valid = true;

  const fields = [amount, years, rate];

  fields.forEach((value, i) => {
    if (!value) {
      errorMsg[i].innerHTML = "This field is required";
      errBorder[i].classList.remove("border-custom/30");
      errBorder[i].classList.add("border-error");
      errBg[i].classList.remove("bg-primary", "text-custom/70");
      errBg[i].classList.add("bg-error", "text-white");
      valid = false;
    } else {
      errorMsg[i].innerHTML = "";
    }
  });

  // Radio button check
  if (!selected) {
    errorMsg[3].innerHTML = "This field is required";
    valid = false;
  } else {
    errorMsg[3].innerHTML = "";
  }

  return valid;
}
// Clear all inputs
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
    // Clear inputs
    amountInput.value = "";
    yearsInput.value = "";
    rateInput.value = "";
    typeInputs.forEach((radio) => (radio.checked = false));

    // Reset error messages
    errorMsg[0].innerHTML = "Enter values to calculate mortgage.";
    errorMsg[1].innerHTML = "Enter values to calculate mortgage.";
    errorMsg[2].innerHTML = "Enter values to calculate mortgage.";
    errorMsg[3].innerHTML = "Select mortgage type";

    // Reset page display
    resultPage.classList.remove("flex");
    resultPage.classList.add("hidden");
    defaultPage.classList.remove("hidden");
    defaultPage.classList.add("flex");

    // Reset border styles
    errBorder.forEach((element) => {
      element.classList.remove("border-custom/30");
      element.classList.add("border-error");
    });

    // Reset background styles
    errBg.forEach((element) => {
      element.classList.remove("bg-primary", "text-custom/70");
      element.classList.add("bg-error", "text-white");
    });
  }
});
// Hide error messages dynamically as user types or selects
function clearBorderBgErr(index) {
  const errBorder = document.querySelectorAll(".error-border");
  const errBg = document.querySelectorAll(".error-bg");

  errBorder[index].classList.remove("border-error");
  errBorder[index].classList.add("border-custom/30");
  errBg[index].classList.remove("bg-error", "text-white");
  errBg[index].classList.add("bg-primary", "text-custom/70");
}
rateInput.addEventListener("input", (e) => {
  let val = rateInput.value.replace(/[^0-9.]/g, ""); // only numbers & decimal
  const parts = val.split(".");
  if (parts.length > 2) val = parts[0] + "." + parts[1]; // prevent multiple dots
  rateInput.value = val;
});

// Amount input
amountInput.addEventListener("input", () => {
  if (amountInput.value) {
    errorMsg[0].innerHTML = "";
    clearBorderBgErr(0);
  }
});

// Years input
yearsInput.addEventListener("input", () => {
  if (yearsInput.value) {
    errorMsg[1].innerHTML = "";
    clearBorderBgErr(1);
  }
});

// Rate input
rateInput.addEventListener("input", () => {
  if (rateInput.value) {
    errorMsg[2].innerHTML = "";
    clearBorderBgErr(2);
  }
});

typeInputs.forEach((radio) => {
  radio.addEventListener("change", () => {
    const selected = document.querySelector(
      'input[name="mortgageType"]:checked'
    );
    if (selected) errorMsg[3].innerHTML = "";
  });
});

// Main calculation function
function calculateMortgage() {
  // Get input values
  const amount = parseFloat(amountInput.value.replace(/,/g, "")) || 0;
  const years = parseFloat(yearsInput.value) || 0;
  const rate = Number(rateInput.value.trim());
  if (isNaN(rate) || rate <= 0) return null;
  const selected = document.querySelector('input[name="mortgageType"]:checked');

  if (!amount || !years || !rate || !selected) return null;

  const type = selected.value;
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;

  let monthlyPayment = 0;
  let totalPayment = 0;
  let totalInterest = 0;

  if (type === "repayment") {
    // Standard amortization formula
    const factor = Math.pow(1 + monthlyRate, months);
    monthlyPayment = (amount * monthlyRate * factor) / (factor - 1);
    totalPayment = monthlyPayment * months;
    totalInterest = totalPayment - amount;
  } else if (type === "interest-only") {
    // Interest-only calculation
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

// Submit button
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

// Display function
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
