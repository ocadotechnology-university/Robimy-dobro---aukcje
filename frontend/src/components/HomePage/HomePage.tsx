import "./HomePage.css"
import React from "react";
import homeImage from "../../image/homeImage.svg"

function ContextPanel() {
    return (
        <main className="HomePage">
            <div className="ImageFrame">
                <img src={homeImage} alt="HomePage Image" />
            </div>
            <div className="ButtonFrame">
                <span>Sprawdź, co możesz wylicytować na aukcjach:</span>
                <button>Zobacz aukcje</button>
            </div>
            <div className="TextFrame">
                <header>Licytuj i pomagaj!</header>
                <p>Dołącz do naszej wyjątkowej inicjatywy, w której każda aukcja to szansa na wsparcie potrzebujących. Licytuj unikalne przedmioty i przeżycia, a cały dochód trafia na szczytny cel. <b>Razem możemy więcej!</b></p>
                <p>Od 2019 roku rozświetliliśmy serca rodzin ze Szlachetnej Paczki oraz wielu potrzebujących dzieci. W zeszłym roku zebraliśmy imponujące <b>40.000 PLN</b>, co dowodzi, że razem jesteśmy w stanie zdziałać wielkie rzeczy! </p>
                <header>Informacje ogólne</header>
                <p>Licytacje auckji odbą się na <b>Slacku</b> <b><span style={{color: 'red'}}>#licytacje-robimy-dobro-2025</span></b> w dniach <b>21-23 listopada</b> w godzinach <b>10:00-15:00</b>. </p>
                <header>Do zobaczenia!</header>
            </div>
        </main>
    );
}

export default ContextPanel;
