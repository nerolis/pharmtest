process.env.NODE_ENV = 'test';

const authorization = { Authorization: 'superSecretToken' };

import { sql }  from '../db/db';
import chai     from 'chai';
import chaiHttp from 'chai-http';
import server   from '..';


chai.use(chaiHttp);

let should = chai.should();

describe('Shop', () => {
  before(done => { 
    sql('TRUNCATE t_shop CASCADE;').then(() => { 
      done();
    });
  });     

  
  describe('/api/shop/:shop_name', () => {
    const shop_name = 'niko-opt';

    it('it should insert csv data to db and return array of items.', done => {
      chai.request(server)
        .post(`/api/shop/${shop_name}`)
        .set(authorization)
        .end((err, res) => {
          const items = res.body.response.items;
          chai.expect(err).be.null;
          res.should.have.status(200);
          items.should.be.a('array');
          // items.length.should.be.eql(955);
          done();
        });
    });
  
    describe('/api/shop/:shop_name/:id', () => {
      const shop_name = 'niko-opt',
            article   = 'BZ-1531B';
    
      it('it should GET item by shopname and article', done => {
        chai.request(server)
          .get(`/api/shop/${shop_name}/${article}`)
          .set(authorization)
          .end((err, res) => {  
            chai.expect(err).be.null;
            res.should.have.status(200);
            res.body.should.be.a('object');
            chai.expect(res.body).to.have.all.keys('id', 'name', 'price', 'shop_id', 'shop_name', 'product_id');
            chai.expect(res.body).to.include({id: article, shop_name: shop_name});
            done();
          });
      });
    });
  
  });
  
});
