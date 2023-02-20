import React, { useState } from 'react';
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

const GET_BOOK = gql`
	{
		books {
			id
			name
			genre
			yearOfPublication
			authorName
		}
	}
`;

const CREATE_BOOK_MUTATION = gql`
	mutation CreateBook($name: String, $genre: String, $yearOfPublication: Int, $authorName: String) {
		createBook(name: $name, genre: $genre, yearOfPublication: $yearOfPublication, authorName: $authorName) {
			name
			genre
			yearOfPublication
			authorName
		}
	}
`;

const DELETE_BOOK_MUTATION = gql`
	mutation DeleteBook($input: DeleteBookInput) {
		deleteBook(input: $input) {
			id
		}
	}
`;

const UPDATE_BOOK_MUTATION = gql`
	mutation UpdateBook($input: UpdateBookInput) {
		updateBook(input: $input) {
			name
			genre
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

function BookList() {
	const { data: getbookData, refetch } = useQuery(GET_BOOK);
	const [createBook] = useMutation(CREATE_BOOK_MUTATION);
	const [deleteBook] = useMutation(DELETE_BOOK_MUTATION);
	const [updateBook] = useMutation(UPDATE_BOOK_MUTATION);
	const [bookData, setBookData] = useState({
		name: '',
		genre: '',
		yearOfPublication: '',
		authorName: '',
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
				<h3>Create Book</h3>
				<TextField
					label="Enter name"
					id="outlined-size-small"
					size="small"
					onChange={e => setBookData({ ...bookData, name: e.target.value })}
				/>
				<TextField
					label="Enter genre"
					id="outlined-size-small"
					size="small"
					onChange={e => setBookData({ ...bookData, genre: e.target.value })}
				/>
				<br />
				<TextField
					label="Enter year of publication"
					id="outlined-size-small"
					size="small"
					onChange={e => setBookData({ ...bookData, yearOfPublication: e.target.value })}
				/>
				<TextField
					label="Enter authorName"
					id="outlined-size-small"
					size="small"
					onChange={e => setBookData({ ...bookData, authorName: e.target.value })}
				/>
				<br />
				<br />
				<Button
					variant="contained"
					size="small"
					onClick={() => {
						createBook({
							variables: {
								name: bookData.name,
								genre: bookData.genre,
								yearOfPublication: parseInt(bookData.yearOfPublication),
								authorName: bookData.authorName,
							},
						});
						refetch();
					}}
				>
					Submit
				</Button>
				{console.log('bookData------------>', bookData)}
			</Box>
			<br />
			<br />
			<TableContainer component={Paper}>
				<h3>Book List</h3>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell align="left">Id</StyledTableCell>
							<StyledTableCell align="left">Name</StyledTableCell>
							<StyledTableCell align="left">Genre</StyledTableCell>
							<StyledTableCell align="left">yearOfPublication</StyledTableCell>
							<StyledTableCell align="left">authorName</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{getbookData &&
							getbookData.books.map(row => (
								<StyledTableRow>
									<StyledTableCell align="left">{row.name}</StyledTableCell>
									<StyledTableCell align="left">{row.genre}</StyledTableCell>
									<StyledTableCell align="left">{row.yearOfPublication}</StyledTableCell>
									<StyledTableCell align="left">{row.authorName}</StyledTableCell>
									<StyledTableCell align="left">
										<Button
											variant="contained"
											size="small"
											onClick={() => {
												deleteBook({
													variables: {
														input: { id: row.id },
													},
												});
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
												updateBook({
													variables: {
														input: {
															id: row.id,
														},
													},
												});
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

export default BookList;

// <div>
// 	<h1>Book List</h1>
// 	{getbookData && (
// 		<div>
// 			{
// 				<div>
// 					<input
// 						type="text"
// 						placeholder="Enter Name"
// 						onChange={e => setBookData({ ...bookData, name: e.target.value })}
// 					/>
// 					<br />
// 					<br />
// 					<input
// 						type="text"
// 						placeholder="Enter genre"
// 						onChange={e => setBookData({ ...bookData, genre: e.target.value })}
// 					/>
// 					<br />
// 					<br />

// 					{console.log('bookData next--->', bookData)}
// 					<button
// 						onClick={() => {
// 							createBook({
// 								variables: {
// 									name: bookData.name,
// 									genre: bookData.genre,
// 								},
// 							});
// 						}}
// 					>
// 						Create Book
// 					</button>
// 				</div>
// 			}
// 			{
// 				<center>
// 					<br />
// 					<table border="1">
// 						<thead>
// 							<tr>
// 								<td>Book Name</td>
// 								<td>Genre</td>
// 							</tr>
// 						</thead>
// 						{getbookData.books.map(i => {
// 							return (
// 								<tbody>
// 									<td>{i.name}</td>
// 									<td>{i.genre}</td>
// 								</tbody>
// 							);
// 						})}
// 					</table>
// 				</center>
// 			}
// 		</div>
// 	)}
// </div>
