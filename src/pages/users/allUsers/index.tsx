import React from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useEffect } from "react";
import { useActions } from "../../../hooks/useActions";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router-dom";

interface UserData {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    emailConfirmed: boolean,
    lockedOut: string,
    role: string,
}

const AllUsers = () => {
    const { GetAllUsers, DeleteById, SelectdUser } = useActions();
    const [ isRedirect, setIsRedirect ] = useState(false);
    const { allUsers } = useTypedSelector((store) => store.UserReducer);
    
    const EditUserAc = (user: any) => {
        SelectdUser(user);
        setIsRedirect(true);
    }

    const DeleteUser = (id: any, email: any) => {
        const user = {
            Id: id,
            Email: email
        };
        DeleteById(user);
    }

    useEffect(() => {
        GetAllUsers();
    }, []);

    if(isRedirect)
    {
        return <Navigate to="/dashboard/edituser"/>
    }else
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">FirstName</TableCell>
                        <TableCell align="center">LastName</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">EmailConfirmed</TableCell>
                        <TableCell align="center">LockedOut</TableCell>
                        <TableCell align="center">Role</TableCell>
                        <TableCell align="center">Delete</TableCell>
                        <TableCell align="center">Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allUsers.map((user: UserData) => (
                        <TableRow key={user.id}>
                            <TableCell align="center">{user.firstName}</TableCell>
                            <TableCell align="center">{user.lastName}</TableCell>
                            <TableCell align="center">{user.email}</TableCell>
                            <TableCell align="center">{user.emailConfirmed ? 'true' : 'false'}</TableCell>
                            <TableCell align="center">{user.lockedOut ? user.lockedOut : '-'}</TableCell>
                            <TableCell align="center">{user.role}</TableCell>
                            <TableCell align="center"><Button onClick={()=>DeleteUser(user.id, user.email)}>Delete</Button></TableCell>
                            <TableCell align="center"><Button onClick={()=>EditUserAc(user)}></Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AllUsers;