function createEmployeeRecord(empArray) {
    return {
        firstName: empArray[0],
        familyName: empArray[1],
        title: empArray[2],
        payPerHour: empArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(empArrays) {
    return empArrays.map(function(employee){
        return createEmployeeRecord(employee)
    })
}

function createTimeInEvent(empObj, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    empObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })

    return empObj
}

function createTimeOutEvent(empObj, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    empObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })

    return empObj
}

function hoursWorkedOnDate(empObj, date){
    let inEvent = empObj.timeInEvents.find(function(e){
        return e.date === date
    })
    let outEvent = empObj.timeOutEvents.find(function(e){
        return e.date === date
    })
    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(empObj, date) {
    let wages = empObj.payPerHour * hoursWorkedOnDate(empObj, date)
    return wages
}

function allWagesFor(empObj){
    let dates = empObj.timeInEvents.map(function(e){
        return e.date
    })
    let totalWages = dates.reduce(function(memo, date){
        return memo + wagesEarnedOnDate(empObj, date)
    }, 0)
    return totalWages
}

function findEmployeeByFirstName(srcArray, firstName) {
   return srcArray.find(function(empObj){
       return empObj.firstName === firstName
   })
}

function calculatePayroll(srcArray){
    return srcArray.reduce(function(memo, empObj) {
        return memo + allWagesFor(empObj)
    }, 0)
}