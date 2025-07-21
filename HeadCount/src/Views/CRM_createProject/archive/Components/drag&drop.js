export const Events = () =>{
        
    const handleDragStart = (event) => {
        event.dataTransfer.setData('text/plain', event.target.id)
        event.target.style.opacity = '0.4'
    }

    const handleDragOver = (event) => {
        event.preventDefault()
    }

    const handleDrop = (event) => {
        event.preventDefault()
        const draggedItemId = event.dataTransfer.getData('text/plain')
        const draggedItem = document.getElementById(draggedItemId)
        const target = event.target.classList.contains("dropzone") === true ? 
        event.target : event.target.parentNode
        target.appendChild(draggedItem)
        draggedItem.style.opacity = '1'
    }

    const handleDragEnd = (event) => {
        event.target.style.opacity = '1'
    }

    const dropzones = document.querySelectorAll(".dropzone")
    dropzones.forEach(itm=>{
        itm.addEventListener('dragover', handleDragOver)
        itm.addEventListener('drop', handleDrop)
    })

    const items = document.querySelectorAll('.category')
    items.forEach(item => {
        item.addEventListener('dragstart', handleDragStart)
        item.addEventListener('dragend', handleDragEnd)
    })

}