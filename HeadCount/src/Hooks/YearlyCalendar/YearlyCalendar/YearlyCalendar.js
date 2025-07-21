let {Langs} = await import(`../../../Components/Langs/Langs.js${app_version}`)
const {Ajax} = await import(`../../Ajax/Ajax.js${app_version}`)
let {calendar, dateFormat, today} = await import(`../Date/Date.js${app_version}`)
const {$_GET} = await import(`../$_GET/$_GET.js${app_version}`)
const createCalendar = (obj) =>{
    
    const Months = {}
    for(let month=1; month<=12; month++){
        Months[month] = calendar({date:`${obj.year}-${month}-01`, lang: obj.langCode})
    }
    return renderCalendar(Months,obj)
}
const renderCalendar = (cal,obj)=>{


    const colors = ["","bg-success","bg-primary","bg-danger","bg-warning","btn-holiday","btn-mandatoryLeave","bg-restDay"]
    //Kötelező távollétek lekérése
    const mandatoryHolydays = Ajax({
        url:"./server/Procedures/Fetch.php",
        method:"post",
        response:"json",
        data:{mode:"fetchAll",procedure:"getMandatoryHolydays",
            parameters:`'${obj.year}'`}
    })



    //Eredmény objektum konvertálása a naptárral
    const holyDays = {}
    mandatoryHolydays.forEach(day=>{
        const dateObject = dateFormat( new Date(day.date) )
        dateObject.month = dateObject.month[0] == 0 ? dateObject.month[1] : dateObject.month
        dateObject.day = dateObject.day[0] == 0 ? dateObject.day[1] : dateObject.day
        if(holyDays[dateObject.month] == null){
            holyDays[dateObject.month] = {}
        }
        holyDays[dateObject.month][dateObject.day] = {type:day.type, typeId:day.type}
    })


    //Év napjainak lekérése
    const Months = {}
    for(let month=1; month<=12; month++){
        Months[month] = calendar({date:`${obj.year}-${month}-01`, lang: obj.langCode})
        //Kötelező távollét objektum egyesítése
        if(holyDays[month] != null){
            Object.keys(holyDays[month]).forEach(day_=>{
                Months[month][day_].color =  colors[holyDays[month][day_].typeId]
                Months[month][day_].type =  holyDays[month][day_].type
            })
        }
    }





    

    let gobalFontSize, h3FontSize, size, dayCellHigh,dayFromat 
    if(obj.size == "compact"){
        gobalFontSize   = "14px"
        h3FontSize      = "20px"
        size            = "480px;padding:10px;"
        dayCellHigh     = "55px"
        dayFromat         = "dayNameShort"
    }
    else if(obj.size == "full"){
        gobalFontSize   = "18px"
        h3FontSize      = "30px"
        size            = "100%"
        dayCellHigh     = "120px"
        dayFromat         = "dayNameLong"
    }
    else if(obj.size == "small"){
        gobalFontSize   = "10px"
        h3FontSize      = "11px;float:right;bottom:-7px;"
        size            = "20%;min-width:300px;padding:10px;"
        dayCellHigh     = "30px"
        dayFromat         = "dayNameShort"
    }

    let context = `<div class="cal-year" style="width:${obj.ctnWidth};">
                        <input class="form-control cal-yearValue" value="${cal[1][1].year}">
                    </div>
                        <div class="cal-ctn" style="font-size:${gobalFontSize};width:${obj.ctnWidth};">`

                        
    Object.keys(cal).forEach(m=>{
        const date = new Date(new Date().getFullYear(), m-1, 1)
        let monthName = date.toLocaleString('default', { month: 'long' })
        monthName = monthName.charAt(0).toUpperCase() + monthName.slice(1)

        let bgColor = m%2 == 0 ? "bg-light" : "bg-grey"
        let emptyColor = m%2 == 0 ?  "bg-grey" : "bg-light"

        context += `<div class="cal-month" style="width:${size};">
                        <h3  class="cal-monthName" data-id="${m}">${monthName}</h3>
                        <div class="cal-days">`

        let firstDay = cal[m][1].dayOfWeek
        if(firstDay == 0){ firstDay = 7 }
        if(firstDay != 1){
            for(let i=1; i<firstDay; i++){
                context += `<div class="cal-dayCtn">
                                <div class="cal-day ${emptyColor}" style="height:${dayCellHigh}"></div>
                            </div>`
            }
        }
        
        Object.keys(cal[m]).forEach(itm=>{
            const cellColor = Months[m][itm].type == null ? "" : colors[Months[m][itm].type]
            let color =  cal[m][itm].color == null ? "" : cal[m][itm].color
            color = cellColor == "" ? color : cellColor

            context += `<div class="cal-dayCtn ${cellColor}">
                            <div class="cal-day ${color}" style="height:${dayCellHigh}">
                                <dayName>${cal[m][itm][dayFromat]}</dayName>
                                <h3 class="cal-dayNo" style="font-size:${h3FontSize};">${cal[m][itm].day}</h3>
                            </div>
                        </div>`
        })

        const lastdDay = cal[m][Object.keys(cal[m]).length-1].dayOfWeek
        if(lastdDay != 6){
            for(let i=0; i<(6-lastdDay); i++){
                context += `<div class="cal-dayCtn">
                                <div class="cal-day ${emptyColor}" style="height:${dayCellHigh}"></div>
                            </div>`
            }
        }
        context += `</div>
                        </div>`
    })

    context += `<div>
                    </div>`

    return `<div class="cal-monthCtn">${context}</div>
    <link href="./src/Hooks/YearlyCalendar/CSS/YearlyCalendar.css?v=1.0${app_version}" rel="stylesheet">`
}

export class YearlyCalendar{
    constructor(props){
        this.year =  $_GET().y == null ? props.year : $_GET().y
        this.calendar = createCalendar({year:this.year, size:props.size, ctnWidth: props.ctnWidth })
    }
    init(){
        return this.calendar
    }
    events(){
        const cal_yearValue = document.querySelector(".cal-yearValue")
        cal_yearValue.addEventListener("change",()=>{
            location.href = `${location.href.split("?")[0]}?y=${cal_yearValue.value}`
            location.reload()
        })
        cal_yearValue.addEventListener("keyup",(e)=>{
            if(e.keyCode == 13){
                location.href = `${location.href.split("?")[0]}?y=${cal_yearValue.value}`
                location.reload()
            }
        })

        const monthNames = document.querySelectorAll(".cal-monthName")
        monthNames.forEach(itm=>{
            itm.addEventListener("click",()=>{
                const year = document.querySelector(".cal-yearValue").value 
                const month = itm.getAttribute("data-id")

                location.href = `${location.href.split("?")[0]}?y=${year}&m=${month}`
                location.reload()
            })
        })

   


        const scrollToIndex = (index)=>{
            let container  = document.querySelector(".yearCalendarCtn")
            let elements = container.querySelectorAll(".cal-month");

            if (index >= 0 && index < elements.length) {
                let targetElement = elements[index];
                let scrollOffset = 250 * index +50
                        container.scrollTo({
                    top: scrollOffset,
                    behavior: "smooth"
                });
            } else {
                console.warn("Hibás index: " + index);
            }
      
        }
        //300 * index
        scrollToIndex( parseInt(today.month)-1 )






    }
}