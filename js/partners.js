'use strict';
const cardsRestaurant = document.querySelector('.cards-restaurants');

const renderItems = (data) => {
	data.forEach((item) => {
		const {name, time_of_delivery, stars, price, kitchen, image, products} = item;
		const a = document.createElement('a');

		a.setAttribute('href', '/restaurant.html');
		a.classList.add('card', 'card-restaurant');
		a.dataset.products = products;

		a.innerHTML = `
				<img src="${image}" alt="${name}" class="card-image" />
					<div class="card-text">
						<div class="card-heading">
							<h3 class="card-title">${name}</h3>
							<span class="card-tag tag">${time_of_delivery} мин</span>
						</div>
						<div class="card-info">
							<div class="rating">
								${stars}
							</div>
							<div class="price">От ${price} ₽</div>
						<div class="category">${kitchen}</div>
					</div>
				</div>
		`
		a.addEventListener('click', (e) => {
			e.preventDefault();
			if (localStorage.getItem('user')) {
				localStorage.setItem('restaurant', JSON.stringify(item));
				window.location.href = '/restaurant.html'
			} else {
				const modal = document.querySelector('.modal-auth')
				modal.style.display = "flex";
			}
		})
		cardsRestaurant.append(a);
	})
}

fetch(`https://deliveryfood-b371b-default-rtdb.firebaseio.com/db/partners.json`)
	.then(response => response.json())
	.then(data => renderItems(data))
	.catch(err => console.log(err))