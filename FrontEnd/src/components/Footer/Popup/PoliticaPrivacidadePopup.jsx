import { FaTimes, FaPhone } from "react-icons/fa";
import "../Footer.css"

export const PoliticaPrivacidadePopup = ({closePopup}) => {

    return (
    <div className="popup-overlay" onClick={closePopup}>
        <div className="popup-content-politica" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>
                <FaTimes />
            </button>
            <div className="text-content">
                <h3>AVISO DE PRIVACIDADE</h3>
                <p>
                    Na qualidade de intermediadora da aquisição de serviços de turismo, a R11 TRAVEL VIAGENS E TURISMO LTDA. (“R11 TRAVEL”), comprometida com a privacidade e segurança das informações coletadas ao longo do processo de compra de serviços e produtos em seu website, elaborou a presente política de privacidade (“Política de Privacidade”), que descreve como os dados de seus clientes são coletados, utilizados, armazenados e protegidos, nos termos da Lei 12.965/2014.
                </p>
                <p>
                    Ao acessar o site https://www.r11travel.com.br/, o usuário declara estar ciente e concordar com as práticas descritas nesta Política de Privacidade.
                </p>

                <br />
                <br />

                <h3>INFORMAÇÕES COLETADAS E SUA FINALIDADE</h3>

                <p>
                    Para efetuar a reserva dos serviços turísticos ou adquirir os produtos oferecidos por meio do site https://www.r11travel.com.br/ o cliente deve prestar determinadas informações pessoais suas e/ou de terceiros, tais como nome completo, números de documentos de identificação, qualificações, endereço e dados completos do cartão de crédito que será utilizado para pagamento.
                </p>
                <p>
                    Tais informações, quando solicitadas, são essenciais para a contratação dos serviços ou aquisição dos produtos dos respectivos fornecedores, podendo a reserva ou a compra não serem concluídas, caso alguma destas informações não seja fornecida.
                </p>
                <p>
                    Caso o cliente esteja fazendo uma reserva ou adquirindo um produto em nome ou para terceiros, deverá ter o prévio consentimento destes para fornecer suas informações pessoais, acrescentando-se a isso, quando tratar-se de menores de idade, da autorização legal para fazê-lo.
                </p>
                <p>
                    Algumas informações do cliente podem ser obtidas, ainda, de outras fontes, como cadastros de prestadores dos serviços de turismo oferecidos no website, órgãos públicos, entidades privadas ou por meio de aplicativos interativos, e serem utilizadas em conjunto com as informações prestadas pelo cliente.
                </p>
                <p>
                    Por fim, determinadas informações são colhidas e armazenadas automaticamente por nossos sistemas quando do acesso e utilização de nossas plataformas digitais pelo cliente ou pelo seu acesso a nossa publicidade na internet, incluindo-se em tais informações o IP (internet protocol) de acesso, tipo de navegador, páginas visitadas em nosso website e buscas realizadas, coletadas por meio de cookies.
                </p>

                <br />
                <br />

                <h3>COOKIES</h3>

                <p>
                    Cookies são programas ou dados enviados pelo nosso website para o navegador utilizado pelo cliente para que ele e suas preferências sejam reconhecidos em seu próximo acesso ao website, garantindo uma melhor experiência e recursos personalizados.
                </p>
                <p>
                    Os principais navegadores de internet permitem o gerenciamento da utilização de cookies, sendo possível desabilitá-los seguindo os procedimentos informados pelos respectivos criadores de cada navegador nos seguintes endereços:
                </p>
                <br />
                <ul>
                    <li>Google Chrome: (https://support.google.com/chrome/answer/95647?hl=pt-BR)</li>
                    <li>Internet Explorer: (http://windows.microsoft.com/pt-br/internet-explorer/delete-manage-cookies#ie=ie-11)</li>
                    <li>Firefox: (https://support.mozilla.org/pt-BR/kb/ativando-e-desativando-cookies)</li>
                    <li>Safari: (http://safari.helpmax.net/ps/privacidade-e-seguranca/como-remover-cookies/)</li>
                    <li>Opera: (http://help.opera.com/Windows/10.20/pt/history.html)</li>
                </ul>

                <br />
                <br />

                <h3>CONTROLE DO CLIENTE</h3>
                <h5>– Renúncia (opt-out)</h5>
                <p>
                    Quando você realizar transações ou registrar-se seu e-mail no Site da Royal Caribbean, lhe daremos a opção de receber boletins promocionais, mensagens ou alertas de e-mail sobre ofertas. Em cada mensagem de e-mail enviada, também lhe daremos a oportunidade de cancelar sua subscrição no próprio corpo do e-mail enviado ou através da nossa página de contato https://www.r11travel.com.br/fale-conosco/.
                </p>

                <p>
                    Esteja ciente de que o exercício do direito de opt-out refere-se aos boletins promocionais, mensagens ou alertas de e-mail sobre ofertas. Nesse sentido, você continuará recebendo comunicações referentes ao estado das suas reservas ativas. Em determinados casos, inclusive, a R11 Travel deverá manter nos seus arquivos determinadas Informações Pessoais, com a finalidade de resolver disputas ou reclamações, detectar problemas ou incidências e solucioná-los, e cumprir as disposições dos Termos e Condições Gerais por um período de tempo determinado pela legislação. Em qualquer caso, as Informações Pessoais de um usuário não serão retiradas imediatamente dos nossos arquivos por motivos legais e técnicos, incluindo-se os sistemas de suporte de segurança. Portanto, embora a R11 Travel comprometa-se a empregar seus melhores esforços considerando-se o estado da técnica, poderá ocorrer que nem todas as Informações Pessoais sejam definitivamente eliminadas.
                </p>

                <h5>– Acesso, cancelamento, retificação e oposição.</h5>
                <p>
                    Nos termos da legislação em vigor, o cliente tem direito ao acesso às informações sobre ele armazenadas, bem como a solicitar a sua retificação ou exclusão. Para exercer qualquer destas hipóteses, deverá acessar a página https://www.r11travel.com.br/fale-conosco/.
                </p>
                <br />
                <br />
                
                <h3>COMPARTILHAMENTO DE INFORMAÇÕES</h3>
                <p>
                    Considerando que a R11 Travel é intermediadora de serviços e produtos de turismo prestados ou fornecidos por outras empresas, as informações obtidas ou fornecidas pelos clientes serão compartilhadas com as mesmas para gerenciamento das reservas e/ou solicitações de compras, e estão sujeitas ao mesmo tratamento confidencial dispensado por nós.
                </p>
                <p>
                    As informações pessoais poderão também ser compartilhadas com autoridade pública mediante requisição judicial ou decorrente de aplicação de normativa, ou, ainda, com empresa que venha a ser adquirida ou adquirir a R11 Travel, subsidiária ou nova empresa que venha a ser constituída no exercício de seu objeto social.
                </p>
                <p>
                    Caso o cliente voluntariamente preste informações diretamente aos prestadores de serviços ou fornecedores de produtos turísticos, estas serão tratadas de acordo com as políticas de privacidades dos respectivos prestadores ou fornecedores, não sendo a R11 Travel responsável por eventual uso indevido das informações pessoais.
                </p>
                <br />
                <br />

                <h3>ARMAZENAMENTO E PROTEÇÃO DAS INFORMAÇÕES</h3>    
                <p>
                    Todas as informações pessoais são armazenadas em servidores localizados no Brasil, servidores com as especificações legais de segurança, as informações são criptografadas e tratadas com o nível de proteção exigível por lei para garantir sua segurança e evitar perdas, alterações e acessos não autorizados.
                </p>
                <p>
                    As transações de pagamento são executadas com a tecnologia SSL (Secure Socker Layer), de modo a assegurar que as informações jamais sejam divulgadas, transmitidas ou acessadas indevidamente.
                </p>
                <p>
                    Em caso de dúvidas, o cliente pode entrar em contato pelo telefone (11) 4760-9311, e-mail privacidade@r11travel.com.br, ou por carta ao endereço R. Espírito Santo, 315 – Santo Antônio, São Caetano do Sul – SP, 09530-700.
                </p>


            </div>

        </div>
    </div>

)

};


