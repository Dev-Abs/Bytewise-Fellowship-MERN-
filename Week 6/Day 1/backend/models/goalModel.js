const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add some text']
    }
},
{
    timestamps: true // this will add createdAt and updatedAt fields, why? , because we want to know when the goal was created and when it was updated
});

module.exports = mongoose.model('Goal', goalSchema);

// why we are using model here?
// because we want to create a model from the schema
// so we can use this model to interact with the database
