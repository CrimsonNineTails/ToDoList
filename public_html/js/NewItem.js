
$(function () {
    
   var APPLICATION_ID =  "8B1C2399-1443-6254-FFB8-C4C280680100",
       SECRET_KEY = "6A63F44E-1BE2-8876-FFE6-18BF2EE4BC00",
       VERSION = "v1";
  

   Backendless.initApp(APPLICATION_ID,SECRET_KEY, VERSION);
   $(".button-collapse").sideNav();
   
   
   if(Backendless.UserService.isValidLogin()){
    userLoggedIn(Backendless.LocalCache.get("current-user-id")); 
   }
   else{
      
    //var user = new Backendless.User();
   //user.email = "anders.museth@gmail.com"
   //user.password = "password";
   //Backendless.UserService.register(user);
   
   
   
   var loginScript = $("#login-template").html();
   var loginTemplate = Handlebars.compile(loginScript);
    $('.main-container').html(loginTemplate);
   }
   
    $(document).on('submit', '.form-signin', function(event){
      event.preventDefault();
      var data = $(this).serializeArray(),
        email = data[0].value,
        password = data[1].value;
        
     Backendless.UserService.login(email, password, true, new Backendless.Async(userLoggedIn, gotError));
   });
   $(document).on('click', '.add-blog', function(){
      var addBlogScript = $("#add-blog-template").html();
      var addBlogTemplate = Handlebars.compile(addBlogScript);
      
      $('.main-container').html(addBlogTemplate);
   
   });
   $(document).on('submit', '.form-add-blog', function(event){
      event.preventDefault();
 
      var data = $(this).serializeArray(),
          title = data[0].value,
          content = data[1].value;
           if(content === ""){
      Materialize.toast("This is empty please fill out before submutting", 2000);
  }    
  else if(title === ""){
      Materialize.toast("This is empty please fill out before submutting", 2000);
  }
  else{
          
      var dataStore = Backendless.Persistence.of(Tasks);
     
      var postObject = new Tasks({
          title: title,
          content: content,
          authorEmail: Backendless.UserService.getCurrentUser().email
      });
  }
      
      dataStore.save(postObject);
      
      this.title.value = "";
      this.content.value = "";   });
   $(document).on('click', '.logout', function(){
       Backendless.UserService.logout(new Backendless.Async(userLoggedOut, gotError));
       
      var loginScript = $("#login-template").html();
      var loginTemplate = Handlebars.compile(loginScript);
       $('.main-container').html(loginTemplate); 
   });
});


function Tasks(args){
    args = args || "";
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.authorEmail || "";
}

function userLoggedIn(user) {
    console.log("user successfully logged in");
    var userData;
    if(typeof user == "string"){
        userData = Backendless.Data.of(Backendless.User).findById(user);
    } else{
        userData = user;
    }
    var welcomeScript = $('#welcome-template').html();
    var welcomeTemplate = Handlebars.compile(welcomeScript);
    var welcomeHTML = welcomeTemplate(userData);
    
    $('.main-container').html(welcomeHTML);
}
function userLoggedOut(){
    console.log("successfully logged out")
}

function gotError(error){
    console.log("Error message - " + error.message);
    console.log("Error code - " + error.code);
Materialize.toast('Wrong Password Or Username!', 2000);
}

function required() {
   var x = document.getElementById("myText").required;
   document.getElementById("demo").innerHTML = x;
}