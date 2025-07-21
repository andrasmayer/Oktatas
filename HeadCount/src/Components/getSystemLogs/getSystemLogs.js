const {tableSorter} = await import(`../../../vendor/tableSorter/dist/js/tableSorter.js${app_version}`)
const {Langs} = await import(`../../Components/Langs/Langs.js${app_version}`)
const {Ajax} = await import(`../../Hooks/Ajax/Ajax.js${app_version}`)
export class getSystemLogs{
    constructor(props){
        this.Lang = Langs[props.langCode]["views"]["#SystemLogs"]
        this.props = props
        this.dataSet = {data:[], header:[]}
    }
    css(){
        return `<link rel="stylesheet" href="./vendor/tableSorter/dist/css/tableSorter.css?version=${app_version}">`
    }
    get(){

        if(this.props.table == "users"){
            
            const dataSet = Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                response:"json",
                data:{mode:"fetchAll",procedure:"adminUserLogs",parameters:`'${this.props.id}'`}
            })
            dataSet.forEach(row=>{
                if(row.columnName == "active"){ 
                    row.value_original = row.value_original == 0 ? this.Lang.inactive : this.Lang.active  
                    row.value_new = row.value_new == 0 ? this.Lang.inactive  : this.Lang.active 
                }
                
                const Lang = this.lang
                row.columnName = this.Lang[row.columnName]

                this.dataSet.data.push(row)
                this.dataSet.header = [this.Lang.changed, this.Lang.changedFrom, this.Lang.changedTo, this.Lang.changedWhen]

            })
        }

    }
    grid(){
        if( this.dataSet.data.length > 0 ){
            const table = new tableSorter({
                target:this.props.target,
                tableId:this.props.table,
                header:this.dataSet.header,
                dataSet:this.dataSet.data,
                filters:true,
                striped:true
            })
        }
            
     
    }
}