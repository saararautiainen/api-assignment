import Card from 'react-bootstrap/Card'

function Product(props) {
  

  return (
    <div>
      <Card className="card-shadow" style={{ width: '18rem', backgroundColor:'#c4aead', border: 'none', color:'white', fontFamily:'Helvetica', textAlign:'left' }}>
        
        <Card.Body>
          <Card.Title >{props.name}</Card.Title>
          
          <Card.Subtitle >Color</Card.Subtitle>
          {props.color.map(color => {
            return (<div style={{color: `${color}`, fontWeight:'bolder', marginBottom:'1em'}}>{color}  </div>)
          })

          }
          
          <Card.Subtitle >Price</Card.Subtitle>
          <p>{props.price} €</p>
          <Card.Subtitle >Manufacturer</Card.Subtitle>
          <p>{props.manufacturer}</p>
          <b>{props.available}</b> 
        </Card.Body>
        </Card>
    </div>
  );
}

export default Product;
