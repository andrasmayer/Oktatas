export const Card =(props)=>{ 
    
    console.log(props)
    return `
    <div class="${props.classes["parent"]}">
        <div class="card ${props.classes["card"]}">
            <div class="card-header ${props.classes["card-header"]}">
                <div class="card-title ${props.classes["card-title"]}"">${props["card-title"]}</div>
            </div>
            <div class="card-body ${props.classes["card-body"]}">${props["card-body"]}</div>
        </div>    
    </div>    
    `
}