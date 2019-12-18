import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './App.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login.js';
import PostList from './components/PostList/PostList.js';
// import Post from './components/Post/Post.js';
// import { useHistory } from 'react-router-dom';
import CreatePost from './components/Post/CreatePost';
// import EditPost from './components/Post/EditPost';

class App extends React.Component {
  state = {
    posts: [],
    post: null,
    token: null,
    user: null,
  };

  componentDidMount() {
    this.authenticateUser();
  }
  
  // filterPosts = () => {
  //   let newPosts = [];
  //   this.state.posts.forEach(post => {
      
  //     if (post.user === this.state.user) {
  //         newPosts.push(post);
  //         console.log(`${post.user}`);
  //         console.log(`${post}`);
  //     }
  //   });

  //   this.setState({
  //     posts: newPosts
  //   });

  // }

  authenticateUser = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    console.log(`${user}`);
    if (!token) {
      localStorage.removeItem('user')
      this.setState({ user: null });
    }

    if (token) {
      const config = {
        headers: {
          'x-auth-token': token
        }
      };
      axios.get('http://localhost:5000/api/auth', config)
        .then((response) => {
          localStorage.setItem('user', response.data.name);
          this.setState(
            {
              user: response.data.name,
              token: token
            },
            () => {
              this.loadData();
            }
          );
          
        })
        .catch(error => {
          localStorage.removeItem('user');
          this.setState({ user: null });
          console.error(`Error Logging in: ${error}`);
        });
    }

  }
  loadData = () => {
    
  const { token } = this.state;

    if (token) {
      const config = {
        headers: {
          //authenticate user 
          'x-auth-token': token
        }
      };
      axios
        .get('http://localhost:5000/api/posts', config)
        .then(response => {
          this.setState({
            posts: response.data
          });
        })
        .catch((error) => {
          console.error(`Error fetching data: ${error}`);
        });

        // console.log('filter posts running ');

        // let newPosts = [];
        // console.log(`${newPosts}`);

        // for (const post in this.state.posts) {
        //   if (post.user === this.state.user) {
        //     newPosts.push(post);
        //   }
        // }
        // this.state.posts.forEach(post => {
        //   console.log("foreach");
        //   if (/*post.user === this.state.user*/ newPosts === null) {
        //       // newPosts.push(post);
        //       console.log(`${post.user}`);
        //       console.log(`${post}`);
        //   }
        // });

        // this.setState({
        //   posts: newPosts
        // });
    }
  };


  logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({ user: null, token: null });
  }

  // viewPost = post => {
  //   console.log(`view ${post.title}`);
  //   this.setState({
  //     post: post
  //   });
  // };
            
  deletePost = post => {
    const { token } = this.state;

    if (token) {
      const config = {
        headers: {
          'x-auth-token': token
        },
        
      };

      axios
      .delete(`http://localhost:5000/api/posts/${post._id}`, config)
      .then(response => {

        const newPosts = this.state.posts.filter(p => p._id !== post._id);
        this.setState({
          posts: [...newPosts]
        });

          // log deleted post if deleted
      })
      .catch(error => {
        console.error(`Error deleting post: ${error}`);
      });
    }
  };

  // editPost = post => {
  //   this.setState({
  //     post: post
  //   });
  // };

  onPostCreated = post => {
    const newPosts = [...this.state.posts, post];

    this.setState({
      posts: newPosts
    });
  };

  // onPostUpdated = post => {
  //   console.log('updated post: ', post);
  //   const newPosts = [...this.state.posts];
  //   const index = newPosts.findIndex(p => p._id === post._id);

  //   newPosts[index] = post;

  //   this.setState({
  //     posts: newPosts
  //   });
  // };

  

  render () {
    let { user, posts, token } = this.state;
    const authProps = {
      authenticateUser: this.authenticateUser

    };

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>To Do</h1>
            <hr />          
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                {user ? (
                   <Link to="/"></Link>
                 ) : 
                (
                  <Link to="/register">Register</Link>
                 )}
              </li>
              <li>
                {user ? (
                  <Link to="" onClick={this.logOut}>
                    Log out
                  </Link>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
            </ul>
          </header>
          <main>
            <Switch>
              <Route exact path="/">
                {user ? (
                  <React.Fragment>
                    <h2>{user}'s List</h2>
                    <CreatePost token={token} onPostCreated={this.onPostCreated} />
                    {<PostList
                      // token={this.state.token}
                      posts={posts}
                      // clickPost={this.viewPost}
                      deletePost={this.deletePost}
                      // filterPosts={this.filterPosts}
                      // editPost={this.editPost}*/
                    />}
                  </React.Fragment>
                ) : (
                  <React.Fragment>Please Register or Login</React.Fragment>
                )}
              </Route>

              {/* {<Route path="/posts/:postId">
                <Post post={post} />
              </Route> */}
              
              {/* <Route path="/new-post">
                <CreatePost token={token} onPostCreated={this.onPostCreated} />
              </Route>} */}


              {/* <Route path="/edit-post/:postId">
                  <EditPost
                  token={token}
                  post={post}
                  onPostUpdated={this.onPostUpdated}
                  />
              </Route> */}
              <Route
                exact
                path="/register"
                render={() => <Register {...authProps} />}
              />
              <Route
                exact
                path="/login"
                render={() => <Login {...authProps} />}
              />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;