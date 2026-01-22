const http = require("http");
const { sum } = require("./calc");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/health" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "ok" }));
  }

  if (req.url.startsWith("/sum") && req.method === "GET") {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const a = Number(url.searchParams.get("a"));
    const b = Number(url.searchParams.get("b"));

    try {
      const result = sum(a, b);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ result }));
    } catch (e) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: e.message }));
    }
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "not found" }));
});

if (require.main === module) {
  server.listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = { server };
