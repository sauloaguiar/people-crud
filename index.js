const bodyParser = require('body-parser')
const express = require('express')
const config = require('./config')
const debug = require('debug')('people-api:server')
const _ = require('lodash')
const expressValidator = require('express-validator')


const app = express()
app.use(expressValidator())
app.use(bodyParser.json())
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', [
		'Accept',
		'Authorization',
		'Content-Type',
		'Origin',
		'X-Requested-With'
	].join(', '))
	res.header('Access-Control-Allow-Methods', [
		'DELETE',
		'GET',
		'HEAD',
		'OPTIONS',
		'PATCH',
		'POST',
		'PUT'
	].join(', '))
	next()
})

let people = [
  {
    id: 1,
    firstName: 'Joao',
    lastName: 'Silva',
    cpf: 1233456789,
    birthdate: 156235612,
  },
  {
    id: 2,
    firstName: 'Maria',
    lastName: 'Rocha',
    cpf: 12334561231,
    birthdate: 98787123,
  },
  {
    id: 3,
    firstName: 'Tereza',
    lastName: 'Nobre',
    cpf: 4433456789,
    birthdate: 4321235612,
  },
  {
    id: 4,
    firstName: 'Leandro',
    lastName: 'Brega',
    cpf: 12334567123,
    birthdate: 156123125612,
  }
];

app.get('/api/people', (req, res) => {
	res.json({
		data: people
	})
})

app.get('/api/people/:id', (req, res) => {
	const id = parseInt(req.params.id, 10)

	if (_.isNaN(id)) {
		return res.status(400).json({
			errors: [
				{
					detail: `Specified id is not a number: ${req.params.id}`
				}
			]
		})
	}

	const person = _.find(people, {
		id
	})

	if (!person) {
		return res.status(404).json({
			errors: [
				{
					detail: `Could not find person with id ${id}`
				}
			]
		})
	}

	return res.json({
		data: person
	})
})

app.post('/api/people', (req, res) => {
  req.assert('firstName', 'firstName is required').notEmpty();
  req.assert('lastName', 'lastName is required').notEmpty();
  req.assert('birthdate', 'birthdate is required').notEmpty();
  req.assert('cpf', 'cpf is required').notEmpty();
  const errors = req.validationErrors()
    
  if( !errors ) {   //No errors were found.  Passed Validation!
    people.push(req.body);
    res.json({data: people});
  } else {
    return res.status(400).json({
			errors
		})
  } 
  
});

app.listen(config.server.port, () => {
	debug('API listening on port 3000!')
})