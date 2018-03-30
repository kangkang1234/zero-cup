/**
 * Created by HP on 2017/11/29.
 */



window.onload = function(){
    loginSubmit();
    signUpSubmit();
    var main = document.querySelector("#main");
    var logSignUp = document.querySelector("#log-sign-up");
    var login = document.querySelector("#login");
    var signUp = document.querySelector("#sign-up");
    var mask = document.querySelector("#mask");
    var loginBu = document.querySelector("#login-bu");
    var getIdCodeBu = document.querySelector("#getIdCode");
    if(window.matchMedia('(max-width:992px)').matches){
        login.className = "login-sign-up log-mobil";
    }
    window.addEventListener("resize",function(){
        //alert(window.matchMedia('(min-width:1200px)'));
        //console.log(window.matchMedia('(min-width:1200px)'));
        if(window.matchMedia('(max-width:992px)').matches){
            login.className = "login-sign-up log-mobil";
        }
        else{
            login.className = "login-sign-up log-1";
        }
    });
    login.onclick = function(){
        if(signUp.className == "login-sign-up none"){
            main.className = "enter main-bg2";
            mask.className = "show mask-log";
            login.className = "login-sign-up log-2"
        }
        else{
            main.className = "enter main-bg2";
            mask.className = "show mask-log";
            login.className = "login-sign-up log-2";
            signUp.className = "login-sign-up sign-hidden";
            setTimeout(function(){
                signUp.className = "login-sign-up none"
            },200)
        }
        loginBu.style.fontSize = "33px";
        setTimeout(function(){
            loginBu.style.fontSize = "22px";
        },250)
    };
    logSignUp.addEventListener("click",function(event){
        if(signUp.className == "login-sign-up none"){
            main.className = "enter main-bg3";
            setTimeout(function(){
                signUp.className = "login-sign-up show-sign";
            },100);
            mask.className = "show mask-sign-up";
            login.className = "login-sign-up log-3";
            loginBu.style.fontSize = "33px";
            setTimeout(function(){
                loginBu.style.fontSize = "22px";
            },250);
            event.stopPropagation();
        }
    });
    mask.onclick = function(){
        login.className = "login-sign-up log-1";
        signUp.className = "login-sign-up none";
        main.className = "enter main-bg1";
        if(mask.className == "show mask-log"){
            loginBu.style.fontSize = "33px";
            setTimeout(function(){
                loginBu.style.fontSize = "22px";
            },250);
        }
        mask.className = "none";
    };
    getIdCodeBu.onclick = function(){
        getIdCodeChange(getIdCodeBu);
        getIdCode();
    }
};

function getIdCode(){
    var tel = document.querySelector("#tel");
    $.ajax({
        type:"post",
        url:"sendcode/",
        data:{tel:tel.value},
        success:function(data){
            if(data=="1"){
                alert("发送成功");
            }
            else{
                alert("发送失败，请重新发送");
            }
        },
        error:function(){
            console.log("signUp/getIdCode.php 404");
        }
    })
}

function getIdCodeChange(button){
    button.style.width = "170px";
    button.disabled = "disabled";
    setTimeout(function(){
        var i = 60;
        button.innerHTML = i+"秒后可再次获取";
        var a = setInterval(function(){
            i--;
            button.innerHTML = i+"秒后可再次获取";
            if(i<1){
                button.innerHTML = "点击获取验证码";
                clearInterval(a);
                button.style.width = "150px";
                button.removeAttribute("disabled");
            }
        },1000);
    },500);
}

function loginSubmit() {
    var loginBu = document.querySelector("#login-bu");
    var $loginFrom = $("#loginFrom");
    loginBu.onclick = function(event){
        $.ajax({
            type:"post",
            url:"logindone/",
            data:$loginFrom.serialize(),
            success:function(data){
                if(data=="0"){
                    alert("用户密码输入错误，请重新输入")
                }
                else if(data=="err"){
                    alert('用户名不存在');
                }
                else {
                    window.location.href = 'ch/home/';
                }
            },
            error:function(){
                console.log("shiwu");
            }
        });
        event.preventDefault();
    }
}
//     $("#login-bu").click(function(){
//         var type = new Object();
//         var content = $("#loginFrom").serializeArray();
//         content.push(type);
//
//           $.post("logindone/",content,function (data) {
//                 if(data=="0"){
//                     alert("用户密码输入错误，请重新输入");
//                 }
//                 else if(data=="err"){
//                     alert('用户名不存在');
//                 }
//             },"json");
//     })
// }
//





function signUpSubmit(){
    var tel = document.querySelector("#tel");
    var idCode = document.querySelector("#idCodeInput");
    var pass = document.querySelector("#pass");
    var signUpBu = document.querySelector("#sign-up-bu");
    var $signUpForm = $("#signUpForm");
    var signUp = document.querySelector("#sign-up");
    tel.onblur = function(){
        $.ajax({
            type:"post",
            url:'judge/',
            data:{tel:tel.value},
            success:function(data){
                if(data=="1"){
                    alert("该手机号已注册");
                }
            },
            error:function(){
                console.log("signUp/tel.php 404");
            }
        })
    };
    signUpBu.onclick = function(event){
        // $.ajax({
        //     type:"post",
        //     url:"signUp/checkIdCode.php",
        //     data:{idCode:idCode.value},
        //     success:function(data){
        //         if(data=="1"){
            $.ajax({
                type:"post",
                url:"reg_done/",
                data:$signUpForm.serialize(),
                success:function(data){
                    if(data =="1"){
                        alert("注册成功！");
                        signUp.className = "login-sign-up none";
                    }
                    else{
                        alert("验证码输入错误，请重新输入！");
                        idCode.value = "";
                }
                },


                error:function(){
                    console.log("signUp/canSignUp.php 404");
                }
            })
        //         }
        //         else{
        //             alert("验证码输入错误，请重新输入！");
        //             idCode.value = "";
        //         }
        //     },
        //     error:function(){
        //         console.log("signUp/checkIdCode.php 404");
        //     }
        // });
        event.preventDefault();
        event.stopPropagation();
    }
}
