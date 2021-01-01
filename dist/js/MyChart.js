window.onload = () => {
  new MyChart();
};

class MyChart {
  constructor() {
    this.iniciaElementos();
    this.carregaDados().then(() => this.render());
  }

  iniciaElementos() {
    this.cadastrar = document.querySelector('#cadastrar');
    this.cadastrar.addEventListener('click', () => {
      this.cadastrarCliente()
        .then(() => this.carregaDados())
        .then(() => this.render());
    });
    this.chartSexoElement = document.querySelector('#sexoChart');
    this.chartSexo = this.criarChartSexo();
    this.chartDataElement = document.querySelector('#dataChart');
    this.chartData = this.criarChartData();
  }

  cadastrarCliente() {
    const nome = document.querySelector('#nome');
    const sexo = document.querySelector('input[name="sexo"]:checked');
    const dados = {
      nome: nome.value,
      sexo: sexo.dataset.value,
      data: new Date().toISOString(),
    };
    return axios
      .post('/save', dados)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        alert('oops, something went wrong!', error);
      });
  }

  carregaDados() {
    return axios
      .get('/all')
      .then((response) => {
        this.prepararDados(response.data);
      })
      .catch((error) => {
        alert('oops, something went wrong!', error);
      });
  }

  prepararDados(dados) {
    // console.log(dados);
    this.dadosSexo = [
      dados.filter((dado) => dado.sexo == 1).length,
      dados.filter((dado) => dado.sexo == 2).length,
    ];
    this.labelData = {};
    dados.forEach((element) => {
      const dataFormatada = new Date(element.data).toISOString().split('T')[0];
      this.labelData[dataFormatada] = this.labelData[dataFormatada] + 1 || 1;
    });
  }

  render() {
    this.chartSexo.data.datasets[0].data = this.dadosSexo;
    this.chartData.data.labels = Object.keys(this.labelData);
    this.chartData.data.datasets[0].data = Object.values(this.labelData);
    this.chartSexo.update();
    this.chartData.update();
  }

  criarChartSexo() {
    return new Chart(this.chartSexoElement, {
      type: 'bar',
      data: {
        labels: ['Masculino', 'Feminino'],
        datasets: [
          {
            label: 'Total',
            data: [],
            backgroundColor: ['rgba(29, 0, 207, 0.7', 'rgba(255, 0, 0, 0.7)'],
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        title: {
          display: true,
          text: 'Total por Sexo',
        },
        legend: {
          display: false,
        },
      },
    });
  }

  criarChartData() {
    return new Chart(this.chartDataElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Total',
            data: [],
            borderColor: 'blue',
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        title: {
          display: true,
          text: 'Total por Data',
        },
        legend: {
          display: false,
        },
      },
    });
  }
}
