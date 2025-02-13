import React from "react";
import ReactApexChart from "react-apexcharts";
import { StyleClientNweLib } from "../../lib/newStylesLib";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Entrada",
          data: [31, 40, 28, 51, 42, 100, 90],
        },
        {
          name: "Saída",
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      options: {
        chart: {
          type: "area",
          events: {
            dataPointSelection: (event, chartContext, config) => {
              const dayIndex = config.dataPointIndex;
              this.toggleDayData(dayIndex);
            }
          }
        },
        colors: ["#f75f1d", "#1a2428"],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          categories: [
            'Segunda',
            'Terça',
            'Quarta',
            'Quinta',
            'Sexta',
            'Sábado',
            'Domingo'
          ],
          labels: {
            rotate: -45,
            rotateAlways: true,
            minHeight: 40,
          },
        },
        tooltip: {
          x: {
            format: "dddd",
          },
          y: {
            formatter: (value) => `${value}%`
          },
        },
      },
      originalData: [], // Store original data for toggling
    };
  }

  componentDidMount() {
    // Store original data to toggle between showing and hiding
    const originalData = this.state.series.map((serie) => [...serie.data]);
    this.setState({ originalData });
  }

  toggleDayData(dayIndex) {
    this.setState((prevState) => {
      const updatedSeries = prevState.series.map((serie, serieIndex) => ({
        ...serie,
        data: prevState.originalData[serieIndex].map((value, idx) =>
          idx === dayIndex ? value * 2 : value // Exemplo de lógica de atualização
        ),
      }));
      return { series: updatedSeries };
    });
  }

  render() {
    return (
      <StyleClientNweLib.newcontainerrCharts>
        <StyleClientNweLib.wrapperCardBoxCharts id="chart">
          <StyleClientNweLib.newBoxCharts>
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="area"
              height="100%"
              width="100%"
            />
          </StyleClientNweLib.newBoxCharts>
        </StyleClientNweLib.wrapperCardBoxCharts>
        <div id="html-dist"></div>
      </StyleClientNweLib.newcontainerrCharts>
    );
  }
}

export default ApexChart;
