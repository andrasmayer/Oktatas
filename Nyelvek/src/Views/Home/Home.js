export class Home{
    constructor(props){
        this.props = props
    }
    init(lang){
        this.lang = lang
        return `
            <div>
                <div>${this.lang.homePage}</div>
                <button id="gomb">${this.lang.clickMe}</button>
            </div>
            `
    }
    events(){
        const gomb = document.getElementById("gomb")
        gomb.addEventListener("click",(event)=>{
            alert(this.lang.IveBeenClicked)
        })
    }
}