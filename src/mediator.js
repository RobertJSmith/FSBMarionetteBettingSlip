const mediator = ((() => {
    const io = require('socket.io-client');
    /**
     * @description Subscribe to an event, supply a callback to be executed when that event is broadcast
     * @param store {string}
     * @param fn {function}
     * @returns {subscribe} {object}
     */ 
    const subscribe = function(store, fn) {
        if (!mediator.stores[store]) {
            mediator.stores[store] = [];
        }

        mediator.stores[store].push({
            context: this,
            callback: fn
        });

        return this;
    };

    /**
     * @description Publish/broadcast an event to the rest of the application
     * @param store {string}
     * @param args {object}
     * @returns {*||boolean}
     */
    const publish = function(store, ...args) {
        if (!mediator.stores[store]) {
            return false;
        }

        for (let value of mediator.stores[store]) {
            const subscription = value;
            subscription.callback.apply(subscription.context, args);
        }

        return this;
    };

    const listenToPort = function() {
        var socket = io('http://localhost:5000/');
        socket.on('selections', data => {
            console.log('Mediator publish: ', data.type, data.timestamp);
            publish(data.type, data.selections);
        });
    }

    return {
        stores: {},
        listenToPort,
        publish,
        subscribe,
        installTo(obj) {
            obj.subscribe = subscribe;
            obj.publish = publish;
        }
    };
})());

export default mediator;