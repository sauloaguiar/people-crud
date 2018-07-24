const url = 'http://localhost:4000';
export function updatePerson(person) {
  return fetch(`${url}/api/people/${person.id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify([
      {
        propName: 'firstName',
        value: person.firstName,
      },
      { propName: 'lastName', value: person.lastName },
      { propName: 'cpf', value: person.cpf },
      { propName: 'birthdate', value: person.birthdate },
    ]),
  });
}

export function createPerson(person) {
  return fetch(`${url}/api/people`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      firstName: person.firstName,
      lastName: person.lastName,
      cpf: person.cpf,
      birthdate: person.birthdate,
    }),
  });
}

export function loadPeople() {
  return fetch(`${url}/api/people`);
}

export function deletePerson(personId) {
  return fetch(`${url}/api/people/${personId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  });
}
