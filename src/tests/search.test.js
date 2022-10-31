import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("검색 영역을 렌더링합니다.", async () => {
  render(<App />);

  const searchArea = screen.getByRole("search");
  within(searchArea).getByRole("searchbox");
});

test("검색 인풋에 값을 입력합니다.", async () => {
  const user = userEvent.setup();
  render(<App />);

  const input = within(screen.getByRole("search")).getByRole("searchbox");

  await user.click(input);
  await user.keyboard("foo");

  expect(input).toHaveValue("foo");
});

test("검색 인풋에 값을 입력하면 검색어를 한 번에 제거하는 버튼을 표시합니다.", async () => {
  const user = userEvent.setup();
  render(<App />);
  const searchArea = screen.getByRole("search");
  const input = within(searchArea).getByRole("searchbox");

  await user.click(input);
  await user.keyboard("foo");

  const clearButton = within(searchArea).getByRole("button");

  await user.click(clearButton);

  expect(input).toHaveValue("");
});

test("검색 인풋에서 엔터를 입력하면 검색 결과를 표시합니다.", async () => {
  const user = userEvent.setup();
  render(<App />);
  await waitFor(() => {
    screen.getByAltText("카오산 로드 썸네일");
  });
  const input = within(screen.getByRole("search")).getByRole("searchbox");
  await user.click(input);

  await user.keyboard("카오산{Enter}");
  expect(screen.queryByAltText("카오산 로드 썸네일")).not.toBeInTheDocument();

  await waitFor(() => {
    screen.getByAltText("카오산 로드 썸네일");
  });
  expect(screen.queryByAltText("투몬 비치 썸네일")).not.toBeInTheDocument();
});

test("검색 인풋에 값을 입력하기만 해도 검색 결과를 표시합니다.", async () => {
  const user = userEvent.setup();
  render(<App />);
  await waitFor(() => {
    screen.getByAltText("카오산 로드 썸네일");
  });
  const input = within(screen.getByRole("search")).getByRole("searchbox");

  await user.click(input);
  const promise = waitForElementToBeRemoved(() =>
    screen.queryByAltText("카오산 로드 썸네일")
  );
  await user.keyboard("카오산");
  await promise;

  await waitFor(() => {
    screen.getByAltText("카오산 로드 썸네일");
  });
  expect(screen.queryByAltText("투몬 비치 썸네일")).not.toBeInTheDocument();
});

test("검색 결과의 관광지 이름에서 검색어를 하이라이트합니다.", async () => {
  const user = userEvent.setup();
  render(<App />);
  await waitFor(() => {
    screen.getByAltText("카오산 로드 썸네일");
  });
  const input = within(screen.getByRole("search")).getByRole("searchbox");
  await user.click(input);

  await user.keyboard("카오산{Enter}");
  expect(screen.queryByAltText("카오산 로드 썸네일")).not.toBeInTheDocument();

  await waitFor(() => {
    screen.getByAltText("카오산 로드 썸네일");
  });
  const query = screen.getByText("카오산");

  expect(query.tagName).toEqual("STRONG");
  expect(query).toHaveStyle("color: #0065D0");
});
