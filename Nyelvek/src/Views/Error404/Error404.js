export class Error404{
    constructor(){}
    init(lang){
        return `
            <div>
                <div>${lang.message}</div>
            </div>
            `
    }
    events(){}
}