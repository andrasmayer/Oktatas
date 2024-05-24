export const Card = (props) =>{
    return `
    <div class="card">
        <div class="card-header">
            <label>${props.card_header}</label>
            <button class="close">X</button>
        </div>
        <div class="card-body open">${props.card_body}</div>
    </div>
    `
}

export const CardEvents = (props) =>{
    const closeBtn = document.querySelectorAll(".close")
    closeBtn.forEach(itm=>{
        itm.addEventListener("click",(event)=>{
            const target = event.target.parentNode.parentNode
            target.querySelector(".card-body").classList.toggle("open") 
        })
    })
}
