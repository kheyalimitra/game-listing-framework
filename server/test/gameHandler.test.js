const {
  handleCreateGame,
  handleFetchGame,
  handleDeleteGame 
} =  require('../handlers/games');

jest.mock('../db/crud.js', () => ({
  ...(jest.requireActual('../db/crud.js')),
  insertEntry: jest.fn(),
  findEntry: jest.fn().mockReturnValue({_id: 'some-id', category: 'live'}),
  deleteEntry: jest.fn().mockReturnValue({ deletedCount: 1 }),

}))


const mockResponse = () => {
  const res = {};
  res.send = jest.fn().mockReturnValue(res);
  return res;
};
const mockRequest = (body) => ({
  body
});
describe('Test games handler', () => {
  afterAll(done => {
    done()
  })
  it ('should creaate new entry', async() => {
    const body =  {_id: 'some-id', category: 'live', title: 'Game1', images: []};
    const req = mockRequest(body);
    const res = mockResponse();
    await handleCreateGame(req, res);
    expect(res.send).toHaveBeenCalledWith({'success': 200});
  })
  it ('should fetch records', async() => {
    const req = mockRequest();
    const res = mockResponse();
    await handleFetchGame(req, res);
    expect(res.send).toHaveBeenCalledWith( {_id: 'some-id', category: 'live'});
  })
  it ('should delete record', async() => {
    const req = mockRequest();
    const res = mockResponse();
    await handleDeleteGame(req, res);
    expect(res.send).toHaveBeenCalledWith({'success': '1 entries are deleted' });
  })
})