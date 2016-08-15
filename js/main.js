$(document).ready(function(){$('.masthead-nav li').click(function(e) {
    $('.masthead-nav li.active').removeClass('active');
    var $this = $(this);
    if (!$this.hasClass('active')) {
        $this.addClass('active');
    }
    e.preventDefault();
});});

$(document).ready(function(){
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});
});

		var margin = {top: 0, right: 0, bottom: 0, left: 0}, //{top: 20, right: 20, bottom: 30, left: 40},
		    width = window.innerWidth - margin.left - margin.right,
		    height = window.innerHeight - margin.top - margin.bottom;

		function draw() {
			function randomize() {
				var randomX = d3.random.normal(width / 2, width / 10),
				    randomY = d3.random.normal(height / 2, height / 10),
				    points = d3.range(6000).map(function() { return [randomX(), randomY()]; });
				return {
					randomX: randomX(),
		    		randomY: randomY(),
		    		points: points};
				};

		var color = d3.scale.linear()
		    .domain([0, 15])
		    .range(["black", "skyblue", "white"])
		    .interpolate(d3.interpolateLab);

		var hexbin = d3.hexbin()
		    .size([width, height])
		    .radius(width/100);

		var x = d3.scale.identity()
		    .domain([0, width]);

		var y = d3.scale.linear()
		    .domain([0, height])
		    .range([height, 0]);

		var o = d3.scale.linear()
			.domain([0, 50])
			.range([0.1, 0.6]);
		
		var svg = d3.select("body").append("div").attr("class", "site-wrapper").append("div").attr("class", "site-wrapper-inner").append("svg").attr("id", "svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		svg.append("clipPath")
		    .attr("id", "clip")
		  .append("rect")
		    .attr("class", "mesh")
		    .attr("width", width)
		    .attr("height", height);

		svg.append("g")
		    .attr("clip-path", "url(#clip)")
		  .selectAll(".hexagon")
		    .data(hexbin(randomize().points))
		  .enter().append("path")
		    .attr("class", "hexagon")
		    .attr("d", hexbin.hexagon())
		    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
		    .style("fill", function(d) { return color(d.length); })
		    .style("opacity", function(d) { return o(d.length); });
		    
		    };

		draw();