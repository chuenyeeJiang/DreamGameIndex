 function getTime(v,s) {
    return s/v;
 }

 function donutRing(className,percentage) {

     var angleRequirements =  []; //需要旋转的角度
     var elements = $("." + className);
     for(var i = 0; i < $(elements).length ; i++){
         console.log($(elements)[i]);
         $($(elements)[i]).find(" .donut-ring-left").css("transition-delay",  $($(elements)[i]).find(" .donut-ring-right").css("transition-duration"));
         angleRequirements[i] = percentage*360;
         if(angleRequirements[i]<180) {
             $($(elements)[i]).find(" .donut-ring-right").css("transform","rotate("+eval(180+angleRequirements[i])+"deg)");
             console.log("rotate("+eval(180+angleRequirements[i])+"deg)");
         }else {
             $($(elements)[i]).find(" .donut-ring-right").css("transform","rotate(360deg)");
             $($(elements)[i]).find(" .donut-ring-left").css("transform","rotate("+eval(-360+angleRequirements[i])+"deg)");
             console.log("rotate("+eval(-360+angleRequirements[i])+"deg)");
         }
     }
 }
 function donutNum(className,value) {
     $("." + className + " .donut-num").text(value);
 }