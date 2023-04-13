import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import StarCheckbox from './StarCheck';

function Quiz(props) {
  const { author_img, author_name, thumbnail_img, title } = props;

  const [favorite, setFavorite] = useState(props.favorite);

  return (
    <View style={styles.quizItem}>
      <View style={styles.quizHeaderContainer}>
        <View style={styles.quizAuthor}>
          <Image
            source={{ uri: author_img }}
            style={styles.authorImage}
          />
          <Text>{author_name}</Text>
        </View>
        <View style={styles.quizFavorite}>
          <StarCheckbox checked={favorite} onChange={setFavorite} />
        </View>
      </View>
      <View style={styles.quizImgContainer}>
        <Image
          source={{ uri: thumbnail_img }}
          style={styles.quizImage}
        />
      </View>
      <View style={styles.quizFooterContainer}>
        <Text style={styles.quizTitle}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  quizItem: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  quizHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quizAuthor: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  quizFavorite: {},
  quizImgContainer: {},
  quizImage: {
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  quizFooterContainer: {},
  quizTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  }
});

export default Quiz;
