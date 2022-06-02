import React, { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { listUsers, deleteUser } from '../actions/adminActions';

const UserListScreen = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector((state) => state.userDelete);
    const { success: successDelete } = userDelete;

    useEffect(()=> {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers());
        } else {
            navigate('/login');
        }
    }, [dispatch, successDelete, userInfo, navigate]);

    const onDeleteHandler = (id) => {
        if(window.confirm("Are you sure you want to delete this user?")){
            dispatch(deleteUser(id));
        } 
    }

    return (
        <>
            <h1>Users</h1>
            {loading ? " ... Loading ... " : error ? ".ERROR." : (
                <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                        <td>{user.isAdmin ? "is admin " : "no admin"}</td>
                        <td>
                            <button onClick={() => onDeleteHandler(user._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            )}
        </>
  )
};

export default UserListScreen;