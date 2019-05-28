import React, {Component} from 'react'
import { Button } from 'semantic-ui-react'
import 'semantic-ui-less/semantic.less'
import map from './map/example2.png'





export default class MapPoint extends Component{

      render() {
                return (
                    <div>
                        <img src={map} alt='map'/>
                    
                    </div>
        );
    
    
    }

}