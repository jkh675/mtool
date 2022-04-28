import styles from "../styles/MinecraftButton.module.css";

function MinecraftButton (props) {
    return (
        <button className={styles.container} style={props.style || {}} onClick={props.onClick}>
            {props.text}
        </button>
    )
}

export default MinecraftButton;