
/* QueueLess - auth.js
   Handles registration and login.
   User information is saved in localStorage.
*/


// ==========================================
// COMMON FUNCTIONS
// ==========================================


// Get all registered users from localStorage

function getUsers() {

    var users = localStorage.getItem("users");

    return JSON.parse(users) || [];

}


// Get all service providers from localStorage

function getProviders() {

    var providers = localStorage.getItem("providers");

    return JSON.parse(providers) || [];

}


// Show error or information message

function showMessage(text) {

    document.getElementById("message").textContent = text;

}



// ==========================================
// REGISTRATION PAGE
// ==========================================


// Find the registration form

var registerForm = document.getElementById("registerForm");


if (registerForm) {

    // Get customer and provider radio buttons

    var roleButtons = document.getElementsByName("role");


    // Find which role the user selected

    function getRole() {

        for (var i = 0; i < roleButtons.length; i++) {

            if (roleButtons[i].checked) {

                return roleButtons[i].value;

            }

        }

    }


    // Show or hide provider information

    for (var i = 0; i < roleButtons.length; i++) {

        roleButtons[i].addEventListener("change", function () {

            var providerFields = document.getElementById("providerFields");

            if (getRole() === "provider") {

                providerFields.classList.remove("hidden");

            } else {

                providerFields.classList.add("hidden");

            }

        });

    }



    // When the user clicks the Register button

    registerForm.addEventListener("submit", function (event) {

        // Stop the page from refreshing

        event.preventDefault();


        // Get the selected role

        var role = getRole();


        // Get information from the input fields

        var fullName = document.getElementById("fullName").value.trim();

        var email = document.getElementById("email").value.trim().toLowerCase();

        var phone = document.getElementById("phone").value.trim();

        var password = document.getElementById("password").value;

        var confirmPassword = document.getElementById("confirmPassword").value;



        // ==================================
        // FORM VALIDATION
        // ==================================


        // Check full name

        if (fullName === "") {

            showMessage("Please enter your full name.");

            return;

        }


        // Email or phone number is required

        if (email === "" && phone === "") {

            showMessage("Please enter an email or a phone number.");

            return;

        }


        // Check email format

        if (email !== "" && (!email.includes("@") || !email.includes("."))) {

            showMessage("Please enter a valid email.");

            return;

        }


        // Check Bangladeshi phone number

        if (phone !== "" && !/^01[0-9]{9}$/.test(phone)) {

            showMessage("Phone must be 11 digits, like 01712345678.");

            return;

        }


        // Check shop information for providers

        if (role === "provider") {

            var shopName = document.getElementById("shopName").value.trim();

            var address = document.getElementById("address").value.trim();

            if (shopName === "" || address === "") {

                showMessage("Please enter your shop name and address.");

                return;

            }

        }


        // Check password length

        if (password.length < 8) {

            showMessage("Password must be at least 8 characters.");

            return;

        }


        // Check if both passwords are the same

        if (password !== confirmPassword) {

            showMessage("Passwords do not match.");

            return;

        }



        // ==================================
        // CHECK EXISTING USERS
        // ==================================


        // Get all existing users

        var users = getUsers();


        // Check whether email or phone already exists

        for (var i = 0; i < users.length; i++) {

            if (
                (email !== "" && users[i].email === email) ||
                (phone !== "" && users[i].phone === phone)
            ) {

                showMessage("This email or phone is already registered.");

                return;

            }

        }



        // ==================================
        // CREATE NEW USER
        // ==================================


        // Store new user information

        var user = {

            user_id: users.length + 1,

            full_name: fullName,

            email: email,

            phone: phone,

            password_hash: password,

            role: role,

            status: role === "provider" ? "pending" : "active"

        };


        // Add the new user to the users array

        users.push(user);


        // Save users in localStorage

        localStorage.setItem("users", JSON.stringify(users));



        // ==================================
        // CREATE PROVIDER INFORMATION
        // ==================================


        if (role === "provider") {

            // Get existing providers

            var providers = getProviders();


            // Add new shop information

            providers.push({

                provider_id: providers.length + 1,

                user_id: user.user_id,

                category_id: Number(document.getElementById("category").value),

                shop_name: document.getElementById("shopName").value.trim(),

                address: document.getElementById("address").value.trim(),

                approval_status: "pending"

            });


            // Save provider information

            localStorage.setItem("providers", JSON.stringify(providers));

        }



        // ==================================
        // REGISTRATION SUCCESS
        // ==================================


        // Hide registration form

        registerForm.classList.add("hidden");


        // Show success section

        document.getElementById("success").classList.remove("hidden");


        // Show different messages for customer and provider

        if (role === "provider") {

            document.getElementById("successText").textContent =
                "Waiting for admin approval. You can log in after approval.";

        } else {

            document.getElementById("successText").textContent =
                "Your account is ready. Please log in.";

        }

    });

}



// ==========================================
// LOGIN PAGE
// ==========================================


// Find the login form

var loginForm = document.getElementById("loginForm");


if (loginForm) {


    // ==================================
    // CREATE DEFAULT ADMIN ACCOUNT
    // ==================================


    // Get all registered users

    var allUsers = getUsers();


    // Check whether admin already exists

    var hasAdmin = false;


    for (var j = 0; j < allUsers.length; j++) {

        if (allUsers[j].role === "admin") {

            hasAdmin = true;

        }

    }


    // Create admin if it does not exist

    if (!hasAdmin) {

        allUsers.push({

            user_id: allUsers.length + 1,

            full_name: "Admin",

            email: "admin@queueless.com",

            phone: "",

            password_hash: "admin12345",

            role: "admin",

            status: "active"

        });


        // Save admin account

        localStorage.setItem("users", JSON.stringify(allUsers));

    }



    // ==================================
    // LOGIN FORM
    // ==================================


    // When the user clicks the Login button

    loginForm.addEventListener("submit", function (event) {

        // Stop page refresh

        event.preventDefault();


        // Get email or phone and password

        var identifier = document.getElementById("identifier").value.trim().toLowerCase();

        var password = document.getElementById("password").value;


        // Check empty fields

        if (identifier === "" || password === "") {

            showMessage("Please enter your email or phone and password.");

            return;

        }



        // ==================================
        // FIND USER ACCOUNT
        // ==================================


        // Get all registered users

        var users = getUsers();


        // Initially no user is selected

        var found = null;


        // Search for matching email or phone and password

        for (var i = 0; i < users.length; i++) {

            var sameId =
                users[i].email === identifier ||
                users[i].phone === identifier;


            if (sameId && users[i].password_hash === password) {

                found = users[i];

            }

        }


        // If no matching account is found

        if (found === null) {

            showMessage("Wrong email, phone or password.");

            return;

        }


        // Check provider approval status

        if (found.status === "pending") {

            showMessage("Your shop is waiting for admin approval.");

            return;

        }


        // Check blocked account

        if (found.status === "blocked") {

            showMessage("This account is blocked.");

            return;

        }



        // ==================================
        // SAVE LOGIN INFORMATION
        // ==================================


        // Save the currently logged-in user

        localStorage.setItem("loggedInUser", JSON.stringify({

            user_id: found.user_id,

            full_name: found.full_name,

            role: found.role

        }));



        // ==================================
        // REDIRECT TO DASHBOARD
        // ==================================


        // Open different pages according to user role

        if (found.role === "provider") {

            window.location.href = "pages/provider/provider-dashboard.html";

        } else if (found.role === "admin") {

            window.location.href = "pages/admin/admin-dashboard.html";

        } else {

            window.location.href = "shops.html";

        }

    });

}
