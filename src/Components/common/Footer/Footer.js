import './styles.css';
import logo from './EXTRA.png';
import masterCard from './mc_symbol.svg';

function Footer() {
  return (
    <footer id="footer" className="pb-4 pt-4">
      <div className="container">
        <div className="d-flex justify-content-between">
          <div id="pagos">
            <span>Puedes realizar tu pago online con:</span>
            <div>
              <img
                src="https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png"
                alt="visa"
              />
              <img src={masterCard} alt="master" />
              <img
                src="https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/1.8.0/package/dist/img/logos/dls-logo-bluebox-solid.svg"
                alt="american"
              />
            </div>
          </div>
          <div>
            <img src={logo} alt="Logo ExtraBits" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
