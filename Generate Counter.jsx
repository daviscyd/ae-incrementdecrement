// required to use forEach
#include "C:\\Program Files\\Adobe\\Adobe After Effects 2020\\Support Files\\Scripts\\es5-shim.jsx"

var oLayers = app.project.activeItem.layers;
var oIC = app.project.items;

// create counter text layer with blank text field bc not in correct position yet
var oTL = oLayers.addText("");
var oTP = oTL.property("Source Text");
var oTD = oTP.value;
// format counter text layer
oTD.font = "MyriadPro-Cond";
oTD.fontSize = 24;
// move text to correct position
oTL.property("Position").expression = "transform.position = [10, 48];"

// initialize Ding/Gnid array variable
var oAVLayers = [];
// collect all Ding/Gnid audio layers.
for (var i = 1; i <= oLayers.length; i++){
    if (oLayers[i].hasAudio == true && oLayers[i].hasVideo == false){
    oAVLayers.push(oLayers[i]);
        }else{
            continue;
        }
    }

// initial display of text value, set to "0"
oTP.setValueAtTime(0, 0);

// initialize counter
var i = 0;

// start forEach
 oAVLayers.forEach(myFunction)

// increment/decrement heavy lifting done here
function myFunction(item, index, arr) {
if (arr[index].name == "ShinyDing.aiff") //audio trigger file
  {   i++ // for some stupid reason has to be done separate from setting property
      oTL.property("Source Text").setValueAtTime(arr[index].marker.keyTime(1), (new TextDocument(i)));}
else if (arr[index].name == "ShinyGnid.aiff") //audio trigger file
	{  i-- // same as i++, has to be done separately
        oTL.property("Source Text").setValueAtTime(arr[index].marker.keyTime(1), (new TextDocument(i)));}
}
