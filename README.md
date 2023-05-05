# Get Statistics API

## Informações Gerais

Esta API permite obter estatísticas de partidas de jogadores.

## Como executar a aplicação

node: 16 LTS.  
`yarn` (para instalar as dependecias).  
`yarn dev` (para rodar em dev)
`yarn test` para testes
`http://localhost:3000/api-docs/` para ver a documentação completa.

## Melhorias

Muita coisa pode ser melhorada, como por exemplo desacoplar as libs terceiras para serem injetadas como é feito em clean arch, poderia separar meu data.txt em um arquivo de infra ou configs, poderia testar todas as funções isoladas, fazer testes e2e. Poderia rever as regex.match, se o desempenho está aceitavel em uma escala de dados maior, poderia fazer um cache local usando HashMap, criar uma Binary Search Tree para ordenar a pontuação dos players, entre outros. Que fique claro que as melhorias de estruturas de dados que citei é somente necessárias em caso de grande trafego da dados.

### Quais objetivos do teste foram alcançados ?

Todas as 3 histórias (criterios de aceite) foram alcançados nesse teste.

#### Swagger

A documentação completa da API pode ser encontrada no arquivo swagger.yaml. Abaixo está um resumo das rotas principais da API.

## Rotas Principais

### /players/statistics/{matchId}

Obtenha estatísticas de jogadores para uma partida específica.

Método: GET  
Parâmetros: matchId: ID da partida (obrigatório, tipo integer).  
Respostas:  
200: OK.  
400: Bad Request.  
404: Statistics not found.

### /statistics

Obtenha estatísticas de jogos, incluindo o número de partidas jogadas, mortes, mortes causadas e mortes entre jogadores.

Método: GET  
Respostas:  
200: Successfully retrieved game statistics.  
400: Error retrieving game statistics.

### /statistics/{id}

Obtenha detalhes de estatísticas de uma partida específica com base no ID fornecido como parâmetro.

Método: GET.  
Parâmetros: id: ID da estatística de partida (obrigatório, tipo integer).  
Respostas:  
200: OK.  
400: Bad Request.  
404: Statistics not found.

## Estrutura de Resposta

As respostas da API são no formato JSON e têm a seguinte estrutura:

### /players/statistics/{matchId}

```JSON
{
  "error": false,
  "ranking": {
    "1": {
      "name": "string",
      "points": "integer"
    },
    "2": {
      "name": "string",
      "points": "integer"
    },
    "3": {
      "name": "string",
      "points": "integer"
    },
    "4": {
      "name": "string",
      "points": "integer"
    }
  }
}
```

### /statistics

```JSON
{
  "error": false,
  "results": {
    "world": {
      "kills": "integer"
    },
    "killsBetweenPlayers": "integer",
    "matchesPlayed": "integer",
    "deaths": "integer",
    "causes": {
      "MOD_TRIGGER_HURT": "integer",
      "MOD_ROCKET_SPLASH": "integer",
      "MOD_FALLING": "integer",
      "MOD_ROCKET": "integer",
      "MOD_RAILGUN": "integer",
      "MOD_MACHINEGUN": "integer",
      "MOD_SHOTGUN": "integer",
      "MOD_TELEFRAG": "integer",
      "MOD_BFG_SPLASH": "integer",
      "MOD_BFG": "integer",
      "MOD_CRUSH": "integer"
    }
  }
}
```

### /statistics/{id}

```JSON
{
  "error": false,
  "results": {
    "world": {
      "kills": "integer"
    },
    "killsBetweenPlayers": "integer",
    "matchesPlayed": "integer",
    "deaths": "integer",
    "causes": {
      "MOD_TRIGGER_HURT": "integer",
      "MOD_ROCKET_SPLASH": "integer",
      "MOD_FALLING": "integer",
      "MOD_ROCKET": "integer",
      "MOD_RAILGUN": "integer",
      "MOD_MACHINEGUN": "integer",
      "MOD_SHOTGUN": "integer",
      "MOD_TELEFRAG": "integer",
      "MOD_BFG_SPLASH": "integer",
      "MOD_BFG": "integer",
      "MOD_CRUSH": "integer"
    }
  }
}
```
