var toStr = function(num){
	if(Number.isInteger(num))
		return num + ".0";
	else
		return num.toString();
}

var GridWorld1 = function(){
	this.gridData = new Array();
	this.width = 70;
	this.height = 70;
}

GridWorld1.prototype = {
	initData: function(nrows, ncols){

		this.nrows=nrows;
		this.ncols=ncols;
		for (var r=0; r<this.nrows; r++){
			var row = new Array();
			for (var c=0; c<this.ncols; c++){
				var column = {
					x: (r * this.width) + 1,
					y: (c * this.height) + 1,
					width: this.width,
					height: this.height,
					qval: 0.0,
					color: ((r==0&&c==0)||(r==this.nrows-1&&c==this.ncols-1)?"#00FF7F":"#fff")
				};
				row.push(column);
			}
			this.gridData.push(row);
		}

	},
	
	// updates this.gridData
	updateData: function(){
		for(var r=0; r<this.nrows; r++){
			for(var c=0; c<this.ncols; c++){

				// update q-table using DP
				this.gridData[r][c].qval=+Math.random().toFixed(2);
				
			}
		}
	},

	// intialize grid display
	initGrid: function(){
		var grid = d3.select("#grid1")
			.select("svg");

		var row = grid.selectAll(".row")
				.data(this.gridData)
				.enter()
				.append("g")
				.attr("class", "row");

		var column = row.selectAll(".square")
				.data(function(d) {return d;})
				.enter()
				.append("rect")
				.attr("class", "square")
				.attr("x", function(d) {return d.x;} )
				.attr("y", function(d) {return d.y;} )
				.attr("width", function(d) {return d.width;} )
				.attr("height", function(d) {return d.height;} )
				.style("fill", function(d) {return d.color;})
				.style("stroke", "#000");

		var text = row.selectAll(".txt")
				.data(function(d) {return d;})
				.enter()
				.append("text")
				.attr("class", "txt")
				.attr("x", function(d) {return (d.x + d.width/2);} )
				.attr("y", function(d) {return (d.y + d.width/2);} )
				.attr("text-anchor", "middle")
				.attr("dominant-baseline", "middle")
				.text(function(d) {return d.qval} );
		
	},

	// update grid display
	updateGrid: function(){

		// select rows and then all .txt
		d3.select("#grid1").selectAll(".row")
				.data(this.gridData)

				// update text of all .txt 
				.selectAll(".txt")
				.text(function(d) {return d.qval} );
	}
}

var GridWorld2 = function(){
	this.gridData = new Array();
	this.width = 70;
	this.height = 70;
}

GridWorld2.prototype = {
	initData: function(nrows, ncols){
		// pass
		// var gridData = new Array();
		this.nrows=nrows;
		this.ncols=ncols;
		for (var r=0; r<this.nrows; r++){
			var row = new Array();
			for (var c=0; c<this.ncols; c++){
				var column = {
					x: (r * this.width) + 1,
					y: (c * this.height) + 1,
					width: this.width,
					height: this.height,
					color: ((r==0&&c==0)||(r==this.nrows-1&&c==this.ncols-1)?"#00FF7F":"#fff"),

					// left, right, up, down
					dir: {l: 0.01, r: 0.01, u: 0.01, d: 0.01}
				};
				row.push(column);
			}
			this.gridData.push(row);
		}

	},
	
	// updates this.gridData
	updateData: function(){
		// maximum reward

		for(var r=0; r<this.nrows; r++){
			for(var c=0; c<this.ncols; c++){

				// random update (for now)
				this.gridData[r][c].dir.l=Math.random();
				this.gridData[r][c].dir.r=Math.random();
				this.gridData[r][c].dir.u=Math.random();
				this.gridData[r][c].dir.d=Math.random();
			}
		}
	},

	// intialize grid display
	initGrid: function(){
		var grid = d3
			.select("#grid2")
			.select("svg");

		var row = grid.selectAll(".row")
				.data(this.gridData)
				.enter()
				.append("g")
				.attr("class", "row");

		var square = row.selectAll(".square")
				.data(function(d) {return d;})
				.enter()
				.append("rect")
				.attr("class", "square")
				.attr("x", function(d) {return d.x;} )
				.attr("y", function(d) {return d.y;} )
				.attr("width", function(d) {return d.width;} )
				.attr("height", function(d) {return d.height;} )
				.style("fill", function(d) {return d.color;})
				.style("stroke", "#000");


		// left-arrow
		row.selectAll(".arrow-left")
				.data(function(d) {return d;})
				.enter()
				.append("line")
				.attr("class", "arrow-left")
				.attr("x1", function(d) {return (d.x + d.width/2);} )
				.attr("y1", function(d) {return (d.y + d.height/2);} )
				.attr("x2", function(d) {return (d.x + d.width/2-d.dir.l*d.width/3);} )
				.attr("y2", function(d) {return (d.y + d.height/2);} )
				.attr("stroke", "black")
				.attr("stroke-width", "2")
				.attr("marker-end", "url(#triangle)");


		// right-arrow
		row.selectAll(".arrow-right")
				.data(function(d) {return d;})
				.enter()
				.append("line")
				.attr("class", "arrow-right")
				.attr("x1", function(d) {return (d.x + d.width/2);} )
				.attr("y1", function(d) {return (d.y + d.height/2);} )
				.attr("x2", function(d) {return (d.x + d.width/2+d.dir.r*d.width/3);} )
				.attr("y2", function(d) {return (d.y + d.height/2);} )
				.attr("stroke", "black")
				.attr("stroke-width", "2")
				.attr("marker-end", "url(#triangle)");

		// up-arrow
		row.selectAll(".arrow-up")
				.data(function(d) {return d;})
				.enter()
				.append("line")
				.attr("class", "arrow-up")
				.attr("x1", function(d) {return (d.x + d.width/2);} )
				.attr("y1", function(d) {return (d.y + d.height/2);} )
				.attr("x2", function(d) {return (d.x + d.width/2);} )
				.attr("y2", function(d) {return (d.y + d.height/2-d.dir.u*d.height/3);} )
				.attr("stroke", "black")
				.attr("stroke-width", "2")
				.attr("marker-end", "url(#triangle)");

		// down-arrow
		row.selectAll(".arrow-down")
				.data(function(d) {return d;})
				.enter()
				.append("line")
				.attr("class", "arrow-down")
				.attr("x1", function(d) {return (d.x + d.width/2);} )
				.attr("y1", function(d) {return (d.y + d.height/2);} )
				.attr("x2", function(d) {return (d.x + d.width/2);} )
				.attr("y2", function(d) {return (d.y + d.height/2+d.dir.d*d.height/3);} )
				.attr("stroke", "black")
				.attr("stroke-width", "2")
				.attr("marker-end", "url(#triangle)");

	},

	// update grid display
	updateGrid: function(){

		// left-arrow
		d3.select("#grid2")
				// .select("svg")
				.selectAll(".arrow-left")
				.attr("x2", function(d) {return (d.x + d.width/2-d.dir.l*d.width/3);} )
				.attr("y2", function(d) {return (d.y + d.height/2);} );

		d3.select("#grid2")
				// .select("svg")
				.selectAll(".arrow-right")
				.attr("x2", function(d) {return (d.x + d.width/2+d.dir.r*d.width/3);} )
				.attr("y2", function(d) {return (d.y + d.height/2);} );

		d3.select("#grid2")
				// .select("svg")
				.selectAll(".arrow-up")
				.attr("x2", function(d) {return (d.x + d.width/2);} )
				.attr("y2", function(d) {return (d.y + d.height/2-d.dir.u*d.height/3);} );

		d3.select("#grid2")
				// .select("svg")
				.selectAll(".arrow-down")
				.attr("x2", function(d) {return (d.x + d.width/2);} )
				.attr("y2", function(d) {return (d.y + d.height/2+d.dir.d*d.height/3);} );
	}
}


var gridWorld1 = new GridWorld1();
gridWorld1.initData(7, 7);
gridWorld1.initGrid();

var gridWorld2 = new GridWorld2();
gridWorld2.initData(7, 7);
gridWorld2.initGrid();


// button onClick
var updateButton=document.querySelector("button.update");
updateButton.onclick = function(){

	gridWorld1.updateData();
	gridWorld1.updateGrid();

	gridWorld2.updateData();
	gridWorld2.updateGrid();
}

var iterateButton=document.querySelector("button.iterate");
iterateButton.onclick = function(){
	/*d3.interval(function(){
		gridWorld1.updateData();
		gridWorld1.updateGrid();

		gridWorld2.updateData();
		gridWorld2.updateGrid();
	}, 100);*/
}