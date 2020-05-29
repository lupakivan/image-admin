import React, {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import {useDispatch} from "react-redux"

import {loadImages} from "../actions/images"

import CreateImagePage from "./CreateImagePage";
import MainPage from "./MainPage";
import EditImagePage from "./EditImagePage"
import './App.css';

function App() {
    const dispatch = useDispatch();

    useEffect(function () {
        dispatch(loadImages())
    }, [dispatch]);

    return (
        <Container className="container">
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <MainPage />
                    </Route>
                    <Route path="/create">
                        <CreateImagePage />
                    </Route>
                    <Route path="/edit/:id">
                        <EditImagePage />
                    </Route>
                </Switch>
            </Router>
        </Container>
  );
}

export default App;
