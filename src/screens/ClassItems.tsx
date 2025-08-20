import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { RootState } from '../redux/store'
import { actionLogout } from '../redux/reducers/HomeReducer'


interface IProps {
  loadingHome:boolean
  loadingAuth:boolean
  actionLogout:({token}:{token:string}) =>void
}

interface IState{
  isModalVisible:boolean
  name:string
}

interface SS {}
class ClassItems extends Component<IProps,IState,SS> {
  constructor(props:IProps){
    super(props)
    this.state = {
      isModalVisible:false,
      name:""
    }
  }
  render() {
    // console.log(this.props.,"------props")
    // console.log(this.state.isModalVisible)
    return (
      <View style={{padding:40}}>
        <Text> ClassItems </Text>
        {/* <TouchableOpacity style={{padding:20,backgroundColor:"#fff",borderWidth:1}} onPress={() => this.props.actionLogout({token:"values"})}>
          <Text>Send to redux</Text>
        </TouchableOpacity> */}
      </View>
    )
  }
}


const mapStateToProps = (state:RootState) => {
  console.log(state.HomeReducer.token,"---->>>hhhh")
  // console.log(state.HomeReducer.)
  return {
    loadingHome:state.HomeReducer.loading,
    loadingAuth:state.Auth.loading,
    token : state.HomeReducer.token
  }
}

const mapDispatchToProps = {
  actionLogout
}

export default connect(mapStateToProps,mapDispatchToProps)(ClassItems)
