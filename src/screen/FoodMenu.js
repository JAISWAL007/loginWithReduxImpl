import React, {useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import {fetchData} from '../service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Accordion from 'react-native-collapsible/Accordion';
import {ScrollView} from 'react-native-gesture-handler';
import Strings from '../Constant';
import RenderHeader from './RenderHeader';
import RenderContent from './RenderContent';

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
            setFetchValue(res.data.categories);
            storeData(res.data.categories);
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

  const renderHeader = (section) => <RenderHeader section={section} />;

  const renderContent = (section) => <RenderContent section={section} />;

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
};

export default FoodMenu;
