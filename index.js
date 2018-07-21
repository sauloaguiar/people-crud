const bodyParser = require('body-parser')
const express = require('express')
var config = require('./config')
const debug = require('debug')('people-api:server')
// const _ = require('lodash')


const app = express()

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

const people = [
  {
    id: 1,
    name: 'Joao',
    lastName: 'Silva',
    cpf: 1233456789,
    birthdate: 156235612,
  },
  {
    id: 2,
    name: 'Maria',
    lastName: 'Rocha',
    cpf: 12334561231,
    birthdate: 98787123,
  },
  {
    id: 3,
    name: 'Tereza',
    lastName: 'Nobre',
    cpf: 4433456789,
    birthdate: 4321235612,
  },
  {
    id: 4,
    name: 'Leandro',
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

app.listen(config.server.port, () => {
	debug('API listening on port 3000!')
})