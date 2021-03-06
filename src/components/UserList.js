import React from 'react';
import gql from 'graphql-tag';
import Query from './DefaultQuery';
import UserTile from './UserTile';
import LoadMoreButton from './LoadMoreButton';
import Grid from './Grid';

const UserList = ({login}) => (
  <Query query={QUERY} variables={{login}}>
    {({data: {search}, fetchMore, loading}) => (
      <div>
        <Grid columns={3}>
          {search.edges.map(({user}) => (
            <UserTile key={user.id} user={user} />
          ))}
        </Grid>

        {loading || (
          <LoadMoreButton edges={search.edges} fetchMore={fetchMore} />
        )}
      </div>
    )}
  </Query>
);

const QUERY = gql`
  query UserSearch($login: String!, $cursor: String) {
    search(first: 12, query: $login, type: USER, after: $cursor) {
      edges {
        cursor
        user: node {
          ... on User {
            id
            login
            name
            avatarUrl
          }
        }
      }
    }
  }
`;

export default UserList;
