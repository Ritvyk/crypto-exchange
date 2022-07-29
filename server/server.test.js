const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

describe("running test for crypto server", () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("authentication test", (done) => {
    serverSocket.emit("auth_response", { status: "OK" });
    clientSocket.on("auth_response", (arg) => {
      expect(arg.status).toBe("OK");
      done();
    });
  });

  test("crypto data fetching for once", (done) => {
    serverSocket.emit("crypto_prices:receive_once", {
      data: [{ symbol: "BTCUSDT" }],
    });
    clientSocket.on("crypto_prices:receive_once", (arg) => {
      expect(arg.data.length).toBeGreaterThan(0);
      done();
    });
  });
});
