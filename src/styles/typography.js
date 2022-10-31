import { css } from "styled-components";

export const TITLE1 = css`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 48pt;
  line-height: 56pt;
`; 

export const TITLE2 = css`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 32pt;
  line-height: 36pt;
`;

export const TITLE3 = css`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 24pt;
  line-height: 32pt;
`;

export const typo = ({
  size,
  height,
  weight,
  color,
}) => css`
  font-family: 'Inter';
  font-size: ${size};
  line-height: ${height};
  font-weight: ${weight};
  color: ${color};
`;
