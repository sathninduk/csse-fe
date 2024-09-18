import React, {cloneElement} from 'react';
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";

const Model = ({button, isOpen, onOpenChange, modelForm, ...props}) => {

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{props.title}</ModalHeader>
                            <ModalBody>
                                {cloneElement(modelForm,{ onClose: onClose, id: props.editItemId })}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
};

export default Model;