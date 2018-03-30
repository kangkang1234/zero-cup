
/*** Created by HP on 2017/12/1.
 */
window.onload = function(){
    sidebarReverse()
    userMassage();
    register();
    setFontSize();
    showBlog();
    document.getElementById("slipper").style.left = (1.975*document.body.clientWidth/1536*127)+"px";
    slipper();

    photo();
    //
};

window.onscroll = function(){
    var deviceWith = document.body.clientWidth;
    var head = document.getElementById("head");
    var sidebar = document.getElementById("sidebar");
    var scrollTop;
    if(deviceWith<1100){
        if(document.body.scrollTop){
            scrollTop = document.body.scrollTop
        }
        else {
            scrollTop = document.documentElement.scrollTop
        }
        var changePoint = 4.067*(deviceWith/1536)*127;
        if(scrollTop>changePoint){
            head.style.position = "absolute";
            head.style.top = (scrollTop-changePoint)+"px";  //计算head距离顶端的距离，并且在各种分辨率下都有普适性
            sidebar.style.position = "absolute";
            sidebar.style.top  = (0.792*(deviceWith/1536)*127 + (scrollTop-changePoint)) + "px";  //计算sidebar距离顶端的距离，并且在各种分辨率下都有普适性
        }
        if(scrollTop<=changePoint){
            head.style.position="static";
            sidebar.style.position = "static";
        }
    }
    else{
        head.style.position="static";
        sidebar.style.position = "static";
    }
};

window.onresize = function(){
    document.getElementById("slipper").style.left = (1.975*document.body.clientWidth/1536*127)+"px";
    setFontSize();
    slipper(1.975*document.body.clientWidth/1536*127);
};

function setFontSize(){
    var deviceWidth = document.body.clientWidth;
    var fontSize = 127*(deviceWidth/1536);
    document.getElementsByTagName("html")[0].style.fontSize = fontSize+"px";
}


function showBlog(){
    var button = document.querySelectorAll("#story>div>button");
    var blogBorder = document.getElementById("blog-border");
    var maskAll = document.getElementById("mask-all");
    var scrollPosition;
    var scrollTo;
    for(var i= 0,len = button.length;i<len;i++){
        button[i].onclick = function(){
            $.post('getstory/',{blogId:this.blogId},function(data){  //申请写这篇博文的好友的信息，发送博文的id，接受一个json，json格式如下
//data:json
//json[0]:{nickname:}
//json[1]:{sidebarImg:[src1,src2]}
//json[2]:{allBlog:[{id:,title:,passage:,img:},{id:,title:,passage,img:},...]}
//json[3]:{myBlog:[{title:,passage:},{title:,passage:}]}
                dataObj = data.parse();
                document.getElementById("nickname2").innerHTML = dataObj[0].nickname;
                document.getElementById("story3").innerHTML = dataObj[3].myBlog[0];
                document.getElementById("story4").innerHTML = dataObj[3].myBlog[1];
                document.getElementById("sidebar-img3").setAttribute("src".dataObj[1].sideBarImg[0]);
                document.getElementById("sidebar-img4").setAttribute("src".dataObj[1].sidebarImg[1]);
                document.getElementById("blog-init").innerHTML = this.parentNode.getElementsByTagName("P")[1].innerHTML;
            });
            scrollPosition = 4.077*(document.body.clientWidth/1536)*127;
            scrollTo = document.documentElement.scrollTop || document.body.scrollTop;
            console.log(scrollTo|0);
            console.log(scrollPosition|0);
            if(Math.abs((scrollPosition|0)-(scrollTo|0))<=1){
                blogBorder.classList.add("blog-border-show");
                maskAll.classList.add("mask-all-show");
            }
            else{
                slowScrollTo(scrollPosition,300);
                setTimeout(function(){
                    blogBorder.classList.add("blog-border-show");
                    maskAll.classList.add("mask-all-show");
                },300)
            }
        };
    }
    maskAll.onclick = function(e){
        blogBorder.classList.remove("blog-border-show");
        maskAll.classList.remove("mask-all-show");
        blogBorder.style.zIndex = "999";
        setTimeout(function(){
            blogBorder.style.zIndex = "-111";
        },700);
        e.stopPropagation();
    }
}

function slowScrollTo(position,timeout){
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
        direction = position - scrollTop > 0 ? 1 : -1,
        distance = Math.abs(position-scrollTop),
        split = distance/50,
        _timeout;

    if(position!==scrollTop){
        timeout = timeout || 1000;
        split *= direction;

        _timeout = setInterval(function(){
            scrollTop += split;
            distance -= Math.abs(split);
            if(distance<0){
                window.scrollTo(0,position);
                clearInterval(_timeout);
                timeout = null;
            }
            else{
                window.scrollTo(0,scrollTop);
            }
        },timeout/100)
    }
}

function slipper(leftBegin){
    var focus = 0;
    var slipper = document.getElementById("slipper");
    var leftNow = leftBegin || slipper.offsetLeft;
    var slipWidth = 1.000*(document.body.clientWidth/1536)*127;
    var storyParty = document.getElementById("story-party"),
        photoWall = document.getElementById("photo-wall"),
        myStory = document.getElementById("my-story"),
        friendCondi = document.getElementById("friend-condi"),
        setting = document.getElementById("setting"),
        homePage = document.getElementById("home-page");
    var left;
    var width;
    var finalLeft;
    storyParty.onmousemove = function(){
        left = this.offsetLeft;
        width = this.offsetWidth;
        finalLeft = (left+width/2-slipWidth/2)+"px";
        slipper.style.left = finalLeft;
    };
    storyParty.onmouseout = function(){
        slipper.style.left = leftNow+"px";
    };
    storyParty.onclick = function(){
        leftNow = slipper.offsetLeft;
    };
    photoWall.onmousemove = function(){
        left = this.offsetLeft;
        width = this.offsetWidth;
        finalLeft = (left+width/2-slipWidth/2)+"px";
        slipper.style.left = finalLeft;
    };
    photoWall.onmouseout = function(){
        slipper.style.left = leftNow+"px";
    };
    photoWall.onclick = function(){
        leftNow = slipper.offsetLeft;
    };
    myStory.onmousemove = function(){
        left = this.offsetLeft;
        width = this.offsetWidth;
        finalLeft = (left+width/2-slipWidth/2)+"px";
        slipper.style.left = finalLeft;
    };
    myStory.onmouseout = function(){
        slipper.style.left = leftNow+"px";
    };
    myStory.onclick = function(){
        leftNow = slipper.offsetLeft;
    };
    friendCondi.onmousemove = function(){
        left = this.offsetLeft;
        width = this.offsetWidth;
        finalLeft = (left+width/2-slipWidth/2)+"px";
        slipper.style.left = finalLeft;
    };
    friendCondi.onmouseout = function(){
        slipper.style.left = leftNow+"px";
    };
    friendCondi.onclick = function(){
        leftNow = slipper.offsetLeft;
    };
    setting.onmousemove = function(){
        left = this.offsetLeft;
        width = this.offsetWidth;
        finalLeft = (left+width/2-slipWidth/2)+"px";
        slipper.style.left = finalLeft;
    };
    setting.onmouseout = function(){
        slipper.style.left = leftNow+"px";
    };
    setting.onclick = function(){
        leftNow = slipper.offsetLeft;
    };
    homePage.onmousemove = function(){
        left = this.offsetLeft;
        width = this.offsetWidth;
        finalLeft = (left+width/2-slipWidth/2)+"px";
        slipper.style.left = finalLeft;
    };
    homePage.onmouseout = function(){
        slipper.style.left = leftNow+"px";
    };
    homePage.onclick = function(){
        leftNow = slipper.offsetLeft;
    };
}

//json[2]:{allBlog:[{id:,title:,passage:,img:},{id:,title:,passage,img:},...]}

function photo(){
    var m = document.getElementById("photo").getElementsByTagName("DIV");
    var random;
    var randomArr = [9,8];
    for(var i=0;i<7;i++){
        random = Math.ceil(Math.random()*7%7);
        //while(randomArr.indexOf(random)!=-1) {
        //    random = Math.ceil(Math.random()*7%7);
        //}
        randomArr.push(random);
        console.log(randomArr);
        m[i].style.backgroundImage = 'url("http://127.0.0.1:8000/static/img/JPEG/'+random+'.jpg")';
    }
    var handler1 = function(){
        m[2].style.left = "3.3rem";
        m[2].style.top = ".125rem";
        m[3].style.left = "5.517rem";
        m[3].style.top = ".283rem";
        m[0].style.left = "-1.134rem";
        m[1].style.left = "1.083rem";
        m[4].style.left = "7.734rem";
        m[5].style.left = "9.951rem";
        m[6].style.left ="12.1rem";
        var first = document.createElement("div");
        var contain = document.getElementById("photo");
        first.setAttribute("id","a0");
        first.innerHTML = '<span></span> <p>昵称昵称</p> <span> <img src="http://127.0.0.1:8000/static/img/icon_praise.png" alt=""/>133 <img src="http://127.0.0.1:8000/static/img/icon_comment.png" alt=""/>133 </span>';
        random = Math.ceil(Math.random()*7%7);
        first.style.backgroundImage = 'url("http://127.0.0.1:8000/static/img/JPEG/'+random+'.jpg")';
        contain.insertBefore(first,m[0]);
        m[7].parentNode.removeChild(m[7]);
        for(var i=0;i<7;i++){
            m[i].setAttribute("id",m[i].id[0]+(+m[i].id[1]+1))
        }
        m[3].removeEventListener("click",handler1);
        m[2].addEventListener("click",handler1);
        m[5].removeEventListener("click",handler2);
        m[4].addEventListener("click",handler2);
    };
    m[2].addEventListener("click",handler1);
    var handler2 = function(){
        m[4].style.left = "3.3rem";
        m[4].style.top = ".125rem";
        m[3].style.left = "1.083rem";
        m[3].style.top = ".283rem";
        m[6].style.left = "7.734rem";
        m[5].style.left = "5.517rem";
        m[2].style.left = "-1.134rem";
        m[1].style.left = "-3.351rem";
        m[0].style.left ="-5.4rem";
        var last = document.createElement("div");
        var contain = document.getElementById("photo");
        last.setAttribute("id","a8");
        last.innerHTML = '<span></span> <p>昵称昵称</p> <span> <img src="http://127.0.0.1:8000/static/img/icon_praise.png" alt=""/>133 <img src="http://127.0.0.1:8000/static/img/icon_comment.png" alt=""/>133 </span>';
        random = Math.ceil(Math.random()*7%7);
        last.style.backgroundImage = 'url("http://127.0.0.1:8000/static/img/JPEG/'+random+'.jpg")';
        contain.appendChild(last);
        m[0].parentNode.removeChild(m[0]);
        for(var i=0;i<7;i++){
            m[i].setAttribute("id",m[i].id[0]+(+m[i].id[1]-1))
        }
        m[3].removeEventListener("click",handler2);
        m[4].addEventListener("click",handler2);
        m[1].removeEventListener("click",handler1);
        m[2].addEventListener("click",handler1);
    };
    m[4].addEventListener("click",handler2);
}

function register(){

    var register = document.querySelectorAll("#register>div");
    var m = ["一","二","三","四","五","六","七"];
    for(var i= 0,len=register.length;i<len;i++){
        register[i].onmousemove = function(){
            this.getElementsByTagName("P")[0].style.opacity = 1;
        };
        register[i].onmouseout = function(){
            this.getElementsByTagName("P")[0].style.opacity = 0;
        }
    }
    $.get('signin', function(data){  //页面加载完获得用户的登录天数
        if(data>6){
            for(var i= 0,len1=register.length;i<len1;i++){
                register[i].getElementsByTagName("P")[0].innerHTML = "已点亮";
            }
        }
        else if(data>=0){
            for(var j=+data,len2=register.length;j<len2;j++){
                register[j].className = "blur-parent register-shadow";
                register[j].getElementsByTagName("P")[0].innerHTML = "登录第"+m[+data]+"天点亮";
            }
            for(j=0;j<+data;j++){
                register[j].getElementsByTagName("P")[0].innerHTML = "已点亮";
            }
        }
    })
}

function userMassage(){
    // var register = document.querySelectorAll("#register>div");
    // var m = ["一","二","三","四","五","六","七"];
    // for(var i= 0,len=register.length;i<len;i++){
    //     register[i].onmousemove = function(){
    //         this.getElementsByTagName("P")[0].style.opacity = 1;
    //     };
    //     register[i].onmouseout = function(){
    //         this.getElementsByTagName("P")[0].style.opacity = 0;
    //     }
    // }
    $.get('getinfo', function(data){  //页面加载完获取用户个人信息（不包括登录天数）
        console.log(data);
        // userArr = JSON.parse(data);
        var userArr = data;
        console.log(typeof data);
        document.getElementById("nickname").innerHTML = userArr[0].nickName;
        document.getElementById("sidebar-img1").setAttribute("src",userArr[1].sidebarImg[0]);
        document.getElementById("sidebar-img2").setAttribute("src",userArr[1].sidebarImg[1]);
        // document.getElementById("story1").innerHTML = userArr[3].myBlog[0].passage;
        // document.getElementById("story2").innerHTML = userArr[3].myBlog[1].passage;
        // if(userArr[4]>6){
        //     for(var i= 0,len1=register.length;i<len1;i++){
        //         register[i].getElementsByTagName("P")[0].innerHTML = "已点亮";
        //     }
        // }
        // else if(userArr[4]>=0){
        //     for(var j=+userArr[4],len2=register.length;j<len2;j++){
        //         register[j].className = "blur-parent register-shadow";
        //         register[j].getElementsByTagName("P")[0].innerHTML = "登录第"+m[+userArr[4]]+"天点亮";
        //     }
        //     for(j=0;j<+userArr[4];j++){
        //         register[j].getElementsByTagName("P")[0].innerHTML = "已点亮";
        //     }
        // }
        story(userArr);
    })

    // $.get('signin', function(data){  //页面加载完获得用户的登录天数
    //     if(data>6){
    //         for(var i= 0,len1=register.length;i<len1;i++){
    //             register[i].getElementsByTagName("P")[0].innerHTML = "已点亮";
    //         }
    //     }
    //     else if(data>=0){
    //         for(var j=+data,len2=register.length;j<len2;j++){
    //             register[j].className = "blur-parent register-shadow";
    //             register[j].getElementsByTagName("P")[0].innerHTML = "登录第"+m[+data]+"天点亮";
    //         }
    //         for(j=0;j<+data;j++){
    //             register[j].getElementsByTagName("P")[0].innerHTML = "已点亮";
    //         }
    //     }
    // })
}


//json[0]:{nickname:}
//json[1]:{sidebarImg:[src1,src2]}
//json[2]:{allBlog:[{id:,title:,passage:,img:},{id:,title:,passage,img:},...]}
//json[3]:{myBlog:[{title:,passage:},{title:,passage:}]}

function story(userArr){
    var contextPath = "http://127.0.0.1:8000";  //开发时路径
    var url1 = contextPath + "/static/img/icon_praise.png";
    var url2 = contextPath + "/static/img/icon_comment.png";
  //  console.log(url)
    var m = document.getElementById("story").getElementsByTagName("DIV");
    var blog  = userArr[2];
    var blogNow = 3;
    var count = 0;
    for(;count<7;count++){
        // m[count].querySelector("p:nth-child(2)").innerHTML = blog.allBlog[count].title;
        // m[count].querySelector("p:nth-child(3)").innerHTML = blog.allBlog[count].passage;
        // m[count].getElementsByTagName("button")[0].setAttribute("blogId",blog.allBlog[count].id);
    }

    var handler1 = function(){
        m[2].style.left = "3.3rem";
        m[2].style.top = ".242rem";
        m[3].style.left = "5.517rem";
        m[3].style.top = ".367rem";
        m[0].style.left = "-1.134rem";
        m[1].style.left = "1.083rem";
        m[4].style.left = "7.734rem";
        m[5].style.left = "9.951rem";
        m[6].style.left ="12.1rem";
        var first = document.createElement("div");
        var contain = document.getElementById("story");
        first.setAttribute("id","a0");
        first.innerHTML = '<span></span><p>鸡汤</p><p>那天晚上放晚自习回家，老爸让老妈进去看电视，说要跟我单独谈谈，桌子上放了一晚热热的鸡汤，他说：我这个病（肺癌）不管治不治得好，你以后都要好好跟妈妈生活，不要让她担心，多帮她做点事，我埋着头喝鸡汤，眼泪往汤里面一直流，到现在都还记得那碗汤越喝越咸。不知道现在老爸在天堂还好不~</p><button>More</button><span><img src="http://127.0.0.1:8000/static/img/icon_praise.png" alt=""/>133 <img src="http://127.0.0.1:8000/static/img/icon_comment.png" alt=""/>133 </span>';
        var first_button = first.getElementsByTagName("button");
        // first_button[0].setAttribute("blogId",blog.allBlog[count].id);
        count++;
        first_button[0].onclick = function(){
            $.post('getstory', {blogId:this.blogId},function(data){ //申请写这篇博文的好友的信息，发送博文的id，接受一个json，json格式如下
//data:json
//json[0]:{nickname:}
//json[1]:{sidebarImg:[src1,src2]}
//json[2]:{allBlog:[{id:,title:,passage:,img:},{id:,title:,passage,img:},...]}
//json[3]:{myBlog:[{title:,passage:},{title:,passage:}]}
                dataObj = data.parse();
                document.getElementById("nickname2").innerHTML = dataObj[0].nickname;
                document.getElementById("story3").innerHTML = dataObj[3].myBlog[0];
                document.getElementById("story4").innerHTML = dataObj[3].myBlog[1];
                document.getElementById("sidebar-img3").setAttribute("src",dataObj[1].sideBarImg[0]);
                document.getElementById("sidebar-img4").setAttribute("src".dataObj[1].sidebarImg[1]);
                document.getElementById("blog-init").innerHTML = this.parentNode.getElementsByTagName("P")[1].innerHTML;
            });
            var blogBorder = document.getElementById("blog-border");
            var maskAll = document.getElementById("mask-all");
            var scrollPosition;
            var scrollTo;
            scrollPosition = 4.077*(document.body.clientWidth/1536)*127;
            scrollTo = document.documentElement.scrollTop || document.body.scrollTop;
            if(Math.abs((scrollPosition|0)-(scrollTo|0))<=1){
                blogBorder.classList.add("blog-border-show");
                maskAll.classList.add("mask-all-show");
            }
            else{
                slowScrollTo(scrollPosition,300);
                setTimeout(function(){
                    blogBorder.classList.add("blog-border-show");
                    maskAll.classList.add("mask-all-show");
                },300)
            }
        };
        contain.insertBefore(first,m[0]);
        m[7].parentNode.removeChild(m[7]);
        for(var i=0;i<7;i++){
            m[i].setAttribute("id",m[i].id[0]+(+m[i].id[1]+1))
        }
        m[3].removeEventListener("click",handler1);
        m[2].addEventListener("click",handler1);
        m[5].removeEventListener("click",handler2);
        m[4].addEventListener("click",handler2);
    };
    m[2].addEventListener("click",handler1);
    var handler2 = function(){
        m[4].style.left = "3.3rem";
        m[4].style.top = ".242rem";
        m[3].style.left = "1.083rem";
        m[3].style.top = ".367rem";
        m[6].style.left = "7.734rem";
        m[5].style.left = "5.517rem";
        m[2].style.left = "-1.134rem";
        m[1].style.left = "-3.351rem";
        m[0].style.left ="-5.4rem";
        var last = document.createElement("div");
        var contain = document.getElementById("story");
        last.setAttribute("id","a8");
        last.innerHTML = '<span></span><p>鸡汤</p><p>那天晚上放晚自习回家，老爸让老妈进去看电视，说要跟我单独谈谈，桌子上放了一晚热热的鸡汤，他说：我这个病（肺癌）不管治不治得好，你以后都要好好跟妈妈生活，不要让她担心，多帮她做点事，我埋着头喝鸡汤，眼泪往汤里面一直流，到现在都还记得那碗汤越喝越咸。不知道现在老爸在天堂还好不~</p><button>More</button><span><img src="http://127.0.0.1:8000/static/img/icon_praise.png" alt=""/>133 <img src="http://127.0.0.1:8000/static/img/icon_comment.png" alt=""/>133 </span>';
        var last_button = last.getElementsByTagName("button");
        // last_button[0].setAttribute("blog",blog.allBlog[count].id);
        count++;
        //i,m working here
        last_button[0].onclick = function(){
            $.post('getstory',{blogId:this.blogId}, function(data){//申请写这篇博文的好友的信息，发送博文的id，接受一个json，json格式如下
//data:json
//json[0]:{nickname:}
//json[1]:{sidebarImg:[src1,src2]}
//json[2]:{allBlog:[{id:,title:,passage:,img:},{id:,title:,passage,img:},...]}
//json[3]:{myBlog:[{title:,passage:},{title:,passage:}]}
                dataObj = data.parse();
                document.getElementById("nickname2").innerHTML = dataObj[0].nickname;
                document.getElementById("story3").innerHTML = dataObj[3].myBlog[0];
                document.getElementById("story4").innerHTML = dataObj[3].myBlog[1];
                document.getElementById("sidebar-img3").setAttribute("src",dataObj[1].sideBarImg[0]);
                document.getElementById("sidebar-img4").setAttribute("src".dataObj[1].sidebarImg[1]);
                document.getElementById("blog-init").innerHTML = this.parentNode.getElementsByTagName("P")[1].innerHTML;
            });
            var blogBorder = document.getElementById("blog-border");
            var maskAll = document.getElementById("mask-all");
            var scrollPosition;
            var scrollTo;
            scrollPosition = 4.077*(document.body.clientWidth/1536)*127;
            scrollTo = document.documentElement.scrollTop || document.body.scrollTop;
            if(Math.abs((scrollPosition|0)-(scrollTo|0))<=1){
                blogBorder.classList.add("blog-border-show");
                maskAll.classList.add("mask-all-show");
            }
            else{
                slowScrollTo(scrollPosition,300);
                setTimeout(function(){
                    blogBorder.classList.add("blog-border-show");
                    maskAll.classList.add("mask-all-show");
                },300)
            }
        };
        contain.appendChild(last);
        m[0].parentNode.removeChild(m[0]);
        for(var i=0;i<7;i++){
            m[i].setAttribute("id",m[i].id[0]+(+m[i].id[1]-1))
        }
        m[3].removeEventListener("click",handler2);
        m[4].addEventListener("click",handler2);
        m[1].removeEventListener("click",handler1);
        m[2].addEventListener("click",handler1);
    };
    m[4].addEventListener("click",handler2);

}

function sidebarReverse(){
    var storyNum = document.getElementById("story-num");
    var photoNum = document.getElementById("photo-num");
    var friNum = document.getElementById("fri-num");
    var storyNum2 = document.getElementById("story-num2");
    var photoNum2 = document.getElementById("photo-num2");
    var friNum2 = document.getElementById("fri-num2");

    storyNum.onmouseover = function(){
        storyNum.className = "mid-reverse";
        photoNum.classList.remove("mid-reverse");
        friNum.classList.remove("mid-reverse");
    };
    photoNum.onmouseover = function(){
        storyNum.classList.remove("mid-reverse");
        photoNum.className = "mid-reverse";
        friNum.classList.remove("mid-reverse");
    };
    friNum.onmouseover = function(){
        storyNum.classList.remove("mid-reverse");
        photoNum.classList.remove("mid-reverse");
        friNum.className = "mid-reverse";
    }

    storyNum2.onmouseover = function(){
        storyNum2.className = "mid-reverse";
        photoNum2.classList.remove("mid-reverse");
        friNum2.classList.remove("mid-reverse");
    };
    photoNum2.onmouseover = function(){
        storyNum2.classList.remove("mid-reverse");
        photoNum2.className = "mid-reverse";
        friNum2.classList.remove("mid-reverse");
    };
    friNum2.onmouseover = function(){
        storyNum2.classList.remove("mid-reverse");
        photoNum2.classList.remove("mid-reverse");
        friNum2.className = "mid-reverse";
    }
}