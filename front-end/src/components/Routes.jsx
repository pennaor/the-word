import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './Login';
import Subscribe from './Subscribe';
import Posts from './Posts';
import PostDetails from './PostDetails';
import PostEditor from './PostEditor';
import NewPost from './NewPost';
import Search from './Search';
import UsersList from './UsersList';

export default function Routes() {
  const user = useSelector((state) => state.user);

  const userLoggedIn = !!(user.email && user.displayName);

  const guard = (Component) => (
    userLoggedIn ? <Component /> : <Redirect to="/login" />
  );

  return (
    <Switch>
      <Route path="/post/edit/:id" render={ () => guard(PostEditor) } />
      <Route path="/post/create" render={ () => guard(NewPost) } />
      <Route path="/post/:id" render={ () => guard(PostDetails) } />
      <Route path="/posts" render={ () => guard(Posts) } />
      <Route path="/authors" render={ () => guard(UsersList) } />
      <Route path="/search" render={ () => guard(Search) } />
      <Route path="/subscribe" component={ Subscribe } />
      <Route path="/login" render={ () => <Login redirectUser={ userLoggedIn } /> } />
      <Route path="/" render={ () => <Login redirectUser={ userLoggedIn } /> } />
    </Switch>
  );
}
