const { UserList, MovieList, BookList, AutherList } = require('../Data');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');
const User = require('../models/user');
const Movie = require('../models/movie');

const resolvers = {
	Query: {
		test: () => 'Test Success!',
		users: async () => {
			return await User.find({});
		},
		movies: async () => {
			return await Movie.find({});
		},
		books: async () => {
			return await Book.find({});
		},
		authors: async () => {
			return await Author.find({});
		},

		bookById: async (root, args) => {
			// const book = _.find(Book, { id: Number(args.id) });
			const book = await Book.findById(args.id);
			console.log('book-->', book);
			return book;
		},

		authorById: (root, args) => {
			return _.find(Auther, { id: Number(args.id) });
		},

		userById: async (parent, args) => {
			// const user = _.find(User, { id: Number(args.id) });
			const user = await User.findById(args.id);
			console.log('user-->', user, args);

			return user;
		},

		userByName: async (parent, args) => {
			console.log('argss-->', args);
			// let a = _.find(User, { name: args.name });
			let a = await User.find({ name: args.name });
			console.log('a-->', a);
			return a;
		},

		movieById: (parent, { name }) => {
			return _.find(Movie, { name });
		},
	},

	Mutation: {
		createBook: async (parent, args) => {
			// let book = new Book({
			//    name:args.name,
			//    genre:args.genre
			// });
			let book = await Book.create(args);
			console.log('book', book);
			return book.save();
		},

		createMovie: async (parent, args) => {
			let movie = await Movie.create({
				name: args.name,
				yearOfPublication: args.yearOfPublication,
				isInTheaters: args.isInTheaters,
			});
			return movie.save();
		},

		createAuthor: async (parent, args) => {
			let author = await Author.create({
				name: args.name,
				age: args.age,
			});
			return author.save();
		},

		createUser: async (parent, args) => {
			let user = await User.insertMany(args.input);
			return user;
		},

		updateUser: async (parent, args) => {
			const { id, userName, name, age, nationality } = args.input;
			const data = await User.findByIdAndUpdate(
				{ _id: id },
				{
					$set: {
						name,
						username: userName,
						age,
						nationality,
					},
				},
			);
			console.log('data', data);
			return data;
		},

		deleteBook: async (parent, args) => {
			const bookDelete = await Book.findByIdAndDelete({ _id: args.input.id });
			console.log('bookDelete', bookDelete);
			return bookDelete;
		},

		deleteUser: async (parent, args) => {
			const userDelete = await User.findByIdAndDelete({ _id: args.input.id });
			console.log('userDelete', userDelete);
			return userDelete;
		},
	},
};

module.exports = { resolvers };

//  createUser: async(parent, args) => {
//          console.log("args",args.input.map((i)=> {return i.name}) ,args.input.name);
//          let user = await User.insertMany(
//             args.input.map((i)=>{
//                return {
//                   name:i.name,
//                   age:i.genre,
//                   nationality: i.nationality,
//                   fullname: i.fullname,
//                }
//             })
//          );
//          return user.save();
//       },

// mutation {
//   createBook(name: "The Long Earth test", genre: "Fantasyyyyyyyy") {
//     name
//     genre
//   }

//   createAuthor(name: "teat",age: "20"){
//     name
//     age
//   }

//   createMovie(name: "teast movie",yearOfPublication: "2020", isInTheaters: false){
//     name
//     isInTheaters
//     yearOfPublication
//   }

//   createUser(name: "teat name"){
//     name

//   }
// }

/**
 * mutation CreateBook($name: String, $genre: String) {
      createBook(name: $name, genre: $genre) {
         name
         genre
      }
   }
 * {
    "name": "data",
    "genre": "dataa",
   }

   mutation CreateBook($input: BookInput) {
    createBook(input: $input) {
      name
      genre
      yearOfPublication
      authorName
    }
  }
  {
      "input": {
          "name": "aaaaaaaaaaaaa",
          "genre": "aaaaaaa",
          "yearOfPublication": 5623,
          "authorName": "aaaaaaaaaaaaa",
      },
  }

   update

   mutation UpdateUser($input: UpdateUserInput) {
      updateUser(input: $input) {
         name
         username
      }
   }
   {
      "input": {
         "id": "62ea45d285d3455a8ec59302",
         "newUserName": "aaaaaaaaaaaaaaaaaaa"
   },

   find by name

   query UserByName($name: String) {
      userByName(name: $name) {
         name
      }
   }
   {
      "name": "aaaaaaaaaaaaaaaaaaa",
   }

   update name

   mutation UpdateUser($input: UpdateUserInput) {
      updateUser(input: $input) {
         name
      }
   }
   {
   "input": {
      "id": "62ea45d285d3455a8ec59301",
      "newUserName": "testing"
   }
}  
}
 */
