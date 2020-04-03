/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const createEmployeeRecord = function(arr){
    const [firstName, familyName, title, payPerHour] = arr
    return {firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function(arrOfArrays) {
    return arrOfArrays.map(arr => createEmployeeRecord(arr))
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
    // console.log(payable)
    return payable
}

const createTimeInEvent = function(timestmp) {
    const [date, time] = timestmp.split(' ')
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(time),
        date: date
    })
    return this
}

const createTimeOutEvent = function(timestmp) {
    const [date, time] = timestmp.split(' ')
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(time),
        date: date
    })
    return this
}

const hoursWorkedOnDate = function(datestmp) {
    const arrDateIn = this.timeInEvents.filter( obj => obj.date === datestmp) 
    const arrDateOut = this.timeOutEvents.filter( obj => obj.date === datestmp) 
    return (arrDateOut[0].hour - arrDateIn[0].hour)/100
}

const wagesEarnedOnDate = function(datestmp) {
    return hoursWorkedOnDate.call(this, datestmp) * this.payPerHour
}

const findEmployeeByFirstName = function(arrEmployeeRecords, firstName) {
    return arrEmployeeRecords.find(record => record.firstName === firstName)
}

function calculatePayroll(arrEmployeeRecords) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const arrSum = arrEmployeeRecords.map( record => allWagesFor.call(record)) 
    return arrSum.reduce(reducer)
}