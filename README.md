## About
   - This is the personal project for unit 16(D3) of [Data Visualization and Analytics](https://bootcamp.umn.edu/data/landing%20full/) (graded A+).
   - A data tool is built for visualize a series of feature stories about the health risks facing particular demographics( details about the project can be found [here](#the-original-text-of-the-homework-assignment). 
   - The app website is at: (https://yongjinjiang.github.io/D3-DataJournalism/).
   - A snapshot of the app:
<img src="./Images/d3.png " width="600" height="400">
 
   - The dataset used is obtained from the [U.S. Census Bureau](https://www.census.gov/) and the [Behavioral Risk Factor Surveillance System](https://www.cdc.gov/brfss/index.html) and was provided in the /data folder by the instructor.
   - Main tools used in this project: [D3.js](https://d3js.org/),[d3-tip](https://github.com/Caged/d3-tip), [Bootstrap](https://getbootstrap.com/),[Popper.js](https://popper.js.org/),[jQuery.js](https://jquery.com/),etc.

## Usage of the app
   - Note both the x axis and y axis are selectable and a tooltip will appear on hovering each data point. 
   - To play it locally, clone the repo, and run "python -m http.server" and open the url http://0.0.0.0:8000/ in a browser.
   
## Some observations
   - Obviously, the higer income, the higher HealthCare, the lower obesity and lower smokers
   - Roughly, the higher poverty rate, the higher smokes. An obvious exception to this rule is UT state.
   - Roughly, the higher median age, the higher rate of Health Care and lower obesity rate.
   - ...

## **_The original text of the homework assignment:_**  
# Unit 16 | Assignment - Data Journalism and D3

![Newsroom](https://media.giphy.com/media/v2xIous7mnEYg/giphy.gif)

## Background

Welcome to the newsroom! You've just accepted a data visualization position for a major metro paper. You're tasked with analyzing the current trends shaping people's lives, as well as creating charts, graphs, and interactive elements to help readers understand your findings.

The editor wants to run a series of feature stories about the health risks facing particular demographics. She's counting on you to sniff out the first story idea by sifting through the latest information from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System.

## Your Task

### Level 1: D3 Dabbler

![4-scatter](Images/4-scatter.jpg)

You need to create a scatter plot between two of the data variables such as `Healthcare vs. Poverty` or `Smokers vs. Age`.

Using the D3 techniques we taught you in class, create a scatter plot that represents each state with circle elements. You'll code this graphic in the `app.js` file of your homework directory—make sure you pull in the data from `data.csv` by using the `d3.csv` function. Your scatter plot should ultimately appear like the image at the top of this section.

* Include state abbreviations in the circles.

* Create and situate your axes and labels to the left and bottom of the chart.

* Note: You'll need to use `python -m http-server` to run the visualization. This will host the page at `localhost:8000` in your web browser.

- - -

### Level 2: Impress the Boss (Optional Challenge Assignment)

Why make a static graphic when D3 lets you interact with your data?

![7-animated-scatter](Images/7-animated-scatter.gif)

#### 1. More Data, More Dynamics

You're going to include more demographics and more risk factors. Place additional labels in your scatter plot and give them click events so that your users can decide which data to display. Animate the transitions for your circles' locations as well as the range of your axes. Do this for two risk factors for each axis. Or, for an extreme challenge, create three for each axis.

* Hint: Try binding all of the .csv data to your circles. This will let you easily determine their x or y values when you click the labels.

#### 2. Incorporate d3-tip

While the ticks on the axes allow us to infer approximate values for each circle, it's impossible to determine the true value without adding another layer of data. Enter tooltips: developers can implement these in their D3 graphics to reveal a specific element's data when the user hovers their cursor over the element. Add tooltips to your circles and display each tooltip with the data that the user has selected. Use the `d3-tip.js` plugin developed by [Justin Palmer](https://github.com/Caged)—we've already included this plugin in your assignment directory.

![8-tooltip](Images/8-tooltip.gif)

* Check out [David Gotz's example](https://bl.ocks.org/davegotz/bd54b56723c154d25eedde6504d30ad7) to see how you should implement tooltips with d3-tip.

- - -

### Assessment

Your final product will be assessed on the following metrics:

* Completion of all steps in chosen level

* Coherency of scatter plot (labels, ticks)

* Visual attraction

* Professionalism

**Good luck!**

## Copyright

Data Boot Camp © 2018. All Rights Reserved.
