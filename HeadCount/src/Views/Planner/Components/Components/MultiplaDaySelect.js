const {Langs} = await import(`../../../../Components/Langs/Langs.js${app_version}`) 
const {Ajax} = await import(`../../../../Hooks/Ajax/Ajax.js${app_version}`) 
const {usedHolydays}  = await import(`../API_LODER.js${app_version}`)
export const {calculateHolyDays} = await import(`../../../../Hooks/calculateHolyDays/calculateHolyDays.js${app_version}`)


export const {$_GET} = await import(`../../../../Hooks/$_GET/$_GET.js${app_version}`)

const sendMail =(props)=>{
    //HR-emailek
    const emails = Ajax({
        url:"./server/Procedures/Fetch.php",
        method:"post",
        response:"json",
        data:{mode:"fetchAll",procedure:"getNotificaionRecipe",parameters:`'sickAndHolyday'`}
    })

    //Felettes
    emails.push(
        Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetch",procedure:"getSupervisorId",parameters:`'${props.user}'`}
        })
    )

    emails.forEach((mail,key)=>{
        const data = {mail:mail.email,message:props.message}
        Ajax({
            url:"./server/vendor/phpmailer/sendmail_any.php",
            method:"post",
            data:data
        })
    })
}
export class MultiplaDaySelect{
    constructor(){    }
    init(props){
        this.tiltedDays = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetchAll",procedure:"getMandatoryHolydays",parameters:`'${new Date().getFullYear()}'`}
        })
        this.props = props
        this.lang = Langs[this.props.langCode].dayContext
        this.holydayCatList = [this.lang.emptyDay, this.lang.workDay, this.lang.dayOff, this.lang.sickDay]

        return `
    <div>
        <div class="dayChoseCtn">        
            <button class="btn btn-secondary dropdown-toggle" type="button" id="holydayCategories" data-bs-toggle="dropdown" aria-expanded="false">
            ${this.lang.pleaseChose}
            </button>
            <ul class="dropdown-menu holydayCatDropdown" aria-labelledby="holydayCategories">
                <li><div class="dropdown-item bg-secondary" value="0">${this.lang.emptyDay}</div></li>
                <li><div class="dropdown-item bg-success text-light" value="1">${this.lang.workDay}</div></li>
                <li><div class="dropdown-item bg-primary text-light" value="2">${this.lang.dayOff}</div></li>
                <li><div class="dropdown-item bg-danger text-light" value="3">${this.lang.sickDay}</div></li>
                <li><div class="dropdown-item bg-warning" value="4">${this.lang.nonPaidDay}</div></li>
            </ul>
            <div class=" d-inline">
                <div class="p-2">
                    <input class="fromDateSel" type="date"> - <input class="toDateSel" type="date">
                </div>
                <button class="btn btn-success fa fa-check saveMultipleDays"></button>
                <div class="daySelMsg p-2"></div>
            </div>
        </div>
    </div>`
    }
    events(){
        const holydaysInYear = usedHolydays({user:this.props.user, wholeYear:true}).length
        const holydaysLeft   = this.props.holydayTotal - holydaysInYear
        const holydayCategories = document.querySelector("#holydayCategories")
        const saveMultipleDays = document.querySelector(".saveMultipleDays")
        const holydayCatDropdownElements = document.querySelector(".holydayCatDropdown").querySelectorAll(".dropdown-item")
        const fromDateSel = document.querySelector(".fromDateSel")
        const toDateSel = document.querySelector(".toDateSel")
        let counter = 0
        const pop = setInterval(()=>{
                    counter++;
                    if(counter >= 6){
                        clearInterval(pop)
                    }
                },400)
        let selectedCategory = null
        holydayCatDropdownElements.forEach(itm=>{
            itm.addEventListener("click",()=>{
                selectedCategory = itm.getAttribute("value")
                holydayCategories.textContent = itm.textContent
                holydayCategories.classList.add(itm.classList[1])
            })
        })
        saveMultipleDays.addEventListener("click",()=>{
            console.log("Mentés megnyomva")
            let errors = 0
            const selectedDays = []
            if(selectedCategory == null){
                holydayCategories.classList.add("bg-danger","text-light")
                errors++
            }
            else{   holydayCategories.classList.remove("bg-danger","text-light") }

            if(fromDateSel.value == ""){ fromDateSel.classList.add("bg-danger","text-light")
                errors++
            }
            else{ fromDateSel.classList.remove("bg-danger","text-light") }

            if(toDateSel.value == ""){
                toDateSel.classList.add("bg-danger","text-light")
                errors++
            }
            else{ toDateSel.classList.remove("bg-danger","text-light") }

            if( toDateSel.value < fromDateSel.value){
                fromDateSel.classList.add("bg-danger","text-light")
                toDateSel.classList.add("bg-danger","text-light")
                errors++
            }
            if( errors == 0){
                for (let d = new Date(fromDateSel.value); d <= new Date(toDateSel.value); d.setDate(d.getDate() + 1)) {
                    if( [6,0].includes(d.getDay()) == false){
                        const curDate = d.toISOString().split('T')[0]
                        const filtered = this.tiltedDays.filter(day=>{
                            return day.date == curDate
                        })
                        if(filtered.length == 0){
                            selectedDays.push({date:curDate})
                        }
                    }
                }
            }

            if(selectedCategory == 2 && holydaysLeft - selectedDays.length < 0){
                alert(`${this.lang.outOfHolyday } (+${Math.abs(holydaysLeft - selectedDays.length)}) `)
            }
            else if(selectedDays.length > 0){
                selectedDays.forEach(day=>{
                    const updateRegister = Ajax({
                        url:"./server/Procedures/Fetch.php",
                        method:"post",
                        response:"json",
                        data:{mode:"fetchColumn",procedure:"updateRegister",parameters:
                            `'${this.props.user}','${day.date}','${selectedCategory}','${this.props.user}'`
                        }
                    })
                })

                if( [2,3].includes(parseInt(selectedCategory) ) ){
                    const userData = Ajax({
                        url:"./server/Procedures/Fetch.php",
                        method:"post",
                        response:"json",
                        data:{mode:"fetch",procedure:"getUserById",parameters:`'${this.props.user}'`}
                    })
                    let mailMsg = 
                    `<div>
                        <h3>${userData.username}</h3>
                        <b>${fromDateSel.value}</b> és <b>${toDateSel.value}</b> között <b>${this.holydayCatList[selectedCategory]}</b> került beállításra.
                    </div>`
                    sendMail({user:this.props.user, message: mailMsg})
                }
                location.reload()
            }
        })
    }
    offcanvasEvents(props){
        const $this = this
        const myOffcanvasElement = document.getElementById('offcanvasMultiDays');
        myOffcanvasElement.addEventListener('show.bs.offcanvas', function (e) {
            const user = props.user == null ? e.relatedTarget.parentNode.parentNode.getAttribute("user") :props.user
            let holydayTotal 
            if(props.holydayTotal == null){
                const emp = Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    response:"json",
                    data:{mode:"fetch",procedure:"empCore",
                        parameters:`'${user}', '${$_GET().y == null ? new Date().getFullYear() :$_GET().y}'`}
                })
                holydayTotal = calculateHolyDays({birth:emp.birth,childs:emp.childs})    
            }
            holydayTotal = props.holydayTotal == null ? holydayTotal : props.holydayTotal
            const obj = {langCode:props.langCode, user: user, holydayTotal: holydayTotal}
            const multiDayCtn = document.querySelector(".multiDayCtn")
            multiDayCtn.innerHTML = $this.init(obj)
            $this.events()
        })
    }
}