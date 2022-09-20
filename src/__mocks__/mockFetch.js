export default async function mockFetch(json, status = 200) {
  global.fetch = jest.fn(() => {
    return Promise.resolve({ json: () => Promise.resolve(json), status: status });
  });
}
