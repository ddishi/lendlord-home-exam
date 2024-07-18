import React from 'react';
import GenericModal from './modal';
import UserForm from './UserForm';

const EditUserModal = ({ displayModal, closeModal, user, onSubmit }) => {
    return (
        <GenericModal displayModal={displayModal} closeModal={closeModal}>
            <h1>Edit User</h1>
            <UserForm user={user} onSubmit={onSubmit} closeModal={closeModal} />
        </GenericModal>
    );
};

export default EditUserModal;
