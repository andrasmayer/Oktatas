const {navEvents} = await import(`./Components/navEvents.js${app_version}`)
const {langSelect} = await import(`../Langs/langSelect.js${app_version}`)
export class Navbar{
    constructor(props){
        this.props = props
        this.init()
    }
    init(){
        this.langSel =  new langSelect({activeLang:this.props.langCode})
        const target = document.querySelector(this.props.target);
        target.innerHTML  = `
            <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                <div class="container-fluid" id="navBar">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                </div>
                ${ this.langSel.init() }
            </nav>
            `
    }
    events(path){
        navEvents({langCode:this.props.langCode,authToken:this.props.authToken,path})
        this.langSel.events()
    }
}