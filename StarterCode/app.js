// @TODO: YOUR CODE HERE!
// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 80
};

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================


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

// Initial Params
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";


// function used for updating x-scale var upon click on axis label
function xScale(CensusData, chosenAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(CensusData, d => d[chosenAxis]),
      d3.max(CensusData, d => d[chosenAxis])
    ])
    .range([0, chartWidth]);
  return xLinearScale;
}

function yScale(CensusData, chosenAxis) {
  // create scales
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(CensusData, d => d[chosenAxis]) ,
      d3.max(CensusData, d => d[chosenAxis])
    ])
    .range([chartHeight,0]);

  return yLinearScale;

}


// function used for updating xAxis var upon click on axis label
function renderAxes_x(newScale, xAxis) {
  var bottomAxis = d3.axisBottom(newScale);

  xAxis.transition()
    .duration(100)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating yAxis var upon click on axis label
function renderAxes_y(newScale, yAxis) {
  var leftAxis = d3.axisLeft(newScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}


// function used for updating circles group with a transition to
// new circles
function renderCircles_x(circlesGroup, newScale, chosenAxis) {
  circlesGroup.selectAll("circle").transition()
    .duration(1000)
    .attr("cx", d => newScale(d[chosenAxis]));
 circlesGroup.selectAll("text").transition()
    .duration(1000)
    .attr("x", d => newScale(d[chosenAxis]));
    
    
  return circlesGroup;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles_y(circlesGroup, newScale, chosenAxis) {
  circlesGroup.selectAll("circle").transition()
    .duration(1000)
    .attr("cy", d => newScale(d[chosenAxis]));
 circlesGroup.selectAll("text").transition()
    .duration(1000)
    .attr("y", d => newScale(d[chosenAxis]));
    
    
  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis,chosenYAxis, circlesGroup) {

  if (chosenXAxis === "poverty") {
    var label_x = "poverty:";
  }
  else if(chosenXAxis === "age"){
    var label_x = "age:";
  }
  else{
    var label_x = "income:";
  };
  
  if(chosenYAxis === "healthcare"){
    var label_y = "healthcare:";
  }
  else if(chosenYAxis === "obesity"){
    var label_y = "obesity:";
  }
  else{var label_y="smokes"};



  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([0, 0])
    .html(function(d) {return `<center>${d.state}:<br>${label_x} ${d[chosenXAxis]} <br> ${label_y} ${d[chosenYAxis]}</center>`});

//{if(xOy==='x'){
//      return 1};
//(`${label} ${d[chosenXAxis]}`)}
//      else {return (`${label} ${d[chosenYAxis]}`)};
//    })

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data,this);
  })
  

    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data,this);
    });

  return circlesGroup;
}


console.log('here000')

d3.csv("./data.csv").then(function(CensusData) {
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
      // console.log('here2')
      // console.log(typeof  data.healthcare) 
      // console.log(typeof  data.poverty)
    });
    console.log('here3')
    console.log(CensusData[1])
  
//   // Configure a linear scale with a range between the  0 and chartWidth
//   var xLinearScale = d3.scaleLinear()
//        .domain(d3.extent(CensusData, data => data.poverty))
//         .range([0, chartWidth]);
//   console.log('here'+xLinearScale(1))
// // Configure a linear scale with a range between the chartHeight and 0
//   var yLinearScale = d3.scaleLinear()
//         .domain(d3.extent(CensusData, data => data.healthcare))
//         .range([chartHeight, 0]);
//   console.log('here'+yLinearScale(1))

var xLinearScale = xScale(CensusData, chosenXAxis);
var yLinearScale = yScale(CensusData, chosenYAxis);

console.log('here4')

  // // Create two new functions passing the scales in as arguments
  // // These will be used to create the chart's axes
  // var xAxis = d3.axisBottom(xLinearScale);
  // var yAxis = d3.axisLeft(yLinearScale).tickValues([5, 8, 13, 21]);
     
 // Create initial axis functions
 var bottomAxis = d3.axisBottom(xLinearScale);
 var leftAxis   = d3.axisLeft(yLinearScale);



  //  // set x to the bottom of the chart
  //  chartGroup.append("g")
  //  .attr("transform", `translate(0, ${chartHeight})`)
  //  .call(xAxis);

  //  // set y to the y axis
  //   chartGroup.append("g")
  //   .call(yAxis);

   // append x axis
   var xAxis = chartGroup.append("g")
   .classed("x-axis", true)
   .attr("transform", `translate(0, ${chartHeight+margin.top-20})`)
   .call(bottomAxis);

 // append y axis
  var  yAxis= chartGroup.append("g")
   .classed("y-axis", true)
   .call(leftAxis);

   console.log('here5')
//     // append circles to data points
// var pizzasEatenByMonth = [15, 5, 25, 18, 12, 22, 0, 4, 15, 10, 21, 2];



var circlesGroup=  chartGroup.selectAll("g.dot")
            .data(CensusData)
            .enter().append('g');

circlesGroup.append("circle")
.attr("class", "dot")
// var circlesGroup = chartGroup.selectAll("circle")
// .data(CensusData)
// .enter()
// .append("circle")
.attr("r", "15")
.attr("cx",data=>xLinearScale(data.poverty))
.attr("cy",data=>yLinearScale(data.healthcare))
.attr("fill", "red");

circlesGroup.append("text").text(function(d){
  return d.abbr;
})
.attr("x",data=>xLinearScale(data.poverty))
.attr("y",data=>yLinearScale(data.healthcare))
.attr("text-anchor", "middle")
.attr("font-size","60%")


// Now create labels under xAxis: 
// Create group template for  3 x- axis labels
var labelsGroup_x = chartGroup.append("g")
.attr("transform", `translate(${chartWidth/2 +margin.left}, ${chartHeight+margin.top})`);

// Create group template for  3 y- axis labels
var labelsGroup_y = chartGroup.append("g")
//.attr("transform", `translate(${chartWidth/2 +margin.left}, ${chartHeight+margin.top-20})`);
.attr("x", -chartHeight/2+margin.top)
     .attr("y", -margin.left/2-10)
     .attr("dy", "0.375em")
     .attr("transform", "rotate(-90)")
     
//labels of x axis:
var povertyLabel = labelsGroup_x.append("text")
.attr("x", 0)
.attr("y", 20)
.attr("value", "poverty") // value to grab for event listener
.classed("active", true)
.text("In Poverty(%)");

var ageLabel = labelsGroup_x.append("text")
.attr("x", 0)
.attr("y", 35)
.attr("value", "age") // value to grab for event listener
.classed("inactive", true)
.text("Age(Median)");


var incomeLabel = labelsGroup_x.append("text")
.attr("x", 0)
.attr("y", 50)
.attr("value", "income") // value to grab for event listener
.classed("inactive", true)
.text("Household Income(Median)");

 
//labels of y axis:
var healthcareLabel = labelsGroup_y.append("text")
.attr("x", -chartHeight/2+margin.top)
.attr("y", -20)
.attr("value", "healthcare") // value to grab for event listener
.classed("active", true)
 .attr("text-anchor", "middle")
.text("Lacks Healthcare(%)");

var obesityLabel = labelsGroup_y.append("text")
.attr("x", -chartHeight/2+margin.top)
.attr("y", -35)
.attr("value", "obesity") // value to grab for event listener
.classed("active", false)
 .attr("text-anchor", "middle")
.text("Obesity(%)");

var smokesLabel = labelsGroup_y.append("text")
.attr("x", -chartHeight/2+margin.top)
.attr("y", -50)
.attr("value", "smokes") // value to grab for event listener
.classed("active", false)
 .attr("text-anchor", "middle")
.text("Smokes(%)");


 // updateToolTip function above csv import
 var circlesGroup = updateToolTip(chosenXAxis,chosenYAxis, circlesGroup);

 // x axis labels event listener
 labelsGroup_x.selectAll("text")
 .on("click", function() {
   // get value of selection
   var value = d3.select(this).attr("value");
   if (value !== chosenXAxis) {

     // replaces chosenXAxis with value
     chosenXAxis = value;}

     // console.log(chosenXAxis)

     // functions here found above csv import
     // updates x scale for new data
     
//     if (["poverty","age","income"].includes("chosenXAxis")){
     xLinearScale = xScale(CensusData, chosenXAxis);
     // updates x axis with transition
     xAxis = renderAxes_x(xLinearScale, xAxis);
     // updates circles with new x values
     circlesGroup = renderCircles_x(circlesGroup, xLinearScale, chosenXAxis);
//     }
//     else{
//      yLinearScale = yScale(CensusData, chosenXAxis);
//      // updates x axis with transition
//      yAxis = renderAxes_y(yLinearScale, yAxis);
//      // updates circles with new x values
//      circlesGroup = renderCircles_y(circlesGroup, yLinearScale, chosenXAxis);
//     }

     // updates tooltips with new info
     circlesGroup =  updateToolTip(chosenXAxis,chosenYAxis, circlesGroup);

     // changes classes to change bold text
     if (chosenXAxis === "poverty") {
      povertyLabel
         .classed("active", true)
         .classed("inactive", false);
      ageLabel
         .classed("active", false)
         .classed("inactive", true);
      incomeLabel
         .classed("active", false)
         .classed("inactive", true);
     }
     else if(chosenXAxis === "income") {
      povertyLabel
          .classed("active", false)
          .classed("inactive", true);
      ageLabel
          .classed("active", false)
          .classed("inactive", true);
      incomeLabel
          .classed("active", true)
          .classed("inactive", false);
     }
     else{
      povertyLabel
          .classed("active", false)
          .classed("inactive", true);
      ageLabel
          .classed("active", true)
          .classed("inactive", false);
      incomeLabel
          .classed("active", false)
          .classed("inactive", true);

     }
   })
   
   
 labelsGroup_y.selectAll("text")
 .on("click", function() {
   // get value of selection
   var value = d3.select(this).attr("value");
   if (value !== chosenYAxis) {

     // replaces chosenXAxis with value
     chosenYAxis = value;}

     // console.log(chosenXAxis)

     // functions here found above csv import
     // updates x scale for new data
     
//     if (["poverty","age","income"].includes("chosenXAxis")){
     yLinearScale = yScale(CensusData, chosenYAxis);
     // updates x axis with transition
     yAxis = renderAxes_y(yLinearScale, yAxis);
     // updates circles with new x values
     circlesGroup = renderCircles_y(circlesGroup, yLinearScale, chosenYAxis);
//     }
//     else{
//      yLinearScale = yScale(CensusData, chosenXAxis);
//      // updates x axis with transition
//      yAxis = renderAxes_y(yLinearScale, yAxis);
//      // updates circles with new x values
//      circlesGroup = renderCircles_y(circlesGroup, yLinearScale, chosenXAxis);
//     }

     // updates tooltips with new info
     circlesGroup =  updateToolTip(chosenXAxis,chosenYAxis, circlesGroup);

    

     // changes classes to change bold text
     if (chosenYAxis === "healthcare") {
      healthcareLabel
         .classed("active", true)
         .classed("inactive", false);
      obesityLabel
         .classed("active", false)
         .classed("inactive", true);
      smokesLabel
         .classed("active", false)
         .classed("inactive", true);
     }
     else if(chosenYAxis === "smokes") {
      healthcareLabel
          .classed("active", false)
          .classed("inactive", true);
      obesityLabel
          .classed("active", false)
          .classed("inactive", true);
      smokesLabel
          .classed("active", true)
          .classed("inactive", false);
     }
     else{
      healthcareLabel
          .classed("active", false)
          .classed("inactive", true);
      obesityLabel
          .classed("active", true)
          .classed("inactive", false);
      smokesLabel
          .classed("active", false)
          .classed("inactive", true);

     }
   }
)});




// chartGroup.append("text")
//     .attr("class", "x label")
//     .attr("x", chartWidth/2 +margin.left)
//     .attr("y", chartHeight+margin.top+20)

   
//     .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
//     // .attr("transform", "translate("+ (chartWidth/2 +margin.left) +","+(chartHeight+margin.top+20)+")")  // centre below axis
//     .text("In poverty(%)");

//     // .attr("dy", ".75em")
    

//     chartGroup.append("text")
//     .attr("class", "y label")
//     .attr("text-anchor", "middle")
//     .attr("x", -chartHeight/2+margin.top)
//     .attr("y", -margin.left/2-10)
//     .attr("dy", "0.375em")
//     .attr("transform", "rotate(-90)")
//     .text("lacks Healthcare (%)");

// cx="50" cy="50" r="40" stroke="black" stroke-width="1" fill="red" 



