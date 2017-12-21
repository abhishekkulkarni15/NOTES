function initializeApplication(){
	fetchAllLabels();
	fetchAllNotes();
}

function fetchAllLabels(){
	var labels = JSON.parse(localStorage.getItem("labels"));
	var labelId = document.getElementById("labels");
	labelId.innerHTML = "";
	for(var i=0;i<labels.length;i++){
		if(labels[i] === "All"){
			labelId.innerHTML+='<button type="button" class="btn btn-link" onclick="getThisLabelItems()" style="border-radius:0px;">'+labels[i]+'</button><br>';
		} else{
			labelId.innerHTML+='<button type="button" class="btn btn-link" onclick="getThisLabelItems()" style="border-radius:0px;">'+labels[i]+'</button>'+
			'<button style="border-radius:0px;" onclick=deleteLabel("'+labels[i]+'") class="btn btn-link btn-sm">X</button><br>';
		}
	}
}

function createNewLabel(){
	var newLabelName = document.getElementById("newLabelName").value;
	if(localStorage.getItem("labels") === null){
		var labels = [];
		labels.push(newLabelName);
		localStorage.setItem("labels",JSON.stringify(labels));
	} else{
		var labels = JSON.parse(localStorage.getItem("labels"));
		labels.push(newLabelName);
		localStorage.setItem("labels",JSON.stringify(labels));
	}
	initializeApplication();
}

function deleteLabel(labelName){
	if(localStorage.getItem("labels") === null){
	} else{
		var labels = JSON.parse(localStorage.getItem("labels"));
		for(var i=0;i<labels.length;i++){
			if(labels[i] === labelName){
				labels.splice(i,1);
			}
		}
		localStorage.setItem("labels",JSON.stringify(labels));
	}
	initializeApplication();
}

function loadDropDownLabels(){
	var labelDropDown = document.getElementById("itemDropDown");
	var labels = JSON.parse(localStorage.getItem("labels"));
	labelDropDown.innerHTML = "";
	for(var i=0;i<labels.length;i++){
		labelDropDown.innerHTML+='<option value="'+labels[i]+'">'+labels[i]+'</option>';
	}
}

function addNote(noteType){
	var title = document.getElementById("itemTitle").value;
	var description = "";
	var label= "All";

	if(noteType==="full"){
		title = document.getElementById("itemTitleFull").value;
		description = document.getElementById("itemDescription").value;
		label = document.getElementById("itemDropDown").value;
	}

	var note = {
		noteTitle: title,
		noteDescription: description,
		noteLabel: label
	}

	if(localStorage.getItem("notes") === null) {
		var notes= [];
		notes.push(note);
		localStorage.setItem("notes",JSON.stringify(notes));
	} else {
		var notes = JSON.parse(localStorage.getItem("notes"));
		notes.push(note);
		localStorage.setItem("notes",JSON.stringify(notes));
	}
	initializeApplication();
	document.getElementById("itemTitle").value="";
	document.getElementById("itemTitle").focus();
}

function fetchAllNotes(){
	var displayAllNotes = document.getElementById("notes");
	displayAllNotes.innerHTML="";
	displayAllNotes.innerHTML= '<br>';
	if(localStorage.getItem("notes") === null){
	} else{
		var notes = JSON.parse(localStorage.getItem("notes"));
		for(var i=0;i<notes.length;i++){
			displayAllNotes.innerHTML+= '<div align="center"><b>'+notes[i].noteTitle+'</b><i>'+notes[i].noteLabel+'</i><br>'+notes[i].noteDescription+'<br>'+
			'<button class="btn btn-link" onclick=deleteNote("'+notes[i].noteTitle+'")>delete</button></div><hr>';
		}
	}
}

function deleteNote(noteTitle){
	var notes = JSON.parse(localStorage.getItem("notes"));
	for(var i=0;i<notes.length;i++){
		if(notes[i].noteTitle === noteTitle){
			notes.splice(i,1);
		}
	localStorage.setItem("notes",JSON.stringify(notes));
	}
	initializeApplication();
}