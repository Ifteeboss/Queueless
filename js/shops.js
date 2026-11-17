
// ---------------- SHOP INFORMATION ----------------

// This array stores all the shop information.
// Each shop has an ID, name, category, rating and available time.

const shops = [

    {
        id: 1,
        name: "Classic Barber Shop",
        category: "Barber",
        rating: 4.8,
        closingTime: "9 PM",
        nextSlot: "8:00 PM"
    },

    {
        id: 2,
        name: "Style Zone",
        category: "Barber",
        rating: 4.6,
        closingTime: "9 PM",
        nextSlot: "7:30 PM"
    },

    {
        id: 3,
        name: "City Health Clinic",
        category: "Doctor",
        rating: 4.9,
        closingTime: "10 PM",
        nextSlot: "8:30 PM"
    },

    {
        id: 4,
        name: "Smile Dental Care",
        category: "Dentist",
        rating: 4.7,
        closingTime: "8 PM",
        nextSlot: "6:00 PM"
    },

    {
        id: 5,
        name: "Beauty Care Salon",
        category: "More",
        rating: 4.5,
        closingTime: "9 PM",
        nextSlot: "7:00 PM"
    },

    {
        id: 6,
        name: "Dental Plus",
        category: "Dentist",
        rating: 4.8,
        closingTime: "9 PM",
        nextSlot: "8:00 PM"
    }

];


// ---------------- CONNECT HTML ELEMENTS ----------------

// Get the place where all shop cards will be displayed.
const shopContainer = document.getElementById("shopContainer");

// Get the search input field.
const searchInput = document.getElementById("searchInput");

// Get the search button.
const searchButton = document.getElementById("searchButton");

// Get all category buttons.
const categoryButtons = document.querySelectorAll(".category-btn");

// Get the element that shows the number of shops.
const resultCount = document.getElementById("resultCount");

// Get the message shown when no shop is found.
const noResult = document.getElementById("noResult");


// This variable stores the category selected by the user.
// Initially, all shops will be displayed.

let selectedCategory = "All";


// ---------------- DISPLAY SHOP INFORMATION ----------------

function displayShops(shopList) {

    // First, remove the previously displayed shop cards.
    shopContainer.innerHTML = "";


    // Show how many shops are available.
    resultCount.innerHTML = shopList.length + " shops found";


    // Check whether the shop list is empty.
    if (shopList.length === 0) {

        // Show the no shops found message.
        noResult.style.display = "block";

        // Stop the function because there are no shops to display.
        return;
    }


    // If shops are available, hide the no result message.
    noResult.style.display = "none";


    // Go through each shop one by one.
    shopList.forEach(function(shop) {

        // Create a new div for the shop card.
        const shopCard = document.createElement("div");


        // Give the div a CSS class.
        shopCard.className = "shop-card";


        // Add shop information inside the card.
        shopCard.innerHTML =

            '<div class="shop-image">Shop Image</div>' +

            '<span class="shop-category">' +
                shop.category +
            '</span>' +

            '<h3>' +
                shop.name +
            '</h3>' +

            '<p class="shop-info">' +
                'Rating: ' + shop.rating +
                ' | Open until ' + shop.closingTime +
            '</p>' +

            '<p class="shop-info">' +
                'Next slot: ' + shop.nextSlot +
            '</p>' +

            '<div class="shop-buttons">' +

                '<a class="details-btn" href="shop-details.html?shop=' +
                    shop.id +
                '">View Details</a>' +

                '<a class="book-btn" href="book.html?shop=' +
                    shop.id +
                '">Book Now</a>' +

            '</div>';


        // Add the completed shop card to the HTML page.
        shopContainer.appendChild(shopCard);

    });

}


// ---------------- SEARCH AND FILTER SHOPS ----------------

function searchShops() {

    // Get the text entered by the user.
    const searchText = searchInput.value.toLowerCase().trim();


    // Create a new array containing only matching shops.
    const filteredShops = shops.filter(function(shop) {


        // Check whether the shop name matches the search.
        const matchesName = shop.name.toLowerCase().includes(searchText);


        // Check whether the shop category matches the search.
        const matchesCategory = shop.category.toLowerCase().includes(searchText);


        // Check whether the shop belongs to the selected category.
        let matchesSelectedCategory = false;


        // If All is selected, every category is allowed.
        if (selectedCategory === "All") {

            matchesSelectedCategory = true;

        }

        // If More is selected, show shops in the More category.
        else if (selectedCategory === "More") {

            if (shop.category === "More") {

                matchesSelectedCategory = true;

            }

        }

        // Otherwise, check the exact selected category.
        else {

            if (shop.category === selectedCategory) {

                matchesSelectedCategory = true;

            }

        }


        // Return true if the shop matches the search
        // and also belongs to the selected category.
        return (matchesName || matchesCategory) && matchesSelectedCategory;

    });


    // Display the shops that match the search.
    displayShops(filteredShops);

}


// ---------------- SEARCH BUTTON CLICK ----------------

// When the user clicks the Search button,
// the searchShops function will run.

searchButton.addEventListener("click", function() {

    searchShops();

});


// ---------------- SEARCH WHILE TYPING ----------------

// When the user types something in the search box,
// the shop list will automatically update.

searchInput.addEventListener("input", function() {

    searchShops();

});


// ---------------- CATEGORY BUTTON CLICK ----------------

// Add a click event to every category button.

categoryButtons.forEach(function(button) {

    button.addEventListener("click", function() {


        // First, remove the active class from all buttons.
        categoryButtons.forEach(function(categoryButton) {

            categoryButton.classList.remove("active");

        });


        // Add the active class to the button clicked by the user.
        button.classList.add("active");


        // Get the category name from the clicked button.
        selectedCategory = button.getAttribute("data-category");


        // Display shops based on the selected category.
        searchShops();

    });

});


// ---------------- SHOW SHOPS WHEN PAGE LOADS ----------------

// When the customer opens the Shops page,
// display all shops initially.

displayShops(shops);
