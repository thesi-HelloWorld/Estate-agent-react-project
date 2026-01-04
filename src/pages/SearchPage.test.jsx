import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SearchPage from "../pages/SearchPage";

test("renders Property Search heading", () => {
  render(
    <BrowserRouter>
      <SearchPage />
    </BrowserRouter>
  );
  expect(screen.getByText(/Property Search/i)).toBeInTheDocument();
});

test("renders property cards", () => {
  render(
    <BrowserRouter>
      <SearchPage />
    </BrowserRouter>
  );
  expect(screen.getAllByText(/bedrooms/i).length).toBeGreaterThan(0);
});

test("renders Add to Favourites button", () => {
  render(
    <BrowserRouter>
      <SearchPage />
    </BrowserRouter>
  );
  expect(screen.getByText(/Add to Favourites/i)).toBeInTheDocument();
});

test("renders View Details link", () => {
  render(
    <BrowserRouter>
      <SearchPage />
    </BrowserRouter>
  );
  expect(screen.getByText(/View Details/i)).toBeInTheDocument();
});

test("filters by type", () => {
  render(
    <BrowserRouter>
      <SearchPage />
    </BrowserRouter>
  );
  expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
});