function cadastrarAluno(event) {
    event.preventDefault();
    
    //cria requisicao AJAX
    var request = new XMLHttpRequest();
 
    //define a funcao de callback que vai tratar os dados quando chegar
    request.onreadystatechange = function() {
        
        //testa se o estado eh o final
        if (request.readyState == 4) {
            //testa se a resposta foi Ok
            if (request.status == 200) {
                
                //obtem o objeto aluno enviada pelo servidor
                var aluno = JSON.parse(request.responseText);
                console.log(aluno);
                
                //preenche a pagina 'Cadastro.html' com as informações cadastradas
                document.getElementById("status").innerHTML = "Cadastro realizado com sucesso!";
                document.getElementById("matricula").innerHTML = aluno.matricula;
                document.getElementById("nome").innerHTML = aluno.nome;
                document.getElementById("nomePai").innerHTML = aluno.nomePai;
                document.getElementById("nomeMae").innerHTML = aluno.nomeMae;
                document.getElementById("viaIngresso").innerHTML = aluno.viaIngresso;
                document.getElementById("anoIngresso").innerHTML = aluno.anoIngresso;
                
            } else {
                //preenche a pagina 'Cadastro.html' com status de cadastro não realizado
                document.getElementById("status").innerHTML = "Cadastro não realizado!";
            }
        }
    };
    
    //verifica se existe dados salvos em 'web storage', se não retorna para a página inicial do cadastro
    if (localStorage.length !== 0) {
        
        //configurando a requisicao
        //parametro 1: tipo de envio GET ou POST
        //parametro 2: a pagina e valores de parametros HTTP
        //parametro 3: requisicao deve funcionar de forma assincrona ou nao?
        request.open("post", "/cadastrarAluno" , true);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        
        //envia a requisicao com os dados salvos em 'web storage'
        var matriculaInput = localStorage.getItem("matricula");
        var nomeInput = localStorage.getItem("nome");
        var nomePaiInput = localStorage.getItem("nomePai");
        var nomeMaeInput = localStorage.getItem("nomeMae");
        var viaIngressoInput = localStorage.getItem("viaIngresso");
        var anoIngressoInput = localStorage.getItem("anoIngresso");
        
        request.send("matricula=" + matriculaInput + "&nome=" + nomeInput +
            "&nomePai=" + nomePaiInput + "&nomeMae=" + nomeMaeInput +
            "&viaIngresso=" + viaIngressoInput + "&anoIngresso=" + anoIngressoInput);
        
        //limpa os dados salvos em 'web storage'
        localStorage.clear();
    } else {
        window.location.replace("index.html");
    }
}