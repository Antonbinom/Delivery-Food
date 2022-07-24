'use strict';
const cardsMenu = document.querySelector('.cards-menu');
const cardInfo = document.querySelector('.section-heading')

const changeTitle = (title) => {
	const {name, price, stars, kitchen} = title;
	cardInfo.innerHTML = `
		<h2 class="section-title restaurant-title">${name}</h2>
		<div class="card-info">
			<div class="rating">
				${stars}
			</div>
			<div class="price">От ${price} ₽</div>
			<div class="category">${kitchen}</div>
		</div>`
};

const renderItems = (data) => {
	data.forEach(({description, id, image, name, price}) => {
		const cardItem = document.createElement('div');
		cardItem.classList.add('card');

		cardItem.innerHTML = `
		<img src="${image}" alt="Фото: Пицца ${name}" class="card-image" />
			<div class="card-text">
				<div class="card-heading">
					<h3 class="card-title card-title-reg">${name}</h3>
				</div>
				<div class="card-info">
					<div class="ingredients">${description}
					</div>
				</div>
				<div class="card-buttons">
					<button class="button button-primary button-add-cart">
						<span class="button-card-text">В корзину</span>
						<span class="button-cart-svg"></span>
					</button>
					<strong class="card-price-bold">${price} ₽</strong>
				</div>
			</div>
		`
		cardsMenu.append(cardItem);
	})
};

if (localStorage.getItem('restaurant')) {
	const restaurant = JSON.parse(localStorage.getItem('restaurant'));

	changeTitle(restaurant);

	fetch(`https://deliveryfood-b371b-default-rtdb.firebaseio.com/db/${restaurant.products}`)
		.then(response => response.json())
		.then(data => renderItems(data))
		.catch(err => console.log(err))
} else {
	window.location.href = '/'
}