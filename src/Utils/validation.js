export const validateField = (name, value) => {
  switch (name) {
    case "companyName":
      if (value.length < 4) return "Company name must be at least 4 characters.";
      if (value.length > 15) return "Company name must not exceed 12 characters.";
      return "";
    case "name":
      if (value.length < 4) return "Person name must be at least 4 characters.";
      if (value.length > 15) return "Person name must not exceed 12 characters.";
      return "";
    case "contactNumber":
      return /^\d{10}$/.test(value) ? "" : "Contact number must be exactly 10 digits.";
    case "emailId":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Invalid email format.";
    case "addressLine1":
      return value.length >= 5 ? "" : "Address must be at least 5 characters.";
    default:
      return "";
  }
};

export const validateForm = (formData, errors) => {
  const fieldErrors = Object.keys(formData).reduce((acc, key) => {
    const error = validateField(key, formData[key]);
    if (error) acc[key] = error;
    return acc;
  }, {});
  return Object.keys(fieldErrors).length === 0 && Object.keys(errors).every((key) => !errors[key]);
};
