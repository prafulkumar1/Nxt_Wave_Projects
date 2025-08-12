import axios from "axios";

// No sonar
const response1 = await axios.get("baseUrl", {
  headers: {
    "Content-Type": "application/json",
    token: userToken,
  },
});
 
 
const response2 = await axios.post("baseUrl",{},
       {
         headers: {
           "Content-Type": "application/json",
           token: userToken,
         },
       }
     );
 
// No sonar
 const response3 = await axios.put("baseUrl" + id, {},
   {
     headers: {
       "Content-Type": "application/json",
       token: userToken,
     },
   }
 );
 
// No sonar
  const response4 = await axios.delete(
    endpoints + id,
    {
      headers: {
        "Content-Type": "application/json",
        token: userToken,
      },
    }
  );



  // GET
const getFetchResponse = await fetch("https://dummyjson.com/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: userToken,
    },
  });
  const data1 = await getFetchResponse.json();
  
  
  const createFetchResponse = await fetch("baseUrl", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: userToken,
    },
    body: JSON.stringify({}),
  });
  const data2 = await createFetchResponse.json();
  
  
  const updateFetchResponse = await fetch("baseUrl" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: userToken,
    },
    body: JSON.stringify({}),
  });
  const data3 = await updateFetchResponse.json();
  
  
  const deleteFetchResponse = await fetch("https://dummyjson.com/products" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: userToken,
    },
  });
  const data4 = await response4.json();
  