import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home/index'
import Contributors from './pages/Contributors/index'
import ContributorsForm from './pages/Contributors/Form/index'
import ContributorsDetail from './pages/Contributors/Detail/index'

const Routes: React.FC = () => {
    return(
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/colaboradores" exact component={Contributors} />
            <Route path="/colaboradores_cadastro" exact component={ContributorsForm} />
            <Route path="/colaboradores_cadastro/:id" exact component={ContributorsForm} />
            <Route path="/colaboradores/:id" exact component={ContributorsDetail} />
        </Switch>
    )
}

export default Routes 