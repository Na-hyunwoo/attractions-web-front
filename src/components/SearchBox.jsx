import { useState } from "react";
import styled from "styled-components";
import { Magnifier, XCircle } from "../assets/svgComponents/icon";
import { typo, WHITE, INK, shadowLarge } from "../styles";
import PropTypes from "prop-types";

/**
 * @param {object} props
 * @param {function()} props.handleChange
 * @param {function()} props.handleClickX
 * @param {string} props.keyword
 * @param {boolean} props.isScroll
 */
const SearchBox = ({
  handleChange,
  handleClickX,
  keyword,
  isScroll,
  onKeyDown,
}) => {
  return (
    <Wrapper isScroll={isScroll}>
      <InputWrapper>
        <Magnifier />
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input
            type="text"
            name="word"
            placeholder="검색"
            onChange={handleChange}
            value={keyword}
            onKeyDown={onKeyDown}
          />
        </Form>
        {keyword.length > 0 && <XButton onClick={handleClickX} />}
      </InputWrapper>
    </Wrapper>
  );
};

SearchBox.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleClickX: PropTypes.func.isRequired,
  keyword: PropTypes.string,
  isScroll: PropTypes.bool,
};

export default SearchBox;

const Wrapper = styled.div`
  padding: 17px 25px;
  ${({ isScroll }) => (isScroll ? shadowLarge : ``)};
`;

const InputWrapper = styled.div`
  background: ${WHITE.LIGHTER};
  padding: 10px 32px 10px 10px;
  border-radius: 8px;

  display: flex;
  align-items: center;

  position: relative;
`;

const Form = styled.form`
  width: 100%;
`;

const Input = styled.input`
  outline: none;
  border: none;
  background: ${WHITE.LIGHTER};
  margin-left: 14px;
  width: 100%;

  ${typo({
    size: "16pt",
    height: "16pt",
    weight: "400",
    color: INK.DARKEST,
  })}

  ::placeholder {
    ${typo({
      size: "16pt",
      height: "16pt",
      weight: "400",
      color: INK.LIGHT,
    })}
  }
`;

const XButton = styled(XCircle)`
  position: absolute;
  right: 11px;

  cursor: pointer;
`;
