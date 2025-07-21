export const {Ajax, colors, DayPanel,  insertColumns, updateColumns, monthChange, statusNames, events, holyDayRules,
    dateSetup, dateFormat, dateDiff, firstDateOfMonth, lastDateOfMonth, $_GET, calculateHolyDays, contextMenu,
     holydayPanel, YearlyCalendar, YearlyCalendar_, lastYearHDayPrefix, today, usedHolydays, closeMonth
} = await import(`./API_LODER.js${app_version}`)
export const {MultiplaDaySelect} = await import(`./Components/MultiplaDaySelect.js${app_version}`) 
const MultiplaDaySelectPanel = new MultiplaDaySelect()
export class Api{
    constructor(props){
        this.props = props
        this.holydays =  Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetch",procedure:"getHolyDays",parameters:`'${this.props.authToken.jwt}'`}
        })
        this.holydays.total = calculateHolyDays({birth:this.holydays.birthYear,childs:this.holydays.childCount})
        let workDaysInYear
        if(this.holydays.hireDate < `${new Date().getFullYear()}-01-01`){ workDaysInYear = 365 }
        else{ workDaysInYear = dateDiff({ date:`${new Date().getFullYear()}-01-01`},{date:this.holydays.hireDate}) }
        let percentWorked = ( (365-workDaysInYear)/365).toFixed(2)
        if(percentWorked == 0){ percentWorked = 1 }
        this.holydays.total =Math.round(this.holydays.total * percentWorked)
        this.holydays.available = this.holydays.total - this.holydays.holydays
        this.user = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetch",procedure:"userToken",parameters:`'${this.props.authToken.jwt}'`}
        }).id

        this.lastYearHolyDays = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetchColumn",procedure:"empLastYear",parameters:`'${this.user}'`}
        })

        this.allUsedHolydays = usedHolydays({user:this.user})
        this.holyDaysUsed = this.allUsedHolydays
        this.usedHolyDaysBeforeJan8 = this.lastYearHolyDays == 0 ? 0 : this.allUsedHolydays.filter(itm=>{ return itm.date < `${today.year}-01-08` }).length
    }
    init(){
        const selected = $_GET().y != null && $_GET().m != null ? 
            `${$_GET().y}-${$_GET().m}-01` : null
        const dayNames = dateSetup(this.props.langCode)
        const firstDay = firstDateOfMonth(selected)
        this.firstDay = firstDay
        const lastDay = lastDateOfMonth(selected)
        this.feed = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetch_unique",procedure:"loadRegister",parameters:`'${this.user}','${firstDay.year}','${firstDay.month}'`}
        })
        const Calendar = []
        let tmp = null
        for(let day=1;day<= dateDiff(firstDay,lastDay) +1;day++){
            const date = new Date(firstDay.date)
            tmp = date.setDate( new Date(firstDay.date).getDate() + (day-1) );
            Calendar.push( dateFormat(new Date(tmp)) )
        }
        this.holydays.available += parseInt(this.lastYearHolyDays)
        this.hTemp =  this.holydays.total
        this.holydays.total += parseInt(this.lastYearHolyDays)
        this.age = today.year - this.holydays.birthYear
        this.holydayFromAge = 0

        Object.keys(holyDayRules.age).forEach(itm=>{
            let tmp = itm.split("-")
            if(tmp == ["18",""]){
                tmp = [16,18]
            }
            else if(tmp[0] == '45'){
                tmp = [45,200]
            }
            if(this.age >= tmp[0] && this.age <= tmp[1]){
                this.holydayFromAge =  holyDayRules.age[itm]
                return false
            }
        })
        this.remainingHolydays = 20  + this.holydayFromAge + 
        holyDayRules.clildren[this.holydays.childCount] + 
        (today.date > `${dateFormat(new Date()).year}-01-08` && this.holydays.prevHolydays > 0  ?this.usedHolyDaysBeforeJan8 : parseInt(this.holydays.prevHolydays) )
        - this.allUsedHolydays.length

        const screenWidth = window.innerWidth
        const extraClass = ""
        this.holydayTotal = 
            20 + holyDayRules.clildren[this.holydays.childCount] 
            + this.holydayFromAge + this.usedHolyDaysBeforeJan8
            + parseInt(this.holydays.otherHolydays)

        let context =   ""
        context += `<div class="msg"></div>
                        ${monthChange({year:this.firstDay.year, month: this.firstDay.month})}
                    <div class="row week d-flex justify-content-center ${extraClass}"  style="margin-right:2rem;">`

        const emptyBoxStart =  dayNames.indexOf(Calendar[0].dayName)
        const emptyBoxEnd =  6 - dayNames.indexOf(Calendar[Calendar.length-1].dayName)
        for(let i=0;i<emptyBoxStart;i++){   context += DayPanel(0,0,0,0)  }
        Calendar.forEach((itm,key)=>{
            context += DayPanel(itm, this.feed[itm.date], colors, this.user, this.lastYearHolyDays)
            const isWeekend = [6].includes( dayNames.indexOf(itm.dayName) ) 
            if(isWeekend === true){   context += `</div>
                <div class="row week  d-flex justify-content-center ${extraClass}"  style="margin-right:2rem;">` }
        })
        for(let i=0;i<emptyBoxEnd;i++){ context += DayPanel(0,0,0,0)  }     
        context += `</div>`

        return `
        <div class="text-center p-2 d-inline">
            ${context}

            <div class="position-absolute p-3 w-100" style="top:115px;">
                <div class="text-center">
                    <i class="fa fa-book btn btn-outline-primary" role="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasHolydayData" aria-controls="offcanvasYearCalendar"></i>
                    <i class="fa fa-calendar  btn btn-outline-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasYearCalendar" aria-controls="offcanvasYearCalendar"></i>
                    <i class="fa fa-list-ol btn btn-outline-danger" role="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMultiDays" aria-controls="offcanvasYearCalendar"></i>
                </div>
            </div>

            <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasYearCalendar" aria-labelledby="offcanvasYearCalendarLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasYearCalendarLabel">${this.props.lang.yearCalendar}</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div class="yearCalendarCtn">
                        ${YearlyCalendar_.init()}
                    </div>
                </div>
                </div>
            </div>
            
            <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasHolydayData" aria-labelledby="offcanvasYearCalendarLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasHolydayDataLabel">${this.props.lang.holydayTotal}</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div class="yearCalendarCtn">
                        ${holydayPanel(this)}
                    </div>
                </div>
            </div>
            <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasMultiDays" aria-labelledby="offcanvasYearCalendarLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasMultiDaysLabel">${this.props.lang.multiDays}</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div class="multiDayCtn">...</div>
                </div>
            </div>
        </div>`
    }
    events(){
        YearlyCalendar_.events()
        const activeDays = document.querySelectorAll(`.dayCtn:not(.undefined)`)
        let usedHolydaySince = 0
        const curMonth = $_GET().m == null ? 1 : $_GET().m 
        for(let i=1;i<curMonth;i++){
            if(this.holyDaysUsed[i] != null){
                usedHolydaySince += parseInt(this.holyDaysUsed[i].used)
            }
        }
        activeDays.forEach(itm=>{
            if( 
                usedHolydaySince < this.lastYearHolyDays && 
                this.lastYearHolyDays > 0 &&
                itm.querySelector(".h5").textContent <= 8 &&
                $_GET().m == 1 && 
                (itm.classList.contains("bg-primary") 
                 || itm.classList.contains("btn-mandatoryLeave")  )
                 && this.lastYearHolyDays >0 
            ){
                usedHolydaySince ++
                itm.classList.remove("bg-primary", "btn-mandatoryLeave")
                itm.classList.add("btn-availableLastYearHolyDays")
                itm.querySelector(".statName").textContent = this.props.lang.prevHolydays
            }
        })
        const year = document.querySelector("year").textContent;
        const month = parseInt(document.querySelector("month").textContent);
        events()
        const closeState = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetchColumn",procedure:"getUserMonthStatus",parameters:`'${this.user}','${year}','${month}'`}
        })
        if(closeState == 1){        //Lezárt hónapnál tiltás
            const msg =  document.querySelector(".msg")
           msg.textContent = this.props.lang.monthClosed
           msg.classList.add("alert","alert-danger","h3","p-3")
            return false;
        } 
        contextMenu()
        lastYearHDayPrefix({jan8:this.usedHolyDaysBeforeJan8,label:this.props.lang.prevHolydays,lastYearHolyDays:this.lastYearHolyDays})

        MultiplaDaySelectPanel.offcanvasEvents({langCode:this.props.langCode, user: this.user, holydayTotal:this.holydayTotal})
    }
}