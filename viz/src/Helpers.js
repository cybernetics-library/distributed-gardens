var Helpers = {}

Helpers.getBadgeIdFromUrl = (thisurl) => {
  console.log("trying to match" + thisurl)
  console.log(typeof(thisurl))
  var match = thisurl.match("HTTPS:\/\/DECENTRALIZEDWEB.NET\/QR\/2018.HTML\\?BADGE=(.*)")
  if(match) {
    return match[1];
  } else {
    return null
  }
}

Helpers.keyInObj = (key, obj) => {
  if(typeof(obj) === "object" && (key in obj)) {
    return true;
  } else {
    return false;
  }
}

Helpers.keyOfObj = (key, obj) => {
  if(Helpers.keyInObj(key, obj)) {
    return obj[key]
  } else {
    return null
  }
} 

Helpers.getUrlValue = function(VarSearch){
    var SearchString = window.location.search.substring(1);
    var VariableArray = SearchString.split('&');
    for(var i = 0; i < VariableArray.length; i++){
        var KeyValuePair = VariableArray[i].split('=');
        if(KeyValuePair[0] === VarSearch){
            return KeyValuePair[1];
        }
    }
}

window.onload = () => {




export default Helpers;
