import styled from 'styled-components';

export const FormLoginS = styled.form`
  display: flex;
  flex-direction: column;
  input {
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    border-radius: 5px;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }
  input:focus {
    background: #dbdbdb;
  }
  button {
    margin-top: 10px;
    text-transform: uppercase;
    outline: 0;
    background: #e5383b;
    width: 100%;
    border: 0;
    border-radius: 5px;
    padding: 15px;
    color: #ffffff;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
  }
  button:hover {
    background-color: #660708;
  }
`;
