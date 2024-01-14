/*
  Author: Sarah Hagenhofer
  Lastly edited: 14.01.2023
  Comment: JS file for index.html
*/

// variables for the status of each data-section
var statusRate = 0;
var statusHash = 0;
var statusniederschlag = 0;


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

    let divclass = document.getElementById('rate');
    divclass.querySelector("h2").innerHTML="hhh %";
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

    let divclass = document.getElementById('hash');
    divclass.querySelector("h2").innerHTML="hhh TH/s";
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
    divclass.innerHTML = '<table id="showweather"><thead><th>One</th><th>Two</th><th>Three</th></thead><tbody><tr><td>Yes</td><td>No</td><td>Maybe</td></tr></tbody></table>';

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
    divclass.innerHTML = '<h2 id="textNiedereschlag">hhh %</h2><div id="wetterbericht"" style="position: relative; height:0vh; width:0vw; margin: 0px;" onclick="switchNiederschlag()"></div>';
    
  }

}
