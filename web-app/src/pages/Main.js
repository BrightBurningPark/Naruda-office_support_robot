import React from 'react';
import { Grid  } from 'semantic-ui-react'
import 'semantic-ui-less/semantic.less'
import Mapbar from '../components/UnderLayout'
import Mainbar from '../components/MainLayout'


const Main = () => {
    return (
        <Grid padded>
            <Grid.Row>
                <Mainbar/>
            </Grid.Row>
            <Grid.Row>
                <Mapbar />
            </Grid.Row>
        </Grid>
            
    );
};

export default Main;