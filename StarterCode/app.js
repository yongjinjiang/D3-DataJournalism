// @TODO: YOUR CODE HERE!
// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
d3.select("#scatter").append('p').text('Eeeeeeeeee')

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  // .append('rect')
  // .attr("width", 300)
  // .attr("height", 100)
  // .style("fill","rgb(0,0,255)") 
 
  
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
// Step 3:
// Import data from the donuts.csv file
// =================================
d3.csv("./data.csv").then(function( CensusData) {
    // if (error) throw error;
  
    // Step 4: Parse the data
    // Format the data and convert to numerical and date values
    // =================================
    // Create a function to parse date and time
    // var parseTime = d3.timeParse("%d-%b");
  
    // Format the data
    console.log('here1')
    console.log(CensusData[0])

    CensusData.forEach(function(data) {
    //   data.date = parseTime(data.date);
      data.poverty = +data.poverty;
      data.age = +data.age;
      data.income=+data.income;
      data.healthcare=+data.healthcare;
      data.obesity=+data.obesity;
      data.smokes=+data.smokes;
      console.log('here2')
      console.log(typeof  data.healthcare) 
      console.log(typeof  data.poverty)
    });
    console.log('here3')
    console.log(CensusData[1])
  
  // Configure a linear scale with a range between the  0 and chartWidth
  var xLinearScale = d3.scaleLinear()
       .domain(d3.extent(CensusData, data => data.poverty))
        .range([0, chartWidth]);
  console.log('here'+xLinearScale(1))
// Configure a linear scale with a range between the chartHeight and 0
  var yLinearScale = d3.scaleLinear()
        .domain(d3.extent(CensusData, data => data.healthcare))
        .range([chartHeight, 0]);
  console.log('here'+yLinearScale(1))

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var xAxis = d3.axisBottom(xLinearScale);
  var yAxis = d3.axisLeft(yLinearScale).tickValues([5, 8, 13, 21]);
     

   // set x to the bottom of the chart
   chartGroup.append("g")
   .attr("transform", `translate(0, ${chartHeight})`)
   .call(xAxis);

   // set y to the y axis
    chartGroup.append("g")
    .call(yAxis);
   
//     // append circles to data points
// var pizzasEatenByMonth = [15, 5, 25, 18, 12, 22, 0, 4, 15, 10, 21, 2];



var gdots =  chartGroup.selectAll("g.dot")
            .data(CensusData)
            .enter().append('g');

gdots.append("circle")
            .attr("class", "dot")
// var circlesGroup = chartGroup.selectAll("circle")
// .data(CensusData)
// .enter()
// .append("circle")
.attr("r", "15")
.attr("cx",data=>xLinearScale(data.poverty))
.attr("cy",data=>yLinearScale(data.healthcare))
.attr("fill", "red");

gdots.append("text").text(function(d){
  return d.abbr;
})
.attr("x",data=>xLinearScale(data.poverty))
.attr("y",data=>yLinearScale(data.healthcare))
.attr("text-anchor", "middle")
.attr("font-size","60%")




chartGroup.append("text")
    .attr("class", "x label")
    .attr("x", chartWidth/2 +margin.left)
    .attr("y", chartHeight+margin.top+20)

   
    .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
    // .attr("transform", "translate("+ (chartWidth/2 +margin.left) +","+(chartHeight+margin.top+20)+")")  // centre below axis
    .text("In poverty(%)");

    // .attr("dy", ".75em")
    

    chartGroup.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("x", -chartHeight/2+margin.top)
    .attr("y", -margin.left/2-10)
    .attr("dy", "0.375em")
    .attr("transform", "rotate(-90)")
    .text("lacks Healthcare (%)");

// cx="50" cy="50" r="40" stroke="black" stroke-width="1" fill="red" 
})


