//Referenciar o input

let input = document.querySelector('input[name = tarefa]');



//Referenciar o Button:

let botao = document.querySelector('#botao');

//Perceber o evento declique no botão:
botao.onclick = function() {
    //Capturar o valor digitado pelo usuário no input:
    let novaTarefa = input.value;

    if (novaTarefa !== '') {

        //Atualizar a nova tarefa na lista (arrays) de tarefas e renderizar a tela:
        tarefas.push(novaTarefa);

        //Executar a função para redenrizar as tarefas:
        renderizarTarefas();

        //limpar o input:
        input.value = '';

        //Limpar messagnes de erros (Spans):
        removeSpans();

        //Salvar dados no storage do navegador
        salvarDadosNoStorage();

    } else {
        //Limpar messagnes de erros (Spans):
        removeSpans();
        let card = document.querySelector('.card');
        let span = document.createElement('span');
        span.setAttribute('class', 'alert alert-warning');

        let msg = document.createTextNode('Informe a tarefa!');

        span.appendChild(msg);
        card.appendChild(span);
    }
}

//Remover as mensagens de spans:
function removeSpans() {
    let spans = document.querySelectorAll('span');
    let card = document.querySelector('.card');

    for (let i = 0; i < spans.length; i++) {
        card.removeChild(spans[i]);
    }
}

//Referenciar a lista:

let lista = document.querySelector('#lista');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function renderizarTarefas() {
    //Limpar a listagem de intem antes de renderizar noamente a lista
    lista.innerHTML = '';

    for (tarefa of tarefas) {
        //Criar o item da lista:
        let itemLista = document.createElement('li');
        //adicionar classes no item na lista:
        itemLista.setAttribute('class', 'list-group-item list-group-item-action');

        //Adicionar evemto de clique no item da lista
        itemLista.onclick = function() {
            deletarTarefas(this);
        }

        //Criar um texto:
        let itemTexto = document.createTextNode(tarefa);

        //Adicionar o texto no item da lista:
        itemLista.appendChild(itemTexto);

        //Adiconar o item da lista na lista:
        lista.appendChild(itemLista);
    }
}

//Executar a função para redenrizar as tarefas:
renderizarTarefas();

//Remover tarefas

function deletarTarefas(tar) {
    //Remove a tarefa do Array
    tarefas.splice(tarefas.indexOf(tar.textContent), 1);

    //Executar a função para redenrizar as tarefas:
    renderizarTarefas();

    //Salvar dados no storage do navegador
    salvarDadosNoStorage();
}

//Salvar dados no Storage (Memória interna de um navegador Web)
//o Json.stringify vai converter o array Tarefas [] para um arquivo Json (apenas texto)
function salvarDadosNoStorage() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}