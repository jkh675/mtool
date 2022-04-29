import {
    Switch,
    FormGroup,
    FormControlLabel,
} from "@mui/material"
import style from "/styles/fireworkGenerator/FireworkConfigurationsSwitch.module.css";

function FireworkConfigurationsSwitch(props) {
    const { t, setTrail, trail, setFlicker, flicker } = props;
    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Switch
                        color="warning"
                        checked={trail}
                        onChange={setTrail}
                    />
                }
                label={
                    <p className={style.switcherText}>
                        {t("FireworkConfigurationsSwitch.TrailSwitchText")}
                    </p>
                }
            />
            <FormControlLabel
                control={
                    <Switch
                        color="warning"
                        checked={flicker}
                        onChange={setFlicker}
                    />
                }
                label={
                    <p className={style.switcherText}>
                        {t("FireworkConfigurationsSwitch.FlickerSwitchText")}
                    </p>
                }
            />
        </FormGroup>
    );
}

export default FireworkConfigurationsSwitch;