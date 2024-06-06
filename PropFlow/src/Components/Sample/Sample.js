const {propCheck} = await import(`./Components/propCheck/propCheck.js${app_version}`)

export class Sample{
    constructor(props){
        this.props = props
        this.props.myElement = `<div>${JSON.stringify( this.props)}</div>`

    }
    init(){
        const incommingFrom_propCheck =  propCheck(this.props)
        console.log(incommingFrom_propCheck)

        incommingFrom_propCheck.formPropCheck()
        return `<div>${incommingFrom_propCheck.DOM}</div>`
    }
    events(){}
}