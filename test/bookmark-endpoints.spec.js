const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')

describe('Bookmark Endpoints', function() {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg', 
            connection: process.env.TEST_DB_URL,
        })
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('bookmarks').truncate())

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


    
})