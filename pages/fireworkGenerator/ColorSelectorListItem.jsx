import style from "./ColorSelectorListItem.module.css";

import { Grid, Fab, Divider } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function ColorSelectorListItem (props) {
    return (
        <div>
            <Grid container>
                <Grid item xs={2}>
                    <input
                        type="color"
                        className={style.colorInput}
                        value={`${rgbToHex(
                            props.color.R,
                            props.color.G,
                            props.color.B
                        )}`}
                        onChange={(event) =>
                            props.onChange(props.index, event.target.value)
                        }
                    />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={7}>
                    <p className={style.colorCode}>Color Code:{props.colorCode}</p>
                </Grid>
                <Grid item xs={2}>
                    <Fab size="big" color="error" onClick={(event) => props.onRemove(props.index)}>
                        <ClearIcon />
                    </Fab>
                </Grid>
            </Grid>
            <Divider />
        </div>
    );
}

export default ColorSelectorListItem;

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}