# Teste Desenvolvedor React REIVAX

Este repositório disponibiliza o código fonte, o `Dockerfile` e um arquivo `Docker Compose` que implementam um servidor `Socket.IO` a ser usado para desenvolver o exercício.


## Objetivos

Ao fim do desafio, o candidato deve apresentar um projeto que rode em um container (servidor de desenvolvimento) utilizando React que cumpra os seguintes critérios:

- Autentique no backend utilizando um client Socket.IO (https://socket.io/docs/v4/client-api/).
- Obtenha a lista de dados emitidos periodicamente pelo backend no evento `data`
- Apresente os dados mais recentes em formato de tabela na página. A tabela deve ser atualizada sempre que uma nova informação é recebida (os dados são "empurrados" do backend para o frontend).
- Obtenha as credenciais de acesso no evento `credentials`. As credenciais são emitidas um única vez imediatamente após a conexão ter sido validada.
- Por meio de um botão na página, enviar um comando no evento `clear` utilizando o JWT de acesso obtido do evento `credentials`. 

Além disso, como atividades bonus, o candidato pode:
- Realizar a gestão dos tokens, solicitando novos tokens no evento `refresh_tokens` quando o token de acesso expira.
- Utilizar Redux para gerenciar o estado da autenticação do usuário.
- Realizar a build dos arquivos estáticos e servir diretamente do container do backend (https://docs.docker.com/build/building/multi-stage/).
- Implementar filtragem de dados no frontend conforme tipo, range etc.
- Implementar melhorias visuais como um spinner enquanto os dados carregam.


## Versão do Docker

A seguinte versão do Docker foi utilizada durante o desenvolvimento do desafio:

`Docker version 20.10.18, build b40c2f6`

## Versão do Python

A versão da imagem do container do backend utilizada é:

`Python 3.8.10`

## Buildando e rodando o backend

Após instalar o `docker`, utilizando o `Makefile` disponibilizado, execute o comando:

```
$ sudo make
```

Os logs do backend estão sendo direcionados para o terminal em nível `DEBUG`, de modo que todos os eventos ocorridos devem estar disponíveis para desenvolvimento.

## Detalhes técnicos

Esta seção apresenta uma documentação básica do sistema, porém todo o código do backend está documentado por meio de `docstrings` das principais funções. Sugere-se que o candidato leia o arquivo `events.py` para entender o funcionamento básico.

### Conexão

O servidor está ativo em um `namespace` chamado `/api`. Todos os eventos e as lógicas de conexão só são válidas quando conectando neste `namespace`.

Para que a conexão seja realizada corretamente, o candidato deve setar campos adicionais nos `headers` do request de conexão. Estes campos são:

- X-Username
- X-Password

O backend vai autenticar e aceitar todas as conexões que enviem estes dois campos com o mesmo valor. Ou seja, é possível autenticar com o username `user` e password `user`. Porém ao tentar autenticar com 
o username `admin` e password `12345`, o usuário vai receber um erro do tipo `connection_error_auth_failed`.

Após a conexão, o usuário deve imediatamente escutar no evento `credentials`, onde serão emitidos os seus tokens de acesso. O formato dos dados recebidos em `credentials` são:

```
{
    "status": "accepted",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjc4MTIyMDc3LCJqdGkiOiI2ZTg5MDkxMS0zYjg0LTQ1MWItODhlMy1iMGI3MmQ4ZmM2NTgiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiYWEiLCJuYmYiOjE2NzgxMjIwNzcsImV4cCI6MTY3ODEyMjUyN30.uk_UFmqFER98Rig2R8wWdybsgwvFnHflButoya5edQk",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3ODEyMjA3NywianRpIjoiNGY4MDQ3MjgtYmYxOS00ZTNlLTgwZDQtZmY4ZTc0NTNlNTcwIiwidHlwZSI6InJlZnJlc2giLCJzdWIiOiJhYSIsIm5iZiI6MTY3ODEyMjA3NywiZXhwIjoxNjc4MTIyOTc3fQ.YqZ7jKXxFENc8RmgjJLOjnRM4E0zCfTUQ5M_4BfBtis"
}
```

### JWT

Os dois tokens recebidos tem aplicações diferentes. O token de acesso deve ser utilizado para enviar comandos ao backend, como o caso do evento `clear`.

Já o token de refresh deve ser utilizado para solicitar um novo par de tokens quando o token de acesso está prestes a expirar.

Ambos os tokens podem ser facilmente decodificados. A ferramenta em https://jwt.io/ permite testes offline. Dois campos interessantes dos tokens são o `iat` (issued at) e `exp` (expiration). 

Os tokens de acesso tem duração de 450 segundos, enquanto os tokens de refresh duram 900 segundos.

### Obtenção de dados

O backend emite periodicamente dados para exibição em tela no evento `data`. Após a conexão, a aplicação deve subscrever ao evento `data` e exibir os dados recebidos em tela. A lista de dados tem 200 posições, de modo que é interessante que os dados sejam organizados em páginas.

Exemplo de item da lista:

```
{
    "type": "type3",
    "timestamp": "2023-03-06T17:01:17.483663",
    "param1": 11.261225361056704,
    "param2": 26.40233540838505
}
```

Estes dados podem também ser alterados no backend no arquivo `events.py` caso o usuário queira deixar o exercício mais interessante.


### Envio de comandos

Há dois comandos implementados:

- `clear`
- `refresh_tokens`

Para ambos os casos, o backend sempre envia um retorno indicando se o comando foi aceito ou se houve algum problema no processamento. 

Para ambos os casos, o usuário deve enviar no comando um payload do tipo JSON contendo um dos tokens recebidos.

A payload a ser enviada:
```
{
    "token": <token_recebido>
}
```

No caso do evento `clear`, o usuário deve usar um token de acesso. No caso do evento `refresh_tokens`, o usuário deve usar um token de refresh.

### Ferramentas de desenvolvimento

Sugere-se que o candidato faça uso da ferramenta Postman para entender o fluxo de conexão, autenticação, obtenção de dados e envio de comandos.

O Postman tem um client Socket.IO quer permite explorar os detalhes da implementação do protocolo.

Note que para conexão, o usuário deve utilizar a porta 5000 e o namespace `/api`. A URL do backend fica no formato:

```
http://localhost:5000/api
```

O Postman também permite setar campos de headers para a conexão.