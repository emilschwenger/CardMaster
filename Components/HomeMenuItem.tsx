import { Text, StyleSheet, Pressable, ImageBackground, ImageSourcePropType } from "react-native";

interface homeMenuItem {
    title: string,
    img: ImageSourcePropType,
    performOnClick: () => void
}

export default function HomeMenuItem(props: homeMenuItem) {
    return (
        <Pressable style={style.container} onPress={props.performOnClick}>
            <ImageBackground style={style.backgroundImage} source={props.img}>
                <Text style={style.textStyle}>{props.title}</Text>
            </ImageBackground>
        </Pressable>
    );
}

const style = StyleSheet.create(
    {
        container: {
            width: '96%',
            height: 120,
            marginLeft: '2%',
            marginTop: 10,
            overflow: 'hidden',
            borderRadius: 15
        },
        backgroundImage: {
            display: 'flex',
            flexDirection: 'column-reverse',
            resizeMode: 'cover',
            width: '100%',
            height: '100%'
        },
        textStyle: {
            width: '100%',
            paddingLeft: 20,
            paddingBottom: 10,
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            color: 'white',
            fontSize: 30
        }
    }
);