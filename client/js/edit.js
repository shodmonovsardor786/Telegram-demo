;(async () => {
	
	const userStorage = localStorage.getItem('user') || '{}'
	const user = JSON.parse(userStorage)
	if(!user.username) { window.location.pathname = '/' }
	
	
	const fileForm = document.querySelector('.file')
	const accountImg = document. querySelector('.accountImg')
	const file =  document.querySelector('#file-upload')
	const label =  document.querySelector('.file-upload')
	const message = document.querySelector('.updated')
	const form = document.querySelector('.editNames')
	const username = document.querySelector('.username')
	const usernameInput = document.querySelector('.usernameInput')
	const password = document.querySelector('.password')
	
	username.textContent = user.username
	
	// if(user.avatar != null) { 	accountImg.setAttribute('src', 'images/' + user.avatar)	}
	// fileForm.addEventListener('submit', async e => {
		
		// e.preventDefault()
		
		// if (file.value) {
			// const response = await fetch('http://localhost:4000/postfile',
			// {
			// 	method: 'POST',
			// 	headers: {	'Content-Type': 'application/json'	}, 
			// 	body: JSON.stringify({ 
			// 		username: user.username,	
			// 	})
			// })
			
			// console.log(response);
			// const  data  = await response.json()
			// message.textContent = data.message
			
			// if(!response.error){
			// 	user.avatar = data.data.avatar
			// 	window.localStorage.setItem('user', JSON.stringify(user))
			// 	setTimeout(() => {  window.location.pathname = '/chat'   }, 2000)
			// }
			// else {	throw new Error  }
	// 	}
	// })
	
	
	
	form.addEventListener('submit', async e => {
		e.preventDefault()
		
		if(usernameInput.value.trim() && password.value.trim() ) {
			const response = await fetch('http://localhost:4000/edit', 
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json'	}, 
				body: JSON.stringify({ 
					user_id: user.user_id,	
					newUsername: usernameInput.value.trim(),
					newPassword: password.value.trim(),
				}) 
			})
			const  data  = await response.json()
			message.textContent = data.message
			
			if(!data.error) {
				user.username = data.data.username
				user.password = data.data.password
				window.localStorage.setItem('user', JSON.stringify(user))
				setTimeout(() => {  window.location.pathname = '/chat'   }, 2000)
			}
			else { throw new Error() }
		}
		
		else if(usernameInput.value.trim()) {
			const response = await fetch('http://localhost:4000/edit', 
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json'	}, 
				body: JSON.stringify({ 
					user_id: user.user_id,	
					newUsername: usernameInput.value.trim() ,
				}) 
			})	
			const  data  = await response.json()
			message.textContent = data.message
			
			if(!data.error) {
				user.username = data.data.username
				window.localStorage.setItem('user', JSON.stringify(user))
				setTimeout(() => {  window.location.pathname = '/chat'   }, 2000)
			}
			else { throw new Error() }
		}
		
		else if(password.value.trim()) {
			const response = await fetch('http://localhost:4000/edit', 
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json'	}, 
				body: JSON.stringify({ 
					user_id: user.user_id,	
					newPassword: password.value.trim() ,
				}) 
			})
			
			const  data  = await response.json()
			message.textContent = data.message
			if(!data.error) {
				user.password = data.data.password
				window.localStorage.setItem('user', JSON.stringify(user))
				setTimeout(() => {  window.location.pathname = '/chat'   }, 2000)
			}
			else { throw new Error() }	
		}
		
	})
	
})()