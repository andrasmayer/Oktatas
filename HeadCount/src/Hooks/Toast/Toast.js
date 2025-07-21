export const Toast = (obj) =>{
    
    const body = document.querySelector("body")
    let toastCtn = document.querySelector(".toastCtn")

    if(toastCtn == null){ 
        const ctn = document.createElement("div");
        ctn.classList.add("position-fixed","bottom-0","end-0","p-3","toastCtn")
        ctn.style.zIndex = 11
        body.appendChild(ctn)
    }
    toastCtn = document.querySelector(".toastCtn")
  
  toastCtn.innerHTML += `
    <div class="toast show mt-2" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
        <strong class="me-auto">${obj.header}</strong>
        <small>${obj.time}</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">${obj.body}</div>
    </div>
`
    const toasts = document.querySelectorAll(".toast")
    toasts.forEach(itm=>{

        setTimeout(() => {
            itm.animate({"opacity":0},{duration: 1000,  fill: "forwards"})
            setTimeout(() => {
                itm.remove()
            }, "1000");
          }, "2000");

        itm.querySelector(".btn-close").addEventListener("click",(e)=>{
            e.target.parentNode.parentNode.remove()
        })
    })
}