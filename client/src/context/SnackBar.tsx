import { ReactNode, createContext, useContext, useState } from "react";

interface SnackbarContext {
  open: boolean;
  setOpenSnackBar: (value: boolean) => void;
  message: string;
  setMessageSnackBar: (value: string) => void;
}

export const SnackBarContext = createContext<SnackbarContext>({
  open: false,
  setOpenSnackBar: () => {},
  message: "",
  setMessageSnackBar: () => {},
});

export const useSnackBar = () => useContext(SnackBarContext);

const SnackBarContextProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const setOpenSnackBar = (value: boolean): void => {
    setOpen(value);
  };

  const setMessageSnackBar = (value: string) => {
    setMessage(value);
  };

  const snackBarData = {
    open,
    message,
    setMessageSnackBar,
    setOpenSnackBar,
  };
  return (
    <SnackBarContext.Provider value={snackBarData}>
      {children}
    </SnackBarContext.Provider>
  );
};

export default SnackBarContextProvider;
