import React, { Component } from 'react';
import SearchIcon from './SearchIcon'
import EmbaressedIcon from './EmbaressedIcon'
import AnimatedBorder from './AnimatedBorder'

export default class Lens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      fetchingData: true,
      inputString: '',
      hoveredIndex: null
    }
    this.lensRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.returnFileredResults = this.returnFileredResults.bind(this);
    this.onKeyPressed = this.onKeyPressed.bind(this);
  }

  componentDidMount() {
    // this.fetchData();
    setTimeout(()=>this.fetchData(), 500);
  }

  fetchData() {
    const http = new XMLHttpRequest();
    http.open("GET", "http://www.mocky.io/v2/5ba8efb23100007200c2750c");
    http.send();
    http.onload = () => this.setState({results: JSON.parse(http.responseText), fetchingData:false});
  }

  handleChange(event){
    console.log(event.key);
    this.setState({ inputString: event.target.value });
  }

  returnFileredResults() {
    return this.state.inputString.length === 0 ? []
    : this.state.results.filter(
      data => {
        var isPresent = false;
        Object.keys(data).forEach(
          key=>{
            if(typeof data[key] === 'object'){
              if(data[key].filter(str => str.toLowerCase().includes(this.state.inputString.toLowerCase())).length > 0) isPresent = true;
            }else{
              if(data[key].toLowerCase().includes(this.state.inputString.toLowerCase())) isPresent = true;
            }
          }
        )
        return isPresent;
      }
    );
  }


  renderHighlightedField(str) {
    var input = this.state.inputString;
    var strTemp = str.replace(new RegExp(input, 'gi'), `+-+${input}+-+`);
    var strArr = strTemp.split('+-+');
    return strArr.map(data => input === data ? <span>{input}</span> : data);
  }

  onKeyPressed(event) {
    console.log(event.key)
    if(this.state.inputString.length != 0){
      const scrollParams = {behavior: "smooth", block: "end", inline: "nearest"};
      if(event.key === 'ArrowDown' && this.state.hoveredIndex <= this.returnFileredResults().length - 2){
        this.setState({hoveredIndex: this.state.hoveredIndex === null ? 0 : this.state.hoveredIndex+1}, ()=>{if(this.state.hoveredIndex >= 0 && this.state.hoveredIndex != null) this[`resultNode${this.state.hoveredIndex}`].scrollIntoView(scrollParams)})
      }else if(event.key === 'ArrowUp' && this.state.hoveredIndex >= 0){
        this.setState({hoveredIndex: this.state.hoveredIndex === 0 ? null : this.state.hoveredIndex-1}, ()=>{if(this.state.hoveredIndex >= 0 && this.state.hoveredIndex != null) this[`resultNode${this.state.hoveredIndex}`].scrollIntoView(scrollParams)})
      }
    }
  }

  setHoveredItem(index) {
    this.setState({hoveredIndex: index});
  }

  render() {
    return (
      <div className={`lens-ctr ${this.state.fetchingData ? 'animate' : ''}`} >
        <input onChange={this.handleChange} ref={this.lensRef} onKeyDown={this.onKeyPressed} className="lens-input" placeholder="Search users by ID, name or address" autoFocus/>
        <SearchIcon/>
        <AnimatedBorder runAnimation={this.state.fetchingData}/>
        {
          this.state.inputString.length !== 0 ? (
              this.returnFileredResults().length === 0
            ? (<div className="result-ctr no-result-ctr" key="no-result">
                  <div className="result-node">
                    <EmbaressedIcon />
                    <p>{'No Users Found'}</p>
                  </div>
              </div>)
            : (<div className="result-ctr" key={this.state.reults}>
                {this.returnFileredResults().map(
                  (data, i) => (
                    <div ref={element => this[`resultNode${i}`] = element} className={`result-node ${i == this.state.hoveredIndex ? 'hovered' : ''}`} onMouseEnter={this.setHoveredItem.bind(this,i)} key={data.id}>
                      {
                        Object.keys(data).map(
                          key => (
                            typeof data[key] !== 'object'
                            ? (key == 'id' || key == 'name' || data[key].toLowerCase().includes(this.state.inputString.toLowerCase())) ? <div key={`result-node-${data.id}-${key}`} className={`info-node ${key}`}>{this.renderHighlightedField(data[key])}</div> : null
                            : (<div className="info-node items" key={`${key} ${data[key].id}`}>
                                {data[key].filter(str => str.toLowerCase().includes(this.state.inputString.toLowerCase())).length === 0 ? null : <div>{[<span>{data[key].filter(str => str.toLowerCase().includes(this.state.inputString.toLowerCase())).join(' ,')}</span>, <div key={`sulbine-${key}-${data[key].id}`} className="items-subline">{`found in items`}</div>]}</div>}
                              </div>)
                          )
                        )
                      }
                    </div>
                  )
                )}
            </div>
          )) : null
        }
      </div>

    );
  }
}

Lens.defaultProps = {
  onChange: null,
  onOptionSelect: null
};
