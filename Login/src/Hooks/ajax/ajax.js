export const ajax = (callType,url,dataType,dataSet) =>{
    const type = dataType === "json" ? "responseJSON" : "responseText"
	return $.ajax({ async: false, type: callType, url: url, data:dataSet, dataType:dataType ,
        success: function (response) { return response }	
	})[type]
}