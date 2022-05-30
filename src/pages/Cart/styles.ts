import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 4px;

  footer {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const ProductTable = styled.table`
  width: 100%;

  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }

  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }

  img {
    height: 100px;
  }

  strong {
    color: #333;
    display: block;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 1.5rem;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #666;
      padding: 6px;
      width: 50px;
    }
  }

  button {
    background: none;
    border: 0;
    padding: 6px;

    svg {
      color: rgb(120,217,138);
      transition: color 0.2s;
    }

    &:hover {
      svg {
        color: ${darken(0.06, '#f4cc04')};
      }
    }

    &:disabled {
      svg {
        color: ${lighten(0.25, '#f4cc04')};
        cursor: not-allowed;
      }
    }
  }
  @media all and (min-width: 768px) and (max-width: 1024px) {
  }
  @media all and (min-width: 480px) and (max-width: 768px) {
    thead th {
      text-align: left;
      padding: 3px;
    }
    tbody td {
      padding: 2px;
    }
  }
  @media all and (max-width: 480px) { 
    font-size: 0.7rem;
    thead th {
      text-align: left;
      padding: 2px;
    }
    tbody td {
      padding: 2px;
    }
    span {
      font-size: 1rem;
    }
    img {
      height: 50px;
    }
  }

`;

export const Total = styled.div`
  display: flex;
  align-items: baseline;
  margin-left:auto;
  margin-right:0;
  max-width:300px;

  span {
    color: #999;
    font-weight: bold;
  }

  strong {
    font-size: 1.8rem;
    margin-left: 5px;
  }
`;

export const footer = styled.footer`
  text-align: right;
  margin-left:auto;
  margin-right:0;
`;
