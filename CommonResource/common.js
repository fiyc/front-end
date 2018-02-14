function OpenDetail(item){
	var detailDiv = $(item).parent().find(".detail");
	var contentUrl = "toolsView/" + $(item).attr("ref-view");
	detailDiv.load(contentUrl);
	detailDiv.removeClass("hidden");
	$(item).attr("onclick", "CloseDetail(this)");
}

function CloseDetail(item){
	var detailDiv = $(item).parent().find(".detail");
	detailDiv.addClass("hidden");
	$(item).attr("onclick", "OpenDetail(this)");
}


$(function(){

	$.fn.SaveHtml = function(){

		var file;
		var fso = new ActiveXObject("Scripting.FileSystemObject"); 
		 if(!fso.FolderExists("d:\\trace")) { 
                fso.CreateFolder("d:\\trace"); 
        } 

        var d=new Date(); 
        var fname = "d:\\trace\\mispos"+d.toLocaleDateString()+".txt"; 
        if(fso.FileExists(fname)) { 
            file = fso.OpenTextFile(fname,8); 
        }else{ 
            file = fso.CreateTextFile(fname); 
        } 

        file.Write($(this).html());
        file.Close();

	}
});

