import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Card, Layout, Page, ResourceList, Stack } from '@shopify/polaris';


const CREATE_SCRIPT_TAG = gql`
    mutation scriptTagCreate($input: ScriptTagInput!) {
  scriptTagCreate(input: $input) {
    scriptTag {
      id
    }
    userErrors {
      field
      message
    }
  }
}
`;



const DELETE_SCRIPTTAG = gql`
   mutation scriptTagDelete($id: ID!) {
  scriptTagDelete(id: $id) {
    deletedScriptTagId
    userErrors {
      field
      message
    }
  }
}

`;


const CREATE_META_FIELD = gql`
mutation privateMetafieldUpsert($input: PrivateMetafieldInput!) {
  privateMetafieldUpsert(input: $input) {
    privateMetafield {
      id
    }
    userErrors {
      field
      message
    }
  }
}
`;

const QUERY_SCRIPTTAGS = gql`
    query {
        scriptTags(first: 5) {
            edges {
                node {
                    id
                    src
                    displayScope
                }
            }
        }
    }
`;




function ScriptPage() {


const [createScripts] = useMutation(CREATE_SCRIPT_TAG);
const [deleteScripts] = useMutation(DELETE_SCRIPTTAG);
const [createMetafield] = useMutation(CREATE_META_FIELD);
  
  

  //if (loading) return <div>Loading…</div>;
  //if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h1>Create and delete script tag, META FILEDS</h1>
       
       <button 
         type='submit' onClick={() => {
                  createScripts({ variables: { input: { src: "https://8c60-103-106-238-3.ngrok.io/test-scripts.js", displayScope: "ALL" } } }  )
              
         }
        }
    >
    Create script tag</button >

      
  <button 
         type='submit' onClick={() => {
                  deleteScripts({
                            variables: {
                              id: 123456
                            }
                          })          
         }
        }
    >
        Delete script tag</button >
      

      <button 
         type='submit' onClick={() => {
                  createMetafield({ variables: { input: { namespace: "promo_text", key: "topbar_text", valueInput: { value: "testValue", valueType: "STRING"} } } } )
          console.log("created");
         }
        }
    >
        Create Metafiled</button >
      

      <button 
         type='submit' onClick={() => {
          const { loading, error, data } = useQuery(QUERY_SCRIPTTAGS);
          console.log(data);

         }
        }
    >
    Load script tag</button >

        
</div>
  )
}

export default ScriptPage;
