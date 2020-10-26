import React from 'react';
import {View, Text, Image} from 'react-native';

const RenderHeader = ({section}) => {
  const {categoryName, servingSize, colorCode} = section?.category;
  return (
    <View style={styles.headerStyle}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri:
            'https://2rdnmg1qbg403gumla1v9i2h-wpengine.netdna-ssl.com/wp-content/uploads/sites/3/2019/06/cropped-GettyImages-643764514-745x490.jpg',
        }}
      />
      <Text style={{color: colorCode || 'black'}}>{categoryName} </Text>
      <Text>{servingSize}</Text>
    </View>
  );
};

const styles = {
  tinyLogo: {
    width: 35,
    height: 35,
    marginRight: 10,
    borderRadius: 10,
  },
  headerStyle: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderBottomColor: '#E5E7E9',
    borderBottomWidth: 1,
  },
};

export default RenderHeader;
