const {Categories} = await import(`./Categories.js${app_version}`)
const {Events} = await import(`./drag&drop.js${app_version}`)
const {Ajax} = await import(`../../../Hooks/Ajax/Ajax.js${app_version}`)
export const buildForm = (data,location) =>{
    const handler = document.querySelector(".handler")
    const locations = {fieldTasks:"Terep",labTasks:"Műhely"}

    let context = ""
    Categories.forEach((itm,key)=>{
        context += `<div class="m-2 p-2 bg-info category" id="i_${key}" draggable="true">${itm}</div>`
    })
    const diabled =  ""

    handler.innerHTML = `
    <div class="row w-100 p-2">
        <div class="col-12">
            <input ${diabled} placeholder="Project azonosító" type="number" class="pid" value="${data.projectId}">
            <input ${diabled} placeholder="CO3 id" type="number" class="co3id" value="${data.co3Id}">
            <button class="btn btn-success save">Mentés</button>
        </div>
        <div class="col-12 text-center h2 status" status="0">${locations[location]}</div> 
        <div class="col-6 border-end bg-light dropzone"></div>
        <div class="col-6  bg-secondary dropzone">${context}</div>
    </div>`
    Events()
    const pid = document.querySelector(".pid")
    const co3id = document.querySelector(".co3id")
    const save = document.querySelector(".save")
    const status = document.querySelector(".status")
    save.addEventListener("click",()=>{
        const dropzone = document.querySelector(".dropzone") 
        const catList = dropzone.querySelectorAll(".category")
        const activeCats = []
        catList.forEach(itm=>{
            activeCats.push( itm.getAttribute("id").split("i_").join(""))
        })
        let errors = ""
        pid.value.length == 0 && (errors += "Nincs Project id\n")
        co3id.value.length == 0 && (errors += "Nincs Co3 id\n")
        activeCats.length == 0 && (errors += "Nincsenek feladatok\n")
        if(errors.length > 0){ alert(errors) }
        else{
            data.projectId  = pid.value
            data.co3Id      = co3id.value
            data[location] = activeCats
            if(location != "labTasks"){ buildForm(data,"labTasks") }
            else{
                /*
                const res = Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    response:"json",
                    data:{mode:"fetchColumn",procedure:"checkPassword",parameters:`'${curPw.value}','${this.props.authToken.jwt}'`}
                })
            */
                console.log( JSON.stringify(data) )

               // alert("Kész a cucc")
            }
        }
    })

}