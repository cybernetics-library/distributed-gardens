var Irrigation  = require('../Irrigation');
var $ = require('jquery');
window.$ = $;

window.onload = () => {
  var irrigation = new Irrigation({ nonce: 11113 });
  window.irrigation = irrigation;
  irrigation.init()
/*
  .then(() => { console.log(irrigation.addEventNow({ 'from': { 'name': 'tester' }, 'type': 'seed',
    'msg': { 'seed_by': '11111', 'seed_to': '11111',  media:[ 'ERIC_ED105298'] } })); })

  .then(() => { console.log(irrigation.addEventNow({ 'from': { 'name': 'tester' }, 'type': 'seed',
    'msg': { 'seed_by': '11111', 'seed_to': '22222',  media:[ 'AnApproachToCybernetics'] } })); })

  .then(() => { console.log(irrigation.addEventNow({ 'from': { 'name': 'tester' }, 'type': 'seed',
    'msg': { 'seed_by': '11111', 'seed_to': '33333',  media:[ 'nasa_techdoc_19750005481'] } })); })

    .then(() => { console.log(irrigation.addEventNow({
      'from':
      { 'name': 'tester' },
      'type': 'seed',
      'msg': {
      'seed_by': '22222',
      'seed_to': '33333',
       media:[ 'noise-arch_cottsts'] }
      })); })

      .then(() => { console.log(irrigation.addEventNow({
        'from':
        { 'name': 'tester' },
        'type': 'seed',
        'msg': {
        'seed_by': '22222',
        'seed_to': '44444',
         media:[ 'noise-arch_artach-3sex'] }
        })); })


        .then(() => { console.log(irrigation.addEventNow({
          'from':
          { 'name': 'tester' },
          'type': 'seed',
          'msg': {
          'seed_by': '22222',
          'seed_to': '55555',
           media:[ 'noise-arch_cottsts'] }
          })); })


          .then(() => { console.log(irrigation.addEventNow({
            'from':
            { 'name': 'tester' },
            'type': 'seed',
            'msg': {
            'seed_by': '33333',
            'seed_to': '44444',
             media:[ 'Software1985'] }
            })); })


            .then(() => { console.log(irrigation.addEventNow({
              'from':
              { 'name': 'tester' },
              'type': 'seed',
              'msg': {
              'seed_by': '33333',
              'seed_to': '55555',
               media:[ '0826_Centralization_and_Decentralization_10_00_57_00'] }
              })); })



              .then(() => { console.log(irrigation.addEventNow({
                'from':
                { 'name': 'tester' },
                'type': 'seed',
                'msg': {
                'seed_by': '33333',
                'seed_to': '66666',
                 media:[ 'the_capitalist_conspiracy1969'] }
                })); })



                .then(() => { console.log(irrigation.addEventNow({
                  'from':
                  { 'name': 'tester' },
                  'type': 'seed',
                  'msg': {
                  'seed_by': '44444',
                  'seed_to': '55555',
                   media:[ 'exploringinterne00mala'] }
                  })); })



                  .then(() => { console.log(irrigation.addEventNow({
                    'from':
                    { 'name': 'tester' },
                    'type': 'seed',
                    'msg': {
                    'seed_by': '44444',
                    'seed_to': '66666',
                     media:[ 'pyschologyintern00bern'] }
                    })); })


                    .then(() => { console.log(irrigation.addEventNow({
                      'from':
                      { 'name': 'tester' },
                      'type': 'seed',
                      'msg': {
                      'seed_by': '44444',
                      'seed_to': '77777',
                       media:[ 'doesinternetbene0000murc'] }
                      })); })


                      .then(() => { console.log(irrigation.addEventNow({
                        'from':
                        { 'name': 'tester' },
                        'type': 'seed',
                        'msg': {
                        'seed_by': '55555',
                        'seed_to': '66666',
                         media:[ 'RobinSloanEPIC2014'] }
                        })); })


                        .then(() => { console.log(irrigation.addEventNow({
                          'from':
                          { 'name': 'tester' },
                          'type': 'seed',
                          'msg': {
                          'seed_by': '55555',
                          'seed_to': '77777',
                           media:[ 'cyberspy00clan'] }
                          })); })


                          .then(() => { console.log(irrigation.addEventNow({
                            'from':
                            { 'name': 'tester' },
                            'type': 'seed',
                            'msg': {
                            'seed_by': '55555',
                            'seed_to': '88888',
                             media:[ 'newthinkuseoflat00debo'] }
                            })); })

                            .then(() => { console.log(irrigation.addEventNow({
                              'from':
                              { 'name': 'tester' },
                              'type': 'seed',
                              'msg': {
                              'seed_by': '66666',
                              'seed_to': '11111',
                               media:[ 'thinkingasscienc01hazl'] }
                              })); })

                              .then(() => { console.log(irrigation.addEventNow({
                                'from':
                                { 'name': 'tester' },
                                'type': 'seed',
                                'msg': {
                                'seed_by': '66666',
                                'seed_to': '22222',
                                 media:[ 'Alan_Kay_-_Big_Ideas_Are_Sometimes_Powerful_Ideas'] }
                                })); })

                                .then(() => { console.log(irrigation.addEventNow({
                                  'from':
                                  { 'name': 'tester' },
                                  'type': 'seed',
                                  'msg': {
                                  'seed_by': '66666',
                                  'seed_to': '33333',
                                   media:[ 'cookingforcrowds00whit'] }
                                  })); })

                                  .then(() => { console.log(irrigation.addEventNow({
                                    'from':
                                    { 'name': 'tester' },
                                    'type': 'seed',
                                    'msg': {
                                    'seed_by': '55555',
                                    'seed_to': '33333',
                                     media:[ 'Calling_Bryce_Brasel_with_Dick_Shugrue'] }
                                    })); })




*/

  .then(() => { console.log(irrigation.getHistory()); 
    $("#output").html(JSON.stringify(irrigation.getHistory(), null, 2))
  })
  .then(() => { console.log(irrigation.getAdjacencyList()); })
  .then(() => { console.log(irrigation.getStats()); 
    $("#output2").html(JSON.stringify(irrigation.getStats(), null, 2))
  })
  .then(() => { console.log(irrigation.getGraphData()); })
  .then(() => { console.log(irrigation.biome._psa.peerCountGuess()); })
}
