export class About{
    constructor(props){
        this.props = props
    }
    init(){
        return `
            <div>
                <div>Ez a rólunk oldal</div>
                <button id="gomb">Nyomj meg engem is</button>
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