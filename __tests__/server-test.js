jest.unmock('../server'); // unmock to use the actual implementation of sum

describe('server', () => {
  it('has a defined port number', () => {
    const server = require('../server');
    expect(port).toBe(3);
  });
});
