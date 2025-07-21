const {Ajax} = await import(`../../Hooks/Ajax/Ajax.js${app_version}`)
export class taskCategories{
    constructor(props){
        this.props = props
        this.categories = this.searchTask({"name":"",status:1})
    }
    render(){
        this.categories = this.searchTask({"name":"",status:1})
        const catTable = document.querySelector(".catTable")
        catTable.innerHTML = this.buildTable()
        this.tableEvents()
    }
    searchTask(obj){
        return Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetchAll",procedure:"task_categories",parameters:`'${obj.name}',${obj.status}`}
        }) 
    }
    createTask(obj){
        const res = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetchColumn",procedure:"create_task_categories",parameters:`'${obj.name}'`}
        }) 
    }
    buildTable(){
        let context = ""
        this.categories.forEach(itm => {
            context += `
            <div class="p-2">
                <i class="fa fa-pencil catId" catId="${itm.id}"></i>    
                <label>${itm.catName}</label>
            </div>`
        })
        return `${context}`
    }
    updateCatName(obj){
        const res = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetchColumn",procedure:"update_task_categories",parameters:`'${obj.id}','${obj.catName}'`}
        })
        
    }
    tableEvents(){
        const editor = document.querySelectorAll(".catId")
        editor.forEach(itm=>{
            itm.addEventListener("click",()=>{
                const status = itm.classList.contains("fa-pencil")
                if(status === true){
                    let oldValue = itm.parentNode.querySelector("label").textContent
                    itm.setAttribute("oldValue",oldValue)
                    itm.parentNode.querySelector("label").innerHTML = `<input value="${oldValue}">`
                    itm.classList.remove("fa-pencil")
                    itm.classList.add("fa-lock","text-danger")
                }
                else{
                    const newName = itm.parentNode.querySelector("input").value
                    const id = itm.getAttribute("catId")
                    const catName = itm.parentNode.querySelector("input").value
                    if(newName.length < 3 ){ return false } //4 karakter alatt nem ment

                    const exists = this.categories.filter(function(itm){
                        return itm.catName.toLowerCase() == catName.toLowerCase()
                    })

                    const valid =    exists.length == 0  || exists[0].id ==  id
                    valid === true &&  this.updateCatName({id:id,catName:catName})
                    const newCatName = valid === true ? itm.parentNode.querySelector("input").value : itm.getAttribute("oldValue")
                    itm.parentNode.querySelector("label").innerHTML = newCatName
                    itm.classList.add("fa-pencil")
                    itm.classList.remove("fa-lock","text-danger")
                    this.render()
                }
            })
        })
    }
    init(){
        return  `
        <div class="d-flex justify-content-center">
            <div class="col-12 row justify-content-center">
                <div class="col-12 col-lg-4 p-2">
                    <input class="catName form-control" placeholder="catName">
                </div>
                <div class="catTable col-12 col-lg-8 p-2"></div>
            </div>
        </div>
        `
    }
    events(){
        this.render()
        const catName = document.querySelector(".catName")
        catName.addEventListener("keyup",(e)=>{
            if(e.keyCode == 13){
                const exists = this.categories.filter(function(itm){
                    return itm.catName.toLowerCase() == catName.value.toLowerCase()
                }).length
                const params = {"name":catName.value,status:1}
                const valid = this.searchTask(params).length  == 0 && catName.value.length >= 3 && exists == 0
                valid === true ? this.createTask(params) : console.log("fos")
                this.categories = this.searchTask({"name":"",status:1})
                this.render()
            }
        })
    }
}