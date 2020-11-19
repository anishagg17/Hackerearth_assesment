import {Compile} from '../components/Compile'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ body: { out: "out", status: 200 } }),
  })
);

beforeEach(() => {
    fetch.mockClear();
});

describe('=> Compile Api', () => {
  it("gets result", async () => {
    const rate = await Compile("code", "in", "out", "current");
  
    expect(rate).toEqual({"body": {"out": "out", "status": 200}});
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});