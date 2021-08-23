import React, { Component, useState , forwardRef, useImperativeHandle} from 'react';
import Grid from '@material-ui/core/Grid';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Box from '@material-ui/core/Box';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import BaseContainer from '../container/base_container';
import CardView from './common/card.jsx'
import Modal from './common/modal.jsx'

class Dashboard extends Component {
  // @observable _vState = {
  //   listing: [],
  //   loading: true
  // }
  constructor(props) {
    super(props);
    this.state = {
      listing: []
    }
  }
  componentDidMount(){
    this.fetchData();
  }
  fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/product');
      const responseData = await response.json();
      // this._vState.listing = responseData;
      this.setState({listing: responseData})
    }catch(err) {
      console.log("Not able to fetch listing...", err)
    }
  }
  showModal = () => {
    this.modalRef.show({
      title: 'Add Item'
    })
  }
  resolveModal = async () => {
    if (this.addItemRef && this.addItemRef.validation && this.addItemRef.validation()) {
     const data = this.addItemRef.getData();
     try {
      const response = await fetch('http://localhost:5000/api/product/create', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      const responseData = await response.json()
      if (!response.ok) {
          throw new Error(responseData.message);
      }
      this.modalRef.hide();
      this.fetchData();

      } catch (e) {
          alert('Something went wrong...')
      }
    }
  }

  handleDelete = (obj, index) => {
    this.state.listing.splice(index, 1);
    this.setState(this.state, async () => {
      try {
        const response = await fetch('http://localhost:5000/api/product/'+obj.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const responseData = await response.json()
        if (!response.ok) {
            throw new Error(responseData.message);
        }
        } catch (e) {
            alert('Not able to delete the products...')
        }
    });
  }
  render() {
    return (
      <BaseContainer>
        <Grid item sm={10}>
          <Box py={1} display="flex" justifyContent="space-between">
            <Typography variant="h4" component="span">Listing</Typography>
            <Button variant="contained" color="primary" size="small" onClick={this.showModal}>Add</Button>
          </Box>
          <Grid container spacing={3}>
            <CardListing _vState={this.state} handleDelete={this.handleDelete}/>
          </Grid>
        </Grid>
        <Modal ref={ref => this.modalRef = ref}  dataResolve={this.resolveModal} >
          <AddItem ref={ref => this.addItemRef = ref}/>
        </Modal>
      </BaseContainer>
    )
  }
}

const AddItem = forwardRef((props, ref) => {
  const {addProduct} = props;
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: ''
  });

  const [error, setError] = useState({})

  const formChange = ({target}) => {
    validation(target);
    setProduct(prevState => ({
      ...prevState,
      [target.id]: target.value
    }))
  };

  const validation = target => {
    let valid = true;
    if (target) {
      const error = (!(target.value || '').trim());
      setError(prevState => ({
        ...prevState,
        [target.id]: error
      }))
    } else {
      const hasError = {};
      Object.keys(product).forEach(k => {
        if (!(product[k] || '').trim()) {
          hasError[k] = true;
        }
      })
      if (Object.keys(hasError).length) {
        valid = false;
        setError(prevState => ({
          ...prevState,
          ...hasError
        }))
      }
      return valid;
    }
  }

  const clearFields = () => {
    setProduct({
      title: '',
      description: '',
      price: ''
    })
  }

  useImperativeHandle(
    ref,
    () => ({
        getData() {
            return product;
        },
        validation() {
          return validation()
        }
     }),
 )

  const handleAddClick = () => {
    if (validation()) {
      clearFields();
      addProduct({...product, price: +product.price});
    }
  };

  return (
    <React.Fragment>
      <FormGroup>
        <TextField required id="title" error={error.title} label="Title" value={product.title} onChange={formChange} helperText={error.title ? 'Required!' : null}/>
      </FormGroup>

      <FormGroup>
        <TextField required id="description" error={error.description} label="Description" value={product.description} onChange={formChange} helperText={error.description ? 'Required!' : null}/>
      </FormGroup>

      <FormGroup>
        <TextField required id="price" label="Price" error={error.price} type="number" value={product.price} onChange={formChange} helperText={error.price ? 'Required!' : null}/>
      </FormGroup>
    </React.Fragment>
  )
});

const CardListing =  observer(({_vState, handleDelete}) => {
  return (
    <React.Fragment>
      {
        _vState.listing.map((list, index) => {
          const header = {
            title: list.title,
            action: 
              <IconButton onClick={() => handleDelete(list, index)} aria-label="settings" size="small" color="secondary">
                <DeleteIcon fontSize="inherit"/>
              </IconButton>
            
          };
          const CardAction = (
            <CardActions disableSpacing>
              <Typography variant="body2" component="div">
                <Box fontWeight="fontWeightRegular">Price: </Box> {list.price}
              </Typography>
            </CardActions>
          );
          return (
            <Grid key={list.id} item md={4} sm={6}>
              <CardView  headerProps={header}cardActions={CardAction}>
                {list.description}
              </CardView>
            </Grid>
          )
        })
      }
    </React.Fragment>
  )
})

export default Dashboard;
