var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlExpenses = require('../controllers/expenses');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//expenses
router.get('/expenses', auth, ctrlExpenses.getExpenses);
router.get('/expense/:id', auth, ctrlExpenses.getExpense);
router.put('/expense', auth, ctrlExpenses.updateExpense);
router.post('/expense', auth, ctrlExpenses.addExpense);
router.delete('/expense/:id', auth, ctrlExpenses.deleteExpense);

module.exports = router;