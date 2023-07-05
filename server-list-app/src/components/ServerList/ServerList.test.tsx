import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import '@testing-library/jest-dom/extend-expect';
import axios from "axios";
import ServerList from "./ServerList";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useNavigate: () => jest.fn(),
}));

const mock = new MockAdapter(axios);
const servers = [
  { ID: "1", Name: "Server1", Type: "small", Status: "running" },
  { ID: "2", Name: "Server2", Type: "large", Status: "stopped" },
];

describe("ServerList", () => {
  afterEach(() => {
    mock.reset();
  });
  it("displays loading before server data is fetched", () => {
    mock.onGet("http://localhost:8000/servers").reply(200, servers);
    render(
      <Router>
        <ServerList />
      </Router>
    );
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("fetches and displays server data", async () => {
    mock.onGet("http://localhost:8000/servers").reply(200, servers);
    render(
      <Router>
        <ServerList />
      </Router>
    );
    expect(await screen.findByText("Server1")).toBeInTheDocument();
    expect(screen.getByText("Server2")).toBeInTheDocument();
  });
  

  it("navigates when a server row is clicked", async () => {
    const navigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(navigate);
    mock.onGet("http://localhost:8000/servers").reply(200, servers);
    render(
      <Router>
        <ServerList />
      </Router>
    );
    fireEvent.click(await screen.findByText("Server1"));
    expect(navigate).toHaveBeenCalledWith("/server/1");
  });
});
