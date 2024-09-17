const express = require("express")
const moment = require("moment")
const PORT = 8080
const app = express()
app.use(express.json())



app.get("/", (req, res) => {
    return res.status(200).send("Welcome")
})


app.get("/formate", async (req, res) => {
    try {
        //current date and time
        let currentDateAndTime = moment()

        //formate date and time 
        let formatedDate = currentDateAndTime.format('YYYY-MM-DD HH:mm:ss')   //2024-09-17T04:53:53.481Z
        let formatedOnlyDate = currentDateAndTime.format('YYYY-MM-DD')   //2024-09-17 10:23:53

        let formatedDateWithampm = currentDateAndTime.format('MMMM Do YYYY, h:mm:ss a');  // September 17th 2024, 12:34:56 pm
        let dayInEnglish = currentDateAndTime.format('dddd')                   // Tuesday
        let currentDateInWord = currentDateAndTime.format('MMM Do YY')           // Sep 17th 24
        let customizeDate = currentDateAndTime.format('YYYY [escaped text] MM')  //2024 escaped text 09

        const now = moment();

        let year = now.year();   // 2024
        let month = now.month();  // 8 (September, months are zero-indexed)
        let day = now.date();   // 17
        let hour = now.hour();   // 12
        let minutus = now.minute(); // 34
        let second = now.second(); // 56


        return res.status(200).send({
            currentDateAndTime,
            formatedDate,
            formatedOnlyDate,
            formatedDateWithampm,
            dayInEnglish,
            currentDateInWord,
            customizeDate,
            year,
            month,
            day,
            hour,
            minutus,
            second
        })

    } catch (error) {
        return res.status(500).send({ status: "failed", message: error.message })
    }
})


app.get("/time", async (req, res) => {
    try {



        let future = moment().add(7, 'days');
        console.log(future.format('YYYY-MM-DD')); // 7 days in the future

        let past = moment().subtract(1, 'month');  // 1 month in past
        console.log(past.format('YYYY-MM-DD'));


        return res.status(200).send({
            future,
            past
        })
    } catch (error) {
        return res.status(500).send({ message: "failed" })
    }
})


app.get("/diff", async (req, res) => {
    try {

        //get diffrence between two time 
        const start = moment('2024-09-01');
        const end = moment('2024-09-17');
        const diffrenceBetweenStartAndEnd = end.diff(start, 'days');  // 16



        let formCurrentDate = moment('2024-09-15').fromNow(); // 2 days ago  current day kitna din aage ya piche hai
        let formCurrentDate2 = moment('2024-09-19').fromNow(); // in 2 days


        return res.status(200).send({
            diffrenceBetweenStartAndEnd,
            formCurrentDate,
            formCurrentDate2
        })


    } catch (error) {
        return res.status(500).send(`Internal server error ${error.message}`)
    }
})


app.get("/compair", async (req, res) => {
    try {

        const date1 = moment('2024-09-17');
        const date2 = moment('2024-09-18');

        console.log(date1.isBefore(date2));  // true
        console.log(date2.isAfter(date1));   // true
        console.log(date1.isSame('2024-09-17'));  // true



        return res.send("compair two dates")


    } catch (error) {
        return res.status(500).send(`Internal server error ${error.message}`)
    }
})

app.get("/timeZone", async (req, res) => {
    try {

        const moment = require('moment-timezone');

        const nowInLA = moment.tz('America/Los_Angeles');
        console.log(nowInLA.format('YYYY-MM-DD HH:mm:ss')); // Time in Los Angeles

        const nowInIST = moment.tz('Asia/Kolkata');
        console.log(nowInIST.format('YYYY-MM-DD HH:mm:ss')); // Time in India (IST)

        return res.send("timezone set")

    } catch (error) {
        return res.status(500).send(`Internal server error ${error.message}`)
    }
})



app.get("/validate", async (req, res) => {
    try {

        const validDate = moment('2024-09-17', 'YYYY-MM-DD', true).isValid();
        console.log(validDate); // true

        const invalidDate = moment('2024-13-40', 'YYYY-MM-DD', true).isValid();
        console.log(invalidDate); // false


        return res.send("validate date")

    } catch (error) {
        return res.status(500).send(`Internal server error ${error.message}`)
    }
})



app.get("/parseDate", async (req, res) => {
    try {
        const birthday = moment('1995-12-25');
        console.log(birthday.format('YYYY-MM-DD')); // 1995-12-25

        const birthdays = moment('25-12-1995', 'DD-MM-YYYY');
        console.log(birthdays.format('YYYY-MM-DD')); // 1995-12-25

return res.status(200).send("date  object create and modify")



    } catch (error) {
        return res.status(500).send(`Internal server error ${error.message}`)
    }
})

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})
