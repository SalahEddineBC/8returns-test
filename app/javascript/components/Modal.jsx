import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalExample = ({ text = "", isOpen = false, toggle = () => { }, ...props }) => {
    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Error</ModalHeader>
                <ModalBody>
                    {text}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Retry</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalExample;