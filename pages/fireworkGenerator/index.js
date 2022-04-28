import MinecraftItem from "/components/MinecraftItem";
import MinecraftCompositeTable from "/components/MinecraftCompositeTable";
import ColorSelectorListItem from "/components/ColorSelectorListItem";
import MinecraftButton from "/components/MinecraftButton";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react"
import style from "/styles/FireworkGenerator.module.css";

import {
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormGroup,
    Switch,
    Slider,
    Input,
    Grid,
    Paper,
    Fab,
    Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const convertToRGBObject = (str) => {
    let trimStr = str.replace("#","")
    var aRgbHex = trimStr.match(/.{1,2}/g);
    var aRgb = {
        R: parseInt(aRgbHex[0], 16),
        G: parseInt(aRgbHex[1], 16),
        B: parseInt(aRgbHex[2], 16)
    };
    return aRgb;
};

function FireworkGenerator () {
    const { t } = useTranslation("common");
    const [fireworkProp, setFireworkProp] = React.useState({
        Fireworks: {
            Flight: 3,
            Explosions: [
                {
                    Flicker: false,
                    Trail: false,
                    Type: -1 /* 0 = 小球, 1 = 大球 ，2 = 星星，3 = 苦力怕頭顱，4 = 爆裂 */,
                    Colors: [
                        /*RGB颜色计算公式：
                            红 + 绿*256 + 蓝*65536
                            例：
                            白色=255+255*256+255*65536=16777215*/,
                    ],
                    FadeColors: [],
                },
            ],
        },
    });
    const [commandString, setCommandString] = React.useState("/give @s minecraft:firework 1");
    
    React.useEffect(() => {
        var fireworkparms = fireworkProp;
        fireworkparms.Fireworks.Flight = fireworkProp.Fireworks.Flight;
        if (fireworkparms.Fireworks.Explosions[0].Trail == false) {
            delete fireworkparms.Fireworks.Explosions[0].Trail;
        }
        if (fireworkparms.Fireworks.Explosions[0].Flicker == false) {
            delete fireworkparms.Fireworks.Explosions[0].Flicker;
        }
        if (fireworkparms.Fireworks.Explosions[0].Type == -1) {
            delete fireworkparms.Fireworks.Explosions[0].Type;
        }
        if (fireworkparms.Fireworks.Explosions[0].Colors) {
            if (fireworkparms.Fireworks.Explosions[0].Colors.length == 0) {
                delete fireworkparms.Fireworks.Explosions[0].Colors;
            } else {
                if (fireworkparms.Fireworks.Explosions[0].Colors[0] == null) {
                    delete fireworkparms.Fireworks.Explosions[0].Colors;
                }
            }
        } else {
            delete fireworkparms.Fireworks.Explosions[0].Colors;
        }
        if (fireworkparms.Fireworks.Explosions[0].FadeColors) {
            if (fireworkparms.Fireworks.Explosions[0].FadeColors.length == 0) {
                delete fireworkparms.Fireworks.Explosions[0].FadeColors;
            }
        } else {
            delete fireworkparms.Fireworks.Explosions[0].FadeColors;
        }

        try {
            if (fireworkparms.Fireworks.Explosions[0].FadeColors[0].toString().search("I;") == -1) {
                fireworkparms.Fireworks.Explosions[0].FadeColors[0] =
                    "I;"+fireworkparms.Fireworks.Explosions[0].FadeColors[0];
            }
        } catch {
            
        }
        try {
            if (
                fireworkparms.Fireworks.Explosions[0].Colors[0]
                    .toString()
                    .search("I;") == -1
            ) {
                fireworkparms.Fireworks.Explosions[0].Colors[0] =
                    "I;" + fireworkparms.Fireworks.Explosions[0].Colors[0];
            }
        } catch {
            
        }


        if (Object.keys(fireworkparms.Fireworks.Explosions[0]).length === 0){
            if (fireworkparms.Fireworks.Flight) {
                setCommandString(
                    `/give @s minecraft:firework_rocket{"Fireworks":{"Flight":${fireworkparms.Fireworks.Flight}}}`
                );
            } else {
                setCommandString(
                    `/give @s minecraft:firework_rocket`
                );
            }
        } else {
            setCommandString(
                `/give @s minecraft:firework_rocket${JSON.stringify(fireworkProp).replace(/"/g,"")}`
            );
        }
    }, [fireworkProp]);

    const onFirworkExplosionsTypeChange = (event, newValue) => {
        setFireworkProp({
            ...fireworkProp,
            Fireworks: {
                ...fireworkProp.Fireworks,
                Explosions: [
                    {
                        ...fireworkProp.Fireworks.Explosions[0],
                        Type: newValue,
                    },
                ],
            },
        });
    }

    const onFlickerSwitchChange = (event) => {
        setFireworkProp({
            ...fireworkProp,
            Fireworks: {
                ...fireworkProp.Fireworks,
                Explosions: [
                    {
                        ...fireworkProp.Fireworks.Explosions[0],
                        Flicker: event.target.checked,
                    },
                ],
            },
        });
    }

    const onTrailSwitchChange = (event) => {
        setFireworkProp({
            ...fireworkProp,
            Fireworks: {
                ...fireworkProp.Fireworks,
                Explosions: [
                    {
                        ...fireworkProp.Fireworks.Explosions[0],
                        Trail: event.target.checked,
                    },
                ],
            },
        });
    }

    const onFlightSliderChange = (event) => {
        setFireworkProp({
            ...fireworkProp,
            Fireworks: {
                ...fireworkProp.Fireworks,
                Flight: event.target.value,
            },
        });
    }

    const onCopyCommandClick = () => {
        try {
            navigator.clipboard.writeText(commandString);
        } catch (error) {
            alert(error);
        }
        try {
            Notification.requestPermission().then(function (permission) {
                var notification = new Notification("Minecraft Tools", {
                    body: t("fireworkGenerator.copyCommandSuccess"),
                });
            });
        } catch (e) { 
            console.error("fail to create notification");
        }
    }
    



    const [mainColor, setMainColor] = React.useState([]);
    const onAddMainColorClick = () => {
        var list = mainColor
        setMainColor([...list, { R: 0, G: 0, B: 0 }]);
    }
    const onMainColorRemoveClick = (index) => {
        var list = mainColor;
        if (list[index]) {
            list.splice(index, 1);
            setMainColor([...list]);
            var colorCodeList = []
            list.map(element => {
                colorCodeList.push(element.colorCode)
            })
            setFireworkProp({
                ...fireworkProp,
                Fireworks: {
                    ...fireworkProp.Fireworks,
                    Explosions: [
                        {
                            ...fireworkProp.Fireworks.Explosions[0],
                            Colors: colorCodeList,
                        },
                    ],
                },
            });
        };
    };
    const onMainColorChange = (index, colorHex) => {
        var list = mainColor
        list[index] = convertToRGBObject(colorHex);
        list[index].colorCode = list[index].R + list[index].G * 256 + list[index].B * 65536;
        setMainColor([...list]);
        var colorCodeList = []
        list.map(element => { 
            colorCodeList.push(element.colorCode)
        })
        setFireworkProp({
            ...fireworkProp,
            Fireworks: {
                ...fireworkProp.Fireworks,
                Explosions: [
                    {
                        ...fireworkProp.Fireworks.Explosions[0],
                        Colors: colorCodeList,
                    },
                ],
            },
        });
    }



    const [fadeColor, setFadeColor] = React.useState([]);
    const onAddFadeColorClick = () => {
        var list = fadeColor;
        setFadeColor([...list, { R: 0, G: 0, B: 0 }]);
    };
    const onFadeColorRemoveClick = (index) => {
        var list = fadeColor;
        if (list[index]) {
            list.splice(index, 1);
            setFadeColor([...list]);
            var colorCodeList = [];
            list.map((element) => {
                colorCodeList.push(element.colorCode);
            });
            setFireworkProp({
                ...fireworkProp,
                Fireworks: {
                    ...fireworkProp.Fireworks,
                    Explosions: [
                        {
                            ...fireworkProp.Fireworks.Explosions[0],
                            FadeColors: colorCodeList,
                        },
                    ],
                },
            });
        }
    };
    const onFadeColorChange = (index, colorHex) => {
        var list = fadeColor;
        list[index] = convertToRGBObject(colorHex);
        list[index].colorCode =
            list[index].R + list[index].G * 256 + list[index].B * 65536;
        setFadeColor([...list]);
        var colorCodeList = [];
        list.map((element) => {
            colorCodeList.push(element.colorCode);
        });
        setFireworkProp({
            ...fireworkProp,
            Fireworks: {
                ...fireworkProp.Fireworks,
                Explosions: [
                    {
                        ...fireworkProp.Fireworks.Explosions[0],
                        FadeColors: colorCodeList,
                    },
                ],
            },
        });
    };

    return (
        <div className={style.container}>
            <h1 style={{ textAlign: "center" }}>
                {t("fireworkGeneratorTitle")}
            </h1>
            <div className={style.fireworkGeneratorGrid}>
                <div>
                    <div className={style.fireworkConfigurationGrid}>
                        <FormControl className={style.fireworkTypeForm}>
                            <h1
                                id="demo-radio-buttons-group-label"
                                className={style.fireworkTypeFormTitle}
                            >
                                {t("fireworkGeneratorExplosionType")}
                            </h1>
                            <RadioGroup
                                value={
                                    fireworkProp.Fireworks.Explosions[0].Type
                                }
                                onChange={onFirworkExplosionsTypeChange}
                            >
                                <FormControlLabel
                                    value={-1}
                                    control={
                                        <Radio
                                            color="warning"
                                            className={style.fireworkTypeRadio}
                                        />
                                    }
                                    label={
                                        <p
                                            className={
                                                style.fireworkTypeRadioText
                                            }
                                        >
                                            {t(
                                                "fireworkGeneratorFireworkTypeNone"
                                            )}
                                        </p>
                                    }
                                />
                                <FormControlLabel
                                    value={0}
                                    control={
                                        <Radio
                                            color="warning"
                                            className={style.fireworkTypeRadio}
                                        />
                                    }
                                    label={
                                        <p
                                            className={
                                                style.fireworkTypeRadioText
                                            }
                                        >
                                            {t(
                                                "fireworkGeneratorFireworkTypeSmallBall"
                                            )}
                                        </p>
                                    }
                                />
                                <FormControlLabel
                                    value={1}
                                    control={
                                        <Radio
                                            color="warning"
                                            className={style.fireworkTypeRadio}
                                        />
                                    }
                                    label={
                                        <p
                                            className={
                                                style.fireworkTypeRadioText
                                            }
                                        >
                                            {t(
                                                "fireworkGeneratorFireworkTypeLargeBall"
                                            )}
                                        </p>
                                    }
                                />
                                <FormControlLabel
                                    value={2}
                                    control={
                                        <Radio
                                            color="warning"
                                            className={style.fireworkTypeRadio}
                                        />
                                    }
                                    label={
                                        <p
                                            className={
                                                style.fireworkTypeRadioText
                                            }
                                        >
                                            {t(
                                                "fireworkGeneratorFireworkTypeStar"
                                            )}
                                        </p>
                                    }
                                />
                                <FormControlLabel
                                    value={3}
                                    control={
                                        <Radio
                                            color="warning"
                                            className={style.fireworkTypeRadio}
                                        />
                                    }
                                    label={
                                        <p
                                            className={
                                                style.fireworkTypeRadioText
                                            }
                                        >
                                            {t(
                                                "fireworkGeneratorFireworkTypeCreeper"
                                            )}
                                        </p>
                                    }
                                />
                                <FormControlLabel
                                    value={4}
                                    control={
                                        <Radio
                                            color="warning"
                                            className={style.fireworkTypeRadio}
                                        />
                                    }
                                    label={
                                        <p
                                            className={
                                                style.fireworkTypeRadioText
                                            }
                                        >
                                            {t(
                                                "fireworkGeneratorFireworkTypeExplosion"
                                            )}
                                        </p>
                                    }
                                />
                            </RadioGroup>
                        </FormControl>
                        <FormGroup className={style.flickerAndTrailSwitchGroup}>
                            <h1 style={{ textAlign: "center" }}>
                                {t("fireworkGeneratorEffectTitle")}
                            </h1>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={
                                            fireworkProp.Fireworks.Explosions[0]
                                                .Flicker
                                        }
                                        onChange={onFlickerSwitchChange}
                                        color="warning"
                                    />
                                }
                                label={
                                    <p className={style.flickerAndTrailSwitch}>
                                        {t("fireworkGeneratorFlickerSwitch")}
                                    </p>
                                }
                            />
                            <br />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={
                                            fireworkProp.Fireworks.Explosions[0]
                                                .Trail
                                        }
                                        onChange={onTrailSwitchChange}
                                        color="warning"
                                    />
                                }
                                label={
                                    <p className={style.flickerAndTrailSwitch}>
                                        {t("fireworkGeneratorTrailSwitch")}
                                    </p>
                                }
                            />
                            <div className={style.flightTimeBlock}>
                                <p style={{ margin: 0 }}>
                                    {t("fireworkGeneratorFlightTime")}
                                </p>
                                <Slider
                                    value={fireworkProp.Fireworks.Flight}
                                    onChange={onFlightSliderChange}
                                    valueLabelDisplay="auto"
                                    max={127}
                                    marks
                                />
                                <Input
                                    value={fireworkProp.Fireworks.Flight}
                                    size="small"
                                    onChange={onFlightSliderChange}
                                    inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 127,
                                        type: "number",
                                        pattern: "[0-9]*",
                                    }}
                                    fullWidth
                                    color="warning"
                                    className={style.flightSliderTextField}
                                />
                            </div>
                            <MinecraftButton style={{width: "100%", textAlign: "center"}} text={t("fireworkGeneratorResetButton")}/>
                        </FormGroup>

                        <div className={style.colorSelectorArea}>
                            <h1 className={style.colorSelectorAreaTitle}>
                                {t("colorSelector.title")}
                            </h1>
                            <Grid container>
                                <Grid
                                    item
                                    xs={6}
                                    className={style.colorSelectorGridItem}
                                >
                                    <Paper
                                        elevation={24}
                                        className={style.colorSelectorPaper}
                                    >
                                        <p
                                            className={
                                                style.mainColorSelectorTitle
                                            }
                                        >
                                            {t("colorSelector.mainColor.title")}
                                        </p>
                                        <Fab
                                            size="small"
                                            color="primary"
                                            variant="extended"
                                            className={style.AddIcon}
                                            onClick={onAddMainColorClick}
                                        >
                                            <AddIcon />
                                            {t(
                                                "colorSelector.mainColor.addColorText"
                                            )}
                                        </Fab>
                                        <Divider />
                                        <div className={style.mainColorList}>
                                            {mainColor.map((element, index) => (
                                                <ColorSelectorListItem
                                                    key={index}
                                                    index={index}
                                                    colorCode={
                                                        element.colorCode
                                                    }
                                                    color={element}
                                                    onChange={onMainColorChange}
                                                    onRemove={
                                                        onMainColorRemoveClick
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </Paper>
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    className={style.colorSelectorGridItem}
                                >
                                    <Paper
                                        elevation={24}
                                        className={style.colorSelectorPaper}
                                    >
                                        <p
                                            className={
                                                style.mainColorSelectorTitle
                                            }
                                        >
                                            {t("colorSelector.fadeColor.title")}
                                        </p>
                                        <Fab
                                            size="small"
                                            color="primary"
                                            variant="extended"
                                            className={style.AddIcon}
                                            onClick={onAddFadeColorClick}
                                        >
                                            <AddIcon />
                                            {t(
                                                "colorSelector.fadeColor.addColorText"
                                            )}
                                        </Fab>
                                        <Divider />
                                        <div className={style.mainColorList}>
                                            {fadeColor.map((element, index) => (
                                                <ColorSelectorListItem
                                                    key={index}
                                                    index={index}
                                                    colorCode={
                                                        element.colorCode
                                                    }
                                                    color={element}
                                                    onChange={onFadeColorChange}
                                                    onRemove={
                                                        onFadeColorRemoveClick
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
                <div className={style.grid_item}>
                    <div className={style.command}>
                        <p className={style.command_string}>{commandString}</p>
                        <MinecraftButton
                            style={{ float: "right" }}
                            onClick={onCopyCommandClick}
                            text={t("fireworkGeneratorCopyButtonText")}
                        />
                    </div>
                    <MinecraftCompositeTable
                        itemList={[{ item_id: "minecraft:dirt", count: 1 }]}
                        outputItem={{ item_id: "minecraft:dirt" }}
                    />
                    <MinecraftItem item_id="minecraft:dirt" count={1} />
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common"])),
    },
});

export default FireworkGenerator;
