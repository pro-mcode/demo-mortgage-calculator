/*
function calculateMortgage(principal, annualInterestRate, years) {
  // Input validation
  if (isNaN(principal) || isNaN(annualInterestRate) || isNaN(years)) {
    throw new Error("All parameters must be valid numbers.");
  }
  if (principal <= 0 || years <= 0 || annualInterestRate < 0) {
    throw new Error(
      "Principal and years must be positive; rate cannot be negative."
    );
  }

  // Convert interest rate to decimal if needed (e.g., 5 -> 0.05)
  if (annualInterestRate >= 1) {
    annualInterestRate = annualInterestRate / 100;
  }

  // Handle near-zero interest rate
  if (annualInterestRate < 0.0001) {
    return principal / (years * 12);
  }

  // Convert to monthly
  const monthlyInterestRate = annualInterestRate / 12;
  const numberOfPayments = years * 12;

  // Formula: M = P[i(1+i)^n] / [(1+i)^n – 1]
  const monthlyPayment =
    (principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  return monthlyPayment;
}

// ✅ Example usage:
const monthly = calculateMortgage(300000, 15, 25);
console.log(`Monthly payment with 4.5% rate: $${monthly.toFixed(2)}`);
// // Example usage:
// try {
//   // Works with a standard decimal
//   console.log(
//     `Monthly payment with 4.5% rate: $${calculateMortgage(
//       200000,
//       0.045,
//       30
//     ).toFixed(2)}`
//   );

//   // Works with an integer input (e.g., user enters "5")
//   console.log(
//     `Monthly payment with integer rate (5): $${calculateMortgage(
//       200000,
//       5,
//       30
//     ).toFixed(2)}`
//   );

//   // Handles a very small decimal, effectively treating as a zero-interest loan
//   console.log(
//     `Monthly payment with a very low rate (0.00001): $${calculateMortgage(
//       200000,
//       0.00001,
//       30
//     ).toFixed(2)}`
//   );

//   // Throws an error for invalid input
//   calculateMortgage(200000, -1, 30);
// } catch (error) {
//   console.error(error.message);
// }
*/
