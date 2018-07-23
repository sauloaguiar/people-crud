const express = require("express");
const router = express.Router();
const People = require("../models/people");
const mongoose = require("mongoose");

let people = [
  {
    id: 1,
    firstName: "Joao",
    lastName: "Silva",
    cpf: 1233456789,
    birthdate: 156235612
  },
  {
    id: 2,
    firstName: "Maria",
    lastName: "Rocha",
    cpf: 12334561231,
    birthdate: 98787123
  },
  {
    id: 3,
    firstName: "Tereza",
    lastName: "Nobre",
    cpf: 4433456789,
    birthdate: 4321235612
  },
  {
    id: 4,
    firstName: "Leandro",
    lastName: "Brega",
    cpf: 12334567123,
    birthdate: 156123125612
  }
];

router.get("/", (req, res) => {
  People.find()
    .select("_id firstName lastName cpf birthdate")
    .exec()
    .then(result => {
      const data = result.map(entry => {
        return {
          id: entry._id,
          firstName: entry.firstName,
          lastName: entry.lastName,
          cpf: entry.cpf,
          birthdate: entry.birthdate
        };
      });
      return res.status(200).json({ data });
    })
    .catch(err => {
      return res.status(500).json({ errors: err });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  People.findById(id)
    .then(entry => {
      if (entry) {
        return res.status(200).json({
          data: {
            id: entry._id,
            firstName: entry.firstName,
            lastName: entry.lastName,
            cpf: entry.cpf,
            birthdate: entry.birthdate
          }
        });
      } else {
        return res.status(404).json({
          errors: {
            detail: `Could not find person with id ${id}`
          }
        });
      }
    })
    .catch(err => {
      return res.status(500).json({ errors: err });
    });
});

router.post("/", (req, res) => {
  req.assert("firstName", "firstName is required").notEmpty();
  req.assert("lastName", "lastName is required").notEmpty();
  req.assert("birthdate", "birthdate is required").notEmpty();
  req.assert("cpf", "cpf is required").notEmpty();
  const errors = req.validationErrors();

  if (!errors) {
    //No errors were found.  Passed Validation!
    const person = new People({
      _id: new mongoose.Types.ObjectId(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      cpf: req.body.cpf,
      birthdate: req.body.birthdate
    });
    person
      .save()
      .then(entry => {
        return res.json({
          data: {
            id: entry._id,
            firstName: entry.firstName,
            lastName: entry.lastName,
            cpf: entry.cpf,
            birthdate: entry.birthdate
          }
        });
      })
      .catch(err => {
        console.log(err);
        return res.status(400).json({ error: err });
      });
  } else {
    return res.status(400).json({
      errors
    });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  People.remove({ _id: id })
    .exec()
    .then(result => {
      return res.status(204);
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
});

router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const updateOps = {};
  for (const op of req.body) {
    updateOps[op.propName] = ops.value;
  }
  People.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      return result.status(200).json({
        data: {
          id: entry._id,
          firstName: entry.firstName,
          lastName: entry.lastName,
          cpf: entry.cpf,
          birthdate: entry.birthdate
        }
      });
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
});

module.exports = router;
