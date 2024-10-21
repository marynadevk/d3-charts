import './App.css';
import { BarChart } from './Charts/BarChart';
import { HistogramChart } from './Charts/HistogramChart';
import { LineChart } from './Charts/LineChart';
import { ScatterPlotChart } from './Charts/ScatterPlotChart';
import { TimeSeriesChart } from './Charts/TimeSeriesChart';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React + D3 Charts</h1>
      </header>
      <main>
        <BarChart width={800} height={500} />
        <HistogramChart width={800} height={500} />
        <TimeSeriesChart width={800} height={500} />
        <LineChart width={800} height={500} />
        <ScatterPlotChart width={800} height={500} />
      </main>
    </div>
  );
}

export default App;
