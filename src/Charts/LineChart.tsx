import * as d3 from 'd3';
import { FC, useEffect, useState } from 'react';

interface IChartData {
  label: number;
  value: number;
}

type Props = {
  width: number;
  height: number;
};

export const LineChart: FC<Props> = ({ width, height }) => {
  const [data, setData] = useState<IChartData[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      drawChart();
    } else {
      generateData();
    }
  }, [data]);

  const generateData = () => {
    const chartData = [];
    for (let i = 0; i < 20; i++) {
      const value = Math.floor(Math.random() * i + 3);
      chartData.push({
        label: i,
        value,
      });
    }
    setData(chartData);
  };

  const drawChart = () => {
    const margin = { top: 10, right: 50, bottom: 50, left: 50 };

    d3.select('#container').select('svg').remove();

    const yMaxValue = d3.max(data, (d) => d.value);
    const xMinValue = d3.min(data, (d) => d.label);
    const xMaxValue = d3.max(data, (d) => d.label);

    const svg = d3
      .select('#container')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleLinear()
      .domain([xMinValue || 0, xMaxValue || 0])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, yMaxValue || 0]);

    svg.selectAll('.x-axis').remove();
    svg.selectAll('.y-axis').remove();

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickSize(15));

    svg.append('g').attr('class', 'y-axis').call(d3.axisLeft(yScale));

    const line = d3
      .line<IChartData>()
      .x((d) => xScale(d.label))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#ff36ab')
      .attr('stroke-width', 1)
      .attr('class', 'line')
      .attr('d', line);
  };

  return (
    <div>
      <h4>Line Chart</h4>
      <div id="container" />
    </div>
  );
};
