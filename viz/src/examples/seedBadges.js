

var getUrlValue = function(VarSearch){
    var SearchString = window.location.search.substring(1);
    var VariableArray = SearchString.split('&');
    for(var i = 0; i < VariableArray.length; i++){
        var KeyValuePair = VariableArray[i].split('=');
        if(KeyValuePair[0] === VarSearch){
            return KeyValuePair[1];
        }
    }
}
window.getUrlValue = getUrlValue;





let text = `
ERIC_ED105298
AnApproachToCybernetics
nasa_techdoc_19750005481
noise-arch_cottsts
noise-arch_artach-3sex
noise-arch_cottsts
Software1985
0826_Centralization_and_Decentralization_10_00_57_00
the_capitalist_conspiracy1969
exploringinterne00mala
pyschologyintern00bern
doesinternetbene0000murc
RobinSloanEPIC2014
cyberspy00clan
newthinkuseoflat00debo
thinkingasscienc01hazl
Alan_Kay_-_Big_Ideas_Are_Sometimes_Powerful_Ideas
cookingforcrowds00whit
Calling_Bryce_Brasel_with_Dick_Shugrue
TNM_Paratone_screens_patterns_colors_20170914_0242
TNM_Adult_oriented_book_catalog_-_World_Wide_Book_20180116_0172
TNM_Various_computer_and_engineering_books_-_Howa_20170923_0031
TNM_infotronic_eltro_information_rate_changer
TNM_Coloring_Book_A_metamorphosis_of_creative_cop_20170922_0699
TNM_Microdesk_computer_desk_-_Computer_Systems_De_20180216_0199
TNM_Skinner_Valves_Brochures_of_various_products_20170719_0068
TNM_Klein_Tools_Industrial_Catalog_106a_20170621_0135
TNM_Electronics_slide_rules_-_Cleveland_Institute_20170927_0116
TNM_The_Turner_Microphone_Company_Catalog
TNM_LLEWELLYN_occult_magazine_and_book_catalog_19_20170921_0293
TNM_ACT-1_Color_Copier_-_Advanced_Color_Technolog_20180213_0276
TNM_Hammel_Riglander_Co_Inc_Tool_and_Supply_catalog_no_665_20170626_0149
TNM_Specimen_catalog_mechanical_type_setting_inst_20171212_0064
TNM_1968_Precision_Electronic_Components_Catalog__20171112_0011
TNM_Letter_regarding_microphone_question_-_The_Ry_20180214_0162
TNM_Ideal_Company_Bookkeeping_and_Record-Keeping_Catalog_20170621_0103
TNM_Math-U-Matic_Complete_Math_Laboratory_Flyer
TNM_Zip-A-Tone_Blu-Zip_screens_and_colors_catalog_20180219_1007
TNM_Video_A-D_-_Computer_Labs_1978_20180216_0200
TNM_C-Cor_Electronics_Amplifiers_and_Electronics_1966_20170621_0106
TNM_Radio_equipment_catalog_fall__winter_1963_-_H_20180117_0150
TNM_Hamilton_high_pressure_syringe_-_Hamilton_Com_20171110_0088
TNM_Everything_Automotive_1976_parts_and_accessor_20180117_0256
TNM_Master_Specialties_Company_Catalog_Tellite_Switch
TNM_Technical_training_by_televised_instruction_L_20180214_0021
TNM_Kodak_Instamatic_movie_equipment_20170909_0225
TNM_Cameflex_CM3_from_Eclair_International_Diffusion
TNM_Electronic_kit_catalog_-_Heathkit_20180105_0100
TNM_James_Millen_Manufacturing_-_New_product_spec_20170628_0366
TNM_WAVE_Computer_Graphics_Inc_20180214_0143
TNM_Micro-computer_-_Billings_Computer_Corp_1977_20170922_0056
TNM_Byte_magazine_subscription_offer_1977_-_Byte__20180219_1148
TNM_Apple_personal_computer_systems_-_Apple_Compu_20180226_0230
TNM_Film_Processing_-_Consolidated_Film_Industrie_20170923_0148
TNM_Edmund_Scientific_Catalog_1979_fall-winter_80_20180119_0115
TNM_The_collected_works_of_Karen_Horney_20171004_0022
TNM_Macintosh_Quadra_Sales_Brochure_from_Apple_Computer
TNM_Complementary_symmetry_audio_transistors_circ_20170807_0044
TNM_Transistor_circuits_library_book_offer_-_McGr_20180209_0255
TNM_Creative_Computer_Furniture_by_Custom_Computer_Furniture
TNM_Printmaking_catalog_-_Sam_Flax_Inc_20170915_0109
TNM_Various_books_-_Dover_Publications_Inc_20171003_0230
TNM_Test_equipment_and_accessories_-_RCA_20180214_0042
TNM_Electronics_slide_rule_-_Cleveland_Institute__20171213_0135
TNM_Atlas_magazine_subscription_offer_20180209_0281
TNM_Encyclopedia_Britannica_announcing_new_editio_20171018_0083
TNM_Electronic_kits_-_Heathkit_1967_20171025_0125
TNM_General_Electric_-_RTV_Silicone_rubber_brochu_20170630_0094
`;

var Irrigation  = require('../Irrigation');
var $ = require('jquery');
var _ = require('lodash');
window.$ = $;
window._ = _;

var opts = {}
if(getUrlValue("nonce") != undefined) {
  opts.nonce = getUrlValue("nonce")
}
var irrigation = new Irrigation(opts)

const badges = require('../data/badge_data.json')


window.onload = () => {
    var listArray = text.split(/[\r\n]+/)

    function getRandomMedia() {
        return listArray[Math.floor(Math.random()*listArray.length)];
    }

    irrigation.init().then(() => {

      (async function submitstuff() { 

        var pbadges = irrigation.getParticipantBadges();

        for (var k in badges) {

          if(pbadges.includes(k.toString()) == false) {
            // seed only if badge hasn't

              var msg = {
                'from': {'name': 'seeder' },
                'type': 'seed',
                'msg': {
                  'seed_by': '88888',
                  'seed_to': k.toString(),
                  'media':[ getRandomMedia()]
                }
              }
              console.log("SEEDING :: ")
              await irrigation.addEventNow(msg)
              console.log("FINISHED SEEDING")
              console.log(msg)
            }
          }

      })();

    });
}

