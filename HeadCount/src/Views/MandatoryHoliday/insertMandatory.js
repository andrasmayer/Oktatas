const {Ajax} = await import(`../../Hooks/Ajax/Ajax.js${app_version}`)
const {activeUsers} = await import(`../../Components/users/activeUsers.js${app_version}`)
export const { updateColumns,insertColumns} = await import(`../Planner/Components/Components/Plugins.js${app_version}`)
export const insertMandatory = (input,editor) =>{
    activeUsers.forEach(user=>{
        if(user.hireDate <= input.date ){ //Akkor szúrd be, ha régebben dolgozik itt
            const parameters = `'${user.id}','${input.date}','${input.type}','${editor}'`
            const getRegister = Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                response:"json",
                data:{mode:"fetchColumn",procedure:"getRegister",parameters:`'${user.id}','${input.date}'`}
            })
            getRegister == 0 ? 
                insertColumns(user.id, input.date, input.type, editor) 
                :
                updateColumns(user.id, input.date, input.type, editor) 
        }
    })
}