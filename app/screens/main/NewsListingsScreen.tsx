import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useCallback } from 'react';
import { Box, PrimaryButton } from '@/components';
import { palette } from '@/theme';
import { NewsItem } from '@/types';
import { screenTrace } from '@/utils/screentrace';
import { RootTabScreenProps } from '@/navigator/types';
import NewsItemDetails from '@/components/Layouts/NewsItemDetails';
import { useGetPostsQuery } from '@/services/api/services';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const NewsListingsScreen = ({
  navigation,
}: RootTabScreenProps<'NewsListingsScreen'>) => {
  const {
    data,
    refetch,
    isLoading: postsLoading,
    isFetching,
  } = useGetPostsQuery();

  const onRefresh = useCallback(() => {
    setTimeout(() => {
      refetch();
    }, 100);
  }, [refetch]);

  useEffect(() => {
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
      <ErrorBoundary>
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
      </ErrorBoundary>

      <Box marginTop="lg">
        {postsLoading ? (
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
                refreshing={isFetching}
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
