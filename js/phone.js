/**
 * getting HTML elements
 *
 * */
// element:: loading spinner
const loader = document.querySelector("#loading-spinner");

// function: for loading(fetching) all phone from server.
const loadingAllPhones = async () => {
  // hiding spinner after fetching data
  loader.classList.add("hidden");

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
    console.log(phone);
  });
};

// event: function for trigger a event when clicking on search button
const searchingPhone = () => {
  // display loading spinner before data fetch
  loader.classList.remove("hidden");

  console.log(loader, "searching phone...");

  // for unknown delay time
  setTimeout(() => {
    loadingAllPhones();
  }, 3000);
};
