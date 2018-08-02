

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
TNM_NEC_The_NEC_Colormate_PS
TNM_Motorola_military_electronics_20180223_0187
TNM_Acoustical_Materials_Association_-_The_use_of_architectural_acoustical_materials_20170621_0563
TNM_Learning_toys_catalog_-_Creative_Playthings_I_20180215_0001
TNM_Vacuum_easel_film_punch_pin_glass_mask_regist_20180220_0104
TNM_Electronic_Design_magazine_Jan_26_1984_-_Hayd_20180101_1371
TNM_Various_blueprint_graphing_and_CAD_software_-_20170827_0318
TNM_Mechanical_Engineering_Inc_-_Typit_20170629_0019
TNM_IGC_Monthly_magazine_offer_-_Institute_for_Gr_20180327_0117
TNM_Educational_Supplies_and_Equipment_-_Keuffel__20170914_0361
TNM_Writing_Skills_for_the_EDP_Professional_1977_20180224_0121
TNM_Hard_to_find_tools_catalog_-_Brookstone_20180111_0083
TNM_Zip-A-Tone_transparent_solid_colors_20180331_0037
TNM_RCA_Edge_electronic_data_gathering_equipment__20180224_0003
TNM_Pot_Art_and_Marijuana_Reading_Matter_-_Apocry_20180327_0150
TNM_SUPERSCOUT_business_computer_network_20180126_0115
TNM_Smithsonian_Institution_membership_offer_20180302_0001
TNM_Computer_graphics_-_Raster_Technologies_20180201_0259
TNM_Pascal_Programming_for_mini_and_microcomputer_20180225_0012
TNM_Red_Cloud_Indian_Mission_School_Pine_Ridge_So_20180327_0128
TNM_BitBanger
TNM_Instrumentation_for_scientific_research_-_ISC_20180226_0100
TNM_Catalog_-_Behavioral_Science_Book_Service_20180201_0100
TNM_Optical_signal_processing_for_C3I_-_Society_o_20180224_0065
TNM_The_report_on_electronic_mail_-_The_Yankee_Gr_20180227_0199
TNM_Project_management_for_computer_systems_semin_20180331_0116
poisonousplants0000coil
poisonplants00eshl
plantsbiteback00plat
experimentswithp00salv
PlantsBehavingBadly1of2MurderAndMayhem
insecteatingplan0000pool
plantswithoutsee0000pasc
meateatingplants00souz
animalsplantsmac00mitc
plantsthatmove00sels
DTIC_ADA045526
cetadecentraliza00sned
decentralization00ndea
ERIC_ED107616
arxiv-1506.03479
decentralization00smit
1914TN8
fiscaldecentrali00worl_0
localdecentraliz00roth
ERIC_ED359627
CIA-RDP82-00457R008200720002-4
municipaldecentr00wash
neighborhooddemo0000yate
DTIC_ADA391228
ERIC_ED041071
studyofcertainof00bostCrowdshot1
TheDiaryOfANetworkAdministrator06042005
Particle_Theory-17177
DTIC_ADA121326
arxiv-1405.3223
starfishspiderun00orib
perma_cc_Q24K-G33A
ERIC_ED020995
ERIC_ED048659
citiesareabnorma00peterich
publicmoneymuse00bene
ERIC_ED272067
OnExchangingOntologies
DTIC_ADA472967
ZagrebCyberfeminism1999
VariantIssue14
Josephine_201702
BeyondBytes
TechnologyIsNotNeutralExhibition-TeslaArchiveDocumentationB
TheLimitsToGrowth
mediaenvironment0000lama
isbn_9780312252373
LeveragePoints
DonellaMeadowsPt.2
DonellaMeadowsF5
DesigningEarthAnewTogether
electronicoracle00mead
psychocybernetic00bobb_0
AnApproachToCybernetics
cybernetics00wien
psychocybernetic00maxw_1
redBox_201708
TheNewPsychoCyberneticsByMaxwellMaltz
NewAgeTantraYogaTheCyberneticsOfSexAndLoveHowardJohnZitko
NoisesculptorLandscapeII
humanuseofhumanb00wien
CyberneticsOrCommunicationAndControlInTheAnimalAndTheMachineNorbertWiener
humanuseofhuma1954wien
scienceofartc00muel
arxiv-quant-ph0403146
arxiv-1011.3049
Distributed_XYZ
DistributedControlSystems
DTIC_ADA095385
ParallelDistributedProcessing
insidedistribute00eddo
arxiv-1412.6388
arxiv-1302.4544
arxiv-1606.02205
Distributed_Large-Scale_Dimensional_Metrology
springer_10.1007-1-4020-2460-6
arxiv-1604.01292
in.ernet.dli.2015.193652
arxiv-quant-ph0407037
Ldhaney-MCTV_ep2W3_h264148
pyohio_2018-Distributed_Software_with_Python
DTIC_ADA131245
2000-L-00410
nasa_techdoc_19920007367
arxiv-1210.7057
tucows_60084_PGP
896OpenPGPDiscussionAndSkillshare
perma_cc_95FY-MJJX
Brewsterinaworkinggroup2
TBLandCorydebate
peertopeerbuildi00moor
DWebSummit2016_Introduction_Brewster_Kahle
PeerToPeer
IMG1624_201808
broskoski-nelson-1
broskoski-nelson-2
evans-marshall-1
evans-marshall-2
broskoski-nekson_evans-marshall
flock_201808
lightning_talks-1
IADecentralization1
p2p2p2p-1
p2p2p2p-2
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
        console.log(pbadges)

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
                },
                'nonce': '77777'
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

