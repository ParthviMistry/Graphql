const { gql } = require('apollo-server');

const typeDefs = gql`
	type Query {
		test: String
		users: [User]
		movies: [Movie]
		books: [Book]
		authors: [Author]

		bookById(id: ID!): Book
		authorById(id: ID!): Author!
		userById(id: ID): User
		userByName(name: String): [User]
		movieById(name: String!): Movie!
	}

	type User {
		id: ID!
		name: String
		username: String
		age: Int
		nationality: Nationality
		friends: [User]
		favoriteMovies: [Movie]
	}

	type Movie {
		id: ID!
		name: String!
		yearOfPublication: String!
		isInTheaters: Boolean!
	}

	type Book {
		id: ID!
		name: String
		genre: String
		yearOfPublication: Int
		authorName: String
		authorId: String
	}

	type Author {
		id: ID!
		name: String
		age: String
	}

	input UserInput {
		name: String
		username: String
		nationality: String
		age: Int
	}
	input BookInput {
		name: String
		genre: String
		yearOfPublication: Int
		authorName: String
	}
	input UpdateUserInput {
		id: ID
		userName: String
		name: String
		age: Int
		nationality: String
	}
	input DeleteUserInput {
		id: ID
	}
	input DeleteBookInput {
		id: ID
	}

	type Mutation {
		createBook(name: String, genre: String, yearOfPublication: Int, authorName: String): Book
		createAuthor(name: String, age: String): Author
		createMovie(name: String, yearOfPublication: String, isInTheaters: Boolean): Movie

		createUser(input: UserInput): [User]
		updateUser(input: UpdateUserInput): User
		deleteUser(input: DeleteUserInput): User
		deleteBook(input: DeleteBookInput): Book
	}

	enum Nationality {
		INDIA
		CANADA
		BRAZIL
		CHILE
		USA
		UK
		GERMANY
	}
`;

module.exports = { typeDefs };

// // const graphql = require('graphql');

// // const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// // const BookType = new GraphQLObjectType({
// //     name: 'Book',
// //     fields: ( ) => ({
// //         id: { type: GraphQLString },
// //         name: { type: GraphQLString },
// //         genre: { type: GraphQLString }
// //     })
// // });

// const {gql} = require('apollo-server');

// const data = gql`
//     type Query {
//         test: String
//         greeting:String
//         books:[Book]
//         author:[Auther]
//     }

//     type Book {
//         id:ID!
//         name:String
//         genre:String
//     }

//      type Auther {
//         id:ID!
//         name:String
//         age:String
//     }
// `;

// module.exports = {data}
