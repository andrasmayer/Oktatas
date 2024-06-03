export const filterEvents = (props) =>{

    props.dataTable = document.getElementById(props.tableID)
    props.thead = props.dataTable.querySelector("thead")
    props.theadRow = props.dataTable.querySelector("tr")
    props.inputs = props.theadRow.querySelectorAll("input")
    props.tbody = props.dataTable.querySelector("tbody")
    
    props.render(props.myObject)

    props.inputs.forEach(input=>{
        
        input.addEventListener("keyup",(event)=>{
           
            const target = event.target
            const filterBy = target.getAttribute("filterBy")
    
            props.filterOptions[filterBy] = target.value
    
            props.filteredArray = props.myObject.filter((itm) =>{
              return    itm.age.toString().includes(props.filterOptions.age) &&
                        itm.name.toLowerCase().includes(props.filterOptions.name.toLowerCase())  &&
                        itm.gender.toLowerCase().includes(props.filterOptions.gender.toLowerCase())  
            })
            props.render(props.filteredArray)
        })
    })
    
}