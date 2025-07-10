document.addEventListener("DOMContentLoaded", () => {
  const footerHTML = `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-brand">
          <div class="logo-box">
            <img src="/src/images/LogoRTEscuro.png" alt="Logo RedeTalentos" class="footer-logo" />
          </div>
          <p>
            Conectando talentos e acelerando inovação<br>
            através de mentorias especializadas para o crescimento de negócios tecnológicos.
          </p>
          <span>&copy; 2025 RedeTalentos. Todos os direitos reservados.</span>
        </div>

        <div class="footer-contact">
          <h3>Contato</h3>
          <ul>
            <li><a href="mailto:contato@redetalentos.com">contato@redetalentos.com</a></li>
            <li>(48) 9 9999-9999</li>
            <li>Criciúma, SC</li>
          </ul>
        </div>
      </div>
    </footer>
  `;

  document.body.insertAdjacentHTML("beforeend", footerHTML);
});
