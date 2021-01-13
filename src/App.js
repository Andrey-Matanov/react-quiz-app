import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from './components/Menu';
import Quiz from './components/Quiz';

const App = () => {
    const [settings, setSettings] = useState({});
    const getQuizSettings = (settings) => {
        setSettings(settings);
    };

    return (
        <div>
            <Switch>
                <Route
                    exact
                    path='/'
                    render={() => <Menu getQuizSettings={getQuizSettings} />}
                />
                <Route
                    path='/quiz'
                    render={() => <Quiz settings={settings} />}
                />
            </Switch>
        </div>
    );
};

export default App;
