export class Loading{
    constructor(){   }
    show(){
        const context = document.querySelector("context")
        context.innerHTML = `
            <div class="text-center loading">
                <div class="spinner-border text-primary mt-5" role="status" style="width:100px;height:100px;"></div>
            </div>`
    }
    hide(){
        const loading = document.querySelector(".loading")
        loading.remove()
    }
}