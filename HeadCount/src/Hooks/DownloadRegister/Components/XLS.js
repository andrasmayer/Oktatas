const {Ajax} = await import(`../../Ajax/Ajax.js${app_version}`)
const {calendar,dateFormat} = await import(`../../Date/Date.js${app_version}`)

const {saveAs } = await import(`../../../../vendor/excelJS/FileSaver.min.js${app_version}`)
window.saveAs = saveAs

let totalTab = {}

const jsonToCsv = (jsonData) => {
    let csv = ''
    const headers = Object.keys(jsonData[0])
    csv += headers.join(';') + '\n'
    jsonData.forEach(obj => {
        const values = headers.map(header => obj[header])
        csv += values.join(';') + '\n'
    })
    return csv
}
export const XLS = (obj) =>{  

    const toOutput = []
    let counter = 0
    let startTime
    const source = []

    obj.emps.forEach(itm=>{
        let sickDayCounter = 0
        const tmpEmp = itm
        startTime = 8
        const emp = itm
        const dataSet = Ajax({
            url:"./server/Procedures/Fetch.php",
            method:"post",
            response:"json",
            data:{mode:"fetch_unique",procedure:"loadRegister",parameters:`'${itm.id}','${obj.date.year}','${obj.date.month}'`}
        })

        let sickDaysThisMonth = 0;
        Object.keys(dataSet).forEach(day=>{
            if(dataSet[day].type == 3){
                sickDaysThisMonth++
            }
            
        })
        const locations = [itm.locationName]
        if(emp.location2 != null){
            locations.push(itm.locationName2)
        }
        
        locations.forEach((location,key)=>{ 
            const Time = emp.labourTime[key]
            toOutput.push({"Név":itm.username, "Telephely":location, "Munkaidő":Time})
            Object.keys(obj.calendar).forEach(itm=>{
                const date = obj.calendar[itm].date
                const dayName = obj.calendar[itm].dayName
                const dayOfWeek = obj.calendar[itm].dayOfWeek
                const day = `${obj.calendar[itm].day} ${obj.calendar[itm].dayName}` 


                if(emp.maternityLeave == 0){
                    if( [6,0].includes(dayOfWeek) &&   
                        ( dataSet[date] == null || dataSet[date].type == 0)
                    ){
                        toOutput[counter][day] = "H"
                    }
                    else if( dataSet[date] != null  && dataSet[date].type > 1 ){


                        if(dataSet[date].type == 3){
                            sickDayCounter++

                            if(//tmpEmp.sickDaysTillDate > 15 ||
                                (tmpEmp.sickDaysTillDate -15 + sickDayCounter) > 15
                            ){
                                toOutput[counter][day] = "Táppénz"
                            }
                            else{
                                toOutput[counter][day] = "Betegség"
                            }
                        }
                        else{
                           
                            const tmp = parseInt(dataSet[date].type)
                            const type =  [2,6].includes(tmp) ? "Szabadság" : obj.stats[tmp]
                            toOutput[counter][day] = type
                        }
                    }
                    else if(dataSet[date] != null){
                        toOutput[counter][day] = `${startTime}:00 - ${parseInt(startTime) + parseInt(Time)}:00`
                    }
                    else{
                        toOutput[counter][day] = ""
                    }
                }
                else{
                    if( [6,0].includes(dayOfWeek) ){
                        toOutput[counter][day] = "H"
                    }
                    else{
                        toOutput[counter][day] = "Szülési szabadság"
                    }

                }
            })
            startTime += parseInt(Time)
            counter++
        })            
    })

   

  

    const csvData = jsonToCsv(toOutput);
    generateExcelFromCSV(csvData, obj.date.year, obj.date.month, true, obj.workbook)


}



























export const XLS_Year = async (obj) => {
  const downloadStatus = document.querySelector("downloadStatus");

  const curMonth = new Date().getMonth() + 1;

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  for (let i = 1; i <= curMonth; i++) {
    const firstDayOfMonth = `${obj.date.year}-${i < 10 ? `0${i}` : i}-01`;
    obj.calendar = calendar({ lang: obj.lang, date: firstDayOfMonth });

    const toOutput = [];
    let counter = 0;
    let startTime;
    const source = [];

    for (const itm of obj.emps) {
      let sickDayCounter = 0;
      const tmpEmp = itm;
      startTime = 8;
      const emp = itm;
      const dataSet = Ajax({
        url: "./server/Procedures/Fetch.php",
        method: "post",
        response: "json",
        data: { mode: "fetch_unique", procedure: "loadRegister", parameters: `'${itm.id}','${obj.year}','${i}'` }
      });

      let sickDaysThisMonth = 0;
      Object.keys(dataSet).forEach(day => {
        if (dataSet[day].type == 3) {
          sickDaysThisMonth++;
        }
      });
      const locations = [itm.locationName];
      if (emp.location2 != null) {
        locations.push(itm.locationName2);
      }

      locations.forEach((location, key) => {
        const Time = emp.labourTime[key];
        toOutput.push({ "Név": itm.username, "Telephely": location, "Munkaidő": Time });
        Object.keys(obj.calendar).forEach(itm => {
          const date = obj.calendar[itm].date;
          const dayName = obj.calendar[itm].dayName;
          const dayOfWeek = obj.calendar[itm].dayOfWeek;
          const day = `${obj.calendar[itm].day} ${obj.calendar[itm].dayName}`;

          if (emp.maternityLeave == 0) {
            if ([6, 0].includes(dayOfWeek) &&
              (dataSet[date] == null || dataSet[date].type == 0)
            ) {
              toOutput[counter][day] = "H";
            } else if (dataSet[date] != null && dataSet[date].type > 1) {
              if (dataSet[date].type == 3) {
                sickDayCounter++;

                if ((tmpEmp.sickDaysTillDate - 15 + sickDayCounter) > 15) {
                  toOutput[counter][day] = "Táppénz";
                } else {
                  toOutput[counter][day] = "Betegség";
                }
              } else {
                const tmp = parseInt(dataSet[date].type);
                const type = [2, 6].includes(tmp) ? "Szabadság" : obj.stats[tmp];
                toOutput[counter][day] = type;
              }
            } else if (dataSet[date] != null) {
              toOutput[counter][day] = `${startTime}:00 - ${parseInt(startTime) + parseInt(Time)}:00`;
            } else {
              toOutput[counter][day] = "";
            }
          } else {
            if ([6, 0].includes(dayOfWeek)) {
              toOutput[counter][day] = "H";
            } else {
              toOutput[counter][day] = "Szülési szabadság";
            }
          }
        });
        startTime += parseInt(Time);
        counter++;
      });
    }

    downloadStatus.textContent = Math.round(i / curMonth * 100) + "%";

    await delay(50);

    const csvData = jsonToCsv(toOutput);

    generateExcelFromCSV(csvData, obj.date.year, i, i == curMonth, obj.workbook);
  }
};





























function csvToArray(csv, delimiter = ";") {
  return csv
    .trim()
    .split("\n")
    .map(row => row.split(delimiter));
}

async function generateExcelFromCSV(csv, year, month, print, workbook) {
  let worksheet = workbook.addWorksheet(`Munkaidő ${year}_${month}`);

  const data = csvToArray(csv, ";"); // delimiter átállítva

  // A többi marad változatlan...
  const headerRow = data[0];
  worksheet.columns = headerRow.map((h) => ({ header: h, key: h }));
  worksheet.views = [
    { state: 'frozen', ySplit: 1,xSplit: 1,  }
    ]

  headerRow.forEach((_, colIndex) => {
    const cell = worksheet.getCell(1, colIndex + 1);
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF0373FC' }, // kék háttér (#0373fc)
    };
    cell.font = {
      color: { argb: 'FFFFFFFF' }, // fehér betű
      bold: true,
    };
  });





  for (let i = 1; i < data.length; i++) {
    const rowData = data[i];
    const row = worksheet.addRow(rowData);

    row.eachCell({ includeEmpty: true }, (cell) => {
      if (typeof cell.value === "string" && cell.value.includes("Táppénz")) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "70030c" },
        };
        cell.font = {
          color: { argb: "FFFFFFFF" },
          bold: true,
        };
      }
      else if (typeof cell.value === "string" && cell.value.includes("Szabadság")) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "f5e133" },
        };
   
      }
      else if (typeof cell.value === "string" && cell.value.includes("Betegség")) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "e6303f" },
        };
        cell.font = {
          color: { argb: "FFFFFFFF" },
          bold: true,
        };
      }
      else if (typeof cell.value === "string" && cell.value.includes("Szülési szabadság")) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "f533c5" },
        };

      }


    })
  }

  if(print == true){
    let curWorkSheet = null
    workbook.eachSheet((worksheet) => {
        worksheet.eachRow((row, rowNumber) => {
            if(rowNumber > 1){
                const name = row._cells[0]._value.model.value
                if(totalTab[name] == null){
                    totalTab[name] =  {Szabadság:0, "Szülési szabadság":0, Táppénz:0, Betegség:0, Munkaidő: 0  }
                }

                row.eachCell((cell, colNumber) => {
                    if(curWorkSheet != worksheet._name){ //Duplikátumok kihagyása
                        if( colNumber > 3){
                            const val = cell.value
                            if(val.includes("-")){
                                totalTab[name]["Munkaidő"]++
                            }
                            else if(val.includes("-") == false && val != "" && val != "H"){
                                totalTab[name][val]++
                            }
                        }
                    }
                })
            }
        })
        curWorkSheet = worksheet._name
    })
    const summaryData = totalTab
    const headers = ['Név', 'Szabadság', 'Szülési szabadság', 'Táppénz', 'Betegség', 'Munkaidő'];

    const summarySheet = workbook.addWorksheet('Összegzés');

    summarySheet.views = [
        { state: 'frozen', ySplit: 1,xSplit: 1,  }
        ]

    const headerRow = summarySheet.addRow(headers);
    headerRow.eachCell((cell) => {
    cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF0373FC' }
    }
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } }; // opcionális: félkövér betű
    })

    // adatok hozzáadása
    for (const name in summaryData) {
    const row = [
        name,
        summaryData[name]['Szabadság'] || 0,
        summaryData[name]['Szülési szabadság'] || 0,
        summaryData[name]['Táppénz'] || 0,
        summaryData[name]['Betegség'] || 0,
        summaryData[name]['Munkaidő'] || 0,
    ];
    summarySheet.addRow(row);
    }



    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    window.saveAs(blob, "Munkaidő.xlsx");
  }

}

