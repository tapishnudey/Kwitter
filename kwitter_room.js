var firebaseConfig = {
      apiKey: "AIzaSyDeEaBoTdNjE7mEm4zJGmKlvwWJ9uI7bLE",
      authDomain: "kwitter-6d758.firebaseapp.com",
      databaseURL: "https://kwitter-6d758-default-rtdb.firebaseio.com",
      projectId: "kwitter-6d758",
      storageBucket: "kwitter-6d758.appspot.com",
      messagingSenderId: "204934292577",
      appId: "1:204934292577:web:0f764114fb90c055317620"
    };
    
    // Initialize Firebase
     firebase.initializeApp(firebaseConfig);

user_name=localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML="Welcome " + user_name + "!!!";

function addRoom(){
      room_name=document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose:"addingRoomName"
      });
      
      localStorage.setItem("room_name",room_name);
      window.location="kwitter_page.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
console.log("room_name :- " + Room_names);
row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
document.getElementById("output").innerHTML+=row;
      //End code
      });});}
getData();

function redirectToRoomName(name){
console.log(name);
localStorage.setItem("room_name",name);
window.location="kwitter_page.html";
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}
