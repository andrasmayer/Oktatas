
const jQuery = await import(`../../../vendor/OrgChart-master/node_modules/jquery/dist/jquery.js${app_version}`)
const orgChart = await import(`../../../vendor/OrgChart-master/src/js/jquery.orgchart.js${app_version}`)
const {Ajax} = await import(`../../Hooks/Ajax/Ajax.js${app_version}`)



export class OrgChart{
    constructor(props){
        this.props = props
        //this.dataSet =  Ajax({url:"./server/OrgChart/OrgChart.php",method:"post",response:"json"}) 
        this.dataSet =  Ajax({url:"./server/OrgChart/test.php",method:"post",response:"json"}) 
        console.log( this.dataSet)
    }
    init(){
        return `
            <div>
                  <div id="chart-container"></div>

                  <link rel="stylesheet" href="./vendor/OrgChart-master/src/css/style.css${app_version}">
                  <link rel="stylesheet" href="./vendor/OrgChart-master/src/css/jquery.orgchart.css${app_version}">
            </div>
            <style>
            #chart-container{ border:none; height:90vh; background: #ccc;}
                .orgchart { background: #ccc;}
                .orgchart td.left, .orgchart td.right, .orgchart td.top { border-color: #aaa; }
                .orgchart td>.down { background-color: #aaa; }

                .orgchart .content{
                    border:none !important;
                }

                .Ceo{ margin-top:-175px !important;}
                .orgchart .Ceo .title { background-color: #9c5236; }
                .orgchart .Terep .title { background-color: #419c55; }
                .orgchart .Backoffice  .title{ background-color: #217fd1; }
                .orgchart .Restaurátorműhely  .title{ background-color: #bd0420; }
                .orgchart .GIS  .title{ background-color: #07b0aa; }
            </style>
   
            `
    }
    events(){
       
            $('#chart-container').orgchart({
              'data' : this.dataSet ,
              'pan': true,
        
              'visibleLevel': 2,
              'nodeContent': 'title',
              'direction': 'r2l'
              
            });
  

    }
}