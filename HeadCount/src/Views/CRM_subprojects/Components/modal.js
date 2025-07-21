export const Categories =    ["Épített örökségi elemek téliesítése (m2)","tehergépkocsi biztosÍtása (óra)","rakodógép nehézgépkezelő biztosításával (óra)","homlokrakodógép nehézgépkezelő biztosításával (óra)","gépi földmunkaáthordással 1000 m2 felett (m2)","gépi földmunkaáthordással 1000 m2 alatt (m2)","gépi földmunka helyben deponálással 1000 m2 felett (m2)","gépi földmunka helyben deponálással 1000 m2 alatt (m2)","gépi földmunka 0,8 m alatt (m3)","Zárható irodakonténer (nap)","Szivattyú berendezés (óra)","Mobilkerítés építése (fm)","Mobil wc biztosítása (nap)","Kézi földmunka biztosítása (m3)","Kézi bontómunka pozitív régészeti lelőhelyeken (óra)","Kézi bontómunka pozitív régészeti lelőhelyeken (m2)","Kézi bontómunka negatív régészeti lelőhelyeken (m2)","Kézi bontómunka kombinált pozitív városi környezetű, nagy intenzitású régészeti lelőhelyeken (m2)","Kézi bontómunka kombinált pozitív városi környezetű, kis intenzitású régészeti lelőhelyeken (m2)","Kézi bontómunka kombinált pozitív városi környezetű, kis alapterületű régészeti lelőhelyeken (m2)","Kézi bontómunka kombinált pozitív régészeti lelőhelyeken (m2)","Irodakonténer szállítása fel- és lerakással (alkalom)","Geotextil elhelyezése (m2)","Földáthordás 1 km-en túl deponálással, földkezeléssel (m3)","Földkezelés depóáthelyezés dózerral (m3)","Föld visszatöltése (m3)","Dúcolás (m2)"]

const modalDropDown = () =>{
    let context = ""
    Categories.forEach((itm,key)=>{
        context += `<li><div class="dropdown-item newOption" data-value="${key}">${itm}</div></li>`
    })
    return `
        <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="selectOption" data-bs-toggle="dropdown" aria-expanded="false">
            Kérlek válassz
        </button>
        <ul class="dropdown-menu" aria-labelledby="selectOption">
            ${context}
        </ul>
        </div>`

}
export const modal = `
        <div class="p-2">
            <div>
                <input class="newSubProject" placeholder="Alproject">
                <button class="save">Létrehozás</button>
            </div>
            <div>
                <h4 class="pName pt-4">Project</h4>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Alproject</th>
                            <th>Létrehozva</th>
                        </tr>
                    <thead>
                    <tbody class="subProjects"></tbody>
                </table>
            </div>
            <div class="msg"></div>   
            <div class="modal fade" id="modal"  tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content"  style="min-height:80% !important;overflow:auto;">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="text-danger modalMsg h5"></div>
                        ${modalDropDown()}

                        <div class="jobs"></div>
                    </div>
                    <div class="modal-footer">
                        <a type="button" class="btn btn-primary redirectToDetails" target="details" >Műhely feladatok</a>
                    </div>
                    </div>
                </div>
            </div>            
        </div>
        `
/*
export const modalEvents = (data) =>{
    const newOption = document.querySelectorAll(".newOption")
    newOption.forEach(itm=>{
        itm.addEventListener("click",()=>{
            const jobiId = itm.getAttribute("data-value")
            console.log("Kiválasztottak")
            console.log(jobiId)
            console.log(data.details.tasks)

            console.log( data.details.tasks.includes(jobiId) )
            if( data.details.tasks.includes(jobiId) ){
                console.log("Már benne van")
            }
            else{
                data.details.tasks.push(jobiId)
            }

            console.log(data.details.tasks)
        })
    })
}
    */