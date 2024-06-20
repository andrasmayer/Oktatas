export class Home{
    constructor(lang){
        this.lang = lang
    }
    init(){
        return `
        <div>
            <div>${this.lang.content.section1}</div>
            <div>
                <button id="sample">${this.lang.content.clickMe}</button>
                </div>
        </div>`
    }    
    events(){
/*
        this.welcome = (msg) =>{
            console.log(msg)
        }
*/

        const sample = document.getElementById("sample")
        sample.addEventListener("click",()=>{
           // alert(this.lang.content.welcome)
           this.welcome("Ezt az üzit a welcome funció dobja:")
           this.welcome(this.lang.content.welcome)
        })

    }
    welcome(msg){
        console.log(msg)
    }
}
