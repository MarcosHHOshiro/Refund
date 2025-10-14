// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//Seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expenseQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

// Captura o evento de input para formatar o valor
amount.oninput = () => {
    // Obtém o valor atual do input e remove os caracteres não numéricos
    let value = amount.value.replace(/\D/g, "")

    // Transformar o valor em centatos (exemplo: 150/100 = 1.5 é equivalente a R$ 1,50)
    value = Number(value) / 100

    // Atualiza o valor do input
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
    // Formata o valor no padrão BRL (Real Brasileiro)
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    // Retorna o valor formatado 
    return value
}

// Captura o evento de submit do formulário para obter os valores 
form.onsubmit = (event) => {
    // Previne o comportamento padrão de recarregar a página
    event.preventDefault()

    // Cria um objeto com os detalhes da nova despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    expenseAdd(newExpense);
}

//Adiciona um novo item na lista
function expenseAdd(newExpense) {
    try {
        //Cria o elemnto li para adicionar o item na lista
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        //Cria o íCone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        //Cria a info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        //Cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        //Cria categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        //Adiciona name e category na div das informações da despesa
        expenseInfo.append(expenseName, expenseCategory)

        //Cria o valor da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        //Cria o icone de remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remove")

        //Adiciona as informações no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        //Adiciona o item na lista
        expenseList.append(expenseItem)

        //Atualiza os totais
        updateTotals()
    } catch (error) {
        alert("Não foi possível adicionar a despesa.")
        console.error(error)
    }
}

//Atualiza os totais 
function updateTotals() {
    try {
        //Recupera todos os itens da lista
        const items = expenseList.children

        //Atualiza a quantidade da lista
        expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

        let total = 0

        //Percorre cada item da lista
        for (let item = 0; item < items.length; item++) {
            const itemAmount = items[item].querySelector(".expense-amount")

            //Remover caracteres nao numericos e substitui a virgula pelo ponto
            let value = itemAmount.textContent.replace(/[^\d]/g, "").replace(",", ".")

            //Converte o valor para float
            value = parseFloat(value)

            //verifica se é um numero valido
            if (isNaN(value)) {
                return alert("Não foi possível calcular o total. O valor não é um número")
            }

            //incrementar o total
            total += Number(value)
        }

        expensesTotal.textContent = total
    } catch (error) {
        console.log(error)
        alert("Não foi possível atualizar os totais")
    }
}