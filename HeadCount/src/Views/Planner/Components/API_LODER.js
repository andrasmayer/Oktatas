export const {Ajax} = await import(`../../../Hooks/Ajax/Ajax.js${app_version}`)
export const {colors, DayPanel,  insertColumns, updateColumns,monthChange, statusNames} = await import(`./Components/Plugins.js${app_version}`)
export const {events} = await import(`./Components/events.js${app_version}`)
export const {holyDayRules} = await import(`../../../Rules/holyDayRules.js${app_version}`)
export let {dateSetup,   dateFormat, dateDiff, firstDateOfMonth, lastDateOfMonth} = await import(`../../../Hooks/Date/Date.js${app_version}`)
export const {$_GET} = await import(`../../../Hooks/$_GET/$_GET.js${app_version}`)
export const {calculateHolyDays} = await import(`../../../Hooks/calculateHolyDays/calculateHolyDays.js${app_version}`)
export const {contextMenu} = await import(`./Components/contextMenu/contextMenu.js${app_version}`)
export const {holydayPanel} = await import(`../../../Components/holydayPanel/holydayPanel.js${app_version}`)
export const {YearlyCalendar} = await import(`../../../Hooks/YearlyCalendar/YearlyCalendar/YearlyCalendar.js${app_version}`)
export const YearlyCalendar_ =  new YearlyCalendar({year:2025, size:"small" ,ctnWidth:"300px"})


export const lastYearHDayPrefix = (obj) =>{
    const uhdContent = document.querySelector(".uhdContent")
    const prevYearHDay = uhdContent.querySelectorAll(".dropdown-item")
    if(obj.lastYearHolyDays > 0){
        for(let i=0; i<obj.jan8;i++ ){
            prevYearHDay[i].innerHTML += ` ${obj.label}`
        }
    }
}
export const today = dateFormat(new Date() )
export const usedHolydays = (obj) =>{
    const holyDays = []
    const toMonth = obj.wholeYear != null ? 12 : today.month

    for(let i=1; i<=parseInt(toMonth); i++){
        const res = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetchAll",procedure:"loadRegister",
                parameters:`'${obj.user}','${$_GET().y == null ? new Date().getFullYear() :$_GET().y}','${i}'`}
        })
        res.forEach(itm=>{
            if( [2,6].includes(parseInt(itm.type)) ){
                holyDays.push({date:itm.date, type:itm.type})
            }
        })
    }
    return holyDays
}
export const closeMonth = (data) =>{
    const closeState = Ajax({
        url:"./server/Procedures/Fetch.php",
        method:"post",
        response:"json",
        data:{mode:"fetchColumn",procedure:"getUserMonthStatus",parameters:`'${data.id}','${data.year}','${data.month}'`}
    })
    const icon = closeState == 0 ? "fa-pencil text-secondary" : "fa-lock text-danger"
   return `<i class="closeMonth fa ${icon}" uid="${data.id}" role="button"></i>`
}