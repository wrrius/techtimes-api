"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runProxy = exports.runServices = exports.readConfigFile = void 0;
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var yaml_1 = __importDefault(require("yaml"));
var express_1 = __importDefault(require("express"));
var http_proxy_middleware_1 = require("http-proxy-middleware");
// reads and parses config file
var readConfigFile = function () {
    var file = fs_1.readFileSync(path_1.default.join(process.cwd(), 'sls-multi-gateways.yml'), 'utf8');
    return yaml_1.default.parse(file);
};
exports.readConfigFile = readConfigFile;
// runs each services
var runServices = function (services, httpPort, stage, prefixColors) {
    var commands = [];
    for (var i = 0; i < services.length; i++) {
        var execCommand = "\n            cd  " + process.cwd() + "/" + services[i].srvSource + ";\n            sls offline --stage " + stage + " --httpPort " + (httpPort + i) + " --lambdaPort " + (httpPort + i + 1000) + "\n        ";
        commands.push({
            command: execCommand,
            name: services[i].srvName,
            prefixColor: i < prefixColors.length ? prefixColors[i] : 'gray'
        });
    }
    return commands;
};
exports.runServices = runServices;
// proxy each service
var runProxy = function (services, httpPort, stage) {
    var app = express_1.default();
    var _loop_1 = function (i) {
        var proxyPath = "/" + services[i].srvPath;
        var stripBasePath = services[i].stripBasePath;
        app.use(proxyPath, http_proxy_middleware_1.createProxyMiddleware({
            pathRewrite: function (path) {
                return stripBasePath ? path.replace(proxyPath, '/') : path;
            },
            target: "http://localhost:" + (httpPort + i) + "/" + stage + "/",
            changeOrigin: true,
        }));
    };
    for (var i = 0; i < services.length; i++) {
        _loop_1(i);
    }
    app.listen(3000);
};
exports.runProxy = runProxy;
