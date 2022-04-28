import "../styles/globals.css";
import { appWithTranslation } from "next-i18next";
import styles from "../styles/Home.module.css";
import Link from "next/link";


function App ({ Component, pageProps }) {
    return (
        <div>
            <div className={styles.backdrop}></div>

            <div className={styles.topbar}>
                <Link href="/">
                    <a>Minecraft Tools</a>
                </Link>
            </div>

            <Component {...pageProps} />
            {/*<footer className={styles.footer}>
                <a
                    href="https://www.npmjs.com/package/minecraft-textures"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Creadit to destruc7i0n for minecraft-textures
                </a>
    </footer>*/}
        </div>
    );
}


export default appWithTranslation(App);
