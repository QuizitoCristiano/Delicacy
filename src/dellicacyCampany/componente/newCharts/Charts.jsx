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
          data: [31, 40, 28, 51, 42, 109, 100, 85, 95, 110, 115, 130],
        },
        {
          name: "Saída",
          data: [11, 32, 45, 32, 34, 52, 41, 33, 55, 45, 56, 60],
        },
      ],
      options: {
        chart: {
          type: "area",
          events: {
            dataPointSelection: (event, chartContext, config) => {
              const monthIndex = config.dataPointIndex;
              this.toggleMonthData(monthIndex);
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
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ],
          labels: {
            rotate: -45, // Inclinação dos meses
            rotateAlways: true,
            minHeight: 40,
          },
        },
        tooltip: {
          x: {
            format: "MMM",
          },
        },
      },
      activeMonth: null, // Estado para manter o índice do mês ativo
    };
  }

  componentDidMount() {
    // Store original data to toggle between showing and hiding
    const originalData = this.state.series.map((serie) => [...serie.data]);
    this.setState({ originalData });
  }

  toggleMonthData(monthIndex) {
    this.setState((prevState) => {
      const updatedSeries = prevState.series.map((serie) => ({
        ...serie,
        data: serie.data.map((value, idx) =>
          idx === monthIndex ? value * 2 : value // Exemplo de lógica de atualização
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
