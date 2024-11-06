const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');  
const { expect } = chai;



chai.use(chaiHttp);

describe('Pruebas de la API de Animes', function () {
  it('Debería obtener todos los animes', (done) => {
    chai.request(app)
      .get('/animes')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  // Agregar más pruebas según lo necesites...
});
