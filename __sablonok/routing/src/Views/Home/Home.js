export class Home{
    constructor(props){
        this.props = props
    }
    init(){
        return `
            <div>
                <div>Ez a főoldal</div>
                <button id="gomb">Nyomj meg</button>
            </div>
            `
    }
    events(){
        console.log("meghívtunk")
        const gomb = document.getElementById("gomb")
        gomb.addEventListener("click",(event)=>{
            alert("megnyomtak")
        })
    }
}