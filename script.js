//FIRST RUN
$("document").ready(function(){
    displayHeroes();
    selectEnemy();
    displayStats();    
    hasPicked();  
});


//List Global Variables
var gameLoop = false;
var enemies = ['Phantom','Ddosser','Kronos'];
var picked = false;
var enemyHero;
//Item Armor Leather 
var LeatherArmor = [
    {item: ["HelmofLeather",
            2, //armor
            1  //weight
    ]},
    {item: ["ChestplateofLeather",
            2, //armor
            1  //weight
    ]},
    {item: ["ClothBracers",
            2, //armor
            1  //weight
    ]},
    {item: ["LeggingsofLeather",
            2, //armor
            1  //weight
    ]},
    {item: ["LeggingsofLeather",
            2, //armor
            1  //weight
    ]}
];

var HelmofLeather = [
    {armor: 2},
    {weight: 2}
];
var ChestplateofLeather = [
    {armor: 2},
    {weight: 3}
];
var ClothBracers = [
    {armor: 1},
    {weight: 1}
];
var LeggingsofLeather = [
    {armor: 2},
    {weight: 2}
];
var LeatherBoots = [
    {armor: 2},
    {weight: 3}
];
//Item Armor weaved leather armor
var HelmofWeavedLeather = [
    {armor: 3},
    {weight: 2}
];
var ChestplateofWeavedLeather = [
    {armor: 3},
    {weight: 3}
];
var LeatherWeavedBracers = [
    {armor: 2},
    {weight: 1}
];
var LeatherWeavedLeggings = [
    {armor: 3},
    {weight: 2}
];
var LeatherWeavedBoots = [
    {armor: 3},
    {weight: 3}
];
//Item Armor Light Steel 0:Chestplate 1:Bracers 2:Leggings 3:boots
var LightSteelArmor = [ 
    {item: ["ChestplateofLightSteel",
            3,//armor
            4,//weight
    ]},
    {item: ["LightSteelBracers",
            3,//armor
            2,//weight
    ]},
    {item: ["LightSteelLeggings",
            2,
            2,
    ]},
    {item: ["LightSteelBoots",
            2,
            3,
    ]},
]
//Item Weapon Wood
var WoodWeapons = [
    {item: ["WoodenShiv",
            5,//Damage
            ""//
    ]},
];
var WoodenShiv = [
    {damage: 5},
    {weight: 1}
];
var WoodenSword = [
    {damage: 7},
    {weight: 1}
];
var WoodenPike = [
    {damage: 8},
    {weight: 1}
];
//Item Weapon Light Steel
var LightSteelShiv = [
    {damage: 5},
    {weight: 1}
];
var LightSteelSword = [
    {damage: 7},
    {weight: 1}
];
var LightSteelPike = [
    {damage: 8},
    {weight: 1}
];
//Item Consumeable Variables
var SmallHealthPotion = [
    {health: 5},
    {weight: 0}
];


//Enemy Variables
var enemyHero;
var enemyArmor;
var enemyDamage;
var enemyHealth;
//Enemy Inventory Object
var enemyInventory = [];

//Hero Variables
var hero;
var heroDiv;
var heroes = ['Phantom','Ddosser','Kronos'];
var lives = 10;
var damage = 0;
var armor = 0;
var health = "Select a Hero!!";
var weight = 0;

//Inventory object
var inventory = [
    helmet = HelmofLeather,//0
    chestplate = ChestplateofLeather,//1
    bracers = ClothBracers,//2
    sword = WoodenShiv,
    leggings = LeggingsofLeather,
    shoes = LeatherBoots
]

//Compute Stats function
function computeStats(){
    damage = inventory[3][0];//Gets damage from weapon
    for(i = 0; i < inventory.length; i++){
        weight += (inventory[i][1]);
        armor += (inventory[i][0]);
    }
}

//List Hero Objects
var enemyHeroes = [
    {hero: ["Phantom", 
        "12", 
        "25",
        "1"
    ]},
    {hero: ["Ddosser", 
        "12", 
        "25",
        "1"
    ]},
    {hero: ["Kronos", 
        "8", 
        "35",
        "2"
    ]},
]
var Phantom = {
    damage:12,
    health:25,
    armor:1
}
var Ddosser = {
    damage:10,
    health:30,
    armor:3
}
var Kronos = {
    damage:8,
    health:35,
    armor:2
}

//Reset  The Game
$("#reset-game").on("click", function(){
    gameLoop = true;
    showStats();
    selectEnemy();
})

$("#fight").click(function(){
    fight();
})

function fight(){
    health = ((health - enemyDamage) + armor);
    enemyHealth = ((enemyHealth - (damage - enemyArmor )));
    console.log("HEALTH: " + health + '/n' + " ENEMY HP: " + enemyHealth);
    if(health < 0){
        alert("You Died!!");
    }
    else if(enemyHealth < 0){
        alert("You Defeated the Enemy!!")
        resetStats();
        selectEnemy();
        displayStats();
    }
  
    console.log("Enemy Armor " + (enemyArmor));
    console.log("Damage Inflicted " + (damage - enemyArmor));
    console.log("Enemy Health " + (enemyHealth - damage - enemyArmor));
    
    displayStats();
}


//update health to dom
function resetStats(){
    hero = 0;
    damage = 0;
    armor = 0;
    health = "Select a Hero!!";
}
function displayStats(){
   // $("#userStats").css("background-image","url('./assets/phantom.jpg'")
    $("#name").html("Name: " + hero);
    $("#health").html("Health: " + health);
    $("#damage").html("Damage: " + damage);
    $("#armor").html("Armor " + armor);
    $("#enemyName").html("Enemy Name: " + enemyName)
    $("#enemyHealth").html("Enemy Health: " + enemyHealth);   
    $("#enemyDamage").html("Enemy Damage: " + enemyDamage);
    $("#enemyArmor").html("Enemy Armor " + enemyArmor);
}

function selectHero(hero){
    damage = this.damage;
    health = this.health;
    armor = this.armor;
}
function selectEnemy(){
    enemyHero = getRandomInt(0,enemyHeroes.length);
    enemyHero = enemyHeroes[enemyHero].hero;
    enemyName = enemyHero[0];
    enemyDamage = enemyHero[1];
    enemyHealth = enemyHero[2];
    enemyArmor = enemyHero[3];
    displayStats();
}

function hasPicked(){
    if(picked === false){
    $("#reset-game").prop('disabled', true);
    $("#fight").prop('disabled', true);
    }else{
    $("#reset-game").prop('disabled', false);
    $("#fight").attr('disabled', false);
    }
}
function clickHero(){
            //Handle Hero Selection
    $("#Phantom").click(function(){
        damage = Phantom.damage;
        health = Phantom.health;
        armor = Phantom.armor;
        console.log('Phantom');
        picked = true;
        hero = "Phantom";
        displayStats();
        hasPicked();
    })
    $("#Ddosser").click(function(){
        damage = Ddosser.damage;
        health = Ddosser.health;
        armor = Ddosser.armor;
        console.log('Ddosser');
        hero = "Ddosser";
        picked = true;
        displayStats();
        hasPicked();
    })
    $("#Kronos").click(function(){
        damage = Kronos.damage;
        health = Kronos.health;
        armor = Kronos.armor;
        hero = "Kronos";
        console.log('Kronos');
        picked = true;
        displayStats(); 
        hasPicked();
    })
}
function displayHeroes(){
    for(i = 0; i < heroes.length; i++){ 
        heroDiv = $("<button id='" + heroes[i] + "' class='hero-div'>" + heroes[i] + "</button>");            
        $(".two").append(heroDiv);
    }
    clickHero();
}


function showStats(){
    console.log("Lives Remaining: " + lives);
    console.log("Health: " + health);
    console.log("Armor: " + armor);
    console.log("Damage: " + damage);
   // console.log("hero: " + hero);
}
function lifeChecker(){
        if(lives <= 0){
            gameLoop = false;
            alert("YOU ARE OUT OF LIVES");
            lives = 10;
        }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
