import style from "../styles/MinecraftCraftTable.module.css";
import MinecraftItem from "./MinecraftItem";

function MinecraftCraftTable (props) {
    const createEmptyItem = (n) => {
        var elements = [];
        for (let i = 0; i < n; i++) {
            elements.push(<div className={style.compositeItem} key={i}></div>);
        }
        return elements;
    }

    return (
        <div className={style.contianer}>
            <div className={style.compositeTable}>
                {props.itemList.map((element, index) => {
                    if (element.item_id) {
                        return (
                            <div className={style.compositeItem} key={index}>
                                <MinecraftItem
                                    item_id={element.item_id}
                                    key={index}
                                    count={element.count}
                                    tooltip={element.tooltip}
                                />
                            </div>
                        );
                    } else if (element.item_index) {
                        return (
                            <div className={style.compositeItem} key={index}>
                                <MinecraftItem
                                    item_index={element.item_index}
                                    key={index}
                                    count={element.count}
                                    tooltip={element.tooltip}
                                />
                            </div>
                        );
                    } else if (element.item_readable_name) {
                        return (
                            <div className={style.compositeItem} key={index}>
                                <MinecraftItem
                                    item_readable_name={
                                        element.item_readable_name
                                    }
                                    key={index}
                                    count={element.count}
                                    tooltip={element.tooltip}
                                />
                            </div>
                        );
                    } else {
                        return <div className={style.compositeItem} key={index}></div>;
                    }
                })}
                {createEmptyItem(9-props.itemList.length)}
            </div>
            <img
                className={style.compositeArrow}
                src="/img/composite_arrow.png"
            />
            <div className={style.compositeProduct}>
                {(() => {
                    if (props.outputItem.item_id) {
                        return (
                            <MinecraftItem
                                count={props.outputItem.count}
                                item_id={props.outputItem.item_id}
                                tooltip={props.outputItem.tooltip}
                            />
                        );
                    } else if (props.outputItem.item_index) {
                        return (
                            <MinecraftItem
                                count={props.outputItem.count}
                                item_index={props.outputItem.item_index}
                                tooltip={props.outputItem.tooltip}
                            />
                        );
                    } else if (props.outputItem.item_readable_name) {
                        return (
                            <MinecraftItem
                                count={props.outputItem.count}
                                item_readable_name={
                                    props.outputItem.item_readable_name
                                }
                                tooltip={props.outputItem.tooltip}
                            />
                        );
                    }
                })()}
            </div>
        </div>
    );
}

export default MinecraftCraftTable;