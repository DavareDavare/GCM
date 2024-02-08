/*
  Author: Sarah Hagenhofer
  Lastly edited: 14.01.2023
  Comment: JS file for index.html
*/

// variables for the status of each data-section
var statusRate = 0;
var statusHash = 0;
var statusniederschlag = 0;

//variable for the accent colour
var colourpick = '#B72626';


function switchRate(){
  
  if(statusRate==0){

    statusRate = 1;

    //calculates the exact time of the last 20 hours, separated by 4 hours each
    var currDate = new Date();
    var currTime = currDate.getHours()+":"+currDate.getMinutes()+":"+currDate.getSeconds();
    var oneAgoTime = (currDate.getHours()-4)+":"+currDate.getMinutes()+":"+currDate.getSeconds();
    var twoAgoTime = (currDate.getHours()-8)+":"+currDate.getMinutes()+":"+currDate.getSeconds();
    var threeAgoTime = (currDate.getHours()-12)+":"+currDate.getMinutes()+":"+currDate.getSeconds();
    var fourAgoTime = (currDate.getHours()-16)+":"+currDate.getMinutes()+":"+currDate.getSeconds();
    var fiveAgoTime = (currDate.getHours()-20)+":"+currDate.getMinutes()+":"+currDate.getSeconds();

    let divclass = document.getElementById('rate');
      divclass.querySelector("h2").innerHTML="";
    let chartclass = document.getElementById('chartDiv');
      chartclass.style="position: relative; height:30vh; width:60vw;";

    //creates a line-chart with the given data / existing error: is yet to be filled with the real data, up until now works based on proto-data
    var chart = JSC.chart('chartDiv', {
        debug: true,
        type: 'line',
        legend_position: 'inside bottom right',
        xAxis: { type: 'time' },
        series: [
          {
            name: 'Hours',
            points: [
              [fiveAgoTime, 29.9],
              [fourAgoTime, 71.5],
              [threeAgoTime, 106.4],
              [twoAgoTime, 129.2],
              [oneAgoTime, 144.0],
              [currTime, 176.0]
            ]
          }
        ]
    });

    //closes the two other data-sections if opened
    if(statusHash==1){
      statusHash==0;
      switchHash();
    }
    if(statusniederschlag==1){
      statusniederschlag==0;
      switchNiederschlag();
    }

  }
  else if(statusRate==1){

    statusRate = 0;
    loadRate();
    let chartclass = document.getElementById('chartDiv');
    chartclass.style="position: relative; height:0vh; width:0vw; margin: 0px;";
    
    var chart = JSC.chart('chartDiv', {
    });
    chart.destroy();

  }
}


function switchHash(){
    
  if(statusHash==0){
      
    statusHash = 1;

    //calculates the exact time of the last 20 hours, separated by 4 hours each
    var currDate = new Date();
    var currTime = currDate.getHours()+":"+currDate.getMinutes()+":"+currDate.getSeconds();
    var oneAgoTime = (currDate.getHours()-4)+":"+currDate.getMinutes()+":"+currDate.getSeconds();
    var twoAgoTime = (currDate.getHours()-8)+":"+currDate.getMinutes()+":"+currDate.getSeconds();
    var threeAgoTime = (currDate.getHours()-12)+":"+currDate.getMinutes()+":"+currDate.getSeconds();
    var fourAgoTime = (currDate.getHours()-16)+":"+currDate.getMinutes()+":"+currDate.getSeconds();
    var fiveAgoTime = (currDate.getHours()-20)+":"+currDate.getMinutes()+":"+currDate.getSeconds();

    let divclass = document.getElementById('hash');
    divclass.querySelector("h2").innerHTML="";
    let chartclass = document.getElementById('chartDivHash');
    chartclass.style="position: relative; height:30vh; width:60vw;";

    //creates a line-chart with the given data / existing error: is yet to be filled with the real data, up until now works based on proto-data
    var chart = JSC.chart('chartDivHash', {
        debug: true,
        type: 'line',
        legend_position: 'inside bottom right',
        xAxis: { type: 'time' },
        series: [
          {
            name: 'Hours',
            points: [
              [fiveAgoTime, 29.9],
              [fourAgoTime, 71.5],
              [threeAgoTime, 106.4],
              [twoAgoTime, 129.2],
              [oneAgoTime, 144.0],
              [currTime, 176.0]
            ]
          }
        ]
      });

      //closes the two other data-sections if opened
      if(statusRate==1){
        statusRate==0;
        switchRate();
      }
      if(statusniederschlag==1){
        statusniederschlag==0;
        switchNiederschlag();
      }

  }
  else if(statusHash==1){

    statusHash = 0;

    loadHash();
    let chartclass = document.getElementById('chartDivHash');
    chartclass.style="position: relative; height:0vh; width:0vw; margin: 0px;";
    
    var chart = JSC.chart('chartDivHash', {
    });
    chart.destroy();

  }
}

function switchNiederschlag(){

  if(statusniederschlag==0){

    statusniederschlag=1;

    //creates a new table with the weather data / existing error: only a placeholder up until now, yet to be filled with real weather data
    let divclass = document.getElementById('AktuellerNiederschlag');
    divclass.innerHTML = '<table class="col-12 col-md-8" id="showweather" style="text-align: center; width: 300px; font-size: larger;"><thead><th> 06:00 </th><th> 12:00 </th><th> 18:00 </th><th> 00:00 </th></thead><tbody><tr><td> <i class="fa fa-cloud"></i> </td><td> <i class="fa fa-cloud"></i>  </td><td>  <i class="fa fa-cloud"></i>  </td><td>  <i class="fa fa-cloud"></i>  </td></tr></tbody></table>';

    //closes the two other data-sections if opened
    if(statusHash==1){
      statusHash==0;
      switchHash();
    }
    if(statusRate==1){
      statusRate==0;
      switchRate();
    }

  }
  else if(statusniederschlag==1){

    statusniederschlag=0;

    let divclass = document.getElementById('AktuellerNiederschlag');
    divclass.innerHTML = '<h2 id="textNiedereschlag"></h2><div id="wetterbericht"" style="position: relative; height:0vh; width:0vw; margin: 0px;" onclick="switchNiederschlag()"></div>';
    loadWeather();
  }

}


function changecolour(){
  var colourfield = document.getElementById('colourpicker');
  colourpick = colourfield.value;
  document.getElementById('changebutton').style = 'background-color: '+colourpick+';';
  
  var geturl = 'https://localhost:7294/api/User/UpdateColor';

  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ color: colourpick })
};

  fetch(geturl, requestOptions)
    .then(response=>{
      if(!response.ok){
        throw new Error('Error');
      }
      return response.json();
    })
    .then(data=>{
    })
    .catch(error=>{
      console.log('Error', error);
    });
}

function fetchallfromdb(){
  //loadRate();
  //loadHash();
  //loadWeather();
  loadColour();
  //loadTheme();
}

function loadRate(){
  let divclass = document.getElementById('rate');
  var geturl = 'https://localhost:7000/api/Pvanlage/GetPv';

  fetch(geturl)
    .then(response=>{
      if(!response.ok){
        throw new Error('Error');
      }
      return response.json();
    })
    .then(data=>{
      var getrate = data[0].rate;
      divclass.querySelector("h2").innerHTML=getrate+' %';
    })
    .catch(error=>{
      console.log('Error', error);
    });
}

function loadHash(){
  let divclass = document.getElementById('hash');
  var geturl = 'https://localhost:7294/api/Miner/GetMiner';

  fetch(geturl)
    .then(response=>{
      if(!response.ok){
        throw new Error('Error');
      }
      return response.json();
    })
    .then(data=>{
      var gethash = data[0].hashRate;
      divclass.querySelector("h2").innerHTML=gethash+' TH/s';
    })
    .catch(error=>{
      console.log('Error', error);
    });
}

function loadWeather(){
  let divclass = document.getElementById('niederschlag');
  /*Anpassen an url:
  var geturl = '';

  fetch(geturl)
    .then(response=>{
      if(!response.ok){
        throw new Error('Error');
      }
      return response.json();
    })
    .then(data=>{
      var gethash = data[0].hashRate;
      divclass.querySelector("h2").innerHTML=gethash+' TH/s';
    })
    .catch(error=>{
      console.log('Error', error);
    });*/
    var gethash = 1;
      divclass.querySelector("h2").innerHTML=gethash+' %';
}

function loadColour(){
  var geturl = 'https://localhost:7294/api/User/GetColor';

  fetch(geturl)
    .then(response=>{
      if(!response.ok){
        throw new Error('Error');
      }
      return response.json();
    })
    .then(data=>{
      var getcolour = data;
      const collection = document.getElementsByClassName("loaded");

        for (let i = 0; i < collection.length; i++) {
          collection[i].style.backgroundColor = getcolour;
        }
    })
    .catch(error=>{
      console.log('Error', error);
    });
}
function loadSettings(){
  loadColour();

  var geturl = 'https://localhost:7294/api/User/GetColor';

  fetch(geturl)
    .then(response=>{
      if(!response.ok){
        throw new Error('Error');
      }
      return response.json();
    })
    .then(data=>{
      var getcolour = data;
      document.getElementById('colourpicker').value=getcolour;
    })
    .catch(error=>{
      console.log('Error', error);
    });

}

function loadasics(){
  loadColour();

  var geturl = 'https://localhost:7294/api/Miner/GetMiner';

  fetch(geturl)
    .then(response=>{
      if(!response.ok){
        throw new Error('Error');
      }
      return response.json();
    })
    .then(data=>{
      var counter = Object.keys(data).length;
      

      for(var x=0; x<counter; x++){
        var idstring = 'asic'+(x+1);
        document.getElementById(idstring).innerHTML=data[x].group;
        }
      
    })
    .catch(error=>{
      console.log('Error', error);
    });

}

function loadTheme(){
  var geturl = 'https://localhost:7294/api/User/GetIsDarkmode';

  fetch(geturl)
    .then(response=>{
      if(!response.ok){
        throw new Error('Error');
      }
      return response.json();
    })
    .then(data=>{

      if(data=="false"){
        //alert(data);
      }
      else if(data=="true"){
        //alert(data);
      }

    })
    .catch(error=>{
      console.log('Error', error);
    });
}

function switchTheme(){
  //alert("Switched!");
}
