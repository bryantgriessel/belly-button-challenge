//Use D3 library to read in json
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
d3.json(url).then(function(data) {
    console.log(data);
  })


function init(){
  d3.json(url).then(function (data) {
    let dropdownMenu = d3.select("#selDataset");
    for(let ids in data.names){
        dropdownMenu.append("option").text(data.names[ids]).property("value",data.names[ids]);   
    }
    barchart(940)
    Bubblechart(940)  
    demoinfo(940)
  })
}
//When the HTML dropdown element is changed, the index.html file calls the Optionchanged function

function optionChanged(sample) {
  console.log(sample)
  barchart(sample)
  Bubblechart(sample)  
  demoinfo(sample)
}


//barchart Function takes in sample as an id
//This function filters by the sample id and finds the top 10 otu_id's, sample values, and otu labels by using slice
//These values are used to plot a bar chart.
function barchart(sample){
  d3.json(url).then(function(data) {
    let datafilter=data.samples.filter(filter=> filter.id==sample)

    let slicedData = datafilter[0].sample_values.slice(0, 10);
    slicedData.reverse();
    //console.log(slicedData)

    let dataid=datafilter[0].otu_ids
    let slicedids = dataid.slice(0, 10);
    slicedids.reverse();
    //console.log(slicedids)

    let slicedlabels = datafilter[0].otu_labels.slice(0, 10);
    slicedlabels.reverse();

    let trace1 = {  
        x: slicedData,
        y: slicedids.map(object=>"otu_id "+ object),
        text: slicedlabels,
        type: "bar",
        orientation: "h"
      };
      let layout = {
        title: "Top 10 OTUs ",

      };
     // console.log(trace1)

      Plotly.newPlot("bar", [trace1], layout);
    })
  }
  
//Bubblechart Function takes in sample as an id
//This function filters by the sample id and finds the otu_id's, sample values, and otu labels
//These values are used to plot a bubble chart.
function Bubblechart(sample){
  d3.json(url).then(function(data) {
    let datafilter=data.samples.filter(filter=> filter.id==sample)

    let DataX = datafilter[0].otu_ids;
    let DataY = datafilter[0].sample_values;


    let datalabels = datafilter[0].otu_labels;
    
  var trace1 = {

    x: DataX,
    y: DataY,
    text: datalabels,
    mode: 'markers',
    marker: {

      color: DataX,
      size: DataY,
      colorscale:'Picnic'
    }
  };
  
  var data = [trace1];
  var layout = {
    title: 'OTU ID',
    showlegend: false,
    height: 600,
    width: 1200
  };
  Plotly.newPlot('bubble', data, layout);
})
  
}
//This function populatess the Domgraphic info box with information.

function demoinfo(sample){
  d3.json(url).then(function(data) {
  let datafilter=data.metadata.filter(filter=> filter.id==sample)
  let demoselect = d3.select("#sample-metadata");
 // console.log(datafilter[0].ethnicity)
  demoselect.html(
    `id: ${datafilter[0].id}<br>
     Ethnicity: ${datafilter[0].ethnicity}<br>
     Gender: ${datafilter[0].gender}<br>
     Age: ${datafilter[0].age}<br>
     Location: ${datafilter[0].location}<br>
     bbtype: ${datafilter[0].bbtype}<br>
     wfreq: ${datafilter[0].wfreq}

     `
  )})

}

init();