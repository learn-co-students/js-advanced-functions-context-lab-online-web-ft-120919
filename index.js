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

function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arr) {
  return arr.map((a) => createEmployeeRecord(a))
}

function createTimeInEvent(string) {
  const [date, hour] = string.split(" ")
  const timeIn = {type: "TimeIn", date: date, hour: parseInt(hour)}
  this.timeInEvents.push(timeIn)
  return this
}

function createTimeOutEvent(string) {
  const [date, hour] = string.split(" ")
  const timeOut = {type: "TimeOut", date: date, hour: parseInt(hour)}
  this.timeOutEvents.push(timeOut)
  return this
}

function hoursWorkedOnDate(string) {
  let timeIn = this.timeInEvents.find((a) => a.date === string)
  let timeOut = this.timeOutEvents.find((a) => a.date === string)
  return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(string) {
  let hours = hoursWorkedOnDate.call(this, string)
  return hours * this.payPerHour
}

function calculatePayroll(arr) {
  return arr.reduce((a, c) => a + allWagesFor.call(c), 0)
}

function findEmployeeByFirstName(arr, string) {
  return arr.find((a) => a.firstName === string)
}