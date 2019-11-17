var oLayers = app.project.activeItem.layers;
var oIC = app.project.items;

var oAVLayers = [];
for (var i = 1; i <= oLayers.length; i++){
    if (oLayers[i].hasAudio == true && oLayers[i].hasVideo == false){
    oAVLayers.push(oLayers[i]);
        }else if (oLayers[i].matchName == "ADBE Text Layer"){
            var oTxt = oLayers[1];
        }
    }

oTxt.property("Source Text").setValueAtTime(0, 0);

for (var i = 0; i < oAVLayers.length; i++){
    if (oAVLayers[i].name == "Gnid"){
         oTxt.property("Source Text").setValueAtTime(oAVLayers[i].marker.keyTime(1), (new TextDocument(i-1)));}
     else{
    oTxt.property("Source Text").setValueAtTime(oAVLayers[i].marker.keyTime(1), (new TextDocument(i + 1)));}
     }
$.writeln(oTxt.property("Source Text").numKeys);