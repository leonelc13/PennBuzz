import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
/**
 * React Component for Header displayed to a logged in user
 **/


function Quiz(props) {

    const [isUpvoted, setIsUpvoted] = useState(props.is_upvoted ? props.is_upvoted : false);
    const [isDownvoted, setIsDownvoted] = useState(props.is_downvoted ? props.is_downvoted : false);

    const [upvotes, setUpvotes] = useState(props.upvotes);
    const [downvotes, setDownvotes] = useState(props.downvotes);


    const handleUpvote = (event) => {
        if (isUpvoted) {
            setUpvotes(upvotes - 1);
            return setIsUpvoted(false);
        }
        setUpvotes(upvotes + 1);
        return setIsUpvoted(true);
    }

    const handleDownvote = (event) => {
        if (isDownvoted) {
            setDownvotes(downvotes - 1);
            return setIsDownvoted(false);
        }
        setDownvotes(downvotes + 1);
        return setIsDownvoted(true);
    }

    return (
        <View style={[styles.quiz_container, {
            backgroundColor: '#fff',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
        }]}>
            <View style={styles.quiz_container_box}>
                <View style={styles.quiz_header_container}>
                    <View style={styles.quiz_author}>
                        <View style={styles.quiz_author_image_wrapper}>
                            <Image style={{
                                width: 30, height: 30,
                                borderRadius: 50
                            }} source={{ uri: props.author_img }} alt="author profile picture" resizeMode="cover" />
                        </View >
                        <Text style={styles.author_name}>
                            {props.author_name}
                        </Text>
                    </View >
                    <View style={styles.quiz_labels_container} >
                        {
                            props.labels.map(label => (
                                <View style={styles.quiz_labels}>
                                    <Text style={styles.red_text}>
                                        {label}
                                    </Text>
                                </View>
                            ))
                        }
                    </View >
                </View >

                <View style={styles.quiz_information} >
                    <View style={styles.quiz_text} >
                        <View style={styles.quiz_title} >
                            <Text style={styles.quiz_title_text}>
                                {props.title}
                            </Text>
                        </View >
                        <View style={styles.quiz_description} >
                            <Text>
                                {props.description}
                            </Text>
                        </View >
                    </View >
                </View>
                <View style={styles.thumbnail_wrapper}>
                    <Image style={{ width: '100%', height: 200 }} source={{ uri: props.thumbnail_img }} alt="quiz_thumbnail" resizeMode="cover" />
                </View>
                <View style={styles.quiz_buttons} >
                    <TouchableOpacity onPress={() => { props.navigation.navigate("QuizScreen", { quizId: props.id }) }} style={styles.quiz_take_quiz_button_container}>
                        <Text style={styles.red_text}>
                            Take Quiz
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.quiz_upvotes_comments_container} >
                        <TouchableOpacity onPress={() => handleUpvote()} style={isUpvoted ? styles.selected_upvote_button : styles.quiz_upvotes_button}>
                            <Text style={isUpvoted ? styles.white_text : styles.red_text}>
                                {upvotes}
                            </Text>
                        </TouchableOpacity >
                        <TouchableOpacity onPress={() => handleDownvote()} style={isDownvoted ? styles.selected_upvote_button : styles.quiz_upvotes_button}>
                            <Text style={isDownvoted ? styles.white_text : styles.red_text}>
                                {downvotes}
                            </Text>
                        </TouchableOpacity >


                        <TouchableOpacity>
                            <Text style={styles.red_text}>
                                {props.num_comments} comments
                            </Text>
                        </TouchableOpacity>
                    </View >
                </View >
            </View >
        </View>
    );
}

const styles = StyleSheet.create({
    quiz_container: {
        marginBottom: 20,

        borderRadius: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    quiz_container_box: {
        display: 'flex',
        padding: 10,
    },

    quiz_header_container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '10',
        alignItems: 'center'
    },
    quiz_author: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
    , author_name: {
        marginLeft: 10,
        fontWeight: 'bold'
    },
    quiz_labels_container: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 'auto'
    }
    , quiz_labels: {
        padding: 5,
        borderColor: '#FF0606',
        borderWidth: 1,
        borderRadius: 15,
        marginLeft: 5
    },
    red_text: {
        color: '#FF0606',
    },
    quiz_title: {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },
    quiz_title_text: {
        fontWeight: 'bold',
        fontSize: 20
    },

    thumbnail_wrapper: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    }
    ,
    quiz_buttons: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center'
    },
    quiz_take_quiz_button_container: {
        borderColor: '#FF0606',
        borderWidth: 1,
        borderRadius: 15,
        padding: 10
    },
    quiz_upvotes_comments_container: {
        display: 'flex',
        marginLeft: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '40%',
        alignItems: 'center'
    },
    quiz_upvotes_button: {
        borderColor: '#FF0606',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginRight: 10,
    },

    selected_upvote_button: {
        borderColor: '#FF0606',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        backgroundColor: '#FF0606',

        marginRight: 10,
    },
    white_text: {
        color: 'white'
    }
});

export default Quiz