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
     room_name=localStorage.getItem("room_name");

     function send(){
      msg=document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      });
      document.getElementById("msg").value="";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
         console.log(firebase_message_id);
         console.log(message_data);
         name=message_data['name'];
         message=message_data['message'];
         like=message_data['like'];
         
         name_TAG="<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
         message_TAG="<h4 class='message_h4'>" + message + "</h4>";
         like_button="<button class='btn btn-warning' id="+firebase_message_id +" value="+like +" onclick='update_like(this.id)'>";
         span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
         row=name_TAG + message_TAG + like_button + span_with_tag;
         document.getElementById("output").innerHTML += row;
      } });  }); }
getData();

function update_like(message_id){
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like : updated_likes
});
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}

