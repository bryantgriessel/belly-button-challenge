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
  })
}
function optionChanged(sample) {
  barchart(sample)
  Bubblechart(sample)  
  demoinfo(sample)
}


//d3.selectAll("#selDataset").on("change", updatePlotly);
function barchart(sample){
  d3.json(url).then(function(data) {
    let datafilter=data.samples.filter(filter=> filter.id==sample)

    let slicedData = datafilter[0].sample_values.slice(0, 10);
    slicedData.reverse();
    console.log(slicedData)

    let dataid=datafilter[0].otu_ids
    let slicedids = dataid.slice(0, 10);
    slicedids.reverse();
    console.log(slicedids)

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
      console.log(trace1)

      Plotly.newPlot("bar", [trace1], layout);
    })

  }
function Bubblechart(sample){
  d3.json(url).then(function(data) {
    let datafilter=data.samples.filter(filter=> filter.id==sample)

    let DataX = datafilter[0].otu_ids.reverse();
    console.log(DataX)
    let DataY = datafilter[0].sample_values.reverse();
    let dataid=datafilter[0].otu_ids

    let slicedids = dataid.slice(0, 10);
    slicedids.reverse();
    console.log(slicedids)

    let slicedlabels = datafilter[0].otu_labels.slice(0, 10);
    slicedlabels.reverse();
  var trace1 = {

    x: DataX,
    y: DataY,
    text: datafilter[0].otu_labels,
    mode: 'markers',
    marker: {

      color: datafilter[0].otu_ids,
      size: datafilter[0].sample_values,
      colorscale:'Portland'
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
function Bubblechart(sample){
  d3.json(url).then(function(data) {
    let datafilter=data.samples.filter(filter=> filter.id==sample)

    let DataX = datafilter[0].otu_ids;
    let DataY = datafilter[0].sample_values;
    let dataid=datafilter[0].otu_ids


    let datalabels = datafilter[0].otu_labels;
    
  var trace1 = {

    x: DataX,
    y: DataY,
    text: datalabels,
    mode: 'markers',
    marker: {

      color: dataid,
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
function demoinfo(sample){
  d3.json(url).then(function(data) {
  let datafilter=data.metadata.filter(filter=> filter.id==sample)
  let demoselect = d3.select("#sample-metadata");
  console.log(datafilter[0].ethnicity)
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

//function updatePlotly() {
//    let dataset = dropdownMenu.property("value");
//    if(dataset=='dataset1'){
//        let datap =[trace1]
        
//    }




init();