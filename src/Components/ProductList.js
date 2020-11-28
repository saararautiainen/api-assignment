import React, { Component } from 'react';
import {Col, Row} from 'react-bootstrap'
import Product from './Product';

class ProductList extends Component {
 
    constructor(props) {
        super(props);
      }
 
     parseAvailability = (string) => {
        if(string){
            const match = string.match(/<INSTOCKVALUE>([^<]*)<\/INSTOCKVALUE>/);
            const available = match[1];
            return available;
        } else {
            return 'Can not find availability'
        }
     }


 render() {
    let items = this.props.items;
 return (
 <div>
     <Row >
     {items.map(item => {if(item.name){

            return ( <Col style = {{marginTop: '1em', marginLeft:'5em'}} key = {item.id}>
            <Product id = {item.id} buttonClick= {this.handleButtonClick} manufacturer={item.manufacturer} price = {item.price} name = {item.name} color={item.color} available={this.parseAvailability(item.DATAPAYLOAD)} />
        </Col>
            )
        }
     }
      )}
     </Row>
     
     
 </div>
 );
 }
}
export default ProductList;