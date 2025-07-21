const { Ajax } = await import(`../../../Hooks/Ajax/Ajax.js${app_version}`)
const { $_GET } = await import(`../../../Hooks/$_GET/$_GET.js${app_version}`)
export const commentPanel = (id) =>{
    return `
        <div>
            <div class="controls">
                <i class="fa fa-comments btn" data-bs-toggle="collapse" data-bs-target="#commentSection"></i>
                <i class="fa fa-file btn" data-bs-toggle="collapse" data-bs-target="#imageSection"></i>
                <i class="fa fa-upload btn uploadFile" ></i>
                <input class="d-none fileCtn" type="file">
            </div>
            <div class="accordion " id="accordion_comment">
                <div class="accordion-item border-0">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <div class="w-100  " type="button"  aria-expanded="false" aria-controls="commentSection">
                        </div>
                    </h2>
                    <div id="commentSection" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordion_comment">
                        <div class="accordion-body">
                            <div>
                                <textarea class="form-control commentText" placeholder="Új hozzászólás"></textarea>
                                <button class="btn btn-primary addComment mt-2">Küldés</button>             
                            </div>
                            <div class="commentList"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="accordion " id="accordion_images">
                <div class="accordion-item border-0">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <div class="w-100  " type="button"  aria-expanded="false" aria-controls="imageSection">
                        </div>
                    </h2>
                    <div id="imageSection" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordion_comment">
                        <div class="accordion-body">
                            <div class="imageList">${loadFiles(id)}</div>
                        </div>
                    </div>
                </div>
            </div>    
        </div>`
}
export const loadFiles = (id) =>{
    const files =  Ajax({
        url: "./server/Procedures/Fetch.php",
        method: "post",
        response: "json",
        data: { mode: "fetchAll", procedure: "crm_getFiles", parameters: `'${id}'` }
    })
    let context = ``
    files.forEach(img=>{
        context += `<a download class="nav-link" target="${img.name}" href="./server/Upload/Files/${img.name}">${img.realName}</a>`
    })
    return context
}
export const commentEvents = (id,user) =>{
    const commentText = document.querySelector(".commentText")
    const addComment = document.querySelector(".addComment")
    const commentList = document.querySelector(".commentList")
    const imageList = document.querySelector(".imageList")
    const comments =  Ajax({
        url: "./server/Procedures/Fetch.php",
        method: "post",
        response: "json",
        data: { mode: "fetchAll", procedure: "crm_project_details_comments", parameters: `'${id}'` }
    })
    comments.forEach(itm=>{
        commentList.innerHTML += `
            <div class="card mt-5">
                <div class="card-header">
                    <b>${itm.userName}</b>
                    <b class="float-end">${itm.created}</b>
                </div>
                <div class="card-body" style="white-space: pre;">${itm.message}</div>
            </div>
        `
    })
    addComment.addEventListener("click",()=>{
        if(commentText.value.length == 0){ return false}
        const res =   Ajax({
                    url: "./server/Procedures/Fetch.php",
                    method: "post",
                    response: "json",
                    data: { mode: "fetch", procedure: "crm_project_details_comments_create",
                        parameters: `'${id}','${user}','${commentText.value}'` }
                })
        commentList.innerHTML += `
            <div class="card mt-5">
                <div class="card-header">
                    <b>${res.userName}</b>
                    <b class="float-end">${res.created}</b>
                </div>
                <div class="card-body" style="white-space: pre;">${commentText.value}</div>
            </div>`
    })

    //Upload
    const uploadFile = document.querySelector(".uploadFile")
    const fileCtn = document.querySelector(".fileCtn")
    uploadFile.addEventListener("click",()=>{
        fileCtn.click()
    })
    fileCtn.addEventListener("change",()=>{
        const formData = new FormData();           
        formData.append("file", fileCtn.files[0]);
        formData.append("pid", $_GET().pid);
        formData.append("sid", $_GET().id);
        formData.append("user", user);
        formData.append("lid", id);
        fetch('./server/Upload/fileUpload.php', { method: 'POST', body: formData})
            .then(response => response.text())
            .then(data => {
                imageList.innerHTML = loadFiles(id)
            })
    })
}