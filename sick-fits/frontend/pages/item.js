import SingleItem from '../components/SingleItem.js';
const Item = props => (
  <div>
   <SingleItem id={props.query.id}/>
  </div>
 );
export default Item;