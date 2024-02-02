import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box, Icon, Pressable, Text } from '@/components';
import { RootStackScreenProps } from '@/navigator/types';
import { SERVER } from '@/services/network';
import NewsItemDetails from '@/components/Layouts/NewsItemDetails';
import { SafeAreaView } from 'react-native';
import { palette } from '@/theme';
import { NewComments } from '@/types/userTypes';
import CommentsItem from '@/components/Layouts/CommentsItem';

const NewsDetails = ({
  navigation,
  route,
}: RootStackScreenProps<'NewsDetails'>) => {
  const article = route.params?.article;

  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<NewComments[]>();

  const getComments = async () => {
    try {
      setIsLoading(true);

      const commentsresponse = await SERVER.get(
        `posts/${article?.userId}/comments`,
      );

      if (commentsresponse.status === 200) {
        setComments(commentsresponse.data);
      }
    } catch (error) {
      console.log(error, 'commennts respons error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <SafeAreaView style={styles.maincotainer}>
      <Box flexDirection="row" alignItems="center" marginTop="md">
        <Pressable onPress={() => navigation.goBack()} type="scale">
          <Icon name="arrow_back" />
        </Pressable>
        <Text variant="bold20" marginLeft="md">
          Article
        </Text>
      </Box>
      <Box paddingHorizontal="md" flex={1} paddingTop="lg">
        <NewsItemDetails
          body={article?.body as string}
          title={article?.title as string}
          // itemPress={() => openArticle(item)}
          userId={article?.userId as number}
        />
        {isLoading ? (
          <ActivityIndicator size="large" color={palette.primary} />
        ) : (
          <FlatList
            data={comments}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.newsItemContainer}
            renderItem={({ item }) => {
              const { body, email, name } = item;
              return <CommentsItem body={body} email={email} name={name} />;
            }}
          />
        )}
      </Box>
    </SafeAreaView>
  );
};

export default NewsDetails;

const styles = StyleSheet.create({
  maincotainer: {
    backgroundColor: palette.white,
    flex: 1,
    paddingHorizontal: 16,
  },
  newsItemContainer: {
    paddingTop: 24,
    paddingBottom: 32,
  },
});
