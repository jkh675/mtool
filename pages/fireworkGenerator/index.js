import style from "/styles/fireworkGenerator/FireworkGenerator.module.css";
import {
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Fab,
    Button,
    Snackbar,
    Alert,
    Slider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";


import React from "react"

import FireworkConfigurations from "/components/fireworkGenerator/FireworkConfigurations";
import FireworkGeneratorCraftingTable from "/components/fireworkGenerator/FireworkGeneratorCraftingTable";
import FireworkGeneratorCommand from "/components/fireworkGenerator/FireworkGeneratorCommand";

import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";


function FireworkGenerator () {
    const { t } = useTranslation("common");
    const [fireworkData, setFireworkData] = React.useState({
        Fireworks: {
            Flight: 1,
            Explosions: [
                {
                    Flicker: false,
                    Trail: false,
                    Type: -1,
                    Colors: [
                        /*RGB颜色计算公式：
                    红 + 绿*256 + 蓝*65536
                    例：
                    白色=255+255*256+255*65536=16777215
                    */
                    ],
                    FadeColors: [],
                },
            ],
        },
    });
    
    const [effectFullAlertState, setEffectFullAlertState] = React.useState(false)
    const addExplosionEffect = () => {
        if (fireworkData.Fireworks.Explosions.length + 1 == 8) {
            setEffectFullAlertState(true)
        } else {
            const newFireworkData = { ...fireworkData };
            newFireworkData.Fireworks.Explosions.push({
                Flicker: false,
                Trail: false,
                Type: -1,
                Colors: [],
                FadeColors: [],
            });
            setFireworkData(newFireworkData);
        }
    };
    const deleteEffect = (index) => {
        const newFireworkData = { ...fireworkData };
        newFireworkData.Fireworks.Explosions.splice(index, 1);
        setFireworkData(newFireworkData);
    };

    return (
        <Grid
            container
            className={style.fireworkGeneratorContainerGrid}
            gap={1}
            justifyContent="space-around"
        >
            <Snackbar
                open={effectFullAlertState}
                autoHideDuration={2000}
                onClose={() => setEffectFullAlertState(false)}
            >
                <Alert
                    onClose={() => setEffectFullAlertState(false)}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {t("FireworkGenerator.EffectFullAlert")}
                </Alert>
            </Snackbar>
            <Grid
                item
                xs={5.7}
                className={style.fireworkGeneratorConfigurationsContainer}
                style={{
                    position: "relative",
                    top: "0",
                    bottom: "0",
                }}
            >
                <p>{t("FireworkGenerator.FlightTime")}</p>
                <Slider
                    defaultValue={1}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => {
                        return `${value}s`;
                    }}
                    value={fireworkData.Fireworks.Flight}
                    onChange={(event, value) => {
                        const newFireworkData = { ...fireworkData };
                        newFireworkData.Fireworks.Flight = value;
                        setFireworkData(newFireworkData);
                    }}
                    step={1}
                    marks
                    min={1}
                    max={Math.min(
                        9 - fireworkData.Fireworks.Explosions.length - 1,
                        3
                    )}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="warning"
                    sx={{ fontFamily: "Minecraft" }}
                    onClick={addExplosionEffect}
                >
                    {t("FireworkGenerator.AddEffect")}
                </Button>
                {fireworkData.Fireworks.Explosions.map((explosion, index) => {
                    return (
                        <Accordion key={index} TransitionProps={{unmountOnExit: true}}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <p style={{ margin: 10 }}>
                                    {t(
                                        "FireworkGenerator.AccordionSummaryEffectTitle"
                                    )}{" "}
                                    : {index}{" "}
                                </p>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Fab
                                    variant="extended"
                                    style={{ float: "right" }}
                                    onClick={() => {
                                        deleteEffect(index);
                                    }}
                                >
                                    <DeleteIcon />{" "}
                                    {t("FireworkGenerator.DeleteEffect")}
                                </Fab>
                                <FireworkConfigurations
                                    key={index}
                                    t={t}
                                    firework={fireworkData}
                                    setFirework={setFireworkData}
                                    index={index}
                                />
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
            </Grid>
            <Grid
                item
                xs={5.7}
                className={style.fireworkGeneratorResultContainer}
            >
                <FireworkGeneratorCraftingTable t={t} firework={fireworkData} />
                <FireworkGeneratorCommand t={t} firework={fireworkData}/>
            </Grid>
        </Grid>
    );
}

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common"])),
    },
});

export default FireworkGenerator;