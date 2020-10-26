import React from 'react';
import {View, Text, FlatList} from 'react-native';

const RenderContent = ({section}) => {
  const renderItem = ({item}) => (
    <View style={styles.renderChildContainerStyle}>
      <Text style={styles.marginLeft_10}>{item}</Text>
    </View>
  );

  const {subcategories, quote, colorCode} = section?.category;
  return (
    <View style={styles.renderWhiteBackgroundColor}>
      {subcategories[0]?.subCategoryname ? (
        <Text style={[{color: colorCode || 'black'}, styles.subLabel]}>
          {subcategories[0]?.subCategoryname}
        </Text>
      ) : null}
      <FlatList
        contentContainerStyle={{paddingBottom: 20}}
        data={subcategories[0]?.items}
        scrollEnabled={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {quote ? <Text style={styles.quoteStyle}>{quote}</Text> : <></>}
    </View>
  );
};

const styles = {
  subLabel: {
    fontSize: 18,
    margin: 10,
  },
  quoteStyle: {
    textAlign: 'center',
    backgroundColor: '#E9F1FB',
    marginBottom: 20,
    paddingVertical: 10,
    borderRadius: 10,
    color: '#979A9A',
    marginHorizontal: 20,
  },
  renderChildContainerStyle: {
    borderBottomColor: '#E5E7E9',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  renderWhiteBackgroundColor: {
    backgroundColor: '#fff',
  },
  marginLeft_10: {marginLeft: 10},
};

export default RenderContent;
