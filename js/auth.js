'use strict';
const btnAuth = document.querySelector('.button-auth');
const btnOut = document.querySelector('.button-out')
const modal = document.querySelector('.modal-auth');
const btnLogin = document.querySelector('.button-login');
const userLogin = document.getElementById('login');
const userPassword = document.getElementById('password');
const loginForm = document.getElementById('logInForm');
const userName = document.querySelector('.user-name');

const userAuth = (user) => {
	localStorage.setItem('user', JSON.stringify(user));

	userName.style.display = "flex";
	btnAuth.style.display = "none";
	btnOut.style.display = "block";
	modal.style.display = "none";
	userName.textContent = user.login;
};

const userOut = () => {
	btnOut.style.display = "none";
	btnAuth.style.display = "flex";
	localStorage.removeItem('user');
	userName.textContent = '';
};

document.addEventListener('click', (e) => {
	if (e.target.closest('.button-auth')) {
		modal.style.display = "flex";
	} else if (e.target.classList.contains('close-auth') || e.target === modal) {
		modal.style.display = "none";
	} else if (e.target.closest('.button-out')) {
		userOut();
	}
});

loginForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const user = {
		login: userLogin.value,
		password: userPassword.value,
	}

	userAuth(user)

});

if (localStorage.getItem('user')) {
	userAuth(JSON.parse(localStorage.getItem('user')));
};