import React from 'react';
import GenericModal from './modal';
import UserForm from './UserForm';

const AddUserModal = ({ displayModal, closeModal, onSubmit }) => {
    return (
        <GenericModal displayModal={displayModal} closeModal={closeModal}>
            <h1>Add New User</h1>
            <UserForm onSubmit={onSubmit} closeModal={closeModal} />
        </GenericModal>
    );
};

export default AddUserModal;
