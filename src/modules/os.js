const os = require("os");
const log = require("../helpers/log");

log.title("System");
log.info(`${os.type()} ${os.arch()}`);
log.info(`${os.cpus().length} CPUS`);
log.info(`Platform: ${os.platform()}`);
//log.info(os.release());
//log.info(os.userInfo());
