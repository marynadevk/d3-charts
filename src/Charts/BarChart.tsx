import * as d3 from 'd3';
import { FC, useEffect } from 'react';

import { storeAssortment } from '../data';

const margins = { top: 20, right: 30, bottom: 40, left: 50 };
const yAxisLabel = 'Value';
const fill = ['#f7b2b7', '#f7717d', '#de639a', '#7f2982', '#16001e'];

type Props = {
  width: number;
  height: number;
};

export const BarChart: FC<Props> = ({ width, height }) => {
  useEffect(() => {
    drawChart();
  }, []);

  const drawChart = () => {
    d3.select('#barChart').selectAll('*').remove();

    const svg = d3
      .select('#barChart')
      .append('svg')
      .attr('width', width + margins.left + margins.right)
      .attr('height', height + margins.top + margins.bottom)
      .append('g')
      .attr('transform', `translate(${margins.left},${margins.top})`);

    const x = d3
      .scaleBand()
      .domain(storeAssortment.map((d) => d.label))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(storeAssortment, (d) => d.value)!])
      .range([height, 0]);

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g').attr('class', 'y-axis').call(d3.axisLeft(y).ticks(5));

    svg
      .selectAll('.bar')
      .data(storeAssortment)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.label)!)
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.value))
      .style('fill', (_d, i) => fill[i % fill.length]);

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margins.left)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text(yAxisLabel);
  };

  return (
    <div>
      <h4>Bar Chart Store</h4>
      <div id="barChart"></div>
    </div>
  );
};
