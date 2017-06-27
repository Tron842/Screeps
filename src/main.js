require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
require('role.repair');
var autospawn = require('autospawn');

// Any modules that you use that modify the game's prototypes should be require'd
// before you require the profiler.
const profiler = require('screeps-profiler');


// This line monkey patches the global prototypes.
profiler.enable();

module.exports.loop = function () {

    //console.log('profiler enabled = ' + profiler.getenable())

    profiler.wrap(function() {
        autospawn.run();

        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester') {
                creep.taskharvest(creep);
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'repair') {
                creep.taskrepair(creep);
            }
        }

        //console.log('profiler enabled (post) = ' + profiler.getenable())
        //console.log(Game.cache.drops)
    });
};