import styled from "styled-components";
import PropTypes from "prop-types";
import { typo } from "../styles";
import { INK, SKY } from "../styles";
import { nanoid } from "nanoid";

/**
 *
 * @param {object} props
 * @param {string} props.name
 * @param {string} props.highlight
 */
const HighlightedName = ({ name, highlight }) => {
  const regExp = new RegExp(`(${highlight})`, "gi");
  const splitedName = name.split(regExp);

  return (
    <Wrapper>
      {splitedName.map((word) =>
        word === highlight ? (
          <HighlitedWord key={nanoid()}>{word}</HighlitedWord>
        ) : (
          <Word key={nanoid()}>{word}</Word>
        )
      )}
    </Wrapper>
  );
};

HighlightedName.propTypes = {
  name: PropTypes.string.isRequired,
  highlight: PropTypes.string,
};

export default HighlightedName;

const Wrapper = styled.div`
  margin-bottom: 4px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Word = styled.span`
  ${typo({
    size: "18pt",
    height: "24pt",
    weight: 700,
    color: INK.DARKEST,
  })}
`;

const HighlitedWord = styled.span`
  ${typo({
    size: "18pt",
    height: "24pt",
    weight: 700,
    color: SKY.DARKEST,
  })}
`;
