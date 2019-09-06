# Introdução ao React

## Conceitos de React

- Biblioteca para construção de interfaces
- Single Pages Applications (SPA)
- É um framework por ser um conjunto de ferramentas para diferentes ambientes. (Ecosistema).
- Tudo dentro javascript (html, css)
- **React**: biblioteca de contrução de interfaces e componentização
- **ReactJS**: unificação do react com reactDOM (biblioteca para browsers)
- **React Native**: unifica os elementos de react com elementos nativos.

##Vantagens

- Organização do código
  \- Componentização
- Divisão de responsabilidades
  \- back-end (regras de negócio)
  \- front-end (interface)
- Uma API, múltiplos clientes
- Programação declarativa

##JSX

- Escrever HTML dentro fo Javascript
- Criar próprios elementos

## Imperativo vs declarativo

- **Imperativo:** precisa ficar passando instruções como deve fazer para cada situação. Comparando com o estado anterior.
- **Declarativo:** componente se adequa conforme o estado.

##Babel / Webpack

- O browser não compreende código
- babel converte o código para um formato entendível pelo browser.
- webpack Cria o bundle (js único), importa css e imagens e live reload.

#Configurar Estrutura

- Criar pasta modulo04 e fazer yarn init.
  \_ Instalar packages:

```sh
yarn add @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli babel-loader -D
```

```sh
yarn add react react-dom
```

- Criar arquivo `/babel.config.js`

```javascript
module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
```

- Criar arquivo `/webpack.config.js`

```javascript
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
```

- Criar arquivo `/src/index.js`

```javascript
const soma = (a, b) => {
  return a + b;
};

alert(soma(1, 3));
```

- Criar pasta `/public`
- Alterar `/package.json` adicionando

```json
"scripts": {
 "build":"webpack --mode development"
},
```

- Rodar `yarn build`

- Criar arquivo `/public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>ReactJS</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <script src="./bundle.js"></script>
  </body>
</html>
```

- Instalar webpack sever

```sh
yarn add webpack-dev-server -D
```

- Adicionar em `webpack.config.js`

```
devServer: {
    contentBase: path.resolve(__dirname, "public")
  },
```

- alterar o script build em `package.json`

```
"scripts": {
    "build": "webpack --mode development",
    "dev": "webpack-dev-server --mode development"
  },
```

- rodar `yarn dev`

- abrir o browser em `http://localhost:8080/`

## Criando componente raiz

### Usando react.

- Alterar o index.js

```javascript
import React from "react";
import { render } from "react-dom";

render(<h1>Hello World</h1>, document.getElementById("app"));
```

- Alterar o index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>ReactJS</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="./bundle.js"></script>
  </body>
</html>
```

### Componentizar

- criar `/src/App.js`

```javascript
import React from "react";

function App() {
  return <h1>Hello Rocketseat</h1>;
}

export default App;
```

- alterar `/src/index.js`

```javascript
import React from "react";
import { render } from "react-dom";

import App from "./App";

render(<App />, document.getElementById("app"));
```

### Adicionar CSS

- adicionar packages
  `yarn add style-loader css-loader -D`

- adcionar nova regra no `webpack.config`
  ```javascript
  { test: /\.css$/, use: [{ loader: "style-loader" }, { loader: "css-loader" }] }
  ```
- criar `/src/App.css`

```css
body {
  background: #7159c1;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
}
```

- importar no `/src/App.js` o css
  ```javascript
  import "./App.css";
  ```
- rodar o `yarn dev`

### Importando imagens

- importar um novo loader

```sh
yarn add file-loader -D
```

- adcionar nova regra no `webpack.config`
  ```javascript
  {
    test: /.*\.(gif|png|jpe?g)$/i,
        use: { loader: "file-loader" }
  }
  ```
- Criar pasta `/src/assets` e adicionar uma imagem na pasta.

- importar a imagem em `src/App.js`

```javascript
import imagem from "./assets/Capturar.PNG";
...
return <img src={imagem} />;
```

### Criar primeiro componente da aplicação

- criar a pasta `/scr/components` e dentro desta o arquivo `TechList.js`

```javascript
import React, { Component } from "react";

export default class TechList extends Component {
  render() {
    return (
      <ul>
        <li>Node.js</li>
        <li>React.js</li>
        <li>React Native</li>
      </ul>
    );
  }
}
```

- importar componente no `src/App.js`

```javascript
import React from "react";
import "./App.css";

import TechList from "./components/TechList";

function App() {
  return <TechList />;
}
export default App;
```

- criar o state no app.js

```javascript
state = {
  techs: ["Node.js", "React.js", "React Native"]
};
```

- instalar a biblioteca
  `yarn add @babel/plugin-proposal-class-properties --dev`

- alterar babel.config, adicionando o plugin

```javascript
...
plugins: ["@babel/plugin-proposal-class-properties"]
```

## Estado e imutabilidade

- alterar o TechList.js exibindo os valores do state

```javascript
import React, { Component } from "react";

export default class TechList extends Component {
  state = {
    techs: ["Node.js", "React.js", "React Native"]
  };
  render() {
    return (
      <ul>
        {this.state.techs.map(tech => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    );
  }
}
```

### Permitir que usuário adicone novos itens

- alterar o TechList.js adicionando o input

```javascript
import React, { Component } from "react";

export default class TechList extends Component {
  state = {
    techs: ["Node.js", "React.js", "React Native"]
  };
  render() {
    return (
      <>
        <ul>
          {this.state.techs.map(tech => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <input type="text" />
      </>
    );
  }
}
```

- Capturando o conteúdo do input

```javascript
import React, { Component } from "react";

export default class TechList extends Component {
  state = {
    newTech: "",
    techs: ["Node.js", "React.js", "React Native"]
  };

  handelInputChange = e => {
    this.setState({ newTech: e.target.value });
  };

  render() {
    return (
      <>
        <h1>{this.state.newTech}</h1>
        <ul>
          {this.state.techs.map(tech => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <input
          type="text"
          onChange={this.handelInputChange}
          value={this.state.newTech}
        />
      </>
    );
  }
}
```

> na classe react, somente arrow functions tem acesso ao this. Por isso que handleInputChange é um arrow function

- inserindo conteúdo na lista

```javascript
import React, { Component } from "react";

export default class TechList extends Component {
  state = {
    newTech: "",
    techs: ["Node.js", "React.js", "React Native"]
  };

  handelInputChange = e => {
    this.setState({ newTech: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ""
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>{this.state.newTech}</h1>
        <ul>
          {this.state.techs.map(tech => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <input
          type="text"
          onChange={this.handelInputChange}
          value={this.state.newTech}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}
```

> O state só pode ser alterado pelo método setState().

## Removendo itens do estado

```javascript
import React, { Component } from "react";

export default class TechList extends Component {
  state = {
    newTech: "",
    techs: ["Node.js", "React.js", "React Native"]
  };

  handelInputChange = e => {
    this.setState({ newTech: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ""
    });
  };

  handleDelete = tech => {
    this.setState({ techs: this.state.techs.filter(t => t !== tech) });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>{this.state.newTech}</h1>
        <ul>
          {this.state.techs.map(tech => (
            <li key={tech}>
              {tech}
              <button onClick={() => this.handleDelete(tech)} type="button">
                Remover
              </button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          onChange={this.handelInputChange}
          value={this.state.newTech}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}
```

## Propriedades de React

Separar os itens do compomente TechList

- Criar componente TechItem

```javascript
import React from "react";

export default function TechItem({ tech, onDelete }) {
  return (
    <li>
      {tech}
      <button onClick={onDelete} type="button">
        Remover
      </button>
    </li>
  );
}
```

- Alterar TechList

```javascript
import React, { Component } from "react";

import TechItem from "./TechItem";

export default class TechList extends Component {
  state = {
    newTech: "",
    techs: ["Node.js", "React.js", "React Native"]
  };

  handelInputChange = e => {
    this.setState({ newTech: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ""
    });
  };

  handleDelete = tech => {
    this.setState({ techs: this.state.techs.filter(t => t !== tech) });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>{this.state.newTech}</h1>
        <ul>
          {this.state.techs.map(tech => (
            <TechItem
              key={tech}
              tech={tech}
              onDelete={() => this.handleDelete(tech)}
            />
          ))}
        </ul>
        <input
          type="text"
          onChange={this.handelInputChange}
          value={this.state.newTech}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}
```

> Qualquer coisa pode ser passada como elemento.

## Default props e PropTypes

### Default Props

Se o usário chama o tehcitens sem passar o objeto tech, utiliza-se o defaultProps para passar valores padrão em caso do objeto ser nulo.

- definindo default props para o componente TechItem

```javascript
TechItem.defaultProps = {
  tech: "Oculto"
};
```

- caso seja em um componente de classe, poderia ser declarado assim:

```javascript
class TechList extends Component {
  static.defaultProps = {
    prop: 'valor',
  }
}
```

### PropTypes

Alerta o dev se passar um propriedade como um tipo inválido. Por exemplo, uma propriedade espera que seja passado para ela uma função e o dev passa uma string.

- instalar a dependência prop-types

```sh
yarn add prop-types
```

- definindo os proptypes dos parâmetros do componente TechItem

```javascript
import PropTypes from "prop-types";
...
TechItem.PropTypes = {
  tech: PropTypes.string,
  onDelete: PropTypes.func.isRequired
};
```

- caso seja em um componente de classe, poderia ser declarado assim:

```javascript
import PropTypes from "prop-types";
...
class TechList extends Component {
  static.PropTypes = {
    tech: PropTypes.string,
  }
}
```

## Ciclo de vida do componente

### Métodos do cliclo de vida

- **componentDidMount**: executado assim que o componente aparece em tela

- **componentDidUpdate**: executado sempre que houver alterações nas props ou estado. (prevProps, prevState)

- **componentWillUnmount**: executado quando o componente deixa de existir

Exemplo salvar a lista de tecnnologias no local storage.

```javascript
...
  componentDidMount() {
    const techs = localStorage.getItem("techs");
    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.techs !== this.state.techs) {
      localStorage.setItem("techs", JSON.stringify(this.state.techs));
    }
  }
...
```

## React DevTools

Ferramenta auxiliar para visualizar componentes do React
