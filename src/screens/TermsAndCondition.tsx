// import { View, Text, FlatList } from "react-native";
// import React, { useEffect, useState } from "react";

// export default function TermsAndCondition() {
//   const [userData,setUserData] = useState([])
  
//   useEffect(() => {
//     createUser()
//   },[])

//   const fetcApiCall = async () => {
//     const userData = await fetch("https://reqres.in/api/users", {
//       headers: {
//         "x-api-key": "reqres-free-v1",
//         "Content-Type": "application/json",
//       },
//     });
//     const jsonData = await userData.json()
//     setUserData(jsonData?.data)
//   };

//   const createUser = async () => {
//     const userDataCreated = await fetch("https://reqres.in/api/users",
//       {
//         method:"POST",
//         headers:{
//           'x-api-key': 'reqres-free-v1',
//           "Content-Type":"application/json",

//         },
//         body:JSON.stringify({
//           name: 'John Doe',
//           job: 'Developer'
//         })
//       }
//     )
//     const jsonFormat = await userDataCreated.json()
//     console.log(jsonFormat,"======>>>Ssjsjsjs")
//   }

//   return (
//     <View style={{flex:1,marginTop:50,marginLeft:20}}>
//       <FlatList
//         data={userData}
//         keyExtractor={(item:any) => item?.id}
//         renderItem={({item}) => {
//           return(
//             <View>
//               <Text>{item?.first_name} {item.last_name}</Text>
//             </View>
//           )
//         }} 
//       />
//     </View>
//   );
// }

import { View, Text } from 'react-native'
import React from 'react'

export default function TermsAndCondition() {
  return (
    <View>
      <Text>TermsAndCondition</Text>
    </View>
  )
}