
export const Ajax = (obj) =>{
    /*
    method      :   get/post
    url         :    hívás címe
    data        : beküldött adatok / JSON preferált,
    response    :   json, vagy elhagyható
    */
    if(obj.data == null){   obj.data = {} }
    let data = null
    var httpRequest = new XMLHttpRequest() 
    httpRequest.onreadystatechange = (e)=>{
        if(obj.data == null){   obj.data = {} }
        if(e.target.readyState ==4){
            data = obj.response == "json" ? JSON.parse(e.target.response) : e.target.response
        }
    }
    
    let input = ""
    Object.keys(obj.data).forEach((key,index)=>{

        obj.data[key] = obj.data[key].split("&").join("Ł")
        //console.log( obj.data[key] )

        input += `${key}=${obj.data[key]}`
        if(  index < Object.keys(obj.data).length-1){
            input += "&"
        }
    })
    let prefix = ""
    if( obj.method == "get"){ prefix = `?${input}` }
    httpRequest.open(obj.method, `${obj.url}${prefix}`, false)
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    httpRequest.send(input)
    return data
} 
