
var step=5;
let X=0;
let Y=0;
let Z=0;
let angle=0;

var asukoha_nr=10;
var ylesannete_loendur=0;
var oige_vastus=0;
var l6petamise_tingimus=false;

function windowResized() {
  resizeCanvas(windowWidth, 550, WEBGL);
}
// 

function setup() {
  canvas=createCanvas(windowWidth,550,WEBGL);
  //canvas.position(0,0);
  write_texts();
  Reset();
  document.getElementById("lihtsam").style.visibility = "hidden";
  document.getElementById("latex").style.visibility = "hidden";
    stroke(100,180,200);
    strokeWeight(4);
    let fov= PI/3;
    let cameraZ=(height/2.0)/tan(fov/2.0);
    perspective(fov, width/height, cameraZ/10000.0, cameraZ*10000);
}

function draw() {
  
  background(230,245,255);
  
  yl_text.position(width/asukoha_nr,height/asukoha_nr);
  MathQuill_v6rrand.position(width/asukoha_nr+0,height/asukoha_nr+140);
  
  tex_v6rrand.position(width/asukoha_nr+0,height/asukoha_nr+35)
  tulemus.position(width/asukoha_nr+0,height/asukoha_nr+230);
  
  RUUTJUUR.position(width/asukoha_nr-90,height/asukoha_nr+170);
  RUUTJUUR.mousePressed(ruutjuure_mark_MQ);
  
  EI_SAA_ARVUTADA.position(width/asukoha_nr-20,height/asukoha_nr+169);
  EI_SAA_ARVUTADA.mousePressed(ei_saa_MQ);
  
  
  KONTROLL_NUPP.position(width/asukoha_nr-110,height/asukoha_nr+250);
  KONTROLL_NUPP.mousePressed(kontroll);
  
  RESET_NUPP.position(width/asukoha_nr+70,height/asukoha_nr+250);
  RESET_NUPP.mousePressed(Reset);
  
  L6PETA_NUPP.position(width/asukoha_nr+20,height/asukoha_nr+320);
  L6PETA_NUPP.mousePressed(L6pp);
  
//   juhised_text.position(width/asukoha_nr-20,height/asukoha_nr+25);
  
  
  // console.log(tex_v6rrand.size)
  if(l6petamise_tingimus==true){
    background(15,30,60);
    new_step();
    orbitControl(4,4,0.01);
    rotateY(angle);
    rotateZ(angle*0.5);
    beginShape(POINTS);
    for (i=0;i<=empty_vec.length-1;i++){
      vertex(empty_vec[i].x,empty_vec[i].y, empty_vec[i].z);
      }
      endShape();
  angle=angle+0.01;
  camera(0, 0, 300 - sin(frameCount * 0.001) * 200, 0, 0, 0, 0, 1, 0);
  if (empty_vec.length >=100000){
      empty_vec=[];
      X=0;
      Y=0;
      Z=0;
    }
  }
  
}

function Reset(){
  
  if(ylesannete_loendur>0){
    
    KONTROLL_NUPP.remove();
    RESET_NUPP.remove();
    L6PETA_NUPP.remove();
    RUUTJUUR.remove();
    EI_SAA_ARVUTADA.remove();
  }
  
  Ylesanne();
  tulemus.html("");
  
  var answerMathField = MQ.MathField(answerSpan);
  answerMathField.focus();
  answerMathField.latex("");
  
  
  KONTROLL_NUPP=createButton("Kontroll");
  KONTROLL_NUPP.style('padding','10px 20px');
  KONTROLL_NUPP.style('background-color','MidNightBlue');
  KONTROLL_NUPP.style('color','white');
  KONTROLL_NUPP.style('border-radius','30px');
  KONTROLL_NUPP.style('margin-top','30px');
  KONTROLL_NUPP.style('margin-left','100px');
  KONTROLL_NUPP.position(width/asukoha_nr-50,height/asukoha_nr+300);
  
  RESET_NUPP=createButton("Uus ülesanne");
  RESET_NUPP.id("reset");
  RESET_NUPP.style('padding','10px 20px');
  RESET_NUPP.style('background-color','#508bc3');
  RESET_NUPP.style('color','white');
  RESET_NUPP.style('border-radius','30px');
  RESET_NUPP.style('margin-top','30px');
  RESET_NUPP.style('margin-left','20px');
  RESET_NUPP.position(width/asukoha_nr+130,height/asukoha_nr+300);
  
  L6PETA_NUPP=createButton("Lõpeta test");
  L6PETA_NUPP.style('padding','10px 20px');
  L6PETA_NUPP.style('background-color','LightSteelBlue');
  L6PETA_NUPP.style('color','black');
  L6PETA_NUPP.style('font-weight','bold');
  L6PETA_NUPP.style('border-radius','30px');
  L6PETA_NUPP.style('margin-top','30px');
  L6PETA_NUPP.style('margin-left','80px');
  L6PETA_NUPP.position(width/asukoha_nr+200,height/asukoha_nr+300);
  // juhised_text=createP("Juhised");
  // juhised_text.style("color","grey");
  // juhised_text.style("font-style","oblique");
  // juhised_text.style('padding','10px 20px');
  // juhised_text.position(width/asukoha_nr-20,height/asukoha_nr+25);
  
 
  RUUTJUUR=createButton("");
  RUUTJUUR.id('ruutjuur');
  RUUTJUUR.style('color','black');
  RUUTJUUR.style('padding','5px 10px');
  RUUTJUUR.style('margin-top','30px');
  RUUTJUUR.style('margin-left','90px');
  RUUTJUUR.position(width/asukoha_nr+200,height/asukoha_nr+200);
  katex.render("\\sqrt{\\hspace{3mm} }",RUUTJUUR.elt);
  
  EI_SAA_ARVUTADA=createButton("Võimatu");
  EI_SAA_ARVUTADA.id('eisaa');
  EI_SAA_ARVUTADA.style('color','black');
  EI_SAA_ARVUTADA.style('padding','8px 10px');
  EI_SAA_ARVUTADA.style('margin-top','30px');
  EI_SAA_ARVUTADA.style('margin-left','90px');
  EI_SAA_ARVUTADA.position(width/asukoha_nr-10,height/asukoha_nr+150);

  
  
  ylesannete_loendur=ylesannete_loendur+1;

}

function Ylesanne(){
  
  yl_text.html("Arvuta täpne väärtus.");
  
  mudel=["1","2","3","4","5","6","7","8"];
  mudeli_valik=random(mudel);
  //console.log(mudeli_valik);
 
  
  // Korrutamine ilusa vastusega (juured koos)
  if (mudeli_valik=="1"){
      
      arv1=int(random(0,6));
      arv2=int(random(0,6));
      mark1=random([1,1,1,1,1,1,1,-1]); // Miinuse esinemise tõenäosus on 12.5% iga arvu jaoks
      mark2=random([1,1,1,1,1,1,1,-1]); // Miinuse esinemise tõenäosus on 12.5% iga arvu jaoks
      arv1_juure_all=mark1*arv1*arv1;
      arv2_juure_all=mark2*arv2*arv2;
      if (arv1_juure_all*arv2_juure_all<0){
        vastus="-"; // EI SAA JAGADA "vastus"
      } else if (arv1_juure_all*arv2_juure_all==0){
        vastus="0";
      } else if (arv1_juure_all*arv2_juure_all>0){
        vastus=str(arv1*arv2);
      }
    
      if (arv1_juure_all<0){
        arv1_juure_all="("+str(arv1_juure_all)+")";
      }
      if (arv2_juure_all<0){
        arv2_juure_all="("+str(arv2_juure_all)+")"
      }
      
      antav_ylesanne="\\sqrt{"+ str(arv1_juure_all)+ "\\cdot"+ str(arv2_juure_all)+"}"
      vastus_kontrolliks=vastus;
      console.log(vastus_kontrolliks)
  }
  
  
    // Korrutamine ilusa vastusega (juured eraldi)
  if (mudeli_valik=="2"){
      
      arv1=int(random(0,6));
      arv2=int(random(0,6));
      mark1=random([1,1,1,1,1,1,1,-1]); // Miinuse esinemise tõenäosus on 12.5% iga arvu jaoks
      mark2=random([1,1,1,1,1,1,1,-1]); // Miinuse esinemise tõenäosus on 12.5% iga arvu jaoks
      arv1_juure_all=mark1*arv1*arv1;
      arv2_juure_all=mark2*arv2*arv2;
    
    
      if (arv1_juure_all<0 || arv2_juure_all<0){
        vastus="-"; // EI SAA JAGADA "vastus"
      } else if (arv1_juure_all*arv2_juure_all==0){
        vastus="0";
      } else if (arv1_juure_all>0 && arv2_juure_all>0){
        vastus=str(arv1*arv2);
      }
    
      if (arv1_juure_all<0){
        arv1_juure_all="("+str(arv1_juure_all)+")";
      }
      if (arv2_juure_all<0){
        arv2_juure_all="("+str(arv2_juure_all)+")"
      }
      
      antav_ylesanne="\\sqrt{"+ str(arv1_juure_all)+"}"+"\\cdot"+"\\sqrt{"+ str(arv2_juure_all)+"}"
      vastus_kontrolliks=vastus;
      console.log(vastus_kontrolliks)
  }
  
  
      // Jagamine ilusa vastusega (juured koos)
  if (mudeli_valik=="3"){
    
      arv1=int(random(1,25));
      arv2=int(random(1,25));

      mark1=random([1,1,1,1,1,1,1,-1]); // Miinuse esinemise tõenäosus on 12.5% iga arvu jaoks
      mark2=random([1,1,1,1,1,1,1,-1]); // Miinuse esinemise tõenäosus on 12.5% iga arvu jaoks
      arv1_juure_all=(mark1*arv1*arv1)/(mark2*arv2*arv2);
    
      if (arv1_juure_all<0 || arv2*arv2==0 ){
        vastus="-"; // EI SAA juurida "vastus"
      } else if (arv1_juure_all==0){
        vastus="0";
      } else if (arv1_juure_all>0 ){
        vastus=str((arv1)/(arv2));
        console.log("arv1:"+arv1,"arv2: "+arv2,"vastus: "+vastus)
        if (arv1/arv2!=int(arv1/arv2)){
              if (str(vastus).split(".")[1].length>10){
                arv1_taandatud=arv1;
                arv2_taandatud=arv2;
                // TAANDAMINE
                    for (i=625; i>1; i--){
                      if (arv1%i==0 && arv2%i==0){
                        arv1_taandatud=arv1/i;
                        arv2_taandatud=arv2/i;
                        break
                        
                      }
                    }
                    vastus="("+str(arv1_taandatud)+")/("+str(arv2_taandatud)+")";
              }
        }
      }
    
      if (mark1*arv1*arv1<0){
        lugeja_juures="("+str(mark1*arv1*arv1)+")";
      } else {
        lugeja_juures=str(mark1*arv1*arv1)
      }
    
      if (mark2*arv2*arv2<0){
        nimetaja_juures="("+str(mark2*arv2*arv2)+")";
      } else {
        nimetaja_juures=str(mark2*arv2*arv2)
      }
      
    
      yl_1="\\sqrt{"+str(lugeja_juures)+":"+str(nimetaja_juures)+"}";
      yl_2="\\sqrt{ \\dfrac{"+str(lugeja_juures)+"}{"+str(nimetaja_juures)+"}}";
      ylesanded=random([yl_1, yl_2]);
    
      antav_ylesanne=ylesanded
    
      vastus_kontrolliks=vastus;
      console.log(vastus_kontrolliks)
  }
  
  
        // Jagamine ilusa vastusega (juured eraldi)
  if (mudeli_valik=="4"){
    
          arv1=int(random(0,25));
          arv2=int(random(0,25));

      mark1=random([1,1,1,1,1,1,1,-1]); // Miinuse esinemise tõenäosus on 12.5% iga arvu jaoks
      mark2=random([1,1,1,1,1,1,1,-1]); // Miinuse esinemise tõenäosus on 12.5% iga arvu jaoks
      arv1_juure_all=mark1*arv1*arv1;
      arv2_juure_all=mark2*arv2*arv2;
      if (arv1_juure_all<0 || arv2_juure_all<=0 ){
        vastus="-"; // EI SAA juurida "vastus"
      } else if (arv1_juure_all==0){
        vastus="0";
      } else if (arv1_juure_all>0 && arv2_juure_all>0){
        vastus=str((arv1)/(arv2));
        console.log("arv1:"+arv1,"arv2: "+arv2,"vastus: "+vastus)
        if ((arv1/arv2)!=(int(arv1/arv2))){
              if (str(vastus).split(".")[1].length>10){
                arv1_taandatud=arv1;
                arv2_taandatud=arv2;
                // TAANDAMINE
                    for (i=625; i>1; i--){
                      if (arv1%i==0 && arv2%i==0){
                        arv1_taandatud=arv1/i;
                        arv2_taandatud=arv2/i;
                        break
                        
                      }
                    }
                    vastus="("+str(arv1_taandatud)+")/("+str(arv2_taandatud)+")";
              }
        }
      }
    
      if (mark1*arv1*arv1<0){
        lugeja_juures="("+str(mark1*arv1*arv1)+")";
      } else {
        lugeja_juures=str(mark1*arv1*arv1)
      }
    
      if (mark2*arv2*arv2<0){
        nimetaja_juures="("+str(mark2*arv2*arv2)+")";
      } else {
        nimetaja_juures=str(mark2*arv2*arv2)
      }
    
      yl_1="\\sqrt{"+str(lugeja_juures)+"}:\\sqrt{"+str(nimetaja_juures)+"}";
      yl_2="\\dfrac{ \\sqrt{ "+str(lugeja_juures)+"}}{ \\sqrt{"+str(nimetaja_juures)+"}}";
      ylesanded=random([yl_1, yl_2]);
    
      antav_ylesanne=ylesanded
    
      vastus_kontrolliks=vastus;
      console.log(vastus_kontrolliks)
  }
  
  
  
          // Liitmine (juured koos)
  if (mudeli_valik=="5"){
    
          init_num1=int((random(2,10)));
          while (true){
            init_num2=int(random(1,10)); 
            juur_arvust_2 = Math.sqrt(init_num2);
            if ( (int(juur_arvust_2)*int(juur_arvust_2)) !=init_num2){
                break
            }       
          }  
          summa_juure_all = init_num1*init_num1*init_num2;
          lahutaja=int(random(0,summa_juure_all));
          esimene_arv=summa_juure_all-lahutaja;
          teine_arv=lahutaja;
          
          antav_ylesanne="\\sqrt{"+str(esimene_arv)+"+"+str(teine_arv)+"}"   
          vastus_1 = "\sqrt("+str(esimene_arv+teine_arv)+")";
          vastus_2 = str(init_num1)+"\sqrt("+str(init_num2)+")"
    
            
      vastus_kontrolliks=vastus_2;
      console.log(vastus_kontrolliks)
  }
    
    
    
              // Liitmine (juured eraldi)
  if (mudeli_valik=="6"){
    
    arv1 = int(random(0,30))/2;
    arv2 = int(random(0,30))/2;
    
    antav_ylesanne="\\sqrt{"+str(arv1*arv1)+"}+\\sqrt{"+str(arv2*arv2)+"}";
    
    vastus=str(arv1+arv2);

      vastus_kontrolliks=vastus;
      console.log(vastus_kontrolliks)
  }
  
    
    
                  // Lahutamine (juured eraldi)
  if (mudeli_valik=="7"){
    
    arv1 = int(random(0,30))/2;
    arv2 = int(random(0,30))/2;
    
    antav_ylesanne="\\sqrt{"+str(arv1*arv1)+"}-\\sqrt{"+str(arv2*arv2)+"}";
    
    vastus=str(arv1-arv2);

      vastus_kontrolliks=vastus;
      console.log(vastus_kontrolliks)
  }
    
    
              // Lahutamine (juured koos)
  if (mudeli_valik=="8"){
    
          init_num1=int((random(2,10)));
          while (true){
            init_num2=int(random(1,10)); 
            juur_arvust_2 = Math.sqrt(init_num2);
            if ( (int(juur_arvust_2)*int(juur_arvust_2)) !=init_num2){
                break
            }       
          }  
          summa_juure_all = init_num1*init_num1*init_num2;
          liitja=int(random(0,summa_juure_all));
          esimene_arv=summa_juure_all+liitja;
          teine_arv=liitja;
          
          antav_ylesanne="\\sqrt{"+str(esimene_arv)+"-"+str(teine_arv)+"}"   
          vastus_1 = "\sqrt("+str(esimene_arv+teine_arv)+")";
          vastus_2 = str(init_num1)+"\sqrt("+str(init_num2)+")"
    
            
      vastus_kontrolliks=vastus_2;
      console.log(vastus_kontrolliks)
  }
    
    
    
  
  
    //console.log(antav_ylesanne)
    // console.log(vastus_kontrolliks)
   tex_string=antav_ylesanne+"=";
   katex.render( tex_string, tex_v6rrand.elt);
  
  
}


function write_texts(){
  
  tex_v6rrand=createP("");
  tex_v6rrand.position(width/asukoha_nr+0,height/asukoha_nr+60)
  tex_v6rrand.style("font-family: 'Roboto',sans-serif; font-size: 1.25rem; line-height: 140%; width: 100%; float: left ")
  
  // tex_v6rrand.parent("test");
  MathQuill_v6rrand=select("#answer");
  // MathQuill_v6rrand.parent(tex_v6rrand)
  // MathQuill_v6rrand.style("width: 80%; float: right; font-size: 24px; margin: 30px auto;");
  
  MathQuill_v6rrand.style(" width: 80%; margin-top: 70px auto; font-size: 24px");
  MathQuill_v6rrand.position(width/asukoha_nr+0,height/asukoha_nr+190);
  
  yl_text=createP("");
  yl_text.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.25rem ");
  yl_text.position(width/asukoha_nr,height/asukoha_nr);
  
  tulemus=createP("");
  tulemus.position(width/asukoha_nr+155,height/asukoha_nr+65);
  tulemus.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.00rem ");
  
}

function kontroll(){
  sisu=document.getElementById("lihtsam").textContent;
  //console.log("KONTROLL: ")
console.log("MQ sisu: ", sisu);
     
       //console.log("Vastus võrdlemiseks: ", vastus_kontrolliks)
           if (str(sisu) == vastus_kontrolliks && str(sisu).length>0){
              tulemus.html("Õige!");
              tulemus.style("color","green");
              KONTROLL_NUPP.attribute("disabled","");
              oige_vastus=oige_vastus+1;
             //console.log("õige")
            } else {
              tulemus.html("Viga!");
              tulemus.style("color","red");
            }
}


function ruutjuure_mark_MQ(){
  var answerMathField = MQ.MathField(answerSpan);
  document.getElementById("ruutjuur").onclick = function () {
  answerMathField.focus();
  answerMathField.cmd("\\sqrt");
};
}  

function ei_saa_MQ(){
  var answerMathField = MQ.MathField(answerSpan);
  document.getElementById("eisaa").onclick = function () {
  answerMathField.focus();
  answerMathField.latex("-");
};  
}

function L6pp(){
  
  KONTROLL_NUPP.attribute("disabled","");
  RESET_NUPP.attribute("disabled","");
  L6PETA_NUPP.attribute("disabled","");
  RUUTJUUR.attribute("disabled","");
  EI_SAA_ARVUTADA.attribute("disabled","");
  
  tex_v6rrand.remove();
  yl_text.remove();
  tulemus.remove();
  
  RESET_NUPP.remove();
  L6PETA_NUPP.remove();
  KONTROLL_NUPP.remove();
  MathQuill_v6rrand.remove();
  RUUTJUUR.remove();
  EI_SAA_ARVUTADA.remove();
  
  Tulemus=createP("Tulemus: "+str(round_2((oige_vastus/ylesannete_loendur)*100))+"%<br>Kogu ülesannete arv: "+str(ylesannete_loendur)+"<br>Õigeid lahendusi: "+str(oige_vastus));
  Tulemus.position(width/4-100,height/4-100);
  Tulemus.style("font-size","28px");
  Tulemus.style("color",color(255,255,255));
  Tulemus.style("line-height","140%");
  Tulemus.style("font-family","'Roboto',sans-serif");
  l6petamise_tingimus=true;
}



function round_0(v) {
    return (Math.sign(v) * Math.round(Math.abs(v)) )
}

function round_1(v) {
    return (Math.sign(v) * Math.round(Math.abs(v)*10)/10 )
}

function round_2(v) {
    return (Math.sign(v) * Math.round(Math.abs(v)*100)/100 )
}

function round_3(v) {
    return (Math.sign(v) * Math.round(Math.abs(v)*1000)/1000 )
}

function round_4(v) {
    return (Math.sign(v) * Math.round(Math.abs(v)*10000)/10000 )
}

function liikmete_SUM(massiiv){
  temp_summa=0;
  for (i=0; i<=massiiv.length-1; i++){
    temp_summa=temp_summa+massiiv[i];
  }
    return temp_summa
}

// for end screen
empty_vec=[]
function new_step(){
  
    direction=random(["up","down","left","right","forward","back"]);
    if (direction=="up"){
      X=X+step;
    } else if (direction == "down"){
      X=X-step;
    } else if (direction=="left"){
      Y=Y-step;
    } else if (direction=="right"){
      Y=Y+step;
    } else if (direction=="forward"){
      Z=Z+step;
    } else if (direction=="back"){
      Z=Z-step;
    }
  vek=createVector(X,Y,Z);
  empty_vec.push(vek);
}




function permute(permutation) {
  var length = permutation.length,
      result = [permutation.slice()],
      c = new Array(length).fill(0),
      i = 1, k, p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}  
  
function shuffleArray(array) {
   for (var i = array.length - 1; i > 0; i--) {
   
       // Generate random number
       var j = Math.floor(Math.random() * (i + 1));
                   
       var temp = array[i];
       array[i] = array[j];
       array[j] = temp;
   }
       
   return array;
}
  

  
