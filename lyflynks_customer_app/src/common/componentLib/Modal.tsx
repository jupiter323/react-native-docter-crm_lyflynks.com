import * as React from 'react';
import {
  Modal as LibModal,
} from 'react-native';

const Modal = (props: any) => (
    <LibModal
        animationType={"slide"}
        transparent={true}
        {...props}
      >
        {props.children}
    </LibModal>
);

export default Modal;