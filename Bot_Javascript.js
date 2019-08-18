var n=0; //which file number it's on.
var str; //this variable saves the question

var ostr; //old string, keeps track of when the question changes so that it only downloads a new file when the question changes

var ins = []; //inputs (saves all the inputs in the list)
var ous = []; //outputs (saves all the outputs in the list)

var array = []; //temp array used for many purposes.
var an; //the answer

var re=false; //reverse, set this to true if reverse is selected on the list on EP.

function run() { //this run's every 0.5 seconds
	if(document.getElementById("start-button-main-label")!=null) { //check if it's in the revision list section
		for(var i=0; i<document.getElementsByClassName("preview-grid ng-isolate-scope")[0].children.length; i++) { //these for loops just fill up the inputs and outputs
			if(!ins.includes(document.getElementsByClassName("preview-grid ng-isolate-scope")[0].children[i].children[0].children[0].innerText)) {
				var temp=document.getElementsByClassName("preview-grid ng-isolate-scope")[0].children[i].children[0].children[0].innerText;
				if(!re) {
					array = temp.split(" (");
					temp=array[0]
				}
				ins.push(temp);
				
				temp=document.getElementsByClassName("preview-grid ng-isolate-scope")[0].children[i].children[0].children[1].innerText;
				if(re) {
					temp = temp.replace(/,/g, ";");
				}
				ous.push(temp);
			}
			else  {
				console.log("done "+ins[0]);
			}
		}
	}
	else { //it's not in the revision so it must be in the actual quiz
		str=document.getElementById("question-text").innerText;		
		
		if(!re) { //if it's not in reverse then it may have a something like "(Starts with 'a')" or something like that so it get's rid of it so that it gets the correct output. Incase it actually does have a bracket it does the same to the actual imput at the top.
			array = str.split(" (");
			str=array[0];
		}
		else {
			str = str.replace(/,/g, ";"); //if it is in reverse then it may have a "," in the question but in the actual input it says it's a ";"
		}
		
		for(var i=0; i<ins.length; i++) { //goes through to find what the output is.
			if(re) { //if it's in reverse then it swaps it around
				if(ous[i]==str) {
					an=ins[i]
				}
			}
			else {
				if(ins[i]==str) {
					an=ous[i]
				}
			}
		}
		
		array = an.split(";"); //makes it so it only types in one answer
		an=array[0];
		
		console.log(an) //just for de-bugging the bot
		
		if(str!=ostr) { //making sure the question is different so it doesn't send like 100 files.
			var text = an+"",
			blob = new Blob([text], { type: 'text/plain' }),
			anchor = document.createElement('a');

			anchor.download = n+".txt"; //making the file
			anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
			anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
			anchor.click();
			
			n++; //updates n
		}
		
		ostr=str; //updating the old string
	}
}


window.setInterval(function(){
  run();  
}, 500);
