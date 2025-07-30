/**
 * getting HTML elements
 *
 * */
// element:: search box
const searchBox = document.querySelector("#input-search-box");

// element:: loading spinner
const loader = document.querySelector("#loading-spinner");

// element:phones-container section
const phonesContainer = document.querySelector("#phones-container");

// element:: phone-cards-container
const phoneCardContainer = document.querySelector("#phone-cards-container");

// element:: show-more-phone-btn
const buttonShowAll = document.querySelector("#show-more-phone-btn");

// element:: data not found alert container
const alertContainer = document.querySelector("#alert-container");

//element:: phone details container
const detailsContainer = document.querySelector("#details-container");

/****************************************************************************************************** */
// preserving fetching data(all phones)
let collectionOfPhones = [];

// for load more pagination or lazy loading
const chunkSize = 6;
let targetIndex = 6;
let endIndex = 12;

// function: for loading(fetching) all phone from server.
const loadingAllPhones = async (yourSearchPhone) => {
  // hiding spinner after fetching data
  loader.classList.add("hidden");

  // fetching data(all phones) from server
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${
      yourSearchPhone ? yourSearchPhone : "iphone"
    }`
  );
  const actualData = await response.json();

  // validating fetching
  const fetchingStatus = actualData.status;
  if (!fetchingStatus) {
    // hide phones container section(parent of phones cards)
    phonesContainer.classList.add("hidden");

    // active the alert (data not found)
    alertContainer.classList.remove("hidden");
    return;
  } else {
    // hide the alert (data not found)
    alertContainer.classList.add("hidden");

    // active phones container section(parent of phones cards)
    phonesContainer.classList.remove("hidden");
  }

  // set the data for preserving
  collectionOfPhones = actualData.data;

  // calling function for displaying first 6 phone cards
  displayPhone(collectionOfPhones.slice(0, 6));

  // activate show all phone card button
  if (collectionOfPhones.length > 6) {
    buttonShowAll.classList.remove("hidden");
  }
};

// function: for displaying phone as card on website
const displayPhone = (phones) => {
  // looping through the data to show
  phones.forEach((phone) => {
    // destructuring the phone object and get the keys
    const { brand, phone_name, slug, image } = phone;

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
                  onclick="loadingPhoneDetail('${slug}')"
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

// function: for showing all phone data in a card
const showMorePhonesCard = () => {
  // load more pagination or lazy loading condition
  if (targetIndex > collectionOfPhones.length) {
    // hiding show all phone card button
    buttonShowAll.classList.add("hidden");

    return;
  }

  // calling the function for display all phone cards
  displayPhone(collectionOfPhones.slice(targetIndex, endIndex));

  // reassign the value for take next step
  targetIndex = endIndex;
  endIndex = targetIndex + chunkSize;
};

// event: function for trigger a event when clicking on search button
const searchingPhone = () => {
  // stop form's default reloading
  event.preventDefault();

  // get the search Item
  const searchItem = searchBox.value;

  // hiding show all phone card button
  buttonShowAll.classList.add("hidden");

  // display loading spinner before data fetch
  loader.classList.remove("hidden");

  // removing old searching results
  phoneCardContainer.innerHTML = "";

  // again initialized the value for lazy loading
  targetIndex = 6;
  endIndex = 12;

  // for unknown delay time
  setTimeout(() => {
    loadingAllPhones(searchItem);
  }, 3000);
};

// function::  for showing phone details
const loadingPhoneDetail = async (slugOfPhone) => {
  try {
    // fetching the specific phone details data from server
    const responseTheDetailObj = await fetch(
      `https://openapi.programming-hero.com/api/phone/${slugOfPhone}`
    );
    const detailObj = await responseTheDetailObj.json();
    const actualDetails = detailObj.data;

    // calling function for showing details modal
    showDetails(actualDetails);
  } catch (err) {
    console.error("Error: fetching details fail", err);
  }
};

//function:: showing phone details in modal
const showDetails = (phoneInfo) => {
  // inserting the phone details into the modal
  detailsContainer.innerHTML = `
  <figure
              class="px-10 py-10 bg-[#0D6EFD0D] flex items-center justify-center"
            >
              <img src="${phoneInfo?.image}" alt="Iphone" />
            </figure>
            <h3 class="text-[1.6rem] font-bold text-[#403F3F] mt-[2.15rem]">
              ${phoneInfo?.name}
            </h3>

            <p class="mt-[1.3rem] text-base text-[#706F6F]">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>

            <!-- storage info  -->
            <p class="text-[1.1rem] text-[#706F6F] mt-[1.1rem]">
              <strong class="text-[#403F3F] font-semibold">Storage :</strong>
              ${phoneInfo?.mainFeatures?.storage}
            </p>

            <!-- display info  -->
            <p class="text-[1rem] text-[#706F6F] mt-[1.1rem]">
              <strong class="text-[#403F3F] font-semibold"
                >Display Size : </strong
              >${phoneInfo?.mainFeatures?.displaySize}
            </p>

            <!-- chipset info  -->
            <p class="text-[1rem] text-[#706F6F] mt-[1.1rem]">
              <strong class="text-[#403F3F] font-semibold">Chipset : </strong>
              ${phoneInfo?.mainFeatures?.chipSet}
            </p>

            <!-- memory info  -->
            <p class="text-[1rem] text-[#706F6F] mt-[1rem]">
              <strong class="text-[#403F3F] font-semibold">Memory : </strong>
              ${phoneInfo?.mainFeatures?.memory}
            </p>

            <!-- sensors info  -->
            <p class="text-[1rem] text-[#706F6F] mt-[1.1rem]">
              <strong class="text-[#403F3F] font-semibold">Sensors : </strong>
              ${phoneInfo?.mainFeatures?.sensors}
            </p>

            <!-- release info  -->
            <p class="text-[1rem] text-[#706F6F] mt-[1.1rem]">
              <strong class="text-[#403F3F] font-semibold"
                >Release data :
              </strong>
              ${phoneInfo?.releaseDate}
            </p>

            <!-- brand info  -->
            <p class="text-[1rem] text-[#706F6F] mt-[1.1rem]">
              <strong class="text-[#403F3F] font-semibold">Brand : </strong>
              ${phoneInfo?.brand}
            </p>

            <!-- gps info  -->
            <p class="text-[1rem] text-[#706F6F] mt-[1.1rem]">
              <strong class="text-[#403F3F] font-semibold">GPS : </strong>
              ${phoneInfo?.others?.GPS}
            </p>
  `;

  // function calling for showing modal (from DaisyUI)
  phone_details_modal.showModal();
};
