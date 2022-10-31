import styled from "styled-components";
import Rating from "../Rating";
import { LineHeart } from "../../assets/SVGComponent/icon";
import { WHITE } from "../../styles";

const AttractionCardSkeleton = () => {
  return (
    <Wrapper>
      <ImgSkeleton />
      <div>
        <NameSkeleton />
        <DescriptionSkeleton1 />
        <DescriptionSkeleton2 />
        <Rating rating={0} count={undefined}/>
      </div>
      <Heart />
    </Wrapper>
  );
};

export default AttractionCardSkeleton;

const Wrapper = styled.div`
  padding: 16px;

  display: flex;

  position: relative;
`;

const ImgSkeleton = styled.div`
  width: 92px;
  height: 120px;

  border-radius: 8px;
  background: ${WHITE.LIGHT};

  margin-right: 16px;
`;

const NameSkeleton = styled.div`
  width: 104px;
  height: 16px;

  background: ${WHITE.LIGHT};
  border-radius: 9px;

  margin-bottom: 8px;
`;

const DescriptionSkeleton1 = styled.div`
  width: 223px;
  height: 12px;

  background: ${WHITE.LIGHT};
  border-radius: 9px;

  margin-bottom: 4px;
`;

const DescriptionSkeleton2 = styled.div`
  width: 143px;
  height: 12px;

  background: ${WHITE.LIGHT};
  border-radius: 9px;

  margin-bottom: 8px;
`;

const Heart = styled(LineHeart)`
  position: absolute; 
  right: 16px;
  bottom: 16px;
`;