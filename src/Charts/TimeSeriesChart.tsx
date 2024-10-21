import * as d3 from 'd3';
import { FC, useEffect, useState } from 'react';

interface IChartData {
  date: Date | null;
  value: number;
}

type Props = {
  width: number;
  height: number;
};

export const TimeSeriesChart: FC<Props> = ({ width, height }) => {
  const csvURL =
    'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv';

  const [data, setData] = useState<IChartData[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      drawChart();
    } else {
      getURLData();
    }
  }, [data]);

  const getURLData = async () => {
    const tempData: IChartData[] = [];

    await d3.csv(csvURL, function (d: any) {
      tempData.push({
        date: d3.timeParse('%Y-%m-%d')(d.date) ?? null,
        value: parseFloat(d.value),
      });
      return d;
    });

    setData(tempData);
  };

  const drawChart = () => {
    d3.select('#time_series').select('svg').remove();

    const margin = { top: 10, right: 50, bottom: 50, left: 50 };

    const svg = d3
      .select('#time_series')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, width]);

    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .range([height, 0]);

    svg.append('g').call(d3.axisLeft(y));

    const line = d3
      .line<IChartData>()
      .x((d) => x(d.date as Date))
      .y((d) => y(d.value));

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#ff36ab')
      .attr('stroke-width', 2)
      .attr('d', line);
  };

  return (
    <div>
      <h4>Time Series</h4>
      <div id="time_series" />
    </div>
  );
};
