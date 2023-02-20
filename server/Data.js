const UserList = [
	{
		id: 1,
		name: "John",
		username: "john",
		age: 20,
		nationality: "CANADA",
		friends: [
			{
				id: 2,
				name: "Pedro",
				username: "PedroTech",
				age: 20,
				nationality: "UK",
			}
		],
	},
	{
		id: 1,
		name: "abc",
		username: "abcc",
		age: 23,
		nationality: "USA",
		friends: [
			{
				id: 3,
				name: "Pedro",
				username: "PedroTech",
				age: 24,
				nationality: "INDIA",
			}
		],
	},
];

const MovieList = [
	{
		id: 1,
		name: "Avengers Endgame",
		yearOfPublication: 2019,
		isInTheaters: true,
	},
	{
		id: 2,
		name: "Interstellar",
		yearOfPublication: 2007,
		isInTheaters: true,
	}
];

const BookList = [
	{ name: 'Name of the Wind', genre: 'Fantasy', id: 1 },
    { name: 'The Final Empire', genre: 'Fantasy', id: 2 },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: 3 },
];

const AutherList = [
	{ name: 'Patrick Rothfuss', age: 44, id: 1 },
    { name: 'Brandon Sanderson', age: 42, id: 2 },
    { name: 'Terry Pratchett', age: 66, id: 3 }
]

module.exports = {
	UserList,
	MovieList,
	BookList,
	AutherList
}