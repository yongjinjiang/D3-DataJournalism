// @TODO: YOUR CODE HERE!
// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
// Step 3:
// Import data from the donuts.csv file
// =================================
d3.csv("../data/data.csv", function(error, CensusData) {
    if (error) throw error;
  
    // Step 4: Parse the data
    // Format the data and convert to numerical and date values
    // =================================
    // Create a function to parse date and time
    // var parseTime = d3.timeParse("%d-%b");
  
    // Format the data
    CensusData.forEach(function(data) {
    //   data.date = parseTime(data.date);
      data.poverty = +data.poverty;
      data.age = +data.age;
      data.income=+data.income;
      data.healthcare=+data.healthcare;
      data.obesity=+data.obesity;
      data.smokes=+data.smokes;
    });
    console.log(CensusData[1])
})