export const colors = ["bg-light","bg-success","bg-primary","bg-danger","bg-warning","btn-holiday","btn-mandatoryLeave","bg-restDay"]
const {Ajax} = await import(`../../../../Hooks/Ajax/Ajax.js${app_version}`)
const {Langs} = await import(`../../../../Components/Langs/Langs.js${app_version}`)
const langCode = window.localStorage.getItem("Lang") == null ? "hu" : window.localStorage.getItem("Lang")
const dayContext = Langs[langCode].views["#home"]
export const statusNames = [
    dayContext.null, dayContext.work, dayContext.hDay, dayContext.sick,
    dayContext.nonPaid, dayContext.paidHolyDay, dayContext.mandatoryHoliday, dayContext.restDay,
]

export const monthChange = (data) =>{
    return `<div>
                <div class="p-3  h3 monthControls">
                    <i role="button" class="fa fa-arrow-left prev"></i>
                    <year>${data.year}</year>/
                    <month>${data.month}</month>
                    <i role="button" class="fa fa-arrow-right next"></i>
                </div>
            </div>`
}
export const insertColumns = (user, clickedDay, state, editor) =>{
    const setRegister = Ajax({
        url:"./server/Procedures/Fetch.php",
        method:"post",
        data:{mode:"fetchColumn",procedure:"setRegister",parameters:`'${user}','${clickedDay}','${state}','${editor}'`}
    })
}
export const updateColumns = (user, clickedDay, state, editor ) =>{
    const updateRegister = Ajax({
        url:"./server/Procedures/Fetch.php",
        method:"post",
        data:{mode:"fetchColumn",procedure:"updateRegister",parameters:`'${user}','${clickedDay}','${state}','${editor}'`}
    })
}
export const DayPanel = (data,feed,colors,uid, lastYearHolyDays) =>{
    if(colors != null){
        let color = feed == null ? colors[0] : colors[feed.type]
        const state = feed == null ? 0 : feed.type
        const statName =  state == "0" || state == null ? "" : statusNames[state]
        return  `
        <div class="day " data-date="${data.date}" data-state="${state}" data-user="${uid}">
            <div class="dayCtn rounded  ${color} ${data != 0 && "dayTrigger"}">
            <div class="text-center h5 mt-3 m-0">${data != 0 ? data.day : ""}</div>
                <dayName class="float-end pe-2 h6">${data != 0 ? data.dayName : ""}</dayName>
                <div class="p-1 text-center statName">${statName}</div>
            </div>
        </div>`
    }
}