<template>
    <div class="scroller">
        
        <!-- scroll graphics: animation is triggered by both scrollin and click -->
        <div class="scroller-right sticky">
        </div>
        <!-- scroll text: description and recommendation  -->
        <div class="scroller-left"></div>
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
    async mounted() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const exampleCounter = 8;
        
        // ================laod examples=================================
        var visweb;
        await d3.json('./dataset/visweb.json').then(function(data){
            visweb = data;
            // {title, image, url, des}
        });

        // ================text description===============================
        var rgb;

        const step_text = d3.select(".scroller-left")
            .selectAll("div")
            .data(visweb)
            .enter()
            .append("div")
            .attr("class", "step")
            .attr("id", (d,i) => "step-"+i)
            .append("div")
            .attr("class", "step-background")
            .style("background-color", (d,i) => {
                    rgb = d3.color(d3.interpolateRainbow((i+1) * 0.06 * height / (25*exampleCounter)));
                    rgb.opacity = 0.7;
                    console.log(rgb);
                    return rgb;
            })
        
        // add picture
        step_text.append("img")
                    .attr("class", "image")
                    .attr("src", d => {
                        if (d.image) {
                            return d.image;
                        }
                    })
            
        step_text.append("p")
                    .text(function(d){
                        return d.des;
                    })
        
        // add link
        step_text.append("h4")
                    .attr("class", "view-link")
                    .html(d=>"<a target='_blank' href="+d.url+"> View → </a>")

        // ================circle part===============================
        const svg = d3.select(".scroller-right")
                    .append("svg")
                    .attr("width", "100%")
                    .attr("height", "100%");

        const data = Array.from({length: exampleCounter}, (_, i) => {
                // {rx, ry, r, index}
                return {
                    "rx": (0.95-0.02*Math.random()) * width,
                    "ry": (i+1) * 0.06 * height, 
                    "r": 0.025 * (1 + Math.random()) * height, 
                    "index": i
                };
                });

        const n = 60;
        
        svg.selectAll("path")
            .data(data)
            .enter()
            .append("path")
                .attr("id", d => {return "path_circle_"+ d.index})
                .attr("d", d => toPath(circlePath(d.rx, d.ry, d.r, n)))
                .attr("fill", d => d3.interpolateRainbow(d.ry / (25*exampleCounter)))
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

            var stepH = Math.floor(height * 0.9);
            var stepW = 0.5 * width;
            var stepLeft = (0.7 * width - stepW) / 2
            var stepTop = (height - stepH) / 2
            step
                .style("height", stepH + "px")
                .style("width", stepW + "px")
                .style("top", stepTop + "px")
                .style("margin-left", stepLeft + "px");

            figure
                .style("height", height + "px")
                .style("top", "0px");

            // 3. tell scrollama to update new element dimensions
            scroller.resize();
        }

        // scrollama event handlers
        function handleStepEnter(response) {
            // response = { element, direction, index }
            const transitionDuration = 2000;

            // add color to current step only
            step.classed("is-active", function(d, i) {
                return i === response.index;
                });

            // keep there is only one rectangle
            d3.selectAll("path")                
                .transition()
                .duration(transitionDuration)
                .attr("id", d => {return "path_circle_"+d.index})
                .attr("opacity", 0.8)
                .attr("d", d => toPath(circlePath(d.rx, d.ry, d.r, n)));
                

            // morph circle to rectangle
            d3.select("#path_circle_"+response.index)
                .attr("id", "path_rect")
                .transition()
                .duration(transitionDuration)
                .attr("stroke-width", 2)
                .attr("stroke", d => d3.interpolateRainbow(d.ry / (25*exampleCounter)))
                .attr("d", toPath(rectanglePath(0.9*width, 0, 0.005*width, document.body.clientHeight, n)))


        }

        // add sticky style
        function setupStickyfill() {
            d3.selectAll(".sticky").each(function() {
            Stickyfill.add(this);
            });
        }

        function init() {
            // set the sticky position style
            setupStickyfill();

            // 1. force a resize on load to ensure proper dimensions are sent to scrollama
            handleResize();

            // 2. setup the scroller passing options
            // 3. bind scrollama event handlers
            scroller
                .setup({
                    step: ".scroller .scroller-left .step",
                    offset: 0.8,
                    debug: false, // scroller debugger
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
    top: inherit;
    width: 100%;
    height: 100%;
}

.scroller-left {
    width: 70%;
    margin-left: 10%;
    text-align: -webkit-auto;
    position: relative;
}

.step {
    opacity: 0.25;
    padding: 15% 0;
}

.step.is-active {
    opacity: 1;
}

.step-background {
    padding: 1.8rem 10%;
    border-radius: 0.8em;
}

.sticky {
    position: -webkit-sticky;
    position: sticky;
    top: inherit;
}

.sticky:before,
.sticky:after {
    content: '';
    display: table;
}

.image {
    margin-top: 0.8rem;
    width: 100%;
    height: 80%;
}

h4 {
    margin-bottom: 0;
    margin-top: 1rem;
    font-size: 1.6rem;
    font-family: "Dancing Script";
}

.view-link a{
    text-decoration: none;
}

</style>