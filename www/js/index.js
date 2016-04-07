
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
   
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    onDeviceReady: function() {
        app.receivedEvent();
    },
    // Update DOM on a Received Event
    receivedEvent: function() {
       var pages = document.querySelectorAll("[data-role=page]");
            [].forEach.call(pages, function(obj, index){
            obj.className = "inactive-page";
            if(index==0){
            obj.className = "active-page";
            }
            });

          var backbutton1=document.querySelector("#previous1");
          var backbuttonhammer1 = new Hammer(backbutton1);
          backbuttonhammer1.on('tap', function(ev){
          backbutton1.setAttribute("data-href","home");
		              app.navigate(ev);
                      document.querySelector("#home ul").innerHTML="";
                    app.retrieveList();
            }); 
        var backbutton2=document.querySelector("#previous2");
          var backbuttonhammer2 = new Hammer(backbutton2);
          backbuttonhammer2.on('tap', function(ev){
          backbutton2.setAttribute("data-href","home");
		              app.navigate(ev);
                      document.querySelector("#home ul").innerHTML="";
                    app.retrieveList();
            }); 

        var backbutton3=document.querySelector("#previous3");
          var backbuttonhammer3 = new Hammer(backbutton3);
          backbuttonhammer3.on('tap', function(ev){
          backbutton3.setAttribute("data-href","home");
		              app.navigate(ev);
                      document.querySelector("#home ul").innerHTML="";
                    app.retrieveList();
            }); 
            
        var backbutton4=document.querySelector("#previous4");
          var backbuttonhammer4 = new Hammer(backbutton4);
          backbuttonhammer4.on('tap', function(ev){
          backbutton4.setAttribute("data-href","home");
		              app.navigate(ev);
                      document.querySelector("#home ul").innerHTML="";
                    app.retrieveList();
            }); 
            var save=document.querySelector('#save');
            var savereview=new Hammer(save);
            savereview.on('tap',function(ev){
                app.sendData(ev);
            })
            
            var camcapture=document.getElementById("cam");
            var camcapturenav=new Hammer(camcapture);
            camcapturenav.on('tap',function(ev){
                 navigator.camera.getPicture(success, fail, {quality : 50,

                      destinationType: Camera.DestinationType.DATA_URL,

                      sourceType: Camera.PictureSourceType.CAMERA,

                      targetWidth : 200,

                      targetHeight : 200,

                      cameraDirection : Camera.Direction.FRONT,

                      saveToPhotoAlbum : false})
           
                 function success(data)
                 {
                    var image= "data:image/jpeg;base64,"+data;
                    image=encodeURIComponent(image);
                    document.getElementById("cam").setAttribute("img",image);                     
                }
                function fail(message)
                    {
                        console.log(message);
                    }

            })
          
          app.retrieveList();
        
          var fabbtn=document.querySelector(".fab");
        fabbtn.addEventListener("click", function(ev){
            console.log("tapped");
            app.navigate(ev);
            
        });
           
    },
   
     retrieveList:function(){
            var xhr=new XMLHttpRequest();
            xhr.open("POST","https://griffis.edumedia.ca/mad9022/reviewr/reviews/get/");

            xhr.addEventListener("load",function(ev){
                var response=JSON.parse(xhr.responseText);
               
                for(var r=0;r<response.reviews.length;r++)
                { 
                    var list=document.createElement("li");
                    list.textContent=response.reviews[r].title;
                   
                    for(cnt=0;cnt<response.reviews[r].rating;cnt++)
                        {
                             var image=document.createElement('img');
                            image.src="css/filledheart.png";
                            image.width="20";
                            image.height="20" ;
                            list.appendChild(image);
                        }

                     document.querySelector("#home ul").appendChild(list);
                    list.setAttribute("data-id",response.reviews[r].id);
                     list.setAttribute("data-href","feedback");

                    list.addEventListener("click",function(){
                        var link=this.getAttribute("data-href");
                        history.pushState({"page":link},null,"#" + link);
                        var pagelist = document.querySelectorAll("[data-role=page]");
                        for(var p=0; p<pagelist.length; p++){
                            if(pagelist[p].id === link)
                            {
                                pagelist[p].classList.remove("hidden");
                                if(pagelist[p].className !== "active-page")
                                {
                                    pagelist[p].className = "active-page";
                                }
                            }
                            else
                            {
                                if(pagelist[p].className !== "inactive-page")
                                {
                                    pagelist[p].className = "inactive-page";
                                }
                            }
                        }

                        var dataid=this.getAttribute("data-id");
                        var image;
                        var xhr=new XMLHttpRequest();
                        xhr.open("POST","https://griffis.edumedia.ca/mad9022/reviewr/review/get/");
                        var paramread=new FormData();
                        paramread.append("uuid","prabhjot");
                        paramread.append("review_id",dataid);
                        xhr.send(paramread); 
                        xhr.addEventListener("load",function(ev){
                        var response=JSON.parse(xhr.responseText);
                            console.log(response);
                            document.getElementById("title1").innerHTML=response.review_details.title;
                            document.getElementById("review1").innerHTML=response.review_details.review_txt;
                             var division=document.getElementById("rating");
                            division.innerHTML="";
                            
                            for(var cnt=0;cnt<response.review_details.rating;cnt++)
                                {
                                        var image=document.createElement("img");
                                        image.src="css/filledheart.png";
                                        image.width="20";
                                        image.height="20";
                                        division.appendChild(image);
                                }
                            document.getElementById("image").src=decodeURIComponent(response.review_details.img);
                        });
                   
                    });
              
               
                }
            });
            xhr.addEventListener("error",function(ev){
            });
            var params=new FormData();
            params.append("uuid","prabhjot");
            xhr.send(params);
        },
     navigate:function(ev)
        {
            ev.preventDefault();
            var url=ev.target.getAttribute("data-href");
            console.log(url);
            history.pushState({"page":url},null,"#" + url);
            var pages = document.querySelectorAll("[data-role=page]");
          
            for(var p=0; p<pages.length; p++)
            {
                if(pages[p].id === url)
                {
                    pages[p].classList.remove("hidden");
                    if(pages[p].className !== "active-page")
                    {
                        pages[p].className = "active-page";
                    }
                }
                else
                {
                    if(pages[p].className !== "inactive-page")
                    {
                        pages[p].className = "inactive-page";
                    }
                }
            }
        },
     sendData:function(ev)
        {
            var cnt=0;
            var heading=document.getElementById("Heading").value;
            var message=document.getElementById("Details").value;
            var rate=document.getElementsByName("rate");
            var rateno;
             var image;
            for (var i = 0; i < rate.length; i++) 
            {
                if(rate[i].checked)
                    rateno=rate[i].value;
            }
            if(rateno==undefined)
            {
                    rateno=0;
            }
           var image=document.getElementById("cam").getAttribute("img");
           
           
            var xhr=new XMLHttpRequest();
            xhr.open("POST","https://griffis.edumedia.ca/mad9022/reviewr/review/set/");
            
            var paramsave=new FormData();
             paramsave.append("uuid","prabhjot");
             paramsave.append("action","insert");
         
             paramsave.append("title",heading);
            paramsave.append("review_txt",message);
            paramsave.append("rating",rateno);
            
            paramsave.append("img",image);
            
             xhr.send(paramsave); 
            
            xhr.addEventListener("load",function(ev){
                var xhr=ev.target;
                var response=JSON.parse(xhr.responseText);
                if(response.code==0)
                    {
                        console.log("Done");
                        
                    }
                else
                    {
                        console.log("Not done");
                        
                    }
            });
             xhr.addEventListener("error",function(ev){
                
            });
            
            }
        };

app.initialize();
