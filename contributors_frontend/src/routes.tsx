import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home/index'
import Contributors from './pages/Contributors/index'
import ContributorsForm from './pages/Contributors/Form/index'

const Routes: React.FC = () => {
    return(
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/colaboradores" exact component={Contributors} />
            <Route path="/colaboradores_cadastro" exact component={ContributorsForm} />
        </Switch>
    )
}

export default Routes 