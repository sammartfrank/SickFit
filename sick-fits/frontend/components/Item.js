import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Title from './styles/Title.js';
import ItemStyles from './styles/ItemStyles.js';
import Pricetag from './styles/PriceTag.js';
import formatMoney from '../lib/formatMoney.js';
import DeleteItem from './DeleteItem.js';
class Item extends Component {
 static propTypes = {
  item: PropTypes.object.isRequired,
 };
	render() {
  const { item } = this.props;
		return(
   <ItemStyles>
   {item.image && <img src={item.image} alt={item.title}/>}
    <Title>
	    <Link href={{
      pathname: '/item',
      query: {id: item.id}
     }}>
      <a>
 	     {item.title}
      </a>
	    </Link>
    </Title>
    <Pricetag>{formatMoney(item.price)}</Pricetag>
    <p>{item.description}</p>
    <div className="buttonList">
     <Link href={{
      pathname: 'update',
      query: { id: item.id },
     }}>
       <a>Edit</a>
     </Link>
     <button>Add to Cart</button>
     <DeleteItem id={item.id}>Delete this Item</DeleteItem>
    </div>
   </ItemStyles>
		)
	}
}

export default Item;