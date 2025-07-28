// function: for loading(fetching) all phone from server.
const loadingAllPhones = async () => {
  // fetching data from server
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=iphone`
  );
  const data = await response.json();
  displayPhone(data);
};

// function: for displaying phone as card on website
const displayPhone = (phones) => {
  console.log(phones);
};

// event: function for trigger a event when clicking on search button
const searchingPhone = () => {
  console.log("searching phone...");

  // for unknown delay time
  setTimeout(() => {
    loadingAllPhones();
  }, 3000);
};
