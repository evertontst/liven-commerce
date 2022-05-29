import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  position: sticky;
  top: 0px;
  height: 6rem;
  padding: 16px 0px;
  z-index: 3000;
  color: rgb(120, 217, 138);
  background-color: rgb(8, 1, 42);
  a {
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }
`; 
export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  height: 100%;
  margin: 0px auto;
  padding: 0px 32px;
  vertical-align: middle;
  img {
    box-sizing: border-box;
    display: inline-block;
    overflow: hidden;
    width: 160px;
    height: 56px;
    background: none;
    opacity: 1;
    border: 0;
    margin: 0;
    padding: 0;
    position: relative;
    max-width: 100%;
  }
`; 
export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #fff;
    }

    span {
      font-size: 12px;
      color: #999;
    }
  }
`;
