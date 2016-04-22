$(function (){
   var APPLICATION_ID = "8B1C2399-1443-6254-FFB8-C4C280680100",
       SECRET_KEY = "F014B1D6-7772-4951-FFB2-160FAE296F00",
       VERSION = "v1";
       
   Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
   
   var dataStore = Backendless.Persistence.of(Tasks);
   var task = new Tasks({title: "My First Item", content:"delete ASAP", author:"email@email.com"});
   dataStore.save(task);
   
   //var wrapper = {
     //  posts: postsCollection.data
//   };
  
//    Handlebars.registerHelper('format', function (time) {
//     return moment(time).format("dddd, MMMM Do YYYY") ;   
//});
   
//   var postsCollection = Backendless.Persistence.of(Posts).find();
//   var blogTemplate = Handlebars.compile(blogScript);
//   var blogHTML = blogTemplate(wrapper);
   
//   $('.main-container').html(blogHTML);
//     var blogScript = $("#today-template").html();
//  var blogTemplate = Handlebars.compile(blogScript);
//   var blogHTML = blogTemplate(wrapper);
   
//   $('.new').html(blogHTML);
//});
});
function Tasks(args){
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.author = args.author || "";
}



          
        