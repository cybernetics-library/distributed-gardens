var fakeData = {};


var file = [".jpg", ".png", ".mov"]

var names1 = ["flower", "stamen", "object", "earthly", "sleeping", "calm", "gentle", "spindly", "sprightly", "blubbly", "soft", "slow", "free", "harmonious", "chaotic", "turbulent", "punctuated", "caring", "organized", "evolving", "circular", "adaptive", "complex", "windy", "rhizomatic", "dispersed", "energetic", "symbiotic", "mutualistic", "flying", "gliding", "circulating", "collaborating", "growing", "leafing", "photosynthesizing", "morphing", "pollinating", "gooey", "seeding", "Friendships", "Delights", "Exchange", "Contemplation", "Play", "Utopia", "Balance", "Soil", "storms", "Societies", "Computation", "Biologies", "Networks", "Systems", "Structures", "Theories", "Languages", "Loops", "seeds", "pistil", "stamen", "varieties", "sunsets", "vessels", "leaves", "repositories", "data", "streams"]

fakeData.choose = function(lst) {
  return lst[Math.floor(Math.random() * lst.length)]
}

fakeData.randomRange = function(n1, n2) {
  return (Math.random() * (n2 - n1)) + n1
}

fakeData.file = function() {
  return fakeData.choose(names1) + fakeData.choose(file)
}

fakeData.stats = function() {
  return {
    participantNum: 54,
    numEvents: 220,
  }
}


fakeData.gardenstats= function() {

  var files = []
  for(let i = 0; i < fakeData.randomRange(1,30); i++) {
    files.push(fakeData.file())
  }

  var links = []
  for(let i = 0; i < fakeData.randomRange(1,10); i++) {
    links.push(Math.floor(Math.random() * 99999).toString())
  }

  return {
    links: links,
    files: files
  }

}


module.exports = fakeData;
