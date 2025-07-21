const {YearlyCalendar} = await import(`./YearlyCalendar/YearlyCalendar.js${app_version}`)
const target = "#calendarCtn" 
const year = new Date().getFullYear()
const calendar = new YearlyCalendar({year:year, size:"small" ,ctnWidth:"300px"})
//const calendar = new YearlyCalendar({year:year, size:"compact" })
//const calendar = new YearlyCalendar({year:year, size:"full" })
const target_ = document.querySelector(target)
target_.innerHTML = calendar.init()
calendar.events()

