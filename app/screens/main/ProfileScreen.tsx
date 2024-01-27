import {ScrollView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Box, Icon, IconName, Pressable, Text} from '@/components';
import {LogoutModal} from '../../components/Modals/';
// import {RootTabScreenProps} from '@/navigation/types';
import {useAppDispatch} from '@/hooks';
import {logout} from '@/store/authSlice';

const ProfileScreen = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const dispatch = useAppDispatch();

  const toggleLogoutModal = () => setShowLogoutModal(prev => !prev);

  const loginOutUser = async () => {
    dispatch(logout());
  };

  const doSomething = () => console.log('do something');

  return (
    <Box paddingHorizontal="md" flex={1} backgroundColor="background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainContainer}
        contentContainerStyle={styles.scrollConatiner}>
        <Text variant="bold20" marginTop="xl">
          Profile
        </Text>

        <Box
          padding="sl"
          marginTop="lg"
          backgroundColor="contactColor"
          borderRadius={4}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          style={styles.container}>
          <Box flexDirection="row" alignItems="center">
            <Icon name="profile-photo" size={50} />
            <Box paddingHorizontal="sm">
              <Text variant="bold14" color="white">
                Profile
              </Text>
              <Text
                variant="regular12"
                color="white"
                textTransform="capitalize">
                {'Ade tutu'}
              </Text>
            </Box>
          </Box>

          <Pressable type="scale">
            {/* <IIcon name="pencil-outline" size={20} color={palette.white} /> */}
          </Pressable>
        </Box>

        <Box
          backgroundColor="white"
          marginTop="lg"
          padding="md"
          style={styles.container}>
          <ProfileItem
            title="My Account "
            description="Make changes to your account"
            iconName="secured"
            itemPress={doSomething}
          />

          <ProfileItem
            title="Saved Beneficiary"
            description="Manage your saved account"
            iconName="news"
            itemPress={doSomething}
          />

          <ProfileItem
            title="Log out"
            description="Close all running sessions"
            iconName="trash"
            itemPress={toggleLogoutModal}
            logoutButton
          />
        </Box>

        <Text variant="medium14" marginTop="lg">
          More
        </Text>

        <Box
          backgroundColor="white"
          marginTop="lg"
          padding="md"
          style={styles.container}>
          <ProfileItem
            title="Help & Support"
            iconName="secured"
            itemPress={doSomething}
          />

          <ProfileItem
            title="About Developer"
            iconName="transfer"
            itemPress={doSomething}
          />
        </Box>
      </ScrollView>
      <LogoutModal
        closeModal={toggleLogoutModal}
        logout={loginOutUser}
        modalVisible={showLogoutModal}
      />
    </Box>
  );
};

export default ProfileScreen;

type ProfileItemProps = {
  description?: string;
  logoutButton?: boolean;
  iconName: IconName;
  itemPress?: () => void;
  title: string;
};

const ProfileItem = ({
  logoutButton,
  title,
  itemPress,
  description,
  iconName,
}: ProfileItemProps) => {
  return (
    <Pressable
      flexDirection="row"
      justifyContent="space-between"
      marginVertical="md"
      alignItems="center"
      height={34}
      onPress={itemPress}
      type="scale">
      <Box flexDirection="row" alignItems="center">
        <Box
          height={40}
          width={40}
          justifyContent="center"
          alignItems="center"
          backgroundColor={logoutButton ? 'redBackground' : 'background'}
          borderRadius={20}>
          {/* <IIcon
            name={iconName}
            size={20}
            color={logoutButton ? palette.error : palette.contactColor}
          /> */}
          <Icon name={iconName} />
        </Box>
        <Box paddingLeft="ssm">
          <Text variant="medium14" color={logoutButton ? 'error' : 'textColor'}>
            {title}
          </Text>
          {description && (
            <Text
              variant="regular12"
              color={logoutButton ? 'textRed' : 'secondaryText'}>
              {description}
            </Text>
          )}
        </Box>
      </Box>
      <Icon name="arrow_forward" size={16} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingBottom: 30,
  },
  scrollConatiner: {
    paddingBottom: 30,
  },
  container: {
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
