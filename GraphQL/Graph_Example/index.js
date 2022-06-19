'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const { graphExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const PORT = 8000;

const app = express();

const typeDefs = `
   type Lang {
       id:Int,
       name:String!,  
   }
   type Query {
       getLangs(name:String):[Lang]
   }
`;

const langs = [
	{
		id: 0,
		name: 'Node'
	},
	{
		id: 1,
		name: 'Java'
	}
];

const resolvers = {
	Query: {
		getLangs: () => langs //getLangs요청을 받으면 langs배열을 응답해줄 것입니다.
	}
};

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

app.use('/graphql', bodyParser.json(), graphExpress({ schema }));

app.use(
	'/graphiql',
	graphiqlExpress({
		endpoint: '/graphiql'
	})
);

app.listen(PORT, () => console.log(`SERVER RUNNING AT ${PORT}`));
