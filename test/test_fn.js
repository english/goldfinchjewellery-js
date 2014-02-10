describe('group by', function() {
  it('groups objects by key', function() {
    var collection = [
      { firstName: 'dave', surname: 'smith' },
      { firstName: 'john', surname: 'jones' },
      { firstName: 'steve', surname: 'smith' }
    ];

    groupBy('surname', collection).should.eql({
      'smith': [
        { firstName: 'dave', surname: 'smith' },
        { firstName: 'steve', surname: 'smith' }
      ],
      'jones': [
        { firstName: 'john', surname: 'jones' }
      ]
    });
  });
});
