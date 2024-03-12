/*
  Author: Sarah Hagenhofer
  Lastly edited: 27.02.2024
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

    var curr;
    var oneAgo;
    var twoAgo ;
    var threeAgo;
    var fourAgo;
    var fiveAgo;
    var currDate = new Date();
    var currTime = currDate.getHours()+":"+currDate.getMinutes()+":"+currDate.getSeconds();
    var oneAgoTime = (currDate.getHours()-4)+":"+currDate.getMinutes()+":"+currDate.getSeconds();
    var twoAgoTime = (currDate.getHours()-8)+":"+currDate.getMinutes()+":"+currDate.getSeconds();
    var threeAgoTime = (currDate.getHours()-12)+":"+currDate.getMinutes()+":"+currDate.getSeconds();
    var fourAgoTime = (currDate.getHours()-16)+":"+currDate.getMinutes()+":"+currDate.getSeconds();
    var fiveAgoTime = (currDate.getHours()-20)+":"+currDate.getMinutes()+":"+currDate.getSeconds();

    var geturl = 'https://localhost:7000/api/Pvanlage/GetPv';

    fetch(geturl)
      .then(response=>{
        if(!response.ok){
          throw new Error('Error');
        }
        return response.json();
      })
      .then(data=>{
        var datalength = data.length-1;
          curr = data[datalength].rate;
          oneAgo = data[datalength-1].rate;
          twoAgo = data[datalength-2].rate;
          threeAgo = data[datalength-3].rate;
          fourAgo = data[datalength-4].rate;
          fiveAgo = data[datalength-5].rate;


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
                    [fiveAgoTime, fiveAgo],
                    [fourAgoTime, fourAgo],
                    [threeAgoTime, threeAgo],
                    [twoAgoTime, twoAgo],
                    [oneAgoTime, oneAgo],
                    [currTime, curr]
                  ]
                }
              ]
          });

      })
      .catch(error=>{
        console.log('Error', error);
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

    var curr;
    var point;

    var geturl = 'https://localhost:7294/api/Miner/GetMiner';

    fetch(geturl)
      .then(response=>{
        if(!response.ok){
          throw new Error('Error');
        }
        return response.json();
      })
      .then(data=>{
        
        var datalength = data.length-1;
        var all = [];

        for(var i=0; i<=datalength; i++){
            curr = data[i].hashRate;
            point = i+1;

            all.push({which: point, value: curr});
        }
          
          let divclass = document.getElementById('hash');
          divclass.querySelector("h2").innerHTML="";
          let chartclass = document.getElementById('chartDivHash');
          chartclass.style="position: relative; height:30vh; width:60vw;";

          //creates a line-chart with the given data / existing error: is yet to be filled with the real data, up until now works based on proto-data
          var chart = JSC.chart('chartDivHash', {
              debug: true,
              type: 'line',
              legend_position: 'inside bottom right',
              series: [
                {
                  name: 'Miners',
                  points: [
                    [all[0].which, all[0].value],
                    [all[1].which, all[1].value]
                  ]
                }
              ]
          }); 
      })
      .catch(error=>{
        console.log('Error', error);
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

    var geturl = 'https://api.open-meteo.com/v1/forecast?latitude=47.3441&longitude=13.3915&current=precipitation&forecast_days=1';

    fetch(geturl)
      .then(response=>{
        if(!response.ok){
          throw new Error('Error');
        }
        return response.json();
      })
      .then(data=>{
        var getniederschlag = data.current.precipitation;
        let divclass = document.getElementById('AktuellerNiederschlag');

        if(Number(getniederschlag).toFixed(2)<=0.05){
          divclass.innerHTML = '<table class="col-12 col-md-8" id="showweather" style="text-align: center; width: 200px; font-size: larger;"><thead><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-sun-fill" viewBox="0 0 16 16"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/></svg></thead></table>';
        }
        else if(Number(getniederschlag).toFixed(2)>0.05 && Number(getniederschlag).toFixed(2)<=2){
          divclass.innerHTML = '<table class="col-12 col-md-8" id="showweather" style="text-align: center; width: 200px; font-size: larger;"><thead><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-cloud-fill" viewBox="0 0 16 16"><path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/></svg></thead></table>';
        }
        else if(Number(getniederschlag).toFixed(2)>2){
          divclass.innerHTML = '<table class="col-12 col-md-8" id="showweather" style="text-align: center; width: 200px; font-size: larger;"><thead><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-cloud-hail-fill" viewBox="0 0 16 16"><path d="M3.75 15.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m.408-3.724a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316M7.75 15.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m.408-3.724a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316m3.592 3.724a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m.408-3.724a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316m1.247-6.999a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10.5H13a3 3 0 0 0 .405-5.973"/></svg></thead></table>';
        }
        else{
          divclass.innerHTML = '<table class="col-12 col-md-8" id="showweather" style="text-align: center; width: 200px; font-size: larger;"><thead><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-patch-question-fill" viewBox="0 0 16 16"><path d="M5.933.87a2.89 2.89 0 0 1 4.134 0l.622.638.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01zM7.002 11a1 1 0 1 0 2 0 1 1 0 0 0-2 0m1.602-2.027c.04-.534.198-.815.846-1.26.674-.475 1.05-1.09 1.05-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.7 1.7 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745.336 0 .504-.24.554-.627"/></svg></thead></table>';
        }
      })
      .catch(error=>{
        console.log('Error', error);
      });



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
  loadRate();
  loadHash();
  loadWeather();
  loadColour();
  loadTheme();
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
      var datalength = data.length-1;
      var getrate = data[datalength].rate;
      divclass.querySelector("h2").innerHTML=Number(getrate).toFixed(2)+' kW/h';
    })
    .catch(error=>{
      console.log('Error', error);
    });
}

function loadHash(){
  let divclass = document.getElementById('hash');
  var geturl = 'https://localhost:7294/api/Miner/GetMiner';
  var numberraten = 0;

  fetch(geturl)
    .then(response=>{
      if(!response.ok){
        throw new Error('Error');
      }
      return response.json();
    })
    .then(data=>{
      var countminer = Object.keys(data).length;

      for(let a = 0; a < countminer; a++){
        numberraten = numberraten + data[a].hashRate;
      }
      divclass.querySelector("h2").innerHTML=Number(numberraten/countminer).toFixed(2)+' TH/s';
    })

    .catch(error=>{
      console.log('Error', error);
    });
}

function loadWeather(){
  let divclass = document.getElementById('niederschlag');
  
  var geturl = 'https://api.open-meteo.com/v1/forecast?latitude=47.3441&longitude=13.3915&current=precipitation&forecast_days=1';

  fetch(geturl)
    .then(response=>{
      if(!response.ok){
        throw new Error('Error');
      }
      return response.json();
    })
    .then(data=>{
      var getniederschlag = data.current.precipitation;
      var getunit = data.current_units.precipitation;
      divclass.querySelector("h2").innerHTML=Number(getniederschlag).toFixed(2)+' '+getunit;
    })
    .catch(error=>{
      console.log('Error', error);
    });
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
        var newLink = document.createElement('link');
          newLink.rel = 'stylesheet';
          newLink.type = 'text/css';
          newLink.href = 'lightstyle.css';

        var head = document.head;
        var oldLink = document.getElementById('stylesheet');

        if (oldLink) {
          head.removeChild(oldLink);
        }
          head.appendChild(newLink);

      }
      else if(data=="true"){
        var newLink = document.createElement('link');
          newLink.rel = 'stylesheet';
          newLink.type = 'text/css';
          newLink.href = 'style.css';

        var head = document.head;
        var oldLink = document.getElementById('stylesheet');

        if (oldLink) {
          head.removeChild(oldLink);
        }
          head.appendChild(newLink);
      }

    })
    .catch(error=>{
      console.log('Error', error);
    });
}

function loadSettings(){
  loadColour();
  loadTheme();

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
  loadTheme();

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

function switchTheme(){
  
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
        var url = 'https://localhost:7294/api/User/UpdateIsDarkmode';

        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: 'true'
        };

        fetch(url, requestOptions)
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
    else if(data=="true"){
      var url = 'https://localhost:7294/api/User/UpdateIsDarkmode';

        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: 'false'
        };

        fetch(url, requestOptions)
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

    location.reload();

    })
    .catch(error=>{
      console.log('Error', error);
    });
}
