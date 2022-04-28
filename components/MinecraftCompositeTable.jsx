import style from '../styles/MinecraftCompositeTable.module.css'
import MinecraftItem from "./MinecraftItem";


function MinecraftCompositeTable (props) {
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
                                />
                            </div>
                        );
                    } else if (element.item_index) {
                        return (
                            <div className={style.compositeItem} key={index}>
                                <MinecraftItem
                                    item_index={element.item_index}
                                    key={index}
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
                        return <MinecraftItem item_id={props.outputItem.item_id} />
                    } else if (props.outputItem.item_index) {
                        return <MinecraftItem item_index={props.outputItem.item_index} />
                    } else if (props.outputItem.item_readable_name) {
                        return <MinecraftItem item_readable_name={props.outputItem.item_readable_name} />
                    }
                })()}
            </div>
        </div>
    );
}

export default MinecraftCompositeTable;