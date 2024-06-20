export class Error404{
    constructor(lang){
        this.lang = lang
    }
    init(){
        return `<div>${this.lang.content.section1}</div>`
    }
    events(){}
}