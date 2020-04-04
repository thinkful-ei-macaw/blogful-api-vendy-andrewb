/* eslint-disable quotes */
const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');

describe.only('Bookmark Endpoints', function() {
  let db;
  const bookmarksTest = [
    {
      id: 1,
      title: 'Thinkful',
      url: 'www.thinkful.com',
      description: 'Think outside the classroom',
      rating: '5'
    },
    {
      id: 2,
      title: 'Test 1',
      url: 'www.test1.com',
      description: 'Test 1 is here.',
      rating: '1'
    },
    {
      id: 3,
      title: 'Thinkful',
      url: 'www.thinkful.com',
      description: 'Think outside the classroom',
      rating: '5'
    },
    {
      id: 4,
      title: 'Frog & Toad',
      url: 'www.frodandtoad.com',
      description: 'They are best friends',
      rating: '5'
    }
  ];
  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('clean the table', () => db('bookmarks').truncate());

  afterEach('cleanup', () => db('bookmarks').truncate());

  
  context('Given there are bookmarks in the database', () => {
    
    beforeEach('insert bookmark', () => {
      return db.into('bookmarks').insert(bookmarksTest);
    });
    

    it('GET /bookmarks responds with 200 and all of the bookmarks', () => {
      return supertest(app)
        .get('/bookmarks')
        .expect(200, bookmarksTest);
      // TODO: add more assertions about the body
    });
   
    
  });
  context(`Given no bookmarks in table `, ()=>{
    it(`responds with a 200 and an empty list`, ()=>{
      return supertest(app)
        .get('/bookmarks')
        .expect(200, []);
    });
    
  });
  describe(`Get /bookmarks/:bookmark_id`, ()=>{
    context(`Given no bookmark id`, ()=>{
      beforeEach('insert bookmark', () => {
        return db.into('bookmarks').insert(bookmarksTest);
      });
      it(`responds with 404 not found`, ()=>{
        const bookmarkId = 7;
        return supertest(app)
          .get(`/bookmarks/${bookmarkId}`)
          .expect(404,'Bookmark Not Found');
      });
      it('GET /bookmarks/:bookmark_id responds with 200 and the specified bookmark', () => {
        const bookmarkId = 2;
        const expectedId = bookmarksTest[bookmarkId - 1];
        return supertest(app)
          .get(`/bookmarks/${bookmarkId}`)
          .expect(200, expectedId);
    
      });
    });

  });
  
});
