import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import getAllExhibitionVenues from '@salesforce/apex/ProjectController.getAllExhibitionVenues';
import getAllExhibitions from '@salesforce/apex/ProjectController.getAllExhibitions';
import D3 from '@salesforce/resourceUrl/D3'

//* Does not Work yet /*
// Using for reference: http://sanjaykeynotes.blogspot.com/2020/12/salesforce-lwc-with-third-party-js-d3.html

export default class ExhibitionVenueTimeline extends LightningElement {
    @wire(getAllExhibitionVenues) exhibitionVenues
    @wire(getAllExhibitions) exhibitions
    // i might also want to add wires here for the earliest and latest venue, but i'll check in later, see how this deploys.


    svgWidth = 9000;
    svgHeight = 400;
    d3Initialized = false;

    renderedCallback() {
        if (this.d3Initialized) {
            return;
        }
        this.d3Initialized = true;

        Promise.all([
            loadScript(this, D3 + '/d3.main'),
        ])
            .then(() => {
                this.initializeD3();
            })
            .catch(error => {
                console.log(error)
                console.log("There is an error")
            });
    }

    FIT_TIME_DOMAIN_MODE = "fit";
    FIXED_TIME_DOMAIN_MODE = "fixed";

    format = "%e %b %y"; // this is where I change the format -- not in the other file, apparently. 
    

    initializeD3() {
        const svg = d3.select(this.template.querySelector('svg.d3'));
        const width = this.svgWidth;
        const height = this.svgHeight;

        let rectTransform = function(d) {
            return "translate(" + x(d.StartDate_Formula__c) + "," + y(d.Exhibition__r.Name) + ")"; 
            };
        
        let xAxis;
        let yAxis;

        let toolTip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)

        let formatDate = function(date) {
            return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
        }

        var initTimeDomain = function() {
            if (timeDomainMode === FIT_TIME_DOMAIN_MODE) {
                if (exhibitionVenues === undefined || exhibitionVenues.length < 1) {
                timeDomainStart = d3.time.day.offset(new Date(), -3);
                timeDomainEnd = d3.time.hour.offset(new Date(), +3);
                return;
                }
                exhibitionVenues.sort(function(a, b) {
                return a.EndDate_Formula__c - b.EndDate_Formula__c;
                });
                timeDomainEnd = exhibitionVenues[exhibitionVenues.length - 1].b.EndDate_Formula__c;
                exhibitionVenues.sort(function(a, b) {
                return a.StartDate_Formula__c - b.StartDate_Formula__c;
                });
                timeDomainStart = exhibitionVenues[0].StartDate_Formula__c;
            }
            };

        let initAxis = function() {
            x = d3.time.scale().domain([ timeDomainStart, timeDomainEnd ]).range([ 0, width ]).clamp(true);
            y = d3.scale.ordinal().domain(exhibitions).rangeRoundBands([ 0, height - margin.top - margin.bottom ], .1);
            xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(60).tickFormat(d3.time.format(tickFormat)).tickSubdivide(true) // this is where I can edit the number of x-axis ticks
                .tickSize(-height + margin.top + margin.bottom).tickPadding(8);
        
            yAxis = d3.svg.axis().scale(y).orient("left").tickSize(-width).tickPadding(8);
            };

        function gantt(exhibitionVenues) {

            initTimeDomain();
            initAxis();
            
            var svg = d3.select("body")
            .append("svg")
            .attr("class", "chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("class", "gantt-chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
            
            svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0, " + (height - margin.top - margin.bottom) + ")")
            .transition()
            .call(xAxis);
        }

        // Add "Today" vertical line
        let today = new Date();
        svg.append("line")
            .attr("x1", x(today))  //<<== change your code here
            .attr("y1", 0)
            .attr("x2", x(today))  //<<== and here
            .attr("y2", height - margin.top - margin.bottom)
            .style("stroke-width", 2)
            .style("stroke", "red")
            .style("fill", "none");
    
        svg.append("g").attr("class", "y axis y-axis").transition().call(yAxis);

        // Create rectangles??
        let rect = svg.selectAll(".chart")
        .data(exhibitonVenues, keyFunction).enter()
        .append("rect")
        .attr("rx", 2)
            .attr("ry", 2)
        // .attr("class", function(d){ 
        //     if(venueStatus[d.stage] == null){ return "bar";} ------ I don't think the logic on this will work yet... 
        //     return venueStatus[d.stage];
        //     }) 
        .attr("y", 12) // this is where to change the height of the bar vs. the label.
        .attr("transform", rectTransform)
        .attr("height", 20) // formerly ---> function(d) { return y.rangeBand(); }
        .attr("width", function(d) { 
            return (x(d.EndDate_Formula__c) - x(d.StartDate_Formula__c)); 
            })
            .on("mouseover", function(d){
                toolTip.transition()
                .duration(500)
                .style("opacity", .85)
                toolTip.html("<strong>" + d.Exhibition__r.Name + " at " + d.Name + "</strong></br>Stage: " + d.StageName + "</br>Start Date: " + formatDate(d.StartDate_Formula__c) + "</br>End Date: " + formatDate(d.EndDate_Formula__c))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
            })
            .on("mouseout", function(d){
                toolTip.transition()
                    .duration(300)
                    .delay(4000)
                    .style("opacity",0);
            })

            let labels = svg.selectAll(".chart").data(exhibitionVenues).enter()
            .append("text")
            .attr({
                class: "labels",
                transform: rectTransform,
                y: 25,
                x: 5, 
                "max-width": function(d){return d.EndDate_Formula__c - d.StartDate_Formula__c}
            })		
            .text(function(d){return d.Name + ": " + formatDate(d.StartDate_Formula__c) + " - " + formatDate(d.EndDate_Formula__c);})
    
    
         
         return gantt;


    }


};