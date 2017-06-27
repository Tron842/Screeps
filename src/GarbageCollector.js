/**
 * Clears memory of creeps regularly
 * Created by brody on 2017-06-23.
 */

var GarbageCollector = {

    run : function() {

        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }


    }


};

module.exports = GarbageCollector;