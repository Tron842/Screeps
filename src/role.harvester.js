
//var profiler = require('screeps-profiler');


Creep.prototype.taskharvest = function(creep) {
        creep.room.find(FIND_MINERALS);
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER ) && structure.energy < structure.energyCapacity
                                ||
                                (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                    }
            });
            if(!(targets === null)) {
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                creep.moveTo(Game.flags.Idel)
            }
        }
	};

//module.exports = roleHarvester;


//console.log("asking to be profiled: Harvester");
//profiler.registerObject(roleHarvester, 'roleHarvester');