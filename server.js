var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static("static"));

var alunos = [];

app.get("/index.html", function(req, res) {
	res.sendFile( __dirname + "/static/" + "index.html");
});

app.get("/list.html", function(req, res) {
	res.end(JSON.stringify(alunos));
});

app.post("/validarIniciacao", urlEncodedParser, function(req, res) {
	var matricula = req.body.matricula;
	var nome = req.body.nome;
	var erroMatricula = "";
	var erroNome = "";

	// Verifica erro na matrícula
	if (isNaN(parseFloat(matricula)) || !isFinite(matricula) ||
			matricula.length < 9 || matricula.length > 10) {
		erroMatricula = "* 'matrícula' deve ser um número com 9 ou 10 dígitos";
	}

	// Verifica erro no nome
	if (nome.replace(/^\s+|\s+$/g,"").length === 0 || nome === null) {
		erroNome = "* 'nome' não pode ser vazio";
	}

	// Envia resposta em formato JSON
	response = {
		erroMatricula: erroMatricula,
		erroNome: erroNome,
		matricula: matricula,
		nome: nome
	};
	console.log(response);
	res.end(JSON.stringify(response));
	
});

app.post("/validarIdentificacao", urlEncodedParser, function(req, res) {
	var nomePai = req.body.nomePai;
	var nomeMae = req.body.nomeMae;
	var erroNomePai = "";
	var erroNomeMae = "";

	// Valida nomePai
	if (nomePai.replace(/^\s+|\s+$/g,"").length === 0 || nomePai === null) {
		erroNomePai = "* nome do pai' não pode ser vazio";
	}

	// Valida nome
	if (nomeMae.replace(/^\s+|\s+$/g,"").length === 0 || nomeMae === null) {
		erroNomeMae = "* 'nome da mãe' não pode ser vazio";
	}

	// Envia resposta em formato JSON
	response = {
		erroNomePai: erroNomePai,
		erroNomeMae: erroNomeMae,
		nomePai: nomePai,
		nomeMae: nomeMae
	};

	console.log(response);
	res.end(JSON.stringify(response));
	
});

app.post("/validarIngresso", urlEncodedParser, function(req, res) {
	var viaIngresso = req.body.viaIngresso;
	var anoIngresso = req.body.anoIngresso;

	var erroAnoIngresso = "";

	// Valida matrícula
	var dataAtual = new Date();
	if (isNaN(parseFloat(anoIngresso)) || !isFinite(anoIngresso) ||
			anoIngresso < 1999 || anoIngresso > dataAtual.getFullYear()) {
		erroAnoIngresso = "* 'ano de ingresso' deve ser um número entre 1999 e ano atual";
	}

	// Envia resposta em formato JSON
	response = {
		erroAnoIngresso: erroAnoIngresso,
		viaIngresso: viaIngresso,
		anoIngresso: anoIngresso
		};
	console.log(response);
	res.end(JSON.stringify(response));
});

app.post("/cadastrarAluno", urlEncodedParser, function(req, res) {
	// Envia resposta em formato JSON
    response = {
		matricula: req.body.matricula,
        nome: req.body.nome,
		nomePai: req.body.nomePai,
		nomeMae: req.body.nomeMae,
		viaIngresso: req.body.viaIngresso,
		anoIngresso: req.body.anoIngresso
    };
    console.log(response);
    res.end(JSON.stringify(response));
    
    //salva o objeto no array
    alunos.push(response);
    
});

var porta = process.env.PORT || 8080;
var server = app.listen(porta, function () {
	console.log("Server running at http://localhost:" + porta + "/");
});