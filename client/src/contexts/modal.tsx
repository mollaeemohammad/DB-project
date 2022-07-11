import {
  FC,
  createContext,
  useState,
  ReactChild,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { Button, ButtonToolbar, Modal } from 'rsuite';
interface ModalContext {
  test?:string;
  setTest?: any;
  modalFunc?: any;
  modalArgs?:any;
  modalBody?:any;
  modalTitle?:any;
  open?: any;
  handleOpen?:any;
  handleClose?:any;
  handleSuccessClose?: any;
  setModalFunc?:any;
  setModalArgs?:any;
  setModalBody?:any;
  setModalTitle?:any;
  setOpen?:any;
}

const context = createContext<ModalContext>({});

const { Provider } = context;

interface Props {
  children: ReactChild | ReactChild[];
}

export const ModalProvider: FC<Props> = ({ children }) => {
  // const [test, setTest] = useState("5");



  type CallbackFunctionWithArgs = (...args:any[]) => void;

  const [modalFunc, setModalFunc] = useState<CallbackFunctionWithArgs>();
  const [modalArgs, setModalArgs] = useState();
  const [modalBody, setModalBody] = useState();
  const [modalTitle, setModalTitle] = useState();
  const [modalOkButtonText, setModalOkButton] = useState();
  const [modalCloseButton, setModalCloseButton] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback((func: any, arg: any, body = "آیا از تصمیم خود اطمینان دارید؟", title = "", okButton = "بلی", closeButton = "خیر") => {
    setModalFunc(func);
    setModalArgs(arg);
    setModalBody(body);
    setModalTitle(title);
    setModalOkButton(okButton);
    setModalCloseButton(closeButton);
    setOpen(true);
  }, []);
  const handleSuccessClose = useCallback(() => {
    setOpen(false);
    if (modalFunc) {
      console.log(modalFunc, modalArgs);
      modalFunc(modalArgs);
    }
  }, [modalFunc, modalArgs]);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Provider value={{
      // test,
      // setTest,
      // modalFunc,
      // modalArgs,
      // modalBody,
      // modalTitle,
      open,
      handleOpen,
      handleClose,
      handleSuccessClose,
      // setModalFunc,
      // setModalArgs,
      // setModalBody,
      // setModalTitle,
      setOpen
      }}>
      {children}
      <Modal open={open} onClose={handleClose} size="xs">
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <ButtonToolbar>
            <Button onClick={handleSuccessClose} style={{backgroundColor:"#000", color:"#fff", width:"45%", marginRight:"2.5%", marginLeft:"5%",marginTop:"40px"}} appearance="default">{modalOkButtonText}</Button>
            <Button onClick={handleClose} style={{backgroundColor:"#fff", color:"#000", border:"1px solid #000", width:"45%", margin:"auto",marginTop:"40px"}} appearance="default">{modalCloseButton}</Button>
          </ButtonToolbar>

        </Modal.Footer>
      </Modal>
    </Provider>
  );
};

export const useModal = () => useContext(context);
