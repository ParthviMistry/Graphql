import React, { Component } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './App.css';
import BookList from './components/BookList';
import UserList from './components/UserList';
import { Toaster } from 'react-hot-toast';

function App() {
	const client = new ApolloClient({
		cache: new InMemoryCache(),
		uri: 'http://localhost:4000/graphql',
	});

	return (
		<ApolloProvider client={client}>
			<div className="App">
				{/* <BookList /> */}
				<UserList />
			</div>
			<Toaster position="top-center" />
		</ApolloProvider>
	);
}

export default App;
