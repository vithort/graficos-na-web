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
      this.cadastrarCliente();
    });
    this.chartSexoElement = document.querySelector('#sexoChart');
  }

  cadastrarCliente() {
    const nome = document.querySelector('#nome');
    const sexo = document.querySelector('input[name="sexo"]:checked');
    const dados = {
      nome: nome.value,
      sexo: sexo.dataset.value,
      data: new Date().toISOString(),
    };
    axios
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
    this.dadosSexo = [
      dados.filter((dado) => dado.sexo == 1).lenght,
      dados.filter((dado) => dado.sexo == 2).lenght,
    ];
  }

  render() {}
}
