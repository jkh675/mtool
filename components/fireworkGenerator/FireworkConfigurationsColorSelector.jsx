import {
    Grid,
    Stack,
    Divider,
    Button,    
} from "@mui/material"
import React from "react"


import FireworkConfigurationsColorListItem from "./FireworkConfigurationsColorListItem";

function FireworkConfigurationsColorSelector (props) {
    const { t, addMainColor, setMainColor, mainColors, deleteMainColor, addFadeColor, setFadeColor, fadeColors, deleteFadeColor } = props;

    return (
        <Grid container mt={1} spacing={2}>
            <Grid xs={6} item>
                <Stack divider={<Divider orientation="vertical" flexItem />}>
                    <Button
                        color="warning"
                        style={{ fontFamily: "Minecraft", fontSize: "2.5vh" }}
                        variant="contained"
                        onClick={addMainColor}
                    >
                        {t("FireworkConfigurationsColorSelector.AddColorTitle")}
                    </Button>
                    {mainColors.map((color, index) => (
                        <FireworkConfigurationsColorListItem
                            key={index}
                            index={index}
                            color={color}
                            setColor={setMainColor}
                            deleteColor={deleteMainColor}
                            t={t}
                        />
                    ))}
                </Stack>
            </Grid>
            <Grid xs={6} item>
                <Stack
                    divider={<Divider orientation="vertical" flexItem />}
                >
                    <Button
                        color="warning"
                        style={{ fontFamily: "Minecraft", fontSize: "2.5vh" }}
                        variant="contained"
                        onClick={addFadeColor}
                    >
                        {t(
                            "FireworkConfigurationsFadeColorSelector.AddColorTitle"
                        )}
                    </Button>
                    {fadeColors.map((color, index) => (
                        <FireworkConfigurationsColorListItem
                            key={index}
                            index={index}
                            color={color}
                            setColor={setFadeColor}
                            deleteColor={deleteFadeColor}
                            t={t}
                        />
                    ))}
                </Stack>
            </Grid>
        </Grid>
    );
}

export default FireworkConfigurationsColorSelector;