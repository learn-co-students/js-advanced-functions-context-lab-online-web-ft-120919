let createEmployeeRecord = function(empInfo) {
  return {
    firstName: empInfo[0],
    familyName: empInfo[1],
    title: empInfo[2],
    payPerHour: empInfo[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}//createEmployeeRecord

let createEmployeeRecords = function(empInfoArray) {
  return empInfoArray.map(empInfo => createEmployeeRecord(empInfo));
}//createEmployeeRecords

let createTimeInEvent = function(timeStr) {
  let dateAndHour = timeStr.split(' ');
  this.timeInEvents.push({
    type: "TimeIn",
    date: dateAndHour[0],
    hour: parseInt(dateAndHour[1])
  });
  return this;
}//createTimeInEvent

let createTimeOutEvent = function(timeStr) {
  let dateAndHour = timeStr.split(' ');
  this.timeOutEvents.push({
    type: "TimeOut",
    date: dateAndHour[0],
    hour: parseInt(dateAndHour[1])
  });
  return this;
}//createTimeOutEvent

let hoursWorkedOnDate = function(dateStr) {
  const startTime = this.timeInEvents.find(e => e.date === dateStr).hour;
  const endTime = this.timeOutEvents.find(e => e.date === dateStr).hour;
  return (endTime - startTime)/100;
}//hoursWorkedOnDate

let wagesEarnedOnDate = function(dateStr) {
  const hours = parseInt(hoursWorkedOnDate.call(this, dateStr));
  const rate = parseInt(this.payPerHour);
  return hours * rate;
}//wagesEarnedOnDate

let allWagesFor = function() {
  let allDates = this.timeInEvents.map(e => e.date);

  let payable = allDates.reduce(function(total, d){
    return total + wagesEarnedOnDate.call(this, d)
  }.bind(this), 0);

  return payable;
}//allWagesFor 

let calculatePayroll = function(empRecordsArray) {
  let grandTotal = empRecordsArray.reduce(function(total, e){
    return total + allWagesFor.call(e)
  }, 0)
  return grandTotal;
}//calculatePayroll

let findEmployeeByFirstName = function(empRecordsArray, firstNameStr) {
  return empRecordsArray.find(er => er.firstName === firstNameStr);
}//findEmployeeByFirstName

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

//     let payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }