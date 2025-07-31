export const validateProfileData = (data) => {
  const errors = {};

  if (!data.profileName.trim()) {
    errors.profileName = "Profile name is required";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
    errors.email = "Invalid email address";
  }

  if (!data.telephone.trim()) {
    errors.telephone = "Telephone is required";
  }

  if (!data.address.trim()) {
    errors.address = "Address is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const formatPhoneNumber = (phoneNumber) => {
  const cleaned = phoneNumber.replace(/\D/g, "");

  const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }

  return phoneNumber;
};
