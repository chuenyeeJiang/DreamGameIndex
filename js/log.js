/*
  日志
 */
logStart.logType = {
    "NONE": 0,
    "ERROR": 1,
    "WARN": 2,
    "INFO" : 3,
    "DEBUG": 4
};

function logStart(level){

    var now = new Date;
    this.level = level ;
    this.formatLocaltime =function () {
        now = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    };




    console.log("test :"+logStart.logType.INFO);

    this.log = function (msg,level){
        if(typeof msg === "string"){
            if(level <= this.level) {
                if(level ===  logStart.logType.ERROR ) {
                    console.log("%c"+now+" ERROR "+msg,"color:#a94442");
                }
                if(level ===  logStart.logType.WARN ) {
                    console.log("%c"+now+" WARN "+msg,"color:#8a6d3b");
                }
                if(level ===  logStart.logType.INFO) {
                    console.log("%c"+now+" INFO "+msg,"color:#3c763d" );
                }
                if(level ===  logStart.logType.DEBUG ) {
                    console.log("%c"+now+" DEBUG "+msg,"color:#31708f");
                }
            }
        }
    };
    this.error = function (msg) {
       this.log(msg,logStart.logType.ERROR);
    };
    this.warn = function (msg) {
        this.log(msg,logStart.logType.WARN);
    };
    this.info = function (msg) {
        this.log(msg,logStart.logType.INFO);
    };
    this.debug = function (msg) {
        this.log(msg,logStart.logType.DEBUG);
    };

}


