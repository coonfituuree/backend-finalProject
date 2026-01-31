// Luhn Algorithm for credit card validation
export const cardValidation = {
  isValidCardNumber(cardNumber: string): boolean {
    // Remove spaces and dashes
    const cleanNumber = cardNumber.replace(/[\s-]/g, "");

    // Check if it's 16 digits
    if (!/^\d{16}$/.test(cleanNumber)) {
      return false;
    }

    // Luhn algorithm
    let sum = 0;
    let isEven = false;

    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber[i], 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  },

  isValidCVV(cvv: string): boolean {
    // CVV should be 3 or 4 digits
    return /^\d{3,4}$/.test(cvv);
  },

  isValidExpiry(month: number, year: number): boolean {
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    // Check if month is valid
    if (month < 1 || month > 12) {
      return false;
    }

    // Check if expiry is in the future
    if (year < currentYear) {
      return false;
    }

    if (year === currentYear && month < currentMonth) {
      return false;
    }

    return true;
  },
};
