import './styles/Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p>ToDoList. © {new Date().getFullYear()} M. Niewola </p>
            </div>
        </footer>
    );
}

export default Footer;
