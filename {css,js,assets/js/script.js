// FORGE FITNESS - script.js (JavaScript puro)

// ===== CONFIGURAÇÃO =====
// Coloque seu número com código do país e DDD, somente dígitos.
// Exemplo (Brasil, Pernambuco): "5581999999999"
const NUMERO_WHATSAPP = "5581984824993";

// ===== Menu responsivo =====
const menuBotao = document.getElementById("menuBotao");
const menu = document.getElementById("menu");
if (menuBotao && menu) {
  menuBotao.addEventListener("click", function () {
    const aberto = menu.classList.toggle("aberto");
    menuBotao.setAttribute("aria-expanded", aberto);
  });
}

// ===== Ano atual no rodapé =====
const ano = document.getElementById("ano");
if (ano) ano.textContent = new Date().getFullYear();

// ===== Formulário de WhatsApp =====
function mostrarErro(texto) {
  const erro = document.getElementById("erroForm");
  erro.textContent = texto;
  erro.hidden = false;
}

function enviarWhatsApp(evento) {
  evento.preventDefault(); // impede o envio padrão do formulário

  // 1. Captura os valores dos campos
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const assunto = document.getElementById("assunto").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  // 2. Verifica campos obrigatórios
  if (!nome || !email || !assunto || !mensagem) {
    mostrarErro("Preencha todos os campos antes de enviar.");
    return;
  }

  // 3. Validação básica de e-mail
  const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!padraoEmail.test(email)) {
    mostrarErro("Digite um e-mail válido, por exemplo nome@email.com.");
    return;
  }

  // 4. Confere se o número foi configurado
  if (!/^\d{10,15}$/.test(NUMERO_WHATSAPP)) {
    mostrarErro("O número de WhatsApp ainda não foi configurado em js/script.js.");
    return;
  }

  // 5. Monta a mensagem organizada
  const texto =
    "Olá! Mensagem enviada pelo site FORGE FITNESS.\n\n" +
    "Nome: " + nome + "\n" +
    "E-mail: " + email + "\n" +
    "Assunto: " + assunto + "\n" +
    "Mensagem: " + mensagem;

  // 6. Codifica e abre o WhatsApp (o usuário confirma o envio lá)
  const url = "https://wa.me/" + NUMERO_WHATSAPP + "?text=" + encodeURIComponent(texto);
  document.getElementById("erroForm").hidden = true;
  window.open(url, "_blank", "noopener");
}

const formContato = document.getElementById("formContato");
if (formContato) formContato.addEventListener("submit", enviarWhatsApp);
