const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("message", (arg) => {
  console.log("message : ", arg);
});

module.exports = emitter;
