document.getElementById('basic').addEventListener('click', (e) => {
    Swal.fire('Any fool can use a computer')
})
document.getElementById('footer').addEventListener('click', (e) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href>Why do I have this issue?</a>'
      })
})
document.getElementById('title').addEventListener('click', (e) => {
    Swal.fire(
        'The Internet?',
        'That thing is still around?',
        'question'
      )
})
document.getElementById('success').addEventListener('click', (e) => {
    Swal.fire({
        icon: "success",
        title: "Success"
    })
})
document.getElementById('error').addEventListener('click', (e) => {
    Swal.fire({
        icon: "error",
        title: "Error"
    })
})
document.getElementById('warning').addEventListener('click', (e) => {
    Swal.fire({
        icon: "warning",
        title: "Warning"
    })
})
document.getElementById('info').addEventListener('click', (e) => {
    Swal.fire({
        icon: "info",
        title: "Info"
    })
})
document.getElementById('question').addEventListener('click', (e) => {
    Swal.fire({
        icon: "question",
        title: "Question"
    })
})
document.getElementById('text').addEventListener('click', (e) => {
 
     Swal.fire({
        title: 'Enter your IP address',
        input: 'text',
        inputLabel: 'Your IP address',
        showCancelButton: true,
    })

})
document.getElementById('email').addEventListener('click', async (e) => {
 
    const { value: email } = await Swal.fire({
        title: 'Input email address',
        input: 'email',
        inputLabel: 'Your email address',
        inputPlaceholder: 'Enter your email address'
      })
      
      if (email) {
        Swal.fire(`Entered email: ${email}`)
      }

})
document.getElementById('url').addEventListener('click', async (e) => {
 
    const { value: url } = await Swal.fire({
        input: 'url',
        inputLabel: 'URL address',
        inputPlaceholder: 'Enter the URL'
      })
      
      if (url) {
        Swal.fire(`Entered URL: ${url}`)
      }
})
document.getElementById('password').addEventListener('click', async (e) => {

    const { value: password } = await Swal.fire({
        title: 'Enter your password',
        input: 'password',
        inputLabel: 'Password',
        inputPlaceholder: 'Enter your password',
        inputAttributes: {
        maxlength: 10,
        autocapitalize: 'off',
        autocorrect: 'off'
        }
    })
    
    if (password) {
        Swal.fire(`Entered password: ${password}`)
    }
  
})
document.getElementById('textarea').addEventListener('click', async (e) => {
    const { value: text } = await Swal.fire({
        input: 'textarea',
        inputLabel: 'Message',
        inputPlaceholder: 'Type your message here...',
        inputAttributes: {
          'aria-label': 'Type your message here'
        },
        showCancelButton: true
      })
      
      if (text) {
        Swal.fire(text)
      }
})
document.getElementById('select').addEventListener('click', async (e) => {
    const { value: fruit } = await Swal.fire({
        title: 'Select field validation',
        input: 'select',
        inputOptions: {
          'Fruits': {
            apples: 'Apples',
            bananas: 'Bananas',
            grapes: 'Grapes',
            oranges: 'Oranges'
          },
          'Vegetables': {
            potato: 'Potato',
            broccoli: 'Broccoli',
            carrot: 'Carrot'
          },
          'icecream': 'Ice cream'
        },
        inputPlaceholder: 'Select a fruit',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === 'oranges') {
              resolve()
            } else {
              resolve('You need to select oranges :)')
            }
          })
        }
      })
      
      if (fruit) {
        Swal.fire(`You selected: ${fruit}`)
      }
  
})