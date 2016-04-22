$(function () {
   var APPLICATION_ID =  "CC3979E6-F655-FD96-FF13-1FAAD8E3DE00",
       SECRET_KEY = "76B7A6FF-ACD6-07C5-FFF8-BB69AB961B00",
       VERSION = "v1";
  
   
   Backendless.initApp(APPLICATION_ID,SECRET_KEY, VERSION);
   var addBlogScript = $("#add-blog-template").html();
      var addBlogTemplate = Handlebars.compile(addBlogScript);
      
      $('.main-container').html(addBlogTemplate);
   tinymce.init({ selector:'textarea', selector: "textarea",
    plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table contextmenu paste"
    ],
    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image" });
   
   
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
          
      var dataStore = Backendless.Persistence.of(Posts);
     
      var postObject = new Posts({
          title: title,
          content: content,
          authorEmail: Backendless.UserService.getCurrentUser().email
      });
  }
      
      dataStore.save(postObject);
      
      this.title.value = "";
      this.content.value = ""; 
   });
   });