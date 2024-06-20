export class About{
    constructor(props){
        this.props = props
    }
    init(lang){
        return `
            <div>
                <div>${lang.siteInfo}</div>
                <button id="gomb">${lang.clickMe}</button>
            </div>
            `
    }
    events(){
        const gomb = document.getElementById("gomb")
        gomb.addEventListener("click",(event)=>{
            event.target.classList.toggle("piros")
        })
    }
}