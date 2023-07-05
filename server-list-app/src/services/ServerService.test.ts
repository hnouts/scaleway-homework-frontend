import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getServers, getServer } from "./Server.service";

var mock: MockAdapter;

beforeEach(() => {
  mock = new MockAdapter(axios);
});

afterEach(() => {
  mock.reset();
});

test("getServers returns an array of servers", async () => {
  mock.onGet("http://localhost:8000/servers").reply(200, [
    { ID: "1", Name: "Server1", Type: "small", Status: "running" },
    { ID: "2", Name: "Server2", Type: "large", Status: "stopped" },
  ]);
  const data = await getServers();
  if (!data) {
    throw new Error("No data returned from getServers");
  }
  expect(Array.isArray(data)).toBeTruthy();
  expect(data[0]).toHaveProperty("ID");
  expect(data[0]).toHaveProperty("Name");
  expect(data[0]).toHaveProperty("Type");
  expect(data[0]).toHaveProperty("Status");
});

test("getServer returns a server given an id", async () => {
  mock
    .onGet("http://localhost:8000/servers/1")
    .reply(200, { ID: "1", Name: "Server1", Type: "small", Status: "running" });
  const data = await getServer("1");
  if (!data) {
    throw new Error("No data returned from getServer");
  }
  expect(data).toHaveProperty("ID", "1");
  expect(data).toHaveProperty("Name");
  expect(data).toHaveProperty("Type");
  expect(data).toHaveProperty("Status");
});

test("getServers handles an API error gracefully", async () => {
  mock.onGet("/servers").reply(500);

  const data = await getServers();

  expect(data).toBeNull();
});
test("getServer handles an API error gracefully", async () => {
  mock.onGet("/servers/1").reply(500);

  const data = await getServer("1");

  expect(data).toBeNull();
});
