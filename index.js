/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeArray) {
    return employeeArray.map(employee => {
        return createEmployeeRecord(employee)
    })
}

function createTimeInEvent(dateTime) {
    let date = dateTime.split(' ')[0]
    let time = parseInt(dateTime.split(' ')[1])
    this.timeInEvents.push({type: 'TimeIn', date: date, hour: time})
    return this
}

function createTimeOutEvent(dateTime) {
    let date = dateTime.split(' ')[0]
    let time = parseInt(dateTime.split(' ')[1])
    this.timeOutEvents.push({type: 'TimeOut', date: date, hour: time})
    return this
}

function hoursWorkedOnDate(date) {
    let clockIn = this.timeInEvents.find(event => event.date === date).hour
    let clockOut = this.timeOutEvents.find(event => event.date === date).hour
    return (clockOut - clockIn)/100
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

function findEmployeeByFirstName(employeeArray, name) {
    return employeeArray.find(employee => employee.firstName === name)
}

function calculatePayroll(employeeArray) {
    return employeeArray.reduce((total, employee) => {
        return total + allWagesFor.call(employee)
    }, 0)
}