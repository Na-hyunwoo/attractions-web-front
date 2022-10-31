import { render, screen, waitFor, within } from "@testing-library/react";
import App from "../App";

test("관광지 목록을 표시합니다.", async () => {
  render(<App />);

  await waitFor(() => {
    screen.getByText("카오산 로드");
  });

  screen.getByText("카오산 로드");
  screen.getByText("투몬 비치");
  screen.getByText("에펠탑");
  screen.getByText("한 시장");
  screen.getByText("민트 장난감 박물관");
  screen.getByText("플리 런던 빈티지 앤 메이커스 마켓");
  screen.getByText("스프링 스튜디오");
  screen.getByText("왓 위쑨나랏");
  screen.getByText("시티 모스크");
  screen.getByText("화산 1914 문화 창의 산업원구");
});

test("관광지의 평점과 리뷰 개수를 확인할 수 있습니다.", async () => {
  render(<App />);

  await waitFor(() => {
    screen.getByText("카오산 로드");
  });

  [
    ["평균 0점, 0개의 리뷰", [0, 0, 5, "(0)"]],
    ["평균 0.5점, 2개의 리뷰", [0, 1, 4, "(2)"]],
    ["평균 1.325점, 13개의 리뷰", [1, 1, 3, "(13)"]],
    ["평균 2.36점, 848개의 리뷰", [2, 1, 2, "(99+)"]],
    ["평균 2.95점, 42개의 리뷰", [3, 0, 2, "(42)"]],
    ["평균 3.375점, 1632개의 리뷰", [3, 1, 1, "(99+)"]],
    ["평균 3.95점, 59개의 리뷰", [4, 0, 1, "(59)"]],
    ["평균 4.3점, 3개의 리뷰", [4, 1, 0, "(3)"]],
    ["평균 4.6점, 99개의 리뷰", [5, 0, 0, "(99)"]],
  ].forEach(
    ([title, [fillStarCount, halfStarCount, emptyStarCount, textContent]]) => {
      const ratingElement = screen.getByTitle(title);

      expect(
        within(ratingElement)
          .queryAllByRole("img")
          .filter((img) => img.getAttribute("src") === "fill-star.svg")
      ).toHaveLength(fillStarCount);
      expect(
        within(ratingElement)
          .queryAllByRole("img")
          .filter((img) => img.getAttribute("src") === "half-fill-star.svg")
      ).toHaveLength(halfStarCount);
      expect(
        within(ratingElement)
          .queryAllByRole("img")
          .filter((img) => img.getAttribute("src") === "line-star.svg")
      ).toHaveLength(emptyStarCount);
      expect(ratingElement).toHaveTextContent(textContent);
    }
  );
});

test("관광지를 좋아요한 사용자 수를 표시합니다.", async () => {
  render(<App />);

  await waitFor(() => {
    screen.getByText("카오산 로드");
  });

  [
    ["30402개의 좋아요", "999+"],
    ["0개의 좋아요", "0"],
    ["8개의 좋아요", "8"],
    ["999개의 좋아요", "999"],
  ].forEach(([title, textContent]) => {
    const button = screen
      .getAllByRole("button")
      .find((button) => button.title === title);

    expect(button).toBeDefined();
    expect(button).toHaveTextContent(textContent);
  });
});
