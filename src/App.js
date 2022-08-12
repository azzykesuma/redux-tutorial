import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import PostLists from './features/posts/PostLists';
import { AddPostForm } from './features/posts/AddPostForm';
import EditForm from './features/posts/EditForm';
import { SinglePostPage } from './features/posts/SinglePostPage'


import { Navbar } from './app/Navbar'
import UserList from './features/users/UserList';
import UserPage from './features/users/UserPage';
import { NotificationList } from './features/notifications/NotificationList';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <AddPostForm />
                <PostLists />
              </>
            )}
          />
          <Route
          exact
          path="/posts/:postId" component={SinglePostPage}
          />

          <Route
          exact
          path="/editpost/:postId" component={EditForm}
          />

          <Route
          exact
          path="/users" component={UserList}
          />
          <Route
          exact
          path="/users/:userId" component={UserPage}
          />

          <Route
          exact
          path="/notifications" component={NotificationList}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
