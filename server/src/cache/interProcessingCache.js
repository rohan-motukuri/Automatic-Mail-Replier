const interProcessingCache = module.exports = {
    cache : {
        
    },

    addToCache : function (thread_id, now = new Date()) {
        this.cache[thread_id] = now;
    },

    removeFromCache : function (thread_id) {
        delete this.cache[thread_id];
    },

    exists : function (thread_id) {
        if(this.cache[thread_id]) {
            return true;
        }

        return false;
    }
};