const { Ajax } = await import(`../../Hooks/Ajax/Ajax.js${app_version}`)
const { $_GET } = await import(`../../Hooks/$_GET/$_GET.js${app_version}`)
const { details } = await import(`./Componencts/details.js${app_version}`)
const { modal } = await import(`./Componencts/modal.js${app_version}`)
const { commentPanel,commentEvents } = await import(`./Componencts/accordion.js${app_version}`)
export class CRM_details {
    constructor(props) {
        this.props = props
        this.user = Ajax({
            url: "./server/Procedures/Fetch.php",
            method: "post",
            response: "json",
            data: { mode: "fetch", procedure: "userToken", parameters: `'${this.props.authToken.jwt}'` }
        }).id
        this.details = details
        this.percent = 0
        this.selectedLocation = ""
        this.selectedIndex = ""
    }
    listLocations() {
        const locations = document.querySelector(".locations")
        const msg = document.querySelector(".msg")
        locations.innerHTML = ""
        this.data = Ajax({
            url: "./server/Procedures/Fetch.php",
            method: "post",
            response: "json",
            data: {
                mode: "fetchAll", procedure: "crm_project_details",
                parameters: `'${$_GET().id}'`
            }
        })
        this.core = Ajax({
            url: "./server/Procedures/Fetch.php",
            method: "post",
            response: "json",
            data: {
                mode: "fetch", procedure: "crm_project_core",
                parameters: `'${$_GET().pid}','${$_GET().id}'`
            }
        })
        if (this.data.length == 0) {
            msg.innerHTML = "Még nincsenek adatok"
        }
        else {
            msg.innerHTML = ""
            this.data.forEach((itm, key) => {
                locations.innerHTML += `
                    <tr data-id="${key}" data-bs-toggle="modal" data-bs-target="#modal">
                        <td>${itm.location}</td>
                        <td>${itm.created}</td>
                        <td>${this.calculate2(itm.details)}</td>
                    </tr>`
            })
        }
        this.clickEvents()
    }
    init() {
        return modal
    }

    calculate2(details) {
        if (typeof details == "string") {
            details = JSON.parse(details)
        }
        let percent = 0
        let maxValue = 0
        Object.keys(details.phases).forEach((itm) => {
            details.phases[itm].elements.forEach((itm2, key) => {
                maxValue += itm2.status.length - 1
                itm2.status.forEach((st, i) => {
                    if (itm2.selected == i) {
                        percent += i
                    }
                })
            })
        })
        return Math.round(percent / maxValue * 100) + "%"
    }
    calculate() {
        const modal_header = document.querySelector(".modal-header")
        const modal_body = document.querySelector(".modal-body")
        const details = JSON.parse(this.data[this.selectedIndex].details)
        let percent = 0
        let maxValue = 0
        Object.keys(details.phases).forEach((itm) => {
            details.phases[itm].elements.forEach((itm2, key) => {
                maxValue += itm2.status.length - 1
                itm2.status.forEach((st, i) => {
                    const selected = itm2.selected == i ? "selected" : ""
                    if (selected == "selected" && itm2.status.length - 1 == i) {
                        percent += itm2.status.length - 1
                    }
                })
            })
        })
        this.percent = Math.round(percent / maxValue * 100)

        let color = ""
        if (this.percent == 100) { color = "text-success" }
        else if (this.percent > 50) { color = "text-warning" }
        else { color = "text-danger" }

        modal_header.innerHTML = `
        <div class="row col-12">
            <div class="col-12">
                <label class="h5">${this.selectedLocation}</label>
                
                <label class="completion float-end h2 ${color}">${this.percent}%</label>
            </div>
            ${ commentPanel(this.data[this.selectedIndex].id) }
        </div>`
        commentEvents(this.data[this.selectedIndex].id, this.user)

    }
    clickEvents() {
        const locations = document.querySelector(".locations")
        const rows = locations.querySelectorAll("tr")
        const modal_header = document.querySelector(".modal-header")
        const modal_body = document.querySelector(".modal-body")
        const pName = document.querySelector(".pName")
        const sName = document.querySelector(".sName")
        pName.textContent = this.core.project
        sName.textContent = this.core.subProject
        rows.forEach((itm) => {
            itm.addEventListener("click", () => {
                this.selectedLocation = itm.querySelectorAll("td")[0].textContent
                const index = itm.getAttribute("data-id")
                this.selectedIndex = index
                const details = JSON.parse(this.data[index].details)
                let context = ""
                Object.keys(details.phases).forEach((itm2) => {
                    context += `<h4 class="border-bottom mt-2 ">${details.phases[itm2].name}</h4>`
                    details.phases[itm2].elements.forEach((itm3, key) => {
                        let status = ``
                        itm3.status.forEach((st, i) => {
                            const selected = itm3.selected == i ? "selected" : ""
                            status += `<option ${selected} value="${i}">${st}</option>`
                        })
                        context += `
                        <div class="p-2" >
                            <label>${itm3.name}</label>
                            <select class="float-end data-phase" data-phase="${itm2}" data-index="${key}" data-object="${index}">${status}</select>
                        </div>`
                    })
                })
                modal_body.innerHTML = context
                this.calculate()
                this.changeEvents()
            })
        })
    }
    changeEvents() {
        const dataPhase = document.querySelectorAll(".data-phase")
        dataPhase.forEach(itm => {
            itm.addEventListener("change", () => {
                const rowId = itm.getAttribute("data-object")
                const phase = itm.getAttribute("data-phase")
                const index = itm.getAttribute("data-index")
                const value = itm.value
                const data = this.data[rowId]
                const details = JSON.parse(data.details)
                details.phases[phase].elements[index].selected = value
                this.data[rowId].details = JSON.stringify(details)
                const res = Ajax({
                    url: "./server/Procedures/Fetch.php",
                    method: "post",
                    response: "json",
                    data: {
                        mode: "fetchAll", procedure: "crm_project_details_update",
                        parameters: `'${this.data[rowId].id}','${this.data[rowId].details}'`
                    }
                })
                this.listLocations()
                this.calculate()
            })
        })
    }
    events() {
        const newArea = document.querySelector(".newArea")
        const save = document.querySelector(".save")
        const msg = document.querySelector(".msg")
        save.addEventListener("click", () => {
            if (newArea.value.length < 5) {
                msg.innerHTML = `<div class="text-danger">Terület neve túl rövid (minimum 5 karakter)</div>`
            }
            else {
                const res = Ajax({
                    url: "./server/Procedures/Fetch.php",
                    method: "post",
                    response: "json",
                    data: {
                        mode: "fetchColumn", procedure: "crm_create_location",
                        parameters: `'${$_GET().id}','${newArea.value}','${this.user}','${JSON.stringify(this.details)}'`
                    }
                })
                if (res == 0) { this.listLocations() }
                else {
                    msg.innerHTML = `<div class="text-danger">Ez a terület már létezik</div>`
                }
            }
        })
        this.listLocations()
    }
}