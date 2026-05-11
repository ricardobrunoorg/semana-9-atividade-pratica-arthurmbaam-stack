
const data = {
    "produtos": [
      {
        "id": 1,
        "nome": "Smartphone Galaxy S23",
        "preco": 3499.90,
        "categoria": "Celulares",
        "imagem": "images/1g.avif",
        "descricao": "Smartphone com 128GB de armazenamento, câmera de alta resolução e excelente desempenho.",
        "emEstoque": true
      },
      {
        "id": 2,
        "nome": "Notebook Dell Inspiron 15",
        "preco": 4599.00,
        "categoria": "Notebooks",
        "imagem": "images/notebook.jpg",
        "descricao": "Notebook com processador Intel i7, 16GB de RAM e SSD de 512GB, ideal para trabalho e estudos.",
        "emEstoque": false
      }
    ]
  }
// B.2 - SELEÇÃO DE ELEMENTOS
const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

// B.3 - FUNÇÕES

function formatPrice(preco) {
    return "R$ " + preco.toFixed(2);
}

function createProductCard(produto) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", produto.id);

    // estilo obrigatório via JS
    card.style.backgroundColor = "#f9f9f9";

    card.innerHTML = `
        <h3>${produto.nome}</h3>
        <img src="${produto.imagem}">
        <p>${formatPrice(produto.preco)}</p>
        <p>${produto.categoria}</p>
        <button class="details-btn">Ver detalhes</button>
        <button class="highlight-btn">Destacar</button>
    `;

    // eventos
    const btnDetails = card.querySelector(".details-btn");
    const btnHighlight = card.querySelector(".highlight-btn");

    btnDetails.addEventListener("click", () => {
        showProductDetails(produto);
    });

    btnHighlight.addEventListener("click", () => {
        card.classList.toggle("highlight");
    });

    return card;
}

function renderProducts(produtos) {
    productList.innerHTML = "";

    produtos.forEach(prod => {
        const card = createProductCard(prod);
        productList.appendChild(card);
    });

    // B.5 querySelectorAll obrigatório
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        console.log("Card ID:", card.getAttribute("data-id"));
    });
}

function renderCategories() {
    const categorias = ["Todas"];

    data.produtos.forEach(p => {
        if (!categorias.includes(p.categoria)) {
            categorias.push(p.categoria);
        }
    });

    categorySelect.innerHTML = "";

    categorias.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });
}

function showProductDetails(produto) {
    productDetails.innerHTML = `
        <h3>${produto.nome}</h3>
        <p>Preço: ${formatPrice(produto.preco)}</p>
        <p>Categoria: ${produto.categoria}</p>
        <p>Estoque: ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
        <p>${produto.descricao}</p>
    `;
}

function filterProducts() {
    const texto = searchInput.value.toLowerCase();
    const categoria = categorySelect.value;

    return data.produtos.filter(p => {
        const matchNome = p.nome.toLowerCase().includes(texto);
        const matchCategoria = categoria === "Todas" || p.categoria === categoria;
        return matchNome && matchCategoria;
    });
}

// EVENTOS
searchInput.addEventListener("input", () => {
    renderProducts(filterProducts());
});

categorySelect.addEventListener("change", () => {
    renderProducts(filterProducts());
});

btnRender.addEventListener("click", () => {
    renderProducts(filterProducts());
});

// INICIALIZAÇÃO
renderCategories();
renderProducts(data.produtos);


  