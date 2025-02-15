document
    .querySelector('.contact-form')
    .addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const nameUser = document.getElementById('name-user').value;
        const message = document.getElementById('message').value;

        // All fields required for submission
        if (!email || !nameUser || !message) {
            alert('Please fill in all fields!');
            return;
        }

        const contactData = {
            email: email,
            name: nameUser,
            message: message
        };

        // POST
        fetch('http://localhost:3000/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        })
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
                alert('Your message has been sent successfully!');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });

        document.getElementById('email').value = '';
        document.getElementById('name-user').value = '';
        document.getElementById('message').value = '';
    });

function fetchContacts() {
    fetch('http://localhost:3000/contact')
        .then((response) => response.json())
        .then((data) => {
            console.log('Contact Submission:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// DELETE
function deleteContact(id) {
    fetch(`http://localhost:3000/contact/${id}`, {
        method: 'DELETE'
    })
        .then((response) => {
            if (response.ok) {
                alert('Contact submission deleted.');
            } else {
                alert('Deletion of submission failed.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred while deleting the contact.');
        });
}
