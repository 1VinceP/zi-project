DROP TABLE IF EXISTS zoids;

CREATE TABLE zoids
(
    id SERIAL PRIMARY KEY,
    designation TEXT,
    name TEXT,
    size TEXT, -- Lightweight ( armor 0-750 ), Middleweight ( armor 800-1550 ), Heavyweight ( armor 1600+ )
    price INTEGER,
    movementType TEXT, -- ground, air, water
    speed FLOAT, -- Amount of energy required to move 1 space
    energy INTEGER,
    armor INTEGER,
    w1 TEXT,
    w2 TEXT,
    w3 TEXT,
    w4 TEXT,
    w5 TEXT,
    e1 TEXT,
    e2 TEXT,
    e3 TEXT,
    e4 TEXT,
    e5 TEXT
);

INSERT INTO zoids
    ( designation, name, size, price, movementType, speed, energy, armor, w1, w2, w3, w4, w5, e1, e2, e3, e4, e5 )
    VALUES
    ------------------------------- LIGHTWEIGHT
        -- GUN SNIPER
        ( 'RZ-030', 'Gun Sniper', 'Lightweight', 10000, 'ground', 1, 3, 600,
        'Strike Anchor Claw','AZ 144mm Sniper Rifle', '8-Shot Missile Pods', 'Wrist Repeaters', null,
        'Precision Targeting Suite', 'Booster', 'Air Radar Antenna', null, null ),
        -- REV RAPTOR
        ( 'EZ-027', 'Rev Raptor', 'Lightweight', 9000, 'ground', 1, 3, 600,
        'Hyper Claws', 'Twin Scythe Cutters', 'Wrist Repeaters', null, null,
        'Booster', null, null, null, null ),
        -- SHADOW FOX
        ( 'RZ-046', 'Shadow Fox', 'Lightweight', 14000, 'ground', 1, 3, 700,
        'E. Bite Fangs', 'Strike Laser Claws', 'AZ 30mm AP Vulcan', 'AZ 70mm EM Net Gun', null,
        'Optical Camouflage', 'Smoke Discharger', 'Sensor Dampening Suite', 'Advanced Tracking Suite', null ),
    ------------------------------- MIDDLEWEIGHT
        -- BLADE LIGER
        ( 'RZ-028', 'Blade Liger', 'Middleweight', 15000, 'ground', 1, 2, 1200,
        'Laser Sabers', 'Laser Blades', 'Dual Shock Cannon', 'Pulse Laser Gun', null,
        'Booster', 'E Shield', 'Tracking Suite', null, null ),
        -- LIGHTNING SAIX
        ( 'EZ-035', 'Lightning Saix', 'Middleweight', 16000, 'ground', 1, 3, 1000,
        'Laser Killer Fangs', 'Hardened Alloy Claws', 'Mini Vulcan', 'Pulse Laser Rifles', null,
        'Interceptor Booster', null, null, null, null ),
        -- ZABER FANG
        ( 'EZ-016', 'Zaber Fang', 'Middleweight', 12500, 'ground', 1, 2, 1250,
        'Killer Sabers', 'Hardened Alloy Claws', 'AZ 30mm Double Barrel Beam Cannon', 'Triple Shock Cannon', 'AZ 20mm Beam Gun',
        'Tracking Suite', null, null, null, null  ),
    ------------------------------- HEAVYWEIGHT
        -- Cannon Tortoise
        ( 'RZ-013', 'Cannon Tortoise', 'Heavyweight', 20000, 'ground', 2, 2, 2000,
        'Artillery Cannon', 'Double Barrel Machine Guns', null, null, null,
        'Precision Targeting Suite', null, null, null, null ),
        -- IRON KONG Mk I
        ( 'EZ-015', 'Iron Kong Mk I', 'Heavyweight', 30000, 'ground', 2, 2, 2600,
        'Hammer Fists', '6-Shot Missile Launcher', '10-Shot Guided Rocket Bomb Launcher', '2-Shot Tactical S-SM Launcher', null,
        null, null, null, null, null ),
        -- RED HORN
        ( 'EZ-004', 'Red Horn', 'Heavyweight', 18000, 'ground', 1.5, 2, 1800,
        'Crasher Horn', '80mm S-A Double Beam Cannon', '8-Shot S-SM Pod', 'AZ 20mm Gatling Gun', 'Sulfuric Acid Powder Cannon','Tracking Suite', 'Air Radar Antenna', 'IR Laser Searcher', null, null );