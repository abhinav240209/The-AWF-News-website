function add_user() {
    user_name=document.getElementById("user_name").value;
    profession=document.getElementById("profession").value;
   if (user_name==" ") {
       window.alert("User name should not be blank");
       }

       else if(profession==" ") {
           window.alert("profession should not be blank");
       }
       else {
     localStorage.setItem("username", user_name);
     localStorage.setItem("profession", profession);
    window.location="news_room.html";
}
    }
    