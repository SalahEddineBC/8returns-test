import React, { useState } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
export default ({ onSuccess = () => { }, onError = () => { }, ...props }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [url, setUrl] = useState('');
    const submit = (e) => {
        e.preventDefault();
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(`/api/users`, {
            method: 'POST',
            headers: {
                "X-CSRF-Token": token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    url,
                    first_name: firstName,
                    last_name: lastName
                }
            })
        }).then(function (response) {
            if (response.status >= 400 && response.status < 600) {
                return response.json().then(resp => { onError(resp) });
            }
            return response.json();
        }).then(resp => onSuccess())
    }
    return (<Form inline>
        <FormGroup>
            <Input
                type="text"
                name="firstName" id="firstName"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
            />
        </FormGroup>
        <FormGroup>
            <Input type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                onChange={e => setLastName(e.target.value)}
                value={lastName} />
        </FormGroup>
        <FormGroup>
            <Input
                type="text"
                name="url"
                id="url"
                placeholder="URL"
                onChange={e => setUrl(e.target.value)}
                value={url} />
        </FormGroup>
        <Button onSubmit={submit} onClick={submit}>Search</Button>

    </Form>)
}