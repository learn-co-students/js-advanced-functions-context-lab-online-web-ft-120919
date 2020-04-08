/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(empInfo) {
    return {
        firstName: empInfo[0],
        familyName: empInfo[1],
        title: empInfo[2],
        payPerHour: empInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfEmpArrays) {
    return arrayOfEmpArrays.map(empArray => {
        return createEmployeeRecord(empArray)
    })
}

function createTimeInEvent(dateStamp) {
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt((dateStamp.split(" ")[1]), 10),
        date: dateStamp.split(" ")[0]
    })
    return this
}

function createTimeOutEvent(dateStamp) {
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt((dateStamp.split(" ")[1]), 10),
        date: dateStamp.split(" ")[0]
    })
    return this
}

function hoursWorkedOnDate(date) {
    let inEvent = this.timeInEvents.find(function (e) {
        return e.date === date
    })

    let outEvent = this.timeOutEvents.find(function (e) {
        return e.date === date
    })

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
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

function findEmployeeByFirstName(srcArray, firstName) {
    let foundEmp = srcArray.map(emp => {
        if (emp.firstName === firstName) {
            return emp
        }
    })
    return foundEmp[0]
}

function calculatePayroll(records) {
    let recordsAmounts = records.map(record => (
        allWagesFor.call(record)
    ))
    return recordsAmounts.reduce((startAmount, currentAmount) => {
        return startAmount + currentAmount
    }, 0)
}