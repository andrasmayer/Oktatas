const {Ajax} = await import(`../Ajax/Ajax.js${app_version}`)
const {colors} = await import(`../../Views/Planner/Components/Components/Plugins.js${app_version}`)
export const initPopover = () =>{
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        let opts = {
            delay: { 
                show: "500", 
                hide: "100"
            },
            sanitize: false,
            html: true,
        }    

        /*
        if( popoverTriggerEl.classList.contains("popoverDay") ){
            popoverTriggerEl.addEventListener("mouseenter",()=>{
              const date = popoverTriggerEl.getAttribute("data-date")
              const user = popoverTriggerEl.getAttribute("data-user")
                const logs = Ajax({
                    url:"./server/Procedures/Fetch.php",
                    method:"post",
                    response:"json",
                    data:{mode:"fetchAll",procedure:"getLogEmpDay",parameters:`'${user}','${date}'`}
                })

                let context = ``
                logs.forEach(itm=>{
                    context += `
                    <tr> 
                        <td>${itm.editorName}</td>
                        <td>${itm.date}</td>
                        <td>
                            <button class="btn ${colors[itm.type]}">&nbsp</button>
                        </td>
                    </tr>
                    `
                })
                let table = `
                <table class="table table-striped">
                    <tbody>${context}</tbody>
                </table>
                `
                table += `</tbody></table>`
                popoverTriggerEl.setAttribute("data-bs-content",table)
            })
        }
            */
      return new bootstrap.Popover(popoverTriggerEl,opts)
    })
}