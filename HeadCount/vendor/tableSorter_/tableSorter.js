export class tableSorter {
	constructor(obj){
		this.obj = obj;
		this.cols = []
		this.sort = {orderBy:0, way:"asc", lastOrder:[0,0]}
console.log( JSON.stringify(this.obj.dataSet) )
		Object.keys(this.obj.dataSet[0]).forEach(itm=>{
			this.cols.push(itm)
		})

		this.table =  document.createElement("table")
		this.table.setAttribute("id",obj.tableId)
		this.table.classList.add("tableSorter")
		this.thead = document.createElement("thead")
		this.tbody = document.createElement("tbody")
		const tr = document.createElement("tr")

		obj.header.forEach((headerText, index) => {
			const th = document.createElement("th")
			th.innerHTML = `${headerText} <i class="sorterIcon"></i>`
			th.setAttribute("data",`cell_${index}`)
			tr.appendChild(th)
		})

		this.thead.appendChild(tr)
		this.table.appendChild(this.thead)
		this.table.appendChild(this.tbody)
		document.querySelector(obj.target).appendChild(this.table)

		let wrapper =  document.createElement("div");
		wrapper.classList.add("wrapper");
		wrapper.append(this.table);
		document.body.appendChild(wrapper);
	
		this.th	=	this.thead.getElementsByTagName("th");
		this.columnsToShow	=	[];
		this.currentPage	=	0;
		this.pageLength	=	10;
		this.columns	=	[];
		this.conditions		=	{};	
		
		this.drawFooter()
		this.drawRows()
		this.controls()
		this.sorting()
	}
	drawFooter(){
	    const columns	=	this.columns;
		const conditions	=	this.conditions;
		const columnsToShow	=	this.columnsToShow;
		const footer = this.table.createTFoot();
		const row = footer.insertRow(0);
		
		for(let i=0;i<this.th.length;i++){
			columnsToShow.push(	this.th[i].getAttribute("data")	);
			const cell = row.insertCell();
		
			if(	this.obj.filters.includes(i)	){
				cell.innerHTML = `<input class="form-control" data-index="${this.columnsToShow[i]}" placeholder="...">`;
				cell.addEventListener("keyup",  (e) => {
					this.drawRows(event)
					this.controls()
				});
			}
		}

		this.obj.filters.forEach(function(v){
			columns.push(columnsToShow[v])
			conditions[`cell_${v}`]	=	""
		})
	}
	filter	=	function(e){
		let status_ = this.status_
		let conditions = this.conditions
		
		if(e != null){
			let value	=	e.target.value
			let index	=	e.target.getAttribute("data-index")
			conditions[index]	=	value
		}

		const cols = this.cols
		
		this.result = this.obj.dataSet.filter(function(e){
			const status_ =	[]
			Object.keys(conditions).forEach(function(c,v){
				const value = conditions[c].toLowerCase()
				const cellIsNumber = /^\d+$/.test(e[cols[v]])

				if( cellIsNumber === true){
					if(  value.startsWith(">=")){
						const splitter = value.split(">=").join("")
						status_.push( e[cols[v]].toLowerCase().includes(splitter)	)
					}
					else if(  value.startsWith(">") ){
						const splitter = value.split(">").join("")
						status_.push( e[cols[v]].toLowerCase().includes(splitter)	)
					}
					else if(  value.startsWith("<=") ){
						const splitter = value.split("<=").join("")
						status_.push( parseInt(e[cols[v]]) <= splitter )
					}
					else if(  value.startsWith("<") ){
						const splitter = value.split("<").join("")
						status_.push( parseInt(e[cols[v]]) < splitter )
					}
				}
				else{
					status_.push(	e[cols[v]].toLowerCase().includes(value)	)
				}
			})		
			if(	status_.every(function(e){	return e	==	true	})	==	true){	return e	}
		})

		let splicedResult	=	[]
		let currentPage = this.currentPage
		let pageLength = parseInt(this.pageLength)

		this.result.forEach(function(e,key){
			if(key >=	(currentPage*pageLength) && key	<	(pageLength*currentPage)+pageLength){	splicedResult.push(e)	}
		})
		return splicedResult;
	}	
	drawRows(e){
		let value=null;
		if(typeof e != "undefined"){	 value	=	e }

		let filteredData	=	this.filter(value)
		let columnsToShow = this.columnsToShow
		this.tbody.innerHTML	=	""
		const tbody = this.tbody

		filteredData.forEach(function(row,key){
			const tr = document.createElement("tr")
			Object.keys(row).forEach((cellKey, cellIndex)=>{
				const td = document.createElement("td")
				td.classList.add(`cell_${cellIndex}`)
				td.textContent = row[cellKey]
				tr.appendChild(td)
			})
			tbody.appendChild(tr)
		})

	}
	controls(){
		let dataTableControls	=	this.table.parentNode.querySelectorAll(".dataTableControls")
		
		if(dataTableControls.length	>	0){
			this.table.parentNode.querySelectorAll(".dataTableControls")[0].remove()
			this.table.parentNode.querySelectorAll(".pageLength")[0].remove()
		}
	
		let select = document.createElement("select")
		select.classList.add("pageLength")

		let option = document.createElement("option")
		option.setAttribute("value",10);	
		option.textContent	=	10
		select.append(option)
		
		let option2 = document.createElement("option")
		option2.setAttribute("value",25);
		option2.textContent	=	25
		option.addEventListener("click",  (event) => {		this.PageLength(event.target.value)	})
		select.append(option2)
		
		let option3 = document.createElement("option")
		option3.setAttribute("value",99999999);
		option3.textContent	=	"All";
		option.addEventListener("click",  (event) => {		this.PageLength(event.target.value)	})
		select.append(option3)
		
		this.table.parentNode.prepend(select)
		select.addEventListener("change",  (event) => {		this.PageLength(event.target.value)	})
	
		if(this.pageLength	==	25){	option2.setAttribute("selected",true)	}
		else if(this.pageLength	==	99999999){option3.setAttribute("selected",true)	}
		else{option.setAttribute("selected",true);}
	
		let div = document.createElement("div")
		div.classList.add("dataTableControls")

		for(	let i=0;i<Math.ceil(this.result.length/this.pageLength);	i++){
			let btn = document.createElement("Button")
			btn.textContent	=	(i+1)
			if(i	==	this.currentPage){	btn.classList.add("active") }
			btn.addEventListener("click",  (event) => {		this.Page(event.target.textContent-1)	})
			div.append(btn)
		}
	
		this.table.after(div)
	}
	sorting(){
		this.thead.querySelectorAll("th").forEach(itm=>{
			itm.addEventListener("click",()=>{
				document.querySelectorAll(".sorterIcon").forEach(icon=>{
					icon.innerHTML = ""
				})

				const cellIndex = parseInt( itm.getAttribute("data").split("cell_").join("") )

				if(this.sort.orderBy == cellIndex){
					if(this.sort.lastOrder[0] != this.sort.lastOrder[1]){
						this.sort.way = this.sort.way == "asc" ? "desc" : "asc"
					}
					else{
						this.sort.way = this.sort.way == "asc" ? "desc" : "asc"
					}
				}
				else{
					this.sort.way = "asc"
				}
				itm.querySelector(".sorterIcon").innerHTML = this.sort.way == "asc" ? "	&uarr;" : "&darr;"

				this.sort.orderBy =  cellIndex
				this.sort.lastOrder.shift()
				this.sort.lastOrder.push(cellIndex)

				const tempDataSet = []
				const dataLength = Object.keys(this.obj.dataSet).length
				for(let i=dataLength-1; i>=0; i-- ){
					tempDataSet.push(this.obj.dataSet[i])
				}
				this.obj.dataSet = tempDataSet
				this.drawRows()
				
			})
		})
	}
	PageLength	=	function(e){
		this.currentPage	=	0
		this.pageLength	=	e
		this.drawRows()
		this.controls()
	}
	Page =	function(e){
		this.currentPage	=	e
		this.drawRows()
		this.controls()
	}
}