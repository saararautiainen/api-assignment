import _ from 'lodash';
import React, {Component} from 'react';
import Spinner from 'react-bootstrap/Spinner'
import ProductList from './Components/ProductList';
import Navigation from './Components/Navigation';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        path: null,
        items: [],
        initialItems: [],
        loading: false
    }
    }

  

  componentDidMount =()=> {
    
    var that = this;
    window.addEventListener(
      'hashchange',
      function () {
        
        var promise = new Promise(function(resolve, reject) {
          const currentPath = window.location.hash;
          const path = currentPath.split('/').[1];
          resolve(path);
        });

        promise.then(result => {
          that.setState({path: result});
          that.fetchData();
        })
        

      },
      false
  );
  
}

getManufacturers = (data) => {

  //Get individual manufacturers from initial dataset
  const manufacturerArray = [];

  data.forEach(item => {
  var product = manufacturerArray[item.manufacturer] = manufacturerArray[item.manufacturer] || {};
  manufacturerArray[item.manufacturer] = true;
  });

  //Result not in correct format, parse and push into a new array, set as state
  const parsedManufacturerArray = []; 

  for( var manufacturer in manufacturerArray ) {
    parsedManufacturerArray.push(manufacturer);
  }
 
  return parsedManufacturerArray;

}

parseData = (data) => {
  var that = this;
  var parsedManufacturerArray =  this.getManufacturers(data);
  var count = 0; 

  // Call fetch on each manufacturer, push result into array
  var finalArray = [];
  
   parsedManufacturerArray.forEach(item => {

    var promise = new Promise(function ( resolve, reject) {
      
       
        var data =  that.fetchAvailabilities(item);
        resolve(data);  

    });

    promise.then(result => {
      
      //Now that we have all availability arrays, combine it by id with the initial product array
      return that.mergeArrays(result, item, data);
      
      
    }).then(result => {
      //After getting the combined arrays, we group them together
      finalArray = finalArray.concat(result);
      count ++;
      return finalArray;
    }).then(result => {
      //When all of the manufacturers availabilities have been fetched, do final factoring and set state
      if(count == parsedManufacturerArray.length){
        this.removeDuplicateIDs(result, data);
      }
    }).catch((message) => { 
      console.log(message)
  });
  
  })
 
}

removeDuplicateIDs = (availability, products) => {
// Set length of new array w/availability to initial product array's length to remove extra objects
  availability.length = products.length;
  this.setState({items: availability, loading:false})

}

mergeArrays = (array, item, data) => {
  //Array containing availability
  const arr1 = array;
   // Array containing products
   const arr2 = data;

  //Turn id's into lowercase
  if(arr1.length > 1) {
    for(var i=0;i < arr1.length; i++){
      if(arr1[i].id){
        arr1[i].id = arr1[i].id.toLowerCase(); 
      }
    }
  }

 

  // Concatenate both arrays (Does not remove extras, will do that later)
  var res = _(arr2).concat(arr1).groupBy('id').map(_.spread(_.assign)).value();
  
  return res;

}

fetchData = () => {

  this.setState({ loading: true }, () => {
  fetch(`https://bad-api-assignment.reaktor.com/products/${this.state.path}`, {
    headers: {
      'x-force-error-mode': 'all',
    }
  })
 .then(response => response.json())
 .then(data => {
   
    this.parseData(data)
   
 })
});
}



fetchAvailabilities =  async (manufacturer) =>{
    const response = await fetch(`https://bad-api-assignment.reaktor.com/availability/${manufacturer}`
   
  );
  const data = await response.json();
  if (data.response != '[]') {
    return data.response;

  } else {
     // Try calling once and if there is no response, try again.
    return this.fetchAvailabilities(manufacturer);

  }
  }



    
  

render(){
  const {items, loading} = this.state;
  return (
    
    <div className="App">
      <header >
        
      </header>
      <Navigation/>
      {loading ? <Spinner style={{marginTop: '5em'}} animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> : <ProductList items={items}/>}
        
        
    </div>
  );
}
}

export default App;
