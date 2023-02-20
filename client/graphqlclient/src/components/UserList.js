import React, { useState, useEffect } from 'react';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';

const GET_USER = gql`
	{
		users {
			username
			age
			name
			id
		}
	}
`;

const GET_USER_BY_NAME = gql`
	query UserByName($name: String) {
		userByName(name: $name) {
			name
			age
			username
		}
	}
`;

const GET_USER_BY_ID = gql`
	query UserById($userByIdId: ID) {
		userById(id: $userByIdId) {
			id
			username
			name
			age
			nationality
		}
	}
`;

const DELETE_USER_MUTATION = gql`
	mutation DeleteUser($input: DeleteUserInput) {
		deleteUser(input: $input) {
			id
		}
	}
`;

const UPDATE_USER_MUTATION = gql`
	mutation ($input: UpdateUserInput) {
		updateUser(input: $input) {
			id
			name
			username
			age
			nationality
		}
	}
`;

const CREATE_USER_MUTATION = gql`
	mutation ($input: UserInput) {
		createUser(input: $input) {
			name
			username
			age
			nationality
		}
	}
`;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

function UserList() {
	const { data: UserData, refetch } = useQuery(GET_USER);
	const [fatchUser, { data: userSerachedData }] = useLazyQuery(GET_USER_BY_NAME);
	const [fatchUserById, { data: getById }] = useLazyQuery(GET_USER_BY_ID);
	const [deleteUser] = useMutation(DELETE_USER_MUTATION);
	const [createUser] = useMutation(CREATE_USER_MUTATION);
	const [updateUser] = useMutation(UPDATE_USER_MUTATION);

	const [userSerched, setUserSerched] = useState('');
	const [userData, setUserData] = useState({
		name: '',
		username: '',
		age: '',
		nationality: '',
	});

	return (
		<>
			<Box
				component="form"
				sx={{
					'& .MuiTextField-root': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete="off"
			>
				<h3>Create User</h3>
				<TextField
					label="Enter name"
					id="outlined-size-small"
					size="small"
					// value={getById && getById.userById.name}
					value={userData.name}
					onChange={(e) => setUserData({ ...userData, name: e.target.value })}
					focused
				/>
				<TextField
					label="Enter username"
					id="outlined-size-small"
					size="small"
					// value={getById && getById.userById.username}
					value={userData.username}
					onChange={(e) => setUserData({ ...userData, username: e.target.value })}
					focused
				/>
				<br />
				<TextField
					label="Enter age"
					id="outlined-size-small"
					size="small"
					// value={getById && getById.userById.age}
					value={userData.age}
					onChange={(e) => setUserData({ ...userData, age: e.target.value })}
					focused
				/>
				<TextField
					label="Enter nationality"
					id="outlined-size-small"
					size="small"
					// value={getById && getById.userById.nationality}
					value={userData.nationality}
					onChange={(e) => setUserData({ ...userData, nationality: e.target.value })}
					focused
				/>
				<br />
				<br />
				<Button
					variant="contained"
					size="small"
					onClick={() => {
						if (userData.id) {
							updateUser({
								variables: {
									input: {
										id: userData.id,
										name: userData.name,
										userName: userData.username,
										age: parseInt(userData.age),
										nationality: userData.nationality,
									},
								},
							});
							refetch();
							toast.success('Successfully Updated new user!!');
						} else {
							createUser({
								variables: {
									input: {
										name: userData.name,
										username: userData.username,
										age: parseInt(userData.age),
										nationality: userData.nationality,
									},
								},
							});
							refetch();
							toast.success('Successfully create new user!!');
						}
					}}
				>
					{userData.id ? 'Update' : 'Add'}
				</Button>
			</Box>
			<br />
			<br />
			<TableContainer>
				<Box
					component="form"
					sx={{
						'& .MuiTextField-root': { m: 1, width: '25ch' },
					}}
					noValidate
					autoComplete="off"
				>
					<h3>Search By Name</h3>
					<TextField
						label="Serch by name"
						id="outlined-size-small"
						size="small"
						onChange={(e) => setUserSerched(e.target.value)}
					/>
					<br />
					<Button
						variant="contained"
						size="small"
						onClick={() => {
							fatchUser({
								variables: {
									name: userSerched,
								},
							});
							refetch();
						}}
					>
						Find
					</Button>
				</Box>
				<br />
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					{userSerachedData &&
						userSerachedData.userByName.map((row) => (
							<>
								<TableHead>
									<TableRow>
										<StyledTableCell>Username</StyledTableCell>
										<StyledTableCell align="left">Name</StyledTableCell>
										<StyledTableCell align="left">Age</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<StyledTableRow key={row.name}>
										<StyledTableCell align="left">{row.username}</StyledTableCell>
										<StyledTableCell align="left">{row.name}</StyledTableCell>
										<StyledTableCell align="left">{row.age}</StyledTableCell>
									</StyledTableRow>
								</TableBody>
							</>
						))}
				</Table>
			</TableContainer>
			<br />
			<TableContainer component={Paper}>
				<h3>User List</h3>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell align="left">Username</StyledTableCell>
							<StyledTableCell align="left">Name</StyledTableCell>
							<StyledTableCell align="left">Age</StyledTableCell>
							<StyledTableCell align="left">Modify</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{UserData &&
							UserData.users.map((row) => (
								<StyledTableRow>
									<StyledTableCell align="left">{row.username}</StyledTableCell>
									<StyledTableCell align="left">{row.name}</StyledTableCell>
									<StyledTableCell align="left">{row.age}</StyledTableCell>
									<StyledTableCell align="left">
										<Button
											variant="contained"
											size="small"
											onClick={() => {
												deleteUser({
													variables: {
														input: { id: row.id },
													},
												});
												refetch();
												toast.success('Successfully Deleted user!!');
											}}
										>
											Delete
										</Button>
										<br />
										<br />
										<Button
											variant="contained"
											size="small"
											onClick={() => {
												setUserData(row);
												refetch();
												// fatchUserById({
												// 	variables: {
												// 		userByIdId: row.id,
												// 	},
												// });
												// toast.success('Successfully Deleted user!!');
											}}
										>
											Update
										</Button>
									</StyledTableCell>
								</StyledTableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}

export default UserList;

// function UserList() {
// 	const { data: UserData } = useQuery(GET_USER);
// 	const [fatchUser, { data: userSerachedData }] = useLazyQuery(GET_USER_BY_NAME);
// 	console.log('userSerachedData--->', userSerachedData);
// 	const [userSerched, setUserSerched] = useState('');

// 	return (
// 		<div>
// 			<h1>User List</h1>
// 			{UserData && (
// 				<div>
// 					<div>
// 						<input input="text" placeholder="Enter Name" onChange={e => setUserSerched(e.target.value)} />
// 						<button
// 							onClick={() => {
// 								fatchUser({
// 									variables: {
// 										name: userSerched,
// 									},
// 								});
// 							}}
// 						>
// 							Find
// 						</button>
// 					</div>
// 					<h5>Search By Name</h5>
// 					{userSerachedData &&
// 						userSerachedData.userByName.map(i => {
// 							return (
// 								<div>
// 									<h3>Name: {i.name}</h3>
// 									<h3>Age: {i.age}</h3>
// 									<h3>Username: {i.username}</h3>
// 								</div>
// 							);
// 						})}

// 					{
// 						<center>
// 							<br />
// 							<table border="1">
// 								<thead>
// 									<tr>
// 										<td>User Name</td>
// 										<td>Name</td>
// 										<td>Age</td>
// 									</tr>
// 								</thead>
// 								{UserData.users.map(i => {
// 									return (
// 										<tbody>
// 											<td>{i.username}</td>
// 											<td>{i.name}</td>
// 											<td>{i.age}</td>
// 										</tbody>
// 									);
// 								})}
// 							</table>
// 						</center>
// 					}
// 				</div>
// 			)}
// 		</div>
// 	);
// }
