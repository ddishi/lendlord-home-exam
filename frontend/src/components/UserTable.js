import React from 'react';

const UserTable = ({ users, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Date Started</th>
                <th>Role</th>
                <th>Salary</th>
                <th>Manager</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {users.map(user => (
                <tr key={user._id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.dateStarted).toLocaleDateString()}</td>
                    <td>{user.role}</td>
                    <td>{user.salary}</td>
                    <td>{user.manager}</td>
                    <td>
                        <button onClick={() => onEdit(user)}>Edit</button>
                        <button onClick={() => onDelete(user._id)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default UserTable;
