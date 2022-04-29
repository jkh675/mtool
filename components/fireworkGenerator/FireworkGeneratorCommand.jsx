import {
    Grid,
    Paper,
    TextField,
} from "@mui/material"

import MinecraftButton from "../MinecraftButton";
import React from "react"

function FireworkGeneratorCommand (props) {
    const { t, firework } = props;

    const [command,setCommand] = React.useState("");

    React.useEffect(() => {
        var newFirework = JSON.parse(JSON.stringify(firework)); 
        if (newFirework.Fireworks.Flight == 1) {
            delete newFirework.Fireworks.Flight;
        }
        if (newFirework.Fireworks.Explosions.length == 0) {
            delete newFirework.Fireworks.Explosions;
        } else {
            newFirework.Fireworks.Explosions.map((explosion, index) => {
                try {
                    if (explosion.Colors.length == 0) {
                        delete newFirework.Fireworks.Explosions[index]
                            .Colors;
                    } else {
                        newFirework.Fireworks.Explosions[
                            index
                        ].Colors[0] = `I;${explosion.Colors[0]}`;
                    }
                } catch {}
                try {
                    if (explosion.FadeColors.length == 0) {
                        delete newFirework.Fireworks.Explosions[index]
                            .FadeColors;
                    } else {
                        newFirework.Fireworks.Explosions[
                            index
                        ].FadeColors[0] = `I;${explosion.FadeColors[0]}`;
                    }
                } catch {}
                try {
                    if (
                        explosion.Type == -1 ||
                        explosion.Type == 0
                    ) {
                        delete newFirework.Fireworks.Explosions[index]
                            .Type;
                    }
                } catch {}
                try {
                    if (explosion.Flicker == false) {
                        delete newFirework.Fireworks.Explosions[index]
                            .Flicker;
                    }
                } catch {}
                try {
                    if (explosion.Trail == false) {
                        delete newFirework.Fireworks.Explosions[index]
                            .Trail;
                    }
                } catch {}
            });
        }

        if (JSON.stringify(newFirework.Fireworks) == "{}") {
            delete newFirework.Fireworks;
        } 
        if (JSON.stringify(newFirework) == "{}") {
            var newCommand = "";
            newCommand = `/give @s minecraft:firework_rocket`;
            setCommand(newCommand);
        } else {
            var newCommand = "";
            newCommand = `/give @s minecraft:firework_rocket${JSON.stringify(
                newFirework
            )}`;
            newCommand = newCommand.replace(/\"/g, "");
            setCommand(newCommand);
        }
    }, [firework, command]);

    return (
        <Paper elevation={20}>
            <Grid container>
                <Grid item xs={11}>
                    <TextField multiline disabled fullWidth value={command} />
                </Grid>
                <Grid item xs={1}>
                    <MinecraftButton
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        text={t("FireworkGeneratorCommand.CopyButtonText")}
                        onClick={() => {
                            navigator.clipboard.writeText(command);
                        }}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}

export default FireworkGeneratorCommand;