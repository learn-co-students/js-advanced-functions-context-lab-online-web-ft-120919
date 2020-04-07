/* Your Code Here */
let createEmployeeRecord = function(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeesArray) {
    return employeesArray.map(function(employeeArray) {
        return createEmployeeRecord(employeeArray)
    })
}

let createTimeInEvent = function(timestamp) {
    let [date, hour] = timestamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        date,
        hour: parseInt(hour, 10)
    })

    return this
}

let createTimeOutEvent = function(timestamp) {
    let [date, hour] = timestamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        date,
        hour: parseInt(hour, 10)
    })

    return this
}

let hoursWorkedOnDate = function(date) {
    let timeStart = this.timeInEvents.find(timeIn => timeIn.date === date).hour
    let timeEnd = this.timeOutEvents.find(timeOut => timeOut.date === date).hour

    return (timeEnd - timeStart) / 100
}

let wagesEarnedOnDate = function(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

let calculatePayroll = function(employeesArray) {
    return employeesArray.reduce(function(total, currentEmployee) {
        return total + allWagesFor.call(currentEmployee)
    }, 0)
}

function findEmployeeByFirstName(employeesArray, firstNameString) {
    return employeesArray.find(employee => employee.firstName === firstNameString)
}

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