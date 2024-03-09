"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var server = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
    console.log("Servidor est\u00E1 rodando na port ".concat(PORT));
});
