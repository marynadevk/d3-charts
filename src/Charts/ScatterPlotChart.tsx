import * as d3 from 'd3';
import { FC, useEffect } from 'react';

import { financialData } from '../data';

type Props = {
  width: number;
  height: number;
};

export const ScatterPlotChart: FC<Props> = ({ width, height }) => {
  useEffect(() => {
    drawChart();
  }, []);

  const drawChart = () => {
    const margin = { top: 20, right: 80, bottom: 50, left: 70 };

    d3.select('#scatterPlot').selectAll('*').remove();

    const svg = d3
      .select('#scatterPlot')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(financialData, (d) => d.income)! + 10000])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(financialData, (d) => d.expenses)! + 10000])
      .range([height, 0]);

    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(10))
      .attr('class', 'x-axis')
      .style('font-size', '12px')
      .style('font-family', 'sans-serif')
      .select('path')
      .style('stroke', 'black');

    svg
      .append('g')
      .call(d3.axisLeft(y).ticks(10))
      .attr('class', 'y-axis')
      .style('font-size', '12px')
      .style('font-family', 'sans-serif')
      .select('path')
      .style('stroke', 'black');

    svg
      .selectAll('expense-dot')
      .data(financialData)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.income))
      .attr('cy', (d) => y(d.expenses))
      .attr('r', 8)
      .attr('class', 'expense-dot')
      .style('fill', (d) => d.color)
      .style('stroke', 'black')
      .style('stroke-width', '1px');

    const legend = svg
      .selectAll('.legend')
      .data(financialData)
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(${width - 20}, ${i * 20})`);

    legend
      .append('rect')
      .attr('x', 0)
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', (d) => d.color);

    legend
      .append('text')
      .attr('x', 25)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'start')
      .style('font-size', '12px')
      .style('font-family', 'sans-serif')
      .text((d) => d.continent);

    svg
      .append('text')
      .attr(
        'transform',
        `translate(${width / 2}, ${height + margin.bottom - 10})`
      )
      .style('text-anchor', 'middle')
      .text('Revenue ($)');

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left / 1.3)
      .attr('x', 0 - height / 2)
      .style('text-anchor', 'middle')
      .text('Expenses ($)');
  };

  return (
    <div>
      <h4>Scatter Plot of Expenses and Revenue by Continent</h4>
      <div id="scatterPlot"></div>
    </div>
  );
};
