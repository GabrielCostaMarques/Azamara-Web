import "./alwaysInclude.css";

export default function AlwaysInclude() {
    return (
        <>
            <div className="Azamara-section">
                <div className="containerAlways">
                    <div className="content">
                        <div className="left-section">
                            <h2 className="heading">
                                <span className="always-text">ALWAYS</span> INCLUDED
                            </h2>
                            <ul className="list">
                                <li className="list-item">Variedade de restaurantes e serviço de quarto</li>
                                <li className="list-item">Bebidas (incluindo alcoólica) todo dia e noite</li>
                                <li className="list-item">Gorjetas e taxas de serviço</li>
                                <li className="list-item">Eventos culturais e exclusivos</li>
                                <li className="list-item">Serviço ilimitado de lavanderia self-service</li>
                            </ul>
                        </div>

                        <div className="divider"></div>

                        <div className="right-section">
                            <h2 className="heading">
                                <span className="always-text">ALWAYS</span> EXPECTED
                            </h2>
                            <ul className="list">
                                <li className="list-item">Sem complicações e multidões</li>
                                <li className="list-item">Destinos únicos e emblemáticos</li>
                                <li className="list-item">Pernoites e paradas estendidas nos destinos</li>
                            </ul>
                        </div>

                        <div className="logo-section">
                            <div className="logo-container">
                                <span className="always-logo">ALWAYS</span>
                                <div className="star">✦</div>
                            </div>
                            <span className="azamara-logo">AZAMARA<i className="regitered">®</i></span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}