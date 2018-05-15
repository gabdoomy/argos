import React from 'react';
import ReactDOM from 'react-dom';
import ReactLoading from 'react-loading';
import StarRatings from 'react-star-ratings';
const request = require('superagent');
var _ = require('lodash');

class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="card col-4" style={{ display: 'inline-block', padding:"0px", margin: "20px", maxHeight:'550px', maxWidth: '300px'}}>
          <div className="card-body">
          <div style={{width: '200px', height: '200px'}}>
              <img className="card-img-top" style={{maxHeight:'200px', maxWidth: '200px'}} src={'http://media.4rgos.it/s/Argos/'+ this.props.id + '_R_SET%3Fw=220&h=220'}/>
          </div>
          <div style={{ height: '50px'}}>
            <h5 className="card-title">{this.props.name}</h5>
          </div>
          <div> Price: {this.props.price} </div>
          <StarRatings
              rating={this.props.avgRating}
              starRatedColor="rgb(255,0,0)"
              numberOfStars={5}
              starDimension="20px"
              starSpacing="3px"
          />
          <br/>
          <a href="#" ><i className="fas fa-comments"></i> {_.ceil(this.props.reviewsCount)} reviews</a><br/>
          <a href={"http://www.argos.co.uk/product/"+ this.props.id} className="card-link"> More Info about the product!</a><br/><br/>
          <a href="#" className="btn btn-primary">Add to trolley</a>
        </div>
      </div>
    );
  }
}

class Jumbotron extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 page-title">Argos Search Page</h1>
          <p className="lead">Get what you want today with Fast Track same day delivery only £3.95, 7 days a week or faster in-store collection for free.</p>
        </div>
      </div>
    );
  }
}

class FilterCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="affix">
      <div className="card border-primary mb-3" style={{maxWidth: "18rem", float: "left", marginLeft: "-250px", zIndex:"10", position: "fixed"}}>
         <div className="card-header">Filter results</div>
         <div className="card-body text-primary">
             <h6 className="card-title">Star Rating </h6>
            <div className="card-text">
                <StarRatings
                  rating={this.props.state.rating}
                  starRatedColor="rgb(255,0,0)"
                  numberOfStars={5}
                  starDimension="15px"
                  starSpacing="1px"
                  changeRating={this.props.changeRating}
                  />
            </div>
         </div>
      </div>
    </div>
    );
  }
}


class SearchPage extends React.Component {
  constructor(props){
        super(props);
        this.state = {
            productList: null,
            allProducts: null,
            rating: 0
        }       
    }

  getData(){
   const setState = this.setState.bind(this);   
   request.get('http://localhost:8081/api/data', (err, res) =>{
        let productList = [];
        for(var i = 0; i < res.body.length; i++ ){
          var details = res.body[i];
          productList.push(<Item key={i} id={details.id} name={details.attributes.name} price = {details.attributes.price} avgRating = {details.attributes.avgRating} reviewsCount = {details.attributes.reviewsCount}/>)
          setState({productList: productList});
          setState({allProducts: productList});
        }
      });
  }

  filterValues(value, rating){
      let results = this.state.allProducts;
      if(value != "") {
        results = results.filter(element => element.props.name.toLowerCase().includes(value.toLowerCase()));
      }
      if(rating!=0){
         results = results.filter(element => _.ceil(element.props.avgRating)==rating);
      }

      this.setState({productList: results});

    }

  handleChange(event) {
    let value = event.target.value;
    this.filterValues(value, 0);
  }

  changeRating( newRating ) {
    this.setState({
      rating: newRating
    });
    this.filterValues("", newRating);
  }

  render() {
    if(this.state.productList==null) this.getData();
   
    return (
      <center>
        <Jumbotron />
        <br/>
        <input className="form-control col-sm-6" style={{display: "block","fontSize": "20px"}} placeholder="Search for..." onChange={this.handleChange.bind(this)}/>
        <div className="container">

            <div className="row">
                <div className="col-lg-3">
                    <FilterCard state={this.state} changeRating={this.changeRating.bind(this)}/>
                </div>
                {this.state.productList === null ? 
                  <span>Loading...</span>
                    :
                  <div>{this.state.productList}</div>
                }
            </div>
        </div>
      </center>
    )
  }
}

export { SearchPage, Item, Jumbotron, FilterCard }