import React, { useState, useEffect } from 'react';
import { getHeaders } from '../shared/headers';

const UserForm = ({ user, onSubmit, closeModal }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateStarted: '',
        salary: '',
        role: '',
        manager: ''
    });

    useEffect(() => {
        if (user) {
            const formattedUser = {
                ...user,
                dateStarted: user.dateStarted ? new Date(user.dateStarted).toISOString().substr(0, 10) : ''
            };
            setFormData(formattedUser);
        }
    }, [user]);

    // useEffect(() => {
    //     if (user) {
    //         setFormData(user);
    //     }
    // }, [user]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const filteredData = { ...formData };

        // Remove empty strings or null values
        for (const key in filteredData) {
            if (filteredData[key] === '' || filteredData[key] === null) {
                delete filteredData[key];
            }
        }

        try {
            const response = await fetch(
                user ? `http://localhost:3002/users/${user._id}` : 'http://localhost:3002/users',
                {
                    method: user ? 'PUT' : 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify(formData)
                }
            );
            if (response.ok) {
                onSubmit();
                closeModal();
                alert(`User ${user ? 'updated' : 'added'} successfully!`);
            } else {
                alert(`Failed to ${user ? 'update' : 'add'} user.`);
            }
        } catch (error) {
            console.error(`Error ${user ? 'updating' : 'adding'} user:`, error);
            alert(`An error occurred while ${user ? 'updating' : 'adding'} the user.`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                First Name:
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </label><br/>
            <label>
                Last Name:
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </label><br/>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label><br/>
            <label>
                Date Started:
                <input type="date" name="dateStarted" value={formData.dateStarted} onChange={handleChange} />
            </label><br/>
            <label>
                Salary:
                <input type="number" name="salary" value={formData.salary} onChange={handleChange} />
            </label><br/>
            <label>
                Role:
                <input type="text" name="role" value={formData.role} onChange={handleChange} />
            </label><br/>
            <label>
                Manager:
                <input type="text" name="manager" value={formData.manager} onChange={handleChange} />
            </label><br/>
            <button type="submit">Submit</button>
        </form>
    );
};

export default UserForm;
