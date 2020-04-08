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
		return e.date;
	});

	let payable = eligibleDates.reduce(
		function (memo, d) {
			return memo + wagesEarnedOnDate.call(this, d);
		}.bind(this),
		0
	); // <== Hm, why did we need to add bind() there? We'll discuss soon!

	return payable;
};

function createEmployeeRecord(record) {
	return {
		firstName: record[0],
		familyName: record[1],
		title: record[2],
		payPerHour: record[3],
		timeInEvents: [],
		timeOutEvents: [],
	};
}

function createEmployeeRecords(arrayOfEmployees) {
	return arrayOfEmployees.map(createEmployeeRecord);
}

function createTimeInEvent(timeStamp) {
	this.timeInEvents.push({
		type: "TimeIn",
		hour: parseInt(timeStamp.split(" ")[1]),
		date: timeStamp.split(" ")[0],
	});
	return this;
}
function createTimeOutEvent(timeStamp) {
	this.timeOutEvents.push({
		type: "TimeOut",
		hour: parseInt(timeStamp.split(" ")[1]),
		date: timeStamp.split(" ")[0],
	});
	return this;
}

function hoursWorkedOnDate(date) {
	let timeIn = this.timeInEvents.find((e) => e.date === date).hour;
	let timeOut = this.timeOutEvents.find((e) => e.date === date).hour;
	return (timeOut - timeIn) / 100;
}
function wagesEarnedOnDate(date) {
	return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

function findEmployeeByFirstName(data, name) {
	return data.find((record) => record.firstName === name);
}

function calculatePayroll(records) {
	return records
		.map((r) => allWagesFor.call(r))
		.reduce((sv, cv) => {
			return sv + cv;
		}, 0);
}
