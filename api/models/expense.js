var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required:true
    },
    
    description: {
        type: String,
        required:true
    },
    
    category: {
        type: String,
        required:true
    },
    
    date: {
        type: Date,
        required: true
    },
    
    user_id: {
        type: String,
        required: true
    }
});

//compile the model
mongoose.model('Expense', expenseSchema);