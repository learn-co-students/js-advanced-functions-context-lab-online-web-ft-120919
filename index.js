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

function createEmployeeRecords(arrArr) {
  return arrArr.map((info) => {
    return createEmployeeRecord(info)
  });

}

function createTimeInEvent(dateStamp) {
  this.timeInEvents.push({
    type: 'TimeIn',
    date: dateStamp.split(' ')[0],
    hour: parseInt(dateStamp.split(' ')[1])
  })
  return this
}

function createTimeOutEvent(dateStamp) {
  this.timeOutEvents.push({
    type: 'TimeOut',
    date: dateStamp.split(' ')[0],
    hour: parseInt(dateStamp.split(' ')[1])
  })
  return this
}

function hoursWorkedOnDate(dateStamp) {
  const timeInObjects = this.timeInEvents.filter((obj) => obj.date === dateStamp)
  const timeOutObjects = this.timeOutEvents.filter((obj) => obj.date === dateStamp)

  // if (timeInObjects.length > 1) { throw "Multiple clock-ins on this date!" }
  // if (timeOutObjects.length > 1) { throw "Multiple clock-outs on this date!" }

  const timeIn = timeInObjects[0].hour
  const timeOut = timeOutObjects[0].hour

  return parseFloat((timeOut - timeIn) / 100)
}

function wagesEarnedOnDate(dateStamp) {
  return hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour
}

function allWagesFor() {
  const dates = this.timeInEvents.map((e) => e.date)
  return dates.reduce((acc, date) => {
    return wagesEarnedOnDate.call(this, date) + acc
  }, 0)
}

function findEmployeeByFirstName(arr, name) {
  return arr.find((obj) => obj.firstName === name)
}

function calculatePayroll(empArr) {
  return empArr.reduce((acc, employee) => {
    return allWagesFor.call(employee) + acc
  }, 0)
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// let allWagesFor = function () {
//     let eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })
//
//     let payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
//
//     return payable
// }
