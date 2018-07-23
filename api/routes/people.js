const express = require("express");
const router = express.Router();
const People = require("../models/people");
const mongoose = require("mongoose");

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

const DUPLICATED_ITEM = 11000;
router.post("/", (req, res) => {
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
      if (err.code === DUPLICATED_ITEM) {
        return res
          .status(400)
          .json({
            errors: {
              field: "cpf",
              message: `duplicated entry for ${req.body.cpf}`
            }
          });
      }
      return res.status(400).json({ errors: err });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  People.remove({ _id: id })
    .exec()
    .then(result => {
      return res.status(204).send();
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
