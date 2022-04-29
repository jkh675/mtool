import React from "react";
import MinecraftCraftTable from "../MinecraftCraftTable";
import MinecraftItem from "../MinecraftItem";

const DYES = [
    { name: "Black", code: 1908001, hex: "#1D1D21", id: "minecraft:black_dye" },
    { name: "Red", code: 11546150, hex: "#B02E26", id: "minecraft:red_dye" },
    { name: "Green", code: 6192150, hex: "#5E7C16", id: "minecraft:green_dye" },
    { name: "Brown", code: 8606770, hex: "#835432", id: "minecraft:brown_dye" },
    { name: "Blue", code: 3949738, hex: "#3C44AA", id: "minecraft:blue_dye" },
    { name: "Purple", code: 8991416, hex: "#8932B8", id: "minecraft:purple_dye" },
    { name: "Cyan", code: 1481884, hex: "#169C9C", id: "minecraft:cyan_dye" },
    { name: "Light gray", code: 10329495, hex: "#9D9D97", id: "minecraft:light_gray_dye" },
    { name: "Gray", code: 4673362, hex: "#474F52", id: "minecraft:gray_dye" },
    { name: "Pink", code: 15961002, hex: "#F38BAA", id: "minecraft:pink_dye" },
    { name: "Lime", code: 8439583, hex: "#80C71F", id: "minecraft:lime_dye" },
    { name: "Yellow", code: 16701501, hex: "#FED83D", id: "minecraft:yellow_dye" },
    { name: "Light blue", code: 3847130, hex: "#3AB3DA", id: "minecraft:light_blue_dye" },
    { name: "Magenta", code: 13061821, hex: "#C74EBD", id: "minecraft:magenta_dye" },
    { name: "Orange", code: 16351261, hex: "#F9801D", id: "minecraft:orange_dye" },
    { name: "White", code: 16383998, hex: "#F9FFFE", id: "minecraft:white_dye" },
];

function FireworkGeneratorCraftingTable(props) {
    const {t, firework } = props;

    const [craftArray, setCraftArray] = React.useState([]);
    const [craftMaterial, setCraftMaterial] = React.useState([]);


    React.useEffect(() => {
        var newCraftArray = [];
        var newCraftMaterial = [];
        setCraftMaterial(newCraftMaterial)
        setCraftArray(newCraftArray);
        
        for (let i = 0; i < firework.Fireworks.Flight; i++) {
            newCraftArray.push({ item_id: "minecraft:gunpowder", count: 1 });
            newCraftMaterial.push({ item_id: "minecraft:gunpowder", count: 1 });
        }

        firework.Fireworks.Explosions.map((element,index) => {
            newCraftArray.push({
                item_id: "minecraft:firework_star",
                count: 1,
                tooltip: (
                    <div>
                        <MinecraftCraftTable
                            itemList={(() => {
                                var itemCraftArray = []
                                itemCraftArray.push({
                                    item_id: "minecraft:gunpowder",
                                    count: 1,
                                });
                                newCraftMaterial.push({
                                    item_id: "minecraft:gunpowder",
                                    count: 1,
                                });
                                if (element.Explosion.Flicker) {
                                    itemCraftArray.push({
                                        item_id: "minecraft:glowstone_dust",
                                        count: 1,
                                    });
                                    newCraftMaterial.push({
                                        item_id: "minecraft:glowstone_dust",
                                        count: 1,
                                    });
                                }
                                if (element.Explosion.Trail) {
                                    itemCraftArray.push({
                                        item_id: "minecraft:diamond",
                                        count: 1,
                                    });
                                    newCraftMaterial.push({
                                        item_id: "minecraft:diamond",
                                        count: 1,
                                    });
                                }
                                switch (element.Explosion.Type) {
                                    case 1:
                                        itemCraftArray.push({
                                            item_id: "minecraft:fire_charge",
                                            count: 1,
                                        });
                                        newCraftMaterial.push({
                                            item_id: "minecraft:fire_charge",
                                            count: 1,
                                        });
                                        break;
                                    case 2:
                                        itemCraftArray.push({
                                            item_id: "minecraft:gold_nugget",
                                            count: 1,
                                        });
                                        newCraftMaterial.push({
                                            item_id: "minecraft:gold_nugget",
                                            count: 1,
                                        });
                                        break;
                                    case 3:
                                        itemCraftArray.push({
                                            item_id: "minecraft:skeleton_skull",
                                            count: 1,
                                            tooltip: t("FireworkGeneratorCraftingTable.AnyHead"),
                                        });
                                        newCraftMaterial.push({
                                            item_id: "minecraft:skeleton_skull",
                                            count: 1,
                                            tooltip: t("FireworkGeneratorCraftingTable.AnyHead"),
                                        });
                                        break;
                                    case 4:
                                        itemCraftArray.push({
                                            item_id: "minecraft:feather",
                                            count: 1,
                                        });
                                        newCraftMaterial.push({
                                            item_id: "minecraft:feather",
                                            count: 1,
                                        });
                                        break;
                                    default:
                                        break;
                                }

                                element.Explosion.Colors.map((color, index) => {
                                    itemCraftArray.push({
                                        item_id: DYES.find(
                                            (dye) => dye.code === color
                                        ).id,
                                        count: 1,
                                    });
                                    newCraftMaterial.push({
                                        item_id: DYES.find(
                                            (dye) => dye.code === color
                                        ).id,
                                        count: 1,
                                    });
                                });
                                return itemCraftArray;
                            })()}
                            outputItem={{
                                item_id: "minecraft:firework_rocket",
                            }}
                        />
                    </div>
                ),
            });
        })

        newCraftArray.push({ item_id: "minecraft:paper", count: 1 });
        newCraftMaterial.push({ item_id: "minecraft:paper", count: 1 });
        var duplicateMaterial = []

        newCraftMaterial.map((element, index) => {
            if (duplicateMaterial.find(element2 => element2.item_id === element.item_id)) {
                duplicateMaterial.find(element2 => element2.item_id === element.item_id).count += element.count;
            } else {
                duplicateMaterial.push(element);
            }
        })

        setCraftMaterial(duplicateMaterial);
        setCraftArray(newCraftArray);
    }, [firework,t]);

    return (
        <div>
            <MinecraftCraftTable
                itemList={craftArray}
                outputItem={{ item_id: "minecraft:firework_rocket" }}
            />
            <p>{t("FireworkGeneratorCraftingTable.Material")}</p>
            {craftMaterial.map((element, index) => {
                return (
                    <MinecraftItem
                        key={index}
                        item_id={element.item_id}
                        count={element.count}
                        tooltip={element.tooltip}
                    />
                );
            })}
        </div>
    );
}

export default FireworkGeneratorCraftingTable;
