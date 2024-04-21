const shoppingBasket = {
  initialize() {
    const allAddBtn = document.querySelectorAll(".btn-primary");
    if (!localStorage.getItem("basket")) {
      localStorage.setItem("basket", JSON.stringify([]));
    }
    allAddBtn.forEach((btn) => {
      btn.addEventListener("click", this.addToBasket.bind(this));
    });
    this.updateBasketCount();
    this.renderBasket();
  },
  
  addToBasket(e) {
    e.preventDefault();
    const btn = e.target;
    const Id = btn.parentElement.parentElement.getAttribute("data-id");
    const Name = btn.previousElementSibling.previousElementSibling.innerText;
    const Image = btn.parentElement.previousElementSibling.getAttribute("src");
    let basket = JSON.parse(localStorage.getItem("basket")) || [];
    let existPro = basket.find((p) => p.id === Id);
    if (!existPro) {
      basket.push({ id: Id, count: 1, name: Name, image: Image });
    } else {
      existPro.count++;
    }
    localStorage.setItem("basket", JSON.stringify(basket));
    this.updateBasketCount();
    this.renderBasket();
  },
  
  updateBasketCount() {
    const basketcount = document.querySelector(".basketcount");
    const basket = JSON.parse(localStorage.getItem("basket")) || [];
    basketcount.innerText = basket.length;
  },

  renderBasket() {
    const basketItems = document.getElementById("basketItems");
    basketItems.innerHTML = "";
  
    const basket = JSON.parse(localStorage.getItem("basket")) || [];
  
    if (basket.length !== 0) {
      for (const product of basket) {
        let tr = document.createElement("tr");

        let tdImg = document.createElement("td");
        let img = document.createElement("img");
        img.setAttribute("src", product.image);
        img.setAttribute("width", "150px");
        tdImg.appendChild(img);

        let tdName = document.createElement("td");
        tdName.innerText = product.name;

        let tdCount = document.createElement("td");
        let countInput = document.createElement("input");
        countInput.setAttribute("type", "number");
        countInput.setAttribute("min", "1");
        countInput.setAttribute("value", product.count);
        countInput.addEventListener("input", (e) => {
          this.updateProductCount(product.id, parseInt(e.target.value));
        });
        tdCount.appendChild(countInput);

        let tdDelete = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.classList.add("btn", "btn-danger");
        deleteButton.addEventListener("click", () => {
          this.deleteProduct(product.id);
        });
        tdDelete.appendChild(deleteButton);
        
        tr.appendChild(tdImg);
        tr.appendChild(tdName);
        tr.appendChild(tdCount);
        tr.appendChild(tdDelete);
        
        basketItems.appendChild(tr);
      }
    } else {
      basketItems.innerHTML = "<tr><td colspan='4' style='text-align:center'>Basket is empty, <a href='index.html'>Product Elave edin</a></td></tr>";
    }
  },
  
  updateProductCount(productId, newCount) {
    let basket = JSON.parse(localStorage.getItem("basket")) || [];
    let productIndex = basket.findIndex((p) => p.id === productId);
    if (productIndex !== -1) {
      basket[productIndex].count = newCount;
      localStorage.setItem("basket", JSON.stringify(basket));
      this.updateBasketCount();
      this.renderBasket();
    }
  },
  
  deleteProduct(productId) {
    let basket = JSON.parse(localStorage.getItem("basket")) || [];
    let updatedBasket = basket.filter((p) => p.id !== productId);
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
    this.updateBasketCount();
    this.renderBasket();
  }
  
};

document.addEventListener("DOMContentLoaded", () => {
  shoppingBasket.initialize();
});
