const url = require('url');

//Fonction utiliser par les operateurs +, -, *, /, %
//Retourn un tableau contenant la response JSON a afficher
function getAnswer(x, y, op) {
    var error, value, operator = op;
    if (op == ' ')
        operator = '+'

    if (isNaN(x) && isNaN(y)) {
        error = "\'y\' and \'x\' parameters are not numbers";

        return [
            {
                "op": `${operator}`,
                "x": `${x}`,
                "y": `${y}`,
                error
            }
        ];
    }
    else if (isNaN(x)) {
        error = "\'x\' parameter si not a numbers"

        return [
            {
                "op": `${operator}`,
                "x": `${x}`,
                "y": `${y}`,
                error
            }
        ];
    }
    else if (isNaN(y)) {
        error = "\'y\' parameter si not a numbers"

        return [
            {
                "op": `${operator}`,
                "x": `${x}`,
                "y": `${y}`,
                error
            }
        ];
    }
    else {

        var xf = parseFloat(x),
            yf = parseFloat(y),
            value = eval(xf + operator + yf);

        return [
            {
                "op": `${operator}`,
                "x": `${x}`,
                "y": `${y}`,
                value
            }
        ];
    }
}

function isPrime(n) {
    for (var i = 2; i < n; ++i) {
        if (n % i === 0) return false;
    }
    return n > 1
}

function nThPrime(n) {
    var count = 0

    for (var i=2 ; i < 10000 ; i++) {
        if (isPrime(i) === true)
            count = count + 1 
        if (count === n) 
            return i
    }
}

exports.calculate = function (req, res) {
    const reqUrl = url.parse(req.url, true),
        parsed = reqUrl.query;

    var response = getAnswer(parsed.x, parsed.y, parsed.op)

    res.end(JSON.stringify(response));
}

exports.factorial = function (req, res) {
    const reqUrl = url.parse(req.url, true),
        parsed = reqUrl.query;

    var value = 1,
        error = '',
        n = parsed.n
    response = '';

    if (isNaN(n)) {
        error = "\'n\' is not a number"
        response = [
            {
                "operateur": `${parsed.op}`,
                "n": `${n}`,
                error
            }
        ];
    }
    else {
        n = parseFloat(parsed.n);

        for (var i = 0; i < n; ++i)
            value *= i + 1;

        response = [
            {
                "operateur": `${parsed.op}`,
                "n": `${n}`,
                value
            }
        ];
    }

    res.end(JSON.stringify(response));
}

exports.prime = function (req, res) {
    const reqUrl = url.parse(req.url, true),
        parsed = reqUrl.query;

    var value = '',
        error = '',
        n = parsed.n,
        response = '';

    if (isNaN(n)) {
        error = "\'n\' is not a number"
        response = [
            {
                "operateur": `${parsed.op}`,
                "n": `${n}`,
                error
            }
        ];
    }
    else {
        n = parseFloat(parsed.n);

        if(parsed.op == 'p')
            value = isPrime(n);
        else
            value = nThPrime(n);

        response = [
            {
                "operateur": `${parsed.op}`,
                "n": `${n}`,
                value
            }
        ];
    }
    res.end(JSON.stringify(response));
}

exports.invalidUrl = function (req, res) {
    var response = [
        {
            "message": "Endpoint incorrect. Options are as fallowing "
        },
        availableEndpoints
    ];
    res.statusCode = 404;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(response));
}

exports.invalidOpt = function (req, res) {
    var response = [
        {
            "message": "Operator invalid. Options are as fallowing "
        },
        availableOperators
    ];
    res.statusCode = 404;
    res.setHeader('conten-Type', 'Application/json');
    res.end(JSON.stringify(response));
}

exports.invalidNumberOfParam = function(req, res) {
    var response = [
        {
            "message": "number of parameters enter in GET request invalide."
        }
    ];

    res.end(JSON.stringify(response));
}

const availableEndpoints = [
    {
        method: "GET",
        getCours: "api/maths"
    },
];

const availableOperators = ['+', '-', '/', '*', '%', '!', 'p', 'np'];