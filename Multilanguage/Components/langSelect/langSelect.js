import {router} from "../Router/router.js"


export class langSelect {
    constructor(lang,active,flow){
        this.lang = lang
        this.active = active
        this.activeLang = flow[0]
        this.Langs = flow[1]
        this.Lang = flow[2]
        this.flow = flow
        

    
    }
    init(){
      
        let context = ``
        Object.keys(this.lang).forEach(key=>{
            const selected = this.active == key ? "selected" : ""
            context += `<option ${selected} value="${key}">${this.lang[key].title}</option>`
        })
        return  `
            <select class="lanSel">${context}</select>
        `
    }
    events(){
        const lanSel = document.querySelector(".lanSel")
        lanSel.addEventListener("change",(event)=>{

            window.localStorage.setItem("Lang",event.target.value)
            this.Lang = event.target.value
            this.activeLang = this.Langs[this.Lang]

            router(this.activeLang,this.Langs,this.Lang)
        })

    }
}
