
//placeholder sample ID for testing
var sampleTest = "940"

// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("samples.json").then((navelData) => {

    // Create an array of sample ids
    var labels = Object.values(navelData.names);
    var sampleSelect = d3.select("#selDataset");

    // On change to the DOM, call getData()
    // d3.selectAll("#selDataset").on("change", getData);

    //parse out relevant data sets
    var samples = navelData.samples;
    var resultArraySample = samples.filter(sample => sample.id == sampleTest);
    var resultSample = resultArraySample[0];   
    var otu_ids = resultSample.otu_ids;
    var otu_labels = resultSample.otu_labels;
    var sample_values = resultSample.sample_values;

    // var initResultArraySample = samples.filter(sample => sample.id == "940");
    // var initresultSample = initResultArraySample[0];   
    // var initotu_ids = initresultSample.otu_ids;
    // var initotu_labels = initresultSample.otu_labels;
    // var initsample_values = initresultSample.sample_values;



    //sample metadata parsing
    var metadata = navelData.metadata;
    var resultArrayMeta = metadata.filter(sample => sample.id == sampleTest);
    var resultMeta = resultArrayMeta[0];
    var demoInfo = d3.select("#sample-metadata");
    demoInfo.html("");
    //push metadata to Demo Info box
    Object.entries(resultMeta).forEach(([key, value]) => {
        demoInfo.append("h6").text(`${key}: ${value}`);
           });
        
    
    //var resultArray = sampleMetadata.filter(sampleObj => sampleObj.id == sample);

    //slice out sample data for bar chart
    var sample_values_slice = sample_values.slice(0, 9).reverse();
    var otu_ids_slice = otu_ids.slice(0, 9).reverse();
    var otu_labels_slice = otu_labels.slice(0, 9).reverse();

    // console.log(otu_ids_slice);

    //plot bar chart
    var trace1 = {
        x: sample_values_slice,
        y: `OTU ${otu_ids_slice}`,
        text: otu_labels_slice,
        type: "bar",
        orientation: "h"
      };
    
      var barChartData = [trace1];

      var barChartlayout = {
        margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 100
        }
      };
    
      // Render the plot to the div tag with id "bar"
      Plotly.newPlot("bar", barChartData, barChartlayout);

    //plot bubble chart
    var trace2 = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
          size: sample_values,
          color: otu_ids,
          text: otu_labels 
        }
      };
      
      var bubChartData = [trace2];

      var bubChartlayout = {
        
        margin: {
          l: 50,
          r: 50,
          t: 50,
          b: 50
        }
      };
    
      // Render the plot to the div tag with id "bar"
      Plotly.newPlot("bubble", bubChartData, bubChartlayout);
});
 
