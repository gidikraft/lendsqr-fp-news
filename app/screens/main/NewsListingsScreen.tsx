import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { Box, PrimaryButton } from '@/components';
import { SERVER } from '@/services/network';
import { palette } from '@/theme';
import { NewsItem } from '@/types';
import perf from '@react-native-firebase/perf';
import { screenTrace } from '@/utils/screentrace';
import crashlytics from '@react-native-firebase/crashlytics';
import { RootTabScreenProps } from '@/navigator/types';
import NewsItemDetails from '@/components/Layouts/NewsItemDetails';
import { useGetPostsQuery } from '@/services/api/services';

const NewsListingsScreen = ({
  navigation,
}: RootTabScreenProps<'NewsListingsScreen'>) => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getNew();
      setRefreshing(false);
    }, 500);
  }, []);

  const getNew = async () => {
    try {
      setIsLoading(true);
      const metric = await perf().newHttpMetric('posts', 'GET');

      // add any extra metric attributes if needed
      metric.putAttribute('user', 'abcd');

      await metric.start();

      const newsresponse = await SERVER.get('posts');
      metric.setHttpResponseCode(newsresponse.status);
      // metric.setResponseContentType(newsresponse.headers.get('Content-Type'));
      // metric.setResponsePayloadSize(newsresponse.headers.get('Content-Length'));
      await metric.stop();
      console.log(newsresponse.data, 'newsresponse');

      setNewsList(newsresponse.data);
    } catch (error: any) {
      crashlytics().recordError(error);
      console.log(error, 'news error response');
    } finally {
      setIsLoading(false);
    }
  };

  const { data, error } = useGetPostsQuery();
  console.log(data, error, 'postsLoading');

  useEffect(() => {
    // getNew();
    screenTrace('NewsDetailsScreen');
  }, []);

  const openArticle = (item: NewsItem) => {
    navigation.navigate('NewsDetails', { article: item });
  };

  const throwSomeError = () => {
    throw new Error('Throw crashlytics error');
    // undefinedVariable.notAFunction();
  };

  return (
    <Box flex={1} backgroundColor="white" paddingHorizontal="sm">
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
        {isLoading ? (
          <ActivityIndicator size="large" color={palette.primary} />
        ) : (
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.newsItemContainer}
            renderItem={({ item }) => {
              const { title, body, userId } = item;
              return (
                <NewsItemDetails
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
        )}
      </Box>
    </Box>
  );
};

export default NewsListingsScreen;

const styles = StyleSheet.create({
  newsItemContainer: {
    paddingTop: 4,
    paddingBottom: 60,
    paddingHorizontal: 4,
  },
});
