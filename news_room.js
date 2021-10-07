const firebaseConfig = {

    apiKey: "AIzaSyBKLgxK2t2lsgD2e4cBHc67MIXyBDQ8waw",
  
    authDomain: "awf-news-website.firebaseapp.com",
  
    databaseURL: "https://awf-news-website-default-rtdb.firebaseio.com",
  
    projectId: "awf-news-website",
  
    storageBucket: "awf-news-website.appspot.com",
  
    messagingSenderId: "60575209274",
  
    appId: "1:60575209274:web:d41fd583a3e3d6c11b6203",
  
    measurementId: "G-HRKEYP41JN"
  
  };
  
  
  
  // Initialize Firebase
  
  
window.alert("Welcome to AWF NEWS(All World Football News channell). Here readers will be able to get up to date information on Football news all over the world. Writers will be able to bring there content to people all around the world for free. Fans will be able to share their joy by liking the writer's content. But please, do not misuse this website. Abuse and threats can be reported at AWFNewsHelp.com")
  firebase.initializeApp(firebaseConfig); 
user_name=localStorage.getItem("username");
profession=localStorage.getItem("profession");
console.log(user_name);
document.getElementById("welcome").innerHTML="Welcome " + user_name;

function add_room() {
    if(profession=="writer") {
  room_name=document.getElementById("room_name").value;
  localStorage.setItem("roomname", room_name);
  firebase.database().ref("/").child(room_name).update({
        purpose:"adding room name"
  });
  window.location="news_page.html";
    }
  if(profession=="reader"){
      window.alert("Only writers are allowed to add a news room, sorry");
  } 
}

function getData() {
  firebase.database().ref("/").on('value', function(snapshot) 
  {document.getElementById("output").innerHTML = "";
   snapshot.forEach(function(childSnapshot) {
         childKey  = childSnapshot.key;
   Room_names = childKey;
  
  console.log("Room names are - " + Room_names);
  row="<div id="+Room_names + "class='btn btn-info' name='room_div' onclick='redirect_room(this.id)'>" + Room_names + "</div><hr>";
  
  document.getElementById("output").innerHTML+=row;
  
  
  });});}
getData();

function redirect_room(R_name) {
  window.location="news_page.html";
  localStorage.setItem("roomname", R_name);
}

function search_room() {
  search_item=document.getElementById("search").value;
  names=document.getElementsByName("room_div");
  console.log(names);

  for (i=0;i<names.length;i++) {
        console.log(names[i].innerHTML);
        if (search_item==names[i].innerHTML) {
              console.log("room name found");
              names[i].style.background="yellow";
        }
  }
}

function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("roomname");
  localStorage.removeItem("profession")
  window.location="login.html";
}