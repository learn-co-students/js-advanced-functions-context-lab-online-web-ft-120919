/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
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

let createEmployeeRecords = function(employeeData) {
    return employeeData.map(function(array) {
        return createEmployeeRecord(array)
    })
}

let createTimeInEvent = function(timeStamp) {
    let [date, hour] = timeStamp.split(" ")

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })

    return this 
}

let createTimeOutEvent = function(timeStamp) {
    let [date, hour] = timeStamp.split(" ")

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return this
}

let hoursWorkedOnDate = function(searchDate) {
    let timeIn = this.timeInEvents.find((day) => day.date === searchDate)
    let timeOut = this.timeOutEvents.find((day) => day.date === searchDate)

    let timeWorked = (timeOut.hour - timeIn.hour) / 100
    return timeWorked
}

let wagesEarnedOnDate = function(searchDate) {
    let hoursWorked = hoursWorkedOnDate.call(this, searchDate)
    let wages = hoursWorked * this.payPerHour
    return wages
}


let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(empArray, firstName) {
    return empArray.find((record) => record.firstName === firstName)
}

let calculatePayroll = function(employeesArray) {
    return employeesArray.reduce(((total, record) => total + allWagesFor.call(record)), 0)
}
