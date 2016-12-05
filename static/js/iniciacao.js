function validarIniciacao(event) {
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
                
                //obtem a validação dos dados
                var erroMatricula = aluno.erroMatricula;
                var erroNome = aluno.erroNome;
                
                //limpa status de erro caso haja
                document.getElementById("erroMatricula").innerHTML = "";
                document.getElementById("erroNome").innerHTML = "";
                
                //testa se ouve erro de validacao da matricula
                if (erroMatricula !== "") {
                    document.getElementById("erroMatricula").innerHTML = erroMatricula;
                    //document.getElementById("matricula").required = "required";
                    //document.getElementById("matricula").title = erroMatricula;
                }

                //testa se ouve erro de validacao do nome
                if (erroNome !== "") {
                    document.getElementById("erroNome").innerHTML = erroNome;
                }
                
                //testa se não ocorreu nenhum erro
                if (erroMatricula === "" && erroNome === "") {
                    
                    //obtem dados validados
                    var matricula = aluno.matricula;
                    var nome = aluno.nome;
                    
                    //salva os dados validados em 'web storage'
                    localStorage.setItem("matricula", matricula);
                    localStorage.setItem("nome", nome);
                    
                    //redireciona usuário para a proxima página
                    window.location.replace("Identificacao.html");

                }
            }
        }
    };
    
    //configurando a requisicao
    //parametro 1: tipo de envio GET ou POST
    //parametro 2: a pagina e valores de parametros HTTP
    //parametro 3: requisicao deve funcionar de forma assincrona ou nao?
    request.open("post", "/validarIniciacao" , true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    //envia a requisicao para o servidos para validacao dos dados
    var matriculaInput = document.getElementById("matricula").value;
    var nomeInput = document.getElementById("nome").value;
    request.send("matricula=" + matriculaInput + "&nome=" + nomeInput);
}