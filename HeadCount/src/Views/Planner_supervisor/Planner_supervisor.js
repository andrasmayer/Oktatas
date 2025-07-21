const {Ajax} = await import(`../../Hooks/Ajax/Ajax.js${app_version}`)
const {HR, calculateHolyDays, contextMenu} = await import(`../Planner/Components/Api.js${app_version}`)
const {Loading} = await import(`../../Components/Loading/Loading.js${app_version}`)
const {events} = await import(`../Planner/Components/Components/events.js${app_version}`)

export class Planner_supervisor{
    constructor(props){
        this.props = props
        this.Spinner = new Loading()

    }
    getData(){
        this.supervisorId = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetch",procedure:"userToken",parameters:`'${this.props.authToken.jwt}'`}
        }).id

        this.feed = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetchAll",procedure:"list_juniors",parameters:`'${this.supervisorId}','1'`}
        })

        //Kivett szabik
        const year = new Date().getFullYear()
        this.feed.forEach((itm,key)=>{
            const empCore = Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                response:"json",
                data:{mode:"fetch",procedure:"empCore",parameters:`'${itm.id}','${year}'`}
            })
            this.feed[key].holydays = {
                total:calculateHolyDays(empCore), 
                current :calculateHolyDays(empCore)  - empCore.usedHolyDay, 
                hireDate: empCore.hireDate,
                birthYear:empCore.birth,
                childCount:empCore.childs
            }
         
        })
        this.init()
    }
    init(){
        this.Spinner.show()
        return ""
    }
    events(){
        const pageContent = document.querySelector("#pageContent")
        setTimeout(() => {
            this.getData()
            pageContent.innerHTML = HR( this.feed, this.props.lang, this.props.langCode)
            this.Spinner.hide()

            document.addEventListener("scroll",(e)=>{
                const x = window.scrollX
                const fixedHeader = document.querySelector(".fixedHeader")
                const thead = document.querySelector("thead")
                thead.style.left = -x
            })

            contextMenu()
            events()
        }, "10");
    }
}