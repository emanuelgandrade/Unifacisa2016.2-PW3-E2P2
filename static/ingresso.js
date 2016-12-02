function validarIngresso(event) {
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
                
                //obtem a validação
                var erroAnoIngresso = aluno.erroAnoIngresso;
                
                //limpa status de erro caso haja
                document.getElementById("erroAnoIngresso").innerHTML = "";
                
                
                //testa se ouve erro de validacao do anoIngresso, caso contrário prossegue com o cadastro
                if (erroAnoIngresso !== "") {
                    document.getElementById("erroAnoIngresso").innerHTML = erroAnoIngresso;
                } else {
                    //obtem dados validados
                    var viaIngresso = aluno.viaIngresso;
                    var anoIngresso = aluno.anoIngresso;

                    //adiciona os dados validados em 'web Storage'
                    localStorage.setItem("viaIngresso", viaIngresso);
                    localStorage.setItem("anoIngresso", anoIngresso);

                    //direciona usuário para a pagina de cadastro realizado
                    window.location.replace("Cadastro.html");

                }
            }
        }
    };
  
    //configurando a requisicao
    //parametro 1: tipo de envio GET ou POST
    //parametro 2: a pagina e valores de parametros HTTP
    //parametro 3: requisicao deve funcionar de forma assincrona ou nao?
    request.open("post", "/validarIngresso" , true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    //envia a requisicao ao servidor para validacao dos dados
    var viaIngressoInput = getRadioValor("viaIngresso");
    var anoIngressoInput = document.getElementById("anoIngresso").value;
    request.send("viaIngresso=" + viaIngressoInput + "&anoIngresso=" + anoIngressoInput);
}

//obtem o valor do radio selecionado
function getRadioValor(name) {
    var radios = document.getElementsByName(name);
    
    for(var i = 0; i < radios.length; i++) {
        if(radios[i].checked) {
            return radios[i].value;
        }
    }
    return null;
}