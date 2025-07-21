const {searchEmp} = await import(`./Components/searchEmp/searchEmp.js${app_version}`)
const {Ajax} = await import(`../../Hooks/Ajax/Ajax.js${app_version}`)

export class HrAdmin{
    constructor(props){
        this.props = props

        this.props.loggedUser = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetch",procedure:"userToken",parameters:`'${JSON.parse(localStorage.getItem("authToken")).jwt}'`}
        }).id
    }
    init(){
        return `
        <div class="p-2 ">
            <div class="text-center sticky-top" style="top:75px;z-index:1">
                <i class="fa fa-list"></i>
                <input type="checkbox" class="format">
                <input class="userName rounded p-1 col-12 col-lg-4 mb-3" placeholder="${this.props.lang.name}">
                <button class="search btn btn-primary ms-3">${this.props.lang.search}</button>
                <a href="#createUser" class="btn btn-dark ms-3">${this.props.lang.createUser}</a>
            </div>
            <div class="results d-flex  row p-3 w-100"></div>
        </div>`
    }
    events(){
        const userName = document.querySelector(".userName")
        const search = document.querySelector(".search")
        search.addEventListener("click",()=>{
            const format = document.querySelector(".format")
            searchEmp(userName.value, this.props.lang, format.checked, this.props)

        })
        userName.addEventListener("keyup",(event)=>{
            const format = document.querySelector(".format")
            event.keyCode == 13 && searchEmp(userName.value, this.props.lang, format.checked, this.props)
        })
    }
}