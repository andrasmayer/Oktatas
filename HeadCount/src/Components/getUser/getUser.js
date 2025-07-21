const {today} = await import(`../../Hooks/Date/Date.js${app_version}`)
const {Ajax} = await import(`../../Hooks/Ajax/Ajax.js${app_version}`)
const {firstDateOfMonth} = await import(`../../Hooks/Date/Date.js${app_version}`)
const {Langs} = await import(`../Langs/Langs.js${app_version}`)
const {holyDayRules} = await import(`../../Rules/holyDayRules.js${app_version}`)
const { usedHolydays} = await import(`../../Views/Planner/Components/Api.js${app_version}`)

export class getUser{
    constructor(props){
        this.props = props
        this.id = props.id
        this.lang = props.props.lang
        this.langGlobal = Langs[props.props.langCode]
        this.planner = this.langGlobal.views["#planner"]
        

        const user = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetch",procedure:"getUserbyId",parameters:`'${this.id}'`}
        })

        this.userName = user.username
        this.holydays = user

        this.age = today().year - user.birthYear
        this.holydayFromAge = 0

        Object.keys(holyDayRules.age).forEach(itm=>{
            let tmp = itm.split("-")
            if(tmp == ["18",""]){
                tmp = [16,18]
            }
            else if(tmp[0] == '45'){
                tmp = [45,200]
            }
            if( this.age >= tmp[0] &&  this.age <= tmp[1]){
                this.holydayFromAge =  holyDayRules.age[itm]
                return false
            }
        })


        this.allUsedHolydays = usedHolydays({user:this.id})
        this.usedHolyDaysBeforeJan8 = user.prevHolydays == 0 ? 0 : this.allUsedHolydays.filter(itm=>{ return itm.date < `${today().year}-01-08` }).length

        this.remainingHolydays = 20  +  this.holydayFromAge + 
        holyDayRules.clildren[user.childCount] + 
        (today().date > `${today().year}-01-08` && user.prevHolydays > 0  ? this.usedHolyDaysBeforeJan8 : parseInt(user.prevHolydays) )
        - this.allUsedHolydays.length
        
        this.firstDay = firstDateOfMonth(null)

        this.holydayTotal = 20 + holyDayRules.clildren[user.childCount] 
            +  this.holydayFromAge + this.usedHolyDaysBeforeJan8
            + parseInt(user.otherHolydays)

    }
    init(){
        
        delete this.props
        return this
    } 
   
}