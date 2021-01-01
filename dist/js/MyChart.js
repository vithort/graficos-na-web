window.onload = () => {
  new MyChart();
};

class MyChart {
  constructor() {
    this.iniciaElementos();
  }

  iniciaElementos() {
    this.cadastrar = document.querySelector('#cadastrar');
    this.cadastrar.addEventListener('click', () => {
      this.cadastrarCliente();
    });
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
}
