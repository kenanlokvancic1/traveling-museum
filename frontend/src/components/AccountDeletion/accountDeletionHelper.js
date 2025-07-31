import { verifyPassword } from "../../api/AuthApi";
import { deleteMyAccount } from "../../api/UserApi";

export const validateDeletionForm = (confirmationChecked) => {
  const errors = {};
  let isValid = true;

  if (!confirmationChecked) {
    errors.confirmation =
      "You must confirm that you want to delete your account";
    isValid = false;
  }

  return { isValid, errors };
};

export const handleInitialDeletion = async (
  password,
  confirmDelete,
  setErrors,
  setLoading,
  setShowConfirmDialog
) => {
  setErrors({});

  if (!password) {
    setErrors((prev) => ({
      ...prev,
      password: "Password is required to confirm deletion",
    }));
    return;
  }
  const validation = validateDeletionForm(confirmDelete);
  if (!validation.isValid) {
    setErrors((prev) => ({ ...prev, ...validation.errors }));
    return;
  }

  setLoading(true);
  try {
    await verifyPassword({ password });
    setShowConfirmDialog(true);
  } catch (error) {
    setErrors((prev) => ({
      ...prev,
      password: error?.response?.data?.message || "Incorrect password",
    }));
  } finally {
    setLoading(false);
  }
};

export const handleFinalAccountDeletion = async (
  password,
  setLoading,
  setErrors,
  navigate,
  dispatch,
  logout
) => {
  setLoading(true);
  try {
    await deleteMyAccount({ password });

    localStorage.clear();
    dispatch(logout());
    navigate("/");
  } catch (error) {
    setErrors((prev) => ({
      ...prev,
      general:
        error?.response?.data?.message ||
        "Failed to delete account. Please try again.",
    }));
  } finally {
    setLoading(false);
  }
};
