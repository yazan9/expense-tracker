var mongoose = require('mongoose');
var Expense = mongoose.model('Expense');

var isLoggedIn = function(req){
    if(!req.payload._id){
        return false;
    }
    else {
        return true;
    }
};

module.exports.getExpenses = function(req, res) {
    if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    
    Expense.find({user_id:req.payload._id},function (err, expenses) {
        if (err) return console.log("could not get data: ERROR 001");
        res.status(200).json(expenses);
        });
    }
};

module.exports.getExpense = function(req, res) {
    if (!isLoggedIn(req)) {
        res.status(401).json({
            "message" : "UnauthorizedError: private area!"
        });
    } else {
        Expense.find({ _id: req.params.id }, function (err, expense) {
        if (err) return console.error("could not get data: ERROR 002");
        res.status(200).json(expense[0]);
        });
    }
};

module.exports.updateExpense = function(req, res) {
    if (!isLoggedIn(req)) {
        res.status(401).json({
            "message" : "UnauthorizedError: private area!"
        });
    } else {
        const expense = {description: req.body.description, amount: req.body.amount,category: req.body.category, date:req.body.date};
    
        Expense.update({_id:req.body._id}, expense, function (err,exp){
        if (err) return console.error("could not update expense: ERROR 003");
        res.status(200).json(exp); 
        });
    }
};

module.exports.addExpense = function(req, res) {
    if (!isLoggedIn(req)) {
        res.status(401).json({
            "message" : "UnauthorizedError: private area!"
        });
    } else {
        const expense = new Expense({description: req.body.description, amount: req.body.amount, category: req.body.category, date: req.body.date, user_id: req.payload._id});
    
        expense.save(function (err,exp){
            if (err) return console.error("could not add expense: ERROR 004");
            res.status(200).json(exp); 
        });
    }
};

module.exports.deleteExpense = function(req, res) {
    if (!isLoggedIn(req)) {
        res.status(401).json({
            "message" : "UnauthorizedError: private area!"
        });
    } else {
        Expense.remove({ _id: req.params.id }, function (err, expense) {
        if (err) return console.error("could not delete expense: ERROR 005");
        res.status(200).json({});
        });
    }
};