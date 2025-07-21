const {Langs} = await import(`../Langs/Langs.js${app_version}`)
export class langSelect {
    constructor(props){
       this.active = props.activeLang
    }
    init(){
        let context = ``
        Object.keys(Langs).forEach(key=>{
           const selected = this.active == key ? "selected" : ""
            context += `<option ${selected} value="${key}">${Langs[key].title}</option>`
        })
        return  `
            <select class="lanSel float-end">${context}</select>
        `
    }
    events(){
        const langSel = document.querySelector(".lanSel")
        langSel.addEventListener("change",(event)=>{
            window.localStorage.setItem("Lang",event.target.value)
            const langCode = event.target.value
            location.reload()
        })
    }
}