import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import GradientNavigationBar from './GradientNavigationBar';
import CommonStyles from 'styles/CommonStyles'; 

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexGrow: 1,
    //   alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#fff',
      padding: 16, 
    }
  });

const Screen = ({ navigation, title, children, ...props }) => (
    <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
            navigation={navigation}
            titleText={title}
            {...props}
            />
                    
        <ScrollView contentContainerStyle={styles.container}>
            {children}
        </ScrollView>
    </View>               
);

export default Screen;