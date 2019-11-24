// This After Effects script uses specifically named audio files (and a marker on one said file) to 
// increment or decrement a counter based on either 
// a)  the name of the audio file
// b)  the name of the file and a number in the marker comment on the file.
//  The location of the counter is arbitrary and can be adjusted

// required to use forEach in script because Adobe won't update their JS standard!
#include "C:\\Program Files\\Adobe\\Adobe After Effects 2020\\Support Files\\Scripts\\es5-shim.jsx"

var oLayers = app.project.activeItem.layers;
//var oIC = app.project.items;

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


// initialize Ding/Gnid/MultiDing array variable
// this will be the bucket for all Dings/Gnids/MultiDings
var oAVLayers = [];
// iterate through all of the composition layers, looking for audio files with specific names
for (var i = 1; i <= oLayers.length; i++){
    if (oLayers[i].hasAudio == true && (oLayers[i].name == "ShinyDing.aiff" || oLayers[i].name == "ShinyGnid.aiff" || oLayers[i].name == "ShinyMultiDing.aiff")){
        // add the audio files to the oAVLayers array
        oAVLayers.push(oLayers[i]); 
        }else{
            // if the audio file doesn't have the correct name, go back to the beginning
            continue;
        }
    }

// initialize display of text value, set to "0"
oCounterText.setValueAtTime(0, 0);
// initialize display of caption with the correct text
oCaptionText.setValue("Movie Sin Counter");

// initialize counter
var i = 0;
// start forEach iteration that will increment/decrement counter
 oAVLayers.forEach(myFunction)

// increment/decrement heavy lifting done here
function myFunction(item, index, arr) {
 // if multiple dings occur
if (arr[index].name == "ShinyMultiDing.aiff" && arr[index].property("Marker").value.comment) {
     // when marker is brought over in PPro this is the location. 
     // pull marker comment and assign to variable
      var multipleDing = arr[index].property("Marker").value.comment; 
      // convert marker comment to number and add to i
      i = i + Number(multipleDing);
      // increment the visible counter
      oCounter.property("Source Text").setValueAtTime(arr[index].marker.keyTime(1), (new TextDocument(i)));}
   // if  a single Ding occurs
   else if (arr[index].name == "ShinyDing.aiff") {
       // for some stupid reason increment has to be done separate from setting property
      i++;
      // after increment, assign new value to visible counter
      oCounter.property("Source Text").setValueAtTime(arr[index].marker.keyTime(1), (new TextDocument(i)));}
  // if a single Gnid occurs
    else if(arr[index].name == "ShinyGnid.aiff"){
         // same as i++, has to be done separately
	    i--;
        // assign new counter value to visible display
        oCounter.property("Source Text").setValueAtTime(arr[index].marker.keyTime(1), (new TextDocument(i)));}
}
