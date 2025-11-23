# 🗄️ Sistema de Controle de Armários - AAPM SENAI Osasco

> ⚠️ **Projeto em Desenvolvimento** - Este sistema está sendo desenvolvido e será disponibilizado publicamente em breve.

## 📝 Sobre

Sistema para digitalizar o controle de armários dos alunos do SENAI Osasco, desenvolvido para a AAPM (Associações de Alunos, Ex-alunos, Pais e Mestres das escolas do SENAI).

Atualmente o controle é feito manualmente, causando desorganização e dificuldades. Este sistema resolve isso permitindo:
- Cadastro de alunos e vinculação com armários
- Visualização de armários disponíveis, ocupados e em manutenção
- Gestão de reservas dos armários

## 🛠️ Tecnologias

- **Backend:** Node.js + Express
- **Banco de Dados:** MariaDB
- **Frontend:** HTML, CSS e JavaScript
- **SweetAlert2:** Biblioteca para alerts minimalistas

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js instalado
- MariaDB ou MySQL instalado

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/Gabriel-Duarte0711/projeto-AAPM.git
cd projeto-AAPM
```

2. **Instale e atualize as dependências**
```bash
npm update
```

3. **Configure o banco de dados**
- Importe o arquivo `banco.sql` no seu MariaDB/MySQL
- Edite suas credenciais em `src/config/db.js`:

4. **Inicie o servidor**
```bash
npm start
```

Pronto! O servidor estará rodando em `http://localhost:3000` 🎉

## 📊 Estrutura do Banco de Dados

- **tabela_usuario** - Dados dos alunos
- **tabela_curso** - Cursos disponíveis no Senai Osasco
- **tabela_armario** - 172 armários (estados: disponível, ocupado, manutenção)
- **tabela_reserva_armario** - Vínculo aluno-armário
- **tabela_login** - Credenciais de acesso


## 🔄 Status do Projeto

🚧 **Em desenvolvimento ativo**

Funcionalidades em andamento:
- Interface web completa
- Sistema de autenticação
- Dicionário de Dados
- Login criptografado

---

**Desenvolvido pelos alunos Isabella Lopreti e Gabriel Duarte do SENAI Osasco para a AAPM** 💙
