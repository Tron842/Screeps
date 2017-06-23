/**
 * Automatically replenishes creeps
 * Created by brody on 2017-06-23.
 */

var autospawn = {

    /** Spawns creeps as needed **/
    run: function() {

        var energy = 0;

        for(var name in Game.rooms) {
            energy = energy + Game.rooms[name].energyAvailable;
        }
        //console.log('Current energy ' + energy);

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        //console.log('Harvesters: ' + harvesters.length);

        if(harvesters.length < 2 && energy > 200) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
            console.log('Spawning new harvester: ' + newName);
        }
        else if(upgraders.length < 1 && energy > 200) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
            console.log('Spawning new upgrader: ' + newName);
        }
        else if(builders.length < 2 && energy > 200) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
            console.log('Spawning new builder: ' + newName);
        }

        if(Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }


    }
};

module.exports = autospawn;