const { postUpload } = require('../controllers/uploads');

jest.mock('../db/database', () => ({
  getDatabase: () => ({
    collection: () => ({
      insertOne: jest.fn().mockResolvedValue({
        insertedId: 'mockedFileId123',
      }),
    }),
  }),
}));

describe('postUpload', () => {
  it('Should save the file and return successfully', async () => {
    const req = {
      file: {
        mimetype: 'image/png',
        originalname: 'teste.png',
        size: 1234,
        buffer: Buffer.from('testfile'),
      },
      body: {
        userId: '123',
        reviewId: '456',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await postUpload(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'File sent and saved successfully!',
      fileId: 'mockedFileId123',
    }));
  });

  it('Should return error 400 if file not exist', async () => {
    const req = {
      file: null,
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await postUpload(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'No files uploaded.' });
  });
});
