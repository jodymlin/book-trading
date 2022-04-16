import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native";

function BookTile (props){
    return (
        <TouchableOpacity>
            <View
                style = {{
                    flexDirection: 'row',
                    paddingVertical: '20px',
                    paddingVertical: '10px'
                }}
            >
                <View
                    style = {{
                        flexDirection: 'column',
                        alignContent: 'center'
                    }}
                >
                    {/* image of the book */}
                </View>
                <View
                    style = {{
                        flexDirection: "column",
                        alignContent: 'center'
                    }}
                >
                    <Text
                        style = {{
                            fontFamily: 'open sans',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            textAlign: 'center',
                            lineHeight: '22px'
                        }}
                    >{props.title}</Text>
                    <Text
                        style = {{
                            fontFamily: 'open sans',
                            fontSize: '14px',
                            textAlign: 'center'
                        }}
                    >{props.author}</Text>
                    <Text
                        style = {{
                            fontFamily: 'open sans',
                            fontSize: '12px',
                            textAlign: 'center',
                            color: rgba(0, 0, 0, 0.6)
                        }}
                    >{props.available} available</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default BookTile;