import styled, { css, keyframes } from "styled-components";
import { FillHeart, LineHeart } from "../assets/svgComponents/icon";
import { typo, WHITE } from "../styles";
import PropTypes from "prop-types";
import { usePrevious } from "../hooks/usePrevious";
import { useEffect, useState } from "react";

/**
 * @param {object} props
 * @param {number} props.count
 * @param {boolean} props.isLike
 * @param {function()} props.handleClickFillHeart
 * @param {function()} props.handleClickLineHeart
 */
const Like = ({
  count,
  isLike = false,
  handleClickFillHeart = () => {},
  handleClickLineHeart = () => {},
}) => {
  // isIncrease가 0이면 초기상태, 1이면 증가된 상태, -1이면 감소된 상태
  const [isIncrease, setIsIncrease] = useState(0);
  const previousCount = usePrevious(count);

  const filteringCount = (count) => {
    return count > 999 ? "999+" : count;
  };

  useEffect(() => {
    if (previousCount < count) {
      setIsIncrease(1);
    } else if (previousCount > count) {
      setIsIncrease(-1);
    }
  }, [previousCount, count]);

  return (
    <Wrapper>
      <InvisibleLargerNumber isIncrease={isIncrease}>
        {filteringCount(count)}
      </InvisibleLargerNumber>
      <VisibleNumber isIncrease={isIncrease}>
        {filteringCount(count)}
      </VisibleNumber>
      <InvisibleSmallerNumber isIncrease={isIncrease}>
        {filteringCount(count)}
      </InvisibleSmallerNumber>
      {isLike ? (
        <FillHeart
          style={{ cursor: "pointer" }}
          onClick={handleClickFillHeart}
        />
      ) : (
        <LineHeart
          style={{ cursor: "pointer" }}
          onClick={handleClickLineHeart}
        />
      )}
    </Wrapper>
  );
};

Like.propTypes = {
  count: PropTypes.number.isRequired,
  isLike: PropTypes.bool,
  handleClickFillHeart: PropTypes.func,
  handleClickLineHeart: PropTypes.func,
};

export default Like;

const Wrapper = styled.div`
  display: flex;
`;

const VisibleNumber = styled.span`
  ${typo({
    size: "14pt",
    height: "16pt",
    weight: 700,
    color: WHITE.DARK,
  })};
  display: flex;
  align-items: center;

  margin-right: 5.55px;

  opacity: ${({ isIncrease, isDecrease }) =>
    isIncrease || isDecrease ? css`0` : css`1`};
`;

const slideDownKeyframes = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const InvisibleLargerNumber = styled.span`
  ${typo({
    size: "14pt",
    height: "16pt",
    weight: 700,
    color: WHITE.DARK,
  })};
  display: flex;
  align-items: center;

  margin-right: 5.55px;

  position: absolute;

  animation: ${({ isIncrease }) =>
    isIncrease === 0
      ? css``
      : isIncrease === 1
      ? css`
          ${slideDownKeyframes} 0.5s
        `
      : css``};

  opacity: ${({ isIncrease }) =>
    isIncrease === 0 ? css`0` : isIncrease === -1 ? css`0` : css`1`};
`;

const slideUpKeyframes = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const InvisibleSmallerNumber = styled.span`
  ${typo({
    size: "14pt",
    height: "16pt",
    weight: 700,
    color: WHITE.DARK,
  })};
  display: flex;
  align-items: center;

  margin-right: 5.55px;

  position: absolute;

  animation: ${({ isIncrease }) =>
    isIncrease === 0
      ? css``
      : isIncrease === -1
      ? css`
          ${slideUpKeyframes} 0.5s
        `
      : css``};

  opacity: ${({ isIncrease }) =>
    isIncrease === 0 ? css`0` : isIncrease === 1 ? css`0` : css`1`};
`;
