export const buildTbody = (data) =>{
    let context = ``
    data.forEach(itm=>{
        context += `
            <tr class="user">
                <td>${itm.id}</td>    
                <td>${itm.name}</td>    
                <td>${itm.age}</td>    
            <tr>
        `
    })
    return context
}
