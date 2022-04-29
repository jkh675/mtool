import {
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    Collapse,
} from "@mui/material"
import React from "react";

function FireworkConfigurationsTypeSelector (props) {
    const { t, setType, type } = props;

    return (
        <div>
            <FormControl fullWidth variant="outlined" color="warning">
                <InputLabel
                    id="demo-simple-select-label"
                    style={{ fontFamily: "Minecraft" }}
                >
                    {t("FireworkConfigurationsTypeSelector.Selector.Title")}
                </InputLabel>
                <Select
                    style={{ fontFamily: "Minecraft" }}
                    label={t(
                        "FireworkConfigurationsTypeSelector.Selector.Title"
                    )}
                    value={type}
                    onChange={setType}
                >
                    <MenuItem value={-1} style={{ fontFamily: "Minecraft" }}>
                        {t("FireworkConfigurationsTypeSelector.None")}
                    </MenuItem>
                    <MenuItem value={0} style={{ fontFamily: "Minecraft" }}>
                        {t("FireworkConfigurationsTypeSelector.SmallBall")}
                    </MenuItem>
                    <MenuItem value={1} style={{ fontFamily: "Minecraft" }}>
                        {t("FireworkConfigurationsTypeSelector.BigBall")}
                    </MenuItem>
                    <MenuItem value={2} style={{ fontFamily: "Minecraft" }}>
                        {t("FireworkConfigurationsTypeSelector.Star")}
                    </MenuItem>
                    <MenuItem value={3} style={{ fontFamily: "Minecraft" }}>
                        {t("FireworkConfigurationsTypeSelector.Creeper")}
                    </MenuItem>
                    <MenuItem value={4} style={{ fontFamily: "Minecraft" }}>
                        {t("FireworkConfigurationsTypeSelector.Blast")}
                    </MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default FireworkConfigurationsTypeSelector;