import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Box, Icon, Pressable, Text} from '@/components';
// import { RootStackScreenProps } from '@/navigation/types';
import {NotificationDetails} from '../../components/Modals';
// import IIcon from 'react-native-vector-icons/Ionicons';
import {SERVER} from '@/services/network';
import {palette} from '@/theme';
import {formatEllipseText} from '@/utils/text';
import {NewsItem} from '@/types';

const NewsListingsScreen = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [activeIndex, setActiveIndex] = useState<NewsItem>();
  const [refreshing, setRefreshing] = useState(false);

  const toggleDetails = () => setShowDetails(prev => !prev);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getNew = async () => {
    try {
      const newsresponse = await SERVER.get('posts');
      // console.log(newsresponse.data, 'newsresponse');
      setNewsList(newsresponse.data);
    } catch (error) {
      console.log(error, 'news error response');
    }
  };

  useEffect(() => {
    getNew();
  }, []);

  return (
    <Box flex={1} backgroundColor="background" paddingHorizontal="sm">
      {/* <Box flexDirection="row" alignItems="center" marginTop="md">
        <Pressable onPress={() => navigation.goBack()} type="scale">
          <IIcon name="chevron-back-outline" size={16} color={palette.black} />
        </Pressable>
        <Text variant="bold20" marginLeft="md">
          Notification
        </Text>
      </Box> */}

      <Box marginTop="lg">
        <FlatList
          data={newsList}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.newsItemContainer}
          renderItem={({item}) => {
            const {title, body} = item;
            return (
              <NewsFile
                body={body}
                title={title}
                itemPress={() => {
                  toggleDetails();
                  setActiveIndex(item);
                  console.log(item, 'item');
                }}
              />
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[palette.blue, palette.success, palette.error]}
              tintColor={palette.primary}
              title="Refreshing"
              titleColor={palette.primary}
            />
          }
          showsVerticalScrollIndicator={false}
          // refreshControl={ }
        />
      </Box>
      <NotificationDetails
        closeModal={toggleDetails}
        showModal={showDetails}
        title={activeIndex?.title}
        body={activeIndex?.body}
      />
    </Box>
  );
};

export default NewsListingsScreen;

type NotificationItemProp = {
  body: string;
  title: string;
  itemPress: () => void;
};

const NewsFile = ({body, title, itemPress}: NotificationItemProp) => {
  return (
    <Pressable
      paddingVertical="ssm"
      paddingHorizontal="sl"
      backgroundColor="blueHighlight"
      flexDirection="row"
      borderRadius={8}
      width={'100%'}
      marginBottom="ssm"
      alignItems="center"
      style={styles.newsItem}
      onPress={itemPress}>
      {/* <IIcon
          name="chatbox-ellipses-outline"
          size={30}
          color={palette.black}
        /> */}
      <Icon name="profile-photo" />
      <Box marginLeft="ssm">
        <Text variant="medium14">{title}</Text>
        <Text variant="regular12" marginTop="xs">
          {formatEllipseText(body, 100)}
        </Text>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  newsItemContainer: {
    paddingTop: 4,
    paddingBottom: 60,
    paddingHorizontal: 4,
  },
  newsItem: {
    shadowColor: 'rgba(0,0,0,0.2',
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});
