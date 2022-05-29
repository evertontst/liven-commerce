import styled from 'styled-components';

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;
  max-width:1000px;
  margin: 0 auto;

  @media all and (min-width: 768px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    max-width:980px;
  }
  @media all and (min-width: 480px) and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    width:90%;
  }
  @media all and (max-width: 480px) { 
    grid-template-columns: none;
    width:90%;
  }
  
  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    text-align:center;
    li {
      vertical-align: middle;
      height: 420px;
      flex-direction: row;
      align-items: center;
    }
    img {
      align-self: center;
      max-width: 245px;
    }

    > strong {
      font-size: 1rem;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
      text-align: center;
      height:55px;
      margin
    }

    > span {
      font-size: 1.2rem;
      font-weight: bold;
      margin: 5px 5px 20px;
      text-align: right;
    }

    button {
      background: rgb(120, 217, 138);
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;

      display: flex;
      align-items: center;
      transition: background 0.2s;

      &:hover {
        background-color:#f4cc04;
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 5px;
        }
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
`;
