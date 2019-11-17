// required to use forEach
#include "C:\\Program Files\\Adobe\\Adobe After Effects 2020\\Support Files\\Scripts\\es5-shim.jsx"

var oLayers = app.project.activeItem.layers;
var oIC = app.project.items;

var oTL = oLayers.addText("");
var oTP = oTL.property("Source Text");
var oTD = oTP.value;

oTD.font = "MyriadPro-Cond";
oTD.fontSize = 24;

var oAVLayers = [];
for (var i = 1; i <= oLayers.length; i++){
    if (oLayers[i].hasAudio == true && oLayers[i].hasVideo == false){
    oAVLayers.push(oLayers[i]);
        }else{
            continue;
        }
    }

oTL.property("Position").expression = "transform.position = [10, 48];"

// initial counter value
oTP.setValueAtTime(0, 0);

// initialize counter
var i = 0;

// start forEach
 oAVLayers.forEach(myFunction)
// increment/decrement heavy lifting done here
function myFunction(item, index, arr) {
if (arr[index].name == "ShinyDing.aiff")
  {   i++
      oTL.property("Source Text").setValueAtTime(arr[index].marker.keyTime(1), (new TextDocument(i)));}
else if (arr[index].name == "ShinyGnid.aiff")
	{  i--
        oTL.property("Source Text").setValueAtTime(arr[index].marker.keyTime(1), (new TextDocument(i)));}
}
