import styled from 'styled-components';

export const FormS = styled.form`
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

export const PageS = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 100vh;
  overflow: hidden;
`;

export const FooterS = styled.footer`
  background-color: #0b090a;
  color: #f5f3f4;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 10;
`;

export const HeaderS = styled.header`
  font-size: 15px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  background-color: rgb(47, 193, 140, 0.8);
  color: #f5f3f4;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  img {
    width: 200px;
  }
`;

export const MainS = styled.main`
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: 10px;
  max-width: 350px;
  width: 100%;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  overflow: hidden;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  img {
    width: 100%;
  }
  @media screen and (max-width: 1100px) {
    position: absolute;
    width: 80%;
  }
  @media screen and (max-width: 600px) {
    position: absolute;
    width: 100%;
    margin-top: 100px;
    max-width: 500px;
  }
`;
