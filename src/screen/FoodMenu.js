import React, {useEffect} from 'react';
import {View, Text, FlatList, TextInput, Image} from 'react-native';
import {fetchData} from '../service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Accordion from 'react-native-collapsible/Accordion';
import {ScrollView} from 'react-native-gesture-handler';
import Strings from './constant';

const FoodMenu = () => {
  const [fetchValue, setFetchValue] = React.useState();
  const [activeSections, setActiveSections] = React.useState([]);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('fetchList', jsonValue);
    } catch (e) {
      console.log('error', e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('fetchList');
      jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log('JsonValue', jsonValue);
      if (jsonValue) {
        setFetchValue(JSON.parse(jsonValue));
      } else {
        fetchData()
          .then((res) => {
            storeData(res.data.categories);
            setFetchValue(res.data.categories);
            console.log('response', res.data.categories);
          })
          .catch(() => {
            console.log('error2');
          });
      }
    } catch (e) {
      // error reading value
      console.log('error1');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.renderChildContainerStyle}>
      <Text style={styles.marginLeft_10}>{item}</Text>
    </View>
  );

  const renderHeader = (section) => {
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

  const renderContent = (section) => {
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

  const searchData = (text) => {
    if (fetchValue && text) {
      const updatedList = fetchValue?.filter((obj) => {
        return obj.category?.categoryName.includes(text);
      });
      setFetchValue(updatedList);
    } else {
      getData();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{Strings.APPROVED_FOOD_LIST}</Text>
      <TextInput
        onChangeText={(item) => searchData(item)}
        placeholder={Strings.SEARCH_PLACEHOLDER}
        style={styles.inputStyle}
      />
      <ScrollView>
        {fetchValue && (
          <Accordion
            sections={fetchValue}
            activeSections={activeSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={setActiveSections}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F2F2',
  },
  tinyLogo: {
    width: 35,
    height: 35,
    marginRight: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  inputStyle: {
    height: 40,
    borderWidth: 0,
    width: '100%',
    marginBottom: 10,
    paddingLeft: 10,
    borderColor: '#C7F5F3',
    borderRadius: 5,
    backgroundColor: '#E0F2F1',
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

export default FoodMenu;
