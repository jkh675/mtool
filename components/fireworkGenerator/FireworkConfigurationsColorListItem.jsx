import {
    ListItem,
    IconButton,
    ListItemText,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Fab,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import React from "react"

const DYES = [
    { name: "Black", code: 1908001, hex: "#1D1D21" },
    { name: "Red", code: 11546150, hex: "#B02E26" },
    { name: "Green", code: 6192150, hex: "#5E7C16" },
    { name: "Brown", code: 8606770, hex: "#835432" },
    { name: "Blue", code: 3949738, hex: "#3C44AA" },
    { name: "Purple", code: 8991416, hex: "#8932B8" },
    { name: "Cyan", code: 1481884, hex: "#169C9C" },
    { name: "Light gray", code: 10329495, hex: "#9D9D97" },
    { name: "Gray", code: 4673362, hex: "#474F52" },
    { name: "Pink", code: 15961002, hex: "#F38BAA" },
    { name: "Lime", code: 8439583, hex: "#80C71F" },
    { name: "Yellow", code: 16701501, hex: "#FED83D" },
    { name: "Light blue", code: 3847130, hex: "#3AB3DA" },
    { name: "Magenta", code: 13061821, hex: "#C74EBD" },
    { name: "Orange", code: 16351261, hex: "#F9801D" },
    { name: "White", code: 16383998, hex: "#F9FFFE" },
]

function FireworkConfigurationsColorListItem (props) {
    const { t, setColor, color, index ,deleteColor} = props;

    return (
        <div>
            <Divider />
            <ListItem
                secondaryAction={
                    <IconButton onClick={()=>{deleteColor(index)}}>
                        <DeleteIcon />
                    </IconButton>
                }
            >
                <ListItemText
                    primary={
                        <FormControl
                            fullWidth
                            variant="outlined"
                            color="warning"
                        >
                            <InputLabel
                                id="demo-simple-select-label"
                                style={{ fontFamily: "Minecraft" }}
                            >
                                {t(
                                    "FireworkConfigurationsColorListItem.Selector.Title"
                                )}
                            </InputLabel>
                            <Select
                                label={t(
                                    "FireworkConfigurationsColorListItem.Selector.Title"
                                )}
                                value={DYES.findIndex(element => element.code == color)}
                                onChange={(event, _) => {
                                    setColor(index, DYES[event.target.value].code)
                                }}
                            >
                                {DYES.map((dye, index) => (
                                    <MenuItem
                                        key={index}
                                        value={index}
                                        style={{ fontFamily: "Minecraft" }}
                                    >
                                        <Fab
                                            size="small"
                                            sx={{
                                                marginRight: 2,
                                                backgroundColor: dye.hex,
                                            }}
                                            style={{
                                                boxShadow: `0px 0px 30px 0px ${dye.hex}`,
                                            }}
                                        ></Fab>
                                        {dye.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    }
                    secondary=""
                />
            </ListItem>
            <Divider />
        </div>
    );
}

export default FireworkConfigurationsColorListItem;