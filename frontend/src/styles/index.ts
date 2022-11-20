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
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
  button {
    margin-top: 10px;
    text-transform: uppercase;
    outline: 0;
    background-color: rgb(47, 193, 140);
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

  button:nth-child(even) {
    background-color: #e5383b;
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
  div {
    display: flex;
    align-items: center;
    p {
      font-size: 30px;
    }
    span {
      font-size: 20px;
    }
    img {
      width: 50px;
    }
    button {
      text-transform: uppercase;
      outline: 0;
      background-color: #e5383b;
      border: 0;
      border-radius: 5px;
      padding: 5px;
      color: #ffffff;
      font-size: 10px;
      -webkit-transition: all 0.3 ease;
      transition: all 0.3 ease;
      cursor: pointer;
    }
    button:hover {
      background: #0b090a;
      cursor: pointer;
    }
  }
`;

export const MainS = styled.main`
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: 10px;
  max-width: 1000px;
  width: 100%;
  padding: 45px;
  text-align: center;
  overflow: hidden;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const MainForFormS = styled.main`
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: 10px;
  max-width: 350px;
  width: 100%;
  padding: 45px;
  text-align: center;
  overflow: hidden;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const ProfileS = styled.div`
  color: #f5f3f4;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  width: 95%;
  z-index: 1;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  backdrop-filter: blur(8px);
`;

export const SidebarS = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(31, 30, 30, 0.192);
  backdrop-filter: blur(8px);
  width: 25%;
  max-width: 200px;
  border-radius: 10px;
  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
  button:hover {
    color: #660708;
    transform: scale(1.05);
  }
`;

export const ProfileInfoS = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  img {
    padding: 10px;
    width: 100%;
    max-width: 200px;
  }
  margin-bottom: 20px;
`;

export const NavCategoriesS = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 200px;
  button {
    transition: transform 0.2s;
  }
  button:hover {
    color: #660708;
    transform: scale(1.2);
  }
`;

export const ContentS = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const TableS = styled.div`
  padding-left: 50px;
  display: flex;
  flex-direction: row;
  width: 100%;
  font-size: 15px;
  text-align: center;
  td,
  th {
    border: 1px solid #ddd;

    @media screen and (min-width: 600px) {
      white-space: nowrap;
      padding: 8px;
    }
  }
  th {
    background-color: rgb(47, 193, 140, 0.8);
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    color: white;
  }

  td {
    background-color: #32a79169;
  }

  tr:nth-child(even) {
    background-color: #267a6a69;
  }
  tr:hover {
    background-color: rgb(33, 158, 188);
  }
`;
