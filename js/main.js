$(document).ready(function () {
  console.log("jQuery works");
});

function initMap() {
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7.5,
    center: new google.maps.LatLng(35.7596, -79.0193),
    mapTypeId: "terrain",
  });

  fetch("./data/starbucks.json")
    .then((res) => res.json())
    .then((json) => {
      json.forEach((element) => {
        let lat = element["latitude"];
        let lon = element["longitude"];
        let latLng = new google.maps.LatLng(lat, lon);

        var icon = {
          url: "./assets/mapmarker.png",
          scaledSize: new google.maps.Size(20, 20),
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(0, 0), // anchor
        };

        const marker = new google.maps.Marker({
          position: latLng,
          icon: icon,
          map: map,
        });

        const infowindow = new google.maps.InfoWindow({
          content:
            '<div id="tooltip">' +
            "<h4>" +
            element["storeName"] +
            "</h4>" +
            "<p>" +
            element["streetAddress"] +
            "</p>" +
            "<p>" +
            element["city"] +
            ", " +
            element["state"] +
            "</p>" +
            '<a href="#info" rel="modal:open" class="openContent" id="' +
            element["storeNumber"] +
            '"><i class="fas fa-info-circle"></i> More Info</a>' +
            "</div>",
        });

        marker.addListener("click", () => {
          infowindow.open({ anchor: marker, map, shouldFocus: false });
        });

        makeList(element);
      });
    });
}

$(document).on("click", ".openContent", function (event) {
  let storeNumber = event.target.id;

  fetch("./data/starbucks.json")
    .then((res) => res.json())
    .then((json) => {
      let store = json.filter((a) => a["storeNumber"] === storeNumber)[0];

      document.getElementById("storeName").innerHTML = store["storeName"];
      document.getElementById("storeAddress").innerHTML =
        store["streetAddress"];
      document.getElementById("cityState").innerHTML =
        store["city"] + ", " + store["state"];
      document.getElementById("storeNumber").innerHTML = store["storeNumber"];
      document.getElementById("phone").href = store["phoneNumber"];
      document.getElementById("phone").innerHTML = '<i class="fas fa-phone"></i> &nbsp' + store["phoneNumber"];

      randomPic();
    });
});

function makeList(element) {
  var listContent =
    '<div class="list-content">' +
    "<h3>" +
    element["storeName"] +
    "</h3>" +
    "<p>" +
    element["streetAddress"] +
    "</p>" +
    "<p>" +
    element["city"] +
    ", " +
    element["state"] +
    "</p>" +
    // '<a id="openInfo" href="#test" rel="modal:open"><i class="fas fa-info-circle"></i> More Info</a>' +
    '<a href="#info" rel="modal:open" class="openContent" id="' +
    element["storeNumber"] +
    '"><i class="fas fa-info-circle"></i> More Info</a>' +
    "</div>";

  var ul = document.getElementById("locations");
  var li = document.createElement("li");
  li.innerHTML = listContent;
  ul.appendChild(li);
}

function searchPlaces() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("searchTerms");
  filter = input.value.toUpperCase();
  ul = document.getElementById("locations");
  li = ul.getElementsByTagName("li");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    value = li[i].getElementsByClassName("list-content")[0];
    txtValue = value.textContent || value.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function randomPic() {
  var imgArray = new Array(
    "https://cdn.usarestaurants.info/assets/uploads/4ac685809b14d3582f6fc7404532eea1_-united-states-north-carolina-orange-county-chapel-hill-starbucks-919-932-3824htm.jpg",
    "https://images.squarespace-cdn.com/content/v1/573a129b45bf21ac38391f4a/1549782005331-5YVY6HN8VK9JLP2QVRKJ/mat_7024+2.JPG?format=1000w",
    "https://cdn.vox-cdn.com/thumbor/VAkim2EiaKiIq4pUi295wH99Ces=/0x0:1100x729/1200x800/filters:focal(341x230:517x406)/cdn.vox-cdn.com/uploads/chorus_image/image/67717391/STARBUCKS.0.jpeg",
    "https://www.gannett-cdn.com/media/2018/05/21/USATODAY/usatsports/247WallSt.com-247WS-466075-starbucks-pune.jpg",
    "https://stories.starbucks.com/uploads/2019/04/SBX20190424-Featured-Image-Earnings-Q2-3-1.jpg",
    "https://img.buzzfeed.com/buzzfeed-static/static/2021-05/6/22/asset/deda341d30e2/sub-buzz-849-1620340519-26.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto",
    "https://miro.medium.com/max/1200/1*NRkCclmn_JeejDB4xKmy0Q.jpeg",
    "https://static01.nyt.com/images/2019/07/13/multimedia/12xp-starbucks-print/12starbucks-superJumbo.jpg",
    "https://post.healthline.com/wp-content/uploads/2020/03/Starbucks_Storefront_1200x628-facebook-1200x628.jpg",
    "https://assets.entrepreneur.com/content/3x2/2000/20180402175417-GettyImages-936810708-edited.jpeg"
  );

  var randomNum = Math.floor(Math.random() * imgArray.length);
  document.getElementById("modalImg").src = imgArray[randomNum];
}
