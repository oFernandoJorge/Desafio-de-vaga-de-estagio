# ===========================================
# 📋 GERENCIADOR DE ATIVIDADES - REACT
# ===========================================

## 🌟 VISÃO GERAL
Aplicativo completo para gerenciamento de tarefas com:

- CRUD de atividades
- Organização por status (Pendente / Andamento / Concluído)
- Persistência em localStorage
- Drag-and-drop intuitivo
- Design responsivo

---

## 🛠 TECNOLOGIAS

- React.js
- Context API
- localStorage
- CSS puro

---

## 🚀 COMEÇANDO

### PRÉ-REQUISITOS

- Node.js v16+
- npm ou yarn

### INSTALAÇÃO

```bash
git clone <URL_DO_REPOSITORIO>
cd gerenciador-atividades
npm install
npm start
```

---

## 🔧 FUNCIONALIDADES PRINCIPAIS

✔ Adição de tarefas com validação  
✔ Edição inline de atividades  
✔ Exclusão com confirmação  
✔ Organização em colunas Kanban  
✔ Persistência automática

---

## 📂 ESTRUTURA DO PROJETO

```bash
src/
├── components/
│   ├── ActivityForm.jsx
│   ├── ActivityItem.jsx
│   ├── ActivityList.jsx
│   └── StatusColumn.jsx
│
├── context/
│   └── ActivityContext.js
│
└── styles/
    └── App.css
```

---

## 🔍 TESTES

### 1. Persistência
- Adicione tarefas e recarregue a página
- Verifique o localStorage no DevTools (F12)

### 2. Responsividade
- Teste em mobile usando Chrome DevTools

### 3. Validações
- Tente adicionar tarefa sem título
- Teste datas passadas

---

## 📈 MELHORIAS FUTURAS

- Autenticação de usuários
- Sincronização com API externa
- Dark mode

---

## 📄 LICENÇA

MIT — Veja o arquivo LICENSE para mais detalhes.

---

## ✨ DESTAQUES TÉCNICOS

- Arquitetura componentizada
- Gerenciamento de estado com Context API
- UX cuidadoso com feedback visual
- Código documentado e organizado

---

## ✉ CONTATO

**Fernando Jorge**  
📧 fernandojorgedossantosfilho@gmail.com  

- LinkedIn: https://www.linkedin.com/in/fernando0jorg3/
- GitHub: https://github.com/FJdevdev
