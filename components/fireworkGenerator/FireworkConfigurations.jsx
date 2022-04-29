import FireworkConfigurationsSwitch from "./FireworkConfigurationsSwitch";
import FireworkConfigurationsTypeSelector from "./FireworkConfigurationsTypeSelector";
import FireworkConfigurationsColorSelector from "./FireworkConfigurationsColorSelector";

function FireworkConfigurations (props) {
    const { t, firework, setFirework, index } = props
    
    const setTrail = (_, newValue) => {
        const newFirework = { ...firework };
        newFirework.Fireworks.Explosions[index].Explosion.Trail = newValue;
        setFirework(newFirework);
    };
    const setFlicker = (_, newValue) => {
        const newFirework = { ...firework };
        newFirework.Fireworks.Explosions[index].Explosion.Flicker = newValue;
        setFirework(newFirework);
    }
    const setType = (event, _) => {
        const newFirework = { ...firework };
        newFirework.Fireworks.Explosions[index].Explosion.Type = event.target.value;
        setFirework(newFirework);
    }
    const addMainColor = () => {
        var itemCount = 0;
        itemCount += 1; //gun powder
        if (firework.Fireworks.Explosions[index].Explosion.Flicker) {
            itemCount += 1; //flicker
        }
        if (firework.Fireworks.Explosions[index].Explosion.Trail) {
            itemCount += 1; //trail
        }
        if (firework.Fireworks.Explosions[index].Explosion.Type != -1 && firework.Fireworks.Explosions[index].Explosion.Type != 0) {
            itemCount += 1; //type
        }
        itemCount += firework.Fireworks.Explosions[index].Explosion.Colors.length; //colors

        if (itemCount != 9) {
            const newFirework = { ...firework };
            newFirework.Fireworks.Explosions[index].Explosion.Colors.push(1908001);
            setFirework(newFirework);
        }
    };
    const setMainColor = (colorIndex, color) => {
        const newFirework = { ...firework };
        newFirework.Fireworks.Explosions[index].Explosion.Colors[colorIndex] =
            color;
        setFirework(newFirework);
    }
    const deleteMainColor = (colorIndex) => {
        const newFirework = { ...firework };
        newFirework.Fireworks.Explosions[index].Explosion.Colors.splice(colorIndex, 1);
        setFirework(newFirework);
    }
    const addFadeColor = () => {
        if (firework.Fireworks.Explosions[index].Explosion.FadeColors.length == 0) {
            const newFirework = { ...firework };
            newFirework.Fireworks.Explosions[index].Explosion.FadeColors.push(1908001);
            setFirework(newFirework);
        }
    };
    const setFadeColor = (colorIndex, color) => {
        const newFirework = { ...firework };
        newFirework.Fireworks.Explosions[index].Explosion.FadeColors[colorIndex] =
            color;
        setFirework(newFirework);
    }
    const deleteFadeColor = (colorIndex) => {
        const newFirework = { ...firework };
        newFirework.Fireworks.Explosions[index].Explosion.FadeColors.splice(colorIndex, 1);
        setFirework(newFirework);
    }

    return (
        <div>
            <FireworkConfigurationsSwitch
                trail={firework.Fireworks.Explosions[index].Explosion.Trail}
                setTrail={setTrail}
                flicker={firework.Fireworks.Explosions[index].Explosion.Flicker}
                setFlicker={setFlicker}
                t={t}
            />
            <FireworkConfigurationsTypeSelector
                t={t}
                type={firework.Fireworks.Explosions[index].Explosion.Type}
                setType={setType}
            />
            <FireworkConfigurationsColorSelector
                t={t}
                mainColors={
                    firework.Fireworks.Explosions[index].Explosion.Colors
                }
                addMainColor={addMainColor}
                setMainColor={setMainColor}
                deleteMainColor={deleteMainColor}

                fadeColors={
                    firework.Fireworks.Explosions[index].Explosion.FadeColors
                }
                addFadeColor={addFadeColor}
                setFadeColor={setFadeColor}
                deleteFadeColor={deleteFadeColor}
            />
        </div>
    );
}

export default FireworkConfigurations;