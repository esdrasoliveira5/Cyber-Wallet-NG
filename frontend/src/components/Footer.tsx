import github from '../../resources/gitHub.png';
import { FooterS } from '../styles';

function Footer() {
  return (
    <FooterS>
      <p>© Cyber Wallet by Esdras Oliveira</p>
      <div>
        <a href="https://linkedin.com/in/esdrasmoliveira" target="blank" rel="noreferrer">
          <img
            src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg"
            alt="esdrasmoliveira"
            height="30"
            width="30"
          />
        </a>
        <a href="https://github.com/esdrasoliveira5" target="blank" rel="noreferrer">
          <img src={github} alt="esdrasm.oliveira" height="30" width="30" />
        </a>
      </div>
    </FooterS>
  );
}

export default Footer;
