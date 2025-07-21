const {$_GET} = await import(`../../Hooks/$_GET/$_GET.js${app_version}`)
const {Ajax} = await import(`../../Hooks/Ajax/Ajax.js${app_version}`)
const {Toast} = await import(`../../Hooks/Toast/Toast.js${app_version}`)
const {Langs} = await import(`../../Components/Langs/Langs.js${app_version}`)
const {holyDayRules} = await import(`../../Rules/holyDayRules.js${app_version}`)
const { dateFormat, firstDateOfMonth} = await import(`../../Hooks/Date/Date.js${app_version}`)
export const {holydayPanel} = await import(`../../Components/holydayPanel/holydayPanel.js${app_version}`)
export const {getMandatoryHolydays, usedHolydays, today, lastYearHDayPrefix} = await import(`../Planner/Components/Api.js${app_version}`)
export class Profile{
    constructor(props){
        this.props = props
        this.lang = props.lang
        this.langGlobal = Langs[props.langCode]
        this.planner = this.langGlobal.views["#planner"]
        this.content = document.querySelector("#pageContent")
        this.holydays =  Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetch",procedure:"getHolyDays",parameters:`'${this.props.authToken.jwt}'`}
        })
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
    }
    init(){
        const user = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetch",procedure:"userToken",parameters:`'${this.props.authToken.jwt}'`}
        })
        this.user = user.id

        this.allUsedHolydays = usedHolydays({user:this.user})
        const lastLogin = user.lastLogin
        this.usedHolyDaysBeforeJan8 = this.holydays.prevHolydays == 0 ? 0 : this.allUsedHolydays.filter(itm=>{ return itm.date < `${today.year}-01-08` }).length

        this.remainingHolydays = 20  + this.holydayFromAge + 
        holyDayRules.clildren[this.holydays.childCount] + 
        (today.date > `${dateFormat(new Date()).year}-01-08` && this.holydays.prevHolydays > 0  ?this.usedHolyDaysBeforeJan8 : parseInt(this.holydays.prevHolydays) )
        - this.allUsedHolydays.length
        
        const selected = $_GET().y != null && $_GET().m != null ? `${$_GET().y}-${$_GET().m}-01` : null
        this.firstDay = firstDateOfMonth(selected)

        this.holydayTotal = 20 + holyDayRules.clildren[this.holydays.childCount] 
            + this.holydayFromAge + this.usedHolyDaysBeforeJan8
            + parseInt(this.holydays.otherHolydays)

        const message = user.passwordChanged == 0 ? `<label class="text-danger">${this.props.lang.changePW}</label>` : this.props.authToken.userName
        return `
            <div>
                <div class="text-center p-2 h4"> <b>${message}</b></div>
                <div class="d-flex justify-content-center">
                    <div class="accordion col-10 col-lg-4"id="accordionController" >
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            ${this.props.lang.info}
                            </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionController">
                                <div class="accordion-body">
                                  ${this.props.lang.lastLogin} : <strong>${lastLogin}</strong>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            ${this.props.lang.pwChange}
                            </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionController">
                                <div class="accordion-body">
                                    <div class="row p-2 " >
                                        <label class="col-4">${this.props.lang.curPw}</label>
                                        <div class="col-8">
                                            <input class="form-control curPw">
                                        </div>
                                    </div>
                                    <div class="row p-2 " >
                                        <label class="col-4">${this.props.lang.newPw}</label>
                                        <div class="col-8">
                                            <input class="form-control newPw">
                                        </div>
                                    </div>
                                    <div class="row p-2 " >
                                        <label class="col-4">${this.props.lang.newPwAgain}</label>
                                        <div class="col-8">
                                            <input class="form-control newPw2">
                                        </div>
                                    </div>
                                    <div class="text-center p-2">
                                        <button class="btn btn-danger changePassword">${this.props.lang.update}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingHolydays">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseHolydays" aria-expanded="false" aria-controls="collapseHolydays">
                                ${this.planner.holyDaysBase}
                            </button>
                        </h2>
                        <div id="collapseHolydays" class="accordion-collapse collapse" aria-labelledby="headingHolydays" data-bs-parent="#accordionController">
                            ${ holydayPanel(this) }
                            </div>
                        </div>                        
                    </div>`

    }
    accessCheck(dataSet){
        return dataSet.range.includes(dataSet.jobCode) 
    }
    events(){
        const curPw = document.querySelector(".curPw")
        const newPw = document.querySelector(".newPw")
        const newPw2 = document.querySelector(".newPw2")
        const lang = this.props.lang

        const changePassword = document.querySelector(".changePassword")
        changePassword.addEventListener("click",()=>{
            const res = Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                response:"json",
                data:{mode:"fetchColumn",procedure:"checkPassword",parameters:`'${curPw.value}','${this.props.authToken.jwt}'`}
            })

            if( res == 0){
                Toast({header:`<label class="text-danger">${lang.msg_error}</label>`, time:"",body:lang.passwordError})
                return false
            }
            else if( newPw.value != newPw2.value){
                Toast({header:`<label class="text-danger">${lang.msg_error}</label>`, time:"",body:lang.passwordsNotMatch})
                return false
            }
            else if( newPw.value.length <5 ){
                Toast({header:`<label class="text-danger">${lang.msg_error}</label>`, time:"",body:lang.passwordShort})
                return false
            }
            else if( newPw.value == "" ){
                Toast({header:`<label class="text-danger">${lang.msg_error}</label>`, time:"",body:lang.passwordsNotMatch})
                return false
            }
            Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                data:{mode:"fetch",procedure:"changePassword",parameters:`'${newPw.value}','${this.props.authToken.jwt}'`}
            })
            location.hash = "home"
        })
        lastYearHDayPrefix({jan8:this.usedHolyDaysBeforeJan8,label:this.planner.prevHolydays,lastYearHolyDays:this.holydays.prevHolydays})
    }
}