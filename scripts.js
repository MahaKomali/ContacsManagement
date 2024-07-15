document.addEventListener("DOMContentLoaded", function() {
    loadContacts();

    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveContact();
    });
});

function showAddContactForm() {
    document.getElementById('contact-form').style.display = 'block';
    document.getElementById('contactForm').reset();
    document.getElementById('contactId').value = '';
}

function hideContactForm() {
    document.getElementById('contact-form').style.display = 'none';
}

function saveContact() {
    const id = document.getElementById('contactId').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    if (id) {
        // Update existing contact
        contacts = contacts.map(contact => contact.id === id ? { id, name, phone, email } : contact);
    } else {
        // Add new contact
        const newContact = { id: new Date().getTime().toString(), name, phone, email };
        contacts.push(newContact);
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
    loadContacts();
    hideContactForm();
}

function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contactList = document.getElementById('contacts');
    contactList.innerHTML = '';
    contacts.forEach(contact => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${contact.name} - ${contact.phone} - ${contact.email}</span>
            <div>
                <button class="edit" onclick="editContact('${contact.id}')">Edit</button>
                <button onclick="deleteContact('${contact.id}')">Delete</button>
            </div>
        `;
        contactList.appendChild(li);
    });
}

function editContact(id) {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contact = contacts.find(contact => contact.id === id);
    if (contact) {
        document.getElementById('contactId').value = contact.id;
        document.getElementById('name').value = contact.name;
        document.getElementById('phone').value = contact.phone;
        document.getElementById('email').value = contact.email;
        document.getElementById('contact-form').style.display = 'block'; // Ensure form is displayed
    }
}

function deleteContact(id) {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts = contacts.filter(contact => contact.id !== id);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    loadContacts();
}

