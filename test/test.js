const PoolClient = require('..');
let c = new PoolClient('mine.durinsmine.com', 5555);
console.log('connecting pool client...');
c.on('connect', () => {
    console.log('pool client connected');
    c.login('Wms9U6et45NbXWfJmPVRVK3xQKnXnGcKJZRgv6A5cUPji6kLhL17aEW8ZMUbhzzYq8K2paEDg6WyDEgsm8yQg3nn2P8PCkbCP',
        'x');
});