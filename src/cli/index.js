const readline = require("readline");
const log = require("../helpers/log");
const commands = require("./commands");

const cli = {};

cli.commands = {};

cli.init = function () {
  log.title("CLI");

  const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ">",
  });

  interface.prompt();

  interface.on("line", function (str) {
    cli.process(str);
    interface.prompt();
  });

  interface.on("close", function () {
    process.exit(0);
  });
};

cli.process = function (command) {
  log.info(`Processing command : ${command}`);
  const foundCommand = commands.find((c) => c === command);
  if (!foundCommand) {
    log.error(`Command not found...`);
    return;
  }

  cli.commands[String(command)]();
};

// Commands part
//////////////////////////////////////////////

cli.commands.exit = function () {
  log.success("Je quitte le navire ! Bye Bye");
};

module.exports = cli;
