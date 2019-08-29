var n=0; //which file number it's on.
var str; //this variable saves the question

var ostr; //old string, keeps track of when the question changes so that it only downloads a new file when the question changes

var ins = []; //inputs (saves all the inputs in the list)
var ous = []; //outputs (saves all the outputs in the list)

var array = []; //temp array used for many purposes.
var an; //the answer

var ov=true; //old version

var re=false; //reverse, set this to true if reverse is selected on the list on EP.

var saven=1;
var saven2=0;
var sn2m=false; //save n 2 mode

var cc=false; //can click;

var learnt=false;

var bad=false;

var bt=0;
var btm=8;

var track=0;
var over=100;

var mt=30;

var wait=true;
var wait2=true;

function run() { //this run's every 0.5 seconds
	/*try {
		if(document.getElementsByClassName("clock-label ep-animate ng-binding")[0].innerText<mt-5) {
			if(wait) {
				wait=false;
				document.getElementById("hint-button").click();
			}
			else {
				wait=true;
				document.getElementsByClassName("nice-button light-grey  ng-scope")[0].click();
			}
		}
	}
	catch(err) {
		
	}*/

	try {
		document.getElementsByClassName("glyphicon glyphicon-remove")[0].click() //this is incase of cheers
	}
	catch(err) {
		
	}
		if(document.getElementsByClassName("back-action h-group nav-bar-button v-align-center ng-scope")[0]!=null && cc && document.getElementsByClassName("tutorials-navigator h-group ng-scope")[0]==null) {
			document.getElementsByClassName("back-action h-group nav-bar-button v-align-center ng-scope")[0].click();	
			cc=false;
		}
		else {
			if(document.getElementsByClassName("title h-group v-align-center fill").length==1 && !ov) {
				document.getElementsByClassName("section")[0].children[saven].click();
				saven2=0;
				saven++;
			}
			else {
				if(document.getElementById("start-button-main-label")!=null && !learnt && !ov) {
					if(!sn2m) {
						document.getElementsByClassName("main-text ng-binding infinity")[0].click();
						saven2++;
						if(saven2>1) {
							document.getElementsByClassName("arrow right")[0].click();
							if(saven2>document.getElementsByClassName("tutorials-navigator h-group ng-scope")[0].children[0].children[3].innerText || document.getElementsByClassName("tutorials-navigator h-group ng-scope")[0].children[0].children[2].innerText!="of ") {
								document.getElementsByClassName("back-arrow ivu-icon ivu-icon-ios-arrow-back")[0].click();
							}
						}
						sn2m=true;
					}
					else {
						while(!learnt) {
							for(var i=0; i<document.getElementsByClassName("preview-grid ng-isolate-scope")[0].children.length; i++) { //these for loops just fill up the inputs and outputs
								if(!ins.includes(document.getElementsByClassName("preview-grid ng-isolate-scope")[0].children[i].children[0].children[0].innerText)) {
									var temp=document.getElementsByClassName("preview-grid ng-isolate-scope")[0].children[i].children[0].children[0].innerText;
									if(!re) {
										array = temp.split(" (");
										temp=array[0]
									}
									array = temp.split(";");
									temp=array[0];
									ins.push(temp);
									
									temp=document.getElementsByClassName("preview-grid ng-isolate-scope")[0].children[i].children[0].children[1].innerText;
									if(re) {
										temp = temp.replace(/,/g, ";");
									}
									ous.push(temp);
								}
								else  {
									console.log("done "+ins[0]);
									learnt=true;
									sn2m=false;
									document.getElementById("start-button-main-label").click();					
								}
							}
						}
					}
					
				}
				else {
					if(document.getElementById("start-button-main-label")!=null) { //check if it's in the revision list section
						for(var i=0; i<document.getElementsByClassName("preview-grid ng-isolate-scope")[0].children.length; i++) { //these for loops just fill up the inputs and outputs
							if(!ins.includes(document.getElementsByClassName("preview-grid ng-isolate-scope")[0].children[i].children[0].children[0].innerText)) {
								var temp=document.getElementsByClassName("preview-grid ng-isolate-scope")[0].children[i].children[0].children[0].innerText;
								if(!re) {
									array = temp.split(" (");
									temp=array[0]
								}
								array = temp.split(";");
								temp=array[0];
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
						if(document.getElementById("continue-button").innerText=="Next question") {
							//bad=true;
							if(wait2) {
								wait2=false;
								for(var i=0; i<ins.length; i++) {
									if(ins[i]==str) {//document.getElementsByClassName("field native-font")[0].innerText) {
										ous[i]=document.getElementById("correct-answer-field").innerText;
									}
								}
							}
							else {
								wait2=true;
								document.getElementById("continue-button").click();
							}
							bt++;
						}
						else {
							str=document.getElementById("question-text").innerText;		
							
							/*if(str.includes(",") || str.includes("(")) {
								str=document.getElementById("question-text").children[0].innerText;		
							}*/
							
							if(!re) { //if it's not in reverse then it may have a something like "(Starts with 'a')" or something like that so it get's rid of it so that it gets the correct output. Incase it actually does have a bracket it does the same to the actual imput at the top.
								array = str.split(" (");
								str=array[0];
								array = str.split(",");
								str = array[0];
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
								mt=document.getElementsByClassName("clock-label ep-animate ng-binding")[0].innerText;
								
								var text = an+"",
								blob = new Blob([text], { type: 'text/plain' }),
								anchor = document.createElement('a');

								anchor.download = n+".txt"; //making the file
								anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
								anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
								anchor.click();
								
								n++; //updates n
								track++;
							}
							
							ostr=str; //updating the old string
							
							
						if(!ov && (document.getElementsByClassName("exit-button text-link-button ng-scope")[0]!=null || bad || track>100 || bt>btm)) {
								learnt=false;
								document.getElementsByClassName("nav-bar-exit")[0].click()
								track=0;
								bt=0;
								cc=true;
								bad=false;
							}
						}
					}
				}
			}
		}
}


window.setInterval(function(){
  run();  
}, 100);
