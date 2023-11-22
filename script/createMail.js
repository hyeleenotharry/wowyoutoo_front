const user_email = {
    "users": [
        {
            "name": "John Doe",
            "email": "john.doe@example.com"
        },
        {
            "name": "Alice Smith",
            "email": "alice.smith@example.com"
        },
        {
            "name": "Bob Johnson",
            "email": "bob.johnson@example.com"
        },
        {
            "name": "Emily Davis",
            "email": "emily.davis@example.com"
        },
        {
            "name": "Michael Wilson",
            "email": "michael.wilson@example.com"
        },
        {
            "name": "Sarah Brown",
            "email": "sarah.brown@example.com"
        },
        {
            "name": "David Lee",
            "email": "david.lee@example.com"
        },
        {
            "name": "Olivia Garcia",
            "email": "olivia.garcia@example.com"
        },
        {
            "name": "James Martinez",
            "email": "james.martinez@example.com"
        },
        {
            "name": "Emma Rodriguez",
            "email": "emma.rodriguez@example.com"
        }
    ]
}

$(document).ready(function () {
    $('#user-email').empty()
    user_email["users"].forEach(e => {
        let email_html = `
        <li>
                <input id="c1" type="checkbox">
                <label for="c1">${e['email']}</label>
            </li>`
        $('#user-email').append(email_html)
    });
})