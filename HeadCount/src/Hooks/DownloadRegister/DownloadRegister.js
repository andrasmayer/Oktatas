const {PDF} = await import(`./Components/PDF.js${app_version}`)
const {XLS, XLS_Year} = await import(`./Components/XLS.js${app_version}`)
const {Langs} = await import(`../../Components/Langs/Langs.js${app_version}`)
const {$_GET} = await import(`../$_GET/$_GET.js${app_version}`)
const {Ajax} = await import(`../Ajax/Ajax.js${app_version}`)
const {calendar,dateFormat} = await import(`../Date/Date.js${app_version}`)
const {excelJS} = await import(`../../../vendor/excelJS/excelJS.js${app_version}`)
const curDate = new Date()


export class DownloadRegister{
    constructor(lang){
        
        this.year = $_GET().year == null ? curDate.getFullYear() : $_GET().year
        this.output = ""
        const dayContext = Langs[lang]["views"]["#home"]

        this.stats = [dayContext.null, dayContext.work, dayContext.hDay,  dayContext.sick,
            dayContext.nonPaid,  dayContext.paidHolyDay,  dayContext.mandatoryHoliday, dayContext.restDay ]
        this.lang = lang
            
        let date
        if( $_GET().year == null &&  $_GET().month == null){
            date = new Date()
        }
        else{
            date = new Date(`${$_GET().year}-${$_GET().month}-01`)
        }
        this.date = dateFormat( date )

        let condition
        if( $_GET().emp == null ){ condition = "" } //Mindenkit listáz
        else{                                       //Csak a keresett dolgozót
            condition = Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                response:"json",
                data:{mode:"fetch",procedure:"getUserData",parameters:`'${$_GET().emp}'`}
            }).userName
        }
        this.emps = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetchAll",procedure:"searchEmp",parameters:`'${condition}'`}
        }).filter(itm=>{
            return itm.active == 1
        })

        
        const emps = this.emps
        emps.forEach((emp,key) => {
            const sickDaysTillDate = Ajax({
                url:"./server/Procedures/Fetch.php",
                method:"post",
                response:"json",
                data:{mode:"fetchColumn",procedure:"checkEmpSickDays",parameters:
                    `'${emp.id}',
                    '${$_GET().year == null ? curDate.getFullYear() : $_GET().year}',
                    '${$_GET().month == null ? curDate.getMonth() + 1 : $_GET().month}'
                `
            }
            })
            this.emps[key].sickDaysTillDate = sickDaysTillDate
        })

       // console.log(this.emps)
        this.calendar = calendar({lang:this.lang,date:this.date.date})
    }





    init(){
        let isPDF = false
        if( $_GET().type == null || $_GET().type == "pdf"){
            isPDF = true
        }
        else{
            isPDF = false
        }

        this.pdf = PDF(this)
        return `
        <div class="p-2">
            <downloadStatus class="position-fixed top-1 end-0 p-3 h1"></downloadStatus>
            <button class="print btn btn-info">Print</button>
            <i role="button" class="csv fa fa-download btn btn-outline-success"> XLSX</i>
            <i role="button" class="csvAll fa fa-download btn btn-outline-success"> XLSX (${$_GET().year == null ? curDate.getFullYear() : $_GET().year})</i>
            ${this.pdf}
        </div>`
    }
    events(){
        const print = document.querySelector(".print")
        const pdf = document.querySelectorAll(".pdf")
        print.addEventListener("click",()=>{
            let divContents = pdf[0].innerHTML;
            let printWindow = window.open();
            printWindow.document.open();
            printWindow.document.write(`
                <html>
                    <head>
                        <link href="./vendor/bootstrap-5.0.2-dist/css/bootstrap.min.css" rel="stylesheet">
                        <link href="./vendor/fontawesome-free-6.5.1-web/css/fontawesome.css" rel="stylesheet">
                        <link href="./vendor/fontawesome-free-6.5.1-web/css/solid.css" rel="stylesheet">
                        <link href="./src/Css/planner.css?v0.3" rel="stylesheet">
                    </head>
                <body>${this.pdf}</body>
                </html>
            `);

            setTimeout(() => {
                printWindow.print("","","250","250");
                printWindow.document.close();
            }, "1000");
        })
        const csv = document.querySelector(".csv")
        csv.addEventListener("click",()=>{
            this.workbook = new ExcelJS.Workbook()
            XLS(this)
        })


        const csvAll = document.querySelector(".csvAll")
        csvAll.addEventListener("click",()=>{
            this.workbook = new ExcelJS.Workbook()
            XLS_Year(this)
        })


    }
}