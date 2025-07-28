/**
 * getting HTML elements
 *
 * */
// element:: loading spinner
const loader = document.querySelector("#loading-spinner");

// element:: phone-cards-container
const phoneCardContainer = document.querySelector("#phone-cards-container");

// function: for loading(fetching) all phone from server.
const loadingAllPhones = async () => {
  // hiding spinner after fetching data
  loader.classList.add("hidden");

  // hiding old searching results
  phoneCardContainer.innerHTML = "";

  // fetching data from server
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=iphone`
  );
  const data = await response.json();
  const actualData = data.data;
  displayPhone(actualData);
};

// function: for displaying phone as card on website
const displayPhone = (phones) => {
  // looping through the data to show
  phones.forEach((phone) => {
    // destructuring the phone object and get the keys
    const { brand, phone_name, image } = phone;

    // creating a element for placing card
    const phoneCard = document.createElement("div");

    // inset data to the card
    phoneCard.innerHTML = `
    <div class="card p-6 w-full shadow-sm">
            <figure
              class="px-10 py-10 bg-[#0D6EFD0D] flex items-center justify-center"
            >
              <img
                src="${image}"
                alt="${phone_name}"
                class="rounded-xl object-scale-down"
              />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title text-[#403F3F] text-[1.4rem]">
                ${phone_name}
              </h2>
              <p class="text-[#706F6F]">
                Discover the ${brand} phone with sleek design, great performance, and smart features.
              </p>
              <p class="text-[#403F3F] text-[1.4rem] font-bold">$999</p>
              <div class="card-actions">
                <button
                  class="btn btn-primary"
                  onclick="my_modal_5.showModal()"
                >
                  Show Details
                </button>
              </div>
            </div>
          </div>
    `;

    // display the card to the phone-cards-container
    phoneCardContainer.appendChild(phoneCard);
  });
};

// event: function for trigger a event when clicking on search button
const searchingPhone = () => {
  // display loading spinner before data fetch
  loader.classList.remove("hidden");

  // for unknown delay time
  setTimeout(() => {
    loadingAllPhones();
  }, 3000);
};
