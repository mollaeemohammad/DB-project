import { toast } from "react-toastify";

export const showToast = (
  message: string,
  type: "error" | "success" | "info" | "warning"
) => {
  switch (type) {
    case "error":
      toast.error(message);
      break;
    case "success":
      toast.success(message);
      break;
    case "info":
      toast.info(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    default:
      break;
  }
};
