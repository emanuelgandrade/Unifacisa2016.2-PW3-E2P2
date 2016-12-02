function atualizarForm() {
    //preenche dados já informados, salvos em 'web storage'
    document.getElementById("matrícula").value = localStorage.getItem("matricula");
    document.getElementById("nome").value = localStorage.getItem("nome");
}

function validarIdentificacao(event) {
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
                
                //obtem validacao dos dados
                var erroNomePai = aluno.erroNomePai;
                var erroNomeMae = aluno.erroNomeMae;
                
                //limpa status de erro caso haja
                document.getElementById("erroNomePai").innerHTML = "";
                document.getElementById("erroNomeMae").innerHTML = "";
                
                //testa se ouve erro de validacao do nomePai
                if (erroNomePai !== "") {
                    document.getElementById("erroNomePai").innerHTML = erroNomePai;
                }

                //testa se ouve erro de validacao do nomeMae
                if (erroNomeMae !== "") {
                    document.getElementById("erroNomeMae").innerHTML = erroNomeMae;
                }
                
                //testa se não ocorreu nenhum erro
                if (erroNomePai === "" && erroNomeMae === "") {
                    
                    //obtem dados validados
                    var nomePai = aluno.nomePai;
                    var nomeMae = aluno.nomeMae;
                    
                    //salva os dados validados em 'web storage'
                    localStorage.setItem("nomePai", nomePai);
                    localStorage.setItem("nomeMae", nomeMae);
                    
                    //redireciona usuário para a proxima página
                    window.location.replace("Ingresso.html");

                }
            }
        }
    };
  
    //configurando a requisicao
    //parametro 1: tipo de envio GET ou POST
    //parametro 2: a pagina e valores de parametros HTTP
    //parametro 3: requisicao deve funcionar de forma assincrona ou nao?
    request.open("post", "/validarIdentificacao" , true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    //envia a requisicao para o servidor para validacao dos dados
    var nomePaiInput = document.getElementById("nomePai").value;
    var nomeMaeInput = document.getElementById("nomeMae").value;
    request.send("nomePai=" + nomePaiInput + "&nomeMae=" + nomeMaeInput);
}