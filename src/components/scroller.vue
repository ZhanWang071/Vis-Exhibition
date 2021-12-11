<template>
    <div class="scroller">

        <!-- scroll graphics: animation is triggered by both scrollin and click -->
        <div class="scroller-right sticky">

        </div>

        <!-- scroll text: description and recommendation  -->
        <div class="scroller-left">
        <div class="step" id ="step-0">step-a</div>
        <div class="step" id ="step-1">step-b</div>
        <div class="step" id ="step-2">step-c</div>
        </div>

    </div>
</template>

<script>
import "intersection-observer";
import scrollama from "scrollama";
import * as d3 from "d3";
import { toPath, circlePath, rectanglePath } from "@/assets/js/circle2rect.js";
import Stickyfill from "stickyfilljs";

export default {
    name: 'scroller',
    mounted() {
        const exampleCounter = 20;

        // ================import data===============================


        // ================circle part===============================
        const svg = d3.select(".scroller-right")
                    .append("svg")
                    .attr("width", "100%")
                    .attr("height", "525");

        

        const data = Array.from({length: exampleCounter}, (_, i) => {
                return [(i+1) * 25, i];
                });

        const n = 60;
        const bounding = d3.select("body").node().getBoundingClientRect();
        const width = bounding.width;
        const transitionDuration = 2000;

        svg.selectAll("path")
            .data(data)
            .enter()
            .append("path")
                .attr("id", d => {return "path_circle_"+d[1]})
                .attr("d", d => toPath(circlePath(0.95*width, d[0], 5, n)))
                .attr("fill", d => d3.interpolateRainbow(d[0] / 500))
                .attr("opacity", 0.8)
                .on("click", function() {
                    // jump to the corresponding text
                    const index = this.getAttributeNode("id").value.slice(12);
                    document.getElementById("step-"+index).scrollIntoView();
                });

        // ================scroller part==============================
        // use d3 for convience
        const scrolly = d3.select(".scroller");
        const text = scrolly.select(".scroller-left");
        const figure = scrolly.select(".scroller-right");
        const step = text.selectAll(".step");

        // initialize the scrollama
        const scroller = scrollama();

        // generic window resize listener event
        function handleResize() {
            // 1. update height of step elements
            var stepH = Math.floor(window.innerHeight * 0.75);
            step.style("height", stepH + "px");

            var figureHeight = window.innerHeight / 2;
            var figureMarginTop = (window.innerHeight - figureHeight) / 2;

            figure
                .style("height", figureHeight + "px")
                .style("top", figureMarginTop + "px");

            // 3. tell scrollama to update new element dimensions
            scroller.resize();
        }

        // scrollama event handlers
        function handleStepEnter(response) {
            console.log(response);
            // response = { element, direction, index }

            // add color to current step only
            step.classed("is-active", function(d, i) {
                return i === response.index;
                });

            // SIMPLIFY!!!!
            // keep there is only one rectangle
            d3.selectAll("path")                
                .transition()
                .duration(transitionDuration)
                .attr("id", d => {return "path_circle_"+d[1]})
                .attr("opacity", 0.8)
                .attr("d", d => toPath(circlePath(0.95*width, d[0], 5, n)))
                

            // morph circle to rectangle
            d3.select("#path_circle_"+response.index)
                .attr("id", "path_rect")
                .transition()
                .duration(transitionDuration)
                .attr("opacity", 0.5)
                .attr("d", toPath(rectanglePath(0.3*width, 25, 0.6*width, 25*(exampleCounter-1), n)))
        }

        // add sticky style
        function setupStickyfill() {
            d3.selectAll(".sticky").each(function() {
            Stickyfill.add(this);
            });
        }

        function init() {
            setupStickyfill();

            // 1. force a resize on load to ensure proper dimensions are sent to scrollama
            handleResize();

            // 2. setup the scroller passing options
            // 	    this will also initialize trigger observations
            // 3. bind scrollama event handlers (this can be chained like below)
            scroller
                .setup({
                    step: ".scroller .scroller-left .step",
                    offset: 0.7,
                    debug: true, // scroller debugger
                })
            .onStepEnter(handleStepEnter);

            // setup resize event
            window.addEventListener("resize", handleResize);
        }

        // kick things off
        init();
    
    }
}



</script>

<style lang="scss">

.scroller-right {
    top: 0;
    width: 100%;
    height: 525;
}

.scroller-left {
    padding: 0 1rem;
    max-width: 20rem;
    
}

.step {
    opacity: 0;
    padding: 1rem;
}

.step.is-active {
    opacity: 1;
}

.sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 0 !important;;
}

.sticky:before,
.sticky:after {
    content: '';
    display: table;
}

</style>