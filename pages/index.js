import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import MinecraftButton from "../components/MinecraftButton"
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function Home () {
    const { t } = useTranslation("common");
    return (
        <div className={styles.container}>
            <Head>
                <title>Minecraft Tool</title>
                <link rel="icon" href="/favicon.ico" />
                <script async src="https://storage.googleapis.com/vrview/2.0/build/vrview.min.js"></script>
            </Head>

            <main>
                <div className={styles.functionSelect}>
                    <Link href="/fireworkGenerator">
                        <a>
                            <MinecraftButton
                                style={{ fontSize: 25 }}
                                text={t("fireworkGeneratorButtonText")}
                            />
                        </a>
                    </Link>
                </div>
            </main>
        </div>
    );
}

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common"])),
    },
});

export default Home;
