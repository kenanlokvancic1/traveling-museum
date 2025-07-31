import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showSuccessToast = (message) => {
  toast(message, {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    style: {
      backgroundColor: "#e6f4ea",
      color: "#2e7d32",
      fontWeight: 500,
      fontFamily: "inherit",
      border: "1px solid #a5d6a7",
      borderRadius: "8px",
      fontSize: "16px",
    },
    icon: "✅",
  });
};

export const showErrorToast = (message) => {
  toast(message, {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    style: {
      backgroundColor: "#ffebee",
      color: "#d32f2f",
      fontWeight: 500,
      fontFamily: "inherit",
      border: "1px solid #f44336",
      borderRadius: "8px",
      fontSize: "16px",
    },
    icon: "❌",
  });
};
