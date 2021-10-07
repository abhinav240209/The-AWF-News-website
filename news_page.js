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
  

  firebase.initializeApp(firebaseConfig);
user_name=localStorage.getItem("username");
room_name=localStorage.getItem("roomname");
document.getElementById("welcome").innerHTML="Welcome to " + room_name;

function send_message() {
      u_message=document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            u_name:user_name,
            ku_message:u_message,
            like:0
      });
      document.getElementById("msg").innerHTML="";

}
function getData() { 
      firebase.database().ref("/"+room_name).on('value', function(snapshot) { 
      document.getElementById("output").innerHTML = ""; 
      snapshot.forEach(function(childSnapshot) {
       childKey  = childSnapshot.key; 
       childData = childSnapshot.val();
        if(childKey != "purpose") {
      firebase_message_id = childKey;
      message_data = childData;

      console.log(firebase_message_id);
      console.log(message_data);
      u_name=message_data['u_name'];
      main_message=message_data['ku_message'];
      likes=message_data['like'];
      name_with_tag="<h3>"+u_name+"<sup><img src='tick.png' class='user_tick'></sup></h3>";
      user_message_tag="<h4 class='message_h4'>"+main_message+"</h4>";
      user_like_button="<button style='background-color:lightgreen;' id='"+firebase_message_id+"' onclick='update_like(this.id)'> like <span class='glyphicon glyphicon-thumbs-up'></span>:"+likes+"</button>";
      row=name_with_tag + user_message_tag + user_like_button;
      document.getElementById("output").innerHTML+=row;

      } });  }); }
getData();
function logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("roomname");
      window.location="login.html";
}



function update_like(message_id) {
      button_id=message_id;
      likes_count=document.getElementById(button_id).value;
      update_likes_count=Number(likes)+1;
      console.log(update_likes_count);
      firebase.database().ref("/"+room_name).child(message_id).update({
            like:update_likes_count
      });

} 