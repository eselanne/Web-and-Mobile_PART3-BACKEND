const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require('cors')
const { format } = require('path')
app.use(cors())
app.use(express.static('build'))


const Reminder = require('./models/reminder')



let reminders = [
]

app.get('/api/reminders', (request, response) => {

    Reminder
        .find({})
        .then(reminders => {
            response.json(reminders.map(formatReminder))
        })
        .catch(error => {
            console.log(error)
        })
})

const formatReminder = (reminder) => {
    return {
        name: reminder.name,
        timestamp: reminder.timestamp,
        id: reminder._id
    }
}


app.post('/api/reminders', (request, response) => {

    const body = request.body

    //check if content is missing
    if (body.name === undefined || body.timestamp === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    //check if name is not unique
    if (reminders.find(reminder => reminder.name === body.name)) {
        return response.status(400).json({ error: 'name must be unique' })
    }
    const reminder = new Reminder({
        name: body.name,
        timestamp: body.timestamp,
    })

    reminder
        .save()
        .then(savedReminder => {
            console.log("Reminder lisätty")
            response.json(formatReminder(reminder))
            // reminders = reminders.concat(formatReminder(reminder))
        })
})

app.delete('/api/reminders/:id', (request, response) => {

    if (request.params.id)

        Reminder
            .findByIdAndRemove(request.params.id)
            .then(result => {
                reminders = []

                app.get('/api/reminders', (request, response) => {

                    Reminder
                        .find({})
                        .then(reminders => {
                            response.json(reminders.map(formatReminder))
                        })
                })

                response.status(result ? 204 : 404).end()

            })
            .catch(error => {
                response.status(400).send({ error: 'malformatted id' })
            })

})



app.get('/api/reminders/:id', (request, response) => {
    Reminder
        .findById(request.params.id)
        .then(reminder => {
            if (reminder) {
                response.json(formatReminder(reminder))
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})