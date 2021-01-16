import React from 'react';
import { Table } from 'reactstrap';
export default ({ data = [] }) => {
    return (<Table>
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>URL</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {data.map((row, index) => (<tr key={index}>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.url}</td>
                <td>{row.email}</td>
            </tr>))}
        </tbody>
    </Table>)
}