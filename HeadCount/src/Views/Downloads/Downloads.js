const {DownloadRegister} = await import(`../../Hooks/DownloadRegister/DownloadRegister.js${app_version}`)

export class Downloads{
    constructor(props){
        this.props = props
        this.download = new DownloadRegister(this.props.langCode)

    }
    init(){
        return this.download.init()
    }
    events(){
        this.download.events()
    }
}