const express = require('express');
const router = express.Router();

const Tenant = require('../models/Tenant');

router.route('/')
  .get((req, res) => {
    Tenant.find() //  find ALL documents
      .then((tenants) => res.send(tenants))
      .catch((err) => res.status(400).send(err));
  })
  .post((req, res) => {
    Tenant.create(req.body)
      .then((tenant) => res.send(tenant))
      .catch((err) => res.status(400).send(err));
  });

router.route('/:id')
  .put((req, res) => {
    Tenant.findById(req.params.id)
      .then((tenant) => tenant.haveBirthday())
      .then((tenant) => {
        res.send(tenant);
      })
      .catch((err) => res.status(400).send(err));
  });

module.exports = router;

// //  GET /api/users - all users
// //  GET /api/users?sort=age   -   sort by age
// router.route('/')
//   .get((req, res) => {
//     let dbQuery = User.find();
//
//     if (req.query.sort) {
//       dbQuery.sort(req.query.sort);
//     }
//
//     if (req.query.limit) {
//       dbQuery.limit(Number(req.query.limit));
//     }
//
//     dbQuery
//       .then((users) => res.send(users))
//       .catch((err) => res.status(400).send(err));
//   })
//   .post((req, res) => {
//     User.create(req.body)
//       .then((user) => res.send(user))
//       .catch((err) => res.status(400).send(err));
//   });
// module.exports = router;
