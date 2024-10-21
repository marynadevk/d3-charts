import * as d3 from 'd3';
import { FC, useEffect, useState } from 'react';
import { mockData } from '../data';

type StateFrequency = {
  state: string;
  frequency: number;
};

type Props = {
  width: number;
  height: number;
};

export const HistogramChart: FC<Props> = ({ width, height }) => {
  const [data, setData] = useState<StateFrequency[]>([]);

  useEffect(() => {
    setData(mockData.sort((a, b) => b.frequency - a.frequency));
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      drawChart();
    }
  }, [data]);

  const drawChart = () => {
    const margin = { top: 50, right: 30, bottom: 70, left: 50 };

    const svg = d3
      .select('#histogram')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.state))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.frequency)!])
      .range([height, 0]);

    const barColors = d3
      .scaleLinear<string>()
      .domain([0, d3.max(data, (d) => d.frequency)!])
      .range(['#d90368', '#ffcad4']);

    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    svg.append('g').call(d3.axisLeft(yScale));

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.state)!)
      .attr('y', (d) => yScale(d.frequency))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - yScale(d.frequency))
      .attr('fill', (d) => barColors(d.frequency))
      .attr('stroke', 'black')
      .attr('stroke-width', 1);
  };

  return (
    <div>
      <h4>Histogram</h4>
      <div id="histogram" />
    </div>
  );
};
