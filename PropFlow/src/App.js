const {Sample} = await import(`./Components/Sample/Sample.js${app_version}`)
const {Card} = await import(`./Components/Card/Card.js${app_version}`)

export const App = ()=>{
    const root = document.getElementById("root")
/*
    let myData = {userId:1, userName:"Béla"}

    const context = new Sample(myData)
    root.innerHTML = context.init()
    context.events()
*/


    const sampleDOM = `
    <div>
        <button class="btn btn-danger float-end">Nyomj meg</button>
    </div>`

    const cardArray = [
        {"card-title":"Saját fejlécem",
            "card-body":sampleDOM,
            classes:{
                "parent":"col-4",
                "card":"",
                "card-header" : "bg-danger text-light",
                "card-title" : "text-center h3",
                "card-body" : "h3"
            }
        },
        {"card-title":"Ez is az enyém","card-body":"Ez is a kártya teste",
        classes:{
            "parent":"col-8",
            "card":"",
            "card-header" : "bg-primary text-danger",
            "card-body" : "h5"
        }
    },
   
    ]

   
    let context = ``
    cardArray.forEach(itm=>{
        context += Card(itm)
    })
    

    root.innerHTML =  `<div class="row">${context}</div>`
    
}