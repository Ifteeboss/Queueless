
/* ============================================
   QUEUELESS - SHOP INFORMATION
   ============================================ */


// This array stores all available shops.
// Each shop is an object containing its own information.

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



/* ============================================
   CONNECT HTML ELEMENTS WITH JAVASCRIPT
   ============================================ */


// Find the HTML element where shop cards will appear.

const shopContainer = document.getElementById("shopContainer");


// Find the search input field.

const searchInput = document.getElementById("searchInput");


// Find the search button.

const searchButton = document.getElementById("searchButton");


// Find all category buttons.

const categoryButtons = document.querySelectorAll(".category-btn");


// Find the element that displays the number of shops.

const resultCount = document.getElementById("resultCount");


// Find the message displayed when no shops are available.

const noResult = document.getElementById("noResult");



// Initially, the All category is selected.

let selectedCategory = "All";



/* ============================================
   DISPLAY SHOP CARDS
   ============================================ */


// This function receives a list of shops
// and displays those shops on the webpage.

function displayShops(shopList) {


    // STEP 1: Clear previously displayed cards.

    shopContainer.innerHTML = "";



    // STEP 2: Display the total number of shops.

    resultCount.textContent = shopList.length + " shops found";



    // STEP 3: Check whether the shop list is empty.

    if (shopList.length === 0) {

        // Show the no result message.

        noResult.style.display = "block";


        // Stop the function because there are no shops.

        return;

    }



    // If shops are available, hide the no result message.

    noResult.style.display = "none";



    // STEP 4: Create shop cards using a FOR LOOP.


    // Start from index 0.
    // Continue until all shops have been processed.
    // Increase the index by 1 after each round.

    for (let i = 0; i < shopList.length; i++) {


        // Get the current shop information.

        const currentShop = shopList[i];



        // STEP 5: Create a new HTML div.

        const shopCard = document.createElement("div");



        // Give the new div a CSS class.

        shopCard.className = "shop-card";



        // STEP 6: Add shop information inside the card.

        shopCard.innerHTML = `

            <div class="shop-image">
                Shop Image
            </div>


            <span class="shop-category">
                ${currentShop.category}
            </span>


            <h3>
                ${currentShop.name}
            </h3>


            <p class="shop-info">
                Rating: ${currentShop.rating}
                | Open until ${currentShop.closingTime}
            </p>


            <p class="shop-info">
                Next slot: ${currentShop.nextSlot}
            </p>


            <div class="shop-buttons">

                <a class="details-btn"
                   href="shop-details.html?shop=${currentShop.id}">

                    View Details

                </a>


                <a class="book-btn"
                   href="book.html?shop=${currentShop.id}">

                    Book Now

                </a>

            </div>

        `;



        // STEP 7: Put the completed card inside shopContainer.

        shopContainer.appendChild(shopCard);


    } // End of FOR LOOP


} // End of displayShops function




/* ============================================
   SEARCH AND FILTER SHOPS
   ============================================ */


// This function searches shops by name and category.
// It also checks which category button is selected.

function searchShops() {


    // STEP 1: Get the text entered in the search box.

    let searchText = searchInput.value;


    // Convert the text to lowercase.

    searchText = searchText.toLowerCase();


    // Remove unnecessary spaces from the beginning and end.

    searchText = searchText.trim();



    // STEP 2: Create an empty array.

    // Matching shops will be stored inside this array.

    let filteredShops = [];



    // STEP 3: Check every shop one by one.

    for (let i = 0; i < shops.length; i++) {


        // Get the current shop.

        let currentShop = shops[i];



        // STEP 4: Check whether the shop name matches.

        let shopName = currentShop.name.toLowerCase();

        let matchesName = shopName.includes(searchText);



        // STEP 5: Check whether the category matches.

        let shopCategory = currentShop.category.toLowerCase();

        let matchesCategory = shopCategory.includes(searchText);



        // STEP 6: Check the selected category button.

        let matchesSelectedCategory = false;



        // If All is selected, every category is allowed.

        if (selectedCategory === "All") {

            matchesSelectedCategory = true;

        }



        // If More is selected, show only More category shops.

        else if (selectedCategory === "More") {

            if (currentShop.category === "More") {

                matchesSelectedCategory = true;

            }

        }



        // Otherwise, check the exact selected category.

        else {

            if (currentShop.category === selectedCategory) {

                matchesSelectedCategory = true;

            }

        }



        // STEP 7: Check both search and category conditions.

        if (
            (matchesName || matchesCategory) &&
            matchesSelectedCategory
        ) {


            // If both conditions are true,
            // add this shop to the filtered array.

            filteredShops.push(currentShop);

        }


    } // End of FOR LOOP



    // STEP 8: Display only the matching shops.

    displayShops(filteredShops);


} // End of searchShops function




/* ============================================
   SEARCH BUTTON EVENT
   ============================================ */


// When the customer clicks the Search button,
// the searchShops function will execute.

searchButton.addEventListener("click", function() {


    // Call the search function.

    searchShops();


});




/* ============================================
   SEARCH WHILE TYPING
   ============================================ */


// When the customer types something in the search box,
// the shop list will automatically update.

searchInput.addEventListener("input", function() {


    // Call the search function.

    searchShops();


});




/* ============================================
   CATEGORY BUTTON EVENTS
   ============================================ */


// Use a FOR LOOP to connect every category button.

for (let i = 0; i < categoryButtons.length; i++) {


    // Get the current category button.

    let currentButton = categoryButtons[i];



    // Add a click event to this button.

    currentButton.addEventListener("click", function() {



        // STEP 1: Remove active class from all buttons.

        for (let j = 0; j < categoryButtons.length; j++) {

            categoryButtons[j].classList.remove("active");

        }



        // STEP 2: Add active class to the clicked button.

        currentButton.classList.add("active");



        // STEP 3: Get the category name from HTML.

        selectedCategory = currentButton.getAttribute("data-category");



        // STEP 4: Display shops from the selected category.

        searchShops();


    });


}




/* ============================================
   DISPLAY ALL SHOPS WHEN PAGE LOADS
   ============================================ */


// When the customer first opens shops.html,
// display all available shops.

displayShops(shops);
