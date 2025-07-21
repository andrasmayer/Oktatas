let {Ajax} = await import(`../../Hooks/Ajax/Ajax.js${app_version}`)


export class UserComments{
    constructor(props){
        this.props = props
    }
    init(){
        return `
        <div class="d-flex justify-content-center">
            <div class="col-8 col-lg-4 text-center p-2">
                <h4>${this.props.lang.title}</h4>
                <input class="dateSel" type="date">
                <dataCtn></dataCtn>
            </div>
        </div>
        `
    }
    events(){
        const dataCtn = document.querySelector("dataCtn")
        const dateSel = document.querySelector(".dateSel")
        dateSel.addEventListener("change",()=>{
            const dataSet = Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                response:"json",
                data:{mode:"fetchAll",procedure:"list_comments",parameters:`'${dateSel.value}'`}
            })

            let context = ""
            dataSet.forEach(itm=>{
                context += `
                <div class="m-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">
                                <label>${itm.userName}</label>
                                ${ itm.userName != itm.creatorName ?
                                    `<i class="float-end text-secondary"><small>${itm.creatorName}</small></i>`
                                    :
                                    ""
                                }
                            </h5>
                            <p class="card-text">${itm.comment}</p>
                            
                        </div>
                    </div>
                </div>
                `
            })

            dataCtn.innerHTML = context
        })
    }
}