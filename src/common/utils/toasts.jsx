import { Slide, toast } from "react-toastify";

const toastError = (
  message,
  {
    position = toast.POSITION.BOTTOM_LEFT,
    autoClose = 3000, //3 seconds
    hideProgressBar = false,
    closeOnClick = true,
    pauseOnHover = true,
    draggable = false,
    toastId = "default-toast",
    transition = Slide,
  }
) => {
  toast.error(message, {
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    toastId,
    transition,
  });
};

const toastWarning = (
  message,
  {
    position = toast.POSITION.BOTTOM_LEFT,
    autoClose = 3000, //3 seconds
    hideProgressBar = false,
    closeOnClick = true,
    pauseOnHover = true,
    draggable = false,
    toastId = "default-toast",
    transition = Slide,
  }
) => {
  toast.warning(message, {
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    toastId,
    transition,
  });
};

const toastInfo = (
  message,
  {
    position = toast.POSITION.BOTTOM_LEFT,
    autoClose = 3000, //3 seconds
    hideProgressBar = false,
    closeOnClick = true,
    pauseOnHover = true,
    draggable = false,
    toastId = "default-toast",
    transition = Slide,
  }
) => {
  toast.info(message, {
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    toastId,
    transition,
  });
};

const toastSuccess = (
  message,
  {
    position = toast.POSITION.BOTTOM_LEFT,
    autoClose = 3000, //3 seconds
    hideProgressBar = false,
    closeOnClick = true,
    pauseOnHover = true,
    draggable = false,
    toastId = "default-toast",
    transition = Slide,
  }
) => {
  toast.success(message, {
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    toastId,
    transition,
  });
};

export { toastSuccess, toastError, toastWarning, toastInfo };
