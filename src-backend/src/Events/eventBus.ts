const EventEmitter = require('events');
const emitter = new EventEmitter();

//
// emitter.on('mediaDiscovered', function (data: any) {
//   emitter.emit('notifyFront', data)
// });



module.exports = emitter;
