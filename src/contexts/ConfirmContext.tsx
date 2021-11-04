import React, {Dispatch, ReactNode, SetStateAction} from 'react';
interface ConfirmValues {
  title: string,
  prompt: string,
  isOpen: boolean,
  iconRef: string,
  proceed:  undefined | ((param?: any) => void),
  cancel: undefined | (() => void),
}

interface ContextProps {
  confirm: ConfirmValues,
  setConfirm: Dispatch<SetStateAction<ConfirmValues>>
}

interface ContextProviderProps {
  children: ReactNode,
}

export const ConfirmContext = React.createContext({} as ContextProps);

function ConfirmContextProvider({children} : ContextProviderProps) {
  const [confirm, setConfirm] = React.useState({
    prompt: '',
    iconRef: '',
    isOpen: false,
    proceed: undefined,
    cancel: undefined,
  } as ConfirmValues);

  return (
    <ConfirmContext.Provider value={{confirm, setConfirm}}>
      {children}
    </ConfirmContext.Provider>
  );
}

export default ConfirmContextProvider;