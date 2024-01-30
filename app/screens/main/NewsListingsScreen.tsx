import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Icon, Pressable, PrimaryButton, Text } from '@/components';
import { NotificationDetails } from '../../components/Modals';
import { SERVER } from '@/services/network';
import { palette } from '@/theme';
import { formatEllipseText } from '@/utils/text';
import { NewsItem } from '@/types';
import perf from '@react-native-firebase/perf';
import { screenTrace } from '@/utils/screentrace';
import crashlytics from '@react-native-firebase/crashlytics';

const NewsListingsScreen = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [activeIndex, setActiveIndex] = useState<NewsItem>();
  const [refreshing, setRefreshing] = useState(false);

  const toggleDetails = () => setShowDetails(prev => !prev);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getNew();
      setRefreshing(false);
    }, 500);
  }, []);

  const getNew = async () => {
    try {
      const metric = await perf().newHttpMetric('posts', 'GET');

      // add any extra metric attributes if needed
      metric.putAttribute('user', 'abcd');

      await metric.start();

      const newsresponse = await SERVER.get('posts');
      // console.log(newsresponse.data, 'newsresponse');
      metric.setHttpResponseCode(newsresponse.status);
      // metric.setResponseContentType(newsresponse.headers.get('Content-Type'));
      // metric.setResponsePayloadSize(newsresponse.headers.get('Content-Length'));

      await metric.stop();
      setNewsList(newsresponse.data);
    } catch (error: any) {
      crashlytics().recordError(error);
      console.log(error, 'news error response');
    }
  };

  useEffect(() => {
    getNew();
    screenTrace('NewsDetailsScreen');
  }, []);

  const openArticle = (item: NewsItem) => {
    // navigation.navigate('NewsDetails', { article: item });
    toggleDetails();
    setActiveIndex(item);
    console.log(item, 'item');
  };

  const throwSomeError = () => {
    throw new Error('Throw crashlytics error');
    // undefinedVariable.notAFunction();
  };

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

      <PrimaryButton
        label="Throw error"
        onPress={throwSomeError}
        backgroundColor="white"
        variant="textColor"
        borderWidth={1}
        borderColor="border"
        marginTop="md"
        width={'40%'}
        alignSelf="flex-end"
      />

      <Box marginTop="lg">
        <FlatList
          data={newsList}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.newsItemContainer}
          renderItem={({ item }) => {
            const { title, body, userId } = item;
            return (
              <NewsFile
                body={body}
                title={title}
                itemPress={() => openArticle(item)}
                userId={userId}
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
        />
      </Box>
      <NotificationDetails
        author={`${activeIndex?.userId}`}
        body={activeIndex?.body}
        closeModal={toggleDetails}
        showModal={showDetails}
        title={activeIndex?.title}
      />
    </Box>
  );
};

export default NewsListingsScreen;

type NotificationItemProp = {
  body: string;
  itemPress: () => void;
  title: string;
  userId: number;
};

const NewsFile = ({ body, title, itemPress, userId }: NotificationItemProp) => {
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
      <Icon name="profile-photo" />
      <Box marginLeft="ssm" width={'90%'}>
        <Text variant="medium14">{title}</Text>
        <Text variant="regular12" marginTop="xs">
          {formatEllipseText(body, 100)}
        </Text>
        <Text
          textAlign="right"
          variant="regular12">{`Written by: ${userId}`}</Text>
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
