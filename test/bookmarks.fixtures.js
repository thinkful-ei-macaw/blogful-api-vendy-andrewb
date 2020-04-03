function makeBookmarksArray() {
    return [
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
}

function makeMaliciousBookmark() {
    const maliciousBookmark = {
      id: 911,
      title: 'Naughty naughty very naughty <script>alert("xss");</script>',
      url: 'https://www.hackers.com',
      description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
      rating: 1,
    }
    const expectedBookmark = {
      ...maliciousBookmark,
      title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
      description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
    }
    return {
        maliciousBookmark,
        expectedBookmark,
    }
}

module.exports = {
    makeBookmarksArray,
    makeMaliciousBookmark
}