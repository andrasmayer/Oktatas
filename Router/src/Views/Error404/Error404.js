export class Error404{
    constructor(props){
        this.props = props
    }
    init(){
        return `
            <div>
                <div>A keresett oldal nem található</div>
            </div>
            `
    }
    events(){}
}