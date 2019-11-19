// required to use forEach
#include "C:\\Program Files\\Adobe\\Adobe After Effects 2020\\Support Files\\Scripts\\es5-shim.jsx"

var oLayers = app.project.activeItem.layers;
var oIC = app.project.items;

// create counter text layer with blank text field bc not in correct position yet
var oCounter = oLayers.addText("");
// create caption text layer with blank text field because...not in position.
var oCaption = oLayers.addText("");
// setup counter vars
var oCounterText = oCounter.property("Source Text");
var oCounterDoc = oCounterText.value;
// setup caption vars
var oCaptionText = oCaption.property("Source Text");
var oCaptionDoc = oCaptionText.value;

// format counter and caption text layer
oCounterDoc.font = "MyriadPro-Cond";
oCounterDoc.fontSize = 80;
oCounterDoc.justification = ParagraphJustification.CENTER_JUSTIFY;
oCaptionDoc.font = "MyriadPro-Cond";
oCaptionDoc.fontSize = 70;
oCaptionDoc.justification = ParagraphJustification.CENTER_JUSTIFY;

// move counter/caption to correct position
oCounter.property("Position").expression = "transform.position = [291.1, 55.4];"
oCaption.property("Position").expression =  "transform.position = [291.1, 122.4];"


// initialize Ding/Gnid array variable
var oAVLayers = [];
// collect all Ding/Gnid audio layers.
for (var i = 1; i <= oLayers.length; i++){
    if (oLayers[i].hasAudio == true && (oLayers[i].name == "ShinyDing.aiff" || oLayers[i].name == "ShinyGnid.aiff" )){
    oAVLayers.push(oLayers[i]);
        }else{
            continue;
        }
    }

// initial display of text value, set to "0"
oCounterText.setValueAtTime(0, 0);
oCaptionText.setValue("Movie Sin Counter");
// initialize counter
var i = 0;

// start forEach
 oAVLayers.forEach(myFunction)

// increment/decrement heavy lifting done here
function myFunction(item, index, arr) {
if (arr[index].name == "ShinyDing.aiff" && arr[index].comment) {
      var multipleDing = arr[index].comment
      i = i + Number(multipleDing); //must change comment to number or concatenation happens
      oCounter.property("Source Text").setValueAtTime(arr[index].marker.keyTime(1), (new TextDocument(i)));}
   else if (arr[index].name == "ShinyDing.aiff") {
      i++; // for some stupid reason has to be done separate from setting property
      oCounter.property("Source Text").setValueAtTime(arr[index].marker.keyTime(1), (new TextDocument(i)));}
    else if(arr[index].name == "ShinyGnid.aiff"){
	    i--; // same as i++, has to be done separately
        oCounter.property("Source Text").setValueAtTime(arr[index].marker.keyTime(1), (new TextDocument(i)));}
