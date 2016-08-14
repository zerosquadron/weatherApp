const d3 = require('d3');

function drawGraph() {
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = 1250 - margin.left - margin.right;
  const height = 750 - margin.top - margin.bottom;

  // parse the date / time
  // const parseTime = d3.timeParse('%d-%b-%y');

  // set the ranges
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  // define the line
  const humidity = d3.line()
    .x((d) => { return x(d.created); })
    .y((d) => { return y(d.inTemp); });

  const temp = d3.line()
    .x((d) => { return x(d.created); })
    .y((d) => { return y(d.inTemp); })

  const svg = d3.select('body').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform',
            `translate( ${margin.left}, ${margin.top})`);

  d3.json('/weather', (error, data) => {
    if (error) throw error;

    data = data.slice(800, data.length - 1);

      // format the data
    data.forEach((d) => {
      const row = d;
      row.created = d3.isoParse(row.created);
    });

    // Scale the range of the data
    x.domain(d3.extent(data, (d) => { return d.created; }));

    y.domain([0, d3.max(data, (d) => { return d.inTemp; })]);

    svg.append('path')
      .data([data])
      .attr('class', 'line humid')
      .attr('d', humidity);

    svg.append('g')
        .attr('transform', `translate(0, ${height} )`)
        .call(d3.axisBottom(x)
          .ticks(10));

    svg.append('g')
        .call(d3.axisLeft(y)
          .ticks(10));
  });
}

drawGraph();