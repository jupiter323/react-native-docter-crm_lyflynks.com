import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image, 
  AsyncStorage,
  Alert
} from 'react-native'; 


import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { Input, Button } from "../components/UI";
import { list } from '../actions/members_accounts';
import { member_account } from '../actions/auth';

import GradientNavigationBar from '../components/styleguide/GradientNavigationBar';
import CommonStyles from '../styles/CommonStyles'; 
import email_invitations from '../reducers/email_invitations'; 
import {BackHandler} from 'react-native';

const stateMap = (store) => { 
  console.log('test store');
  console.log(store);
  const { member, member_account, username, password } = store.auth;
  const { account_list, isFetching, error } = store.members_accounts;
  return {
    member,
    member_account,
    account_list,
    isFetching,
    error,
    username,
    password
  }
};

class MemberAccountLogin extends Component { 
 
  static navigationOptions = {
    title: 'Select Account',
    tabBarVisible: false,
    headerStyle: {display:"none"}
  };
 

  componentWillReceiveProps(nextProps) {  
    if (nextProps.member_account.success) {
      this.props.navigation.navigate('ActivityLogScreen');
    }
  } 
 
  componentDidMount(){  
 
    const { dispatch, member } = this.props;
        const token = member.data;  
        if (token) dispatch(list(token));


    //   AsyncStorage.getItem('allData') 
    // .then((res) => { 
    //   if(res!=null){
       
    //     console.log('logged in account_list',res.data);   
    //     console.log(res);  

    //   }else{
    //     console.log(this.props);

    //     const { dispatch, member } = this.props;
    //     const token = member.data;  
    //     if (token) dispatch(list(token));
    //   }
    // });  
  }

  logIn = (account_id) => { 
    const { dispatch, username, password, member } = this.props;
    const token = member.data; 
    dispatch(member_account({
      username,
      password,
      account_id,
    }, token))
  }

  // TODO:
  // Get names of seniors on member's accounts to display
  // Needs new route to get seniors' names for accounts
  // Check memberId is associated with account to prevent access of unauthorized accounts
  showMenu = () => {
    this.props.navigation.navigate('MainMenuScreen')
  }
  


  render() {
    const { account_list } = this.props;  
    let accountList;  
    if (account_list.success) {
      accountList = account_list.data.map((account, index) => {
       
        let names = (account.names).join(' & '); 
        let shortNames = (account.shortNames).join(''); 
        return (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => this.logIn(account.account_id)}
            >
            <Avatar 
            style={styles.inlineLayout}  
            small
              rounded
              title={shortNames} 
              onPress={() => console.log("Works!")} 
            /> 
            <View style={styles.viewLayout} >
              <Text style={styles.txtcolors}>{names}</Text> 
            </View>  
            </TouchableOpacity>
           
        )
      });
    }

    return ( 
      <View style={CommonStyles.normalPage}>
      <GradientNavigationBar
        navigation={this.props.navigation}
        titleText='Select Account'
        />
        
         <ScrollView contentContainerStyle={styles.container}>
          {accountList}
        </ScrollView> 
      </View>
    );
  }
}
/*
* stylesheet
*/
const styles = StyleSheet.create({
  txtcolors:{
    color:'#fff',
    flexDirection: 'row',
    flexWrap:'wrap',
    marginTop:12
  }, 
  logoutBtn:{
    position: 'absolute',
    right: 8,
    top: 40,
    zIndex: 1000000
  },
  moreBtn: {
    position: 'absolute',
    right: 8,
    top: 0,
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
   
  viewLayout:{ 
    position:'absolute',
    left:65,
    top:17
  },
  inlineLayout:{
    flexDirection: 'row',
    flexWrap:'wrap',
    padding:15
  },
  rightArrow:{
    height:16,
    width:16,
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'absolute', 
    right: 10,
    top:10
  },
  txtArrow:{
    color:'#fff', 
    textAlign: 'right',
    alignSelf: 'flex-end'
  },
  container: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: 20, 
  },
  resetForm: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
   
  card: { 
    width: '100%',
    height: 80,
    backgroundColor:'#00A68C',
    padding:20,
    marginBottom: 30,
    borderRadius: 10,
    shadowOpacity: 5, 
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5, 
    elevation: 10,
  },
  headerBackButton: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 20,
    fontWeight: '200',
  }
});

export default connect(stateMap)(MemberAccountLogin);
