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
  ];

  const specialty = {
    Wolfhook: 35,
    Valberry: 21,
    Cecilia: 37,
    "Windwheel Aster": 73,
    "Philanemo Mushroom": 53,
    "Small Lamp Grass": 77,
    "Calla Lily": 53,
    "Dandelion Seed": 56,
    "Jueyun Chili": 53,
    "Noctilucous Jade": 55,
    "Silk Flower": 17,
    "Glaze Lily": 50,
    Qingxin: 175,
    Starconch: 80,
    Violetgrass: 237,
    "Cor Lapis": 169,
    "Clearwater Jade": 67,
    Onikabuto: 79,
    "Sakura Bloom": 75,
    "Crystal Marrow": 66,
    Dendrobium: 55,
    "Naku Weed": 132,
    "Sea Ganoderma": 159,
    "Sango Pearl": 44,
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
    "Beryl Conch": 105,
    "Romaritime Flower": 120,
    "Lumidouce Bell": 30,
    "Rainbow Rose": 81,
    Lumitoile: 78,
    "Lakelight Lily": 79,
    "Subdetection Unit": 72,
    "Spring of the First Dewdrop": 74,
    "Sprayfeather Gill": 83,
    "Brilliant Chrysanthemum": 91,
    "Quenepa Berry": 43,
    "Saurian Claw Succulent": 90,
    "Glowing Hornshroom": 72,
    "Withering Purpurbloom": 80,
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
  ];

  const commonEnemiesData = {
    0: [
      ["Slime Condensate", "Slime Secretions", "Slime Concentrate"],
      [0.3437, 0.3664, 0.4004, 0.8021, 0.8837, 1.2866, 1.4231, 1.5044, 1.5317, 1.5861, 1347],
    ],
    1: [
      ["Damaged Mask", "Stained Mask", "Ominous Mask"],
      [0.2149, 0.229, 0.2503, 0.5011, 0.5523, 0.8038, 0.8893, 0.9399, 0.9573, 0.9914, 2070],
    ],
    2: [
      ["Divining Scroll", "Sealed Scroll", "Forbidden Curse Scroll"],
      [1.289, 1.3739, 1.5015, 3.0084, 3.3144, 4.8261, 5.3366, 5.6421, 5.7441, 5.9481, 226],
    ],
    3: [
      ["Firm Arrowhead", "Sharp Arrowhead", "Weathered Arrowhead"],
      [0.4338, 0.4623, 0.5053, 1.0082, 1.1107, 1.6155, 1.7859, 1.888, 1.9223, 1.9906, 586],
    ],
    4: [
      ["Recruit's Insignia", "Sergeant's Insignia", "Lieutenant's Insignia"],
      [2.1483, 2.2898, 2.5025, 5.0139, 5.5242, 8.044, 8.8942, 9.4031, 9.5737, 9.9139, 260],
    ],
    5: [
      ["Treasure Hoarder Insignia", "Silver Raven Insignia", "Golden Raven Insignia"],
      [0.6445, 0.687, 0.7508, 1.5043, 1.6575, 2.4132, 2.6684, 2.8207, 2.8722, 2.9745, 523],
    ],
    6: [
      ["Whopperflower Nectar", "Shimmering Nectar", "Energy Nectar"],
      [2.1483, 2.2898, 2.5025, 5.0139, 5.5242, 8.044, 8.8942, 9.4031, 9.5737, 9.9139, 245],
    ],
    7: [
      ["Old Handguard", "Kageuchi Handguard", "Famed Handguard"],
      [0.4338, 0.4623, 0.5053, 1.0082, 1.1107, 1.6155, 1.7859, 1.888, 1.9223, 1.9906, 246],
    ],
    8: [
      ["Spectral Husk", "Spectral Heart", "Spectral Nucleus"],
      [0.6445, 0.687, 0.7508, 1.5043, 1.6575, 2.4132, 2.6684, 2.8207, 2.8722, 2.9745, 174],
    ],
    9: [
      ["Fungal Spores", "Luminescent Pollen", "Crystalline Cyst Dust"],
      [0.4338, 0.4623, 0.5053, 1.0082, 1.1107, 1.6155, 1.7859, 1.888, 1.9223, 1.9906, 1110],
    ],
    10: [
      ["Faded Red Satin", "Trimmed Red Silk", "Rich Red Brocade"],
      [0.5371, 0.5724, 0.6256, 1.2535, 1.3811, 2.0104, 2.2235, 2.3509, 2.3933, 2.4782, 749],
    ],
    11: [
      ["Transoceanic Pearl", "Transoceanic Chunk", "Xenochromatic Crystal"],
      [0.4338, 0.4623, 0.5053, 1.0082, 1.1107, 1.6155, 1.7859, 1.888, 1.9223, 1.9906, 994],
    ],
    12: [
      ["Meshing Gear", "Mechanical Spur Gear", "Artificed Dynamic Gear"],
      [0.6445, 0.687, 0.7508, 1.5043, 1.6575, 2.4132, 2.6684, 2.8207, 2.8722, 2.9745, 314],
    ],
    13: [
      ["Juvenile Fang", "Seasoned Fang", "Tyrant's Fang"],
      [0.4338, 0.4623, 0.5053, 1.0082, 1.1107, 1.6155, 1.7859, 1.888, 1.9223, 1.9906, 717],
    ],
    14: [
      [
        "Sentry's Wooden Whistle",
        "Warrior's Metal Whistle",
        "Saurian-Crowned Warrior's Golden Whistle",
      ],
      [0.6445, 0.687, 0.7508, 1.5043, 1.6575, 2.4132, 2.6684, 2.8207, 2.8722, 2.9745, 326],
    ],
  };

  const eliteEnemiesData = {
    0: [
      ["Heavy Horn", "Black Bronze Horn", "Black Crystal Horn"],
      [0.8056, 0.8587, 0.9385, 1.8801, 2.0716, 3.0168, 3.336, 3.5269, 3.5912, 3.7189, 365],
    ],
    1: [
      ["Dead Ley Line Branch", "Dead Ley Line Leaves", "Ley Line Sprout"],
      [1.1413, 1.2165, 1.3295, 2.6636, 2.9349, 4.2729, 4.725, 4.9954, 5.0859, 5.2665, 156],
    ],
    2: [
      ["Chaos Device", "Chaos Circuit", "Chaos Core"],
      [1.3427, 1.4312, 1.5641, 3.1335, 3.4527, 5.0282, 5.5596, 5.8781, 5.9845, 6.197, 144],
    ],
    3: [
      ["Mist Grass Pollen", "Mist Grass", "Mist Grass Wick"],
      [2.6854, 2.8623, 3.1282, 6.2671, 6.9053, 10.0566, 11.1191, 11.7559, 11.9687, 12.3939, 45],
    ],
    4: [
      ["Hunter's Sacrificial Knife", "Agent's Sacrificial Knife", "Inspector's Sacrificial Knife"],
      [2.6854, 2.8623, 3.1282, 6.2671, 6.9053, 10.0566, 11.1191, 11.7559, 11.9687, 12.3939, 30],
    ],
    5: [
      ["Fragile Bone Shard", "Sturdy Bone Shard", "Fossilized Bone Shard"],
      [2.6854, 2.8623, 3.1282, 6.2671, 6.9053, 10.0566, 11.1191, 11.7559, 11.9687, 12.3939, 71],
    ],
    6: [
      ["Chaos Gear", "Chaos Axis", "Chaos Oculus"],
      [1.3427, 1.4312, 1.5641, 3.1335, 3.4527, 5.0282, 5.5596, 5.8781, 5.9845, 6.197, 199],
    ],
    7: [
      ["Dismal Prism", "Crystal Prism", "Polarizing Prism"],
      [2.6854, 2.8623, 3.1282, 6.2671, 6.9053, 10.0566, 11.1191, 11.7559, 11.9687, 12.3939, 37],
    ],
    8: [
      ["Concealed Claw", "Concealed Unguis", "Concealed Talon"],
      [1.3427, 1.4312, 1.5641, 3.1335, 3.4527, 5.0282, 5.5596, 5.8781, 5.9845, 6.197, 63],
    ],
    9: [
      ["Gloomy Statuette", "Dark Statuette", "Deathly Statuette"],
      [3.3568, 3.5779, 3.9103, 7.8342, 8.6316, 12.5703, 13.8993, 14.6956, 14.962, 15.4934, 13.56],
    ],
    10: [
      ["Inactivated Fungal Nucleus", "Dormant Fungal Nucleus", "Robust Fungal Nucleus"],
      [0.5371, 0.5724, 0.6256, 1.2535, 1.3811, 2.0104, 2.2235, 2.3509, 2.3933, 2.4782, 1110],
    ],
    11: [
      ["Chaos Storage", "Chaos Module", "Chaos Bolt"],
      [2.014, 2.1467, 2.3461, 4.7006, 5.1791, 7.542, 8.3389, 8.8165, 8.9764, 9.2953, 50],
    ],
    12: [
      ["Damaged Prism", "Turbid Prism", "Radiant Prism"],
      [1.3427, 1.4312, 1.5641, 3.1335, 3.4527, 5.0282, 5.5596, 5.8781, 5.9845, 6.197, 128],
    ],
    13: [
      ["Desiccated Shell", "Sturdy Shell", "Marked Shell"],
      [3.3568, 3.5779, 3.9103, 7.8342, 8.6316, 12.5703, 13.8993, 14.6956, 14.962, 15.4934, 21],
    ],
    14: [
      ["A Flower Yet to Bloom", "Treasured Flower", "Wanderer's Blooming Flower"],
      [2.6854, 2.8623, 3.1282, 6.2671, 6.9053, 10.0566, 11.1191, 11.7559, 11.9687, 12.3939, 47],
    ],
    15: [
      ["Drop of Tainted Water", "Scoop of Tainted Water", "Newborn Tainted Hydro Phantasm"],
      [2.6854, 2.8623, 3.1282, 6.2671, 6.9053, 10.0566, 11.1191, 11.7559, 11.9687, 12.3939, 43],
    ],
    16: [
      ["Rift Core", "Foreign Synapse", "Alien Life Core"],
      [1.114, 1.2467, 2.3461, 4.7006, 5.1791, 7.542, 8.3389, 8.8165, 8.9764, 9.2953, 27],
    ],
    17: [
      [
        "Old Operative's Pocket Watch",
        "Operative's Standard Pocket Watch",
        "Operative's Constancy",
      ],
      [2.6854, 2.8623, 3.1282, 6.2671, 6.9053, 10.0566, 11.1191, 11.7559, 11.9687, 12.3939, 20],
    ],
    18: [
      ["Feathery Fin", "Lunar Fin", "Chasmlight Fin"],
      [1.114, 1.2467, 2.3461, 4.7006, 5.1791, 7.542, 8.3389, 8.8165, 8.9764, 9.2953, 33],
    ],
    19: [
      ["Ruined Hilt", "Splintered Hilt", "Still-Smoldering Hilt"],
      [2.6854, 2.8623, 3.1282, 6.2671, 6.9053, 10.0566, 11.1191, 11.7559, 11.9687, 12.3939, 25],
    ],
    20: [
      ["Shard of a Shattered Will", "Locus of a Clear Will", "Sigil of a Striding Will"],
      [2.6854, 2.8623, 3.1282, 6.2671, 6.9053, 10.0566, 11.1191, 11.7559, 11.9687, 12.3939, 22],
    ],
    21: [
      ["Ignited Stone", "Ignited Seed of Life", "Ignited Seeing Eye"],
      [2.6854, 2.8623, 3.1282, 6.2671, 6.9053, 10.0566, 11.1191, 11.7559, 11.9687, 12.3939, 14],
    ],
    22: [
      ["Axis of the Secret Source", "Sheath of the Secret Source", "Heart of the Secret Source"],
      [2.6854, 2.8623, 3.1282, 6.2671, 6.9053, 10.0566, 11.1191, 11.7559, 11.9687, 12.3939, 16],
    ],
    23: [
      ["Refractive Bud", "Bewildering Broadleaf", "Illusory Leafcoil"],
      [2.6854, 2.8623, 3.1282, 6.2671, 6.9053, 10.0566, 11.1191, 11.7559, 11.9687, 12.3939, 43],
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
  if (parameter === "all") {
    let all = [
      "Mora",
      "Hero's Wit",
      "Adventurer's Experience",
      "Wanderer's Advice",
      "Mystic Enhancement Ore",
      "Fine Enhancement Ore",
      "Enhancement Ore",
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

    all = [...all, ...weekBoss, ...boss];

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
    ];

    all = [
      ...eliteEnemies,
      ...commonEnemies,
      ...all,
      ...weekBoss,
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
