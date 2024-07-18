import React, {useState} from 'react'
import './App.css';
import GenericModal from './components/modal';
import Header from './components/header';
import AddUserModal from './components/AddUserModal';
import UpdateUserModal from './components/UpdateUserModal';
import UserTable from "./components/UserTable";


function App() {
    const [shown, setShown] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [users, setUsers] = useState([]); // State to store users
    const [managerAndEmployees, setManagerAndEmployees] = useState(null); // State to store manager and employees data


    const toggleModal = () => setShown(prev => !prev);

    const openUpdateUserModal = user => {
        setEditUser(user);
        toggleModal();
    };

    const closeModals = () => {
        setShown(false);
        setEditUser(null);
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3002/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleAddUser = () => {
        fetchUsers();
    };

    const handleUpdateUser = () => {
        fetchUsers();
    };

    const handleDeleteUser = async userId => {
        try {
            const response = await fetch(`http://localhost:3002/users/${userId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchUsers();
                alert('User deleted successfully!');
            } else {
                alert('Failed to delete user.');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('An error occurred while deleting the user.');
        }
    };

    const fetchManagerAndEmployees = async managerName => {
        try {
            const response = await fetch(`http://localhost:3002/users/manager/${managerName}`);
            const data = await response.json();
            setManagerAndEmployees(data);
        } catch (error) {
            console.error('Error fetching manager and employees:', error);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fetchManagerAndEmployees();
        }
    };

    // Fetch users when the component mounts
    React.useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="App">
            <Header />
            <div id="content">
                <button onClick={toggleModal}>Add User</button>
                <AddUserModal displayModal={shown && !editUser} closeModal={closeModals} onSubmit={handleAddUser} />
                <UpdateUserModal displayModal={shown && !!editUser} closeModal={closeModals} user={editUser} onSubmit={handleUpdateUser} />
                <h2>Users List</h2>
                <UserTable users={users} onEdit={openUpdateUserModal} onDelete={handleDeleteUser} />
                <h2>Manager and Employees</h2>
                <input type="text" placeholder="Enter manager's name" onBlur={(e) => fetchManagerAndEmployees(e.target.value)} />
                {managerAndEmployees && (
                    <div>
                        <h3>Manager: {managerAndEmployees.manager.firstName} {managerAndEmployees.manager.lastName}</h3>
                        <h4>Employees:</h4>
                        <ul>
                            {managerAndEmployees.employees.map(employee => (
                                <li key={employee._id}>{employee.firstName} {employee.lastName}</li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>
        </div>
    );
}

export default App;
