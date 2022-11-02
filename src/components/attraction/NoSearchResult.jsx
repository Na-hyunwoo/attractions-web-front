import styled from "styled-components";
import InBox from "../../assets/icons";
import { typo } from "../../styles";
import { INK } from "../../styles";

const NoSearchResult = () => {
  return (
    <Wrapper>
      <InnerWrapper>
        <InBox />
        <Label>검색어에 맞는 관광지가 없어요.</Label>
        <Label>다른 검색어로 찾아보세요.</Label>
      </InnerWrapper>
    </Wrapper>
  );
}

export default NoSearchResult;

const Wrapper = styled.div`
  width: 100vw; 
  height: 100vw; 

  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Label = styled.p`
  ${typo({
    size: "16pt",
    height: "24pt",
    weight: 500,
    color: INK.LIGHT
  })}
`;