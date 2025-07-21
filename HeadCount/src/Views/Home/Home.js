
export class Home{
    constructor(props){
        this.props = props
        this.lang = props.lang 
    }
    init(){
        const userGuide = this.lang.title == "Főoldal" ? 
        `<div class="text-end">
            <a class="me-4" href="userGuide.pdf" target="userGuide">Kézikönyv</a>
        </div>`:""

        return `
            <div class="d-flex justify-content-center">
                <div class="col-10 col-lg-6 border text-center">
                    ${this.lang.header}
                    ${userGuide}
                    <div class="mt-3">${this.lang.colorCodes}</div>
                    <div class="">
                        <table class="table text-center">
                            <thead>
                                <tr>
                                    <th>${this.lang.color}</th>
                                    <th>${this.lang.meaning}</th>
                                </tr>
                            <thead>
                            <tbody>
                                <tr>
                                    <td class="bg-light"></td>
                                    <td>${this.lang.null}</td>
                                </tr>
                                <tr>
                                    <td class="bg-success"></td>
                                    <td>${this.lang.work}</td>
                                </tr>
                                <tr>
                                    <td class="bg-primary"></td>
                                    <td>${this.lang.hDay}</td>
                                </tr>
                                <tr>
                                    <td class="bg-danger"></td>
                                    <td>${this.lang.sick}</td>
                                </tr>
                                <tr>
                                    <td class="bg-warning"></td>
                                    <td>${this.lang.nonPaid}</td>
                                </tr>
                                <tr>
                                    <td class="bg-mandatoryLeave"></td>
                                    <td>${this.lang.mandatoryHoliday}</td>
                                </tr>
                                <tr>
                                    <td class="bg-holiday"></td>
                                    <td>${this.lang.paidHolyDay}</td>
                                </tr>
                                <tr>
                                    <td class="bg-restDay"></td>
                                    <td>${this.lang.restDay}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
               </div>
            </div>
            `
    }
    events(){
        
    }
}