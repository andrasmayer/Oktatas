const {Ajax} = await import(`../../Hooks/Ajax/Ajax.js${app_version}`)
export const {Toast} = await import(`../../Hooks/Toast/Toast.js${app_version}`)
const {insertMandatory} = await import(`./insertMandatory.js${app_version}`)
const {MandatoryLeaves} = await import(`../../Hooks/MandatoryLeaves/MandatoryLeaves.js${app_version}`)
//const {YearlyCalendar} = await import(`../../Hooks/YearlyCalendar/YearlyCalendar.js${app_version}`)

//MandatoryLeaves() 




export class MandatoryHoliday{
    constructor(props){
        this.props = props
        this.user = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetch",procedure:"userToken",parameters:`'${this.props.authToken.jwt}'`}
        }).id

        //this.calendar = new YearlyCalendar({year:new Date().getFullYear(), langCode:this.props.langCode}).init()

    
    }
    init(){
        return `
        <div class="p-2">
            <div class="row p-0 m-0 ">
                <div class="col-6">
                    <select class="form-control type">
                        <option value="6">${this.props.lang.mandatoryHoliday}</option>
                        <option value="5">${this.props.lang.paidHolyDay}</option>
                        <option value="7">${this.props.lang.replace}</option>
                        <option value="0">${this.props.lang.remove}</option>
                    </select>
                    <input type="date" class="form-control setDate">
                </div>
                <div class="col-2 pt-4">
                    <button class="btn btn-success save" >Iktatás</button>
                    <button class="btn btn-warning repair" style="min-width:100px;">Javítás <span class="dots"></span> </button>
                </div>
            </div>
            
        </div>
       
        `
    }
    createMandatory(input){
        //Előzetes lefoglalás
        const res = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetchColumn",procedure:"createHolyday",parameters:`'${this.user}','${input.date}','${input.type}'`}
        })
        //Beszúrás az aktív userekhez
        if(input.type == 0){
            Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                response:"json",
                data:{mode:"fetchColumn",procedure:"removeMandatory",parameters:`'${input.date}'`}
            })
        }
        else{
            insertMandatory(input,this.user)
        }
        Toast({header:this.props.lang.success, time:"",body:this.props.lang.msg_ok})
    }
    events(){
        const setDate = document.querySelector(".setDate")
        const save = document.querySelector(".save")
        const type = document.querySelector(".type")
        save.addEventListener("click",()=>{
            if( setDate.value == "" ){
                setDate.classList.add("bg-danger")
            }
            else{
                setDate.classList.remove("bg-danger")
                this.createMandatory({date:setDate.value,type:type.value})
            }
        })

        const repair = document.querySelector(".repair")
        repair.addEventListener("click",()=>{
            repair.classList.add("btn-danger")

            setTimeout(() => {
                MandatoryLeaves(repair) 
              }, 100); // 2 másodperc múlva
            
           // MandatoryLeaves() 
        })
    }
}