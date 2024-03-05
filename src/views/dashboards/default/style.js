import styled, {keyframes} from 'styled-components';
import {Card} from 'antd';


const convertColor = (color) => {
    var parts = color.split(',');
    parts[3] = '0.50)';
    var newRgbaValue = parts.join(',');
    return newRgbaValue;
}


const changeColor = (color) => keyframes`
  from {
    background-color: ${convertColor(color)};
  }
`;

export const CARD_ANIMATION = styled(Card)`
    animation: 1s infinite alternate ${props => changeColor(props.color)};
    background-color: ${props => props.color};
    box-shadow: 8px 13px 32px 0px ${props => props.color};
    -webkit-box-shadow: 8px 13px 32px 0px ${props => props.color};
    -moz-box-shadow: 8px 13px 32px 0px ${props => props.color};
`;