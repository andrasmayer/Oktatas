export class LangSelector{
    constructor(props){
        this.langCode = props.langCode
        this.langs = props.langs
    }
    init(){
        let options = ``
        Object.keys(this.langs).forEach(key=>{
            const active =  key == this.langCode ? "selected" : ""
            options += `<option ${active} value="${key}">${this.langs[key].title}</option>`
        })
        return `
            <div style="float:right" >
                <select id="langWrapper">
                    ${options}
                </select>
            </div>
        `
    }
    events(){
        const langWrapper = document.querySelector("#langWrapper")
        langWrapper.addEventListener("change",function(e){
            console.log(e.target.value)
            localStorage.setItem("langCode", e.target.value)
            location.reload()
        })
    }
}