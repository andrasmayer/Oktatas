const {Ajax} = await import(`../../../../Hooks/Ajax/Ajax.js${app_version}`)
const {events} = await import(`./Components/events.js${app_version}`)
const {Panel} = await import(`./Components/Panel.js${app_version}`)
const {List} = await import(`./Components/List.js${app_version}`)
export const searchEmp = (emp, lang, isList, props) =>{
    const empDatas = Ajax({
        url:"./server/Procedures/Fetch.php",
        method:"post",
        response:"json",
        data:{mode:"fetchAll",procedure:"searchEmp",parameters:`'${emp}'`}
    })
    isList === false ? Panel(empDatas,lang,isList,props.loggedUser) : List(empDatas, lang, isList, props)
    events(lang,isList)
}