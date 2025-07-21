export const {Ajax, colors, DayPanel,  insertColumns, updateColumns,monthChange, statusNames, events, holyDayRules, dateSetup, dateFormat, dateDiff, firstDateOfMonth, lastDateOfMonth,
                $_GET, calculateHolyDays, contextMenu, holydayPanel, YearlyCalendar, YearlyCalendar_, lastYearHDayPrefix, today, usedHolydays, closeMonth
} = await import(`./API_LODER.js${app_version}`)

export const {Api} = await import(`./Planner_API.js${app_version}`)

export const HR = (data, lang, langCode) =>{
    const dayNames = dateSetup(langCode)
    const hash = location.hash.split("?")[0]
    let selected = null
    if( $_GET().y != null && $_GET().m != null){
        selected = `${$_GET().y}-${$_GET().m}-01`
    }
    const firstDay = firstDateOfMonth(selected)
    const lastDay = lastDateOfMonth(selected)
    const Calendar = []
    let tmp = null
    for(let day=1;day<= dateDiff(firstDay,lastDay) +1;day++){
        const date = new Date(firstDay.date)
        tmp = date.setDate( new Date(firstDay.date).getDate() + (day-1) );
        Calendar.push( dateFormat(new Date(tmp)) )
    }
    let tr = ``
    Calendar.forEach((itm,key)=>{
        tr += `
            <th class="text-center">
                <div>${itm.dayName}</div>
                <div>${ itm.day[0] == 0 ? itm.day[1] : itm.day }</div>
            </th>`
    })
    let users = ``

    if(data != null){
        data.forEach((itm)=>{
            itm.tempPrevHolyDay = itm.prevHolydays
            const sum = [0,0,0,0,0,0,0]
            const dataSet = Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                response:"json",
                data:{mode:"fetch_unique",procedure:"getRegisterByUser",parameters:`'${itm.id}','${firstDay.year}','${firstDay.month}'`}
            })

            const holyDaysUsed = Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                response:"json",
                data:{mode:"fetch_unique",procedure:"emp_holydaysPerMonth",
                    parameters:`'${itm.id}',
                    '${$_GET().y == null ? new Date().getFullYear() :$_GET().y}'`}
            })
            let usedHolydaySince = 0
            const curMonth = $_GET().m == null ? 1 : $_GET().m 
            for(let i=1;i<curMonth;i++){
                if(holyDaysUsed[i] != null){
                    usedHolydaySince += parseInt(holyDaysUsed[i].used)
                }
            }           

            let days = ""
            Calendar.forEach((itm2,key)=>{
                const isWeekend = [5,6].includes( dayNames.indexOf(itm2.dayName) ) ? "bg-secondary" : ""

                let setColor
                if(dataSet[itm2.date] == null){
                    sum[0]++
                }
                else if(dataSet[itm2.date].type == 6){
                    sum[2]++
                }
                else if(dataSet[itm2.date].type == 7){
                    //sum[4]++
                }
                else{
                    sum[dataSet[itm2.date].type]++
                }

                if(dataSet[itm2.date] == null){

                    if(itm.maternityLeave == 1){    setColor = "bg-danger"  }
                    else{setColor = colors[0] }
                    days +=  `<td class="${isWeekend}">
                        <button data-id="${itm.id}" data-date="${itm2.date}" data-state="0" class="controller ${setColor}  dayTrigger">&nbsp</button>
                    </td>`
                }
                else{
                    if( usedHolydaySince < itm.tempPrevHolyDay && 
                        dateFormat(new Date()).date <= `${dateFormat(new Date()).year}-01-08`   &&
                        itm.tempPrevHolyDay > 0 && [2,6].includes( parseInt(dataSet[itm2.date].type) ) ){
                        setColor = "btn-availableLastYearHolyDays"
                        itm.tempPrevHolyDay--
                    }
                    else{
                        setColor = colors[dataSet[itm2.date].type]
                    }

                    if(itm.maternityLeave == 1){    setColor = "bg-danger"  }
                    days +=    `<td class="${isWeekend} text-center">
                        <button   data-id="${itm.id}" data-date="${itm2.date}" data-state="${dataSet[itm2.date].type}" class="controller ${setColor} dayTrigger">&nbsp</button>
                    </td>`
                }
            })
            const prexif = hash == "#hr" ? closeMonth({id:itm.id, year:firstDay.year, month:parseInt(firstDay.month) }) :""
            let workDaysInYear
            itm.holydays.total = calculateHolyDays({birth:itm.holydays.birthYear,childs:itm.holydays.childCount})
            itm.holydays.used = itm.holydays.total - itm.holydays.current
            if(itm.holydays.hireDate < `${new Date().getFullYear()}-01-01`){    workDaysInYear = 365 }
            else{   workDaysInYear = dateDiff({ date:`${new Date().getFullYear()}-01-01`},{date:itm.holydays.hireDate}) }
            let percentWorked = ( (365-workDaysInYear)/365).toFixed(2)
            if(percentWorked == 0){ percentWorked = 1 }

            let usedHolyDaysBeforeJan8 = itm.holydays.prevHolydays == 0 ? 0 : usedHolydays({user:itm.id}).filter(itm=>{ return itm.date < `${today.year}-01-08` }).length
    
            itm.holydays.total = Math.round(itm.holydays.total * percentWorked)
            + usedHolyDaysBeforeJan8
            + parseInt(itm.holydays.otherHolydays)

            itm.holydays.current  = itm.holydays.total - itm.holydays.used

            days += `
                <td><available class="text-secondary ">${itm.holydays.current}</available>/<strong class=" me-2">${itm.holydays.total}</strong></td>
                <td><strong id="s_${itm.id}_1" class="text-success">${sum[1]}</strong></td>
                <td><strong id="s_${itm.id}_2" class="text-primary">${sum[2]}</strong></td>
                <td><strong id="s_${itm.id}_3" class="text-danger">${sum[3]}</strong></td>
                <td><strong id="s_${itm.id}_4" class="text-warning">${sum[4]}</strong></td>
            `

            users  += `
            <tr class="userRow" user="${itm.id}">
                <td class="name">
                    ${prexif}
                    <i class="fa fa-list-ol btn btn-sm  btn-outline-danger" role="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMultiDays" aria-controls="offcanvasYearCalendar"></i>
                    
                    ${itm.userName}
                </td>
                <td class="name">${itm.supervisorName}</td>
                ${days}
            </tr>`
        })
    }

    return `<div class="position-relative ">
                ${monthChange({year:Calendar[0].year, month:Calendar[0].month})}
                <table class="table table-striped">
                    <thead class="bg-dark text-light sticky-top" style="top:50px;z-index:1000;">
                        <tr>
                            <th class="name">${lang.name}</th>
                            <th class="name">${lang.supervisor}</th>
                            ${tr}
                            <th class="summary d-none">${lang.summary}</th>
                            <th>${lang.sum}</th>
                            <th >${lang.work}</th>
                            <th>${lang.hDay}</th>
                            <th>${lang.sick}</th>
                            <th>${lang.nonPaid}</th>
                        </tr>
                    <tbody>
                        ${users}
                    </tbody>
                    </thead>
                </table>
            <div>
            <div style="min-height:300px;"></div>
            `
}
