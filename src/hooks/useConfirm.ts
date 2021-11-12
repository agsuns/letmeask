import React from 'react';
import  { ConfirmContext } from "../contexts/ConfirmContext";


export default function useConfirm() {
  const {confirm, setConfirm} = React.useContext(ConfirmContext);

  const isConfirmed = async (title: string, prompt: string, modalIcon: string) => {
    const promise: Promise<boolean> = new Promise((resolve, reject) => {
      setConfirm({
        title: title,
        isOpen: true,
        iconRef: modalIcon,
        prompt: prompt,
        cancel: reject,
        proceed: resolve,
      });      
    });

    return promise
      .then(() => {
        setConfirm({          
          title: '',
          prompt: '',
          iconRef: '',
          cancel: undefined,
          proceed: undefined,          
          isOpen: false,
        });

        return true;
      })
      .catch(() => {
        setConfirm({          
          title: '',
          prompt: '',
          iconRef: '',
          cancel: undefined,
          proceed: undefined,          
          isOpen: false,
        });
        
        return false;
      });      
  }

  const onlyConfirm = async (iconRef: string, title: string, text: string) => {
    const promise = new Promise((resolve, reject) => {
      setConfirm({
        iconRef,
        isOpen: true,
        title,
        prompt: text,
        proceed: resolve,
        cancel: undefined,
      })
    });

    // await promise;

    return promise
    .then(() => {
      setConfirm({
        title: '',
        prompt: '',
        iconRef: '',
        cancel: undefined,
        proceed: undefined,          
        isOpen: false,
      });
      return true;
    })
  }

  return {...confirm, isConfirmed, onlyConfirm};
}