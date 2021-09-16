const http = require('http');
const url = require('url');
const queryString = require('query-string');

function AccessControlConfig(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
}
function Prefligth(req, res) {
    if (req.method === 'OPTIONS') {
        console.log('preflight CORS verifications');
        res.end();
        // request handled
        return true;
    }
    // request not handled
    return false;
}

module.exports = http.createServer((req, res) => {
    AccessControlConfig(res);
    if (!Prefligth(req, res)) {
        var operatorOps = require('./controller.js');
        const reqUrl = url.parse(req.url, true);
        const parsed = reqUrl.query;
        var nParam = Object.keys(parsed).length;

        if (reqUrl.pathname == '/api/maths' && req.method == 'GET') {

            switch (parsed.op) {
                case ' ':
                case '-':
                case '/':
                case '*':
                case '%':
                    if (nParam == 3)
                        operatorOps.calculate(req, res);
                    else
                        operatorOps.invalidNumberOfParam(req, res);
                    break;
                case '!':
                    if (nParam == 2)
                        operatorOps.factorial(req, res);
                    else
                        operatorOps.invalidNumberOfParam(req, res);
                    break;
                case 'p':
                case 'np':
                    if (nParam == 2)
                        operatorOps.prime(req, res);
                    else
                        operatorOps.invalidNumberOfParam(req, res);
                    break;
                default:
                    operatorOps.invalidOpt(req, res);
            };
        }
        else {
            console.log('Request type: ' + req.method + ' Endpoint ' + req.url);
            operatorOps.invalidUrl(req, res);
        }
    }
});