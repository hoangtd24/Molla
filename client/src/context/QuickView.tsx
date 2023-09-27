import { ReactNode, createContext, useContext, useState } from "react";

interface IQuickViewContext {
  open: boolean;
  handleOpen: (productId: string) => void;
  productId: string;
  handleClose: () => void;
}

export const QuickViewContext = createContext<IQuickViewContext>({
  open: false,
  handleOpen: () => {},
  productId: "",
  handleClose: () => {},
});

export const useQuickView = () => useContext(QuickViewContext);

const QuickViewContextProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>("");

  const handleOpen = (productId: string): void => {
    setProductId(productId);
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const quickViewData: IQuickViewContext = {
    open,
    productId,
    handleOpen,
    handleClose,
  };
  return (
    <QuickViewContext.Provider value={quickViewData}>
      {children}
    </QuickViewContext.Provider>
  );
};

export default QuickViewContextProvider;
