const body = document.querySelector("body");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".navbar__close-btn");
const menuBar = document.querySelector(".menu-bar");
const navList = document.querySelector(".navbar__list");
const productImageListContainer = document.querySelectorAll(
  ".product__image-lists"
);
const productGalleryfirst = document.querySelector(".product__gallery");

const productImages = document.querySelectorAll(".products");

/*lighbox Gallery*/
const lightBoxGallery = document.querySelector(".lightbox-gallery");
const lightBoxGalleryWrapper = document.querySelector(".light-box-wrapper");
const lightboxImageList = document.querySelector(
  ".lightbox-gallery__image-lists"
);
const lightBoxGalleryImages = document.querySelectorAll(
  ".lightbox-gallery__product"
);
const closeLightButton = document.querySelector(".close-light-box-btn");
const thumnailImagesContainer = document.querySelectorAll(
  ".list-of-thumbnail-images"
);

const arrowBtns = document.querySelectorAll(".btn-container");

const navbar = document.querySelector(".navbar");
const navListItems = document.querySelectorAll(".navbar__list-item");

/*product quantity*/
const decreaseProductBtn = document.querySelector(".product__decrease-btn");
const increaseProductBtn = document.querySelector(".product__increase-btn");

const numberOfProductEl = document.querySelector(".product__number");
const productFinalPriceEl = document.querySelector(".product__final-price");

//addToCart button
const addToCartBtn = document.querySelector(".add-to-cart-btn");
const cartImage = document.querySelector(".cart-img");
const cartInfo = document.querySelector(".cart-info");
const cartInfoDescription = document.querySelector(".cart-info-description");

//delete Button
const deleteButton = document.querySelector(".delete-icon");

//display and close navbar
closeBtn.addEventListener("click", function () {
  navList.classList.add("move-to-the-left");
});

menuBar.addEventListener("click", function () {
  navList.classList.remove("move-to-the-left");
});

//move The product images
//first page
let curImage = 0;
const maxLength = productImages.length;

//create a thumbnail images
const createThumbnailImages = function () {
  productImages.forEach((_, i) => {
    const markup = `
     <li class="thumbnail-image" 
     data-image= ${i}  >
            <img src="./images/image-product-${
              i + 1
            }-thumbnail.jpg" alt="product-${i + 1} thumbnail image"/>
    </li>`;

    thumnailImagesContainer.forEach((container) => {
      container.insertAdjacentHTML("beforeend", markup);
    });
  });
};

const activateThumbnailImage = function (curImage) {
  //removing the active class from the thumbnail images
  document.querySelectorAll(".thumbnail-image").forEach((img) => {
    img.classList.remove("thumbnail-image--active");
  });

  document
    .querySelectorAll(`.thumbnail-image[data-image = "${curImage}"]`)
    .forEach((img) => {
      img.classList.add("thumbnail-image--active");
    });
};

//goto page
const gotoPage = function (curImage) {
  productImages.forEach((productImage, index) => {
    productImage.style.transform = `translateX(${(index - curImage) * 100}%)`;
  });

  lightBoxGalleryImages.forEach((lightBoxGalleryImg, index) => {
    lightBoxGalleryImg.style.transform = `translateX(${
      (index - curImage) * 100
    }%)`;
  });
};

//move to the next page
const nextPage = function () {
  if (curImage === maxLength - 1) curImage = 0;
  else curImage++;

  gotoPage(curImage);
  activateThumbnailImage(curImage);
};

//move to the previous page
const previousPage = function () {
  if (curImage === 0) curImage = maxLength - 1;
  else curImage--;

  gotoPage(curImage);
  activateThumbnailImage(curImage);
};

createThumbnailImages();
activateThumbnailImage(0);
//go to the first page
gotoPage(curImage);

//clicking the arrow buttons
const changingProductImages = function (e) {
  const btnNext = e.target.closest(".btn-next");

  const btnPrevious = e.target.closest(".btn-previous");

  //clicking the left arrow btn
  if (btnNext) nextPage();
  //clicking the right arrow btn
  if (btnPrevious) previousPage();
};

productImageListContainer.forEach((container) => {
  container.addEventListener("click", changingProductImages);
});

lightBoxGalleryWrapper.addEventListener("click", changingProductImages);

//clicking the thumbnail images
thumnailImagesContainer.forEach((container) => {
  container.addEventListener("click", function (e) {
    const thumbnailImage = e.target.closest(".thumbnail-image");

    if (!thumbnailImage) return;

    const clickedImage = +thumbnailImage.dataset.image;

    curImage = clickedImage;

    gotoPage(curImage);
    activateThumbnailImage(curImage);
  });
});

//changing the number of product
let noOfProduct = +numberOfProductEl.textContent;

decreaseProductBtn.addEventListener("click", function () {
  if (noOfProduct > 0) {
    noOfProduct--;

    numberOfProductEl.textContent = noOfProduct;
  }
});

increaseProductBtn.addEventListener("click", function () {
  noOfProduct++;

  numberOfProductEl.textContent = noOfProduct;
});

/*displaying and hiding the cart image*/
cartImage.addEventListener("click", function () {
  cartInfo.classList.remove("hidden");
  cartInfo.classList.add("click");
});

cartImage.addEventListener("mouseover", function () {
  cartInfo.classList.remove("hidden");
});

cartImage.addEventListener("mouseout", function () {
  if (!cartInfo.classList.contains("click")) cartInfo.classList.add("hidden");
});

body.addEventListener("click", function (e) {
  const btn = e.target.closest(".cart-img");
  const clickInsideTheCartInfo = e.target.closest(".cart-info");

  if (btn === cartImage || clickInsideTheCartInfo) return;

  if (!cartInfo.classList.contains("hidden")) {
    cartInfo.classList.add("hidden");
    cartInfo.classList.remove("click");
  }
});

//add to cart functionalitiy
const noOfProductInCart = document.querySelector(".product-num");
const productPrice = +productFinalPriceEl.textContent.slice(1);

//add To Cart button
addToCartBtn.addEventListener("click", function () {
  //add the products to the cart only if the number of product is above 0
  if (noOfProduct === 0) return;

  noOfProductInCart.classList.remove("hidden");
  noOfProductInCart.textContent = noOfProduct;

  const markup = `<img
            src="./images/image-product-1-thumbnail.jpg"
            alt="thumbnail image for product"
            class="cart-product-image"
          />

          <div class="cart-product-name-container">
            <p class="cart-product-name">Fall Limited Edition Sneakers</p>

            <div class="cart-product-quantity-container">
              <p class="cart-product-price">${new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(productPrice)}</p>
              <p>x</p>
              <p class="cart-product-quantity">${noOfProduct}</p>
              <p class="cart-product-final-price">${new Intl.NumberFormat(
                "en-US",
                {
                  style: "currency",
                  currency: "USD",
                }
              ).format(productPrice * noOfProduct)}</p>
            </div>
          </div>

          <img
            src="./images/icon-delete.svg"
            alt="delete icon"
            class="delete-icon"
          />

          <button class="btn checkout-btn">
            <p class="add-to-cart-text">Checkout</p>
          </button>`;

  cartInfoDescription.innerHTML = "";

  cartInfoDescription.insertAdjacentHTML("afterbegin", markup);
});

//emptying the cart
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".delete-icon");

  if (!btn) return;

  //emptying the number of prodouct
  noOfProduct = 0;
  noOfProductInCart.textContent = noOfProduct;
  numberOfProductEl.textContent = noOfProduct;
  noOfProductInCart.classList.add("hidden");

  cartInfoDescription.innerHTML = "";

  const markup = `<p class="empty-cart-image">Your cart is empty</p>`;

  cartInfoDescription.insertAdjacentHTML("afterbegin", markup);
});

//addEventListener for the load and resize event on the window
function addEvent(eventName, callback) {
  window.addEventListener(eventName, callback);
}

const buttonsInsideLightBox =
  lightBoxGalleryWrapper.querySelectorAll(".btn-container");

//open the lightbox
const openingTheLightBoxGallery = function (e) {
  const clickedProductGallery = e.target.closest(".product__image-lists");

  if (!clickedProductGallery) return;

  overlay.classList.remove("hidden");

  buttonsInsideLightBox.forEach((arrowBtn) => {
    arrowBtn.classList.remove("hidden");
  });
};

//close the lightboxgallery
overlay.addEventListener("click", function (e) {
  if (e.target !== overlay) return;

  overlay.classList.add("hidden");
});

closeLightButton.addEventListener("click", function () {
  overlay.classList.add("hidden");
});

/*changing css styles on the load and resize event*/
const changeCssStyle = function () {
  const screenWidth = window.innerWidth;

  //when the screen size is above 820
  if (screenWidth >= 820) {
    thumnailImagesContainer.forEach((container) => {
      container.classList.remove("hidden");
    });

    arrowBtns.forEach((btn) => {
      btn.classList.add("hidden");
    });
  }

  //when the screen size is above 1100
  if (screenWidth >= 1100) {
    navList.classList.remove("move-to-the-left");

    buttonsInsideLightBox.forEach((arrowBtn) => {
      arrowBtn.classList.remove("hidden");
      arrowBtn.style.top = `calc(${lightboxImageList.offsetHeight / 2}px )`;
    });

    //hovering on the interactive elements
    lightBoxGalleryWrapper.addEventListener("mouseover", function (e) {
      const btnNext = e.target.closest(".btn-next");

      const btnPrevious = e.target.closest(".btn-previous");

      const closeButton = e.target.closest(".close-light-box-btn");

      if (btnNext) {
        const img = btnNext.firstElementChild;

        img.src = `./images/icon-next-orange.svg`;
      } else if (btnPrevious) {
        const img = btnPrevious.firstElementChild;

        img.src = `./images/icon-previous-orange.svg`;
      } else if (closeButton) {
        closeButton.src = `./images/icon-close-orange.svg`;
      }
    });

    //hovering out the interactive elements
    lightBoxGalleryWrapper.addEventListener("mouseout", function (e) {
      const btnNext = e.target.closest(".btn-next");

      const btnPrevious = e.target.closest(".btn-previous");

      const closeButton = e.target.closest(".close-light-box-btn");

      if (btnNext) {
        const img = btnNext.firstElementChild;

        img.src = `./images/icon-next.svg`;
      } else if (btnPrevious) {
        const img = btnPrevious.firstElementChild;

        img.src = `./images/icon-previous.svg`;
      } else if (closeButton) {
        closeButton.src = `./images/icon-close-white.svg`;
      }
    });

    productGalleryfirst.addEventListener("click", openingTheLightBoxGallery);
    productGalleryfirst.addEventListener("click", function () {
      buttonsInsideLightBox.forEach((arrowBtn) => {
        arrowBtn.style.top = `calc(${lightboxImageList.offsetHeight / 2}px )`;
      });
    });
  }

  //when the screen size is below 1100
  if (screenWidth < 1100) {
    navList.classList.add("move-to-the-left");
    overlay.classList.add("hidden");
    productGalleryfirst.removeEventListener("click", openingTheLightBoxGallery);
  }

  //when the screen size is below 820
  if (screenWidth < 820) {
    thumnailImagesContainer.forEach((container) => {
      container.classList.add("hidden");
    });

    arrowBtns.forEach((btn) => {
      btn.classList.remove("hidden");
    });
  }
};

addEvent("load", changeCssStyle);
addEvent("resize", changeCssStyle);
