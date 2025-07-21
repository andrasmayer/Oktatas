const {Ajax} = await import(`../../Hooks/Ajax/Ajax.js${app_version}`)
const {HR,contextMenu, calculateHolyDays} = await import(`../Planner/Components/Api.js${app_version}`)
const {Loading} = await import(`../../Components/Loading/Loading.js${app_version}`)
const {events,closeMonthForAll} = await import(`../Planner/Components/Components/events.js${app_version}`)
export const {MultiplaDaySelect} = await import(`../Planner/Components/Components/MultiplaDaySelect.js${app_version}`) 
const MultiplaDaySelectPanel = new MultiplaDaySelect()

export class Planner_hr{
    constructor(props){
        this.Spinner = new Loading()
        this.props = props
    }
    getData(){
        this.feed = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetchAll",procedure:"list_users",parameters:`'1'`}
        })
        
//this.feed = [ this.feed[0] ]


        this.supervisorId = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetch",procedure:"userToken",parameters:`'${this.props.authToken.jwt}'`}
        }).id
        this.user = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetch",procedure:"userToken",parameters:`'${this.props.authToken.jwt}'`}
        }).id
        const year = new Date().getFullYear()

        this.feed.forEach((itm,key)=>{
            const empCore = Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                response:"json",
                data:{mode:"fetch",procedure:"empCore",parameters:`'${itm.id}','${year}'`}
            })

            const total = calculateHolyDays(empCore)
            this.feed[key].holydays = {
                total:total,
                current :total - empCore.usedHolyDay,
                hireDate: empCore.hireDate,
                birthYear:empCore.birth,
                childCount:empCore.childs,
                otherHolydays:empCore.otherHolydays,
                prevHolydays:empCore.prevHolydays
            }
        })
    }
    init(){
        this.Spinner.show()
        return ""
    }
    events(){
        const pageContent = document.querySelector("#pageContent") 
        pageContent.innerHTML = `
        <div class="p-2">
            <button class="btn btn-danger closeWholeMonth d-none">
                <i class="fa fa-lock"></i>
                <label>${this.props.lang.closeMonth}<label>
            </button>
            <a class="d-none fa fa-download ms-4 btn btn-outline-dark getPDF" target="PDF" href="#"></a>
        </div>
        <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasMultiDays" aria-labelledby="offcanvasYearCalendarLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasMultiDaysLabel">${this.props.lang.multiDays}</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="multiDayCtn">
                MultidayApi
                </div>
            </div>
        </div>`

    setTimeout(async () => {

        await this.getData()  // Megvárjuk, hogy a lekérés lefusson
        
        pageContent.innerHTML += HR(this.feed, this.props.lang, this.props.langCode)
        MultiplaDaySelectPanel.offcanvasEvents({ langCode: this.props.langCode })

        contextMenu()
        this.Spinner.hide()
        events()

        const closeWholeMonth = document.querySelector(".closeWholeMonth")
        closeWholeMonth.classList.remove("d-none")
        closeWholeMonth.addEventListener("click", (e) => {
            const year = document.querySelector("year").textContent
            const month = document.querySelector("month").textContent
            closeMonthForAll({ year: year, month: month })
        })

        const PDF = document.querySelector(".getPDF")
        const year = document.querySelector("year").textContent
        const month = document.querySelector("month").textContent
        PDF.setAttribute("href", `#downloads?year=${year}&month=${month}`)
        PDF.classList.remove("d-none")

    }, 10)


        document.addEventListener("scroll",(e)=>{
            const x = window.scrollX
            const fixedHeader = document.querySelector(".fixedHeader")
            const thead = document.querySelector("thead")
            thead.style.left = -x
        })
    }
}