export default function calculateData(parameter) {
  const stones = [
    "Agnidus Agate Sliver",
    "Agnidus Agate Fragment",
    "Agnidus Agate Chunk",
    "Agnidus Agate Gemstone",
    "Varunada Lazurite Sliver",
    "Varunada Lazurite Fragment",
    "Varunada Lazurite Chunk",
    "Varunada Lazurite Gemstone",
    "Nagadus Emerald Sliver",
    "Nagadus Emerald Fragment",
    "Nagadus Emerald Chunk",
    "Nagadus Emerald Gemstone",
    "Vajrada Amethyst Sliver",
    "Vajrada Amethyst Fragment",
    "Vajrada Amethyst Chunk",
    "Vajrada Amethyst Gemstone",
    "Vayuda Turquoise Sliver",
    "Vayuda Turquoise Fragment",
    "Vayuda Turquoise Chunk",
    "Vayuda Turquoise Gemstone",
    "Shivada Jade Sliver",
    "Shivada Jade Fragment",
    "Shivada Jade Chunk",
    "Shivada Jade Gemstone",
    "Prithiva Topaz Sliver",
    "Prithiva Topaz Fragment",
    "Prithiva Topaz Chunk",
    "Prithiva Topaz Gemstone",
  ];

  const weaponMaterials = [
    "Tile of Decarabian's Tower",
    "Debris of Decarabian's City",
    "Fragment of Decarabian's Epic",
    "Scattered Piece of Decarabian's Dream",
    "Boreal Wolf's Milk Tooth",
    "Boreal Wolf's Cracked Tooth",
    "Boreal Wolf's Broken Fang",
    "Boreal Wolf's Nostalgia",
    "Fetters of the Dandelion Gladiator",
    "Chains of the Dandelion Gladiator",
    "Shackles of the Dandelion Gladiator",
    "Dream of the Dandelion Gladiator",
    "Luminous Sands from Guyun",
    "Lustrous Stone from Guyun",
    "Relic from Guyun",
    "Divine Body from Guyun",
    "Mist Veiled Lead Elixir",
    "Mist Veiled Mercury Elixir",
    "Mist Veiled Gold Elixir",
    "Mist Veiled Primo Elixir",
    "Grain of Aerosiderite",
    "Piece of Aerosiderite",
    "Bit of Aerosiderite",
    "Chunk of Aerosiderite",
    "Coral Branch of a Distant Sea",
    "Jeweled Branch of a Distant Sea",
    "Jade Branch of a Distant Sea",
    "Golden Branch of a Distant Sea",
    "Narukami's Wisdom",
    "Narukami's Joy",
    "Narukami's Affection",
    "Narukami's Valor",
    "Mask of the Wicked Lieutenant",
    "Mask of the Tiger's Bite",
    "Mask of the One-Horned",
    "Mask of the Kijin",
    "Copper Talisman of the Forest Dew",
    "Iron Talisman of the Forest Dew",
    "Silver Talisman of the Forest Dew",
    "Golden Talisman of the Forest Dew",
    "Oasis Garden's Reminiscence",
    "Oasis Garden's Kindness",
    "Oasis Garden's Mourning",
    "Oasis Garden's Truth",
    "Echo of Scorching Might",
    "Remnant Glow of Scorching Might",
    "Dream of Scorching Might",
    "Olden Days of Scorching Might",
    "Fragment of an Ancient Chord",
    "Chapter of an Ancient Chord",
    "Movement of an Ancient Chord",
    "Echo of an Ancient Chord",
    "Dross of Pure Sacred Dewdrop",
    "Sublimation of Pure Sacred Dewdrop",
    "Spring of Pure Sacred Dewdrop",
    "Essence of Pure Sacred Dewdrop",
    "Broken Goblet of the Pristine Sea",
    "Wine Goblet of the Pristine Sea",
    "Silver Goblet of the Pristine Sea",
    "Golden Goblet of the Pristine Sea",
    "Blazing Sacrificial Heart's Terror",
    "Blazing Sacrificial Heart's Hesitance",
    "Blazing Sacrificial Heart's Resolve",
    "Blazing Sacrificial Heart's Splendor",
    "Delirious Decadence of the Sacred Lord",
    "Delirious Desolation of the Sacred Lord",
    "Delirious Demeanor of the Sacred Lord",
    "Delirious Divinity of the Sacred Lord",
    "Night-Wind's Mystic Consideration",
    "Night-Wind's Mystic Premonition",
    "Night-Wind's Mystic Augury",
    "Night-Wind's Mystic Revelation",
    "Artful Device Fragment",
    "Artful Device Replica",
    "Artful Device Inheritance",
    "Artful Device Wish",
    "Ember of Long Night Flint",
    "Afterglow of Long Night Flint",
    "Flare of Long Night Flint",
    "Blaze of Long Night Flint",
    "Sundered Glory of the Far-North Scions",
    "Unyielding Delusion of the Far-North Scions",
    "Oblation of the Far-North Scions",
    "Aureate Radiance of the Far-North Scions",
    "Rise of the Pale Star Army",
    "Muster of the Pale Star Army",
    "Clarion of the Pale Star Army",
    "Triumph of the Pale Star Army",
    "Measured Pour of the Cellared Spiritual Nectar",
    "Intoxication of the Cellared Spiritual Nectar",
    "Exhilaration of the Cellared Spiritual Nectar",
    "Revelry of the Cellared Spiritual Nectar",
    "The Frost Emperor's Revival",
    "The Frost Emperor's Ceremony",
    "The Frost Emperor's Lament",
    "The Frost Emperor's Farewell",
  ];

  const talentMaterials = [
    "Teachings of Freedom",
    "Guide to Freedom",
    "Philosophies of Freedom",
    "Teachings of Resistance",
    "Guide to Resistance",
    "Philosophies of Resistance",
    "Teachings of Ballad",
    "Guide to Ballad",
    "Philosophies of Ballad",
    "Teachings of Prosperity",
    "Guide to Prosperity",
    "Philosophies of Prosperity",
    "Teachings of Diligence",
    "Guide to Diligence",
    "Philosophies of Diligence",
    "Teachings of Gold",
    "Guide to Gold",
    "Philosophies of Gold",
    "Teachings of Transience",
    "Guide to Transience",
    "Philosophies of Transience",
    "Teachings of Elegance",
    "Guide to Elegance",
    "Philosophies of Elegance",
    "Teachings of Light",
    "Guide to Light",
    "Philosophies of Light",
    "Teachings of Admonition",
    "Guide to Admonition",
    "Philosophies of Admonition",
    "Teachings of Ingenuity",
    "Guide to Ingenuity",
    "Philosophies of Ingenuity",
    "Teachings of Praxis",
    "Guide to Praxis",
    "Philosophies of Praxis",
    "Teachings of Equity",
    "Guide to Equity",
    "Philosophies of Equity",
    "Teachings of Justice",
    "Guide to Justice",
    "Philosophies of Justice",
    "Teachings of Order",
    "Guide to Order",
    "Philosophies of Order",
    "Teachings of Contention",
    "Guide to Contention",
    "Philosophies of Contention",
    "Teachings of Kindling",
    "Guide to Kindling",
    "Philosophies of Kindling",
    "Teachings of Conflict",
    "Guide to Conflict",
    "Philosophies of Conflict",
    "Teachings of Moonlight",
    "Guide to Moonlight",
    "Philosophies of Moonlight",
    "Teachings of Elysium",
    "Guide to Elysium",
    "Philosophies of Elysium",
    "Teachings of Vagrancy",
    "Guide to Vagrancy",
    "Philosophies of Vagrancy",
    "Teachings of Charity",
    "Guide to Charity",
    "Philosophies of Charity",
    "Teachings of Fortitude",
    "Guide to Fortitude",
    "Philosophies of Fortitude",
    "Teachings of Glory",
    "Guide to Glory",
    "Philosophies of Glory",
  ];

  const commonEnemies = [
    "Slime Condensate",
    "Slime Secretions",
    "Slime Concentrate",
    "Damaged Mask",
    "Stained Mask",
    "Ominous Mask",
    "Whopperflower Nectar",
    "Shimmering Nectar",
    "Energy Nectar",
    "Recruit's Insignia",
    "Sergeant's Insignia",
    "Lieutenant's Insignia",
    "Treasure Hoarder Insignia",
    "Silver Raven Insignia",
    "Golden Raven Insignia",
    "Firm Arrowhead",
    "Sharp Arrowhead",
    "Weathered Arrowhead",
    "Divining Scroll",
    "Sealed Scroll",
    "Forbidden Curse Scroll",
    "Old Handguard",
    "Kageuchi Handguard",
    "Famed Handguard",
    "Spectral Husk",
    "Spectral Heart",
    "Spectral Nucleus",
    "Fungal Spores",
    "Luminescent Pollen",
    "Crystalline Cyst Dust",
    "Faded Red Satin",
    "Trimmed Red Silk",
    "Rich Red Brocade",
    "Meshing Gear",
    "Mechanical Spur Gear",
    "Artificed Dynamic Gear",
    "Transoceanic Pearl",
    "Transoceanic Chunk",
    "Xenochromatic Crystal",
    "Juvenile Fang",
    "Seasoned Fang",
    "Tyrant's Fang",
    "Sentry's Wooden Whistle",
    "Warrior's Metal Whistle",
    "Saurian-Crowned Warrior's Golden Whistle",
    "Broken Drive Shaft",
    "Reinforced Drive Shaft",
    "Precision Drive Shaft",
    "Tattered Warrant",
    "Immaculate Warrant",
    "Frost-Etched Warrant",
    "Ethereal Glimmershard",
    "Ethereal Crystal",
    "Ethereal Crystalscale Stone",
    "Chimeric Core",
    "Symbiotic Chimeric Nucleus",
    "Prime Chimeric Nexus",
  ];

  const eliteEnemies = [
    "Heavy Horn",
    "Black Bronze Horn",
    "Black Crystal Horn",
    "Chaos Device",
    "Chaos Circuit",
    "Chaos Core",
    "Dead Ley Line Branch",
    "Dead Ley Line Leaves",
    "Ley Line Sprout",
    "Fragile Bone Shard",
    "Sturdy Bone Shard",
    "Fossilized Bone Shard",
    "Mist Grass Pollen",
    "Mist Grass",
    "Mist Grass Wick",
    "Hunter's Sacrificial Knife",
    "Agent's Sacrificial Knife",
    "Inspector's Sacrificial Knife",
    "Dismal Prism",
    "Crystal Prism",
    "Polarizing Prism",
    "Chaos Gear",
    "Chaos Axis",
    "Chaos Oculus",
    "Concealed Claw",
    "Concealed Unguis",
    "Concealed Talon",
    "Gloomy Statuette",
    "Dark Statuette",
    "Deathly Statuette",
    "Chaos Storage",
    "Chaos Module",
    "Chaos Bolt",
    "Inactivated Fungal Nucleus",
    "Dormant Fungal Nucleus",
    "Robust Fungal Nucleus",
    "Damaged Prism",
    "Turbid Prism",
    "Radiant Prism",
    "Desiccated Shell",
    "Sturdy Shell",
    "Marked Shell",
    "A Flower Yet to Bloom",
    "Treasured Flower",
    "Wanderer's Blooming Flower",
    "Drop of Tainted Water",
    "Scoop of Tainted Water",
    "Newborn Tainted Hydro Phantasm",
    "Rift Core",
    "Foreign Synapse",
    "Alien Life Core",
    "Old Operative's Pocket Watch",
    "Operative's Standard Pocket Watch",
    "Operative's Constancy",
    "Feathery Fin",
    "Lunar Fin",
    "Chasmlight Fin",
    "Ruined Hilt",
    "Splintered Hilt",
    "Still-Smoldering Hilt",
    "Shard of a Shattered Will",
    "Locus of a Clear Will",
    "Sigil of a Striding Will",
    "Axis of the Secret Source",
    "Sheath of the Secret Source",
    "Heart of the Secret Source",
    "Ignited Stone",
    "Ignited Seed of Life",
    "Ignited Seeing Eye",
    "Refractive Bud",
    "Bewildering Broadleaf",
    "Illusory Leafcoil",
    "Cold-Cracked Shellshard",
    "Warm Back-Shell",
    "Blazing Prismshell",
    "Frostnight's Glimmer",
    "Frostnight's Glow",
    "Frostnight's Glory",
    "Lightless Bone",
    "Glowing Remains",
    "Radiant Exoskeleton",
    "Mistshroud Manifestation",
    "Mistshroud Plate",
    "Mistshroud Helmet",
    "Fractured Eye of the Deep Shadow",
    "Aberrant Core of the Deep Shadow",
    "Hooked Beak of the Deep Shadow",
    "Faded Flaming Hilt",
    "Fractured Flaming Hilt",
    "Jeweled Flaming Hilt",
    "Fractured Lunar Iron",
    "Depleted Lunar Iron",
    "Unblemished Lunar Iron",
    "Accreted Fragment",
    "Accreted Mass",
    "Accreted Growth",
    "Hollow Root of Life",
    "Sprout Node of Life",
    "Coiled Core of Life",
  ];

  const specialty = {
    Wolfhook: 35,
    Valberry: 26,
    Cecilia: 37,
    "Windwheel Aster": 82,
    "Philanemo Mushroom": 57,
    "Small Lamp Grass": 85,
    "Calla Lily": 60,
    "Dandelion Seed": 69,
    "Etherwing Moth": 80,
    "Jueyun Chili": 53,
    "Noctilucous Jade": 73,
    "Silk Flower": 17,
    "Glaze Lily": 50,
    Qingxin: 175,
    Starconch: 80,
    Violetgrass: 237,
    "Cor Lapis": 176,
    "Clearwater Jade": 67,
    Onikabuto: 79,
    "Sakura Bloom": 75,
    "Crystal Marrow": 66,
    Dendrobium: 55,
    "Naku Weed": 132,
    "Sea Ganoderma": 166,
    "Sango Pearl": 54,
    "Amakumo Fruit": 95,
    "Fluorescent Fungus": 71,
    "Rukkhashava Mushrooms": 77,
    Padisarah: 68,
    "Nilotpala Lotus": 79,
    "Kalpalata Lotus": 66,
    "Henna Berry": 101,
    "Sand Grease Pupa": 74,
    "Mourning Flower": 81,
    Trishiraite: 66,
    Scarab: 78,
    "Beryl Conch": 111,
    "Romaritime Flower": 130,
    "Lumidouce Bell": 30,
    "Rainbow Rose": 81,
    Lumitoile: 79,
    "Lakelight Lily": 79,
    "Subdetection Unit": 72,
    "Spring of the First Dewdrop": 74,
    "Sprayfeather Gill": 86,
    "Brilliant Chrysanthemum": 91,
    "Quenepa Berry": 56,
    "Saurian Claw Succulent": 90,
    "Glowing Hornshroom": 72,
    "Withering Purpurbloom": 80,
    "Skysplit Gembloom": 74,
    Dracolite: 62,
    "Portable Bearing": 72,
    "Frostlamp Flower": 70,
    "Moonfall Silver": 71,
    "Winter Icelea": 69,
    "Pine Amber": 72,
    "Teardrop of the Moon": 74,
    Flockingweed: 50,
    "Frostfairy Flower": 50,
    Glaciafruit: 50,
  };

  const boss = [
    "Hurricane Seed",
    "Lightning Prism",
    "Hoarfrost Core",
    "Basalt Pillar",
    "Everflame Seed",
    "Cleansing Heart",
    "Juvenile Jade",
    "Crystalline Bloom",
    "Marionette Core",
    "Smoldering Pearl",
    "Perpetual Heart",
    "Storm Beads",
    "Dew of Repudiation",
    "Riftborn Regalia",
    "Dragonheir's False Fin",
    "Runic Fang",
    "Majestic Hooked Beak",
    "Thunderclap Fruitcore",
    "Light Guiding Tetrahedron",
    "Perpetual Caliber",
    "Quelled Creeper",
    "Pseudo-Stamens",
    "Evergloom Ring",
    "Emperor's Resolution",
    "Artificed Spare Clockwork Component — Coppelia",
    "Artificed Spare Clockwork Component — Coppelius",
    "Fontemer Unihorn",
    '"Tourbillon Device"',
    "Water That Failed To Transcend",
    "Cloudseam Scale",
    "Fragment of a Golden Melody",
    "Mark of the Binding Blessing",
    "Overripe Flamegranate",
    "Gold-Inscribed Secret Source Core",
    "Ensnaring Gaze",
    "Talisman of the Enigmatic Land",
    "Sparkless Statue Core",
    "Secret Source Airflow Accumulator",
    "Precision Kuuvahki Stamping Die",
    "Lightbearing Scale-Feather",
    "Radiant Antler",
    "Cyclic Military Kuuvahki Core",
    "Remnant of the Dreadwing",
    "Prismatic Severed Tail",
    "Plume of the Fallen Watcher",
    "Severed Tail of the Sky-Roamer",
    "Unscorched Blossom Branch",
  ];

  const weekBoss = [
    "Dvalin's Plume",
    "Dvalin's Claw",
    "Dvalin's Sigh",
    "Tail of Boreas",
    "Ring of Boreas",
    "Spirit Locket of Boreas",
    "Tusk of Monoceros Caeli",
    "Shard of a Foul Legacy",
    "Shadow of the Warrior",
    "Dragon Lord's Crown",
    "Bloodjade Branch",
    "Gilded Scale",
    "Molten Moment",
    "Hellfire Butterfly",
    "Ashen Heart",
    "Mudra of the Malefic General",
    "Tears of the Calamitous God",
    "The Meaning of Aeons",
    "Puppet Strings",
    "Mirror of Mushin",
    "Daka's Bell",
    "Worldspan Fern",
    "Primordial Greenbloom",
    "Everamber",
    "Lightless Silk String",
    "Lightless Eye of the Maelstrom",
    "Lightless Mass",
    "Fading Candle",
    "Silken Feather",
    "Denial and Judgment",
    "Eroded Horn",
    "Eroded Sunfire",
    "Eroded Scale-Feather",
    "Ascended Sample: Knight",
    "Ascended Sample: Rook",
    "Ascended Sample: Queen",
    "Mask of the Virtuous Doctor",
    "Madman's Restraint",
    "Elixir of the Heretic",
    "Counterfeit Resin",
    "Twisted Withered Branch",
    "Profaned Sprout",
  ];

  const special = ["The Cornerstone of Stars and Flames"];

  const commonEnemiesData = {
    0: [
      ["Slime Condensate", "Slime Secretions", "Slime Concentrate"],
      [
        0.3443, 0.355, 0.4004, 0.8202, 1.205, 1.3006, 1.3958, 1.5045, 1.5317,
        1.5861, 1906,
      ],
    ],
    1: [
      ["Damaged Mask", "Stained Mask", "Ominous Mask"],
      [
        0.2152, 0.2219, 0.2502, 0.5126, 0.7529, 0.8126, 0.8721, 0.9403, 0.9573,
        0.9914, 1634,
      ],
    ],
    2: [
      ["Divining Scroll", "Sealed Scroll", "Forbidden Curse Scroll"],
      [
        1.2911, 1.3314, 1.5014, 3.0765, 4.1604, 4.1576, 4.5144, 5.6423, 5.7441,
        5.9481, 266,
      ],
    ],
    3: [
      ["Firm Arrowhead", "Sharp Arrowhead", "Weathered Arrowhead"],
      [
        0.4345, 0.448, 0.5052, 1.0308, 1.513, 1.6326, 1.7518, 1.8882, 1.9222,
        1.9906, 734,
      ],
    ],
    4: [
      ["Recruit's Insignia", "Sergeant's Insignia", "Lieutenant's Insignia"],
      [
        2.1518, 2.2191, 2.5023, 5.1275, 7.5345, 8.1293, 8.7239, 9.4038, 9.5737,
        9.9139, 274,
      ],
    ],
    5: [
      [
        "Treasure Hoarder Insignia",
        "Silver Raven Insignia",
        "Golden Raven Insignia",
      ],
      [
        0.6456, 0.6657, 0.7507, 1.5384, 2.2603, 2.4389, 2.6172, 2.8213, 2.8722,
        2.9745, 592,
      ],
    ],
    6: [
      ["Whopperflower Nectar", "Shimmering Nectar", "Energy Nectar"],
      [
        2.1518, 2.2191, 2.5023, 5.1275, 7.5345, 8.1293, 8.7239, 9.4038, 9.5737,
        9.9139, 271,
      ],
    ],
    7: [
      ["Old Handguard", "Kageuchi Handguard", "Famed Handguard"],
      [
        0.4345, 0.448, 0.5052, 1.0308, 1.513, 1.6326, 1.7518, 1.8882, 1.9222,
        1.9906, 251,
      ],
    ],
    8: [
      ["Spectral Husk", "Spectral Heart", "Spectral Nucleus"],
      [
        0.6456, 0.6657, 0.7507, 1.5384, 2.2603, 2.4389, 2.6172, 2.8213, 2.8722,
        2.9745, 189,
      ],
    ],
    9: [
      ["Fungal Spores", "Luminescent Pollen", "Crystalline Cyst Dust"],
      [
        0.4345, 0.448, 0.5052, 1.0308, 1.513, 1.6326, 1.7518, 1.8882, 1.9222,
        1.9906, 1185,
      ],
    ],
    10: [
      ["Faded Red Satin", "Trimmed Red Silk", "Rich Red Brocade"],
      [
        0.538, 0.5548, 0.6256, 1.2818, 1.8831, 2.0322, 2.1809, 2.3509, 2.3933,
        2.4782, 765,
      ],
    ],
    11: [
      ["Transoceanic Pearl", "Transoceanic Chunk", "Xenochromatic Crystal"],
      [
        0.4345, 0.448, 0.5052, 1.0308, 1.513, 1.6326, 1.7518, 1.8882, 1.9222,
        1.9906, 1005,
      ],
    ],
    12: [
      ["Meshing Gear", "Mechanical Spur Gear", "Artificed Dynamic Gear"],
      [
        0.6456, 0.6657, 0.7507, 1.5384, 2.2603, 2.4389, 2.6172, 2.8213, 2.8722,
        2.9745, 327,
      ],
    ],
    13: [
      ["Juvenile Fang", "Seasoned Fang", "Tyrant's Fang"],
      [
        0.6456, 0.6657, 0.7507, 1.5384, 2.2603, 2.4389, 2.6172, 2.8213, 2.8722,
        2.9745, 1043,
      ],
    ],
    14: [
      [
        "Sentry's Wooden Whistle",
        "Warrior's Metal Whistle",
        "Saurian-Crowned Warrior's Golden Whistle",
      ],
      [
        0.807, 0.8322, 0.9384, 1.9228, 2.8256, 3.049, 3.2722, 3.5273, 3.5912,
        3.7189, 425,
      ],
    ],
    15: [
      ["Broken Drive Shaft", "Reinforced Drive Shaft", "Precision Drive Shaft"],
      [
        1.3449, 1.387, 1.564, 3.2047, 4.7098, 5.0816, 5.4533, 5.8782, 5.9845,
        6.197, 66,
      ],
    ],
    16: [
      ["Tattered Warrant", "Immaculate Warrant", "Frost-Etched Warrant"],
      [
        1.1432, 1.1789, 1.3294, 2.7241, 4.0021, 4.3183, 4.6344, 4.9957, 5.0859,
        5.2665, 122,
      ],
    ],
    17: [
      [
        "Ethereal Glimmershard",
        "Ethereal Crystal",
        "Ethereal Crystalscale Stone",
      ],
      [
        0.6456, 0.6657, 0.7507, 1.5384, 2.2603, 2.4389, 2.6172, 2.8213, 2.8722,
        2.9745, 50,
      ],
    ],
    18: [
      ["Chimeric Core", "Symbiotic Chimeric Nucleus", "Prime Chimeric Nexus"],
      [
        0.6456, 0.6657, 0.7507, 1.5384, 2.2603, 2.4389, 2.6172, 2.8213, 2.8722,
        2.9745, 50,
      ],
    ],
  };

  const eliteEnemiesData = {
    0: [
      ["Heavy Horn", "Black Bronze Horn", "Black Crystal Horn"],
      [
        0.807, 0.8322, 0.9384, 1.9228, 2.8256, 3.049, 3.2722, 3.5273, 3.5912,
        3.7189, 477,
      ],
    ],
    1: [
      ["Dead Ley Line Branch", "Dead Ley Line Leaves", "Ley Line Sprout"],
      [
        1.1432, 1.1789, 1.3294, 2.7241, 4.0021, 4.3183, 4.6344, 4.9957, 5.0859,
        5.2665, 191,
      ],
    ],
    2: [
      ["Chaos Device", "Chaos Circuit", "Chaos Core"],
      [
        1.3449, 1.387, 1.564, 3.2047, 4.7098, 5.0816, 5.4533, 5.8782, 5.9845,
        6.197, 183,
      ],
    ],
    3: [
      ["Mist Grass Pollen", "Mist Grass", "Mist Grass Wick"],
      [
        2.6898, 2.7739, 3.1279, 6.4094, 9.4195, 10.1632, 10.9066, 11.7563,
        11.9687, 12.3939, 46,
      ],
    ],
    4: [
      [
        "Hunter's Sacrificial Knife",
        "Agent's Sacrificial Knife",
        "Inspector's Sacrificial Knife",
      ],
      [
        2.6898, 2.7739, 3.1279, 6.4094, 9.4195, 10.1632, 10.9066, 11.7563,
        11.9687, 12.3939, 31,
      ],
    ],
    5: [
      ["Fragile Bone Shard", "Sturdy Bone Shard", "Fossilized Bone Shard"],
      [
        2.6898, 2.7739, 3.1279, 6.4094, 9.4195, 10.1632, 10.9066, 11.7563,
        11.9687, 12.3939, 76,
      ],
    ],
    6: [
      ["Chaos Gear", "Chaos Axis", "Chaos Oculus"],
      [
        1.3449, 1.387, 1.564, 3.2047, 4.7098, 5.0816, 5.4533, 5.8782, 5.9845,
        6.197, 214,
      ],
    ],
    7: [
      ["Dismal Prism", "Crystal Prism", "Polarizing Prism"],
      [
        2.6898, 2.7739, 3.1279, 6.4094, 9.4195, 10.1632, 10.9066, 11.7563,
        11.9687, 12.3939, 39,
      ],
    ],
    8: [
      ["Concealed Claw", "Concealed Unguis", "Concealed Talon"],
      [
        1.3449, 1.387, 1.564, 3.2047, 4.7098, 5.0816, 5.4533, 5.8782, 5.9845,
        6.197, 86,
      ],
    ],
    9: [
      ["Gloomy Statuette", "Dark Statuette", "Deathly Statuette"],
      [
        3.3623, 3.4674, 3.9099, 8.0119, 11.7741, 12.7041, 13.6335, 14.6962,
        14.9617, 15.4934, 13,
      ],
    ],
    10: [
      [
        "Inactivated Fungal Nucleus",
        "Dormant Fungal Nucleus",
        "Robust Fungal Nucleus",
      ],
      [
        0.538, 0.5548, 0.6256, 1.2818, 1.8831, 2.0322, 2.1809, 2.3509, 2.3933,
        2.4782, 1185,
      ],
    ],
    11: [
      ["Chaos Storage", "Chaos Module", "Chaos Bolt"],
      [
        2.0173, 2.0804, 2.3459, 4.8072, 7.0643, 7.6222, 8.1796, 8.817, 8.9763,
        9.2953, 51,
      ],
    ],
    12: [
      ["Damaged Prism", "Turbid Prism", "Radiant Prism"],
      [
        1.3449, 1.387, 1.564, 3.2047, 4.7098, 5.0816, 5.4533, 5.8782, 5.9845,
        6.197, 158,
      ],
    ],
    13: [
      ["Desiccated Shell", "Sturdy Shell", "Marked Shell"],
      [
        3.3623, 3.4674, 3.9099, 8.0119, 11.7741, 12.7041, 13.6335, 14.6962,
        14.9617, 15.4934, 23,
      ],
    ],
    14: [
      [
        "A Flower Yet to Bloom",
        "Treasured Flower",
        "Wanderer's Blooming Flower",
      ],
      [
        2.6898, 2.7739, 3.1279, 6.4094, 9.4195, 10.1632, 10.9066, 11.7563,
        11.9687, 12.3939, 70,
      ],
    ],
    15: [
      [
        "Drop of Tainted Water",
        "Scoop of Tainted Water",
        "Newborn Tainted Hydro Phantasm",
      ],
      [
        2.6898, 2.7739, 3.1279, 6.4094, 9.4195, 10.1632, 10.9066, 11.7563,
        11.9687, 12.3939, 44,
      ],
    ],
    16: [
      ["Rift Core", "Foreign Synapse", "Alien Life Core"],
      [
        2.0173, 2.0804, 2.3459, 4.8072, 7.0643, 7.6222, 8.1796, 8.817, 8.9763,
        9.2953, 28,
      ],
    ],
    17: [
      [
        "Old Operative's Pocket Watch",
        "Operative's Standard Pocket Watch",
        "Operative's Constancy",
      ],
      [
        2.6898, 2.7739, 3.1279, 6.4094, 9.4195, 10.1632, 10.9066, 11.7563,
        11.9687, 12.3939, 20,
      ],
    ],
    18: [
      ["Feathery Fin", "Lunar Fin", "Chasmlight Fin"],
      [
        2.0173, 2.0804, 2.3459, 4.8072, 7.0643, 7.6222, 8.1796, 8.817, 8.9763,
        9.2953, 39,
      ],
    ],
    19: [
      ["Ruined Hilt", "Splintered Hilt", "Still-Smoldering Hilt"],
      [
        2.6898, 2.7739, 3.1279, 6.4094, 9.4195, 10.1632, 10.9066, 11.7563,
        11.9687, 12.3939, 25,
      ],
    ],
    20: [
      [
        "Shard of a Shattered Will",
        "Locus of a Clear Will",
        "Sigil of a Striding Will",
      ],
      [
        4.5728, 4.7157, 5.3176, 10.7737, 15.9179, 17.1828, 18.5375, 19.9818,
        20.3426, 21.064, 25,
      ],
    ],
    21: [
      ["Ignited Stone", "Ignited Seed of Life", "Ignited Seeing Eye"],
      [
        1.9097, 2.0779, 2.7862, 6.5156, 10.3838, 11.8421, 13.3151, 15.0143,
        15.4393, 16.289, 26,
      ],
    ],
    22: [
      [
        "Axis of the Secret Source",
        "Sheath of the Secret Source",
        "Heart of the Secret Source",
      ],
      [
        2.8145, 2.8793, 3.246, 6.8165, 10.1795, 11.1094, 12.0395, 13.1022,
        13.3679, 13.8993, 37,
      ],
    ],
    23: [
      ["Refractive Bud", "Bewildering Broadleaf", "Illusory Leafcoil"],
      [
        3.1521, 3.2524, 3.6887, 7.6133, 11.2426, 12.1727, 13.1022, 14.1651,
        14.4306, 14.962, 60,
      ],
    ],
    24: [
      ["Cold-Cracked Shellshard", "Warm Back-Shell", "Blazing Prismshell"],
      [
        5.4683, 5.6187, 6.2207, 12.5216, 18.1773, 19.441, 20.7019, 22.1391,
        22.4974, 23.2142, 11,
      ],
    ],
    25: [
      ["Frostnight's Glimmer", "Frostnight's Glow", "Frostnight's Glory"],
      [
        5.3486, 5.4592, 5.9019, 11.5969, 16.5556, 17.4852, 18.4148, 19.4774,
        19.7431, 20.2744, 39,
      ],
    ],
    26: [
      ["Lightless Bone", "Glowing Remains", "Radiant Exoskeleton"],
      [
        5.3486, 5.4592, 5.9019, 11.5969, 16.5556, 17.4852, 18.4148, 19.4774,
        19.7431, 20.2744, 28,
      ],
    ],
    27: [
      ["Mistshroud Manifestation", "Mistshroud Plate", "Mistshroud Helmet"],
      [
        2.0173, 2.0804, 2.3459, 4.8072, 7.0643, 7.6222, 8.1796, 8.817, 8.9763,
        9.2953, 54,
      ],
    ],
    28: [
      [
        "Fractured Eye of the Deep Shadow",
        "Aberrant Core of the Deep Shadow",
        "Hooked Beak of the Deep Shadow",
      ],
      [
        2.0173, 2.0804, 2.3459, 4.8072, 7.0643, 7.6222, 8.1796, 8.817, 8.9763,
        9.2953, 31,
      ],
    ],
    29: [
      ["Faded Flaming Hilt", "Fractured Flaming Hilt", "Jeweled Flaming Hilt"],
      [
        2.8145, 2.8793, 3.246, 6.8165, 10.1795, 11.1094, 12.0395, 13.1022,
        13.3679, 13.8993, 45,
      ],
    ],
    30: [
      ["Fractured Lunar Iron", "Depleted Lunar Iron", "Unblemished Lunar Iron"],
      [
        2.6898, 2.7739, 3.1279, 6.4094, 9.4195, 10.1632, 10.9066, 11.7563,
        11.9687, 12.3939, 35,
      ],
    ],
    31: [
      ["Accreted Fragment", "Accreted Mass", "Accreted Growth"],
      [
        2.0173, 2.0804, 2.3459, 4.8072, 7.0643, 7.6222, 8.1796, 8.817, 8.9763,
        9.2953, 50,
      ],
    ],
    32: [
      ["Hollow Root of Life", "Sprout Node of Life", "Coiled Core of Life"],
      [
        2.0173, 2.0804, 2.3459, 4.8072, 7.0643, 7.6222, 8.1796, 8.817, 8.9763,
        9.2953, 50,
      ],
    ],
  };

  let data = "";

  if (parameter === "stones") data = stones;
  if (parameter === "weaponMaterials") data = weaponMaterials;
  if (parameter === "talentMaterials") data = talentMaterials;
  if (parameter === "commonEnemies") data = commonEnemies;
  if (parameter === "eliteEnemies") data = eliteEnemies;
  if (parameter === "specialty") data = specialty;
  if (parameter === "boss") data = boss;
  if (parameter === "weekBoss") data = weekBoss;
  if (parameter === "commonEnemiesData") data = commonEnemiesData;
  if (parameter === "eliteEnemiesData") data = eliteEnemiesData;
  if (parameter === "special") data = special;
  if (parameter === "all") {
    let all = [
      "Mora",
      "Hero's Wit",
      "Adventurer's Experience",
      "Wanderer's Advice",
      "Mystic Enhancement Ore",
      "Fine Enhancement Ore",
      "Enhancement Ore",
      "Crown of Insight",
    ];

    for (let i = 2; i < eliteEnemies.length; i += 3) {
      all.push(eliteEnemies[i]);
      all.push(eliteEnemies[i - 1]);
      all.push(eliteEnemies[i - 2]);
    }

    for (let i = 2; i < commonEnemies.length; i += 3) {
      all.push(commonEnemies[i]);
      all.push(commonEnemies[i - 1]);
      all.push(commonEnemies[i - 2]);
    }

    all = [...all, ...weekBoss, ...special, ...boss];

    for (let i = 3; i < stones.length; i += 4) {
      all.push(stones[i]);
      all.push(stones[i - 1]);
      all.push(stones[i - 2]);
      all.push(stones[i - 3]);
    }

    for (let i = 2; i < talentMaterials.length; i += 3) {
      all.push(talentMaterials[i]);
      all.push(talentMaterials[i - 1]);
      all.push(talentMaterials[i - 2]);
    }

    for (let i = 3; i < weaponMaterials.length; i += 4) {
      all.push(weaponMaterials[i]);
      all.push(weaponMaterials[i - 1]);
      all.push(weaponMaterials[i - 2]);
      all.push(weaponMaterials[i - 3]);
    }

    let specialtyKeys = Object.keys(specialty);

    all = [...all, ...specialtyKeys];

    data = all;
  }

  if (parameter === "all-normal") {
    let all = [
      "Mora",
      "Wanderer's Advice",
      "Adventurer's Experience",
      "Hero's Wit",
      "Enhancement Ore",
      "Fine Enhancement Ore",
      "Mystic Enhancement Ore",
      "Crown of Insight",
    ];

    all = [
      ...eliteEnemies,
      ...commonEnemies,
      ...all,
      ...weekBoss,
      ...special,
      ...boss,
      ...stones,
      ...talentMaterials,
      ...weaponMaterials,
    ];

    let specialtyKeys = Object.keys(specialty);

    all = [...all, ...specialtyKeys];

    data = all;
  }

  return data;
}
