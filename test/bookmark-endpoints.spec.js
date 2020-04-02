const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')

describe.only('Bookmark Endpoints', function() {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg', 
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('bookmarks').truncate())

    context('Given there are bookmarks in the database', () => {
    
    const bookmarksTest = [
        {
        id: 1,
        title: 'Thinkful',
        url: 'www.thinkful.com',
        description: 'Think outside the classroom',
        rating: '5'
      },
      {
          id:2,
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



    beforeEach('insert bookmark', () => {
        return db
          .into('bookmarks')
          .insert(bookmarksTest)
             })
    
    it('GET /bookmarks responds with 200 and all of the articles', () => {
        return supertest(app)
            .get('/bookmarks')
            .expect(200)
            // TODO: add more assertions about the body
      })
    })

    
})