// React from 'react';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
const QUERY_USERS = gql`
  query {
    allEmployee {
      id
      firstName
      lastName
    }
}
`;
const UserInfo = () => {
  // Polling: provides near-real-time synchronization with
  // your server by causing a query to execute periodically
  // at a specified interval
  const { loading,data }  = useQuery(QUERY_USERS);
if (loading) return (<div>Loading......</div>);
    return data.allEmployee.map(({ id, firstName, lastName }) => (
        <div key={id}>
        <p>
            User - {id}: {firstName} {lastName}
        </p>
        </div>
  ));
}
export default UserInfo