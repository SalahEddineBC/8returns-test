import React, { useState, useEffect } from 'react';
import Table from './Table';
import Form from './Form';
import Modal from './Modal';

export default () => {
    const [data, setData] = useState([]);
    const [modal, setModal] = useState({ open: false, text: '' })
    const fetchResults = () => {
        fetch(`/api/users`).then(function (response) {
            if (response.status >= 400 && response.status < 600) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(res => setData(res.data));
    }
    useEffect(() => { fetchResults() }, [])
    const toggleModal = () => {
        setModal({ ...modal, open: !modal.open })
    }
    const onError = (e) => {
        setModal({ open: true, text: e.messages })
    }
    return (
        <div className="vw-100 vh-100 primary-color d-flex justify-content-center">
            <div className="jumbotron jumbotron-fluid bg-transparent">
                <div className="container secondary-color">
                    <h1 className="display-4">Email finder</h1>
                    <hr className="my-4" />
                    <Form onSuccess={fetchResults} onError={onError} />
                    <hr className="my-4" />
                    <Table data={data} />
                    <Modal isOpen={modal.open} text={modal.text} toggle={toggleModal} ></Modal>
                </div>
            </div>
        </div>
    )
};