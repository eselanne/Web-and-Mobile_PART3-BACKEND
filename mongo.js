const mongoose = require('mongoose')

// Replace with the URL of your own database. Do not store the password on GitLab!
const url = 'mongodb+srv://fullstack:Ohjelmointionkivaa@cluster0.thw53.mongodb.net/fullstack-reminders'

var myArgs = process.argv.slice(2)
console.log(myArgs)




//If 0 parameters is given (LIST ALL)
if (myArgs.length === 0) {
    console.log("Tyhjä lista")
    mongoose.connect(url)

    const reminderSchema = new mongoose.Schema({
        name: String,
        timestamp: Date,
    })

    const Reminder = mongoose.model('Reminder', reminderSchema);


    app.get('/api/reminders', (request, response) => {
        Reminder
            .find({})
            .then(reminders => {
                response.json(reminders)
            })
    })
    /*
        Reminder
            .find({})
            .then(result => {
                console.log("\nReminders:")
                result.forEach(reminder => {
                    console.log(reminder.name + ", " + reminder.timestamp)
                })
                mongoose.connection.close()
            })
    */
}

//if parameters is given (ADD)
else {
    console.log("LISÄTÄÄN")
    mongoose.connect(url)

    const reminderSchema = new mongoose.Schema({
        name: String,
        timestamp: Date,
    })

    const Reminder = mongoose.model('Reminder', reminderSchema);

    const reminder = new Reminder({
        name: myArgs[0],
        timestamp: myArgs[1],
    })

    reminder
        .save()
        .then(response => {
            console.log('Adding reminder "' + myArgs[0] + '" at ' + myArgs[1] + ' to database!')
            mongoose.connection.close()
        })
}





