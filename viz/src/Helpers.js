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

export default Helpers;
