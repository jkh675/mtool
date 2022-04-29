import Textures from "minecraft-textures/dist/textures/1.16.js";
import style from "../styles/MinecraftItem.module.css";
import React from "react";
import { Tooltip } from "@mui/material";
/**
 * @param {string} item_id
 * @param {string} item_readable_name
 * @param {integer} item_index
 */
function MinecraftItem (props) {
    const [itemObject, setItemObject] = React.useState(Textures.items[1]);

    React.useEffect(() => {
        if (props.item_id) {
            var findID = Textures.items.find(
                (element) => element.id === props.item_id
            );
            setItemObject(findID);
        } else if (props.item_readable_name) {
            var findReadable = Textures.items.find(
                (element) => element.readable === props.item_readable_name
            );
            setItemObject(findReadable);
        } else if (props.item_index) {
            var findIndex = Textures.items[props.item_index];
            setItemObject(findIndex);
        }
    }, [props.item_id, props.item_readable_name, props.item_index]);


    return (
        <Tooltip 
            title={
                props.tooltip?
                props.tooltip
                :
                itemObject.readable
            } 
            followCursor 
            arrow
        >
            <div className={style.item_image}>
                <img src={itemObject.texture} />
                {props.count ? (
                    <div className={style.item_count}>{props.count}</div>
                ) : null}
            </div>
        </Tooltip>
    );
}

export default MinecraftItem;