
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
			var Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: (s) => s.structureType == STRUCTURE_CONTAINER
			&& s.store[RESOURCE_ENERGY] > creep.carryCapacity
		    });
            if(!(Container === null)) {
                if (creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Container)
                }
            } else {
                var sources = creep.pos.findClosestByPath(FIND_SOURCES);
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
	    }
	}
};

module.exports = roleBuilder;