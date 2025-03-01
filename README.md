# Projeto de Lista de Usuários

Este projeto consiste em uma aplicação web que permite visualizar, adicionar, deletar e exportar uma lista de usuários em formatos Excel e PDF. A aplicação foi desenvolvida com **React**, **TypeScript**, **Vite**, **Tailwind CSS**, e utiliza dados de uma API externa para preencher as informações de usuários.

## Tecnologias Utilizadas

- **React** (Biblioteca para construção da interface)
- **TypeScript** (Superset do JavaScript para garantir tipagem estática)
- **Vite** (Ferramenta de build rápida para desenvolvimento)
- **Shadcn/UI** (Ferramenta com components prontos para o desenvolvimento)
- **Tailwind CSS** (Framework para estilização de componentes)
- **Phosphor-icons** (Ferramenta de icones para react)
- **jsPDF** (Para gerar arquivos PDF)
- **XLSX** (Para exportar dados para Excel)
- **jsPDF-AutoTable** (Para criar tabelas no PDF)

## Funcionalidades

- **Pagina Home**: Pagina com grafico e cards com informações.
- **Visualização de usuários**: A lista de usuários é exibida em uma tabela.
- **Filtro de pesquisa**: Você pode buscar por nome ou sobrenome de usuários.
- **Modo Dark ou Light**: Você pode mudar para a versão branco/preto (Padrão Preto atualmente) pelo botão de "Sol" ou "Lua" na Sidebar (Barra com botões na esquerda).
- **Adição de usuários**: Adicione novos usuários com nome, sobrenome, e e-mail (imagem é opcional).
- **Exclusão de usuários**: Remova usuários da lista.
- **Exportação para Excel**: Exporte a lista de usuários para um arquivo Excel.
- **Exportação para PDF**: Exporte a lista de usuários para um arquivo PDF.
- **Paginação**: Quando busca os usuarios pela API, ele puxa a quantidade que a pagina suporta, assim evitando perca de desempenho do sistema, evitando puxar todos dados de uma vez.

## Pré-requisitos

- **Node.js** e **npm** instalados na sua máquina. Você pode instalar o Node.js [aqui](https://nodejs.org/).

## Rodando o Projeto

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório:**

   ```bash
   git clone <URL do repositório>
   ```

2. **Instale as dependências:**

   Navegue até a pasta do projeto e instale as dependências com o seguinte comando:

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**

   Após a instalação das dependências, inicie o servidor de desenvolvimento com:

   ```bash
   npm run dev
   ```

   O projeto mostrara onde estará disponível em Exemplo: [http://localhost:3000](http://localhost:3000).

4. **Login:**
   Está predefinido um email e senha para desenvolvimento
   Email: admin@email.com
   Senha: 123456

## Estrutura do Projeto

```
├── public/                  # Arquivos públicos
├── src/                     # Código fonte do projeto
│   ├── assets/              # Pasta para armazenar arquivos (Fotos, etc)
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Private-Route/       # Componente para verificação se o usuario está logado no sistema
│   │   ├── UserTable/       # Componente Tabela que exibe os usuários
│   │   ├── Sidebar/         # Componente Sidebar para o sistema todo
│   │   ├── ui/              # Componentes do Shadcn/UI reutilizáveis (Botões, Inputs, etc)
│   │   ├── login-form       # Form de login
│   │   ├── mode-toggle      # Sistema que faz a troca do modo "Preto" para o "Branco" com botão de "Sol" e "Lua"
│   │   ├── theme-provider   # Sistema que faz todo a lógica de troca de cores do sistema
│   ├── hooks/               # Hooks
│   │   ├── use-mobile/      # Hook para a Sidebar abrir e fechar para celular
│   ├── lib/                 # Libs (Evitar refazar funções, conseguindo reutilizar)
│   │   ├── utils/           # Lib para os components do Shadcn/UI
│   ├── pages/               # Paginas de todo o sistema
│   │   ├── HomePage/        # Pagina principal do sistema
│   │   ├── LoginPage/       # Pagina de Login
│   │   ├── userDetailsPage/ # Pagina de detalhes do usuario
│   │   ├── UserPage/        # Pagina de lista dos usuarios
│   ├── services/            # Serviços do sistema
│   │   ├── api/             # Faz a requisão e verificação da API
│   ├── styles/              # Pasta dos estilos
│   │   ├── global/          # Estilo global do Sistema
│   ├── App.tsx              # Componente principal do React
│   ├── index.tsx            # Ponto de entrada do aplicativo
├── tailwind.config.js       # Configuração do Tailwind CSS
├── tsconfig.json            # Configuração do TypeScript
├── package.json             # Dependências e scripts
└── README.md                # Documentação do projeto
```

## Como Utilizar a Aplicação

1. **Login**: Na tela de login, irá pedir email e senha, que estão de testes que são email: "admin@email.com" senha: 123456
2. **Pagina Home**: Na tela inicial, há uma tela home, mostrando 4 cards, um com dado real, 3 com dados ficticios e um grafico.
3. **Pagina Usuarios**: Na tela de usuarios, tem uma tabela com todos usuarios da API.

- **Adicionar Usuário**: Clique no botão "+ Adicionar Usuário" para abrir um modal e adicionar um novo usuário à lista.
- **Excluir Usuário**: Na tabela de usuários, cada usuário tem um botão para excluir, que irá abrir um modal de confirmação.
- **Detalhe e Editar Usuario**: Na tabela de usuários, cada usuário tem um botão para "Ver Detalhes" que abre uma pagina para ver e editar detalhes desse usuario.
- **Filtro**: Na tabela de usuários, tem cada coluna, clicando na coluna você pode selecionar um filtro para cada uma delas, ordenando a que foi clicada.
- **Exportar Dados**:
  - **Exportar para Excel**: Clique no botão "Exportar Dados" e selecione a opção "Exportar Excel".
  - **Exportar para PDF**: Clique no botão "Exportar Dados" e selecione a opção "Exportar PDF".

## Funcionalidades de Exportação

- **Exportação para Excel**: Utiliza a biblioteca **XLSX** para gerar um arquivo Excel contendo todos os usuários.
- **Exportação para PDF**: Utiliza **jsPDF** com a extensão **jsPDF-AutoTable** para gerar um PDF com a tabela de usuários.

## Problemas Conhecidos

- O projeto utiliza uma API externa para carregar dados de usuários. Caso a API esteja fora do ar, os dados não serão carregados.
