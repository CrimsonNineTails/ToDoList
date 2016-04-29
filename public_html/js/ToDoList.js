$(function (){
    $('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
    }
  );
  
    var APPLICATION_ID = "8B1C2399-1443-6254-FFB8-C4C280680100",
       SECRET_KEY = "6A63F44E-1BE2-8876-FFE6-18BF2EE4BC00",
       VERSION = "v1";
    $(document).on('click', '.trash', function(event){
        Backendless.Persistence.of(Tasks).remove(event.target.attributes.data.nodeValue);
        location.reload();
    });   
   Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
   
   /*var dataStore = Backendless.Persistence.of(Tasks);
   var task = new Tasks({title: "My First Item", content:"delete ASAP", author:"email@email.com"});
   dataStore.save(task);
   */
   var postsCollection = Backendless.Persistence.of(Tasks).find();
   
  
    console.log(postsCollection);
   var wrapper = {
       posts: postsCollection.data
   };
   
   
   
Handlebars.registerHelper('format', function (time) {
      return moment(time).format("dddd, MMMM Do YYYY") ;   
});
   
   var blogScript = $("#blogs-template").html();
   var blogTemplate = Handlebars.compile(blogScript);
   var blogHTML = blogTemplate(wrapper);
   
   $('.main-container').html(blogHTML);
      var blogScript = $("#today-template").html();
   var blogTemplate = Handlebars.compile(blogScript);
   var blogHTML = blogTemplate(wrapper);
   
    
});

function Tasks(args){
    args = args || "";
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.authorEmail || "";
}



          
        